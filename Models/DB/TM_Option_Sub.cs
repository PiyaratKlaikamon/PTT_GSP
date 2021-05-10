using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class TM_Option_Sub
    {
        public int nID { get; set; }
        public int nSubID { get; set; }
        public string sName { get; set; }
        public string sDescription { get; set; }
        public decimal nOrder { get; set; }
        public bool IsActive { get; set; }
    }
}
