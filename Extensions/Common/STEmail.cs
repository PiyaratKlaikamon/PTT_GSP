using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Extensions.Common.STEmail
{
    public class STEmail
    {
        private const string FontFamily = "Cordia New";
        private const string FontSize = "16pt";

        public static bool Send(EmailParameter o)
        {
            if (STFunction.GetAppSetting<string>("Email:Active") == "Y")//เพื่อตรวจสอบว่าจะให้ส่ง mail หรือไม่
            {
                try
                {
                    string sConntentDemo = "<br/>From : " + o.sFrom + " <br /> To : " + o.sTo + "<br /> CC : " + o.sCC + " BCC : " + o.sBCC;

                    System.Net.Mail.MailMessage oMsg = new System.Net.Mail.MailMessage(); //MailMessage oMsg = new MailMessage();

                    //Set Font
                    string sSetFont = @"<style type='text/css'>
body{
            font-family: " + FontFamily + @";
            font-size: " + FontSize + @";
    }
 </ style > ";
                    if (STFunction.GetAppSetting<string>("Email:Debug") == "N")
                    {
                        #region Real E-mail

                        //From
                        if (!string.IsNullOrEmpty(o.sFrom))
                        {
                            oMsg.From = new System.Net.Mail.MailAddress(o.sFrom);
                        }
                        else
                        {
                            oMsg.From = new System.Net.Mail.MailAddress(STFunction.GetAppSetting<string>("Email:Sender"));
                        }

                        //To
                        if (!string.IsNullOrEmpty(o.sTo))
                        {
                            string[] mailToList = o.sTo.Replace(",", ";").Split(';');
                            foreach (string strM in mailToList)
                            {
                                if (strM != "") oMsg.To.Add(strM);
                            }
                        }

                        //CC
                        if (!string.IsNullOrEmpty(o.sCC))
                        {
                            string[] mailToList = o.sCC.Replace(",", ";").Split(';');
                            foreach (string strM in mailToList)
                            {
                                if (strM != "") oMsg.CC.Add(strM);
                            }
                        }

                        //BCC
                        if (!string.IsNullOrEmpty(o.sBCC))
                        {
                            string[] mailToList = o.sBCC.Replace(",", ";").Split(';');
                            foreach (string strM in mailToList)
                            {
                                if (strM != "") oMsg.Bcc.Add(strM);
                            }
                        }
                        #endregion
                    }
                    else
                    {
                        #region Demo E-mail
                        o.sFrom = STFunction.GetAppSetting<string>("Email:Sender");
                        o.sTo = STFunction.GetAppSetting<string>("Email:DebugReceive");
                        o.sCC = "";
                        o.sBCC = "";

                        o.sMessage += sConntentDemo;

                        //From
                        oMsg.From = new System.Net.Mail.MailAddress(o.sFrom);

                        //To
                        if (!string.IsNullOrEmpty(o.sTo))
                        {
                            string[] mailToList = o.sTo.Replace(",", ";").Split(';');
                            foreach (string strM in mailToList)
                            {
                                if (strM != "") oMsg.To.Add(strM);
                            }
                        }

                        //CC
                        if (!string.IsNullOrEmpty(o.sCC))
                        {
                            string[] mailToList = o.sCC.Replace(",", ";").Split(';');
                            foreach (string strM in mailToList)
                            {
                                if (strM != "") oMsg.CC.Add(strM);
                            }
                        }

                        //BCC
                        if (!string.IsNullOrEmpty(o.sBCC))
                        {
                            string[] mailToList = o.sBCC.Replace(",", ";").Split(';');
                            foreach (string strM in mailToList)
                            {
                                if (strM != "") oMsg.Bcc.Add(strM);
                            }
                        }
                    }
                    oMsg.Subject = o.sSubject;

                    // SEND IN HTML FORMAT (comment this line to send plain text).
                    oMsg.IsBodyHtml = true; //oMsg.BodyFormat = MailFormat.Html;

                    // HTML Body (remove HTML tags for plain text).
                    oMsg.Body = @"<HTML>" + sSetFont + "<BODY>" + o.sMessage + "</BODY></HTML>";

                    // ADD AN ATTACHMENT.
                    //TODO: Replace with path to attachment.
                    if (o.lstFile.Any())
                        o.lstFile.Select(s => new Attachment(s)).ToList().ForEach(oMsg.Attachments.Add);

                    // TODO: Replace with the name of your remote SMTP server.
                    System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient();
                    smtp.Port = (STFunction.GetAppSetting<string>("Email:Port") != "") ? int.Parse(STFunction.GetAppSetting<string>("Email:Port")) : 25;
                    smtp.Host = STFunction.GetAppSetting<string>("Email:SMTP");
                    smtp.Send(oMsg);

                    oMsg.Attachments.Dispose();
                    oMsg = null;

                    return true;
                    //oAttch = null;
                    #endregion
                }
                catch
                {
                    return false;
                }
            }
            else
            {
                return true;
            }
        }
    }

    public class EmailParameter
    {
        public string sFrom { get; set; }
        public string sTo { get; set; }
        public string sCC { get; set; }
        public string sBCC { get; set; }
        public string sSubject { get; set; }
        public string sMessage { get; set; }
        public List<string> lstFile { get; set; }
    }
}
