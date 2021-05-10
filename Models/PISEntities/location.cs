using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class location
    {
        public decimal location_id { get; set; }
        public string location_name { get; set; }
        public int? site_id { get; set; }
        public int? area_id { get; set; }
        public string floor { get; set; }
    }
}
