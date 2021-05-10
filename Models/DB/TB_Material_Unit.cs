using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class TB_Material_Unit
    {
        public int nUnitID { get; set; }
        public string sName { get; set; }
        public string sDetail { get; set; }
        public bool IsActive { get; set; }
        public bool IsDel { get; set; }
        public string sCreateBy { get; set; }
        public DateTime dCreate { get; set; }
        public string sUpdateBy { get; set; }
        public DateTime dUpdate { get; set; }
    }
}
