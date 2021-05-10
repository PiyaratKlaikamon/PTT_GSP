using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.DB
{
    public partial class V_Material_Category
    {
        public int nCategoryID { get; set; }
        public int nOrder { get; set; }
        public string sCategoryCode { get; set; }
        public string nGroupID { get; set; }
        public string sCategoryName { get; set; }
        public string sGroupName { get; set; }
        public bool IsActive { get; set; }
        public string sActive { get; set; }
        public string dUpdate { get; set; }
        public bool IsDel { get; set; }
        public string sDetail { get; set; }
        public int? IsUse { get; set; }
    }
}
