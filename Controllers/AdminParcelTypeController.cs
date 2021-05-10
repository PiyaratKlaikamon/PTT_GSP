using Microsoft.AspNetCore.Mvc;
using PTT_GSP.Models.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PTT_GSP.Controllers;
using Extensions.Common.STExtension;
using PTT_GSP.SysModalGlobal;
using static PTT_GSP.Controllers.AdminParcelGroupController;

namespace PTT_GSP.Controllers
{


    [Route("api/[controller]/[action]")]
    [ApiController]

    public class AdminParcelTypeController : ControllerBase
    {
        AdminParcelGroupController AdminParcelGroupController = new AdminParcelGroupController();

        [HttpGet]
        public List<V_Material_Category> ParcelType()
        {
            List<V_Material_Category> list_v_material_category = new List<V_Material_Category>();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            list_v_material_category = db.V_Material_Category.OrderBy(o => o.nOrder).ToList();
            return list_v_material_category;
        }


        public List<Material_Group> GetMaterial_Group()
        {
            List<TB_Material_Group_md> listtb_material_group_md = new List<TB_Material_Group_md>();
            List<Material_Group> listMaterial_Group = new List<Material_Group>();

            listtb_material_group_md = AdminParcelGroupController.ParcelGroup();

            foreach (TB_Material_Group_md otb_material_group in listtb_material_group_md.Where(w => w.IsActive = true))
            {
                Material_Group oMaterial_Group = new Material_Group();

                oMaterial_Group.sGroupID = otb_material_group.nGroupID.ToString();
                oMaterial_Group.sName = otb_material_group.sName;

                listMaterial_Group.Add(oMaterial_Group);

            }

            return listMaterial_Group;
        }


        public IActionResult GetMaterialGroup_SearchData(string sName, string sGroupID, string sIsActive)
        {
            List<V_Material_Category> list_v_material_category = new List<V_Material_Category>();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            list_v_material_category = db.V_Material_Category.Where(w => (w.sCategoryName.Trim() + w.sCategoryCode.Trim()).Trim().ToLower().Contains(sName ?? "")
            && (sIsActive != null ? w.IsActive == (sIsActive == "1") : true)
            && (sGroupID != null ? w.nGroupID == sGroupID : true)
            ).OrderBy(o => o.nOrder).ToList();

            return Ok(list_v_material_category);

        }

        [HttpPost]
        public IActionResult GetMaterialGroup__Del_data(int[] nCategoryID)
        {

            CResutlWebMethod result = new CResutlWebMethod();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            if (nCategoryID.Length > 0)
            {
                List<TB_Material_Category> listtb_material_category = db.TB_Material_Category.Where(w => nCategoryID.Contains(w.nCategoryID)).ToList();

                foreach (var i in listtb_material_category)
                {
                    i.IsDel = true;
                    db.SaveChanges();
                }
                SetOrderAll();
                result.sStatus = STFunction.process_Success();
            }
            else
            {
                result.sStatus = STFunction.process_Warning();
            }

            return Ok(result);
        }



        public void SetOrderAll()
        {

            PTTGSP_DWSContext db = new PTTGSP_DWSContext();
            List<TB_Material_Category> listtb_material_category = db.TB_Material_Category.Where(w => w.IsDel == false).OrderBy(o => o.nOrder).ToList();
            if (listtb_material_category != null)
            {
                int neworder = 1;
                foreach (TB_Material_Category otb_material_category in listtb_material_category)
                {
                    otb_material_category.nOrder = neworder;
                    neworder++;
                }
                db.SaveChanges();


            }

        }



        public V_Material_Category ParcelType_Edit(string sCategoryID)
        {
            V_Material_Category ov_material_category = new V_Material_Category();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            ov_material_category = db.V_Material_Category.Where(w => w.nCategoryID == sCategoryID.ToInt()).OrderBy(o => o.nOrder).FirstOrDefault();
            if (ov_material_category == null)
            {
                ov_material_category = new V_Material_Category();
                ov_material_category.IsActive = true;
                ov_material_category.nGroupID = "";
                

            }


            return ov_material_category;
        }

        [HttpPost]
        public IActionResult Savedata(V_Material_Category oV_Material_Category)
        {

            CResutlWebMethod result = new CResutlWebMethod();

            PTTGSP_DWSContext db = new PTTGSP_DWSContext();
            result.sStatus = STFunction.process_Success();

            try
            {

                if (!db.V_Material_Category.Any(w => w.sCategoryName.ToLower().Trim() == oV_Material_Category.sCategoryName.ToLower().Trim() && w.nCategoryID != oV_Material_Category.nCategoryID))
                {
                    if (!db.V_Material_Category.Any(w => w.sCategoryCode.ToLower().Trim() == oV_Material_Category.sCategoryCode.ToLower().Trim() && w.nCategoryID != oV_Material_Category.nCategoryID))
                    {
                        TB_Material_Category otb_material_category = db.TB_Material_Category.Where(w => w.nCategoryID == oV_Material_Category.nCategoryID).FirstOrDefault();

                        if (otb_material_category == null)
                        {
                            otb_material_category = new TB_Material_Category();
                            otb_material_category.dCreate = DateTime.Now;
                            db.TB_Material_Category.Add(otb_material_category);
                        }
                        otb_material_category.nGroupID = oV_Material_Category.nGroupID.ToInt();
                        otb_material_category.sCategoryCode = oV_Material_Category.sCategoryCode;
                        otb_material_category.sName = oV_Material_Category.sCategoryName;
                        otb_material_category.sDetail = oV_Material_Category.sDetail;
                        otb_material_category.nOrder = oV_Material_Category.nOrder;
                        otb_material_category.IsActive = oV_Material_Category.IsActive;

                        otb_material_category.dUpdate = DateTime.Now;

                        db.SaveChanges();
                    }
                    else
                    {
                        result.sMsg = "รหัสประเภทวัสดุนี้มีในระบบแล้ว";
                        result.sStatus = STFunction.process_Warning();
                    }

                }
                else
                {
                    result.sMsg = "ชื่อประเภทวัสดุนี้มีในระบบแล้ว";
                    result.sStatus = STFunction.process_Warning();
                }
            }
            catch (Exception e)
            {

                result.sStatus = STFunction.process_Failed();
                result.sMsg = e.ToString();

            }
            return Ok(result);
        }





        public CResutlWebMethod SetOrder(string sOrder, int nCategoryID)
        {
            CResutlWebMethod result = new CResutlWebMethod();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            result.sStatus = STFunction.process_Success();
            List<TB_Material_Category> listtb_material_category = db.TB_Material_Category.ToList();

            TB_Material_Category tb_material_category = listtb_material_category.FirstOrDefault(w => w.nCategoryID == nCategoryID);

            if (tb_material_category != null)
            {
                tb_material_category.nOrder = sOrder.ToInt();

                int n = 0;
                var lstItem_OTHER = listtb_material_category.Where(w => w.nCategoryID != nCategoryID && w.IsDel == false).OrderBy(o => o.nOrder).ToList();
                lstItem_OTHER.ForEach(i =>
                {
                    n += 1;
                    if (n == sOrder.ToInt()) n += 1;
                    i.nOrder = n;
                });

                db.SaveChanges();

            }
            else
            {
                result.sMsg = "ไม่พบข้อมูลไม่ถูกต้อง";
                result.sStatus = STFunction.process_Warning();
            }
            return result;
        }


        public partial class Material_Group
        {
            public string sGroupID { get; set; }
            public string sName { get; set; }

        }


    }
}
