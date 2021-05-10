using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class TB_Stock_Update
    {
        public int nRequestID { get; set; }
        public string sRequestNo { get; set; }
        public DateTime dUpdateStockDate { get; set; }
        public string sReason { get; set; }
        public decimal nTotalPrice_Minus { get; set; }
        public decimal nTotalPrice_Plus { get; set; }
        public int nStepID { get; set; }
        public bool IsRevisit { get; set; }
        public string sCreateBy { get; set; }
        public DateTime dCreate { get; set; }
        public string sUpdateBy { get; set; }
        public DateTime dUpdate { get; set; }
    }
}
