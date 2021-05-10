using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class position_view
    {
        public string poscode { get; set; }
        public string posname { get; set; }
        public string status { get; set; }
        public string AB_NAME { get; set; }
        public string t_name { get; set; }
        public string e_name { get; set; }
        public string T_REPORT { get; set; }
        public string E_REPORT { get; set; }
    }
}
