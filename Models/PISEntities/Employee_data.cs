using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class Employee_data
    {
        public string CODE { get; set; }
        public string Emp_Name { get; set; }
        public string Emp_name_Eng { get; set; }
        public string UNITCODE { get; set; }
        public string unitname { get; set; }
        public string POSCODE { get; set; }
        public string POSNAME { get; set; }
        public string EmailAddr { get; set; }
        public string CostCenter { get; set; }
        public string unitabbr { get; set; }
        public string UNIT_LEVEL_NAME { get; set; }
        public string UNIT_LEVEL_ID { get; set; }
        public string BUSINESS_UNIT_ID { get; set; }
        public string BUSINESS_UNIT_NAME { get; set; }
    }
}
