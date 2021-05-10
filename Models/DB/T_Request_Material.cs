using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class T_Request_Material
    {
        public int nID { get; set; }
        public int nRequestID { get; set; }
        public int nMaterialID { get; set; }
        public int nRequest_Amount { get; set; }
        public decimal nRequest_Price { get; set; }
        public decimal nRequest_TotalPrice { get; set; }
        public int nPay_Amount { get; set; }
        public decimal nPay_Price { get; set; }
        public decimal nPay_TotalPrice { get; set; }
        public string sNote { get; set; }
        public bool? IsApprove { get; set; }
    }
}
