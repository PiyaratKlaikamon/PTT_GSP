using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PTT_GSP.Models.DB;

namespace Models.SystemModels.UserAccount
{
    public class UserAccount
    {
        public string sEmployeeCode { get; set; }
        public string sUnitCode { get; set; }
        public int nRoleID { get; set; }
        public bool isRightToRequest { get; set; }
        public string sName { get; set; }
        public string sPosition { get; set; }
        public string sOrganization { get; set; }
        public string sEmail { get; set; }
        public string sEmpCode_MG1 { get; set; }
        public string sEmpCode_MG2 { get; set; }
        public string sEmpCode_MG3 { get; set; }

        public int MenuAccessible(int nMenuID)
        {
            int n = 0;

            var db = new PTTGSP_DWSContext();
            var menu = db.TM_Menu.FirstOrDefault(w => w.IsBackend && w.IsActive && w.nMenuID == nMenuID);
            if (menu != null)
            {
                var prms = db.TM_Permission.FirstOrDefault(w => w.nMenuID == nMenuID && w.nRole == nRoleID);
                if (prms != null) n = prms.nPermission;
            }

            return n;
        }
    }

    public class AuthenProperties
    {
        public string sUsername { get; set; }
        public string sPassword { get; set; }
    }
    public class TokenJWTSecret : UserAccount
    {
        public string sIssuer { get; set; }
        public string sAudience { get; set; }
        public DateTime? dTimeout { get; set; }
        public string sSecretKey { get; set; }
    }
    public partial class JwtClaimTypes
    {
        public static string EmpCode { get { return "EmpCode"; } }
        public static string UnitCode { get { return "UnitCode"; } }
        public static string RoleID { get { return "RoleID"; } }
        public static string IsRightToRequest { get { return "IsRightToRequest"; } }
        public static string Name { get { return "Name"; } }
        public static string Position { get { return "Position"; } }
        public static string Organization { get { return "Organization"; } }
        public static string Email { get { return "Email"; } }
        public static string EmpCode_MG1 { get { return "EmpCode_MG1"; } }
        public static string EmpCode_MG2 { get { return "EmpCode_MG2"; } }
        public static string EmpCode_MG3 { get { return "EmpCode_MG3"; } }
    }
}
