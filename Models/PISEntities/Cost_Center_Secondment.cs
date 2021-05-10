using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class Cost_Center_Secondment
    {
        public string COMCOD { get; set; }
        public string EMPID { get; set; }
        public DateTime? START { get; set; }
        public DateTime? END { get; set; }
        public string CCTR { get; set; }
        public string ORGUNIT { get; set; }
        public string PRIORITY { get; set; }
        public decimal? PERCENT { get; set; }
        public string OVERSEA { get; set; }
    }
}
