using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class assign_link
    {
        public decimal? auto_code { get; set; }
        public string link_type { get; set; }
        public decimal? authority { get; set; }
        public decimal? active { get; set; }
        public decimal? pttgroup_id { get; set; }
    }
}
