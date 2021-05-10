using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class Global_Logs
    {
        public decimal Log_No { get; set; }
        public string Programname { get; set; }
        public string EXECUTEBYUSER { get; set; }
        public string EXECUTEUNDERDOMAIN { get; set; }
        public string EXECUTEDATETIME { get; set; }
        public string SendDateTime { get; set; }
    }
}
