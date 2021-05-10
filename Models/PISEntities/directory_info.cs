using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class directory_info
    {
        public string code { get; set; }
        public string tname { get; set; }
        public string nickname { get; set; }
        public string intphone { get; set; }
        public string direct { get; set; }
        public string mobile { get; set; }
        public string pager { get; set; }
        public string fax { get; set; }
        public string email { get; set; }
        public string call_sign { get; set; }
        public string homephone { get; set; }
        public decimal? location_id { get; set; }
        public int? x { get; set; }
        public int? y { get; set; }
        public string responsibility { get; set; }
    }
}
