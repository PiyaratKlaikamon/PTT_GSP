using Extensions.Common.STResultAPI;
using Microsoft.AspNetCore.Mvc;
using PTT_GSP.Models.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GSP.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ManageSellerController : ControllerBase
    {
        private PTTGSP_DWSContext db = new PTTGSP_DWSContext();
        public IActionResult GetData_List()
        {
            List<GetSeller_Edit> lst = new List<GetSeller_Edit>();
            var lstData = db.TB_Vendor.Where(w => !w.IsDel)
            // .OrderBy(o => o.nUpdateBy)
            .OrderByDescending(o => o.dUpdate).ToList();
            int Count = 1;
            foreach (var i in lstData)
            {
                GetSeller_Edit l = new GetSeller_Edit();
                l.nRow = Count;
                l.nVendorID = i.nVendorID;
                l.sCompanyCode = i.sCompanyCode;
                l.sCompanyName = i.sCompanyName;
                l.sContactName = i.sContactName;
                l.sEmail = i.sEmail;
                l.sDetail = i.sDetail;
                l.sTel = i.sTel;
                l.IsActive = i.IsActive == true ? "0" : "1";
                Count++;

                lst.Add(l);
            }
            return Ok(lst);
        }
        public ActionResult SearchTNewbyTitle(string txtSearch, string sIsActive)
        {
            db = new PTTGSP_DWSContext();
            bool? IsActive = null;
            if (sIsActive == "1")
            {
                IsActive = true;
            }
            else if (sIsActive == "2")
            {
                IsActive = false;
            }

            var qData = db.TB_Vendor.Where(w => (txtSearch != null ? (w.sCompanyName + w.sContactName).Trim().ToLower().Contains(txtSearch.Trim().ToLower()) : true) && (sIsActive != null ? w.IsActive == IsActive : true) && !w.IsDel).OrderByDescending(o => o.dUpdate).ToList();

            List<GetSeller_Edit> lstdata = new List<GetSeller_Edit>();
            int Count = 1;
            foreach (var i in qData)
            {
                GetSeller_Edit s = new GetSeller_Edit();
                s.nVendorID = i.nVendorID;
                s.sCompanyCode = i.sCompanyCode;
                s.sCompanyName = i.sCompanyName;
                s.sContactName = i.sContactName;
                s.sDetail = i.sDetail;
                s.sEmail = i.sEmail;
                s.sTel = i.sTel;
                s.nRow = Count;
                s.IsActive = i.IsActive == true ? "0" : "1";
                Count++;
                lstdata.Add(s);
            }

            return Ok(lstdata);
        }
        public ResultAPI Del_lst(GetnID data)
        {
            ResultAPI result = new ResultAPI();
            if (data.nID.Count > 0)
            {
                var qData = db.TB_Vendor.Where(w => data.nID.Contains(w.nVendorID)).ToList();
                foreach (var i in qData)
                {
                    i.IsDel = true;
                    db.SaveChanges();
                }
                db.SaveChanges();

                result.Status = ResultStatus.Success;
            }
            else
            {
                result.Status = ResultStatus.Warning;
            }
            return result;
        }
        public IActionResult GetData_Edit(int nID)
        {
            TB_Vendor lst = db.TB_Vendor.FirstOrDefault(w => w.nVendorID == nID);

            return Ok(lst);
        }
        public ResultAPI SaveData(GetSeller_Edit data)
        {
            db = new PTTGSP_DWSContext();
            ResultAPI result = new ResultAPI();
            if (data.nVendorID == 0) //create
            {
                var CheckCode = db.TB_Vendor.FirstOrDefault(w => w.sCompanyCode == data.sCompanyCode && w.IsDel); //Check CompanyCode
                if (CheckCode != null)
                {
                    result.Message = "มีรหัสบริษัทในระบบแล้ว !";
                    result.Status = ResultStatus.Warning;
                }
                else
                {
                    TB_Vendor s = new TB_Vendor();
                    s.sCompanyCode = data.sCompanyCode;
                    s.sCompanyName = data.sCompanyName;
                    s.sContactName = data.sContactName;
                    s.sEmail = data.sEmail;
                    s.sTel = data.sTel;
                    s.sDetail = data.sDetail;
                    s.IsActive = data.IsActive == "0" ? true : false;
                    s.sCreateBy = "";
                    s.sUpdateBy = "";
                    s.dCreate = DateTime.Now;
                    s.dUpdate = DateTime.Now;
                    db.TB_Vendor.Add(s);

                    result.Status = ResultStatus.Success;
                }
            }
            else //Update
            {
                var CheckCode = db.TB_Vendor.FirstOrDefault(w => w.sCompanyCode == data.sCompanyCode && w.IsDel); //Check CompanyCode
                if (CheckCode != null)
                {
                    result.Message = "มีรหัสบริษัทในระบบแล้ว !";
                    result.Status = ResultStatus.Warning;
                }
                else
                {
                    int nID = data.nVendorID;
                    var Update = db.TB_Vendor.FirstOrDefault(w => w.nVendorID == nID);
                    if (Update != null)
                    {
                        Update.sCompanyCode = data.sCompanyCode;
                        Update.sCompanyName = data.sCompanyName;
                        Update.sContactName = data.sContactName;
                        Update.sEmail = data.sEmail;
                        Update.sTel = data.sTel;
                        Update.sDetail = data.sDetail;
                        Update.IsActive = data.IsActive == "0" ? true : false;
                        Update.sUpdateBy = "";
                        Update.dUpdate = DateTime.Now;

                        result.Status = ResultStatus.Success;
                    }
                    else
                    {
                        result.Message = "ข้อมูลไม่ถูกต้อง !";
                        result.Status = ResultStatus.Error;
                    }
                }
            }
            db.SaveChanges();
            return result;
        }
    }
    public class GetSeller_Edit
    {
        public int nVendorID { get; set; }
        public int nRow { get; set; }
        public string sCompanyCode { get; set; }
        public string sCompanyName { get; set; }
        public string sContactName { get; set; }
        public string sEmail { get; set; }
        public string sTel { get; set; }
        public string sDetail { get; set; }
        public string IsActive { get; set; }
        public bool IsDel { get; set; }
    }
    public class GetnID
    {
        public List<int?> nID { get; set; }
    }
}
