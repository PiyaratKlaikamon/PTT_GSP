using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Extensions.Common.STResultAPI
{
    public class ResultAPI
    {
        public string Status { get; set; }
        public string Message { get; set; }
    }

    public class ResultStatus
    {
        public const string Duplicate = "Duplicate Data";
        public const string Error = "Error";
        public const string Warning = "Warning";
        public const string Success = "Success";
        public const string Failed = "Failed";
    }
    public class ItemData
    {
        public int nID { get; set; }
        public int nFileID { get; set; }
        public string SaveToFileName { get; set; }
        public string FileName { get; set; }
        public string SaveToPath { get; set; }
        public string sSize { get; set; }

        /// <summary>
        /// for open file
        /// </summary>
        public string url { get; set; }

        public bool IsNewFile { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsNewChoose { get; set; }
        public string sMsg { get; set; }
        public bool IsDelete { get; set; }
        public string sFileType { get; set; }
        public int? nFileTypeID { get; set; }
        public string sOrderNo { get; set; }
        public string sUrlDelete { get; set; }
    }
}
