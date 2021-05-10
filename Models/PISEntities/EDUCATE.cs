using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class EDUCATE
    {
        public string code { get; set; }
        public string edu_no { get; set; }
        public string instname { get; set; }
        public string degcode { get; set; }
        public string majorcode { get; set; }
        public string edugrpcode { get; set; }
        public string mjgrpcode { get; set; }
        public string country { get; set; }
        public string edu_year { get; set; }
    }
}
