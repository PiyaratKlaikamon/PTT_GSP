using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class V_Materials
    {
        public int nMaterialID { get; set; }
        public int? nRequestID { get; set; }
        public string sMaterialCode { get; set; }
        public string sMaterialName { get; set; }
        public int nAmount { get; set; }
        public string sUnitName { get; set; }
        public decimal nPrice { get; set; }
        public decimal? nTotalPrice_Minus { get; set; }
        public decimal? nTotalPrice_Plus { get; set; }
        public string sReason { get; set; }
        public int nUnitID { get; set; }
    }
}
