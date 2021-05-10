using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class V_Withdrawal_Status
    {
        public string sName { get; set; }
        public int? nCountRequestID { get; set; }
        public int nStepID { get; set; }
    }
}
