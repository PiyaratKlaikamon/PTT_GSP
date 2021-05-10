using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Reflection;
using Microsoft.Data.SqlClient;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

public class STFunction
{
    public static DataTable LinqToDataTable<T>(IEnumerable<T> Data)
    {
        DataTable dtReturn = new DataTable();
        if (Data.ToList().Count == 0) return null;
        // Could add a check to verify that there is an element 0

        T TopRec = Data.ElementAt(0);

        // Use reflection to get property names, to create table

        // column names

        PropertyInfo[] oProps =
        ((Type)TopRec.GetType()).GetProperties();

        foreach (PropertyInfo pi in oProps)
        {

            Type colType = pi.PropertyType; if ((colType.IsGenericType) && (colType.GetGenericTypeDefinition() == typeof(Nullable<>)))
            {

                colType = colType.GetGenericArguments()[0];

            }

            dtReturn.Columns.Add(new DataColumn(pi.Name, colType));
        }

        foreach (T rec in Data)
        {

            DataRow dr = dtReturn.NewRow(); foreach (PropertyInfo pi in oProps)
            {
                dr[pi.Name] = pi.GetValue(rec, null) == null ? DBNull.Value : pi.GetValue(rec, null);
            }
            dtReturn.Rows.Add(dr);

        }
        return dtReturn;
    }

    public static void SQLExcute(string sConnection, string sQuery)
    {
        SqlConnection objConn = new SqlConnection(sConnection);
        SqlCommand cmd;
        try
        {
            objConn.Open();
            cmd = new SqlCommand(sQuery, objConn);
            cmd.ExecuteNonQuery();
        }
        catch { }
        finally { objConn.Close(); }
    }

    public static DataTable SQLGetTable(string sConnection, string sQuery)
    {
        using (SqlConnection _conn = new SqlConnection(sConnection))
        {
            DataTable _dt = new DataTable();
            _conn.Open();
            new SqlDataAdapter(sQuery, _conn).Fill(_dt);
            _conn.Close();
            return _dt;
        }
    }

    public static int SQLCountRecord(string sConnection, string sQuery)
    {
        using (SqlConnection _conn = new SqlConnection(sConnection))
        {
            DataTable _dt = new DataTable();
            _conn.Open();
            new SqlDataAdapter(sQuery, _conn).Fill(_dt);
            if (_dt.Rows.Count > 0)
            {
                int _return = _dt.Rows.Count;
                _dt.Dispose();
                return _return;
            }
            return 0;
        }

    }

    public static int SQLCountRecord(SqlConnection sqlCon, string sQuery)
    {

        DataTable _dt = new DataTable();
        if (sqlCon.State == ConnectionState.Closed) sqlCon.Open();
        new SqlDataAdapter(sQuery, sqlCon).Fill(_dt);
        if (_dt.Rows.Count > 0)
        {
            int _return = _dt.Rows.Count;
            _dt.Dispose();
            return _return;
        }
        return 0;

    }

    public static string SQLGetValue(string sConnection, string sQuery)
    {
        using (SqlConnection _conn = new SqlConnection(sConnection))
        {
            DataTable _dt = new DataTable();
            _conn.Open();
            new SqlDataAdapter(sQuery, _conn).Fill(_dt);
            if (_dt.Rows.Count >= 1)
            {
                string _return = _dt.Rows[0][0].ToString();
                _dt.Dispose();
                return _return;
            }
            return "";
        }
    }

    public static string SQLGetValue(SqlConnection sqlCon, string sQuery)
    {
        DataTable _dt = new DataTable();
        new SqlDataAdapter(sQuery, sqlCon).Fill(_dt);
        if (_dt.Rows.Count >= 1)
        {
            string _return = _dt.Rows[0][0].ToString();
            _dt.Dispose();
            return _return;
        }
        return "";
    }

    public static string SQLGenerateID(string sConnection, string sQuery)
    {
        using (SqlConnection _conn = new SqlConnection(sConnection))
        {
            string sReturn = "";
            DataTable _dt = new DataTable();
            _conn.Open();
            new SqlDataAdapter(sQuery, _conn).Fill(_dt);

            if (_dt.Rows.Count >= 1)
            {
                sReturn = "" + (Convert.ToDecimal(_dt.Rows[0][0]) + 1);
            }
            else
            {
                sReturn = "1";
            }
            _dt.Dispose();
            return sReturn;
        }
    }

    public static string SQLGenerateID(SqlConnection sqlCon, string sQuery)
    {
        if (sqlCon.State == ConnectionState.Closed) sqlCon.Open();
        string sReturn = "";
        DataTable _dt = new DataTable();

        new SqlDataAdapter(sQuery, sqlCon).Fill(_dt);

        if (_dt.Rows.Count >= 1)
        {
            sReturn = "" + (Convert.ToDecimal(_dt.Rows[0][0]) + 1);
        }
        else
        {
            sReturn = "1";
        }
        _dt.Dispose();
        return sReturn;
    }

    public static T GetAppSetting<T>(string key)
    {
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();
        var result = configuration.GetValue<T>("AppSetting:" + key);
        return result;
    }

    public static void CallEntity(DbContextOptionsBuilder optionsBuilder, string sConnectionName)
    {
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();
        optionsBuilder.UseSqlServer(configuration.GetConnectionString(sConnectionName));
    }

    public static string QryToJson(string _QRY, string _CONN)
    {
        DataTable _dt = new DataTable();
        string _Connect = _CONN;
        if (string.IsNullOrEmpty(_CONN))
        {
            _Connect = "Server = 103.129.15.138; User ID = admin_dws; database = PTTGSP_DWS; Password = P@sswordDw$;" ;
        }

        if (!string.IsNullOrEmpty(_QRY))
        {
            using (SqlConnection _conn = new SqlConnection(_Connect))
            {

                if (_conn.State == ConnectionState.Closed)
                {
                    _conn.Open();
                }

                SqlCommand com = new SqlCommand(_QRY, _conn);
                com.CommandTimeout = 6000;
                new SqlDataAdapter(com).Fill(_dt);
                _conn.Dispose();
            }
        }
        else
        {

        }
        string jsonString = string.Empty;
        if (_dt.Rows.Count > 0)
        {
            jsonString = JsonConvert.SerializeObject(_dt);
        }
        return jsonString;
    }



    public static string process_SessionExpired()
    {
        return "SSEXP";
    }
    public static string process_Success()
    {
        return "Success";
    }
    public static string process_Failed()
    {
        return "Failed";
    }
    public static string process_Warning()
    {
        return "Warning";
    }
    public static string process_FileOversize()
    {
        return "OverSize";
    }
    public static string process_FileInvalidType()
    {
        return "InvalidType";
    }
    public static string process_Duplicate()
    {
        return "DUP";
    }


}