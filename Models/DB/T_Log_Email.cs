using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class T_Log_Email
    {
        public long nID { get; set; }
        public string sTo { get; set; }
        public string sCc { get; set; }
        public string sSubject { get; set; }
        public string sMessage { get; set; }
        public bool IsSuccess { get; set; }
        public string sMessage_Error { get; set; }
        public DateTime? dSend { get; set; }
    }
}
