using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class TB_Goods_Receive
    {
        public int nRequestID { get; set; }
        public string sRequestNo { get; set; }
        public int nSourceID { get; set; }
        public string sRefNo { get; set; }
        public DateTime dDocDate { get; set; }
        public DateTime dReceiveDate { get; set; }
        public int nVendorID { get; set; }
        public string sNote { get; set; }
        public string sFile_Name { get; set; }
        public string sFile_SysName { get; set; }
        public string sFile_Path { get; set; }
        public decimal nTotalPrice { get; set; }
        public string sCreateBy { get; set; }
        public DateTime dCreate { get; set; }
        public string sUpdateBy { get; set; }
        public DateTime dUpdate { get; set; }
    }
}
