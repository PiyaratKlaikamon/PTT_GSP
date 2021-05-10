using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class TB_Vendor
    {
        public int nVendorID { get; set; }
        public string sCompanyCode { get; set; }
        public string sCompanyName { get; set; }
        public string sContactName { get; set; }
        public string sEmail { get; set; }
        public string sTel { get; set; }
        public string sDetail { get; set; }
        public bool IsActive { get; set; }
        public bool IsDel { get; set; }
        public string sCreateBy { get; set; }
        public DateTime dCreate { get; set; }
        public string sUpdateBy { get; set; }
        public DateTime dUpdate { get; set; }
    }
}
