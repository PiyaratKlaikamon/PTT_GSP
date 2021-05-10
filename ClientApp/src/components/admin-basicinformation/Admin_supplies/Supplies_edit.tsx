import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Badge, Button, CustomInput, FormGroup, Input, Label } from 'reactstrap';
import { parse } from "query-string"
import { AvForm, AvField, AvRadioGroup, AvRadio, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import CreateTable, { CellHeader } from '../../Systems/Table';
import Fileuploader, { Extension } from '../../../Fileuploader';
import { BoxMsg, Decrypt, DialogConfirm, Responsestart, Sweetalert } from '../../Systems/SystemComponent';
import { AxiosPostJson } from '../../Service/Config/AxiosMethod';
import InputMask from "inputmask";
import InputFormat from '../../ST_Handlers/InputFormat';

const Controller = 'api/Supplies';
const _SuppliesEdit = (props: any) => {
    const history = useHistory();
    var { nID } = parse(window.location.search);
    nID = Decrypt(nID)
    const [Disabled, setDisabled] = useState(false);
    const [Image, setImage] = useState([] as any);
    const [Picture, setPicture] = useState([] as any);
    const [lstCategory, setlstCategory] = useState([] as any);
    const [lstGroup, setlstGroup] = useState([] as any);
    const [lstUnits, setlstUnits] = useState([] as any);
    const [lstLocation, setlstLocation] = useState([] as any);

    const [IsActive, setIsActive] = useState("0");
    const [nCategoryID, setnCategoryID] = useState("");
    const [nDuplicateDay, setnDuplicateDay] = useState("");
    const [nGroupID, setnGroupID] = useState("");
    const [nLocationID, setnLocationID] = useState("");
    const [nMax, setnMax] = useState("");
    const [nMaxReserve, setnMaxReserve] = useState("");
    const [nMin, setnMin] = useState("");
    const [nPrice, setnPrice] = useState("");
    const [nReOrderPoint, setnReOrderPoint] = useState("");
    const [nUnitID, setnUnitID] = useState("");
    const [sBinLocation, setsBinLocation] = useState("");
    const [sDetail, setsDetail] = useState("");
    const [sDetail_Material, setsDetail_Material] = useState("");
    const [sName, setsName] = useState("");
    const [sMaterialCode, setsMaterialCode] = useState("แสดงเมื่อทำการบันทึกข้อมูลเรียบร้อย");

    const ColoredLine = (color) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 3,
                margin: '5% 0px 3%'
            }}
        />
    );
    useEffect(() => {
        GetDataOnPageLoad();
        onChangeNumber();
    }, []);
    const GetDataOnPageLoad = async () => {
        let result: any = await AxiosPostJson(Controller + "/GetData_Edit?nID=" + nID);
        if (result.data.File.length > 0) {
            setImage(result.data.File)
        }
        if (result.data.lstFile.length > 0) {
            setPicture(result.data.lstFile)
        }
        //setlstCategory(result.data.lstCategory)
        setlstGroup(result.data.lstGroup)
        setlstUnits(result.data.lstUnits)
        setlstLocation(result.data.lstLocation)
        if (result.data.lstMaterials != null) {
            setsMaterialCode(result.data.lstMaterials.sMaterialCode)
            setsName(result.data.lstMaterials.sName)
            setnPrice(result.data.lstMaterials.nPrice)
            setnUnitID(result.data.lstMaterials.nUnitID)
            setnGroupID(result.data.lstMaterials.nGroupID)
            setnCategoryID(result.data.lstMaterials.nCategoryID)
            setnLocationID(result.data.lstMaterials.nLocationID)
            setsBinLocation(result.data.lstMaterials.sBinLocation)
            setnMax(result.data.lstMaterials.nMax)
            setnMin(result.data.lstMaterials.nMin)
            setnReOrderPoint(result.data.lstMaterials.nReOrderPoint)
            setnMaxReserve(result.data.lstMaterials.nMaxReserve)
            setnDuplicateDay(result.data.lstMaterials.nDuplicateDay)
            setsDetail_Material(result.data.lstMaterials.sDetail_Material)
            setsDetail(result.data.lstMaterials.sDetail)
            setIsActive(result.data.lstMaterials.IsActive == true ? "0" : "1")
            setDisabled(true)
        }
    }
    const onInvalidSubmit = (event, errors: [], values) => {
        if (Image.length != 0) {
            if (errors.length == 0) {
                let data = {
                    nMaterialID: nID || 0,
                    sMaterialCode: values.sParcelcode,
                    nGroupID: values.nGroupID + "",
                    nCategoryID: values.nCategoryID + "",
                    sName: values.sParcelname,
                    nUnitID: nUnitID + "",
                    nPrice: values.sPrice,
                    nLocationID: values.nLocationID + "",
                    sBinLocation: values.sCollectparcels,
                    nMin: values.sMinimum,
                    nMax: values.sMaximum,
                    nReOrderPoint: values.sRe_Order,
                    nMaxReserve: values.sDisbursement,
                    nDuplicateDay: values.sDuplication,
                    sDetail_Material: sDetail_Material,
                    sDetail: sDetail,
                    IsActive: values.radioIsActive == "0" ? true : false,
                    file: Image,
                    listfile: Picture,
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
        } else {
            Sweetalert.Warning(BoxMsg.Title_Warning, "กรุณาอัปโหลดรูปหน้าปกของวัสดุ", null);
        }
    };
    //useMemo(async () => {
    //    if (nMin != "" && nMax != "") {
    //        if (parseFloat(nMin) > parseFloat(nMax)) {
    //            setMessage("Maximum Stock ต้องมากกว่า Minimum Stock")
    //        }
    //    }
    //}, [nMax, nMin]);
    const onChangeNumber = () => {
        var sPrice = document.getElementById("sPrice"); // ราคา
        if (sPrice != null) {
            var i = InputFormat.Numeric(sPrice, false, 16, 2);
        }
        var sMinimum = document.getElementById("sMinimum");
        if (sMinimum != null) {
            var i = InputFormat.Numeric(sMinimum, true, 18, 0);
        }

        var sMaximum = document.getElementById("sMaximum");
        if (sMaximum != null) {
            var i = InputFormat.Numeric(sMaximum, true, 18, 0);
        }
        var sRe_Order = document.getElementById("sRe_Order");
        if (sRe_Order != null) {
            var i = InputFormat.Numeric(sRe_Order, true, 18, 0);
        }
        var sDuplication = document.getElementById("sDuplication");
        if (sDuplication != null) {
            var i = InputFormat.Numeric(sDuplication, true, 18, 0);
        }
        var sDisbursement = document.getElementById("sDisbursement");
        if (sDisbursement != null) {
            var i = InputFormat.Numeric(sDisbursement, true, 18, 0);
        }
        var sCollectparcels = document.getElementById("sCollectparcels");
        if (sCollectparcels != null) {
            var i = InputFormat.Custom(sCollectparcels, "**-**-***");
        }
    }
    const Ch_MaximumStock = (value, obj) => {
        let sMessage;
        if (obj.sMaximum != "" && obj.sMaximum != null) {
            if (obj.sMinimum != "" && obj.sMaximum != "") {
                if (parseFloat(obj.sMinimum) > parseFloat(obj.sMaximum)) {
                    sMessage = "Maximum Stock ต้องมากกว่า Minimum Stock";
                } else sMessage = true;
            } else {
                sMessage = true;
            }
            return sMessage;
        } else
            return "โปรดระบุ Maximum Stock";
    }
    const Ch_MinimumStock = (value, obj) => {
        let sMessage;
        if (obj.sMinimum != "" && obj.sMinimum != null) {
            if (obj.sMinimum != "" && obj.sMaximum != "") {
                if (parseFloat(obj.sMinimum) > parseFloat(obj.sMaximum)) {
                    sMessage = " Minimum Stock ต้องน้อยกว่า Maximum Stock ";
                } else sMessage = true;
            } else {
                sMessage = true;
            }
            return sMessage;
        } else
            return "โปรดระบุ Minimum Stock";
    }
    const Ch_ReOrderPoint = (value, obj) => {
        let sMessage;
        if (obj.sRe_Order != "" && obj.sRe_Order != null) {
            if (obj.sMinimum != "" && obj.sMaximum != "") {
                if (parseFloat(obj.sRe_Order) >= parseFloat(obj.sMinimum) && parseFloat(obj.sMaximum) > parseFloat(obj.sRe_Order)) {
                    sMessage = true;
                } else sMessage = "Re-Order Point มากกว่าหรือเท่ากับ Minimum Stock น้อยกว่า Maximum Stock";
            } else {
                sMessage = true;
            }
            return sMessage;
        } else
            return "โปรดระบุ Re-Order Point";
    }
    const Ch_BinLocation = (value, obj) => {
        if (obj.sCollectparcels != "" && obj.sCollectparcels != null) {
            return true;
        } else return "โปรดระบุชั้นเก็บวัสดุ (Bin Number)";
    }
    const LinkToListPage = () => {
        let el = document.getElementById("LinkBackToList") as any
        el && el.click()
    }
    const getLinkTo_Edit = () => {
        let sTypeComponent = `/admin-supplies_list`
        let sPath = `${sTypeComponent}`
        return history.push(sPath);
    }

    const GetnCategory = async (val) => {
        setnGroupID(val);
        let result: any = await AxiosPostJson(Controller + "/GetnCategory?GroupID=" + val);
        setlstCategory(result.data);
    }
    var onUploadFileSuccess = () => {
    }
    return (
        <Fragment>
            <AvForm onSubmit={onInvalidSubmit} >
                <div className="head-title titleSupplies">
                    <b>รายละเอียดวัสดุ</b>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >รหัสวัสดุ </b>
                                <AvInput name="sParcelcode" id="sParcelcodeID" value={sMaterialCode} required maxLength="250" disabled />
                                <AvFeedback>โปรดระบุรหัสวัสดุ</AvFeedback>
                            </AvGroup>
                        </div>
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >กลุ่มวัสดุ <span className="text-danger">•</span></b>
                                <AvInput type="select" name="nGroupID" value={nGroupID} required onChange={e => { GetnCategory(e.target.value) }} disabled={Disabled}>
                                    <option value={""}>- กรุณาเลือก -</option>
                                    {
                                        lstGroup.map((el, indx) => {
                                            return (
                                                <option value={el.nGroupID}>{el.sName}</option>
                                            );
                                        })
                                    }
                                </AvInput>
                                <AvFeedback>โปรดระบุกลุ่มวัสดุ</AvFeedback>
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >ประเภทวัสดุ <span className="text-danger">•</span></b>
                                <AvInput type="select" name="nCategoryID" value={nCategoryID} required onChange={e => { setnCategoryID(e.target.value) }} disabled={Disabled}>
                                    <option value={""}>- กรุณาเลือก -</option>
                                    {
                                        lstCategory.length != 0 && lstCategory.map((el, indx) => {
                                            return (
                                                <option value={el.nCategoryID}>{el.sName}</option>
                                            );
                                        })
                                    }
                                </AvInput>
                                <AvFeedback>โปรดระบุประเภทวัสดุ</AvFeedback>
                            </AvGroup>
                        </div>
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">

                            <AvGroup>
                                <b className="form-check-b" >ชื่อวัสดุ <span className="text-danger">•</span></b>
                                <AvInput name="sParcelname" id="sParcelnameID" value={sName} required maxLength="250" autoComplete="off" />
                                <AvFeedback>โปรดระบุชื่อหน่วยงาน</AvFeedback>
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >หน่วยนับ <span className="text-danger">•</span></b>
                                <AvInput type="select" name="sUnitID" value={nUnitID + ""} required onChange={e => { setnUnitID(e.target.value) }}>
                                    <option value={""}>- กรุณาเลือก -</option>
                                    {
                                        lstUnits.map((el, indx) => {
                                            return (
                                                <option value={el.nUnitID}>{el.sName}</option>
                                            );
                                        })
                                    }
                                </AvInput>
                                <AvFeedback>โปรดระบุหน่วย</AvFeedback>
                            </AvGroup>
                        </div>
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >ราคาต่อชิ้น <span className="text-danger">•</span></b>
                                <AvInput name="sPrice" id="sPrice" type="text" value={nPrice + ""} required maxLength="250" autoComplete="off" onBlur={e => onChangeNumber()} />
                                {/*<CurrencyInput placeholder="$0.00" type="text" />*/}

                                {/*<AvInput autoComplete="off" tag={[Input, InputMask]} name="sPrice"  required />*/}
                                <AvFeedback>โปรดระบุราคา</AvFeedback>
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <div className="head-title titleSupplies">
                    <b>การตั้งค่า</b>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >สถานที่เก็บวัสดุ <span className="text-danger">•</span></b>
                                <AvInput type="select" name="nLocationID" value={nLocationID} required onChange={e => { setnLocationID(e.target.value) }}>
                                    <option value={""}>- กรุณาเลือก -</option>
                                    {
                                        lstLocation.map((el, indx) => {
                                            return (
                                                <option value={el.nLocationID}>{el.sName}</option>
                                            );
                                        })
                                    }
                                </AvInput>
                                <AvFeedback>โปรดระบุสถานที่เก็บวัสดุ</AvFeedback>
                            </AvGroup>
                        </div>
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >ชั้นเก็บวัสดุ (Bin Location) <span className="text-danger">•</span></b>
                                <AvField type="text" name="sCollectparcels" id="sCollectparcels" value={sBinLocation + ""} autoComplete="off"
                                    validate={{
                                        required: Ch_BinLocation,
                                        maxLength: { value: 9 }
                                    }}
                                />
                                {/*<AvInput autoComplete="off" maxLength={20} type="text" tag={[Input, InputMask]} name="sCollectparcels" value={sBinLocation + ""} required />*/}
                                <AvFeedback>โปรดระบุ ชั้นเก็บวัสดุ</AvFeedback>
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >Minimum Stock <span className="text-danger">•</span></b>
                                <AvField name="sMinimum" autoComplete="off" id="sMinimum" type="text" maxLength="250" value={nMin + ""} onBlur={e => { setnMin(e.target.value); onChangeNumber() }}
                                    validate={{
                                        required: Ch_MinimumStock
                                    }} />

                            </AvGroup>
                        </div>
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >Maximum Stock <span className="text-danger" >•</span></b>
                                <AvField name="sMaximum" autoComplete="off" id="sMaximum" type="text" maxLength="250" value={nMax + ""} onBlur={e => { setnMax(e.target.value); onChangeNumber() }}
                                    validate={{
                                        required: Ch_MaximumStock
                                    }} />
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >Re-Order Point <span className="text-danger">•</span></b>
                                <AvField name="sRe_Order" autoComplete="off" id="sRe_Order" type="text" maxLength="250" value={nReOrderPoint + ""} onBlur={e => { onChangeNumber(); setnReOrderPoint(e.target.value) }}
                                    validate={{
                                        required: Ch_ReOrderPoint
                                    }} />
                            </AvGroup>
                        </div>
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >กำหนดจำนวนการเบิก <span className="text-danger">•</span></b>
                                <AvInput name="sDisbursement" autoComplete="off" id="sDisbursement" required maxLength="250" value={nMaxReserve + ""} onBlur={e => onChangeNumber()} />
                                <AvFeedback>โปรดกำหนดจำนวนการเบิก</AvFeedback>
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >จำนวนการเบิกซ้ำ (วัน) <span className="text-danger">•</span></b>
                                <AvInput name="sDuplication" autoComplete="off" id="sDuplication" type="text" required maxLength="250" value={nDuplicateDay + ""} onBlur={e => onChangeNumber()} />
                                <AvFeedback>โปรดระบุจำนวนการเบิกซ้ำ (วัน)</AvFeedback>
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <div className="head-title titleSupplies">
                    <b>รูปภาพ</b>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6" style={{ zIndex: 0 }} >
                            <b>รูปหน้าปก </b><span className="text-danger">•</span>
                            <Fileuploader
                                limit="1"
                                setFileList={setImage}
                                fileList={Image}
                                onComplete={onUploadFileSuccess}
                                onRemoveComplete={onUploadFileSuccess}
                                fileMaxSize="10"
                                extensions={Extension.Image} />
                        </div>
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6" style={{ zIndex: 0 }} >
                            <b>รูปภาพ </b>
                            <FormGroup>
                                <Fileuploader
                                    limit="5"
                                    setFileList={setPicture}
                                    fileList={Picture}
                                    onComplete={onUploadFileSuccess}
                                    onRemoveComplete={onUploadFileSuccess}
                                    fileMaxSize="10"
                                    extensions={Extension.Image} />
                            </FormGroup>
                        </div>
                    </div>
                </div>
                <div className="head-title titleSupplies">
                    <b>รายละเอียดอื่นๆ</b>
                </div>
                <div className="form-group">
                    <div className="form-row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-12">
                            <b>รายละเอียดวัสดุ </b><small>(ยี่ห้อ/รุ่น/ขนาด)</small>{/*สีเงิน*/}
                            {/*<textarea className="form-control" name="cDescription" id="validationTextarea" rows={4} defaultValue={cDescription} onBlur={v => setDescription(v.target.value)}></textarea>*/}
                            <textarea className="form-control" name="Materialdetails" id="Materialdetails" rows={4} defaultValue={sDetail} onBlur={e => { setsDetail(e.target.value) }}></textarea>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-12">
                            <b>รายละเอียดเพิ่มเติม</b>
                            {/*<textarea className="form-control" name="cDescription" id="validationTextarea" rows={4} defaultValue={cDescription} onBlur={v => setDescription(v.target.value)}></textarea>*/}
                            <textarea className="form-control" name="Moredetails" id="Moredetails" rows={4} defaultValue={sDetail_Material} onBlur={e => { setsDetail_Material(e.target.value) }}></textarea>
                        </div>
                    </div>
                </div>
                <div className="head-title titleSupplies">
                    <b>กำหนดสถานะ</b>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b>สถานะ</b>
                                <AvRadioGroup inline name="radioIsActive" required value={IsActive}>
                                    <AvRadio label="ใช้งาน" value="0" />
                                    <AvRadio label="ไม่ใช้งาน" value="1" />
                                </AvRadioGroup>
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <ColoredLine color="#2196f3" />
                <div className="form-row justify-content-between">
                    <div className="form-row justify-content-start">
                        <div className="col-auto">
                            <div className="form-group">
                                <button type="button" className="btn btn-secondary" onClick={() => getLinkTo_Edit()}>
                                    <i className="fas fa-arrow-left"></i> ย้อนกลับ</button>
                            </div>
                        </div>
                    </div>
                    <div className="form-row justify-content-end">
                        <div className="col-auto">
                            <div className="form-group">
                                <FormGroup>
                                    <Button className="btn btn-primary"><i className="fas fa-save"></i> บันทึก</Button>
                                </FormGroup>

                                <Link id={"LinkBackToList"} to="/admin-supplies_list" hidden ></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </AvForm>
        </Fragment >
    );
};
export default _SuppliesEdit;

