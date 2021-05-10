using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class MenuMaster
    {
        public string MenuCode { get; set; }
        public string MenuName { get; set; }
        public int? IconNo { get; set; }
        public int? MenuType { get; set; }
        public int? NeedLog { get; set; }
        public string ExecuteFile { get; set; }
        public string parameter1 { get; set; }
        public string parameter2 { get; set; }
        public int? CreateOnDesktop { get; set; }
        public int? Parent_Code { get; set; }
        public int? SYSTEMOS { get; set; }
    }
}
