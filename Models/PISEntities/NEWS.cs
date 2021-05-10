using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class NEWS
    {
        public string NEWS_CODE { get; set; }
        public string NEWS_HEADLINE { get; set; }
        public string NEWS_LINK { get; set; }
        public string NEWS_DATE { get; set; }
        public string VALID_UNTIL_DATE { get; set; }
    }
}
