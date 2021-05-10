using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class authority
    {
        public string code { get; set; }
        public string name { get; set; }
        public string for_bu { get; set; }
        public DateTime? until { get; set; }
        public string from_bu { get; set; }
        public decimal? auto_code { get; set; }
    }
}
