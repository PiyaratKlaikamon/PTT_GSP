using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class dtproperties
    {
        public int id { get; set; }
        public int? objectid { get; set; }
        public string property { get; set; }
        public string value { get; set; }
        public string uvalue { get; set; }
        public byte[] lvalue { get; set; }
        public int version { get; set; }
    }
}
