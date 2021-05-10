using System;
using System.Collections.Generic;

#nullable disable

namespace PTT_GSP.Models.PISEntities
{
    public partial class Personel_WF
    {
        public string CODE { get; set; }
        public string INAME { get; set; }
        public string FNAME { get; set; }
        public string LNAME { get; set; }
        public string FNAME_ENG { get; set; }
        public string LNAME_ENG { get; set; }
        public DateTime? BIRTHDATE { get; set; }
        public string ADDRESS { get; set; }
        public string HOMETEL { get; set; }
        public string OFFICETEL { get; set; }
        public string SEX { get; set; }
        public DateTime? ENTRYDATE { get; set; }
        public string WSTCODE { get; set; }
        public string POSCODE { get; set; }
        public string UNITCODE { get; set; }
        public string WGRPCODE { get; set; }
        public string JOBGROUP { get; set; }
        public string OFFICECODE { get; set; }
        public DateTime? STPOSDATE { get; set; }
        public DateTime? STJGDATE { get; set; }
        public string JGAGE1 { get; set; }
        public string JGAGE2 { get; set; }
        public string AGE1 { get; set; }
        public string AGE2 { get; set; }
        public string POSAGE1 { get; set; }
        public string POSAGE2 { get; set; }
        public string JOBAGE1 { get; set; }
        public string JOBAGE2 { get; set; }
        public string RETIREYEAR { get; set; }
        public string MGMT { get; set; }
        public string EmailAddr { get; set; }
        public DateTime? HIRINGDATE { get; set; }
        public string FULLNAMETH { get; set; }
    }
}
