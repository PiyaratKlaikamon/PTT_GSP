using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class TB_Materials
    {
        public int nMaterialID { get; set; }
        public string sMaterialCode { get; set; }
        public int nGroupID { get; set; }
        public int nCategoryID { get; set; }
        public string sName { get; set; }
        public int nUnitID { get; set; }
        public decimal nPrice { get; set; }
        public int nLocationID { get; set; }
        public string sBinLocation { get; set; }
        public int nMin { get; set; }
        public int nMax { get; set; }
        public int nReOrderPoint { get; set; }
        public int nMaxReserve { get; set; }
        public int nDuplicateDay { get; set; }
        public string sDetail_Material { get; set; }
        public string sDetail { get; set; }
        public string sFile_Name { get; set; }
        public string sFile_SysName { get; set; }
        public string sFile_Path { get; set; }
        public bool IsActive { get; set; }
        public bool IsDel { get; set; }
        public string sCreateBy { get; set; }
        public DateTime dCreate { get; set; }
        public string sUpdateBy { get; set; }
        public DateTime dUpdate { get; set; }
    }
}
