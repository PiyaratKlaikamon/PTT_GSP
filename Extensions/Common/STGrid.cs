using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Extensions.Common.STResultAPI;

public class STGrid
{
    public class Pagination : ResultAPI
    {
        public int nDataLength { get; set; } //nDataCountAll
        public int nPageIndex { get; set; }
        public int nSkip { get; set; } //nSkipData
        public int nTake { get; set; } //nTakeData
        public int nStartIndex { get; set; } //nStartItemIndex
    }

    public class Option //CommonLoadData
    {
        private class SortingDirection
        {
            public static string ASCENDING { get { return "asc"; } }
            public static string DESCENDING { get { return "desc"; } }
        }

        public int nPageSize { get; set; }
        public int nPageIndex { get; set; }
        /// <summary>
        /// Ordering by Column Name
        /// </summary>
        public string sSortExpression { get; set; } //sOrderCol
        /// <summary>
        /// Ordering Direction (ASC,DESC) 
        /// </summary>
        public string sSortDirection { get; set; } //sOrderType

        public bool isASC { get { return sSortDirection == SortingDirection.ASCENDING; } }
        public bool isDESC { get { return sSortDirection == SortingDirection.DESCENDING; } }
    }

    public static Pagination Paging(int nPageSize, int nPageIndex, int nCountAllData)
    {
        Pagination data = new Pagination();
        nPageIndex = nPageIndex == 0 ? 1 : nPageIndex;
        decimal nCalPage = nPageSize > 0 ? (nCountAllData / (decimal)nPageSize) : 0;
        int nPageCount = (int)Math.Ceiling(nCalPage);
        nPageIndex = nPageIndex > nPageCount ? nPageCount : nPageIndex;
        int nSkip = nPageSize * (nPageIndex - 1);
        nSkip = nSkip < 0 ? 0 : nSkip;

        data.nDataLength = nCountAllData;
        data.nSkip = nSkip;
        data.nTake = nPageSize;
        data.nPageIndex = nPageIndex;
        data.nStartIndex = nSkip + 1;
        return data;
    }
}

