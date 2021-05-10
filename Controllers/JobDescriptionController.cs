using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GSP.SysModalGlobal;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using PTT_GSP.Models.DB;
using PTT_GSP.SysGlobal;

namespace PTT_GSP.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class JobDescriptionController : ControllerBase
    {
        CultureInfo culture = new CultureInfo("th-TH");

        [HttpGet]
        public List<List_TB_Reason> GetReason()
        {
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            var lstReason = db.TB_Reason.Where(w => !w.IsDel && w.IsActive).OrderBy(o => o.sName).ToList().Select(s => new List_TB_Reason
            {
                label = s.sName,
                value = s.nReasonID + ""
            }).ToList();
            return lstReason;
        }

        [HttpGet]
        public List<List_TB_Material> GetMaterial()
        {
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();
            var lstWorkMaterials = db.TB_Materials.Where(w => !w.IsDel && w.IsActive).OrderBy(o => o.nMaterialID).ToList().Select(s => new List_TB_Material
            {

                value = s.nMaterialID.ToString(),
                label = s.sMaterialCode + " " + ":" + " " + s.sName,
                MaterialCode = s.sMaterialCode + " " + s.sName,
                sUnitname = db.TB_Material_Unit.FirstOrDefault(w => w.nUnitID == s.nUnitID).sName,

            }).ToList();

            return lstWorkMaterials;
        }

        [HttpGet]
        public cListJobDescription GetListMaterial(int nID)
        {
            var result = new cListJobDescription();
            try
            {
                PTTGSP_DWSContext db = new PTTGSP_DWSContext();

                var lstMaterials = db.TB_Materials.Where(w => !w.IsDel).ToList();
                var lstMaterial_Unit = db.TB_Material_Unit.Where(w => !w.IsDel).ToList();
                var lstWork_Mate = db.TB_Work_Material.Where(w => w.nWorkID == nID).ToList();
                var Meterials = (from s in lstMaterials
                                 from g in lstMaterial_Unit.Where(w => w.nUnitID == s.nUnitID)
                                 from m in lstWork_Mate.Where(w => w.nMaterialID == s.nMaterialID)
                                 select new lst_Materials
                                 {
                                     nMaterialID = s.nMaterialID,
                                     sMaterialCode = s.sMaterialCode,
                                     sName = s.sName,
                                     nAmount = m.nAmount,
                                     sUnitName = g.sName,
                                     bStatus = s.IsActive,
                                     sStatus_Name = s.IsActive ? "ใช้งาน" : "ไม่ใช้งาน",
                                 }).ToList();

                result.lst_Materials = Meterials.ToList();
            }
            catch (Exception e)
            {
                result.sStatus = SysFunc.process_Error;
                result.sMsg = e.Message;
            }
            return result;
        }

        [HttpGet]
        public cListJobDescription GetListWork(string txtSearch, string sIsActive)
        {
            var result = new cListJobDescription();
            try
            {
                PTTGSP_DWSContext db = new PTTGSP_DWSContext();

                var lst_Work = db.TB_Work.Where(w => !w.IsDel).ToList();
                var lstReason = db.TB_Reason.Where(w => !w.IsDel).ToList();
                var Jobdescription = (from s in lst_Work
                                      from g in lstReason.Where(w => w.nReasonID == s.nReasonID)
                                      select new lst_Work
                                      {
                                          nWorkID = s.nWorkID,
                                          sName = s.sName,
                                          nReasonID = s.nReasonID,
                                          sReason = g.sName,
                                          sDetail = s.sDetail,
                                          bStatus = s.IsActive,
                                          sStatus_Name = s.IsActive ? "ใช้งาน" : "ไม่ใช้งาน",
                                          dUpdate = s.dUpdate,
                                          sUpdate = s.dUpdate.ToString("dd/MM/yyyy", culture),
                                      }).ToList();

                if (!string.IsNullOrEmpty(txtSearch) && txtSearch != "none")
                {
                    Jobdescription = Jobdescription.Where(item => item.sName.Trim().ToLower().Contains(txtSearch.Trim().ToLower())).ToList();
                }
                if (!string.IsNullOrEmpty(sIsActive))
                {
                    var isActive = sIsActive == "1";
                    Jobdescription = Jobdescription.Where(a => a.bStatus == isActive).ToList();
                }

                result.lst_Work = Jobdescription.ToList();
            }
            catch (Exception e)
            {
                result.sStatus = SysFunc.process_Error;
                result.sMsg = e.Message;
            }
            return result;
        }

        [HttpPost]
        public SysModalGlobal.CResutlWebMethod SavetoDB([FromBody] lstSavedata data)
        {
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();
            var result = new SysModalGlobal.CResutlWebMethod();

            try
            {
                var Work = db.TB_Work.ToList();
                var WorkMaterials = db.TB_Work_Material.ToList();

                var duplicate = (from a in db.TB_Work
                                 where !a.IsDel && a.sName.Trim().ToLower() == data.sName.Trim().ToLower() && a.nWorkID != data.nWorkID
                                 select a).FirstOrDefault();
                if (duplicate != null)
                {
                    // result.sStatus = SysGlobal.SysFunc.process_Duplicate;
                    result.sStatus = STFunction.process_Warning();
                    result.sMsg = "ลักษณะงานนี้มีในระบบอยู่แล้ว";
                    return result;
                }
                var nWorkID = (Work.Any() ? Work.Max(m => m.nWorkID) : 0) + 1;
                if (data.nWorkID == 0)
                {
                    TB_Work a = new TB_Work()
                    {
                        sName = data.sName,
                        nReasonID = data.nReasonID,
                        sDetail = data.sDetail,
                        IsActive = data.IsActive,
                        IsDel = false,
                        dCreate = DateTime.Now,
                        sCreateBy = data.sCreateBy,
                        dUpdate = DateTime.Now,
                        sUpdateBy = data.sUpdateBy,
                    };

                    db.TB_Work.Add(a);
                    db.SaveChanges();

                    db = new PTTGSP_DWSContext();
                    foreach (var per in data.lstWorkMaterial)
                    {
                        //data.lstWorkMaterial.Remove(per);

                        if (per.nWorkID == 0)
                        {

                            TB_Work_Material s = new TB_Work_Material();
                            s.nWorkID = nWorkID;
                            s.nMaterialID = per.nMaterialID;
                            s.nAmount = per.nAmount;
                            s.IsActive = per.IsActive;
                            db.TB_Work_Material.Add(s);
                        }
                        else
                        {
                            var edit = db.TB_Work_Material.FirstOrDefault(w => w.nWorkID == per.nWorkID);
                            if (edit != null)
                            {
                                edit.nMaterialID = per.nMaterialID;
                                edit.nAmount = per.nAmount;
                                edit.IsActive = per.IsActive;
                            }
                        }
                    }
                    db.SaveChanges();
                }
                else
                {
                    var oldnID = (from a in db.TB_Work
                                  where a.nWorkID == data.nWorkID
                                  select a).FirstOrDefault();

                    if (oldnID != null)
                    {
                        oldnID.sName = data.sName;
                        oldnID.nReasonID = data.nReasonID;
                        oldnID.sDetail = data.sDetail;
                        oldnID.IsActive = data.IsActive;
                        oldnID.IsDel = false;
                        oldnID.dUpdate = DateTime.Now;
                        oldnID.sUpdateBy = data.sUpdateBy;

                        db.SaveChanges();
                    }
                    foreach (var per in data.lstWorkMaterial)
                    {
                        if (nWorkID != 0)
                        {
                            var editdata = db.TB_Work_Material.FirstOrDefault(w => w.nWorkID == per.nWorkID);
                            if (editdata != null)
                            {
                                db.TB_Work_Material.Remove(editdata);

                                editdata.nAmount = per.nAmount;
                                editdata.IsActive = per.IsActive;
                            }
                        }
                    }
                    db.SaveChanges();

                    foreach (var per in data.lstWorkMaterial)
                    {
                        TB_Work_Material s = new TB_Work_Material();
                        s.nMaterialID = per.nMaterialID;
                        s.nAmount = per.nAmount;
                        s.IsActive = per.IsActive;
                        db.TB_Work_Material.Add(s);
                    }
                    db.SaveChanges();

                }
                result.sStatus = SysFunc.process_Success;

            }
            catch (Exception e)
            {
                result.sStatus = SysFunc.process_Error;
                result.sMsg = e.Message;
            }
            return result;
        }

        [HttpGet]
        public IActionResult EditData(int nID)
        {
            var result = new cListJobDescription();
            cTB_Work EditDataWork = new cTB_Work();
            try
            {
                PTTGSP_DWSContext db = new PTTGSP_DWSContext();

                var lstWork = db.TB_Work.Where(w => !w.IsDel && w.nWorkID == nID).ToList();
                var lstReason = db.TB_Reason.Where(w => !w.IsDel).ToList();
                EditDataWork = (from s in lstWork
                                from g in lstReason.Where(w => w.nReasonID == s.nReasonID)
                                select new cTB_Work
                                {
                                    nWorkID = s.nWorkID,
                                    sName = s.sName,
                                    nReasonID = g.nReasonID,
                                    sReason = g.sName,
                                    sDetail = s.sDetail,
                                    bStatus = s.IsActive,
                                    sStatus_Name = s.IsActive ? "ใช้งาน" : "ไม่ใช้งาน",
                                }).FirstOrDefault();
            }
            catch (Exception e)
            {
                result.sStatus = SysFunc.process_Error;
                result.sMsg = e.Message;
            }
            return Ok(EditDataWork);
        }

        [HttpPost]
        public SysModalGlobal.CResutlWebMethod DeleteData(string str)
        {
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();
            SysModalGlobal.CResutlWebMethod result = new SysModalGlobal.CResutlWebMethod();

            try
            {
                if (!String.IsNullOrEmpty(str))
                {
                    var data = str.Split(',').Select(Int32.Parse).ToList();
                    var lstWorkMate = db.TB_Work_Material.Where(w => data.Contains(w.nWorkID)).ToList();

                    foreach (var item in lstWorkMate)
                    {
                        db.TB_Work_Material.Remove(item);

                    }
                    db.SaveChanges();

                    var lstnID = db.TB_Work.Where(w => !w.IsDel).ToList();
                    var lstData = lstnID.Where(w => data.Contains(w.nWorkID)).ToList();
                    lstData.ForEach(f => f.IsDel = true);

                    db.SaveChanges();
                    result.sStatus = SysFunc.process_Success;
                }

            }
            catch (Exception e)
            {
                result.sStatus = SysFunc.process_Error;
                result.sMsg = e.Message;
            }
            return result;
        }

        [HttpPost]
        public IActionResult onDeleteDataMaterial(int nMaterialID)
        {

            CResutlWebMethod result = new CResutlWebMethod();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            result.sStatus = STFunction.process_Success();
            return Ok(result);
        }

        #region Class

        public class cListJobDescription : SysModalGlobal.CResutlWebMethod
        {
            public List<lst_Work> lst_Work { get; set; }
            public List<lst_Materials> lst_Materials { get; set; }
            public List<lstWorkMaterial> lstWorkMaterial { get; set; }
        }

        public class lstSavedata
        {
            public List<lstWorkMaterial> lstWorkMaterial { get; set; }
            public int nWorkID { get; set; }
            public string sName { get; set; }
            public int nReasonID { get; set; }
            public string sReason { get; set; }
            public string sDetail { get; set; }
            public bool IsActive { get; set; }
            public bool IsDel { get; set; }
            public string sCreateBy { get; set; }
            public DateTime dCreate { get; set; }
            public string sUpdateBy { get; set; }
            public DateTime dUpdate { get; set; }
            public bool bStatus { get; set; }
            public string sStatus_Name { get; set; }
            public string sUpdate { get; set; }
            public bool IsUse { get; set; }
        }

        public class lst_Work
        {
            public int nWorkID { get; set; }
            public string sName { get; set; }
            public int nReasonID { get; set; }
            public string sReason { get; set; }
            public string sDetail { get; set; }
            public bool bStatus { get; set; }
            public string sStatus_Name { get; set; }
            public DateTime dUpdate { get; set; }
            public string sUpdate { get; set; }
            public bool IsUse { get; set; }
        }

        public class lstWorkMaterial
        {
            public int nWorkID { get; set; }
            public int nMaterialID { get; set; }
            public int nAmount { get; set; }
            public bool IsActive { get; set; }
        }

        public class lst_Materials
        {
            public int nMaterialID { get; set; }
            public string sMaterialCode { get; set; }
            public string sName { get; set; }
            public int nAmount { get; set; }
            public int nUnitID { get; set; }
            public string sUnitName { get; set; }
            public string sDetail { get; set; }
            public bool bStatus { get; set; }
            public string sStatus_Name { get; set; }
            public DateTime dUpdate { get; set; }
            public string sUpdate { get; set; }
        }

        public class cTB_Work
        {
            public int nWorkID { get; set; }
            public string sName { get; set; }
            public int nReasonID { get; set; }
            public string sDetail { get; set; }
            public bool IsActive { get; set; }
            public bool IsDel { get; set; }
            public int? nCreateBy { get; set; }
            public DateTime dCreate { get; set; }
            public int? nUpdateBy { get; set; }
            public DateTime dUpdate { get; set; }
            public string sReason { get; set; }

            public bool bStatus { get; set; }
            public string sStatus_Name { get; set; }
            public string sUpdate { get; set; }
        }

        public class List_TB_Reason
        {
            public string value { get; set; }
            public string label { get; set; }
        }

        public class List_TB_Material
        {
            public string value { get; set; }
            public string label { get; set; }
            public string MaterialCode { get; set; }
            public string sUnitname { get; set; }

        }


        #endregion

    }
}