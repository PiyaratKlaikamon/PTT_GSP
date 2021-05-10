import React, { Fragment, useEffect, useMemo, useState } from "react";
import { AvForm, AvField, AvGroup, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import { AxiosPostJson } from "../../Service/Config/AxiosMethod";
import { BoxMsg, Decrypt, DialogConfirm, Responsestart, Sweetalert } from "../../Systems/SystemComponent";
import { Link } from "react-router-dom";
import { parse } from "query-string"
import validator from 'validator'

const Controller = 'api/ManageSeller';

const ManageSeller_Edit = () => {
    var { nID } = parse(window.location.search);
    nID = Decrypt(nID)

    const [IsActive, setIsActive] = useState("0");
    const [sCompanyCode, setsCompanyCode] = useState("");
    const [sCompanyName, setsCompanyName] = useState("");
    const [sContactName, setsContactName] = useState("");
    const [sDetail, setsDetail] = useState("");
    const [sEmail, setsEmail] = useState("");
    const [sTel, setsTel] = useState("");
    const [emailError, setEmailError] = useState('')
    useEffect(() => {
        GetDataOnPageLoad();
    }, []);

    const GetDataOnPageLoad = async () => {
        let result: any = await AxiosPostJson(Controller + "/GetData_Edit?nID=" + nID);
        if (result.data.IsActive == undefined) setIsActive("0");
        else setIsActive(result.data.IsActive == true ? "0" : "1");
        setsCompanyCode(result.data.sCompanyCode)
        setsCompanyName(result.data.sCompanyName)
        setsContactName(result.data.sContactName)
        setsDetail(result.data.sDetail)
        setsEmail(result.data.sEmail)
        setsTel(result.data.sTel)
    }
    const onInvalidSubmit = async (event, errors: [], values) => {
        if (errors.length == 0) {
            let data = {
                nVendorID: nID || 0,
                sCompanyCode: values.sCompanyCode,
                sCompanyName: values.sCompanyName,
                sContactName: values.sContactpersonName,
                sEmail: values.sEmail,
                sTel: values.sPhoneNumber,
                IsActive: values.IsStatus,
                sDetail: values.sDetail
            }
            DialogConfirm(async () => {
                let result: any = await AxiosPostJson(Controller + "/SaveData", data);
                if (result.data.Status === Responsestart.success) {
                    await LinkToListPage();
                    await Sweetalert.Success(BoxMsg.Title_Success, BoxMsg.Desc_Success_Save, null);
                } else if (result.data.Status === Responsestart.warning) {
                    Sweetalert.Warning(BoxMsg.Title_Warning, result.data.Message, null);
                } else {
                    Sweetalert.Error(BoxMsg.Title_Error, result.data.sMsg, null);
                }
            })
        }
    };
    //const validateEmail = (e) => {
    //    let email = e;

    //    if (validator.isEmail(email)) {
    //    } else {
    //        setEmailError('รูปแบบ Email ไม่ถูกต้อง')
    //    }
    //}
    const LinkToListPage = () => {
        let el = document.getElementById("LinkBackToList") as any
        el && el.click()
    }
    return (
        <Fragment>
            <AvForm onSubmit={onInvalidSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <b>รหัสบริษัท</b> <span className="text-danger">•</span>
                            <AvField type="text" name="sCompanyCode" value={sCompanyCode} errorMessage="โปรดระบุรหัสบริษัท" validate={{ required: { value: true }, }} className="form-control" autoComplete="off" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <b>ชื่อบริษัท</b> <span className="text-danger">•</span>
                            <AvField name="sCompanyName" type="text" value={sCompanyName}  errorMessage="โปรดระบุชื่อบริษัท" validate={{ required: { value: true }, }} className="form-control" autoComplete="off" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <b>ชื่อผู้ติดต่อ</b> <span className="text-danger">•</span>
                            <AvField name="sContactpersonName" type="text" value={sContactName} errorMessage="โปรดระบุชื่อผู้ติดต่อ" validate={{ required: { value: true }, }} className="form-control" autoComplete="off" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <b>อีเมล</b> 
                            {/*<AvField name="sEmail" type="text" value={sEmail} className="form-control" autoComplete="off" onChange={(e) => validateEmail(e.target.value)} />*/}
                            <AvField name="sEmail" type="email" value={sEmail} className="form-control" autoComplete="off" />
                            {/*<span style={{ fontWeight: 'bold', color: 'red', }}>{emailError}</span>*/}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <b>เบอร์ติดต่อ</b> 
                            <AvField name="sPhoneNumber" type="text" value={sTel} className="form-control" autoComplete="off" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <b>รายละเอียด</b>
                            <AvField name="sDetail" value={sDetail} type="textarea" rows={4} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b>สถานะ</b>
                                <AvRadioGroup inline name="IsStatus" value={IsActive}>
                                    <AvRadio label="ใช้งาน" value="0" />
                                    <AvRadio label="ไม่ใช้งาน" value="1" />
                                </AvRadioGroup>
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="form-row">
                    <div className="col-auto">
                        <button type="button" className="btn btn-secondary" onClick={LinkToListPage}> <i className="fas fa-arrow-left"></i> ย้อนกลับ </button>
                    </div>
                    <div className="col-auto ml-auto">
                        <div className="form-row">
                            <div className="col-auto">
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> บันทึก </button>
                                    <Link id={"LinkBackToList"} to={`/admin-manageseller`} hidden ></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AvForm>
        </Fragment>
    );
};
export default ManageSeller_Edit;
