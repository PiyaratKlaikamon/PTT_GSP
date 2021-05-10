using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class Customer_secondment
    {
        public string SEQ { get; set; }
        public string Comcode { get; set; }
        public string unitcode { get; set; }
        public string Company_Code_Name { get; set; }
        public DateTime? Startdate { get; set; }
        public DateTime? enddate { get; set; }
        public string Abbriviate { get; set; }
        public string CUSTOMER { get; set; }
        public double? TAX { get; set; }
    }
}
