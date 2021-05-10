using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class TM_Permission
    {
        public int nRole { get; set; }
        public int nMenuID { get; set; }
        public int nPermission { get; set; }
    }
}
