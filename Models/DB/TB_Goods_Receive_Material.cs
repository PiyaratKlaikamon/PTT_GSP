using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class TB_Goods_Receive_Material
    {
        public int nRequestID { get; set; }
        public int nMaterialID { get; set; }
        public int nAmount { get; set; }
        public decimal nPrice { get; set; }
        public decimal nTotalPrice { get; set; }
    }
}
