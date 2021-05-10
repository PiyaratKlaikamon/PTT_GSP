using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class AssignMenu
    {
        public string JOBID { get; set; }
        public string BA { get; set; }
        public int? Level_code { get; set; }
        public string MenuCode { get; set; }
    }
}
