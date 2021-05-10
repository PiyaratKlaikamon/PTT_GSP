using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Extensions.Common.STExtension;
using PTT_GSP.Models.DB;
using PTT_GSP.Models.PISEntities;
using Models.SystemModels.UserAccount;
using Interfaces.Authentication;
using Interfaces.ProcessResult;

namespace PTT_GSP.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class UserController : ControllerBase
    {
        public IConfiguration IConfig { get; }
        public readonly PTTGSP_DWSContext db;
        public readonly PISContext pis;

        private readonly IAuthentication IAuthen;
        public UserController(IConfiguration conf, IAuthentication au)
        {
            IConfig = conf;
            IAuthen = au;
            db = new PTTGSP_DWSContext();
            pis = new PISContext();
        }

        public IActionResult SignIn(AuthenProperties props)
        {
            try
            {
                string sToken = "";
                string sMessage = "";

                var r = IConfig["AppSettings:BypassCode"] == props.sPassword
                    ? new IProcessResult() { Success = true }
                    : PISFunction.LDAP_Connect("ptt", props.sUsername, props.sPassword);
                if (r.Success)
                {
                    TokenJWTSecret tk = null;

                    var emp = pis.personel_info.FirstOrDefault(w => w.CODE == props.sUsername);
                    if (emp != null)
                    {
                        bool isGSP = IsGSP(emp.UNITCODE);
                        int nRoleID = 0;

                        var lstUser = db.TB_User
                            .Where(w => !w.IsDel && w.IsActive && ((w.sEmployeeID == emp.CODE && w.sOrgID == emp.UNITCODE) || w.sEmpCode_MG == emp.CODE))
                            .Select(s => new { s.sEmployeeID, s.nRoleID }).ToList();
                        var usr = lstUser.FirstOrDefault(w => w.sEmployeeID == emp.CODE);
                        if (usr != null) nRoleID = usr.nRoleID;

                        if (isGSP || lstUser.Any())
                        {
                            tk = new TokenJWTSecret();

                            tk.sEmployeeCode = emp.CODE;
                            tk.sUnitCode = emp.UNITCODE;
                            tk.nRoleID = nRoleID;
                            tk.isRightToRequest = isGSP || nRoleID == 3;

                            tk.sName = emp.FNAME + " " + emp.LNAME;
                            tk.sEmail = emp.EmailAddr;

                            var pos = pis.position.FirstOrDefault(w => w.poscode == emp.POSCODE);
                            tk.sPosition = pos != null ? pos.AB_NAME : emp.POSNAME;

                            var unit = pis.unit.FirstOrDefault(w => w.unitcode == emp.UNITCODE);
                            tk.sOrganization = unit != null ? unit.unitabbr : "";

                            List<string> lstBand_Allow = new List<string>() { "AA", "AB", "AC0", "AC1", "AD" };
                            var lstEmpCode_ReportTo = PISFunction.RepInfo.AllReportTo(emp.CODE, pis)
                                .Where(w => w.sEmpCode != emp.CODE && lstBand_Allow.Contains(w.sBand))
                                .Select(s => s.sEmpCode).ToList();
                            int nEmp_ReportTo = lstEmpCode_ReportTo.Count;
                            tk.sEmpCode_MG1 = nEmp_ReportTo > 0 ? lstEmpCode_ReportTo[0] : emp.CODE;
                            tk.sEmpCode_MG2 = nEmp_ReportTo > 1 ? lstEmpCode_ReportTo[1] : "";
                            tk.sEmpCode_MG3 = nEmp_ReportTo > 2 ? lstEmpCode_ReportTo[2] : "";
                        }
                    }

                    if (tk != null)
                    {
                        tk.sSecretKey = IConfig["jwt:Key"];
                        tk.sIssuer = IConfig["jwt:Issuer"];
                        tk.sAudience = IConfig["jwt:Audience"];
                        tk.dTimeout = DateTime.Now.AddMinutes(IConfig["jwt:Expire"].ToDouble());

                        sToken = IAuthen.SignIn(tk);
                    }
                    else sMessage = "ไม่พบข้อมูลผู้ใช้งาน";
                }
                else sMessage = "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง";

                return Ok(new { code = StatusCodes.Status200OK, token = sToken, message = sMessage });
            }
            catch (Exception ex)
            {
                return Ok(new { code = StatusCodes.Status404NotFound, message = ex });
            }
        }

        private bool IsGSP(string UNITCODE)
        {
            bool isGSP = false;

            var cf4 = db.TM_Config.FirstOrDefault(w => w.nID == 4);
            string sUnitCode_GSP = cf4 != null ? cf4.sValue : "80000563";

            var GSP = pis.unit.FirstOrDefault(w => w.unitcode == sUnitCode_GSP);
            if (GSP != null) isGSP = GSP.unitcode == UNITCODE || pis.unit.Any(w => w.unitcode == UNITCODE && w.DUMMY_RELATIONSHIP.StartsWith(GSP.DUMMY_RELATIONSHIP + "-"));
            return isGSP;
        }

        [HttpPost]
        [Authorize]
        public IActionResult UserInfo()
        {
            UserAccount ua = null;
            if (IAuthen.IsAlive()) ua = IAuthen.SessionInfo();
            return Ok(ua);
        }
    }
}
