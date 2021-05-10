using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class TB_Materials_File
    {
        public int nMaterialID { get; set; }
        public int nItem { get; set; }
        public string sFile_Name { get; set; }
        public string sFile_SysName { get; set; }
        public string sFile_Path { get; set; }
    }
}
