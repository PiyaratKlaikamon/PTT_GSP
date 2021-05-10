using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class Master_D
    {
        public string COURSEID { get; set; }
        public string METHODID { get; set; }
        public string COURSENAME { get; set; }
        public string COURSEABBR { get; set; }
        public DateTime? STARTDATE { get; set; }
        public DateTime? ENDDATE { get; set; }
    }
}
