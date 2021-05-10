using Extensions.Common.STExtension;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GSP.Models.DB;
using PTT_GSP.SysGlobal;
using PTT_GSP.SysModalGlobal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GSP.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AdminRequestToImproveStockController : ControllerBase
    {


        [HttpGet]
        public List<V_Stock_Update> Request_to_ImproveStock()
        {
            List<V_Stock_Update> ov_stock_update = new List<V_Stock_Update>();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            ov_stock_update = db.V_Stock_Update.OrderBy(o => o.sRequestNo).ToList();

            return ov_stock_update;
        }





        [HttpGet]
        public List<Stock_Update_List> Request_to_ImproveStock_SearchData(string sRequestNo, string sStepID, string sStartDate, string sEndDate)
        {
            


            List<Stock_Update_List> liststock_update_list = new List<Stock_Update_List>();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            DateTime dStartDate = Convert.ToDateTime(sStartDate ?? "1900-01-01");
            DateTime dEndDate = Convert.ToDateTime(sEndDate ?? "9999-01-01");


            liststock_update_list = GetStock_Update_List(0).Where(w => w.sRequestNo.Trim().Contains(sRequestNo ?? "")
            && (sStepID != null ? w.nStepID == sStepID.ToInt() : true)
            && (w.dUpdate >= dStartDate && w.dUpdate <= dEndDate)
            ).OrderBy(o => o.sRequestNo).ToList();

            return liststock_update_list;
        }


        [HttpGet]
        public List<TM_Step_Stock_Update> GetStep()
        {
            List<TM_Step_Stock_Update> otm_step_stock_update = new List<TM_Step_Stock_Update>();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            otm_step_stock_update = db.TM_Step_Stock_Update.OrderBy(o => o.nStepID).ToList();

            return otm_step_stock_update;
        }



        [HttpGet]
        public V_Stock_Update Request_to_ImproveStock_Edit(string sRequestID)
        {
            V_Stock_Update ov_stock_update = new V_Stock_Update();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            ov_stock_update = db.V_Stock_Update.Where(w => w.nRequestID == sRequestID.ToInt()).FirstOrDefault();
            if (ov_stock_update == null) {
                ov_stock_update = new V_Stock_Update();
                ov_stock_update.sUpdatekc = DateTime.Now.ToStringFromDate();
                ov_stock_update.dUpdate = DateTime.Now;
            }
            


            return ov_stock_update;
        }

        [HttpGet]
        public List<V_Materials> GetV_Materials(string sRequestID)
        {
            List<V_Materials> ov_materials = new List<V_Materials>();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            ov_materials = db.V_Materials.Where(w => w.nRequestID == sRequestID.ToInt()).OrderBy(o => o.sMaterialCode).ToList();
            if (ov_materials == null) ov_materials = new List<V_Materials>();

            return ov_materials;
        }

        [HttpGet]
        public List<oSetSearch> SetSearch()
        {
            List<oSetSearch> osetsearch = new List<oSetSearch>();
            List<TB_Materials> listtb_materials = new List<TB_Materials>();

            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            listtb_materials = db.TB_Materials.ToList();


            osetsearch = (from a in listtb_materials
                          select new oSetSearch
                          {
                              value = a.nMaterialID.ToString(),
                              label = a.sMaterialCode.ToString() + " " + "-" + " " + a.sName.ToString(),
                              MaterialCode = a.sMaterialCode.ToString() + " " + a.sName.ToString(),
                              nUnitID = a.nUnitID,
                              nPrice = a.nPrice,
                              sUnitName = Gettb_material_unit(a.nUnitID),
                          }).ToList();



            //osetsearch 
            return osetsearch;
        }

        [HttpGet]
        public string Gettb_material_unit(int nUnitID)
        {

            PTTGSP_DWSContext db = new PTTGSP_DWSContext();
            string  sUnitName = db.TB_Material_Unit.Where(w => w.nUnitID == nUnitID).Select(s => s.sName).FirstOrDefault();

            return sUnitName;
        }





        [HttpPost]
        public IActionResult Requestapproval(data data)
        {
            CResutlWebMethod result = new CResutlWebMethod();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();
            result.sStatus = STFunction.process_Success();

            try
            {

                ///-----------TB_Stock_Update
                TB_Stock_Update tb_stock_update = db.TB_Stock_Update.Where(w => w.nRequestID == data.oV_Stock_Update.nRequestID).FirstOrDefault();

                if (tb_stock_update == null)
                {
                    tb_stock_update = new TB_Stock_Update();

                    var countrunning = db.TB_Stock_Update.Where(w => w.dCreate.Month == DateTime.Now.Month && w.dCreate.Year == DateTime.Now.Year).ToList().Count();
                    var running = "AS-" + DateTime.Now.AddYears(543).Year.ToString().Substring(2) + String.Format("{0:D2}", DateTime.Now.Month) + String.Format("{0:D4}", countrunning);

                    tb_stock_update.sRequestNo = running;
                    tb_stock_update.dCreate = DateTime.Now;
                    db.TB_Stock_Update.Add(tb_stock_update);
                }
                tb_stock_update.nStepID = data.oV_Stock_Update.nStepID ?? 0;
                tb_stock_update.dUpdateStockDate =  Convert.ToDateTime(data.oV_Stock_Update.sUpdatekc) ;
                tb_stock_update.sReason = data.oV_Stock_Update.sReason;
                tb_stock_update.nTotalPrice_Minus = data.oV_Materials.Select(s => s.nTotalPrice_Minus ?? 0).Sum();
                tb_stock_update.nTotalPrice_Plus = data.oV_Materials.Select(s => s.nTotalPrice_Plus ?? 0).Sum();
                tb_stock_update.nStepID = 1;
                tb_stock_update.dUpdate = DateTime.Now;

                db.SaveChanges();



                ///-----------TB_Stock_Update_Material
                List<TB_Stock_Update_Material> list_stock_update_material = db.TB_Stock_Update_Material.Where(w => w.nRequestID == tb_stock_update.nRequestID).ToList();

                if (list_stock_update_material != null)
                {
                    foreach (TB_Stock_Update_Material otb_stock_update_material in list_stock_update_material)
                    {
                        db.TB_Stock_Update_Material.Remove(otb_stock_update_material);
                    }
                }


                foreach (V_Materials ov_materials in data.oV_Materials)
                {

                    TB_Stock_Update_Material otb_stock_update_material = new TB_Stock_Update_Material();

                    otb_stock_update_material.nRequestID = tb_stock_update.nRequestID;
                    otb_stock_update_material.nMaterialID = ov_materials.nMaterialID;
                    otb_stock_update_material.nAmount = ov_materials.nAmount;
                    otb_stock_update_material.sCause = ov_materials.sReason;

                    db.TB_Stock_Update_Material.Add(otb_stock_update_material);
                    db.SaveChanges();
                }



                TB_Stock_Update_Approval otb_stock_update_approval = new TB_Stock_Update_Approval();

                otb_stock_update_approval.nActionID = 1;
                otb_stock_update_approval.dCreate = DateTime.Now;
                otb_stock_update_approval.nRequestID = tb_stock_update.nRequestID;

                db.TB_Stock_Update_Approval.Add(otb_stock_update_approval);
                db.SaveChanges();


            }
            catch (Exception e)
            {
                result.sStatus = SysFunc.process_Error;
                result.sMsg = e.Message;

            }

            return Ok(result);


        }


        public List<Stock_Update_List> GetStock_Update_List(int nRequestID)
        {
            List<Stock_Update_List> liststock_update_list = new List<Stock_Update_List>();

            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            ///V_Stock_Update
            List<V_Stock_Update> listv_stock_update = db.V_Stock_Update.Where(w => w.nStepID == 1).OrderBy(o => o.sRequestNo).ToList();


            if (listv_stock_update != null)
            {
                foreach (V_Stock_Update i in listv_stock_update)
                {

                    Stock_Update_List ostock_update_list = new Stock_Update_List();
                    ostock_update_list.oV_Materials = new List<V_Materials>();

                    ostock_update_list.sRequestNo = i.sRequestNo;
                    ostock_update_list.nRequestID = i.nRequestID;
                    ostock_update_list.sReason = i.sReason;
                    ostock_update_list.nCreateBy = i.nCreateBy;
                    ostock_update_list.sUpdate = i.sUpdate;
                    ostock_update_list.dUpdate = i.dUpdate;
                    ostock_update_list.sStep = i.sStep;
                    ostock_update_list.nStepID = i.nStepID;
                    ostock_update_list.sNote = i.sNote;


                    //V_Materials
                    List<V_Materials> V_Materials = db.V_Materials.Where(w => w.nRequestID == i.nRequestID).OrderBy(o => o.sMaterialCode).ToList();

                    if (V_Materials != null)
                    {
                        foreach (V_Materials m in V_Materials)
                        {
                            V_Materials ov_materials = new V_Materials();

                            ov_materials = m;
                            ostock_update_list.oV_Materials.Add(ov_materials);
                        }
                    }

                    liststock_update_list.Add(ostock_update_list);
                }
            }

            return liststock_update_list;
        }




        public class oSetSearch
        {
            public string value { get; set; }
            public string label { get; set; }
            public string MaterialCode { get; set; }
            public int nUnitID { get; set; }
            public decimal nPrice { get; set; }
            public string sUnitName { get; set; }
            

        }


        public class data
        {
            public V_Stock_Update oV_Stock_Update { get; set; }
            public List<V_Materials> oV_Materials { get; set; }


        }


        public  class Stock_Update_List
        {
            public int nRequestID { get; set; }
            public string sRequestNo { get; set; }
            public string sReason { get; set; }
            public string nCreateBy { get; set; }
            public string sUpdate { get; set; }
            public DateTime dUpdate { get; set; }
            public string sStep { get; set; }
            public int? nStepID { get; set; }
            public string sNote { get; set; }
            public List<V_Materials> oV_Materials { get; set; }
        }



    }
}
