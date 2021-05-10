import React, { Fragment, useEffect, useState } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { AxiosGetJson, AxiosPostJson } from "../../Service/Config/AxiosMethod";
import { BoxMsg, DialogConfirm, Responsestart, Sweetalert } from "../../Systems/SystemComponent";
import InputFormat from "../../ST_Handlers/InputFormat";

const Controller = 'api/ApprovalLimit';
const ApprovalLimit = () => {
    const [Departmentlevel, setDepartmentlevel] = useState("");
    const [Sectionlevel, setSectionlevel] = useState("");
    const [Money_Departmentlevel, setMoney_Departmentlevel] = useState(0.00);
    const [Money_Sectionlevel, setMoney_Sectionlevel] = useState(0.00);

    useEffect(() => {
        GetDataOnPageLoad();
        onChangeNumber();
    }, []);

    const GetDataOnPageLoad = async () => {
        let result: any = await AxiosGetJson(Controller + "/GetData_List");
        setDepartmentlevel(result[0].sName)
        setSectionlevel(result[1].sName)
        setMoney_Departmentlevel(result[0].nValue)
        setMoney_Sectionlevel(result[1].nValue)
    }
    const onInvalidSubmit = async (event, errors: [], values) => {
        if (errors.length == 0) {
            let data = [{
                nID: 1,
                sValue: values.nDepartment + "",
            }, {
                nID: 2,
                sValue: values.sSection + "",
            }]
            DialogConfirm(async () => {
                let result: any = await AxiosPostJson(Controller + "/SaveData", data);
                if (result.data.Status === Responsestart.success) {
                    await Sweetalert.Success(BoxMsg.Title_Success, BoxMsg.Desc_Success_Save, null);
                } else if (result.data.Status === Responsestart.warning) {
                    Sweetalert.Warning(BoxMsg.Title_Warning, result.data.Message, null);
                } else {
                    Sweetalert.Error(BoxMsg.Title_Error, result.data.Message, null);
                }
            })
        }
    };
    const onChangeNumber = () => {
        var nDepartment = document.getElementById("nDepartment"); // ราคา
        if (nDepartment != null) {
            var i = InputFormat.Numeric(nDepartment, false, 16, 2);
        }
        var sSection = document.getElementById("sSection"); // ราคา
        if (sSection != null) {
            var i = InputFormat.Numeric(sSection, false, 16, 2);
        }
    }
    return (
        <Fragment>
            <AvForm onSubmit={onInvalidSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <b>{Departmentlevel}</b>{" "}
                            <span className="text-danger">•</span>
                            <AvField name="nDepartment" id="nDepartment" type="text" value={Money_Departmentlevel} errorMessage="โปรดระบุผู้อนุมัติระดับแผนก" validate={{ required: { value: true }, }} className="form-control" autoComplete="off" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <b>{Sectionlevel}</b>{" "}
                            <span className="text-danger">•</span>
                            <AvField name="sSection" id="sSection" type="text" value={Money_Sectionlevel} errorMessage="โปรดระบุผู้อนุมัติระดับส่วน" validate={{ required: { value: true }, }} className="form-control" autoComplete="off" />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="text-center">
                    <button type="submit" className="btn btn-primary"> <i className="fas fa-save"></i> บันทึก </button>
                </div>
            </AvForm>
        </Fragment>
    );
};
export default ApprovalLimit;
