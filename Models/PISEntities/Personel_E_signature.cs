using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class Personel_E_signature
    {
        public string CODE { get; set; }
        public string FULLNAME_THA { get; set; }
        public string FULLNAME_ENG { get; set; }
        public string Unitname_THA { get; set; }
        public string Unitname_ENG { get; set; }
        public string posname_Tha { get; set; }
        public string posname_ENG { get; set; }
        public string Email { get; set; }
    }
}
