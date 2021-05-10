using Extensions.Common.STExtension;
using Extensions.Common.STResultAPI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GSP.Models.DB;
using PTT_GSP.Models.PISEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GSP.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RequestApprovalController : ControllerBase
    {
        public PTTGSP_DWSContext db = new PTTGSP_DWSContext();
        public PISContext pis = new PISContext();
        public RequestApprovalRetrunlst GetData_List(RequestApproval_Search data)
        {
            db = new PTTGSP_DWSContext();
            pis = new PISContext();
            RequestApprovalRetrunlst result = new RequestApprovalRetrunlst();
            List<RequestApproval_H> H_TB = new List<RequestApproval_H>();
            int? nReasonID;
            int? sStepID;
            if (!string.IsNullOrEmpty(data.sReasonID)) { nReasonID = data.sReasonID.ToIntOrNull(); } else { nReasonID = null; }
            if (!string.IsNullOrEmpty(data.sStepID)) { sStepID = data.sStepID.ToIntOrNull(); } else { sStepID = null; }
            string EmpCode = "580589";
            var lstData = (from R in db.T_Request.Where(w =>
            ((w.sEmpCode_MG1 == EmpCode && w.IsApproved_MG1 == null) || (w.sEmpCode_MG2 == EmpCode && w.IsApproved_MG2 == null) ||
            (w.sEmpCode_MG3 == EmpCode && w.IsApproved_MG3 == null)) &&
        (!string.IsNullOrEmpty(data.sRequestNo) ? (w.sRequestNo.ToLower().Contains(data.sRequestNo.ToLower().Trim())) : true))
                           from Re in db.TB_Reason.Where(w => w.nReasonID == R.nReasonID && (nReasonID.HasValue ? w.nReasonID == nReasonID : true))
                           from U in db.TB_User.Where(w => w.sEmployeeID == R.sCreateBy &&
                           (!string.IsNullOrEmpty(data.sEmployeeID) ? (w.sEmployeeID.ToLower().Contains(data.sEmployeeID.ToLower().Trim())) : true))
                           from SR in db.TM_Step_Request.Where(w => w.nStepID == R.nStepID && (sStepID.HasValue ? w.nStepID == sStepID : true))
                           select new
                           {
                               R.nRequestID,
                               R.sRequestNo,    //เลขที่ใบขอเบิก
                               R.sCreateBy, //รหัสผู้ขอเบิก
                               U.sFirstName,    //ชื่อผู้ขอเบิก
                               U.sLastName, //นามสกุลผู้ขอเบิก
                               R.nReasonID, //เหตุผลในการเบิก
                               sReasonName = Re.sName,//ชื่อเหตุผลในการเบิก
                               R.dCreate,   //วันที่เบิก
                               R.nRequest_TotalPrice,   //จำนวนเงิน
                               R.sOrgID,    //หน่วยงาน
                               R.nStepID,   //สถานะของรายการ
                               SR.sName //ชื่อสถานะของรายการ
                           }).ToList();
            foreach (var i in lstData)
            {
                List<RequestApproval_S> S_TB = new List<RequestApproval_S>();
                var H = new RequestApproval_H();
                var lstSub = db.T_Request_Material.Where(w => w.IsApprove == true && w.nRequestID == i.nRequestID).Select(s => new RequestApproval_S
                {
                    IsApprove = s.IsApprove,
                    nMaterialID = s.nMaterialID,
                    nPay_Amount = s.nPay_Amount,
                    nID = s.nID,
                    sNote = s.sNote,
                    nPay_Price = s.nPay_Price,
                    nPay_TotalPrice = s.nPay_TotalPrice,
                    nRequestID = s.nRequestID,
                    nRequest_Amount = s.nRequest_Amount,
                    nRequest_Price = s.nRequest_Price,
                    nRequest_TotalPrice = s.nRequest_TotalPrice,

                }).ToList();
                foreach (var sub in lstSub)
                {
                    RequestApproval_S s = new RequestApproval_S();
                    var Materials = db.TB_Materials.FirstOrDefault(w => w.nMaterialID == sub.nMaterialID);
                    if (Materials != null)
                    {
                        s.nMaterialID = sub.nMaterialID; //รหัสวัสดุ
                        s.sMaterialCode = Materials.sMaterialCode; // โค้ดวัสดุ
                        s.sMaterialName = Materials.sName; // ชื่อวัสดุ
                        s.nPrice = Materials.nPrice;
                        var Unit = db.TB_Material_Unit.FirstOrDefault(f => f.nUnitID == Materials.nUnitID);
                        if (Unit != null) s.sUnitName = Unit.sName; // หน่วยนับ
                        else s.sUnitName = "";
                    }

                    s.nID = sub.nID;
                    s.nRequestID = sub.nRequestID;
                    s.nRequest_Amount = sub.nRequest_Amount;// จำนวนขอเบิก
                    s.nPay_Amount = sub.nPay_Amount; //จำนวนที่ได้รับ
                    s.nPay_TotalPrice = sub.nPay_TotalPrice; //ราคารวม
                    S_TB.Add(s);
                }
                if (lstSub.Count > 0)
                {
                    H.nReasonID = i.nReasonID;
                    H.nRequestID = i.nRequestID;
                    H.nRequest_TotalPrice = i.nRequest_TotalPrice;
                    H.nStepID = i.nStepID;
                    H.sAlert = "";
                    H.sCreateBy = i.sCreateBy;
                    H.sFullName = i.sFirstName + " " + i.sLastName;
                    H.sReasonName = i.sReasonName;
                    H.sOrgID = i.sOrgID;
                    H.sRequestNo = i.sRequestNo;
                    H.StepName = i.sName;
                    //H.dCreate = i.dCreate.SetMonth_th();
                    H.sub_List = S_TB;
                    H_TB.Add(H);
                }
            }
            result.RequestApproval_H = H_TB;
            var BTName = db.TM_Option_Sub.Where(w => w.nID == 3).ToList();
            result.ApproveName = BTName.FirstOrDefault(w => w.nSubID == 2).sName; //อนุมัติ 
            result.rejectName = BTName.FirstOrDefault(w => w.nSubID == 5).sName; //ส่งกลับแก้ไข
            result.cancelName = BTName.FirstOrDefault(w => w.nSubID == 6).sName; //ยกเลิก
            return result;
        }
        public IActionResult Savedata(RequestApproval_save data)
        {
            string EmpCode = "580589";
            foreach (var i in data.lst)
            {
                int ActionID = data.nActionID.Value;
                var UpdateRequest = db.T_Request.FirstOrDefault(w => w.nRequestID == i.nRequestID);
                if (UpdateRequest != null)
                {
                    if (UpdateRequest.sEmpCode_MG1 == EmpCode)
                    {
                        if (ActionID == 2) UpdateRequest.IsApproved_MG1 = true;//อนุมัติ
                        if (ActionID == 5) UpdateRequest.IsApproved_MG1 = false;//ส่งกลับแก้ไข
                        if (ActionID == 6) UpdateRequest.IsApproved_MG1 = false;// ยกเลิก
                    }
                    else if (UpdateRequest.sEmpCode_MG2 == EmpCode)
                    {
                        if (ActionID == 2) UpdateRequest.IsApproved_MG2 = true;//อนุมัติ
                        if (ActionID == 5) UpdateRequest.IsApproved_MG2 = false;//ส่งกลับแก้ไข
                        if (ActionID == 6) UpdateRequest.IsApproved_MG2 = false;// ยกเลิก
                    }
                    else if (UpdateRequest.sEmpCode_MG3 == EmpCode)
                    {
                        if (ActionID == 2) UpdateRequest.IsApproved_MG3 = true;//อนุมัติ
                        if (ActionID == 5) UpdateRequest.IsApproved_MG3 = false;//ส่งกลับแก้ไข
                        if (ActionID == 6) UpdateRequest.IsApproved_MG3 = false;// ยกเลิก
                    }
                    bool IsPass_MG1 = true;
                    bool IsPass_MG2 = true;
                    bool IsPass_MG3 = true;
                    if (UpdateRequest.sEmpCode_MG1 != null) if (UpdateRequest.IsApproved_MG1 != null) IsPass_MG1 = true; else IsPass_MG1 = false;
                    if (UpdateRequest.sEmpCode_MG2 != null) if (UpdateRequest.IsApproved_MG2 != null) IsPass_MG2 = true; else IsPass_MG2 = false;
                    if (UpdateRequest.sEmpCode_MG3 != null) if (UpdateRequest.IsApproved_MG3 != null) IsPass_MG3 = true; else IsPass_MG3 = false;

                    if (IsPass_MG1 && IsPass_MG2 && IsPass_MG3) UpdateRequest.nStepID = 2;
                }
                var nID_Last = db.T_Request_Approval.Any() ? db.T_Request_Approval.Max(m => m.nID) : 0;
                db.T_Request_Approval.Add(new T_Request_Approval()
                {
                    nActionID = ActionID,
                    nID = nID_Last + 1,
                    nRequestID = i.nRequestID,
                    nRoleID = 4,
                    sNote = i.sNote,
                    dCreate = DateTime.Now,
                    sCreateBy = EmpCode,
                });
                foreach (var s in i.sub_List)
                {
                    var update = db.T_Request_Material.FirstOrDefault(w => w.nMaterialID == s.nMaterialID && w.nRequestID == i.nRequestID);
                    if (update != null)
                    {
                        if (s.IsApprove == null || s.IsApprove == true)
                        {
                            update.nPay_Amount = s.nPay_Amount; //จำนวนที่อนุมัติ
                            update.nPay_Price = s.nPay_Price;
                            update.nPay_TotalPrice = s.nPay_TotalPrice;
                            update.IsApprove = true;
                        }
                        else
                        {
                            update.sNote = s.sNote;
                            update.IsApprove = false; ;
                        }
                    }
                }
            }
            db.SaveChanges();
            return Ok(ResultStatus.Success);
        }
    }
    #region Class
    public class lstAutoCompleted_RequestApproval
    {
        public string value { get; set; }
        public string label { get; set; }
        public string sCODE { get; set; }
        public string sPrefix { get; set; }
        public string sLastName { get; set; }
        public string sFirstName { get; set; }
        public string sFullName { get; set; }
    }
    public class RequestApprovalRetrunlst : ResultAPI
    {
        public List<RequestApproval_H> RequestApproval_H { get; set; }
        public string ApproveName { get; set; }
        public string rejectName { get; set; }
        public string cancelName { get; set; }
    }
    public class RequestApproval_H
    {
        public int nRequestID { get; set; }
        public string sRequestNo { get; set; }
        public string StepName { get; set; }
        public string sAlert { get; set; }
        public string sOrgID { get; set; }
        public int nReasonID { get; set; }
        public string sReasonName { get; set; }
        public decimal nRequest_TotalPrice { get; set; }
        public int nStepID { get; set; }
        public string sCreateBy { get; set; }
        public string dCreate { get; set; }
        public string sFullName { get; set; }
        public string sNote { get; set; }
        public List<RequestApproval_S> sub_List { get; set; }
    }
    public class RequestApproval_S
    {
        public int nRequestID { get; set; }
        public int nMaterialID { get; set; }
        public decimal nPrice { get; set; }
        public int nID { get; set; }
        public string sMaterialCode { get; set; }
        public string sMaterialName { get; set; }
        public string sUnitName { get; set; }
        public int nRequest_Amount { get; set; }
        public decimal nRequest_Price { get; set; }
        public decimal nTotal_price { get; set; }
        public decimal nRequest_TotalPrice { get; set; }
        public int nPay_Amount { get; set; }
        public decimal nPay_Price { get; set; }
        public decimal nPay_TotalPrice { get; set; }
        public string sNote { get; set; }
        public bool? IsApprove { get; set; }
    }
    public class RequestApproval_Search
    {
        public string sReasonID { get; set; }
        public string sStepID { get; set; }
        public string sOrgID { get; set; }
        public string sRequestNo { get; set; }
        public string sEmployeeID { get; set; }
    }
    public class RequestApproval_save
    {
        public List<RequestApproval_H> lst { get; set; }
        public int? nActionID { get; set; }
    }
    #endregion
}
