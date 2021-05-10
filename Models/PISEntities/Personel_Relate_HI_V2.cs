using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class Personel_Relate_HI_V2
    {
        public string CODE { get; set; }
        public string UNITCODE { get; set; }
        public string INAME { get; set; }
        public string FNAME { get; set; }
        public string LNAME { get; set; }
        public string REL_FNAME { get; set; }
        public string REL_LNAME { get; set; }
        public decimal? RELATE_NO { get; set; }
        public decimal? LEVEL_NO { get; set; }
        public string FULLNAMETH { get; set; }
    }
}
