using System;
using System.Collections.Generic;
using System.Configuration;
using System.DirectoryServices;
using System.Linq;
using System.Web;
using PTT_GSP.Models.PISEntities;
using Interfaces.ProcessResult;

/// <summary>
/// Summary description for PISFunction
/// </summary>
public class PISFunction
{
    private static PISContext pis { get { return new PISContext(); } }
    public static string[] WST_CODE { get { return new string[] { "A", "B", "I", "J" }; } }

    public static IProcessResult LDAP_Connect(string sDomain, string sUsername, string sPassword)
    {
        IProcessResult r = new IProcessResult() { Success = false };

        string sPath = "";
        switch (sDomain)
        {
            case "ptt": sPath = "LDAP://PTT.CORP"; break;
        }

        if (!string.IsNullOrEmpty(sDomain))
        {
            DirectoryEntry entry = new DirectoryEntry(sPath, sUsername, sPassword);
            if (entry != null)
            {
                try
                {
                    DirectorySearcher searcher = new DirectorySearcher(entry);
                    try
                    {
                        SearchResultCollection resCollection = searcher.FindAll();
                        r.Success = true;
                    }
                    catch (Exception ex) { r.Message = ex.Message; }
                }
                catch (Exception ex) { r.Message = ex.Message; }
            }
        }
        else r.Message = "DOMAIN IS NOT FOUND";

        return r;
    }

    [Serializable]
    public class RepInfo
    {
        public string sEmpCode { get; set; }
        public string sPosCode { get; set; }
        public string sBand { get; set; }

        //BAND_CODE     BAND_DESC
        //AA            พนักงานทั่วไป
        //AB            พนักงานอาวุโส
        //AC0           ผู้จัดการแผนก
        //AC1           ผจ.ส่วน
        //AD            ฝ่าย
        //AE            ผู้ช่วยฯ
        //AF            รองฯ
        //AG            ปธ.
        //AH            กผญ.

        public static List<RepInfo> AllReportTo(string EMPCODE) { return AllReportTo(EMPCODE, pis); }
        public static List<RepInfo> AllReportTo(string EMPCODE, PISContext _pis)
        {
            List<RepInfo> lstRep = new List<RepInfo>();
            var emp = pis.personel_info.FirstOrDefault(w => w.CODE == EMPCODE);
            if (emp != null) lstRep.AddRange(AllReportTo(emp.CODE, emp.POSCODE, _pis));
            return lstRep;
        }
        public static List<RepInfo> AllReportTo(string EMPCODE, string POSCODE, PISContext _pis)
        {
            List<RepInfo> lstRep = new List<RepInfo>();
            var rep = _pis.Report_To.FirstOrDefault(w => w.CODE == EMPCODE && w.POSCODE == POSCODE && w.PERCENTAGE == "100.00");
            if (rep != null) lstRep.AddRange(AllReportTo(rep.CODE, rep.POSCODE, rep.BAND, _pis));
            return lstRep;
        }
        public static List<RepInfo> AllReportTo(string EMPCODE, string POSCODE, string BAND, PISContext _pis)
        {
            List<RepInfo> lstRep = new List<RepInfo>();
            lstRep.Add(new RepInfo() { sEmpCode = EMPCODE, sPosCode = POSCODE, sBand = BAND });
            var rep = _pis.Report_To.FirstOrDefault(w => w.CODE == EMPCODE && w.POSCODE == POSCODE && w.PERCENTAGE == "100.00");
            if (rep != null) lstRep.AddRange(AllReportTo(rep.REP_CODE, rep.REP_POSCODE, rep.REP_BAND, _pis));
            return lstRep;
        }
    }

    public static List<string> AllReportTo_EmpCode(string sEmpCode) { return RepInfo.AllReportTo(sEmpCode).Select(s => s.sEmpCode).ToList(); }
    public static string ReportTo_EmpCode(string sEmpCode)
    {
        string sRepCode = "";
        var emp = pis.personel_info.FirstOrDefault(w => w.CODE == sEmpCode);
        if (emp != null)
        {
            var rep = pis.Report_To.FirstOrDefault(w => w.CODE == sEmpCode && w.POSCODE == emp.POSCODE && w.PERCENTAGE == "100.00");
            if (rep != null)
            {
                var mgr = pis.personel_info.FirstOrDefault(w => w.CODE == rep.REP_CODE);
                if (mgr != null) sRepCode = mgr.CODE;
            }
        }
        return sRepCode;
    }

    public static string HeadPostionCode_byUnitCode(string sUnitCode) { return HeadPostionCode_byUnitCode(pis, sUnitCode); }
    public static string HeadPostionCode_byUnitCode(PISContext pis, string sUnitCode)
    {
        string sPositionCode = "";
        var u = pis.unit.FirstOrDefault(w => w.unitcode == sUnitCode);
        if (u != null)
        {
            if (string.IsNullOrEmpty(u.HEAD_POSITION))
            {
                var lstDummy = u.DUMMY_RELATIONSHIP.Split('-').ToList();
                string sDummy_Head = string.Join("-", lstDummy.GetRange(0, lstDummy.Count - 1));
                var u_head = pis.unit.FirstOrDefault(w => w.DUMMY_RELATIONSHIP == sDummy_Head);
                if (u_head != null) sPositionCode = string.IsNullOrEmpty(u_head.HEAD_POSITION) ? HeadPostionCode_byUnitCode(pis, u_head.unitcode) : u_head.HEAD_POSITION;
            }
            else sPositionCode = u.HEAD_POSITION;
        }
        return sPositionCode;
    }

    [Serializable]
    public class EmpInfo
    {
        public string CODE { get; set; }
        public string NAME { get; set; }
        public string POSITION_CODE { get; set; }
        public string POSITION_NAME { get; set; }
        public string POSITION_ABBR { get; set; }
    }

    public static EmpInfo HeadEmployee_byUnitCode(string sUnitCode) { return HeadEmployee_byUnitCode(pis, sUnitCode); }
    public static EmpInfo HeadEmployee_byUnitCode(PISContext pis, string sUnitCode)
    {
        EmpInfo emp = new EmpInfo();
        string sPositionCode = HeadPostionCode_byUnitCode(pis, sUnitCode);
        var d = pis.personel_info.FirstOrDefault(w => w.POSCODE == sPositionCode);
        if (d != null)
        {
            emp.CODE = d.CODE;
            emp.NAME = d.FNAME + " " + d.LNAME;
            emp.POSITION_CODE = d.POSCODE;
            var p = pis.position.FirstOrDefault(w => w.poscode == d.POSCODE);
            emp.POSITION_NAME = p != null ? p.t_name : d.POSNAME;
            emp.POSITION_ABBR = p != null ? p.AB_NAME : d.POSNAME;
        }
        return emp;
    }
    public static string HeadEmpCode_byUnitCode(string sUnitCode) { return HeadEmpCode_byUnitCode(pis, sUnitCode); }
    public static string HeadEmpCode_byUnitCode(PISContext pis, string sUnitCode) { return HeadEmployee_byUnitCode(pis, sUnitCode).CODE; }

    public static bool IsGSP(string UNITCODE)
    {
        bool isGSP = false;
        var GSP = pis.unit.FirstOrDefault(w => w.unitcode == "80000563");
        if (GSP != null) isGSP = GSP.unitcode == UNITCODE || pis.unit.Any(w => w.unitcode == UNITCODE && w.DUMMY_RELATIONSHIP.StartsWith(GSP.DUMMY_RELATIONSHIP + "-"));
        return isGSP;
    }

    [Serializable]
    public class UnitInfo
    {
        public string CODE { get; set; }
        public string NAME { get; set; }
        public string ABBR { get; set; }
        public string RELATE { get; set; }
    }

    public static List<UnitInfo> ListUnit_ToUpper(string sUnitCode) { return ListUnit_ToUpper(pis, sUnitCode); }
    public static List<UnitInfo> ListUnit_ToUpper(PISContext pis, string sUnitCode)
    {
        List<UnitInfo> lstUnit = new List<UnitInfo>();

        var u = pis.unit.FirstOrDefault(w => w.unitcode == sUnitCode);
        if (u != null)
        {
            lstUnit.Add(new UnitInfo() { CODE = u.unitcode, NAME = u.longname, ABBR = u.unitabbr, RELATE = u.DUMMY_RELATIONSHIP });

            var arrDummyRalation = u.DUMMY_RELATIONSHIP.Split('-');
            int nDummyLevel = arrDummyRalation.Length;
            List<string> lstDummyRalation = new List<string>();
            for (int n = nDummyLevel - 1; n > 0; n--)
            {
                string sDummyRalation = string.Join("-", arrDummyRalation.ToList().GetRange(0, n));
                lstDummyRalation.Add(sDummyRalation);
            }

            var lstUnitRalated_DB = pis.unit.Where(w => lstDummyRalation.Contains(w.DUMMY_RELATIONSHIP))
                .Select(s => new { s.unitcode, s.longname, s.unitabbr, s.DUMMY_RELATIONSHIP }).ToList();
            lstUnitRalated_DB.ForEach(ur =>
            {
                lstUnit.Add(new UnitInfo() { CODE = ur.unitcode, NAME = ur.longname, ABBR = ur.unitabbr, RELATE = ur.DUMMY_RELATIONSHIP });
            });
        }

        return lstUnit;
    }

    public static List<UnitInfo> ListUnit_ToLower(string sUnitCode) { return ListUnit_ToLower(pis, sUnitCode); }
    public static List<UnitInfo> ListUnit_ToLower(PISContext pis, string sUnitCode)
    {
        List<UnitInfo> lstUnit = new List<UnitInfo>();

        var u = pis.unit.FirstOrDefault(w => w.unitcode == sUnitCode);
        if (u != null)
        {
            lstUnit.Add(new UnitInfo() { CODE = u.unitcode, NAME = u.longname, ABBR = u.unitabbr, RELATE = u.DUMMY_RELATIONSHIP });

            var lstUnitRalated_DB = pis.unit.Where(w => w.DUMMY_RELATIONSHIP.StartsWith(u.DUMMY_RELATIONSHIP + "-"))
                .Select(s => new { s.unitcode, s.longname, s.unitabbr, s.DUMMY_RELATIONSHIP }).ToList();
            lstUnitRalated_DB.ForEach(ur =>
            {
                lstUnit.Add(new UnitInfo() { CODE = ur.unitcode, NAME = ur.longname, ABBR = ur.unitabbr, RELATE = ur.DUMMY_RELATIONSHIP });
            });
        }

        return lstUnit;
    }
}