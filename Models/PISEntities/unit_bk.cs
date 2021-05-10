using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class unit_bk
    {
        public string unitcode { get; set; }
        public string unitname { get; set; }
        public string unitabbr { get; set; }
        public string longname { get; set; }
        public string engname { get; set; }
        public string REMARK { get; set; }
        public string UNIT_LEVEL_ID { get; set; }
        public string UNIT_LEVEL_NAME { get; set; }
        public string BUSINESS_UNIT_ID { get; set; }
        public string BUSINESS_UNIT_NAME { get; set; }
        public string DUMMY_RELATIONSHIP { get; set; }
        public string CostCenter { get; set; }
        public DateTime? Lastupdate { get; set; }
    }
}
