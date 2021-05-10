using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class TRAIN
    {
        public decimal EMP_CODE { get; set; }
        public decimal F_LEVEL { get; set; }
        public decimal TRAIN_CODE { get; set; }
        public DateTime? ST_DATE { get; set; }
        public DateTime? END_DATE { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? EDIT_DATE { get; set; }
    }
}
