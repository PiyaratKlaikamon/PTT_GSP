using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class pttgroup
    {
        public decimal pttgroup_id { get; set; }
        public string pttgroup_name { get; set; }
        public string pttgroup_desc { get; set; }
        public string pttgroup_unit { get; set; }
        public DateTime? pttgroup_date { get; set; }
        public DateTime? pttgroup_last_update { get; set; }
    }
}
