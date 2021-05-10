using Extensions.Common.STResultAPI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GSP.Models.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Extensions.Common.STExtension;
using Microsoft.AspNetCore.Hosting;
using PTT_GSP.SysGlobal;
using System.IO;
using System.Globalization;
using PTT_GSP.Controllers;

namespace PTT_GSP.Good_Receive.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class Good_ReceiveController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public Good_ReceiveController(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        private PTTGSP_DWSContext db = new PTTGSP_DWSContext();
        CultureInfo cultures = new CultureInfo("en-US");
        public List<lstAutoCompleted> SetVauleAutoCompleted()
        {
            List<lstAutoCompleted> lst = new List<lstAutoCompleted>();

            db = new PTTGSP_DWSContext();

            var Materials = (from MR in db.TB_Materials.Where(w => w.IsActive && !w.IsDel)
                             from MU in db.TB_Material_Unit.Where(w => !w.IsDel && w.IsActive && w.nUnitID == MR.nUnitID)
                             select new lstAutoCompleted
                             {
                                 nMaterialID = MR.nMaterialID,
                                 value = MR.nMaterialID + "",
                                 label = MR.sMaterialCode + " " + ":" + " " + MR.sName,
                                 sMaterialCode = MR.sMaterialCode + " " + MR.sName,
                                 MaterialCode = MR.sMaterialCode,
                                 MaterialName = MR.sName,
                                 nUnitID = MR.nUnitID,
                                 nPrice = MR.nPrice,
                                 sUnitName = MU.sName
                             }
                             ).ToList();
            return Materials;
        }
        public Receive_list GetData_List(Good_SearchData data)
        {
            Receive_list result = new Receive_list();
            List<Receive_lstData> lst = new List<Receive_lstData>();
            List<Option_Sub> lstsub = new List<Option_Sub>();
            DateTime? dDocDate = null;
            DateTime? dReceiveDate = null;
            if (data.dDocDate != "" && data.dDocDate != null)  dDocDate = Convert.ToDateTime(data.dDocDate, cultures);
            if (data.dReceiveDate != "" && data.dReceiveDate != null)  dReceiveDate = Convert.ToDateTime(data.dReceiveDate, cultures);

            var lstData = (from GR in db.TB_Goods_Receive.Where(w => (dDocDate.HasValue  ? dDocDate.Value.Date >= w.dDocDate.Date : true) && (dReceiveDate.HasValue ? dReceiveDate.Value.Date >= w.dReceiveDate.Date : true) &&
            (!string.IsNullOrEmpty(data.sRequestNo) ? (w.sRequestNo.ToLower().Contains(data.sRequestNo.ToLower().Trim())) : true))
                           from VD in db.TB_Vendor.Where(w => w.nVendorID == GR.nVendorID)
                           from OS in db.TM_Option_Sub.Where(w => w.nSubID == GR.nSourceID && w.nID == 4 && (!string.IsNullOrEmpty(data.sSourceID) ? w.nSubID == data.sSourceID.ToIntOrZero() : true))
                           select new
                           {
                               nRequestID = GR.nRequestID,
                               sRequestNo = GR.sRequestNo,
                               sName = OS.sName,
                               dDocDate = GR.dDocDate,
                               dReceiveDate = GR.dReceiveDate,
                               dUpdate = GR.dUpdate
                           }).OrderByDescending(o => o.dUpdate).ToList();
            foreach (var i in lstData)
            {
                Receive_lstData s = new Receive_lstData();
                s.nRequestID = i.nRequestID;
                s.sRequestNo = i.sRequestNo;
                s.sName = i.sName;
                s.dDocDate = i.dDocDate.ToStringFromDate("dd/MM/yyyy", "th-TH");
                s.dReceiveDate = i.dReceiveDate.ToStringFromDate("dd/MM/yyyy", "th-TH");
                lst.Add(s);
            }
            var Materialsource = db.TM_Option_Sub.Where(w => w.nID == 4).ToList(); //แหล่งที่มาของวัสดุ
            foreach (var i in Materialsource)
            {
                Option_Sub s = new Option_Sub();
                s.nID = i.nID;
                s.sDescription = i.sDescription;
                s.sName = i.sName;
                s.nSubID = i.nSubID;
                lstsub.Add(s);
            }
            result.lstData = lst;
            result.Materialsource = lstsub;

            return result;
        }
        public ResultAPI SaveData(latReceive_Save data)
        {
            latReceive_Save result = new latReceive_Save();
            db = new PTTGSP_DWSContext();
            CultureInfo TH = new CultureInfo("th-TH");
            CultureInfo EN = new CultureInfo("en-US");

            DateTime dt = DateTime.Now;

            if (data.nRequestID == 0)
            {
                int nRequestID = data.nRequestID;
                var Update = db.TB_Goods_Receive.FirstOrDefault(w => w.nRequestID == nRequestID);
                if (Update == null)
                {
                    string RequestNo = "";
                    var nID_Last = db.TB_Goods_Receive.Any() ? db.TB_Goods_Receive.Max(m => m.nRequestID) : 0;
                    var GenCode = db.TB_Goods_Receive.Where(w => w.dCreate.Month == DateTime.Now.Month && w.dCreate.Year == DateTime.Now.Year).Count();
                    if (GenCode != 0)
                    {
                        string plusone = (GenCode + 1) + "";
                        RequestNo = plusone.PadLeft(4, '0');
                    }
                    else
                    {
                        RequestNo = "0001";
                    }
                    string sYear = dt.ToString("yy", TH);
                    string sdate = dt.ToString("dd", TH);
                    string sRequestNo = "GR-" + sYear + sdate + RequestNo;

                    Update = new TB_Goods_Receive()
                    {
                        nRequestID = nID_Last + 1,
                        sRequestNo = sRequestNo,
                        sCreateBy = "",
                        dUpdate = DateTime.Now,
                        sUpdateBy = "",
                        dCreate = DateTime.Now
                    };

                    db.TB_Goods_Receive.Add(Update);
                }
                Update.nSourceID = data.sSourceID.ToIntOrZero();
                Update.sRefNo = data.sRefNo;

                Update.dDocDate = Convert.ToDateTime(data.sDocDate, cultures);
                Update.dReceiveDate = Convert.ToDateTime(data.sReceiveDate, cultures);
                Update.nVendorID = data.sVendorID.ToIntOrZero();
                Update.sNote = data.sNote;
                Update.nTotalPrice = data.nTotalPrice.ToIntOrZero();
                Update.dCreate = DateTime.Now;
                Update.sUpdateBy = "";

                foreach (var item in data.file)
                {
                    if (item.IsNewFile)
                    {
                        string sNewPath = "Good_Receive/Good_Receive_" + Update.nRequestID;
                        string sTepmPath = "Temp";
                        string foldersTempPath = MapCurrentPath(sTepmPath + "/");
                        string foldersNewPath = MapCurrentPath(sNewPath + "/");
                        string sNewTemp = "UploadFile/" + sNewPath + "/" + item.sSaveToFileName;

                        Update.sFile_Name = item.sFileName;
                        Update.sFile_SysName = item.sSaveToFileName;
                        Update.sFile_Path = "/" + sNewTemp;

                        SysFunc.FolderCreate(sNewPath);

                        string OldTemp = foldersTempPath + item.sSaveToFileName;
                        string NewTemp = foldersNewPath + item.sSaveToFileName;

                        System.IO.File.Move(OldTemp, NewTemp);
                    }
                }
                foreach (var i in data.sub_TB)
                {
                    TB_Goods_Receive_Material s = new TB_Goods_Receive_Material();
                    s.nRequestID = Update.nRequestID;
                    s.nMaterialID = i.nMaterialID;
                    s.nAmount = i.nNumber.ToIntOrZero();
                    s.nPrice = i.nPriceperpiece.ToDecimalOrZero();
                    s.nTotalPrice = i.nSum;

                    db.TB_Goods_Receive_Material.Add(s);
                }

                db.SaveChanges();
            }
            result.Status = ResultStatus.Success;
            return result;
        }
        public ActionResult GetData_Edit(int nID)
        {
            List<lstFile> File = new List<lstFile>();
            var lst = db.TB_Goods_Receive.FirstOrDefault(f => f.nRequestID == nID);
            if (lst != null)
            {
                if (lst.sFile_Path != null)
                {
                    lstFile f = new lstFile();
                    f.sFileName = lst.sFile_Name;
                    f.sSaveToFileName = lst.sFile_SysName;
                    f.sSize = "0";
                    f.sSaveToPath = lst.sFile_Path;
                    f.IsNewFile = false;
                    f.IsDelete = false;
                    File.Add(f);
                }
            }

            List<lstValMaterials_Sub> sub_Table = new List<lstValMaterials_Sub>();

            sub_Table = (from GR in db.TB_Goods_Receive.Where(w => w.nRequestID == nID)
                         from GRM in db.TB_Goods_Receive_Material.Where(w => w.nRequestID == GR.nRequestID)
                         from M in db.TB_Materials.Where(w => w.nMaterialID == GRM.nMaterialID)
                         from UN in db.TB_Material_Unit.Where(w => w.nUnitID == M.nUnitID)
                         select new lstValMaterials_Sub
                         {
                             nMaterialID = GRM.nMaterialID,
                             nNumber = GRM.nAmount + "",//จำนวน
                             nPrice = GRM.nPrice,
                             nPriceperpiece = GRM.nPrice + "", //ราคาต่อหน่วย
                             nSum = GRM.nTotalPrice,
                             nUnitID = UN.nUnitID,
                             sUnitName = UN.sName,
                             sMaterialCode = M.sMaterialCode,
                             sMaterialName = M.sName,
                         }
                                ).ToList();


            var Materialsource = db.TM_Option_Sub.Where(w => w.nID == 4).ToList(); //แหล่งที่มาของวัสดุ
            var Vendor = db.TB_Vendor.Where(w => w.IsActive && !w.IsDel).ToList(); //ผู้ขาย
            return Ok(new { lst, File, Materialsource, Vendor, sub_Table });
        }
        public string MapCurrentPath(string path)
        {
            string webRootPath = _hostingEnvironment.ContentRootPath;
            var fileRoute = Path.Combine(webRootPath, "ClientApp\\build\\UploadFile");

            var filePath = fileRoute + "\\" + path.Replace("../", "\\").Replace("/", "\\");
            return filePath;
        }
    }
    public class latReceive_Save : ResultAPI
    {
        public int nRequestID { get; set; }
        public string sRequestNo { get; set; }
        public string sSourceID { get; set; }
        public string sRefNo { get; set; }
        public string sDocDate { get; set; }
        public string sReceiveDate { get; set; }
        public string sVendorID { get; set; }
        public string sNote { get; set; }
        public string nTotalPrice { get; set; }
        public List<cArrFile> file { get; set; }
        public List<lstValMaterials_Sub> sub_TB { get; set; }
    }
    public class Receive_lstData
    {
        public int nRequestID { get; set; }
        public string sRequestNo { get; set; }
        public string sName { get; set; }
        public string dDocDate { get; set; }
        public string dReceiveDate { get; set; }
        public DateTime dUpdate { get; set; }
    }
    public class Receive_list : ResultAPI
    {
        public List<Receive_lstData> lstData { get; set; }
        public List<Option_Sub> Materialsource { get; set; }
    }
    public class Option_Sub
    {
        public int nID { get; set; }
        public int nSubID { get; set; }
        public string sName { get; set; }
        public string sDescription { get; set; }
        public decimal nOrder { get; set; }
        public bool IsActive { get; set; }
    }
    public class lstAutoCompleted
    {
        public int nMaterialID { get; set; }
        public string MaterialCode { get; set; }
        public string sMaterialCode { get; set; }
        public string value { get; set; }
        public string label { get; set; }
        public string MaterialName { get; set; }
        public string sUnitName { get; set; }
        public int nUnitID { get; set; }
        public decimal nPrice { get; set; }

    }
    public class lstValMaterials_Sub
    {
        public int nMaterialID { get; set; }
        public string nNumber { get; set; }
        public decimal nPrice { get; set; }
        public string nPriceperpiece { get; set; }
        public decimal nSum { get; set; }
        public string sMaterialCode { get; set; }
        public string sMaterialName { get; set; }
        public string sUnitName { get; set; }
        public int nUnitID { get; set; }
    }
    public class Good_SearchData
    {
        public string dDocDate { get; set; }
        public string dReceiveDate { get; set; }
        public string sRequestNo { get; set; }
        public string sSourceID { get; set; }
    }

}
