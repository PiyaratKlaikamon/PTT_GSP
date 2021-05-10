using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class TB_Material_Category
    {
        public int nCategoryID { get; set; }
        public string sCategoryCode { get; set; }
        public int nGroupID { get; set; }
        public string sName { get; set; }
        public int nOrder { get; set; }
        public string sDetail { get; set; }
        public bool IsActive { get; set; }
        public bool IsDel { get; set; }
        public int? sCreateBy { get; set; }
        public DateTime dCreate { get; set; }
        public int? sUpdateBy { get; set; }
        public DateTime dUpdate { get; set; }
    }
}
