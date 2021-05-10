import React, { Fragment, useState } from "react";
import { AvForm, AvField, AvGroup, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import { parse } from "query-string"
import { BoxMsg, Decrypt, DialogConfirm, Responsestart, Sweetalert } from "../../Systems/SystemComponent";
import axios from "axios";
import { AxiosGetJson, AxiosPostJson } from "../../Service/Config/AxiosMethod";
import { useHistory } from "react-router";
const Controller = 'api/AdminParcelGroup';

const ParcelGroup_Edit = () => {

    const history = useHistory();
    const [oTB_Material_Group, setTB_Material_Group] = useState([] as any);
    var { sGroupID, sMode } = parse(window.location.search);
    sGroupID = sGroupID && Decrypt(sGroupID)
    sMode = sMode && Decrypt(sMode)



    const [obj, setobj] = useState([] as any);

    const [cChangeradio, setChangeradio] = useState("1");
    const [nOrder, setnOrder] = useState(0);

    React.useEffect(() => {


        if (sMode == "Edit") {

        } else {
            DefaultnOrder()
        }
        GetDataOnPageLoad();

    }, []);


    const GetDataOnPageLoad = async () => {

        let result: any = await AxiosGetJson(Controller + "/ParcelGroup_Edit?sGroupID=" + sGroupID);
        setTB_Material_Group(result);
        setChangeradio(result.IsActive == false ? "0" : "1");    
    }


    const DefaultnOrder = async () => {

        let result: any = await AxiosGetJson(Controller + "/ParcelGroup");
        setnOrder(result.length);
    }

    const onInvalidSubmit = (event, errors: [], values) => {
        if (errors.length == 0) {
            onSave(values);
        }
    };




    const onSave = (values: any) => {

        oTB_Material_Group.sName = values.sName
        oTB_Material_Group.nOrder = values.order
        oTB_Material_Group.IsActive = values.radioIsActive == "1" ? true : false
        oTB_Material_Group.sDetail = values.sDetail




        DialogConfirm(async () => {

            let result: any = await AxiosPostJson(Controller + "/Savedata", oTB_Material_Group)
            if (result.data.sStatus === Responsestart.success) {
                Sweetalert.Success(BoxMsg.Desc_Success_Save, BoxMsg.Desc_Success_Save, null);

                return history.push(`/admin-parcelgroup`);

            } else if (result.data.sStatus === Responsestart.warning) {
                Sweetalert.Warning(BoxMsg.Title_Warning, result.data.sMsg, null);
            } else {
                Sweetalert.Error(BoxMsg.Title_Error, result.data.sMsg, null);
            }


        }, null, BoxMsg.Title_Confirm, BoxMsg.Desc_Confirm_Save)


    };


    return (
        <Fragment>
            <AvForm onSubmit={onInvalidSubmit}>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <b>ชื่อกลุ่มวัสดุ</b> <span className="text-danger">•</span>
                            <AvField
                                name="sName"
                                type="text"
                                maxLength={50}
                                value={oTB_Material_Group.sName}
                                errorMessage="โปรดระบุชื่อกลุ่มวัสดุ"
                                validate={{
                                    required: { value: true },
                                }}
                                className="form-control"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="col-md-auto col-12">
                        <div className="form-group">
                            <b>ลำดับการแสดงผล</b>
                            <AvField
                                name="order"
                                type="text"
                                disabled={true}
                                value={oTB_Material_Group.nOrder == 0 ? nOrder + 1 : oTB_Material_Group.nOrder}
                                className="form-control "
                                autoComplete="off"
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <b>รายละเอียด</b>
                            <AvField name="sDetail" type="textarea" maxLength={2500} value={oTB_Material_Group.sDetail} rows={4} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b>สถานะ</b>
                                <AvRadioGroup inline name="radioIsActive" value={cChangeradio} required>
                                    <AvRadio label="ใช้งาน" value="1" id="IsActiveRadio1" />
                                    <AvRadio label="ไม่ใช้งาน" value="0" id="IsActiveRadio2" />
                                </AvRadioGroup>
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <hr />

                <div className="form-row">
                    <div className="col-auto">
                        <a href="admin-parcelgroup">
                            <button type="button" className="btn btn-secondary">
                                <i className="fas fa-arrow-left"></i> กลับ
              </button>
                        </a>
                    </div>
                    <div className="col-auto ml-auto">
                        <div className="form-row">
                            <div className="col-auto">
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">
                                        <i className="fas fa-save"></i> บันทึก
                  </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AvForm>
        </Fragment>
    );
};

export default ParcelGroup_Edit;
