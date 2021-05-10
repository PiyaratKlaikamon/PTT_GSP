using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class password
    {
        public string code { get; set; }
        public string pwd { get; set; }
        public DateTime? pwdstart { get; set; }
        public DateTime? pwdexpire { get; set; }
        public string worktime { get; set; }
    }
}
