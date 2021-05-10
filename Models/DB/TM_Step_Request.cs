using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class TM_Step_Request
    {
        public int nStepID { get; set; }
        public string sName { get; set; }
        public string sDetail { get; set; }
    }
}
