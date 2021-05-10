using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class hr_section
    {
        public decimal? auto_no { get; set; }
        public string code { get; set; }
        public string subhrof { get; set; }
        public DateTime? create_date { get; set; }
        public string note { get; set; }
    }
}
