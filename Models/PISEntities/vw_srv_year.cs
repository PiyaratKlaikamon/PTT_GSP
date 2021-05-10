using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class vw_srv_year
    {
        public string CODE { get; set; }
        public string time_spent_company { get; set; }
        public string time_spent_pos { get; set; }
        public string time_spent_job { get; set; }
    }
}
