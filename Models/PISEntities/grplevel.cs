using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class grplevel
    {
        public int code { get; set; }
        public string Name { get; set; }
        public int? Min_Level { get; set; }
        public int? Max_Level { get; set; }
    }
}
