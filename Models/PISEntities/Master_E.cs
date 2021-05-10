using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class Master_E
    {
        public string SESSIONID { get; set; }
        public string SESSIONABBR { get; set; }
        public string ORGANIZER { get; set; }
        public string SESSIONNAME { get; set; }
        public string INSTRUCTOR { get; set; }
        public DateTime? STARTDATE { get; set; }
        public DateTime? ENDDATE { get; set; }
    }
}
