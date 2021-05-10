using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class V_Stock_Update
    {
        public int nRequestID { get; set; }
        public string sRequestNo { get; set; }
        public string sReason { get; set; }
        public string nCreateBy { get; set; }
        public string sUpdate { get; set; }
        public string sUpdatekc { get; set; }
        public DateTime dUpdate { get; set; }
        public string sStep { get; set; }
        public int? nStepID { get; set; }
        public string sNote { get; set; }
    }
}
