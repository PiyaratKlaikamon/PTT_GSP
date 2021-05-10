using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection;

public static class DataTableExtensions
{
    public static bool HasColumn(this DataTable dt, string sColumnName)
    {
        return dt.Columns.IndexOf(sColumnName) > -1;
    }

    public static void SetColumnOrder(this DataTable dt, params string[] arrColumnName)
    {
        int nColumn = 0;
        foreach (string sColName in arrColumnName)
        {
            dt.Columns[sColName].SetOrdinal(nColumn);
            nColumn += 1;
        }
    }

    public static void RemoveColumn(this DataTable dt, string sColumnName)
    {
        if (dt.Columns.Contains(sColumnName)) dt.Columns.Remove(sColumnName);
    }

    public static void RemoveColumn(this DataTable dt, params string[] arrColumnName)
    {
        foreach (string sColumnName in arrColumnName)
        {
            if (dt.Columns.Contains(sColumnName)) dt.Columns.Remove(sColumnName);
        }
    }

    public static void RenameColumn(this DataTable dt, string sName_OLD, string sName_NEW)
    {
        if (dt.Columns.Contains(sName_OLD)) dt.Columns[sName_OLD].ColumnName = sName_NEW;
    }

    public static DataRow FirstRowOrDefault(this DataTable dt)
    {
        DataRow dr = null;
        if (dt.Rows.Count > 0) dr = dt.Rows[0];
        return dr;
    }

    public static void SetRows(this DataTable dt, IEnumerable<DataRow> rows)
    {
        dt.Rows.Clear();
        foreach (DataRow dr in rows) dt.Rows.Add(dr);
    }

    public static void AddRows(this DataTable dt, IEnumerable<DataRow> rows)
    {
        foreach (DataRow dr in rows) dt.Rows.Add(dr);
    }

    /// <summary>
    /// Convert variable type from DataTable to IList
    /// </summary>
    /// <typeparam name="T">Variable type for convert</typeparam>
    /// <returns></returns>
    public static IList<T> ToList<T>(this DataTable dt)
    {
        if (dt == null) return null;
        List<DataRow> lstRow = new List<DataRow>();
        lstRow.ForEach(r => lstRow.Add(r));
        return ConvertTo<T>(lstRow);
    }
    private static IList<T> ConvertTo<T>(IList<DataRow> lstRow)
    {
        IList<T> lst = null;
        if (lstRow != null)
        {
            lst = new List<T>();
            foreach (DataRow dr in lstRow)
            {
                T item = CreateItem<T>(dr);
                lst.Add(item);
            }
        }
        return lst;
    }
    private static T CreateItem<T>(DataRow dr)
    {
        string sColName;
        T obj = default(T);
        if (dr != null)
        {
            obj = Activator.CreateInstance<T>();
            foreach (DataColumn col in dr.Table.Columns)
            {
                sColName = col.ColumnName;
                PropertyInfo prop = obj.GetType().GetProperty(sColName);
                try
                {
                    object val = (dr[sColName].GetType() == typeof(DBNull)) ? null : dr[sColName];
                    prop.SetValue(obj, val, null);
                }
                catch { throw; }
            }
        }
        return obj;
    }
}

public static class DataRowExtensions
{
    public static void SetValue(this DataRow dr, string col, object val)
    {
        if (dr.Table.HasColumn(col)) dr[col] = val;
    }
}