using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Extensions.Common.STExtension;
using PTT_GSP.Models.DB;
using PTT_GSP.Models.PISEntities;
using Models.SystemModels.UserAccount;
using Interfaces.Authentication;
using Interfaces.ProcessResult;
using System;

namespace PTT_GSP.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class MaterialController : ControllerBase
    {
        private readonly PTTGSP_DWSContext db;
        private readonly PISContext pis;

        private readonly IAuthentication IAuthen;
        public MaterialController(IAuthentication au)
        {
            IAuthen = au;
            db = new PTTGSP_DWSContext();
            pis = new PISContext();
        }

        private class DATA_RequestReason
        {
            public int ReasonID { get; set; }
            public string Name { get; set; }
        }
        private class DATA_MaterialGroup
        {
            public int GroupID { get; set; }
            public string Name { get; set; }
        }
        private class DATA_MaterialCategory
        {
            public int GroupID { get; set; }
            public int CategoryID { get; set; }
            public string Name { get; set; }
        }
        private class DATA_MaterialItem
        {
            public int GroupID { get; set; }
            public int CategoryID { get; set; }
            public int ItemID { get; set; }
            public string Code { get; set; }
            public string Name { get; set; }
            public int Amount_Total { get; set; }
            public int Amount_InProgress { get; set; }
            public decimal Price { get; set; }
            public string ImgSrc { get; set; }
        }

        [HttpPost]
        [Authorize]
        public IActionResult RequestForm_Prepare()
        {
            #region QUERY from DB
            var lstReason = db.TB_Reason.Where(w => !w.IsDel && w.IsActive).Select(s => new { s.nReasonID, s.sName }).ToList();

            var lstGroup = db.TB_Material_Group.Where(w => !w.IsDel && w.IsActive).OrderBy(o => o.nOrder).Select(s => new { s.nGroupID, s.sName }).ToList();
            var lstGroupID = lstGroup.Select(s => s.nGroupID).ToList();
            var lstCategory = db.TB_Material_Category.Where(w => !w.IsDel && w.IsActive && lstGroupID.Contains(w.nGroupID)).OrderBy(o => o.nOrder)
                .Select(s => new { s.nGroupID, s.nCategoryID, s.sName }).ToList();
            var lstGroupCategoryID = lstCategory.Select(s => new { s.nGroupID, s.nCategoryID }).ToList();
            var lstMaterial = db.TB_Materials.Where(w => !w.IsDel && w.IsActive).OrderBy(o => o.sName).ToList()
                .Where(w => lstGroupCategoryID.Any(a => a.nGroupID == w.nGroupID && a.nCategoryID == w.nCategoryID))
                .Select(s => new { s.nGroupID, s.nCategoryID, s.nMaterialID, s.sMaterialCode, s.sName, s.nPrice, s.sFile_Path }).ToList();
            var lstMaterialID = lstMaterial.Select(s => s.nMaterialID).ToList();
            var lstMatBP = db.TB_Materials_BP.Where(w => lstMaterialID.Contains(w.nMaterialID))
                .Select(s => new { s.nMaterialID, s.nMat_Balance, s.nMat_Pending }).ToList();

            lstGroupID = lstMaterial.Select(s => s.nGroupID).Distinct().ToList();
            lstGroupCategoryID = lstMaterial.GroupBy(g => new { g.nGroupID, g.nCategoryID }).Select(s => new { s.Key.nGroupID, s.Key.nCategoryID }).ToList();
            #endregion

            List<DATA_RequestReason> lstReasonData = lstReason.Select(s => new DATA_RequestReason() { ReasonID = s.nReasonID, Name = s.sName }).ToList();

            List<DATA_MaterialGroup> lstGroupData = lstGroup
                .Where(w => lstGroupID.Contains(w.nGroupID))
                .Select(s => new DATA_MaterialGroup() { GroupID = s.nGroupID, Name = s.sName }).ToList();

            List<DATA_MaterialCategory> lstCategoryData = lstCategory
                .Where(w => lstGroupCategoryID.Any(a => a.nGroupID == w.nGroupID && a.nCategoryID == w.nCategoryID))
                .Select(s => new DATA_MaterialCategory() { GroupID = s.nGroupID, CategoryID = s.nCategoryID, Name = s.sName }).ToList();

            #region List<DATA_MaterialItem> lstItemData = new List<DATA_MaterialItem>() {...};
            List<DATA_MaterialItem> lstItemData = new List<DATA_MaterialItem>();
            lstMaterial.ForEach(a =>
            {
                var bp = lstMatBP.FirstOrDefault(w => w.nMaterialID == a.nMaterialID);
                lstItemData.Add(new DATA_MaterialItem()
                {
                    GroupID = a.nGroupID,
                    CategoryID = a.nCategoryID,
                    ItemID = a.nMaterialID,
                    Code = a.sMaterialCode,
                    Name = a.sName,
                    Amount_Total = bp != null ? bp.nMat_Balance : 0,
                    Amount_InProgress = bp != null ? bp.nMat_Pending : 0,
                    Price = a.nPrice,
                    ImgSrc = a.sFile_Path
                });
            });
            #endregion

            return Ok(new { lstReasonData, lstGroupData, lstCategoryData, lstItemData });
        }

        public class DATA_MaterialItem_Selected
        {
            public int ItemID { get; set; }
            public int Amount { get; set; }
        }
        public class DATA_Request
        {
            public int nRequestID { get; set; }
            public string sLocation { get; set; }
            public int? nReasonID { get; set; }
            public string sReasonDetail { get; set; }
            public bool isFastTrack { get; set; }
            public string sFastTrackDetail { get; set; }
            public int? nWorkID { get; set; }
            public List<DATA_MaterialItem_Selected> lstMaterial_Selected { get; set; }
        }

        [HttpPost]
        [Authorize]
        public IActionResult Request_byWorkType(int nWorkTypeID)
        {
            DATA_Request r = new DATA_Request();

            var work = db.TB_Work.FirstOrDefault(w => w.nWorkID == nWorkTypeID);
            if (work != null)
            {
                var lstGroupID = db.TB_Material_Group.Where(w => !w.IsDel && w.IsActive).Select(s => s.nGroupID).ToList();
                var lstGroupCategoryID = db.TB_Material_Category.Where(w => !w.IsDel && w.IsActive && lstGroupID.Contains(w.nGroupID))
                    .Select(s => new { s.nGroupID, s.nCategoryID }).ToList();
                var lstMaterialID = db.TB_Materials.Where(w => !w.IsDel && w.IsActive).Select(s => new { s.nGroupID, s.nCategoryID, s.nMaterialID }).ToList()
                    .Where(w => lstGroupCategoryID.Any(a => a.nGroupID == w.nGroupID && a.nCategoryID == w.nCategoryID)).Select(s => s.nMaterialID).ToList();
                var lstMatBP = db.TB_Materials_BP.Where(w => lstMaterialID.Contains(w.nMaterialID)).Select(s => new { s.nMaterialID, s.nMat_Balance }).ToList();

                var lstMaterial_Work = db.TB_Work_Material
                    .Where(w => w.nWorkID == nWorkTypeID && w.IsActive && lstMaterialID.Contains(w.nMaterialID))
                    .Select(s => new { s.nMaterialID, s.nAmount }).ToList();

                List<DATA_MaterialItem_Selected> lstMaterial_Selected = new List<DATA_MaterialItem_Selected>();
                lstMaterial_Work.ForEach(m =>
                {
                    var bp = lstMatBP.FirstOrDefault(w => w.nMaterialID == m.nMaterialID);
                    if (bp != null)
                    {
                        lstMaterial_Selected.Add(new DATA_MaterialItem_Selected()
                        {
                            ItemID = m.nMaterialID,
                            Amount = m.nAmount <= bp.nMat_Balance ? m.nAmount : bp.nMat_Balance
                        });
                    }
                });

                r.nWorkID = work.nWorkID;
                r.nReasonID = work.nReasonID;
                r.lstMaterial_Selected = lstMaterial_Selected;
            }

            return Ok(r);
        }

        [HttpPost]
        [Authorize]
        public IActionResult Request_Load(int nRequestID)
        {
            DATA_Request r = new DATA_Request();

            var req = db.T_Request.FirstOrDefault(w => w.nRequestID == nRequestID);
            if (req != null)
            {
                r.nRequestID = req.nRequestID;
                r.sLocation = req.sLocation;
                r.nReasonID = req.nReasonID;
                r.sReasonDetail = req.sDetail_Reason;
                r.isFastTrack = req.IsFastTrack;
                r.sFastTrackDetail = req.sDetail_FastTrack;

                r.lstMaterial_Selected = db.T_Request_Material.Where(w => w.nRequestID == nRequestID)
                    .Select(s => new DATA_MaterialItem_Selected() { ItemID = s.nMaterialID, Amount = s.nRequest_Amount }).ToList();
            }

            return Ok(r);
        }

        [HttpPost]
        [Authorize]
        public IActionResult Request_Save(int nRequestID, DATA_Request d)
        {
            IProcessResult r = new IProcessResult();

            try
            {
                PTTGSP_DWSContext db = new PTTGSP_DWSContext();
                UserAccount ua = IAuthen.SessionInfo();
                DateTime dNow = DateTime.Now;

                var req = db.T_Request.FirstOrDefault(w => w.nRequestID == d.nRequestID);
                if (req == null)
                {
                    #region string sReqCode = ...;
                    string sReqCode = "";
                    string sReqCode_Prefix = "RS-" + dNow.ToStringFromDate("yyMM", "th-TH");
                    var lstReqCode_samePrefix = db.T_Request.Where(w => w.sRequestNo.StartsWith(sReqCode_Prefix)).Select(s => s.sRequestNo).ToList();
                    string sReqCode_Last = lstReqCode_samePrefix.Any() ? lstReqCode_samePrefix.Max() : "";
                    if (string.IsNullOrEmpty(sReqCode_Last)) sReqCode = sReqCode_Prefix + "1".PadLeft(4, '0');
                    else
                    {
                        int n = sReqCode_Last.Substring(sReqCode_Last.Length - 4).ToIntOrNull() ?? 1;
                        sReqCode = sReqCode_Prefix + n.ToString().PadLeft(4, '0');
                    }
                    #endregion

                    req = new T_Request()
                    {
                        sRequestNo = sReqCode,
                        sOrgID = ua.sUnitCode,
                        IsFastTrack = d.isFastTrack,
                        sDetail_FastTrack = d.sFastTrackDetail,
                        nWorkID = d.nWorkID,
                        nStepID = 1,
                        IsCancel = false,
                        sCreateBy = ua.sEmployeeCode,
                        dCreate = dNow
                    };
                    db.T_Request.Add(req);
                }

                req.sLocation = d.sLocation;
                req.nReasonID = d.nReasonID.Value;
                req.sDetail_Reason = d.sReasonDetail;
                req.sEmpCode_MG1 = ua.sEmpCode_MG1; req.IsApproved_MG1 = null;
                req.sEmpCode_MG2 = ua.sEmpCode_MG2; req.IsApproved_MG2 = null;
                req.sEmpCode_MG3 = ua.sEmpCode_MG3; req.IsApproved_MG3 = null;
                req.IsRevisit = false;
                req.sUpdateBy = ua.sEmployeeCode;
                req.dUpdate = dNow;

                #region List<T_Request_Material> lstMaterial_ToSave = new List<T_Request_Material>() {...};
                List<T_Request_Material> lstMaterial_ToSave = new List<T_Request_Material>();

                var lstMaterialID = d.lstMaterial_Selected.Select(s => s.ItemID).ToList();
                var lstMaterial = db.TB_Materials
                    .Where(w => !w.IsDel && w.IsActive && lstMaterialID.Contains(w.nMaterialID))
                    .Select(s => new { s.nMaterialID, s.nPrice }).ToList();

                decimal nTotalPrice = 0;
                d.lstMaterial_Selected.ForEach(m_selected =>
                {
                    var m_db = lstMaterial.FirstOrDefault(w => w.nMaterialID == m_selected.ItemID);
                    if (m_db != null)
                    {
                        var m = new T_Request_Material() { nMaterialID = m_selected.ItemID };
                        m.nRequest_Amount = m.nPay_Amount = m_selected.Amount;
                        m.nRequest_Price = m.nPay_Price = m_db.nPrice;
                        m.nRequest_TotalPrice = m.nPay_TotalPrice = m_selected.Amount * m_db.nPrice;

                        nTotalPrice += m.nRequest_TotalPrice;

                        lstMaterial_ToSave.Add(m);
                    }
                });
                #endregion

                req.nRequest_TotalPrice = req.nPay_TotalPrice = nTotalPrice;

                db.SaveChanges();
                db = new PTTGSP_DWSContext();

                db.T_Request_Material.RemoveRange(db.T_Request_Material.Where(w => w.nRequestID == req.nRequestID));
                lstMaterial_ToSave.ForEach(m => { m.nRequestID = req.nRequestID; db.T_Request_Material.Add(m); });

                db.SaveChanges();
                r.Success = true;
            }
            catch (Exception ex)
            {
                r.Message = ex.Message;
            }

            return Ok(r);
        }
    }
}