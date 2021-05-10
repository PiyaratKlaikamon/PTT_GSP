using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class Personel_Relate_V2
    {
        public decimal? CODE { get; set; }
        public decimal? RELATE_NO { get; set; }
        public decimal? LEVEL_NO { get; set; }
        public string Fname { get; set; }
        public string LNAME { get; set; }
        public string SEX { get; set; }
        public DateTime? BIRTHDATE { get; set; }
    }
}
