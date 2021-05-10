using Extensions.Common.STExtension;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using PTT_GSP.Models.DB;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GSP.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WithdrawalStatusController : ControllerBase
    {


        [HttpGet]
        public List<V_Withdrawal_Status> GetV_Withdrawal_Status()
        {
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();
            List<V_Withdrawal_Status> listv_withdrawal_status = new List<V_Withdrawal_Status>();

            listv_withdrawal_status = db.V_Withdrawal_Status.OrderBy(o => o.sName).ToList();

            return listv_withdrawal_status;
        }

        [HttpGet]
        public List<V_Withdrawal_Status> GetV_Withdrawal_Status_SearchData(string sStepID, string sStartDate, string sEndDate)
        {

            PTTGSP_DWSContext db = new PTTGSP_DWSContext();
            List<V_Withdrawal_Status> listv_withdrawal_status = new List<V_Withdrawal_Status>();

            string Exceq = "EXEC [dbo].[Stp_Withdrawal_Status_SearchData] '" + sStartDate + "','" + sEndDate + "','" + sStepID + "'";  
            var JsonString = STFunction.QryToJson(Exceq,"");          
            listv_withdrawal_status = JsonConvert.DeserializeObject<List<V_Withdrawal_Status>>(JsonString);


            return listv_withdrawal_status;
        }






        

    }
}
