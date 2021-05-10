using Extensions.Common.STExtension;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GSP.Models.DB;
using PTT_GSP.SysModalGlobal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GSP.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AdminParcelGroupController : ControllerBase
    {

        [HttpGet]
        public List<TB_Material_Group_md> ParcelGroup()
        {
            List<TB_Material_Group_md> listtb_material_group_md = new List<TB_Material_Group_md>();
            List<TB_Material_Group> listtb_material_group = new List<TB_Material_Group>();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            listtb_material_group = db.TB_Material_Group.Where(w => w.IsDel == false).OrderBy(o => o.nOrder).ToList();
            if (listtb_material_group != null) {

                foreach (TB_Material_Group i in listtb_material_group)
                {
                    TB_Material_Group_md tb_material_group_md = new TB_Material_Group_md();
                    tb_material_group_md.nGroupID = i.nGroupID;
                    tb_material_group_md.sName = i.sName;
                    tb_material_group_md.sDetail = i.sDetail;
                    tb_material_group_md.IsActive = i.IsActive;
                    tb_material_group_md.IsDel = i.IsDel;
                    tb_material_group_md.sCreateBy = i.sCreateBy;
                    tb_material_group_md.nOrder = i.nOrder;
                    tb_material_group_md.dCreate = i.dCreate;
                    tb_material_group_md.sUpdateBy = i.sUpdateBy;
                    tb_material_group_md.dUpdate = String.Format("{0:D2}", i.dUpdate.Day) + "/" + String.Format("{0:D2}", i.dUpdate.Month) + "/" + i.dUpdate.AddYears(543).Year.ToString();
                    tb_material_group_md.IsUse = db.TB_Material_Category.Where(w => w.nGroupID == i.nGroupID).FirstOrDefault() == null ? false : true;
                    tb_material_group_md.sActive = i.IsActive ? "ใช้งาน" : "ไม่ใช้งาน";                  

                    listtb_material_group_md.Add(tb_material_group_md);
                }



    }

    
            return listtb_material_group_md;
        }



        [HttpGet]
        public List<TB_Material_Group_md> ParcelGroup_SearchData(string sName, string sIsActive)
        {

            List<TB_Material_Group_md> listtb_material_group_md = new List<TB_Material_Group_md>();
            List<TB_Material_Group> tb_material_group = new List<TB_Material_Group>();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            tb_material_group = db.TB_Material_Group.Where(w => w.IsDel == false && (w.sName.Trim().ToLower().Contains(sName ?? ""))
            && (sIsActive != null ? w.IsActive == (sIsActive == "1") : 1 == 1)
            ).OrderBy(o => o.nOrder).ToList();

            foreach (TB_Material_Group i in tb_material_group)
            {
                TB_Material_Group_md tb_material_group_md = new TB_Material_Group_md();
                tb_material_group_md.nGroupID = i.nGroupID;
                tb_material_group_md.sName = i.sName;
                tb_material_group_md.sDetail = i.sDetail;
                tb_material_group_md.IsActive = i.IsActive;
                tb_material_group_md.IsDel = i.IsDel;
                tb_material_group_md.sCreateBy = i.sCreateBy;
                tb_material_group_md.nOrder = i.nOrder;
                tb_material_group_md.dCreate = i.dCreate;
                tb_material_group_md.sUpdateBy = i.sUpdateBy;
                tb_material_group_md.dUpdate = String.Format("{0:D2}", i.dUpdate.Day.ToString()) + "/" + String.Format("{0:D2}", i.dUpdate.Month.ToString()) + "/" + i.dUpdate.AddYears(543).Year.ToString();
                tb_material_group_md.IsUse = db.TB_Material_Category.Where(w => w.nGroupID == i.nGroupID).FirstOrDefault() == null ? false : true;
                tb_material_group_md.sActive = i.IsActive ? "ใช้งาน" : "ไม่ใช้งาน";

                listtb_material_group_md.Add(tb_material_group_md);
            }

            return listtb_material_group_md;
        }



        [HttpGet]
        public IActionResult ParcelGroup_Edit(string sGroupID)
        {

            int nGroupID = sGroupID.ToInt();

            TB_Material_Group tb_material_group = new TB_Material_Group();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();
            tb_material_group = db.TB_Material_Group.Where(w => w.nGroupID == nGroupID && w.IsDel == false).FirstOrDefault();
            if (tb_material_group == null){
                tb_material_group = new TB_Material_Group();
                tb_material_group.IsActive = true;
            }
            return Ok(tb_material_group);
        }

        [HttpPost]
        public IActionResult Savedata(TB_Material_Group TB_Material_Group)
        {

            CResutlWebMethod result = new CResutlWebMethod();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();
            result.sStatus = STFunction.process_Success();

            try
            {
                if (!db.TB_Material_Group.Any(w => w.sName.ToLower().Trim() == TB_Material_Group.sName.ToLower().Trim() && w.nGroupID != TB_Material_Group.nGroupID && w.IsDel != true ))
                {


                    TB_Material_Group tb_material_group = db.TB_Material_Group.Where(w => w.nGroupID == TB_Material_Group.nGroupID).FirstOrDefault();

                    if (tb_material_group == null)
                    {
                        tb_material_group = new TB_Material_Group();
                        tb_material_group.dCreate = DateTime.Now;
                        db.TB_Material_Group.Add(tb_material_group);
                    }
                    tb_material_group.sName = TB_Material_Group.sName;
                    tb_material_group.sDetail = TB_Material_Group.sDetail;
                    tb_material_group.nOrder = TB_Material_Group.nOrder;
                    tb_material_group.IsActive = TB_Material_Group.IsActive;
                    tb_material_group.dUpdate = DateTime.Now;

                    db.SaveChanges();

                }
                else
                {
                    result.sMsg = "ชื่อกลุ่มวัสดุนี้มีในระบบแล้ว";
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



        [HttpPost]
        public IActionResult ParcelGroup_Del_data(int[] nGroupID)
        {

            CResutlWebMethod result = new CResutlWebMethod();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            if (nGroupID.Length > 0)
            {
                List<TB_Material_Group> tb_material_group = db.TB_Material_Group.Where(w => nGroupID.Contains(w.nGroupID)).ToList();

                foreach (var i in tb_material_group)
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
            List<TB_Material_Group> listtb_material_group = db.TB_Material_Group.Where(w => w.IsDel == false).OrderBy(o => o.nOrder).ToList();
            if (listtb_material_group != null)
            {
                int neworder = 1;
                foreach (TB_Material_Group otb_material_group in listtb_material_group)
                {
                    otb_material_group.nOrder = neworder;
                    neworder++;
                }
                db.SaveChanges();


            }

        }


        public CResutlWebMethod SetOrder(int nGroupID, string sOrder)
        {
            CResutlWebMethod result = new CResutlWebMethod();
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            result.sStatus = STFunction.process_Success();
            List<TB_Material_Group> listtb_material_group = db.TB_Material_Group.ToList();

            TB_Material_Group otb_material_group = listtb_material_group.FirstOrDefault(w => w.nGroupID == nGroupID);

            if (otb_material_group != null)
            {
                otb_material_group.nOrder = sOrder.ToInt();

                int n = 0;
                var lstItem_OTHER = listtb_material_group.Where(w => w.nGroupID != nGroupID && w.IsDel == false).OrderBy(o => o.nOrder).ToList();
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


        public partial class TB_Material_Group_md
        {
            public int nGroupID { get; set; }
            public string sName { get; set; }
            public int nOrder { get; set; }
            public string sDetail { get; set; }
            public bool IsActive { get; set; }
            public bool IsDel { get; set; }
            public string sCreateBy { get; set; }
            public DateTime dCreate { get; set; }
            public string sUpdateBy { get; set; }
            public string dUpdate { get; set; }
            public bool IsUse { get; set; }
            public string sActive { get; set; }
        }


    }
}
