using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class TB_Materials_BP
    {
        public int nMaterialID { get; set; }
        public int nMat_Balance { get; set; }
        public int nMat_Pending { get; set; }
        public int nMat_BP { get; set; }
    }
}
