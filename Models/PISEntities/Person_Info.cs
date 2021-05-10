using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class Person_Info
    {
        public string Per_Code { get; set; }
        public decimal? Relate_No { get; set; }
        public decimal? Level_No { get; set; }
        public string SEX { get; set; }
        public string Per_Name { get; set; }
        public DateTime? BIRTHDATE { get; set; }
        public string Cure_Right { get; set; }
    }
}
