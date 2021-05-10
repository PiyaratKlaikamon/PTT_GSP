using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class Relationship_Course_N_Catalog
    {
        public string CATALOGID { get; set; }
        public DateTime? STARTDATE { get; set; }
        public DateTime? ENDDATE { get; set; }
        public string COURSEID { get; set; }
    }
}
