using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class TB_User
    {
        public string sEmployeeID { get; set; }
        public string sFirstName { get; set; }
        public string sLastName { get; set; }
        public string sPosName { get; set; }
        public string sOrgID { get; set; }
        public string sOrgName { get; set; }
        public string sEmail { get; set; }
        public string sTel { get; set; }
        public int nRoleID { get; set; }
        public string sEmpCode_MG { get; set; }
        public bool IsActive { get; set; }
        public bool IsDel { get; set; }
        public string sCreateBy { get; set; }
        public DateTime dCreate { get; set; }
        public string sUpdateBy { get; set; }
        public DateTime dUpdate { get; set; }
    }
}
