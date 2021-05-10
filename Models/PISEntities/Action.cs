using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class Action
    {
        public string ID { get; set; }
        public string Name { get; set; }
        public string StartDate { get; set; }
        public string ActionType { get; set; }
        public string ActionName { get; set; }
        public string ReasonForAction { get; set; }
        public string Reason { get; set; }
        public string OldOrgID { get; set; }
        public string OldOrgShortName { get; set; }
        public string OldOrgLongName { get; set; }
        public string OldCostCenter { get; set; }
        public string OldPositionID { get; set; }
        public string OldPositionName { get; set; }
        public string OldLocationID { get; set; }
        public string OldLocationName { get; set; }
        public string NewOrgID { get; set; }
        public string NewOrgShortName { get; set; }
        public string NewOrgLongName { get; set; }
        public string NewCostcenter { get; set; }
        public string NewPositionID { get; set; }
        public string NewPositionName { get; set; }
        public string NewLocationID { get; set; }
        public string NewLocationName { get; set; }
    }
}
