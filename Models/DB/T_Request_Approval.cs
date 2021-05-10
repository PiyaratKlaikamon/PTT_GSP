using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class T_Request_Approval
    {
        public int nID { get; set; }
        public int nRequestID { get; set; }
        public int nActionID { get; set; }
        public int nRoleID { get; set; }
        public string sNote { get; set; }
        public string sCreateBy { get; set; }
        public DateTime dCreate { get; set; }
    }
}
