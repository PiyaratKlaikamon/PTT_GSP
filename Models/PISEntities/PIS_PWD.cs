using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class PIS_PWD
    {
        public int? AUTO_NUM { get; set; }
        public string LOGIN_ID { get; set; }
        public string PASSWORD { get; set; }
        public string CODE { get; set; }
    }
}
