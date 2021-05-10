using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class T_Request
    {
        public int nRequestID { get; set; }
        public string sRequestNo { get; set; }
        public string sGoodsIssueNo { get; set; }
        public string sOrgID { get; set; }
        public string sLocation { get; set; }
        public DateTime dUseDate { get; set; }
        public int nReasonID { get; set; }
        public string sDetail_Reason { get; set; }
        public bool IsFastTrack { get; set; }
        public string sDetail_FastTrack { get; set; }
        public string sRecipient_EmployeeID { get; set; }
        public DateTime? dReceiveDate { get; set; }
        public int? nWorkID { get; set; }
        public decimal nRequest_TotalPrice { get; set; }
        public decimal nPay_TotalPrice { get; set; }
        public string sEmpCode_MG1 { get; set; }
        public string sEmpCode_MG2 { get; set; }
        public string sEmpCode_MG3 { get; set; }
        public bool? IsApproved_MG1 { get; set; }
        public bool? IsApproved_MG2 { get; set; }
        public bool? IsApproved_MG3 { get; set; }
        public int nStepID { get; set; }
        public bool IsRevisit { get; set; }
        public bool IsCancel { get; set; }
        public string sCreateBy { get; set; }
        public DateTime dCreate { get; set; }
        public string sUpdateBy { get; set; }
        public DateTime dUpdate { get; set; }
    }
}
