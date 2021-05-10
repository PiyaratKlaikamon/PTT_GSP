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
    public class Material_LocationController : ControllerBase
    {
        CultureInfo culture = new CultureInfo("th-TH");

        [HttpGet]
        public cListMaterialLocation GetListMaterialLocation(string txtSearch, string sIsActive)
        {
            var result = new cListMaterialLocation();
            try
            {
                PTTGSP_DWSContext db = new PTTGSP_DWSContext();

                var lstMaterial_location = db.TB_Material_Location.Where(w => !w.IsDel).ToList();
                var lstMaterial = db.TB_Materials.Where(w => !w.IsDel).ToList();
                var Meterial_Location = lstMaterial_location.Select(s => new lstMaterial_location
                {
                    nLocationID = s.nLocationID,
                    sName = s.sName,
                    sDetail = s.sDetail,
                    bStatus = s.IsActive,
                    sStatus_Name = s.IsActive ? "ใช้งาน" : "ไม่ใช้งาน",
                    dUpdate = s.dUpdate,
                    sUpdate = s.dUpdate.ToString("dd/MM/yyyy", culture),
                    IsUse = lstMaterial.Where(w => w.nLocationID == s.nLocationID).FirstOrDefault() == null ? false : true
                    //  IsUse = g.nLocationID == 0 ? false : true
                }).ToList();

                if (!string.IsNullOrEmpty(txtSearch) && txtSearch != "none")
                {
                    Meterial_Location = Meterial_Location.Where(item => item.sName.Trim().ToLower().Contains(txtSearch.Trim().ToLower())).ToList();
                }
                if (!string.IsNullOrEmpty(sIsActive))
                {
                    var isActive = sIsActive == "1";
                    Meterial_Location = Meterial_Location.Where(a => a.bStatus == isActive).ToList();
                }

                result.lstMaterial_location = Meterial_Location.ToList();
            }
            catch (Exception e)
            {
                result.sStatus = SysFunc.process_Error;
                result.sMsg = e.Message;
            }
            return result;
        }

        [HttpPost]
        public SysModalGlobal.CResutlWebMethod SavetoDB([FromBody] TB_Material_Location data)
        {
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();
            var result = new SysModalGlobal.CResutlWebMethod();

            try
            {
                var MaterialLocation = db.TB_Material_Location.ToList();

                var duplicate = (from a in db.TB_Material_Location
                                 where !a.IsDel && a.sName.Trim().ToLower() == data.sName.Trim().ToLower() && a.nLocationID != data.nLocationID
                                 select a).FirstOrDefault();
                if (duplicate != null)
                {
                    // result.sStatus = SysGlobal.SysFunc.process_Duplicate;
                    result.sStatus = STFunction.process_Warning();
                    result.sMsg = "สถานที่เก็บวัสดุนี้มีในระบบอยู่แล้ว";
                    return result;
                }
                var nLocationID = (MaterialLocation.Any() ? MaterialLocation.Max(m => m.nLocationID) : 0) + 1;
                if (data.nLocationID == 0)
                {
                    db.TB_Material_Location.Add(new TB_Material_Location
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
                    var oldnID = (from a in db.TB_Material_Location
                                  where a.nLocationID == data.nLocationID
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
        public IActionResult EditMaterialLocation(int nID)
        {
            var result = new cListMaterialLocation();
            cTB_Material_Location EditMaterialLocation = new cTB_Material_Location();
            try
            {
                PTTGSP_DWSContext db = new PTTGSP_DWSContext();

                var lstMaterial_location = db.TB_Material_Location.Where(w => !w.IsDel && w.nLocationID == nID).ToList();
                EditMaterialLocation = (from a in lstMaterial_location.Where(w => !w.IsDel)
                                        select new cTB_Material_Location
                                        {
                                            nLocationID = a.nLocationID,
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
            return Ok(EditMaterialLocation);
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
                    var lstnID = db.TB_Material_Location.Where(w => !w.IsDel).ToList();

                    var lstMaterial = db.TB_Materials.Where(w => !w.IsDel).ToList();


                    var lstData = lstnID.Where(w => data.Contains(w.nLocationID)).ToList();
                    lstData.ForEach(f =>
                    {
                        var IsUse = lstMaterial.Where(w => w.nLocationID == f.nLocationID).ToList();
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
        public class cListMaterialLocation : SysModalGlobal.CResutlWebMethod
        {
            public List<lstMaterial_location> lstMaterial_location { get; set; }
        }
        public class lstMaterial_location
        {
            public int nLocationID { get; set; }
            public string sName { get; set; }
            public string sDetail { get; set; }
            public bool bStatus { get; set; }
            public string sStatus_Name { get; set; }
            public DateTime dUpdate { get; set; }
            public string sUpdate { get; set; }
            public bool IsUse { get; set; }
        }

        public class cTB_Material_Location
        {
            public int nLocationID { get; set; }
            public string sName { get; set; }
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
        }

        #endregion

    }
}