using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class TB_Work_Material
    {
        public int nWorkID { get; set; }
        public int nMaterialID { get; set; }
        public int nAmount { get; set; }
        public bool IsActive { get; set; }
    }
}
