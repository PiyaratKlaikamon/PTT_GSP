using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class T_Log
    {
        public long nID { get; set; }
        public DateTime? dLog { get; set; }
        public string sUserID { get; set; }
        public int nMenuID { get; set; }
        public string sMenuName { get; set; }
        public string sEvent { get; set; }
    }
}
