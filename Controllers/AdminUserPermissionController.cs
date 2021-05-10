using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GSP.Models.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Extensions.Common.STExtension;
using PTT_GSP.Models.PISEntities;

namespace PTT_GSP.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AdminUserPermissionController : ControllerBase
    {

        [HttpGet]
        public List<V_User> GetVUser()
        {
            List<V_User> ov_user = new List<V_User>();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            ov_user = db.V_User.OrderBy(o => o.sEmployeeID).ToList();

            return (ov_user);
        }


        [HttpGet]
        public List<V_User> User_Permission_SearchData(string sFullname, string sIsActive, string sRoleID)
        {
            List<V_User> tb_user = new List<V_User>();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            int nRoleID = sRoleID.ToInt();

            tb_user = db.V_User.Where(w => (w.sName.Trim().ToLower().Contains(sFullname ?? ""))
            && (sIsActive != null ? w.IsActive == (sIsActive == "1") : true)
            && (string.IsNullOrEmpty(sRoleID) ? true : (w.nSubID == nRoleID))
            ).OrderBy(o => o.sEmployeeID).ToList();
            return (tb_user);
        }




        [HttpGet]
        public IActionResult User_Permission_edit(string sEmployeeID)
        {

            TB_User tb_user = new TB_User();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();
            TB_User qtb_user = db.TB_User.Where(w => w.sEmployeeID == sEmployeeID).FirstOrDefault();
            if (qtb_user != null) { tb_user = qtb_user; }

            return Ok(tb_user);
        }



        [HttpGet]
        public List<TM_Option_Sub> GetTMOptionSub()
        {

            List<TM_Option_Sub> otm_option_sub = new List<TM_Option_Sub>();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();
            otm_option_sub = db.TM_Option_Sub.Where(w => w.nID == 1).OrderBy(o => o.nOrder).ToList();

            return otm_option_sub;
        }

        [HttpGet]
        public personel_info GetPersonelInfoByCode(string Code)
        {

            PISContext db = new PISContext();
            PISFunction PISFunction = new PISFunction();
            var fitercode = PISFunction.WST_CODE;
            personel_info opersonel_info = new personel_info();
            List<position> oposition = new List<position>();

            var query = (from o in db.personel_info.Where(w => fitercode.Contains(w.WSTCODE) && w.CODE == Code)
                         from u in db.unit.Where(w => w.unitcode == o.UNITCODE).DefaultIfEmpty()
                         from p in db.position.Where(w => w.poscode == o.POSCODE).DefaultIfEmpty()
                         select  new Personel_Info() 
                         {
                             sFNAME=  o.FNAME,
                             sLNAME =o.LNAME,
                             sEmailAddr =o.EmailAddr,
                             sLongname =u.longname,
                             sUnitabbr =u.unitabbr,
                             sPosition =p.t_name
                         }

                         ).FirstOrDefault();

            return opersonel_info;
        }



        [HttpPost]
        public IActionResult Savedata(string sFullname, string sIsActive, string nRoleID)
        {
            List<TB_User> tb_user = new List<TB_User>();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();
            tb_user = db.TB_User.Where(w => ((w.sFirstName.Trim() + w.sLastName.Trim()).Trim().ToLower().Contains(sFullname ?? ""))
            && (sIsActive != null ? w.IsActive == (sIsActive == "1") : 1 == 1)
            && nRoleID == null ? string.IsNullOrEmpty(nRoleID) : (w.nRoleID + "" == nRoleID)
            ).OrderBy(o => o.sEmployeeID).ToList();
            return Ok(tb_user);
        }



        [HttpGet]
        public List<oSetSearch> SetSearch(string SearchBy)
        {


            List<oSetSearch> osetsearch = new List<oSetSearch>();
            List<personel_info> listpersonel_info = new List<personel_info>();

            PTTGSP_DWSContext db = new PTTGSP_DWSContext();
            PISContext pis = new PISContext();

            PISFunction PISFunction = new PISFunction();

            var fitercode = PISFunction.WST_CODE;

            var cf4 = db.TM_Config.FirstOrDefault(w => w.nID == 4);
            string sUnitCode_GSP = cf4 != null ? cf4.sValue : "80000563";

            var listunitcode = PISFunction.ListUnit_ToLower(sUnitCode_GSP).Select(s => s.CODE).ToList();

            listpersonel_info = pis.personel_info.Where(w => fitercode.Contains(w.WSTCODE) &&  (SearchBy=="3"? !listunitcode.Contains(w.UNITCODE): listunitcode.Contains(w.UNITCODE)) ).ToList();


            osetsearch = (from a in listpersonel_info
                          select new oSetSearch
                          {
                              value = a.CODE,
                              label = a.CODE+" " +"-"  +" "+a.FNAME+ " "+ a.LNAME,
                              Search = a.CODE + " " + a.FNAME + " " + a.LNAME,
                          }).OrderBy(o => o.label).ToList();

            return osetsearch;
        }



        public class oSetSearch
        {
            public string value { get; set; }
            public string label { get; set; }
            public string Search { get; set; }
            

        }
        public class Personel_Info
        {
            public string sFNAME { get; set; }
            public string sLNAME { get; set; }
            public string sPosition { get; set; }
            public string sLongname { get; set; }
            public string sUnitabbr { get; set; }
            public string sEmailAddr { get; set; }

        }

    }
}