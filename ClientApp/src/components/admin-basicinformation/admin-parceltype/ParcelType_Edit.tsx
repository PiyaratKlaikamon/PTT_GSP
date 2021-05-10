import React, { Fragment, useState } from "react";
import { AvForm, AvField, AvGroup, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import { parse } from "query-string"
import { BoxMsg, Decrypt, DialogConfirm, Responsestart, Sweetalert } from "../../Systems/SystemComponent";
import { AxiosGetJson, AxiosPostJson } from "../../Service/Config/AxiosMethod";
import { useHistory } from "react-router";
const Controller = 'api/AdminParcelType';

const ParcelType_Edit = () => {

    const history = useHistory();
    const [oV_Material_Category, setV_Material_Category] = useState([] as any);
    const [oMaterial_Group, setMaterial_Group] = useState([] as any);
    const [cChangeradio, setChangeradio] = useState("1");
    const [nDefaultnOrder, setDefaultnOrder] = useState(0);
    const [disabledGroupID, setdisabledGroupID] = useState(false);
    
    var { sCategoryID, sMode } = parse(window.location.search);
    sCategoryID = sCategoryID && Decrypt(sCategoryID)
    sMode = sMode && Decrypt(sMode)


    React.useEffect(() => {

        if (sMode == "Edit") {
            setdisabledGroupID(true)
        } else {
            DefaultnOrder()
        }
        GetDataOnPageLoad()
        GetMaterial_Group()

    }, []);

    const GetDataOnPageLoad = async () => {
        let result: any = await AxiosGetJson(Controller + "/ParcelType_Edit?sCategoryID=" + sCategoryID);
        setV_Material_Category(result);

        setChangeradio(result.IsActive == false ? "0" : "1");
    }

    const GetMaterial_Group = async () => {
        let result: any = await AxiosGetJson(Controller + "/GetMaterial_Group");
        setMaterial_Group(result);

    }



    const DefaultnOrder = async () => {

        let result: any = await AxiosGetJson(Controller + "/ParcelType");
        setDefaultnOrder(result.length);

    }

    const onInvalidSubmit = (event, errors: [], values) => {
        if (errors.length == 0) {
            onSave(values);
        }
    };


    const onSave = (values: any) => {

        oV_Material_Category.nGroupID = values.nGroupID
        oV_Material_Category.sCategoryCode = values.sCategoryCode
        oV_Material_Category.sCategoryName = values.sCategoryName
        oV_Material_Category.sDetail = values.sDetail
        oV_Material_Category.nOrder = values.nOrder
        oV_Material_Category.IsActive = values.radioIsActive == "1" ? true : false


        DialogConfirm(async () => {

            let result: any = await AxiosPostJson(Controller + "/Savedata", oV_Material_Category)
            if (result.data.sStatus === Responsestart.success) {
                Sweetalert.Success(BoxMsg.Desc_Success_Save, BoxMsg.Desc_Success_Save, null);

                return history.push(`/admin-parceltype`);

            } else if (result.data.sStatus === Responsestart.warning  ) {
                Sweetalert.Warning(BoxMsg.Title_Warning, result.data.sMsg, null);
            } else {
                Sweetalert.Error(BoxMsg.Title_Error, result.data.sMsg, null);
            }


        }, null, BoxMsg.Title_Confirm, BoxMsg.Desc_Confirm_Save)

    };

    return (
        <Fragment >
            <AvForm onSubmit={onInvalidSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <b>กลุ่มวัสดุ</b> <span className="text-danger">•</span>
                            <AvField
                                type="select"
                                name="nGroupID"
                                value={oV_Material_Category.nGroupID+""}
                                errorMessage="โปรดระบุกลุ่มวัสดุ"
                                disabled={disabledGroupID}
                                validate={{
                                    required: { value: true },
                                }}
                                className="form-control"
                            >
                                <option value="">- กลุ่มวัสดุ -</option>
                                {
                                    
                                    oMaterial_Group.map((p) => {
                                        return (
                                            <option value={p.sGroupID+""} className="dropdown-item" >{p.sName}</option>
                                        )
                                    })
                                }

                            </AvField>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <b>รหัสประเภทวัสดุ</b> <span className="text-danger">•</span>
                            <AvField
                                type="text"
                                name="sCategoryCode"
                                value={oV_Material_Category.sCategoryCode}
                                maxLength={4}
                                errorMessage="โปรดระบุรหัสประเภทวัสดุ"
                                validate={{
                                    required: { value: true },
                                    minLength: { value: 4, errorMessage: 'รหัสประเภทวัสดุต้องมีขนาด 4 ตัวอักษร' },
                                }}
                                className="form-control"
                                autoComplete="off"
                            ></AvField>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <b>ชื่อประเภทวัสดุ</b> <span className="text-danger">•</span>
                            <AvField
                                type="text"
                                name="sCategoryName"
                                maxLength={50}
                                value={oV_Material_Category.sCategoryName}
                                errorMessage="โปรดระบุชื่อประเภทวัสดุ"
                                validate={{
                                    required: { value: true },
                                }}
                                className="form-control"
                                autoComplete="off"
                            ></AvField>
                        </div>
                    </div>
                    <div className="col-md-auto col-12">
                        <div className="form-group">
                            <b>ลำดับการแสดงผล</b>
                            <AvField
                                name="nOrder"
                                disabled={true}
                                type="text"
                                value={oV_Material_Category.nOrder != 0 ? oV_Material_Category.nOrder : nDefaultnOrder + 1}
                                errorMessage="โปรดระบุลำดับการแสดงผล"
                                validate={{
                                    required: { value: false },
                                }}
                                className="form-control"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <b>รายละเอียด</b>
                            <AvField
                                name="sDetail"
                                value={oV_Material_Category.sDetail}
                                maxLength={2500}
                                type="textarea" rows={4} />
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
                        <a href="admin-parceltype">
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
export default ParcelType_Edit;
