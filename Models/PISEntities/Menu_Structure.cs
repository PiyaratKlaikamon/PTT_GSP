using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class Menu_Structure
    {
        public int Menu_Code { get; set; }
        public string Menu_Description { get; set; }
        public string Path { get; set; }
        public int? Parent_Code { get; set; }
    }
}
