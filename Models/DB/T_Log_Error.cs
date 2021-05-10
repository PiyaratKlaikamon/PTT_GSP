using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class T_Log_Error
    {
        public long nID { get; set; }
        public DateTime? dLog { get; set; }
        public string sUserID { get; set; }
        public string sMessage { get; set; }
    }
}
