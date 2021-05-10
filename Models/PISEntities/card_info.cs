using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class card_info
    {
        public decimal card_id { get; set; }
        public string card_name { get; set; }
        public string em_recv { get; set; }
        public string melody_no { get; set; }
        public string text_att { get; set; }
        public string sender { get; set; }
        public string em_sender { get; set; }
    }
}
