using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class COSTCENTER
    {
        public decimal? CODE { get; set; }
        public decimal? CCCODE { get; set; }
        public double? PERCENT { get; set; }
        public decimal? ALLOCCTR { get; set; }
    }
}
