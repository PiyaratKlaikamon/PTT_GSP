using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class Report_To
    {
        public string CODE { get; set; }
        public string POSCODE { get; set; }
        public string JOBGROUP { get; set; }
        public string PERCENTAGE { get; set; }
        public string REP_CODE { get; set; }
        public string REP_POSCODE { get; set; }
        public string REP_JOBGROUP { get; set; }
        public string REP_MGMT { get; set; }
        public string REP_BAND { get; set; }
        public string BAND { get; set; }
        public DateTime? LAST_UPDATE { get; set; }
    }
}
