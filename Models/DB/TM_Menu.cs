using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class TM_Menu
    {
        public int nMenuID { get; set; }
        public string sName { get; set; }
        public int? nHeadID { get; set; }
        public int nLevel { get; set; }
        public int nOrder { get; set; }
        public string sLink { get; set; }
        public string sIcon { get; set; }
        public bool IsActive { get; set; }
        public bool IsBackend { get; set; }
    }
}
