using Extensions.Common.STResultAPI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GSP.Models.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using Extensions.Common.STExtension;
using ClosedXML.Excel;
using System.IO;
using PTT_GSP.Models.PISEntities;

namespace PTT_GSP.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class Withdrawal_historyController : ControllerBase
    {
        public PTTGSP_DWSContext db = new PTTGSP_DWSContext();
        public PISContext pis = new PISContext();
        public WithdrawalRetrunlst GetData_List(Withdrawal_Search data)
        {
            db = new PTTGSP_DWSContext();
            pis = new PISContext();
            WithdrawalRetrunlst result = new WithdrawalRetrunlst();
            List<Withdrawal_history_H> H_TB = new List<Withdrawal_history_H>();
            int? nReasonID;
            int? sStepID;
            if (!string.IsNullOrEmpty(data.sReasonID)) { nReasonID = data.sReasonID.ToIntOrNull(); } else { nReasonID = null; }
            if (!string.IsNullOrEmpty(data.sStepID)) { sStepID = data.sStepID.ToIntOrNull(); } else { sStepID = null; }


            var lstData = (from R in db.T_Request.Where(w =>
        (!string.IsNullOrEmpty(data.sRequestNo) ? (w.sRequestNo.ToLower().Contains(data.sRequestNo.ToLower().Trim())) : true))
                           from Re in db.TB_Reason.Where(w => w.nReasonID == R.nReasonID && (nReasonID.HasValue ? w.nReasonID == nReasonID : true))
                           from U in db.TB_User.Where(w => w.sEmployeeID == R.sCreateBy &&
                           (!string.IsNullOrEmpty(data.sEmployeeID) ? (w.sEmployeeID.ToLower().Contains(data.sEmployeeID.ToLower().Trim())) : true))
                           from SR in db.TM_Step_Request.Where(w => w.nStepID == R.nStepID && (sStepID.HasValue ? w.nStepID == sStepID : true))
                           select new
                           {
                               R.nRequestID,
                               R.sRequestNo,//เลขที่ใบขอเบิก
                               R.sCreateBy,//รหัสผู้ขอเบิก
                               U.sFirstName, //ชื่อผู้ขอเบิก
                               U.sLastName,//นามสกุลผู้ขอเบิก
                               R.nReasonID,//เหตุผลในการเบิก
                               sReasonName = Re.sName,//ชื่อเหตุผลในการเบิก
                               R.dCreate,//วันที่เบิก
                               R.nRequest_TotalPrice,
                               R.sOrgID,//หน่วยงาน
                               R.nStepID, //สถานะของรายการ
                               SR.sName//ชื่อสถานะของรายการ
                           }).ToList();
            foreach (var i in lstData)
            {
                List<Withdrawal_history_S> S_TB = new List<Withdrawal_history_S>();
                var H = new Withdrawal_history_H();
                var lstSub = db.T_Request_Material.Where(w => w.IsApprove == true && w.nRequestID == i.nRequestID).Select(s => new Withdrawal_history_S
                {
                    IsApprove = s.IsApprove,
                    nMaterialID = s.nMaterialID,
                    nPay_Amount = s.nPay_Amount,
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
                    Withdrawal_history_S s = new Withdrawal_history_S();
                    var Materials = db.TB_Materials.FirstOrDefault(w => w.nMaterialID == sub.nMaterialID);
                    if (Materials != null)
                    {
                        s.sMaterialCode = Materials.sMaterialCode; // รหัสวัสดุ
                        s.sMaterialName = Materials.sName; // ชื่อวัสดุ
                        var Unit = db.TB_Material_Unit.FirstOrDefault(f => f.nUnitID == Materials.nUnitID);
                        if (Unit != null) s.sUnitName = Unit.sName; // หน่วยนับ
                        else s.sUnitName = "";
                    }
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
            result.Withdrawal_history_H = H_TB;
            var lstStep = db.TM_Step_Request.OrderBy(o => o.sName).ToList();
            var lstReason = db.TB_Reason.Where(w => !w.IsDel && w.IsActive).OrderBy(o => o.sName).ToList();
            result.TB_Reason = lstReason;
            result.TM_Step_Request = lstStep;

            var lstUser = (from U in db.TB_User.Where(w => w.IsActive && !w.IsDel)
                           select new lstAutoCompleted_Withdrawal
                           {
                               sEmployeeID = U.sEmployeeID,
                               value = U.sEmployeeID,
                               label = U.sEmployeeID + " " + "-" + " " + U.sFirstName + " " + U.sLastName,
                               sFirstName = U.sFirstName,
                               sLastName = U.sLastName,
                               sOrgID = U.sOrgID,
                               sOrgName = U.sOrgName,
                               sPosName = U.sPosName,
                           }
                 ).OrderBy(o => o.sFirstName).ToList();

            var lstUnit_DB = pis.unit.Where(w => (w.DUMMY_RELATIONSHIP == "1-1" || w.DUMMY_RELATIONSHIP.StartsWith("1-1-"))).ToList(); //หน่วยงาน

            var cf4 = db.TM_Config.FirstOrDefault(w => w.nID == 4);
            string sUnitCode_GSP = cf4 != null ? cf4.sValue : "80000563";
            var lstMember = PISFunction.ListUnit_ToLower(sUnitCode_GSP).Select(s=>s.CODE).ToList();

            // string[] arrWSTCode = new string[] { "A", "B", "I", "J" };
            // string[] arrPersonel = new string[] { };
            // var lstMember = PISFunction.AllReportTo_EmpCode("270073");
            // var lstPersonel = (from p in pis.personel_info.Where(w => lstMember.Contains(w.CODE))
            //                    select new lstAutoCompleted_RequestApproval
            //                    {
            //                        sCODE = p.CODE, // รหัส user
            //                        value = p.CODE,
            //                        label = p.CODE + " " + "-" + " " + p.FULLNAMETH,
            //                        sPrefix = p.INAME, // คำนำหน้า 
            //                        sFirstName = p.FNAME,
            //                        sLastName = p.LNAME,
            //                        sFullName = p.FULLNAMETH,
            //                    }
            //).OrderBy(o => o.sFirstName).ToList();
            result.lstAutoCompleted = lstUser;
            return result;
        }
        public IActionResult Export_Withdrawal()
        {
            using (var workbook = new XLWorkbook())
            {
                IXLWorksheet H1 = workbook.Worksheets.Add("ประวัติการเบิก");
                #region Data
                List<Withdrawal_history_H> H_TB = new List<Withdrawal_history_H>();
                var lstData = (from R in db.T_Request
                               from Re in db.TB_Reason.Where(w => w.nReasonID == R.nReasonID)
                               from U in db.TB_User.Where(w => w.sEmployeeID == R.sCreateBy)
                               from SR in db.TM_Step_Request.Where(w => w.nStepID == R.nStepID)
                               select new
                               {
                                   R.nRequestID,
                                   R.sRequestNo,//เลขที่ใบขอเบิก
                                   R.sCreateBy,//รหัสผู้ขอเบิก
                                   U.sFirstName, //ชื่อผู้ขอเบิก
                                   U.sLastName,//นามสกุลผู้ขอเบิก
                                   R.nReasonID,//เหตุผลในการเบิก
                                   sReasonName = Re.sName,//ชื่อเหตุผลในการเบิก
                                   R.dCreate,//วันที่เบิก
                                   R.nRequest_TotalPrice,
                                   R.sOrgID,//หน่วยงาน
                                   R.nStepID, //สถานะของรายการ
                                   SR.sName//ชื่อสถานะของรายการ
                               }).ToList();
                foreach (var i in lstData)
                {
                    List<Withdrawal_history_S> S_TB = new List<Withdrawal_history_S>();
                    var H = new Withdrawal_history_H();
                    var lstSub = db.T_Request_Material.Where(w => w.IsApprove == true && w.nRequestID == i.nRequestID).Select(s => new Withdrawal_history_S
                    {
                        IsApprove = s.IsApprove,
                        nMaterialID = s.nMaterialID,
                        nPay_Amount = s.nPay_Amount,
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
                        Withdrawal_history_S s = new Withdrawal_history_S();
                        var Materials = db.TB_Materials.FirstOrDefault(w => w.nMaterialID == sub.nMaterialID);
                        if (Materials != null)
                        {
                            s.sMaterialCode = Materials.sMaterialCode; // รหัสวัสดุ
                            s.sMaterialName = Materials.sName; // ชื่อวัสดุ
                            var Unit = db.TB_Material_Unit.FirstOrDefault(f => f.nUnitID == Materials.nUnitID);
                            if (Unit != null) s.sUnitName = Unit.sName; // หน่วยนับ
                            else s.sUnitName = "";
                        }
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
                #endregion
                #region String
                string[] arrHead = { "เลขที่ใบขอเบิก", "ผู้ขอเบิก", "เหตุผลในการเบิก", "วันที่เบิก", "จำนวนเงิน", "หน่วยงาน", "สถานะ" };
                string[] arrHead_Sub = { "ที่", "รหัสวัสดุ", "ชื่อวัสดุ", "จำนวนขอเบิก", "จำนวนที่ได้รับ", "หน่วยนับ", "ราคารวม" };
                #endregion
                #region Setting
                H1.Style.Font.FontName = "Calibri";
                #endregion
                int Rows = 1;
                foreach (var i in H_TB)
                {
                    string[] lstdata = { i.sRequestNo, i.sFullName, i.sReasonName, i.dCreate, i.nRequest_TotalPrice + "", i.sOrgID, i.StepName };

                    int Columns_arrHead = 1;
                    for (int h = 0; h < arrHead.Length; h++)
                    {
                        H1.Column(Columns_arrHead).Width = 15;
                        H1.Cell(Rows, Columns_arrHead).Value = arrHead[h];
                        H1.Cell(Rows, Columns_arrHead).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                        H1.Cell(Rows, Columns_arrHead).Style.Fill.BackgroundColor = XLColor.FromHtml("#B4C6E7");
                        H1.Cell(Rows, Columns_arrHead).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                        Columns_arrHead++;
                    }
                    Columns_arrHead = 1;
                    for (int h = 0; h < lstdata.Length; h++)
                    {
                        int data = Rows + 1;
                        H1.Cell(data, Columns_arrHead).Value = lstdata[h];
                        H1.Cell(data, Columns_arrHead).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                        H1.Cell(data, Columns_arrHead).Style.Fill.BackgroundColor = XLColor.FromHtml("#ffffff");
                        H1.Cell(data, Columns_arrHead).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                        Columns_arrHead++;
                    }
                    int Columns_Subdata = 2;
                    int datasub = 0;
                    for (int h = 0; h < arrHead_Sub.Length; h++)
                    {
                         datasub = Rows + 2;
                        H1.Column(Columns_Subdata).Width = 15;
                        H1.Cell(datasub, Columns_Subdata).Value = arrHead_Sub[h];
                        H1.Cell(datasub, Columns_Subdata).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                        H1.Cell(datasub, Columns_Subdata).Style.Fill.BackgroundColor = XLColor.FromHtml("#B4C6E7");
                        H1.Cell(datasub, Columns_Subdata).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                        Columns_Subdata++;
                    }
                    int Count = 1;
                    int rowdata = datasub + 1;
                    foreach (var sub in i.sub_List)
                    {
                        string[] lstdata_sub = { Count + "", sub.sMaterialCode, sub.sMaterialName, sub.nRequest_Amount + "", sub.nPay_Amount + "", sub.sUnitName, sub.nPay_TotalPrice + "" };
                        Columns_Subdata = 2;
                        for (int h = 0; h < lstdata_sub.Length; h++)
                        {
                            H1.Cell(rowdata, Columns_Subdata).Value = lstdata_sub[h];
                            H1.Cell(rowdata, Columns_Subdata).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                            H1.Cell(rowdata, Columns_Subdata).Style.Fill.BackgroundColor = XLColor.FromHtml("#ffffff");
                            H1.Cell(rowdata, Columns_Subdata).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                            Columns_Subdata++;
                        }
                        Count++;
                        rowdata++;
                    }
                    Rows = Rows + i.sub_List.Count() + 3;// แถว + จำนวน sub_List + แถวนับตั้งแต่ arrHead
                }
                using (MemoryStream fs = new MemoryStream())
                {
                    workbook.SaveAs(fs);
                    fs.Position = 0;
                    return File(fs.ToArray(), "application/vnd.ms-excel", "TEST.xlsx");
                }
            }
        }
    }
    #region Calss
    public class WithdrawalRetrunlst : ResultAPI
    {
        public List<Withdrawal_history_H> Withdrawal_history_H { get; set; }
        public List<TM_Step_Request> TM_Step_Request { get; set; }
        public List<TB_Reason> TB_Reason { get; set; }
        public List<lstAutoCompleted_Withdrawal> lstAutoCompleted { get; set; }

    }
    public class Withdrawal_history_H
    {
        public int nRequestID { get; set; }
        public string sRequestNo { get; set; }
        public string StepName { get; set; }
        public string sOrgID { get; set; }
        public int nReasonID { get; set; }
        public string sReasonName { get; set; }
        public decimal nRequest_TotalPrice { get; set; }
        public int nStepID { get; set; }
        public string sCreateBy { get; set; }
        public string dCreate { get; set; }
        public string sFullName { get; set; }
        public List<Withdrawal_history_S> sub_List { get; set; }
    }
    public class Withdrawal_history_S
    {
        public int nRequestID { get; set; }
        public int nMaterialID { get; set; }
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
    public class lstAutoCompleted_Withdrawal
    {
        public string value { get; set; }
        public string label { get; set; }
        public string sEmployeeID { get; set; }
        public string sFirstName { get; set; }
        public string sLastName { get; set; }
        public string sPosName { get; set; }
        public string sOrgID { get; set; }
        public string sOrgName { get; set; }
    }
    public class Withdrawal_Search
    {
        public string sReasonID { get; set; }
        public string sStepID { get; set; }
        public string sOrgID { get; set; }
        public string sRequestNo { get; set; }
        public string sEmployeeID { get; set; }
    }
    #endregion
}
