using System;
using System.Collections.Generic;
using PTT_GSP.Models.DB;
using System.Data;

namespace PTT_GSP.SysModalGlobal
{
    public class CResutlWebMethod
    {
        public string sStatus { get; set; }
        public string sMsg { get; set; }
        public string sContent { get; set; }
        public int nPermission { get; set; }

    }
    public class cItemOption
    {
        public string value { get; set; }
        public string label { get; set; }
    }
}