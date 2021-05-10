using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class RELATE
    {
        public decimal? EMP_CODE { get; set; }
        public decimal? LEVEL_NO { get; set; }
        public decimal? RELATE_NO { get; set; }
        public string TITLE { get; set; }
        public string FNAME { get; set; }
        public string LNAME { get; set; }
        public string SEX { get; set; }
        public DateTime? BIRTHDATE { get; set; }
        public string CURE_RIGHT { get; set; }
        public string EDU_RIGHT { get; set; }
        public string STATUS { get; set; }
    }
}
