using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using PTT_GSP.SysModalGlobal;
using ClosedXML.Excel;
using PTT_GSP.Models.DB;
using PTT_GSP.SysGlobal;

namespace PTT_GSP.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class InventoryMaterialController : ControllerBase
    {
        CultureInfo culture = new CultureInfo("th-TH");

        [HttpGet]
        public List<List_GetData> GetMaterialGroup()
        {
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            var lstGroup = db.TB_Material_Group.Where(w => !w.IsDel && w.IsActive).OrderBy(o => o.sName).ToList().Select(s => new List_GetData
            {
                label = s.sName,
                value = s.nGroupID + ""
            }).ToList();
            return lstGroup;
        }

        [HttpGet]
        public List<List_GetData> GetMaterialCate()
        {
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            var lstCate = db.TB_Material_Category.Where(w => !w.IsDel && w.IsActive).OrderBy(o => o.sName).ToList().Select(s => new List_GetData
            {
                label = s.sName,
                value = s.nCategoryID + ""
            }).ToList();
            return lstCate;
        }

        [HttpGet]
        public List<List_GetData> GetVendor()
        {
            PTTGSP_DWSContext db = new PTTGSP_DWSContext();

            var lstVendor = db.TB_Vendor.Where(w => !w.IsDel && w.IsActive).OrderBy(o => o.sCompanyName).ToList().Select(s => new List_GetData
            {
                label = s.sCompanyName,
                value = s.nVendorID + ""
            }).ToList();
            return lstVendor;
        }

        [HttpGet]
        public cListInventoryMaterial GetListInventoryMate(string txtSearch)
        {
            var result = new cListInventoryMaterial();
            try
            {
                PTTGSP_DWSContext db = new PTTGSP_DWSContext();

                var lstMaterial = db.TB_Materials.Where(w => !w.IsDel && w.IsActive).ToList(); //วัสดุ
                var lstMaterialUnit = db.TB_Material_Unit.Where(w => !w.IsDel && w.IsActive).ToList(); //หน่วยนับวัสดุ
                var lstMaterialGroup = db.TB_Material_Group.Where(w => !w.IsDel && w.IsActive).ToList(); //กลุ่มวัสดุ
                var lstMaterialCate = db.TB_Material_Category.Where(w => !w.IsDel && w.IsActive).ToList(); //ประเภทวัสดุ
                var lstGoodReceive = db.TB_Goods_Receive.ToList(); //ทำรับวัสดุ
                var lstGoodReceiveMaterial = db.TB_Goods_Receive_Material.ToList(); //ทำรับวัสดุ
                var lstVendor = db.TB_Vendor.Where(w => !w.IsDel && w.IsActive).ToList(); //ผู้ขาย
                var lstMaterialBP = db.TB_Materials_BP.ToList();

                var InventoryMate = (from a in lstMaterial
                                     join b in lstMaterialUnit on a.nUnitID equals b.nUnitID
                                     join c in lstMaterialGroup on a.nGroupID equals c.nGroupID
                                     join d in lstMaterialCate on a.nCategoryID equals d.nCategoryID
                                     join e in lstMaterialBP on a.nMaterialID equals e.nMaterialID
                                     select new lstInventoryMate
                                     {
                                         nMaterialID = a == null ? 0 : a.nMaterialID,
                                         sMaterialCode = a == null ? "" : a.sMaterialCode,
                                         sName = a == null ? "" : a.sName,
                                         nMax = a == null ? 0 : a.nMax,
                                         nMin = a == null ? 0 : a.nMin,
                                         nReorderPoint = a.nReOrderPoint,
                                         nUnitID = b == null ? 0 : b.nUnitID,
                                         sUnitname = b == null ? "" : b.sName,
                                         nGroupID = c == null ? 0 : c.nGroupID,
                                         sGroupName = c == null ? "" : c.sName,
                                         nCateID = d == null ? 0 : d.nCategoryID,
                                         sCateName = d == null ? "" : d.sName,
                                         nMat_Banlance = e == null ? 0 : e.nMat_Balance,
                                         nVendorID = 0,
                                         sVendorName = "",
                                         nSuggestionOrder = 0,
                                         sSuggestionOrder = "",
                                     }).ToList();

                InventoryMate = (from a in InventoryMate
                                 join f in lstGoodReceiveMaterial on a.nMaterialID equals f.nMaterialID
                                 join g in lstGoodReceive on f.nRequestID equals g.nRequestID
                                 join h in lstVendor on g.nVendorID equals h.nVendorID into ll
                                 from cd in ll.DefaultIfEmpty()
                                 select new lstInventoryMate
                                 {
                                     nMaterialID = a.nMaterialID,
                                     sMaterialCode = a.sMaterialCode,
                                     sName = a.sName,
                                     nMax = a.nMax,
                                     nMin = a.nMin,
                                     nReorderPoint = a.nReorderPoint,
                                     nUnitID = a.nUnitID,
                                     sUnitname = a.sUnitname,
                                     nGroupID = a.nGroupID,
                                     sGroupName = a.sGroupName,
                                     nCateID = a.nCateID,
                                     sCateName = a.sCateName,
                                     nMat_Banlance = a.nMat_Banlance,
                                     nVendorID = cd == null ? 0 : cd.nVendorID,
                                     sVendorName = cd == null ? "" : cd.sCompanyName,
                                     nSuggestionOrder = 0,
                                     sSuggestionOrder = "",
                                     nRequestID = g == null ? 0 : g.nRequestID
                                 }).ToList();

                if (!string.IsNullOrEmpty(txtSearch) && txtSearch != "none")
                {
                    InventoryMate = InventoryMate.Where(item => item.sName.Trim().ToLower().Contains(txtSearch.Trim().ToLower())
                    || item.sMaterialCode.Trim().ToLower().Contains(txtSearch.Trim().ToLower())
                    || item.sGroupName.Trim().ToLower().Contains(txtSearch.Trim().ToLower())
                    || item.sCateName.Trim().ToLower().Contains(txtSearch.Trim().ToLower())
                    || item.sVendorName.Trim().ToLower().Contains(txtSearch.Trim().ToLower())).ToList();
                }

                result.lstInventoryMate = InventoryMate;

            }
            catch (Exception e)
            {
                result.sStatus = SysFunc.process_Error;
                result.sMsg = e.Message;
            }
            return result;
        }

        [HttpPost]
        public IActionResult Reportexcel([FromBody] List<lstInventoryMate> data)
        {
            var export = data;

            #region Variable declaration Export
            XLColor colorWhite = XLColor.FromHtml("#ffffff");
            XLColor colorBlack = XLColor.FromHtml("#000000");
            XLColor colorHead = XLColor.FromHtml("#95B3D7");
            XLColor colorColumn = XLColor.FromHtml("#FFFF99");
            XLColor colorSum = XLColor.FromHtml("#007bff");
            var fontWhite = XLColor.White;
            var fontBlack = XLColor.Black;
            int nFontSize = 12;

            var textHL = XLAlignmentHorizontalValues.Left;
            var textHR = XLAlignmentHorizontalValues.Right;
            var textHC = XLAlignmentHorizontalValues.Center;
            var textVC = XLAlignmentVerticalValues.Center;

            #region Action
            Action<IXLWorksheet, int, int, int, bool, XLAlignmentHorizontalValues, XLAlignmentVerticalValues, bool, int?, double?, double?, string> SetTbl = (sWorkSheet, row, col, FontSize, Bold, Horizontal, Vertical, wraptext, dec, width, height, sTxt) =>
                            {
                                sTxt = sTxt + "";
                                sWorkSheet.Cell(row, col).Value = sTxt;
                                sWorkSheet.Cell(row, col).Style.Font.Bold = Bold;
                                sWorkSheet.Cell(row, col).Style.Alignment.WrapText = wraptext;
                                sWorkSheet.Cell(row, col).Style.Alignment.Horizontal = Horizontal;
                                sWorkSheet.Cell(row, col).Style.Alignment.Vertical = Vertical;
                                sWorkSheet.Cell(row, col).Style.Font.FontSize = FontSize;

                                if (width != null)
                                    sWorkSheet.Column(col).Width = width.Value;
                                if (height != null)
                                    sWorkSheet.Row(row).Height = height.Value;
                                if (dec != null || dec == 0)
                                {
                                    sWorkSheet.Cell(row, col).Style.NumberFormat.Format = "#,##0.0";
                                    sWorkSheet.Cell(row, col).DataType = XLDataType.Number;
                                }

                                var nIndex = sTxt.Split('/').Length;
                                if (nIndex == 3)
                                {
                                    sWorkSheet.Cell(row, col).Style.DateFormat.Format = "dd/MM/yyyy";
                                }
                                else if (nIndex == 2)
                                {
                                    sWorkSheet.Cell(row, col).Value = "'" + sTxt;
                                    sWorkSheet.Cell(row, col).DataType = XLDataType.Text;
                                }

                            };
            #endregion
            #endregion
            #region Create Sheet
            HttpResponse httpResponse = Response;
            XLWorkbook wb = new XLWorkbook();
            IXLWorksheet ws1 = wb.Worksheets.Add("วัสดุคงคลัง");
            ws1.PageSetup.Margins.Top = 0.2;
            ws1.PageSetup.Margins.Bottom = 0.2;
            ws1.PageSetup.Margins.Left = 0.1;
            ws1.PageSetup.Margins.Right = 0;
            ws1.PageSetup.Margins.Footer = 0;
            ws1.PageSetup.Margins.Header = 0;
            ws1.Style.Font.FontName = "Calibri";
            ws1.Style.Font.FontSize = nFontSize;

            //ws1.RowHeight = 25;
            // ws1.Style.Border.InsideBorder = XLBorderStyleValues.Thin;
            // ws1.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
            ws1.Style.Fill.BackgroundColor = colorWhite;
            ws1.Style.Alignment.WrapText = true;

            int nRow = 1;
            int nCol = 1;
            int nColEnd = 1;
            #endregion

            #region Head
            ws1.Range(nRow, nCol, nRow + 1, nCol).Merge();
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Fill.BackgroundColor = colorColumn;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Font.FontColor = fontBlack;
            SetTbl(ws1, nRow, nCol, nFontSize, true, textHC, textVC, true, null, 6, null, "ที่");
            nCol += 1;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Merge();
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Fill.BackgroundColor = colorColumn;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Font.FontColor = fontBlack;
            SetTbl(ws1, nRow, nCol, nFontSize, true, textHC, textVC, true, null, 18, null, "รหัสวัสดุ");
            nCol += 1;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Merge();
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Fill.BackgroundColor = colorColumn;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Font.FontColor = fontBlack;
            SetTbl(ws1, nRow, nCol, nFontSize, true, textHC, textVC, true, null, 30, null, "ชื่อวัสดุ");
            nCol += 1;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Merge();
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Fill.BackgroundColor = colorColumn;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Font.FontColor = fontBlack;
            SetTbl(ws1, nRow, nCol, nFontSize, true, textHC, textVC, true, null, 8, null, "Max");
            nCol += 1;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Merge();
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Fill.BackgroundColor = colorColumn;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Font.FontColor = fontBlack;
            SetTbl(ws1, nRow, nCol, nFontSize, true, textHC, textVC, true, null, 8, null, "Min");
            nCol += 1;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Merge();
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Fill.BackgroundColor = colorColumn;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Font.FontColor = fontBlack;
            SetTbl(ws1, nRow, nCol, nFontSize, true, textHC, textVC, true, null, 22, null, "Suggestion Order");
            nCol += 1;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Merge();
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Fill.BackgroundColor = colorColumn;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Font.FontColor = fontBlack;
            SetTbl(ws1, nRow, nCol, nFontSize, true, textHC, textVC, true, null, 20, null, "Re-Order Point");
            nCol += 1;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Merge();
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Fill.BackgroundColor = colorColumn;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Font.FontColor = fontBlack;
            SetTbl(ws1, nRow, nCol, nFontSize, true, textHC, textVC, true, null, 20, null, "จำนวนคงเหลือ");
            nCol += 1;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Merge();
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Fill.BackgroundColor = colorColumn;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Font.FontColor = fontBlack;
            SetTbl(ws1, nRow, nCol, nFontSize, true, textHC, textVC, true, null, 15, null, "หน่วยนับ");
            nCol += 1;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Merge();
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Fill.BackgroundColor = colorColumn;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Font.FontColor = fontBlack;
            SetTbl(ws1, nRow, nCol, nFontSize, true, textHC, textVC, true, null, 20, null, "ผู้ขาย");
            nCol += 1;

            nColEnd = nCol;
            nRow += 2;
            #endregion

            #region Body
            int Count = 1;
            nCol = 1;

            foreach (var item in export)
            {
                SetTbl(ws1, nRow, nCol, nFontSize, false, textHC, textVC, true, null, null, null, Count + "");
                nCol += 1;
                SetTbl(ws1, nRow, nCol, nFontSize, false, textHC, textVC, true, null, null, null, item.sMaterialCode + "");
                nCol += 1;
                SetTbl(ws1, nRow, nCol, nFontSize, false, textHL, textVC, true, null, null, null, item.sName + "");
                nCol += 1;
                SetTbl(ws1, nRow, nCol, nFontSize, false, textHR, textVC, true, null, null, null, item.nMax + "");
                nCol += 1;
                SetTbl(ws1, nRow, nCol, nFontSize, false, textHR, textVC, true, null, null, null, item.nMin + "");
                nCol += 1;
                SetTbl(ws1, nRow, nCol, nFontSize, false, textHR, textVC, true, null, null, null, item.nSuggestionOrder + "");
                nCol += 1;
                SetTbl(ws1, nRow, nCol, nFontSize, false, textHR, textVC, true, null, null, null, item.nReorderPoint + "");
                nCol += 1;
                SetTbl(ws1, nRow, nCol, nFontSize, false, textHR, textVC, true, null, null, null, item.nMat_Banlance + "");
                nCol += 1;
                SetTbl(ws1, nRow, nCol, nFontSize, false, textHC, textVC, true, null, null, null, item.sUnitname + "");
                nCol += 1;
                SetTbl(ws1, nRow, nCol, nFontSize, false, textHC, textVC, true, null, null, null, item.sVendorName + "");
                nCol += 1;

                nCol = 1;
                nRow++;
            }

            #region Set Border
            ws1.Range(1, 1, nRow - 1, nCol + 9).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
            ws1.Range(1, 1, nRow - 1, nCol + 9).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
            #endregion

            #endregion

            #region Create EXCEL
            using (MemoryStream memoryStream = new MemoryStream())
            {
                wb.SaveAs(memoryStream);
                memoryStream.Position = 0;
                var content = memoryStream.ToArray();
                return File(content, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Test.xlsx");
            }
            #endregion

            // return Ok(null);
        }

        #region Class
        public class cListInventoryMaterial : SysModalGlobal.CResutlWebMethod
        {
            public List<lstInventoryMate> lstInventoryMate { get; set; }
        }

        public class lstInventoryMate
        {
            public int nMaterialID { get; set; }
            public string sMaterialCode { get; set; }
            public string sName { get; set; }
            public int nMax { get; set; }
            public int nMin { get; set; }
            public int nReorderPoint { get; set; }
            public int nUnitID { get; set; }
            public string sUnitname { get; set; }
            public int nGroupID { get; set; }
            public string sGroupName { get; set; }
            public int nCateID { get; set; }
            public string sCateName { get; set; }
            public int nMat_Banlance { get; set; }
            public int nVendorID { get; set; }
            public string sVendorName { get; set; }
            public int nSuggestionOrder { get; set; }
            public string sSuggestionOrder { get; set; }
            public int nRequestID { get; set; }
            public string sRequestNo { get; set; }
        }
        public class List_GetData
        {
            public string value { get; set; }
            public string label { get; set; }
        }
        #endregion
    }
}