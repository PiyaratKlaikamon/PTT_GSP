using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class Relate_WF
    {
        public decimal? EMP_CODE { get; set; }
        public decimal? RELATE_NO { get; set; }
        public decimal? LEVEL_NO { get; set; }
        public string Emp_Name { get; set; }
        public string SEX { get; set; }
        public DateTime? BIRTHDATE { get; set; }
        public int? nMonth { get; set; }
        public int? iYear { get; set; }
        public int? iMonth { get; set; }
        public string STATUS { get; set; }
    }
}
