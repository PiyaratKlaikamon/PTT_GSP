using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class pis_assign
    {
        public decimal? auto_code { get; set; }
        public string code { get; set; }
        public string unitcode { get; set; }
        public decimal? role_no { get; set; }
        public string record_type { get; set; }
        public string def { get; set; }
        public decimal? under { get; set; }
        public DateTime? starting { get; set; }
        public DateTime? timing { get; set; }
        public string status { get; set; }
        public decimal? system { get; set; }
        public decimal? authority { get; set; }
        public string description { get; set; }
    }
}
