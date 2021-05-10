using Extensions.Common.STResultAPI;
using Microsoft.AspNetCore.Mvc;
using PTT_GSP.Models.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Extensions.Common.STExtension;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using PTT_GSP.SysGlobal;

namespace PTT_GSP.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SuppliesController : Controller
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public SuppliesController(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        private PTTGSP_DWSContext db = new PTTGSP_DWSContext();
        public IActionResult GetData_List()
        {
            db = new PTTGSP_DWSContext();
            List<lstSuppliesData> lst = new List<lstSuppliesData>();
            var lstData = (from Materials in db.TB_Materials.Where(w => !w.IsDel)
                           from Units in db.TB_Material_Unit.Where(w => w.nUnitID == Materials.nUnitID && !w.IsDel)
                           from Balance in db.TB_Materials_BP.Where(w => w.nMaterialID == Materials.nMaterialID).DefaultIfEmpty()
                           select new
                           {
                               Materials.nMaterialID,
                               Materials.sMaterialCode,
                               Materials.sName,
                               Materials.sFile_Path,
                               Materials.nPrice,
                               UnitsName = Units.sName,
                               nMat_Balance = Balance != null ? Balance.nMat_Balance : 0,
                               Materials.nMax,
                               Materials.nMin,
                               Materials.IsActive,
                               Materials.dUpdate,
                           }).OrderByDescending(o => o.dUpdate).ToList();

            var lstGroup = db.TB_Material_Group.Where(w => !w.IsDel && w.IsActive).ToList();
            var lstCategory = db.TB_Material_Category.Where(w => !w.IsDel && w.IsActive).ToList();
            return Ok(new { lstData, lstGroup , lstCategory });
        }
        public IActionResult GetnCategory(string GroupID)
        {
            var lstCategory = db.TB_Material_Category.Where(w => w.nGroupID == GroupID.ToIntOrZero() && !w.IsDel && w.IsActive).ToList();
            return Ok(lstCategory);
        }
        public ActionResult SearchTitle(string txtSearch, string sIsActive, string nCategoryID, string nGroupID)
        {
            db = new PTTGSP_DWSContext();
            bool? IsActive = null;
            if (sIsActive == "1")
            {
                IsActive = true;
            }
            else if (sIsActive == "2")
            {
                IsActive = false;
            }

            var lstData = (from Materials in db.TB_Materials.Where(w => (txtSearch != null ? (w.sMaterialCode + w.sName).Trim().ToLower().Contains(txtSearch.Trim().ToLower()) : true) &&
            (sIsActive != null ? w.IsActive == IsActive : true) &&
            (nCategoryID != null && nCategoryID != "0" ? w.nCategoryID == nCategoryID.ToIntOrZero() : true) &&
            (nGroupID != null && nGroupID != "0" ? w.nGroupID == nGroupID.ToIntOrZero() : true) &&
            !w.IsDel)
                           from Units in db.TB_Material_Unit.Where(w => w.nUnitID == Materials.nUnitID && !w.IsDel)
                           from Balance in db.TB_Materials_BP.Where(w => w.nMaterialID == Materials.nMaterialID).DefaultIfEmpty()
                           select new
                           {
                               Materials.nMaterialID,
                               Materials.sMaterialCode,
                               Materials.sName,
                               Materials.sFile_Path,
                               Materials.nPrice,
                               UnitsName = Units.sName,
                               nMat_Balance = Balance != null ? Balance.nMat_Balance : 0,
                               Materials.nMax,
                               Materials.nMin,
                               Materials.IsActive,
                               Materials.dUpdate,
                           }).OrderByDescending(o => o.dUpdate).ToList();
            return Ok(lstData);
        }
        public ResultAPI Del_lst(GetnID data)
        {
            ResultAPI result = new ResultAPI();
            db = new PTTGSP_DWSContext();
            if (data.nID.Count > 0)
            {
                var del_Materials = db.TB_Materials.Where(w => data.nID.Contains(w.nMaterialID)).ToList();
                foreach (var i in del_Materials)
                {
                    i.IsDel = true;
                    db.SaveChanges();
                }
                db = new PTTGSP_DWSContext();
                var del_Materials_File = db.TB_Materials_File.Where(w => data.nID.Contains(w.nMaterialID)).ToList();
                db.TB_Materials_File.RemoveRange(del_Materials_File);
                foreach (var item in data.nID)
                {
                    string Path = "/UploadFile/Supplies/Supplies_" + item;
                    bool directoryExists = Directory.Exists(Path);
                    Directory.Delete(Path, true);
                    Console.WriteLine("top-level directory exists: " + directoryExists);
                }

                db.SaveChanges();

                result.Status = ResultStatus.Success;
            }
            else
            {
                result.Status = ResultStatus.Warning;
            }
            return result;
        }
        public ActionResult SaveData(SaveSupplies data)
        {
            db = new PTTGSP_DWSContext();
            SaveSupplies result = new SaveSupplies();
            int nMaterialID = data.nMaterialID.ToIntOrZero();
            var ChackData = db.TB_Materials.FirstOrDefault(f => f.nMaterialID == nMaterialID);
            if (ChackData != null) //Update
            {
                ChackData.sName = data.sName;
                ChackData.nUnitID = data.nUnitID.ToIntOrZero();
                ChackData.nPrice = data.nPrice.ToDecimalOrZero();
                ChackData.nLocationID = data.nLocationID.ToIntOrZero();
                ChackData.sBinLocation = data.sBinLocation;
                ChackData.nMin = data.nMin.ToIntOrZero();
                ChackData.nMax = data.nMax.ToIntOrZero();
                ChackData.nReOrderPoint = data.nReOrderPoint.ToIntOrZero();
                ChackData.nMaxReserve = data.nMaxReserve.ToIntOrZero();
                ChackData.nDuplicateDay = data.nDuplicateDay.ToIntOrZero();
                ChackData.sDetail_Material = data.sDetail_Material;
                ChackData.sDetail = data.sDetail;
                ChackData.IsActive = data.IsActive;

                foreach (var item in data.file)
                {
                    if (item.IsNewFile)
                    {
                        string sNewPath = "Supplies";
                        string sTepmPath = "Temp";
                        string foldersTempPath = MapCurrentPath(sTepmPath + "/");
                        string foldersNewPath = MapCurrentPath(sNewPath + "/");
                        string sNewTemp = "UploadFile/" + sNewPath + "/" + item.sSaveToFileName;

                        ChackData.sFile_Name = item.sFileName;
                        ChackData.sFile_SysName = item.sSaveToFileName;
                        ChackData.sFile_Path = "/" + sNewTemp;

                        SysFunc.FolderCreate(sNewPath);

                        string OldTemp = foldersTempPath + item.sSaveToFileName;
                        string NewTemp = foldersNewPath + item.sSaveToFileName;

                        System.IO.File.Move(OldTemp, NewTemp);
                    }
                }

                ChackData.dUpdate = DateTime.Now;
                ChackData.sUpdateBy = "";

                if (data.listfile.Any())
                {
                    foreach (var item in data.listfile)
                    {
                        if (item.IsNewFile)
                        {
                            string sNewPath = "Supplies/Supplies_" + nMaterialID;
                            string sTepmPath = "Temp";
                            string foldersTempPath = MapCurrentPath(sTepmPath + "/");
                            string foldersNewPath = MapCurrentPath(sNewPath + "/");
                            string sNewTemp = "UploadFile/" + sNewPath + "/" + item.sSaveToFileName;

                            var Countfile = db.TB_Materials_File.Where(w => w.nMaterialID == nMaterialID).Count();
                            Countfile = Countfile + 1;

                            TB_Materials_File f = new TB_Materials_File();
                            f.nMaterialID = nMaterialID;
                            f.nItem = Countfile;
                            f.sFile_Name = item.sFileName;
                            f.sFile_Path = "/" + sNewTemp;
                            f.sFile_SysName = item.sSaveToFileName;

                            SysFunc.FolderCreate(sNewPath);
                            string OldTemp = foldersTempPath + item.sSaveToFileName;
                            string NewTemp = foldersNewPath + item.sSaveToFileName;

                            System.IO.File.Move(OldTemp, NewTemp);

                            db.TB_Materials_File.Add(f);
                        }
                    }
                }
                db.SaveChanges();
            }
            else //create
            {
                int CategoryID = data.nCategoryID.ToIntOrZero();
                var CreateCode = db.TB_Material_Category.FirstOrDefault(w => w.nCategoryID == CategoryID);
                if (CreateCode != null)
                {
                    string MaterialCode = "";
                    var CountCategory = db.TB_Materials.Where(w => w.nCategoryID == CreateCode.nCategoryID).Count();
                    if (CountCategory != 0)
                    {
                        string plusone = (CountCategory + 1) + "";
                        MaterialCode = plusone.PadLeft(3, '0');
                    }
                    else
                    {
                        MaterialCode = "001";
                    }

                    TB_Materials s = new TB_Materials();
                    s.sMaterialCode = CreateCode.sCategoryCode + "-" + MaterialCode;
                    s.nGroupID = data.nGroupID.ToIntOrZero();
                    s.nCategoryID = data.nCategoryID.ToIntOrZero();
                    s.sName = data.sName;
                    s.nUnitID = data.nUnitID.ToIntOrZero();
                    s.nPrice = data.nPrice.ToDecimalOrZero();
                    s.nLocationID = data.nLocationID.ToIntOrZero();
                    s.sBinLocation = data.sBinLocation;
                    s.nMin = data.nMin.ToIntOrZero();
                    s.nMax = data.nMax.ToIntOrZero();
                    s.nReOrderPoint = data.nReOrderPoint.ToIntOrZero();
                    s.nMaxReserve = data.nMaxReserve.ToIntOrZero();
                    s.nDuplicateDay = data.nDuplicateDay.ToIntOrZero();
                    s.sDetail_Material = data.sDetail_Material;
                    s.sDetail = data.sDetail;

                    foreach (var item in data.file)
                    {
                        string sNewPath = "Supplies";
                        string sTepmPath = "Temp";
                        string foldersTempPath = MapCurrentPath(sTepmPath + "/");
                        string foldersNewPath = MapCurrentPath(sNewPath + "/");
                        string sNewTemp = "UploadFile/" + sNewPath + "/" + item.sSaveToFileName;

                        s.sFile_Name = item.sFileName;
                        s.sFile_SysName = item.sSaveToFileName;
                        s.sFile_Path = "/" + sNewTemp;

                        if (item.IsNewFile)
                        {
                            SysFunc.FolderCreate(sNewPath);
                            string OldTemp = foldersTempPath + item.sSaveToFileName;
                            string NewTemp = foldersNewPath + item.sSaveToFileName;
                            System.IO.File.Move(OldTemp, NewTemp);
                        }
                    }
                    s.IsActive = data.IsActive;
                    s.dCreate = DateTime.Now;
                    s.dUpdate = DateTime.Now;
                    s.sCreateBy = "";
                    s.sUpdateBy = "";
                    db.TB_Materials.Add(s);
                    db.SaveChanges();

                    if (data.listfile.Any())
                    {
                        db = new PTTGSP_DWSContext();
                        int Countfile = 1;
                        foreach (var item in data.listfile)
                        {
                            string sNewPath = "Supplies/Supplies_" + s.nMaterialID;
                            string sTepmPath = "Temp";
                            string foldersTempPath = MapCurrentPath(sTepmPath + "/");
                            string foldersNewPath = MapCurrentPath(sNewPath + "/");
                            string sNewTemp = "UploadFile/" + sNewPath + "/" + item.sSaveToFileName;

                            TB_Materials_File f = new TB_Materials_File();
                            f.nMaterialID = s.nMaterialID;
                            f.nItem = Countfile;
                            f.sFile_Name = item.sFileName;
                            f.sFile_Path = "/" + sNewTemp;
                            f.sFile_SysName = item.sSaveToFileName;
                            Countfile++;

                            if (item.IsNewFile)
                            {
                                SysFunc.FolderCreate(sNewPath);
                                string OldTemp = foldersTempPath + item.sSaveToFileName;
                                string NewTemp = foldersNewPath + item.sSaveToFileName;

                                System.IO.File.Move(OldTemp, NewTemp);
                            }
                            db.TB_Materials_File.Add(f);
                        }
                        db.SaveChanges();
                    }
                    db = new PTTGSP_DWSContext();
                    TB_Materials_BP BP = new TB_Materials_BP();
                    BP.nMaterialID = s.nMaterialID;
                    BP.nMat_Balance = 0;
                    BP.nMat_Pending = 0;
                    BP.nMat_BP = 0;
                    db.TB_Materials_BP.Add(BP);
                    db.SaveChanges();
                }
            }
            result.Status = ResultStatus.Success;
            return Ok(result);
        }
        public IActionResult GetData_Edit(int nID)
        {
            TB_Materials lstMaterials = new TB_Materials();
            List<lstFile> File = new List<lstFile>();
            List<lstFile> lstFile = new List<lstFile>();

            db = new PTTGSP_DWSContext();
            if (nID != 0)
            {
                lstMaterials = db.TB_Materials.FirstOrDefault(f => f.nMaterialID == nID);
                var lstFiles = db.TB_Materials_File.Where(w => w.nMaterialID == lstMaterials.nMaterialID).ToList();

                if (lstMaterials != null)
                {
                    lstFile f = new lstFile();
                    f.sFileName = lstMaterials.sFile_Name;
                    f.sSaveToFileName = lstMaterials.sFile_SysName;
                    f.sSize = "0";
                    f.sSaveToPath = lstMaterials.sFile_Path;
                    f.IsNewFile = false;
                    f.IsDelete = false;
                    File.Add(f);
                }

                foreach (var i in lstFiles)
                {
                    lstFile f = new lstFile();
                    f.nFileID = i.nItem;
                    f.sFileName = i.sFile_Name;
                    f.sSaveToFileName = i.sFile_SysName;
                    f.sSize = "0";
                    f.sSaveToPath = i.sFile_Path;
                    f.IsNewFile = false;
                    f.IsDelete = false;
                    lstFile.Add(f);
                }
            }
            else
            {
                lstMaterials = null;
            }

            var lstUnits = db.TB_Material_Unit.Where(w => !w.IsDel && w.IsActive).ToList();
            var lstCategory = db.TB_Material_Category.Where(w => !w.IsDel && w.IsActive).ToList();
            var lstGroup = db.TB_Material_Group.Where(w => !w.IsDel && w.IsActive).ToList();
            var lstLocation = db.TB_Material_Location.Where(w => !w.IsDel && w.IsActive).ToList();

            return Ok(new { lstMaterials, lstFile, lstUnits, lstCategory, lstGroup, lstLocation, File });
        }
        public string MapCurrentPath(string path)
        {
            string webRootPath = _hostingEnvironment.ContentRootPath;
            var fileRoute = Path.Combine(webRootPath, "ClientApp\\build\\UploadFile");

            var filePath = fileRoute + "\\" + path.Replace("../", "\\").Replace("/", "\\");
            return filePath;
        }
        public IActionResult DeleteFile(string delfilename)
        {
            ItemData data = new ItemData();
            try
            {
                if (System.IO.File.Exists(MapCurrentPath(delfilename.Replace("/", "\\"))))
                {
                    System.IO.File.Delete(MapCurrentPath(delfilename.Replace("/", "\\")));
                }
                data.IsCompleted = true;
                return Ok(data);
            }
            catch (Exception error)
            {
                return StatusCode(500, new { result = "", message = error });
            }
        }
    }

    public class lstSuppliesData
    {
        public int Rows { get; set; }
        public int nMaterialID { get; set; }
        public string sMaterialCode { get; set; }
        public string sName { get; set; }
        public string sFile_Path { get; set; }
        public decimal nPrice { get; set; }
        public string sUnit { get; set; }
        public int nMat_Balance { get; set; }
        public int nMin { get; set; }
        public int nMax { get; set; }
        public bool IsActive { get; set; }
    }
    public class SaveSupplies : ResultAPI
    {
        public string nMaterialID { get; set; }
        public string sMaterialCode { get; set; }
        public string nGroupID { get; set; }
        public string nCategoryID { get; set; }
        public string sName { get; set; }
        public string nUnitID { get; set; }
        public string nPrice { get; set; }
        public string nLocationID { get; set; }
        public string sBinLocation { get; set; }
        public string nMin { get; set; }
        public string nMax { get; set; }
        public string nReOrderPoint { get; set; }
        public string nMaxReserve { get; set; }
        public string nDuplicateDay { get; set; }
        public string sDetail_Material { get; set; }
        public string sDetail { get; set; }
        public string sFile_Name { get; set; }
        public string sFile_SysName { get; set; }
        public string sFile_Path { get; set; }
        public bool IsActive { get; set; }
        public DateTime dUpdate { get; set; }
        public List<cArrFile> file { get; set; }
        public List<cArrFile> listfile { get; set; }

    }
    public class cArrFile
    {
        public int ID { get; set; }
        public int nFileID { get; set; }
        public string sSaveToFileName { get; set; }
        public string sFileName { get; set; }
        public string sSize { get; set; }
        public string sSaveToPath { get; set; }
        public bool IsNewFile { get; set; }
    }
    public class lstFile
    {
        public bool IsCompleted { get; set; }
        public bool IsDelete { get; set; }
        public bool IsNewFile { get; set; }
        public int nID { get; set; }
        public string sFileName { get; set; }
        public string sSize { get; set; }
        public string sMsg { get; set; }
        public string sSaveToFileName { get; set; }
        public string sSaveToPath { get; set; }
        public string sFileType { get; set; }
        public string sUrl { get; set; }
        public int nFileID { get; set; }


    }
}
