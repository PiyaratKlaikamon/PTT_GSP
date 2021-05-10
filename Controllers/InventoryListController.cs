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
    public class InventoryListController : ControllerBase
    {
        CultureInfo culture = new CultureInfo("th-TH");

        [HttpGet]
        public cListInventory GetListInventory(string txtSearch, string sType, string dsStartDate, string dsEndDate)
        {
            var result = new cListInventory();
            try
            {
                PTTGSP_DWSContext db = new PTTGSP_DWSContext();

                var lstMaterial = db.TB_Materials.Where(w => !w.IsDel).ToList(); //วัสดุ
                var lstMaterialUnit = db.TB_Material_Unit.Where(w => !w.IsDel).ToList(); //หน่วยนับวัสดุ
                var lstGoodReceive = db.TB_Goods_Receive.ToList(); //ทำรับวัสดุ
                var lstGoodReceiveMaterial = db.TB_Goods_Receive_Material.ToList(); //ทำรับวัสดุ
                var lstStockUpdate = db.TB_Stock_Update.ToList(); //ปรับปรุง stock
                var lstStockUpdate_Material = db.TB_Stock_Update_Material.ToList(); //ปรับปรุง stock

                var InventoryStockUpdate = (from a in lstStockUpdate
                                            join b in lstStockUpdate_Material on a.nRequestID equals b.nRequestID
                                            // into ee
                                            // from gt in ee.DefaultIfEmpty()
                                            orderby a.sRequestNo, a.dUpdateStockDate
                                            select new lstInventory
                                            {
                                                nRequestID = a == null ? 0 : a.nRequestID,
                                                sRequestNo = a.sRequestNo,
                                                dUpdateStockDate = a.dUpdateStockDate,
                                                dReceiveDate = null,
                                                d_Date = a.dUpdateStockDate.ToString("dd/MM/yyyy", culture),
                                                nMaterialID = b == null ? 0 : b.nMaterialID,
                                                sMaterialCode = "",
                                                sName = "",
                                                nAmount = b == null ? 0 : b.nAmount,
                                                nUnitID = 0,
                                                sUnitname = "",
                                                sType = "ปรับปรุง Stock",
                                                nType = 1
                                            }).ToList();

                InventoryStockUpdate = (from a in InventoryStockUpdate
                                        join e in lstMaterial on a.nMaterialID equals e.nMaterialID
                                        // into wq
                                        // from ty in wq.DefaultIfEmpty()
                                        where !e.IsDel
                                        select new lstInventory
                                        {
                                            nRequestID = a.nRequestID,
                                            sRequestNo = a.sRequestNo,
                                            dUpdateStockDate = a.dUpdateStockDate,
                                            dReceiveDate = null,
                                            d_Date = a.d_Date,
                                            nMaterialID = a.nMaterialID,
                                            sMaterialCode = e == null ? "-" : e.sMaterialCode,
                                            sName = e == null ? "-" : e.sName,
                                            nAmount = a.nAmount,
                                            nUnitID = e == null ? 0 : e.nUnitID,
                                            sUnitname = "-",
                                            sType = a.sType,
                                            nType = 1
                                        }).ToList();

                InventoryStockUpdate = (from a in InventoryStockUpdate
                                        join f in lstMaterialUnit on a.nUnitID equals f.nUnitID into bc
                                        from cd in bc.DefaultIfEmpty()
                                        select new lstInventory
                                        {
                                            nRequestID = a.nRequestID,
                                            sRequestNo = a.sRequestNo,
                                            dUpdateStockDate = a.dUpdateStockDate,
                                            dReceiveDate = null,
                                            d_Date = a.d_Date,
                                            nMaterialID = a.nMaterialID,
                                            sMaterialCode = a.sMaterialCode,
                                            sName = a.sName,
                                            nAmount = a.nAmount,
                                            nUnitID = a.nUnitID,
                                            sUnitname = cd == null ? "-" : cd.sName,
                                            sType = a.sType,
                                            nType = 1
                                        }).ToList();

                var InventoryGoodReceive = (from a in lstGoodReceive
                                            join b in lstGoodReceiveMaterial on a.nRequestID equals b.nRequestID
                                            // into ee
                                            // from gt in ee.DefaultIfEmpty()
                                            orderby a.sRequestNo, a.dReceiveDate
                                            select new lstInventory
                                            {
                                                nRequestID = a == null ? 0 : a.nRequestID,
                                                sRequestNo = a.sRequestNo,
                                                dReceiveDate = a.dReceiveDate,
                                                dUpdateStockDate = null,
                                                d_Date = a.dReceiveDate.ToString("dd/MM/yyyy", culture),
                                                nMaterialID = b == null ? 0 : b.nMaterialID,
                                                sMaterialCode = "",
                                                sName = "",
                                                nAmount = b == null ? 0 : b.nAmount,
                                                nUnitID = 0,
                                                sUnitname = "-",
                                                sType = "ทำรับวัสดุ (Goods Receive)",
                                                nType = 2
                                            }).ToList();

                InventoryGoodReceive = (from a in InventoryGoodReceive
                                        join e in lstMaterial on a.nMaterialID equals e.nMaterialID
                                        // into wq
                                        // from ty in wq.DefaultIfEmpty()
                                        where !e.IsDel
                                        select new lstInventory
                                        {
                                            nRequestID = a.nRequestID,
                                            sRequestNo = a.sRequestNo,
                                            dReceiveDate = a.dReceiveDate,
                                            dUpdateStockDate = null,
                                            d_Date = a.d_Date,
                                            nMaterialID = a.nMaterialID,
                                            sMaterialCode = e == null ? "-" : e.sMaterialCode,
                                            sName = e == null ? "-" : e.sName,
                                            nAmount = a.nAmount,
                                            nUnitID = e.nUnitID,
                                            sUnitname = "-",
                                            sType = a.sType,
                                            nType = 2
                                        }).ToList();

                InventoryGoodReceive = (from a in InventoryGoodReceive
                                        join f in lstMaterialUnit on a.nUnitID equals f.nUnitID into bc
                                        from cd in bc.DefaultIfEmpty()
                                        select new lstInventory
                                        {
                                            nRequestID = a.nRequestID,
                                            sRequestNo = a.sRequestNo,
                                            dReceiveDate = a.dReceiveDate,
                                            dUpdateStockDate = null,
                                            d_Date = a.d_Date,
                                            nMaterialID = a.nMaterialID,
                                            sMaterialCode = a.sMaterialCode,
                                            sName = a.sName,
                                            nAmount = a.nAmount,
                                            nUnitID = a.nUnitID,
                                            sUnitname = cd == null ? "-" : cd.sName,
                                            sType = a.sType,
                                            nType = 2
                                        }).ToList();

                InventoryStockUpdate.AddRange(InventoryGoodReceive);

                if (!string.IsNullOrEmpty(txtSearch) && txtSearch != "none")
                {
                    InventoryStockUpdate = InventoryStockUpdate.Where(item => item.sName.Trim().ToLower().Contains(txtSearch.Trim().ToLower()) || item.sRequestNo.Trim().ToLower().Contains(txtSearch.Trim().ToLower()) || item.sMaterialCode.Trim().ToLower().Contains(txtSearch.Trim().ToLower()) || item.sType.Trim().ToLower().Contains(txtSearch.Trim().ToLower())).ToList();
                }
                if (!string.IsNullOrEmpty(sType))
                {
                    var sType_ = Convert.ToInt32(sType);
                    InventoryStockUpdate = InventoryStockUpdate.Where(a => a.nType == sType_).ToList();
                }
                // if (dsStartDate.HasValue && dsEndDate.HasValue)
                // {
                //     DateTime sDate = Convert.ToDateTime(dsStartDate);
                //     DateTime eDate = Convert.ToDateTime(dsEndDate);
                //     InventoryStockUpdate = InventoryStockUpdate.Where(w =>
                //     (w.dUpdateStockDate >= sDate && w.dReceiveDate <= eDate) 
                //     || (w.dUpdateStockDate <= sDate && w.dReceiveDate >= sDate && w.dReceiveDate <= eDate) 
                //     || (w.dUpdateStockDate >= sDate && w.dUpdateStockDate <= eDate && w.dReceiveDate >= eDate) 
                //     || (w.dUpdateStockDate <= sDate && w.dReceiveDate >= eDate)
                //     ).ToList();
                // }

                if (!string.IsNullOrWhiteSpace(dsStartDate))
                {
                    DateTime sDate = Convert.ToDateTime(dsStartDate ?? "1900-01-01");
                    InventoryStockUpdate = InventoryStockUpdate.Where(w =>
                    (w.dUpdateStockDate >= sDate && w.dReceiveDate == null) || (w.dReceiveDate >= sDate && w.dUpdateStockDate == null)).ToList();
                }
                if (!string.IsNullOrWhiteSpace(dsEndDate))
                {
                    DateTime eDate = Convert.ToDateTime(dsEndDate ?? "9999-01-01").AddDays(+1);
                    InventoryStockUpdate = InventoryStockUpdate.Where(w =>
                    (w.dUpdateStockDate <= eDate && w.dReceiveDate == null) || (w.dReceiveDate <= eDate && w.dUpdateStockDate == null)).ToList();
                }

                result.lstInventory = InventoryStockUpdate;
            }
            catch (Exception e)
            {
                result.sStatus = SysFunc.process_Error;
                result.sMsg = e.Message;
            }
            return result;
        }

        [HttpPost]
        public IActionResult Reportexcel([FromBody] List<lstInventory> data)
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
            IXLWorksheet ws1 = wb.Worksheets.Add("สรุปรายการรับวัสดุ");
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
            SetTbl(ws1, nRow, nCol, nFontSize, true, textHC, textVC, true, null, 30, null, "เลขที่ใบขอปรับปรุง/รับวัสดุ");
            nCol += 1;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Merge();
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Fill.BackgroundColor = colorColumn;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Font.FontColor = fontBlack;
            SetTbl(ws1, nRow, nCol, nFontSize, true, textHC, textVC, true, null, 28, null, "วันที่ปรับปรุง/รับ");
            nCol += 1;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Merge();
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Fill.BackgroundColor = colorColumn;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Font.FontColor = fontBlack;
            SetTbl(ws1, nRow, nCol, nFontSize, true, textHC, textVC, true, null, 25, null, "ประเภท");
            nCol += 1;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Merge();
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Fill.BackgroundColor = colorColumn;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Font.FontColor = fontBlack;
            SetTbl(ws1, nRow, nCol, nFontSize, true, textHC, textVC, true, null, 20, null, "รหัสวัสดุ");
            nCol += 1;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Merge();
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Fill.BackgroundColor = colorColumn;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Font.FontColor = fontBlack;
            SetTbl(ws1, nRow, nCol, nFontSize, true, textHC, textVC, true, null, 35, null, "ชื่อวัสดุ");
            nCol += 1;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Merge();
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Fill.BackgroundColor = colorColumn;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Font.FontColor = fontBlack;
            SetTbl(ws1, nRow, nCol, nFontSize, true, textHC, textVC, true, null, 18, null, "จำนวน");
            nCol += 1;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Merge();
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Fill.BackgroundColor = colorColumn;
            ws1.Range(nRow, nCol, nRow + 1, nCol).Style.Font.FontColor = fontBlack;
            SetTbl(ws1, nRow, nCol, nFontSize, true, textHC, textVC, true, null, 18, null, "หน่วยนับ");
            nCol += 1;

            nColEnd = nCol;
            nRow += 2;
            #endregion

            #region Body
            int Count = 1;
            nCol = 1;

            foreach (var item in export)
            {
                SetTbl(ws1, nRow, nCol, nFontSize, false, textHC, textVC, true, null, null, null, item.sRequestNo + "");
                nCol += 1;
                SetTbl(ws1, nRow, nCol, nFontSize, false, textHC, textVC, true, null, null, null, item.d_Date + "");
                nCol += 1;
                SetTbl(ws1, nRow, nCol, nFontSize, false, textHC, textVC, true, null, null, null, item.sType + "");
                nCol += 1;
                SetTbl(ws1, nRow, nCol, nFontSize, false, textHC, textVC, true, null, null, null, item.sMaterialCode + "");
                nCol += 1;
                SetTbl(ws1, nRow, nCol, nFontSize, false, textHL, textVC, true, null, null, null, item.sName + "");
                nCol += 1;
                SetTbl(ws1, nRow, nCol, nFontSize, false, textHR, textVC, true, null, null, null, item.nAmount + "");
                nCol += 1;
                SetTbl(ws1, nRow, nCol, nFontSize, false, textHC, textVC, true, null, null, null, item.sUnitname + "");
                nCol = 1;
                nRow++;
            }

            #region Set Border
            ws1.Range(1, 1, nRow - 1, nCol + 6 ).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
            ws1.Range(1, 1, nRow - 1, nCol + 6 ).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
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
        public class cListInventory : SysModalGlobal.CResutlWebMethod
        {
            public List<lstInventory> lstInventory { get; set; }
        }

        public class lstInventory
        {
            public int nRequestID { get; set; }
            public string sRequestNo { get; set; }
            public string d_Date { get; set; }
            public int nType { get; set; }
            public string sType { get; set; }
            public int nMaterialID { get; set; }
            public string sMaterialCode { get; set; }
            public string sName { get; set; }
            public int nAmount { get; set; }
            public int nUnitID { get; set; }
            public string sUnitname { get; set; }
            public DateTime? dUpdateStockDate { get; set; }
            public DateTime? dReceiveDate { get; set; }
        }

        #endregion
    }
}