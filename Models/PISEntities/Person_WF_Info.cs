using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class Person_WF_Info
    {
        public decimal? PER_CODE { get; set; }
        public decimal? RELATE_NO { get; set; }
        public decimal? LEVEL_NO { get; set; }
        public string SEX { get; set; }
        public string PER_NAME { get; set; }
        public DateTime? BIRTHDATE { get; set; }
        public string CURE_RIGHT { get; set; }
    }
}
