using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class ORDER
    {
        public decimal EMP_CODE { get; set; }
        public string ORDER_NO { get; set; }
        public string ORDER_TYPE_CODE { get; set; }
        public DateTime EFFECT_DATE { get; set; }
        public string MAJ_POS_CODE { get; set; }
        public string MIN_POS_CODE { get; set; }
        public string UNIT_CODE { get; set; }
        public decimal? LEVEL_CODE { get; set; }
        public string OLD_MAJ_POS { get; set; }
        public string OLD_MIN_POS { get; set; }
        public string OLD_UNIT { get; set; }
        public decimal? OLD_LEVEL { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATE_DATE { get; set; }
    }
}
