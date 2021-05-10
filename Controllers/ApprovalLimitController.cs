using Extensions.Common.STResultAPI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GSP.Models.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Extensions.Common.STExtension;
namespace PTT_GSP.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ApprovalLimitController : ControllerBase
    {
        private PTTGSP_DWSContext db = new PTTGSP_DWSContext();
        public IActionResult GetData_List()
        {
            List<GetLimit_lst> lst = new List<GetLimit_lst>();
            db = new PTTGSP_DWSContext();
            var lstData = db.TM_Config.ToList();
            foreach (var i in lstData)
            {
                GetLimit_lst l = new GetLimit_lst();
                l.nID = i.nID;
                l.sName = i.sName;
                l.sValue = i.sValue;
                l.nValue = i.nValue;
                l.sDescription = i.sDescription;
                lst.Add(l);
            }
            return Ok(lst);
        }
        public ResultAPI SaveData(List<GetLimit_lst> data)
        {
            db = new PTTGSP_DWSContext();
            ResultAPI result = new ResultAPI();
            try
            {
                foreach (var i in data)
                {
                    if (i.sValue.ToDecimalOrNull() != null)
                    {
                        var Update = db.TM_Config.FirstOrDefault(f => f.nID == i.nID);
                        if (Update != null)
                        {
                            Update.nValue = i.sValue.ToDecimalOrNull();
                        }
                        else
                        {
                            result.Message = "ข้อมูลไม่ถูกต้อง !";
                            result.Status = ResultStatus.Error;
                            return result;
                        }
                        db.SaveChanges();
                    }
                    else
                    {
                        result.Message = "จำนวนเงินวงเงินไม่ถูกต้อง !";
                        result.Status = ResultStatus.Warning;
                        return result;
                    }
                }
                result.Status = ResultStatus.Success;
                return result;
            }
            catch (Exception er)
            {
                result.Message = er.Message;
                result.Status = ResultStatus.Error;
                return result;
            }

        }
    }
    public class GetLimit_lst
    {
        public int nID { get; set; }
        public string sName { get; set; }
        public string sValue { get; set; }
        public decimal? nValue { get; set; }
        public string sDescription { get; set; }
    }
}
