using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PTT_GSP.Models.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static PTT_GSP.Controllers.InventoryMaterialController;

namespace PTT_GSP.Controllers
{
    [Route("api/[controller]/[action]")]
    public class BarTrendChartController : Controller
    {
        [HttpGet]
        public List<List_GetData> GetTB_Materials()
        {
            List<List_GetData> list_getdata = new List<List_GetData>();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            list_getdata = db.TB_Materials.Where(w => !w.IsDel && w.IsActive).OrderBy(o => o.sName).ToList().Select(s => new List_GetData
            {
                label = s.sName,
                value = s.nMaterialID + ""
            }).ToList(); ;

            return list_getdata;
        }



        [HttpGet]
        public List<Stp_BarTrendChart_SearchData1> GetExecStpBarTrendChart1SearchData(string StartCreatedDate,string EndCreatedDate,string GroupID,string CategoryID,string MaterialID)
        {
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();
            List<Stp_BarTrendChart_SearchData1> listStp_BarTrendChart_SearchData = new List<Stp_BarTrendChart_SearchData1>();
            string Exceq = "EXEC [dbo].[Stp_BarTrendChart_SearchData] '" + StartCreatedDate + "','" + EndCreatedDate + "','" + GroupID + "'"+",'" + CategoryID + "'" + ",'" + MaterialID + "'" + ",'" + "1" + "'";
            var JsonString = STFunction.QryToJson(Exceq, "");
            listStp_BarTrendChart_SearchData = JsonConvert.DeserializeObject<List<Stp_BarTrendChart_SearchData1>>(JsonString);
            return listStp_BarTrendChart_SearchData;
        }
        [HttpGet]
        public List<Stp_BarTrendChart_SearchData2> GetExecStpBarTrendChart2SearchData(string StartCreatedDate, string EndCreatedDate, string GroupID, string CategoryID, string MaterialID)
        {
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();
            List<Stp_BarTrendChart_SearchData2> listStp_BarTrendChart_SearchData = new List<Stp_BarTrendChart_SearchData2>();
            string Exceq = "EXEC [dbo].[Stp_BarTrendChart_SearchData] '" + StartCreatedDate + "','" + EndCreatedDate + "','" + GroupID + "'" + ",'" + CategoryID + "'" + ",'" + MaterialID + "'" + ",'" + "2" + "'";
            var JsonString = STFunction.QryToJson(Exceq, "");
            listStp_BarTrendChart_SearchData = JsonConvert.DeserializeObject<List<Stp_BarTrendChart_SearchData2>>(JsonString);
            return listStp_BarTrendChart_SearchData;
        }

        [HttpGet]
        public List<Stp_BarTrendChart_SearchData3> GetExecStpBarTrendChart3SearchData(string StartCreatedDate, string EndCreatedDate, string GroupID, string CategoryID, string MaterialID)
        {
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();
            List<Stp_BarTrendChart_SearchData3> listStp_BarTrendChart_SearchData = new List<Stp_BarTrendChart_SearchData3>();
            string Exceq = "EXEC [dbo].[Stp_BarTrendChart_SearchData] '" + StartCreatedDate + "','" + EndCreatedDate + "','" + GroupID + "'" + ",'" + CategoryID + "'" + ",'" + MaterialID + "'" + ",'" + "3" + "'";
            var JsonString = STFunction.QryToJson(Exceq, "");
            listStp_BarTrendChart_SearchData = JsonConvert.DeserializeObject<List<Stp_BarTrendChart_SearchData3>>(JsonString);
            return listStp_BarTrendChart_SearchData;
        }




        public  class Stp_BarTrendChart_SearchData1
        {
            public string sGroupName { get; set; }
            public string nTotalAmt { get; set; }
            public string nTotalPrice { get; set; }
            public string dCreate { get; set; }
        }
        public class Stp_BarTrendChart_SearchData2
        {
            public string sMaterialsName { get; set; }
            public int nTotalAmt { get; set; }
            public decimal nTotalPrice { get; set; }
        }

        public class Stp_BarTrendChart_SearchData3
        {
            public string sMaterialCode { get; set; }
            public string sMaterialsName { get; set; }
            public string sUnitName { get; set; }
            public string sCategoryName { get; set; }
            public decimal nPrice { get; set; }
            public int nTotalAmt { get; set; }
            public decimal nTotalPrice { get; set; }
            

        }




    }
}
