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
    public class ReasonWithdrawalController : ControllerBase
    {
        CultureInfo culture = new CultureInfo("th-TH");

        [HttpGet]
        public cListReason GetListReason(string txtSearch, string sIsActive)
        {
            var result = new cListReason();
            try
            {
                PTTGSP_DWSContext db = new PTTGSP_DWSContext();

                var lstReason = db.TB_Reason.Where(w => !w.IsDel).ToList();
                var lst_Work = db.TB_Work.Where(w => !w.IsDel).ToList();
                var Reason = (from s in lstReason
                              select new lst_Reason
                              {
                                  nReasonID = s.nReasonID,
                                  sName = s.sName,
                                  sDetail = s.sDetail,
                                  bStatus = s.IsActive,
                                  sStatus_Name = s.IsActive ? "ใช้งาน" : "ไม่ใช้งาน",
                                  dUpdate = s.dUpdate,
                                  sUpdate = s.dUpdate.ToString("dd/MM/yyyy", culture),
                                  IsUse = lst_Work.Where(w => w.nReasonID == s.nReasonID).FirstOrDefault() == null ? false : true
                              }).ToList();

                if (!string.IsNullOrEmpty(txtSearch) && txtSearch != "none")
                {
                    Reason = Reason.Where(item => item.sName.Trim().ToLower().Contains(txtSearch.Trim().ToLower())).ToList();
                }
                if (!string.IsNullOrEmpty(sIsActive))
                {
                    var isActive = sIsActive == "1";
                    Reason = Reason.Where(a => a.bStatus == isActive).ToList();
                }

                result.lst_Reason = Reason.ToList();
            }
            catch (Exception e)
            {
                result.sStatus = SysFunc.process_Error;
                result.sMsg = e.Message;
            }
            return result;
        }

        [HttpPost]
        public SysModalGlobal.CResutlWebMethod SavetoDB([FromBody] TB_Reason data)
        {
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();
            var result = new SysModalGlobal.CResutlWebMethod();

            try
            {

                var Reason = db.TB_Reason.ToList();

                var duplicate = (from a in db.TB_Reason
                                 where !a.IsDel && a.sName.Trim().ToLower() == data.sName.Trim().ToLower() && a.nReasonID != data.nReasonID
                                 select a).FirstOrDefault();
                if (duplicate != null)
                {
                    // result.sStatus = SysGlobal.SysFunc.process_Duplicate;
                    result.sStatus = STFunction.process_Warning();
                    result.sMsg = "เหตุผลในการเบิกนี้มีในระบบอยู่แล้ว";
                    return result;
                }
                var nLocationID = (Reason.Any() ? Reason.Max(m => m.nReasonID) : 0) + 1;

                if (data.nReasonID == 0)
                {
                    db.TB_Reason.Add(new TB_Reason
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
                    var oldnID = (from a in db.TB_Reason
                                  where a.nReasonID == data.nReasonID
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
        public IActionResult EditReason(int nID)
        {
            var result = new cListReason();
            cTB_Reason EditReason = new cTB_Reason();

            try
            {
                PTTGSP_DWSContext db = new PTTGSP_DWSContext();

                var lstReason = db.TB_Reason.Where(w => !w.IsDel && w.nReasonID == nID).ToList();
                EditReason = (from s in lstReason.Where(w => !w.IsDel)
                              select new cTB_Reason
                              {
                                  nReasonID = s.nReasonID,
                                  sName = s.sName,
                                  sDetail = s.sDetail,
                                  bStatus = s.IsActive,
                                  sStatus_Name = s.IsActive ? "ใช้งาน" : "ไม่ใช้งาน",
                                  dUpdate = s.dUpdate,
                                  sUpdate = s.dUpdate.ToString("dd/MM/yyyy", culture),
                              }).FirstOrDefault();

            }
            catch (Exception e)
            {
                result.sStatus = SysFunc.process_Error;
                result.sMsg = e.Message;
            }
            return Ok(EditReason);
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
                    var lstnID = db.TB_Reason.Where(w => !w.IsDel).ToList();

                    var lstWork = db.TB_Work.Where(w => !w.IsDel).ToList();

                    var lstData = lstnID.Where(w => data.Contains(w.nReasonID)).ToList();

                    lstData.ForEach(f =>
                    {
                        var IsUse = lstWork.Where(w => w.nReasonID == f.nReasonID).ToList();
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

        public class cListReason : SysModalGlobal.CResutlWebMethod
        {
            public List<lst_Reason> lst_Reason { get; set; }
        }

        public class lst_Reason
        {
            public int nReasonID { get; set; }
            public string sName { get; set; }
            public string sDetail { get; set; }
            public bool bStatus { get; set; }
            public string sStatus_Name { get; set; }
            public DateTime dUpdate { get; set; }
            public string sUpdate { get; set; }
            public bool IsUse { get; set; }
        }

        public class cTB_Reason
        {
            public int nReasonID { get; set; }
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
