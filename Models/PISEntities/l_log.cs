using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class l_log
    {
        public decimal l_log_id { get; set; }
        public string l_log_unit { get; set; }
        public string l_log_by { get; set; }
        public DateTime? l_log_date { get; set; }
        public DateTime? l_last_update { get; set; }
        public string pis_auto_code { get; set; }
        public string assign_auto_code { get; set; }
    }
}
