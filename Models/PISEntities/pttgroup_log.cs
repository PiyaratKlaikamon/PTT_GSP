using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class pttgroup_log
    {
        public decimal log_id { get; set; }
        public decimal? pttgroup_id { get; set; }
        public string action { get; set; }
        public string note { get; set; }
        public DateTime? log_date { get; set; }
        public string action_by { get; set; }
    }
}
