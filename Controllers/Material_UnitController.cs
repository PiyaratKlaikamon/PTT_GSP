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
    public class Material_UnitController : ControllerBase
    {
        CultureInfo culture = new CultureInfo("th-TH");

        [HttpGet]
        public cListMaterialUnit GetListMaterialUnit(string txtSearch, string sIsActive)
        {
            var result = new cListMaterialUnit();
            try
            {
                PTTGSP_DWSContext db = new PTTGSP_DWSContext();

                var lstMaterial_unit = db.TB_Material_Unit.Where(w => !w.IsDel).ToList();
                var lstMaterial = db.TB_Materials.Where(w => !w.IsDel).ToList();
                var Meterial_Unit = lstMaterial_unit.Select(s => new lstMaterial_unit
                {
                    nUnitID = s.nUnitID,
                    sName = s.sName,
                    sDetail = s.sDetail,
                    bStatus = s.IsActive,
                    sStatus_Name = s.IsActive ? "ใช้งาน" : "ไม่ใช้งาน",
                    dUpdate = s.dUpdate,
                    sUpdate = s.dUpdate.ToString("dd/MM/yyyy", culture),
                    IsUse = lstMaterial.Where(w => w.nUnitID == s.nUnitID).FirstOrDefault() == null ? false : true
                }).ToList();

                if (!string.IsNullOrEmpty(txtSearch) && txtSearch != "none")
                {
                    Meterial_Unit = Meterial_Unit.Where(item => item.sName.Trim().ToLower().Contains(txtSearch.Trim().ToLower())).ToList();
                }
                if (!string.IsNullOrEmpty(sIsActive))
                {
                    var isActive = sIsActive == "1";
                    Meterial_Unit = Meterial_Unit.Where(a => a.bStatus == isActive).ToList();
                }

                result.lstMaterial_unit = Meterial_Unit.ToList();
            }
            catch (Exception e)
            {
                result.sStatus = SysFunc.process_Error;
                result.sMsg = e.Message;
            }
            return result;
        }

        [HttpPost]
        public SysModalGlobal.CResutlWebMethod SavetoDB([FromBody] TB_Material_Unit data)
        {
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();
            var result = new SysModalGlobal.CResutlWebMethod();

            try
            {
                var MaterialUnit = db.TB_Material_Unit.ToList();

                var duplicate = (from a in db.TB_Material_Unit
                                 where !a.IsDel && a.sName.Trim().ToLower() == data.sName.Trim().ToLower() && a.nUnitID != data.nUnitID
                                 select a).FirstOrDefault();
                if (duplicate != null)
                {
                    // result.sStatus = SysGlobal.SysFunc.process_Duplicate;
                    result.sStatus = STFunction.process_Warning();
                    result.sMsg = "หน่วยนับนี้มีในระบบอยู่แล้ว";
                    return result;
                }
                var nUnitID = (MaterialUnit.Any() ? MaterialUnit.Max(m => m.nUnitID) : 0) + 1;
                if (data.nUnitID == 0)
                {
                    db.TB_Material_Unit.Add(new TB_Material_Unit
                    {
                        sName = data.sName,
                        sDetail = data.sDetail,
                        IsActive = data.IsActive,
                        IsDel = false,
                        dCreate = DateTime.Now,
                        sCreateBy = data.sCreateBy,
                        dUpdate = DateTime.Now,
                        sUpdateBy = data.sUpdateBy,
                    });
                    db.SaveChanges();
                }
                else
                {
                    var oldnID = (from a in db.TB_Material_Unit
                                  where a.nUnitID == data.nUnitID
                                  select a).FirstOrDefault();

                    if (oldnID != null)
                    {
                        oldnID.sName = data.sName;
                        oldnID.sDetail = data.sDetail;
                        oldnID.IsActive = data.IsActive;
                        oldnID.IsDel = false;
                        oldnID.dUpdate = DateTime.Now;
                        oldnID.sUpdateBy = data.sUpdateBy;

                        db.SaveChanges();
                    }
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
        public IActionResult EditMaterialUnit(int nID)
        {
            var result = new cListMaterialUnit();
            cTB_Material_Unit EditMaterialUnit = new cTB_Material_Unit();
            try
            {
                PTTGSP_DWSContext db = new PTTGSP_DWSContext();

                var lstMaterial_unit = db.TB_Material_Unit.Where(w => !w.IsDel && w.nUnitID == nID).ToList();
                EditMaterialUnit = (from a in lstMaterial_unit.Where(w => !w.IsDel)
                                    select new cTB_Material_Unit
                                    {
                                        nUnitID = a.nUnitID,
                                        sName = a.sName,
                                        sDetail = a.sDetail,
                                        bStatus = a.IsActive,
                                        sStatus_Name = a.IsActive ? "ใช้งาน" : "ไม่ใช้งาน",
                                        dUpdate = a.dUpdate,
                                        sUpdate = a.dUpdate.ToString("dd/MM/yyyy", culture),
                                    }).FirstOrDefault();
            }
            catch (Exception e)
            {
                result.sStatus = SysFunc.process_Error;
                result.sMsg = e.Message;
            }

            return Ok(EditMaterialUnit);
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
                    var lstnID = db.TB_Material_Unit.Where(w => !w.IsDel).ToList();

                    var lstMaterial = db.TB_Materials.Where(w => !w.IsDel).ToList();

                    var lstData = lstnID.Where(w => data.Contains(w.nUnitID)).ToList();
                    lstData.ForEach(f =>
                    {
                        var IsUse = lstMaterial.Where(w => w.nUnitID == f.nUnitID).ToList();
                        if (IsUse.Count() == 0)
                        {
                            f.IsDel = true;
                        }

                    });


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

        #region Class
        public class cListMaterialUnit : SysModalGlobal.CResutlWebMethod
        {
            public List<lstMaterial_unit> lstMaterial_unit { get; set; }
        }
        public class lstMaterial_unit
        {
            public int nUnitID { get; set; }
            public string sName { get; set; }
            public string sDetail { get; set; }
            public bool bStatus { get; set; }
            public string sStatus_Name { get; set; }
            public DateTime dUpdate { get; set; }
            public string sUpdate { get; set; }
            public bool IsUse { get; set; }
        }

        public class cTB_Material_Unit
        {
            public int nUnitID { get; set; }
            public string sName { get; set; }
            public string sDetail { get; set; }
            public bool IsActive { get; set; }
            public bool IsDel { get; set; }
            public int? nCreateBy { get; set; }
            public DateTime dCreate { get; set; }
            public int? nUpdateBy { get; set; }
            public DateTime dUpdate { get; set; }

            public bool bStatus { get; set; }
            public string sStatus_Name { get; set; }
            public string sUpdate { get; set; }
        }

        #endregion
    }
}