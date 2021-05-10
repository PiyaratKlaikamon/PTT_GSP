using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class member_pttgroup
    {
        public decimal member_id { get; set; }
        public decimal? pttgroup_id { get; set; }
        public string pttcode { get; set; }
        public DateTime? member_date { get; set; }
        public decimal? auto_code { get; set; }
    }
}
