using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class Personel_Relate_WF
    {
        public string CODE { get; set; }
        public string UNITCODE { get; set; }
        public string INAME { get; set; }
        public string FNAME { get; set; }
        public string LNAME { get; set; }
        public string Rel_FName { get; set; }
        public string Rel_LName { get; set; }
        public decimal? Relate_No { get; set; }
        public decimal? Level_No { get; set; }
        public string FULLNAMETH { get; set; }
    }
}
