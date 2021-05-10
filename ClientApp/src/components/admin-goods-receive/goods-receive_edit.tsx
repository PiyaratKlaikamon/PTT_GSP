import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Collapse, FormGroup, Input } from 'reactstrap';
import { parse } from "query-string"
import "./goods-receive_edit.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AvForm, AvField, AvRadioGroup, AvRadio, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Typeahead } from 'react-bootstrap-typeahead'
import { AxiosGetJson, AxiosPostJson } from '../Service/Config/AxiosMethod';
import { BoxMsg, Decrypt, DialogConfirm, DialogDelete, Responsestart, Sweetalert, TooltipsMSG } from '../Systems/SystemComponent';
import Fileuploader, { Extension } from '../../Fileuploader';
import CreateTable, { CellHeader } from '../Systems/Table';
import { List as LINQ } from 'linqts';
import InputFormat from '../ST_Handlers/InputFormat';
import ThaiDatePicker from '../ST_Handlers/ThaiDatePicker';

const Controller = 'api/Good_Receive';
const Goods_receive_edit = (props) => {
    var { nID } = parse(window.location.search);
    nID = Decrypt(nID)
    const [RowSelected, setRowSelected] = useState([] as any);
    const [lstMaterial, setMaterial] = useState([] as any);
    const [lstVendor, setVendor] = useState([] as any);
    const [dDocDate, setdDocDate] = useState<Date | undefined>(undefined);
    const [dReceiveDate, setdReceiveDate] = useState<Date | undefined>(undefined);
    const [nSourceID, setnSourceID] = useState("");
    const [nVendorID, setnVendorID] = useState("");
    const [sRefNo, setsRefNo] = useState("");
    const [sNote, setsNote] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [lst_Materials, setlst_Materials] = useState([] as any);
    const [DisabledTypeahead, setDisabledTypeahead] = useState(true);
    const [sSaveMode, setSaveMode] = useState("");

    const [nIdEdit, setIdEdit] = useState(0);
    const [optState, setoptState] = useState([] as any);
    const [File, setFile] = useState([] as any);
    const [nPrice, setnPrice] = useState("");
    const [nNumber, setnNumber] = useState("");

    var onUploadFileSuccess = () => { }
    const ColoredLine = (color: any) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 3,
                margin: '5% 0px 3%'
            }}
        />
    );
    const toggle = (i: string) => {
        if (i = "close") {
            setIsOpen(false)
        }
    }
    const [lstData, setlstData] = useState([
        {
            value: "",
            label: "",
            sMaterialCode: "",
            nMaterialID: "",
            MaterialCode: "",
            MaterialName: "",
            sUnitName: "",
            nPrice: "",
            nUnitID: ""
        }
    ]);

    const Edit = async (o: any, i: any) => {
        setIsOpen(true)
        setIdEdit(i)
        setlstData([{
            ...lstData, value: "", label: o.sMaterialCode + " - " + o.sMaterialName, MaterialCode: "0", sUnitName: "", MaterialName: "",
            nMaterialID: "", nPrice: o.nPriceperpiece, nUnitID: "", sMaterialCode: ""
        }])
        setnPrice(o.nPriceperpiece)
        setnNumber(o.nNumber)
        setSaveMode("แก้ไขรายการ")
    };
    const onDeleteData = (id: number) => {
        DialogDelete(async () => {
            let array = [...lst_Materials]; // make a separate copy of the array
            if (id !== -1) {
                array.splice(id, 1);
                setlst_Materials(array)
            }
            Sweetalert.Success(BoxMsg.Title_Confirm, BoxMsg.Desc_Success_Delete, null);
        })
    };
    const Add = async () => {
        setIsOpen(true)
        setSaveMode("เพิ่มรายการ")
    };
    const onClickHeadCB = (e, currentData) => {
        let el = e.target;
        let dataSelect = el.checked
            ? currentData === null
                ? []
                : currentData.map((x) => x.nMaterialID)
            : [];
        setRowSelected(dataSelect);
    };
    const CreateData = (obj, inx) => {
        return (
            <React.Fragment key={inx}>
                <tr >
                    <td className="align-middle text-center">
                        <Button size="sm" type="button" color="info" id={"Edit_" + inx} onClick={() => Edit(obj, inx)}>
                            <FontAwesomeIcon icon={["fas", "pencil-alt"]} />
                        </Button>
                    </td>
                    <td className="align-middle text-center">
                        <Button
                            size="sm"
                            type="button"
                            color="danger"
                            style={{ width: "32px" }}
                            onClick={() => onDeleteData(inx)}
                        >
                            <FontAwesomeIcon icon={["fas", "times"]} />
                        </Button>
                    </td>

                    <td className="align-middle text-center">{inx + 1}</td>
                    <td className="align-middle text-center">{obj.sMaterialCode}</td>
                    <td className="align-middle">{obj.sMaterialName}</td>
                    <td className="align-middle text-center">{obj.nPriceperpiece} </td>
                    <td className="align-middle text-center">{obj.nNumber}</td>
                    <td className="align-middle text-center">{obj.sUnitName}</td>
                    <td className="align-middle text-center">{obj.nSum}</td>
                </tr>

            </React.Fragment>
        );
    };
    const header: CellHeader[] = [
        {
            Sortby: "", SortType: false, label: (<Button size="sm" color="primary" type="button" id={"Add"} data-tip={TooltipsMSG.Add} onClick={() => Add()} > <FontAwesomeIcon icon={["fas", "plus"]} /> </Button>),

            CSSStyle: { width: 1 },

        }, { Sortby: "", SortType: false, label: "", ClassName: "align-middle text-center", CSSStyle: { width: 1 }, },
        { label: "ที่", Sortby: "", SortType: false, ClassName: "align-middle text-center" },
        { label: "รหัสวัสดุ", Sortby: "", SortType: false, ClassName: "align-middle text-center" },
        { label: "ชื่อวัสดุ", Sortby: "", SortType: false, ClassName: "align-middle" },
        { label: "ราคาต่อชิ้น", Sortby: "", SortType: false, ClassName: "align-middle text-center" },
        { label: "จำนวน", Sortby: "", SortType: false, ClassName: "align-middle text-center" },
        { label: "หน่วยนับ", Sortby: "", SortType: false, ClassName: "align-middle text-center" },
        { label: "ราคารวม", Sortby: "", SortType: false, ClassName: "align-middle text-center" },
    ];

    const LinkToListPage = () => {
        let el = document.getElementById("LinkBackToList") as any
        el && el.click()
    }
    useEffect(() => {
        GetDataOnPageLoad();
        onChangeNumber();
    }, []);

    const GetDataOnPageLoad = async () => {
        let result: any = await AxiosPostJson(Controller + "/GetData_Edit?nID=" + nID);
        let AutoCom: any = await AxiosGetJson(Controller + '/SetVauleAutoCompleted');
        setoptState(AutoCom)
        setlst_Materials(result.data.sub_Table)

        if (result.data.File.length > 0) {
            setFile(result.data.File)
        }
        setMaterial(result.data.Materialsource)
        setVendor(result.data.Vendor)
        if (result.data.lst != null) {

            setdDocDate(new Date(result.data.lst.dDocDate))
            setdReceiveDate(new Date(result.data.lst.dReceiveDate))

            setnSourceID(result.data.lst.nSourceID)
            setnVendorID(result.data.lst.nVendorID)
            setsRefNo(result.data.lst.sRefNo)
            setsNote(result.data.lst.sNote)
            console.log("new Date(result.data.lst.dDocDate)", new Date(result.data.lst.dDocDate))
            console.log("new Date()", new Date())

        }
    }
    useMemo(() => {
        setdReceiveDate(dReceiveDate);
    }, [dReceiveDate]);
    const onSubMaterial_list = (event, errors: [], values) => {
        console.log("lstData", lstData)
        if (lstData[0].sMaterialCode != "" && lstData[0].MaterialCode != "") {
            let listname = lstData[0].label.split(' ');
            if (listname.length != 1) {
                if (errors.length == 0) {
                    DialogConfirm(async () => {
                        let s = [...lst_Materials]
                        s.push({
                            nMaterialID: lstData[0].nMaterialID,
                            sMaterialCode: listname[0],
                            sMaterialName: lstData[0].MaterialName,
                            nPrice: lstData[0].nPrice,
                            sUnitName: lstData[0].sUnitName,
                            nUnitID: lstData[0].nUnitID,
                            nNumber: values.nNumber,
                            nPriceperpiece: values.nPriceperpiece,
                            nSum: parseFloat(values.nNumber) * parseFloat(values.nPriceperpiece)
                        })
                        setlst_Materials(s)
                        setIsOpen(false)
                        Sweetalert.Success(BoxMsg.Desc_Success_Save, BoxMsg.Desc_Success_Save, null);
                    }, null, BoxMsg.Title_Confirm, "ท่านต้องการเพิ่มรายการนี้หรือไม่ ?")
                }
            }
        } else {

        }
    }
    const Editdata = (i: any) => {
        setlstData(i)
    }
    const onChangeNumber = () => {
        var nNumber = document.getElementById("nNumber");
        if (nNumber != null) {
            var i = InputFormat.Numeric(nNumber, false, 16, 2);
        }
        var nPriceperpiece = document.getElementById("nPriceperpiece");
        if (nPriceperpiece != null) {
            var i = InputFormat.Numeric(nPriceperpiece, false, 18, 0);
        }
    }

    const onInvalidSubmit = (event, errors: [], values) => {
        if (errors.length == 0) {
            let data = {
                sSourceID: values.sSourceID,
                sRefNo: values.sRefNo,
                sDocDate: values.sDocDate,
                sReceiveDate: values.sReceiveDate,
                sVendorID: values.sVendorID,
                sNote: values.sNote,
                file: File,
                sub_TB: lst_Materials,
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
    const createFooterRow = (obj) => {
        let nSum = new LINQ<any>(obj).Select(s => s.nSum).Sum();
        return (
            lst_Materials.length != 0 &&
            <tfoot>
                <tr className="bg-light" >
                    <td colSpan={8} className="text-center">ราคารวม</td>
                    <td className="text-center"> <b>{nSum +" บาท"}</b></td>
                </tr>
            </tfoot>
        )
    }
    const Sub_Collapse = () => {
        return (
            <Fragment>

                <Collapse isOpen={isOpen}>
                    <AvForm onSubmit={onSubMaterial_list} id="t1">
                        <div className="card">
                            <div className="card-body">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                                            <b className="form-check-b" >รหัส / ชื่อวัสดุ <span className="text-danger">•</span></b>
                                            <div className="input-group">
                                                <Typeahead
                                                    filterBy={['MaterialCode']}
                                                    id="autoCompletedID"
                                                    options={optState.filter(o => lst_Materials.every(m => m.nMaterialID != o.nMaterialID))}
                                                    placeholder="ค้นหาด้วย รหัส,ชื่อวัสดุ"
                                                    name="Sert"
                                                    onChange={e => { Editdata(e) }}
                                                    minLength={0}
                                                    selected={lstData}
                                                    defaultSelected={optState.slice(0, 1)}
                                                    onInputChange={e => { }} />
                                                <div className="input-group-append">
                                                    <span className="input-group-text" id="basic-addon2"><i className="fas fa-search"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                                            <AvGroup>
                                                <b className="form-check-b" >ราคาต่อชิ้น  <span className="text-danger">•</span></b>
                                                <AvInput type="text" name="nPriceperpiece" value={nPrice} required className="form-control" autoComplete="off" onBlur={e => onChangeNumber()}></AvInput >
                                                <AvFeedback>โปรดระบุราคาต่อชิ้น</AvFeedback>
                                            </AvGroup>
                                          
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                                            <AvGroup>
                                                <b className="form-check-b" >จำนวน <span className="text-danger">•</span></b>
                                                <AvInput type="text" id="nNumber" name="nNumber" value={nNumber} required className="form-control" autoComplete="off" onBlur={e => onChangeNumber()}></AvInput >
                                                <AvFeedback>โปรดระบุจำนวน</AvFeedback>
                                            </AvGroup>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="form-row">
                                    <div className="col-auto">
                                        <div className="form-group">
                                            {/*<button type="submit" className="btn btn-dark btn-sm" > <i className="fas fa-upload"></i> {sSaveMode} </button>*/}
                                            <Button id="t1" className="btn btn-dark btn-sm"><i className="fas fa-upload"></i> {sSaveMode}</Button>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <div className="form-group">
                                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => toggle("Close")} > <i className="fas fa-times"></i> ยกเลิก </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AvForm>
                </Collapse>
                <div className="row mt-1">
                    <CreateTable
                        Header={header}
                        ItemData={lst_Materials}
                        CreateDataRow={CreateData}
                        onClickHeadCB={onClickHeadCB}
                        rowSelected={RowSelected}
                        createFooterRow={() => createFooterRow(lst_Materials)}
                    />
                </div>
            </Fragment>
        );
    }
    return (
        <Fragment>
            <AvForm name="gggg" onSubmit={onInvalidSubmit} >
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >แหล่งที่มาของวัสดุ <span className="text-danger">•</span></b>
                                <AvInput type="select" name="sSourceID" value={nSourceID + ""} required >
                                    <option value={""}>- กรุณาเลือก -</option>
                                    {
                                        lstMaterial.map((el, indx) => {
                                            return (
                                                <option value={el.nSubID}>{el.sName}</option>
                                            );
                                        })
                                    }
                                </AvInput>
                                <AvFeedback>โปรดระบุแหล่งที่มาของวัสดุ</AvFeedback>
                            </AvGroup>
                        </div>
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >เลขที่อ้างอิง (Reference No.) <span className="text-danger">•</span></b>
                                <AvInput name="sRefNo" value={sRefNo + ""} required />
                                <AvFeedback>โปรดระบุเลขที่อ้างอิง (Reference No.)</AvFeedback>
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >วันที่เอกสาร <span className="text-danger">•</span></b>
                                <AvField name="sDocDate" type="date" tag={[Input, ThaiDatePicker]} value={dDocDate} required errorMessage="โปรดระบุ วันที่เอกสาร" />
                                {/*<ThaiDatePicker value={dDocDate} onChange={e => setdDocDate(e)} />*/}
                            </AvGroup>
                        </div>
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >วันที่รับวัสดุ <span className="text-danger">•</span></b>
                                <AvField name="sReceiveDate" type="date" tag={[Input, ThaiDatePicker]} value={dReceiveDate} required errorMessage="โปรดระบุ วันที่รับวัสดุ" />
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >ผู้ขาย <span className="text-danger">•</span></b>
                                <AvInput type="select" name="sVendorID" value={nVendorID + ""} required >
                                    <option value={""}>- กรุณาเลือก -</option>
                                    {
                                        lstVendor.map((el, indx) => {
                                            return (
                                                <option value={el.nVendorID}>{el.sCompanyName}</option>
                                            );
                                        })
                                    }
                                </AvInput>
                                <AvFeedback>โปรดระบุวันที่เอกสาร</AvFeedback>
                            </AvGroup>
                        </div>
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <b>แนบไฟล์ </b>
                            <Fileuploader
                                limit="5"
                                setFileList={setFile}
                                fileList={File}
                                onComplete={onUploadFileSuccess}
                                onRemoveComplete={onUploadFileSuccess}
                                fileMaxSize="10"
                                extensions={Extension.Document} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >หมายเหตุ</b>
                                <AvField name="sNote" value={sNote + ""} />
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <b>รายการวัสดุ</b> <span className="text-danger">•</span>
                {
                    Sub_Collapse()
                }
                <ColoredLine color="#2196f3" />
                <div className="form-row justify-content-between">
                    <div className="form-row justify-content-start">
                        <div className="col-auto">
                            <div className="form-group">
                                <button type="button" className="btn btn-secondary" onClick={() => LinkToListPage()}>
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
                                <Link id={"LinkBackToList"} to="/admin-Goods-Receive_list" hidden ></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </AvForm>
        </Fragment >
    );
};
export default Goods_receive_edit;

