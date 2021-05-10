using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Models.SystemModels.UserAccount;
using Extensions.Common.STExtension;

namespace Interfaces.Authentication
{
    public interface IAuthentication
    {
        string SignIn(TokenJWTSecret token);
        UserAccount SessionInfo();
        bool IsAlive();
    }

    public class Authentication : IAuthentication
    {
        private readonly IHttpContextAccessor ac;
        public Authentication(IHttpContextAccessor accessor) { ac = accessor; }

        string IAuthentication.SignIn(TokenJWTSecret token)
        {
            Claim[] arrClaim = new Claim[] {
                new Claim(JwtClaimTypes.EmpCode, token.sEmployeeCode),
                new Claim(JwtClaimTypes.UnitCode, token.sUnitCode),
                new Claim(JwtClaimTypes.RoleID, token.nRoleID + ""),
                new Claim(JwtClaimTypes.IsRightToRequest, token.isRightToRequest ? "1" : "0"),
                new Claim(JwtClaimTypes.Name, token.sName),
                new Claim(JwtClaimTypes.Position, token.sPosition),
                new Claim(JwtClaimTypes.Organization, token.sOrganization),
                new Claim(JwtClaimTypes.Email, token.sEmail),
                new Claim(JwtClaimTypes.EmpCode_MG1, token.sEmpCode_MG1),
                new Claim(JwtClaimTypes.EmpCode_MG2, token.sEmpCode_MG2),
                new Claim(JwtClaimTypes.EmpCode_MG3, token.sEmpCode_MG3),
            };

            SymmetricSecurityKey sk = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(token.sSecretKey));
            SigningCredentials credential = new SigningCredentials(sk, SecurityAlgorithms.HmacSha256);
            JwtSecurityToken st = new JwtSecurityToken(
                issuer: token.sIssuer,
                audience: token.sAudience,
                claims: arrClaim,
                expires: token.dTimeout,
                signingCredentials: credential
            );
            return new JwtSecurityTokenHandler().WriteToken(st);
        }

        UserAccount IAuthentication.SessionInfo()
        {
            UserAccount ua = new UserAccount();

            try
            {
                var lstClaims = ac.HttpContext.User.Claims.Select(s => new { s.Type, s.Value }).ToList();
                Func<string, string> Claims_GetValue = new Func<string, string>(sType => lstClaims.First(w => w.Type == sType).Value);

                ua.sEmployeeCode = Claims_GetValue(JwtClaimTypes.EmpCode);
                ua.sUnitCode = Claims_GetValue(JwtClaimTypes.UnitCode);
                ua.nRoleID = Claims_GetValue(JwtClaimTypes.RoleID).ToInt();
                ua.isRightToRequest = Claims_GetValue(JwtClaimTypes.IsRightToRequest) == "1";
                ua.sName = Claims_GetValue(JwtClaimTypes.Name);
                ua.sPosition = Claims_GetValue(JwtClaimTypes.Position);
                ua.sOrganization = Claims_GetValue(JwtClaimTypes.Organization);
                ua.sEmail = Claims_GetValue(JwtClaimTypes.Email);
                ua.sEmpCode_MG1 =  Claims_GetValue(JwtClaimTypes.EmpCode_MG1);
                ua.sEmpCode_MG2 =  Claims_GetValue(JwtClaimTypes.EmpCode_MG2);
                ua.sEmpCode_MG3 =  Claims_GetValue(JwtClaimTypes.EmpCode_MG3);
            }
            catch { ua = null; }

            return ua;
        }

        bool IAuthentication.IsAlive()
        {
            bool _r = false;
            try { _r = ac.HttpContext.User.HasClaim(c => c.Type == JwtClaimTypes.EmpCode); }
            catch { }
            return _r;
        }
    }
}
