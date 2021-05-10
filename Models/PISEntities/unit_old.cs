using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class unit_old
    {
        public string unitcode { get; set; }
        public string unitname { get; set; }
        public string unitabbr { get; set; }
        public DateTime? Lastupdate { get; set; }
        public string longname { get; set; }
        public string engname { get; set; }
    }
}
