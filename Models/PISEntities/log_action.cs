using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class log_action
    {
        public decimal? auto_code { get; set; }
        public string action { get; set; }
        public string log_by { get; set; }
        public DateTime? log_date { get; set; }
        public string note { get; set; }
        public string code { get; set; }
        public decimal? system { get; set; }
    }
}
