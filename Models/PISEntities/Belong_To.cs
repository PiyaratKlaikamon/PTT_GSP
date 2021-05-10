using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class Belong_To
    {
        public string POSCODE { get; set; }
        public string UNITCODE { get; set; }
        public DateTime? LAST_UPDATE { get; set; }
    }
}
