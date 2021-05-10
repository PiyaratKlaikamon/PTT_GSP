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
using Models.SystemModels.UserAccount;
using Interfaces.Authentication;
using PTT_GSP.Models.DB;
using PTT_GSP.Models.PISEntities;
using PTT_GSP.SysGlobal;

namespace PTT_GSP.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MainRequestListController : ControllerBase
    {
        CultureInfo culture = new CultureInfo("th-TH");
        public readonly PTTGSP_DWSContext db;
        public readonly PISContext pis;
        private readonly IAuthentication IAuthen;
        public MainRequestListController(IAuthentication au)
        {
            IAuthen = au;
        }

        [HttpGet]
        public List<List_TB_Agency> GetAgency()
        {
            PISContext pis = new PISContext();

            // var lstAgency = pis.unit.Where(w => w.DUMMY_RELATIONSHIP == "1-1" || ("1-1").Contains(w.DUMMY_RELATIONSHIP)).ToList().Select(s => new List_TB_Agency
            var lstAgency = pis.unit.Where(w => w.DUMMY_RELATIONSHIP == "1-1" || (w.DUMMY_RELATIONSHIP.Contains("1-1"))).ToList().Select(s => new List_TB_Agency
            {
                label = s.longname + " " + s.unitabbr + " ",
                value = s.unitcode
            }).ToList();
            return lstAgency;
        }

        [HttpGet]
        public cListRequest GetListtRequest(string txtSearch, string dropdown, string dsStartDate, string dsEndDate)
        {
            var result = new cListRequest();

            try
            {
                UserAccount ua = IAuthen.SessionInfo();

                PTTGSP_DWSContext db = new PTTGSP_DWSContext();
                PISContext pis = new PISContext();

                txtSearch = (txtSearch + "").ToLower();

                var lstEmpcode = pis.personel_info.Where(w => w.CODE.Contains(txtSearch) ||
                 (w.FNAME + " " + w.LNAME).Contains(txtSearch) || (dropdown != null ? w.UNITCODE == dropdown : true)).Select(s => s.CODE).ToList();

                // var lstDropdown = pis.personel_info.Where(w => w.UNITCODE.Contains(dropdown)).Select(s => s.CODE).ToList();


                var lstRequest = db.T_Request
                    .Where(w => (ua.nRoleID == 1 || ua.nRoleID == 2) ? lstEmpcode.Contains(w.sCreateBy) : w.sCreateBy == ua.sEmployeeCode)
                    .Select(s => new
                    {
                        s.nRequestID,
                        s.sRequestNo,
                        s.nStepID,
                        s.nReasonID,
                        s.dCreate,
                        s.IsApproved_MG1,
                        s.IsApproved_MG2,
                        s.IsApproved_MG3,
                        s.IsCancel
                    }).ToList(); //การเบิก
                var lstRequestID = lstRequest.Select(s => s.nRequestID).ToList();
                var lstRequestMaterial = db.T_Request_Material.Where(w => lstRequestID.Contains(w.nRequestID))
                    .Select(s => new
                    {
                        s.nRequestID,
                        s.nMaterialID,
                        s.nPay_TotalPrice,
                        s.nRequest_Amount,
                        s.sNote
                    }).ToList(); //การเบิกวัสดุ
                var lstStepID = lstRequest.Select(s => s.nStepID).ToList();
                var lstStepRequest = db.TM_Step_Request.Where(w => lstStepID.Contains(w.nStepID)).Select(s => new { s.nStepID, s.sName }).ToList(); //สเต็ปการเบิก
                var lstRequestMaterialID = lstRequestMaterial.Select(s => s.nMaterialID).ToList();
                var lstMaterial = db.TB_Materials.Where(w => !w.IsDel && lstRequestMaterialID.Contains(w.nMaterialID))
                .Select(s => new
                {
                    s.nMaterialID,
                    s.sMaterialCode,
                    s.sName,
                    s.nUnitID
                }).ToList(); //วัสดุ
                var lstMaterialUnit = db.TB_Material_Unit.Where(w => !w.IsDel).Select(s => new { s.nUnitID, s.sName }).ToList(); //หน่วยนับวัสดุ
                var lstReason = db.TB_Reason.Where(w => !w.IsDel).Select(s => new { s.nReasonID, s.sName }).ToList(); //เหตุผลในการเบิก

                var Request = (from a in lstRequest
                               join c in lstStepRequest on a.nStepID equals c.nStepID
                               //    join d in T_Reason on a.nReasonID equals d.nReasonID
                               select new lstRequest
                               {
                                   nRequestID = a == null ? 0 : a.nRequestID,
                                   sRequestNo = a == null ? "" : a.sRequestNo,
                                   dCreate = a.dCreate,
                                   sCreate = a.dCreate.ToString("dd/MM/yyyy", culture),
                                   nStepID = a == null ? 0 : a.nStepID,
                                   sStepName = c == null ? "" : c.sName,
                                   IsCancel = a.IsCancel,
                                   IsApprove = (a.IsApproved_MG1 ?? false) || (a.IsApproved_MG2 ?? false) || (a.IsApproved_MG3 ?? false),
                                   lstRequestMaterial = (from e in lstRequestMaterial
                                                         join f in lstMaterial on e.nMaterialID equals f.nMaterialID
                                                         join g in lstMaterialUnit on f.nUnitID equals g.nUnitID
                                                         join h in lstReason on a.nReasonID equals h.nReasonID
                                                         where e.nRequestID == a.nRequestID
                                                         select new lstRequestMaterial
                                                         {
                                                             nMaterialID = f.nMaterialID,
                                                             sMaterialCode = f.sMaterialCode,
                                                             sName = f.sName,
                                                             nRequest_Amount = e.nRequest_Amount,
                                                             nUnitID = f.nUnitID,
                                                             sUnitname = g.sName,
                                                             nPay_TotalPrice = e.nPay_TotalPrice,
                                                             nReasonID = a == null ? 0 : a.nReasonID,
                                                             sReasonName = h == null ? "" : h.sName,
                                                             sNote = e.sNote,
                                                         }).ToList()
                               }).ToList();


                if (!string.IsNullOrWhiteSpace(dsStartDate) && !string.IsNullOrWhiteSpace(dsEndDate))
                {
                    DateTime sDate = Convert.ToDateTime(dsStartDate ?? "1900-01-01");
                    DateTime eDate = Convert.ToDateTime(dsEndDate ?? "9999-01-01");
                    Request = Request.Where(w =>
                    (w.dCreate >= sDate && w.dCreate <= eDate)).ToList();
                }

                // if (!string.IsNullOrWhiteSpace(dsStartDate))
                // {
                //     DateTime sDate = Convert.ToDateTime(dsStartDate ?? "1900-01-01");
                //     Request = Request.Where(w =>
                //     (w.dCreate >= sDate && w.dCreate == null) || (w.dCreate >= sDate && w.dCreate == null)).ToList();
                // }



                result.lstRequest = Request;

            }
            catch (Exception e)
            {
                result.sStatus = SysFunc.process_Error;
                result.sMsg = e.Message;
            }
            return result;
        }

        #region Class
        public class cListRequest : SysModalGlobal.CResutlWebMethod
        {
            public List<lstRequest> lstRequest { get; set; }
        }
        public class lstRequest
        {
            public int nRequestID { get; set; }
            public string sRequestNo { get; set; }
            public DateTime dCreate { get; set; }
            public string sCreate { get; set; }
            public int nStepID { get; set; }
            public string sStepName { get; set; }
            public string sNote { get; set; }
            public List<lstRequestMaterial> lstRequestMaterial { get; set; }
            public bool IsApprove { get; set; }
            public bool IsCancel { get; set; }
        }

        public class lstRequestMaterial
        {
            public int nMaterialID { get; set; }
            public string sMaterialCode { get; set; }
            public string sName { get; set; }
            public int nRequest_Amount { get; set; }
            public int nUnitID { get; set; }
            public string sUnitname { get; set; }
            public decimal nPay_TotalPrice { get; set; }
            public decimal nRequest_Price { get; set; }
            public int nReasonID { get; set; }
            public string sReasonName { get; set; }
            public string sNote { get; set; }
        }

        public class cReturnSetPage : SysModalGlobal.CResutlWebMethod
        {
            public bool IsUser { get; set; }
            public bool IsApprove { get; set; }
            public bool IsCancel { get; set; }
        }

        public class List_TB_Agency
        {
            public string value { get; set; }
            public string label { get; set; }
        }

        #endregion
    }
}