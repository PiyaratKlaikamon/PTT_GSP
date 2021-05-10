using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class V_User
    {
        public string sEmployeeID { get; set; }
        public string sName { get; set; }
        public string sOptSub { get; set; }
        public string sPosition { get; set; }
        public bool IsActive { get; set; }
        public int? nSubID { get; set; }
    }
}
