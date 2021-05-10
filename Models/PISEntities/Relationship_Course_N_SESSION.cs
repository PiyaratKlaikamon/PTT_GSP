using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class Relationship_Course_N_SESSION
    {
        public string CATALOGID { get; set; }
        public DateTime? STARTDATE { get; set; }
        public DateTime? ENDDATE { get; set; }
        public string SESSIONID { get; set; }
    }
}
