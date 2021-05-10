import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, CardBody, Collapse, CustomInput, FormGroup, Input } from "reactstrap";
import { AxiosPostJson } from "../Service/Config/AxiosMethod";
import { AvForm, AvField, AvInput } from "availity-reactstrap-validation";
import CreateTable, { CellHeader } from "../Systems/Table";
import { Typeahead } from 'react-bootstrap-typeahead'
import "./style.css";
import ThaiDatePicker from "../ST_Handlers/ThaiDatePicker";
import InputFormat from "../ST_Handlers/InputFormat";
import { List as LINQ } from 'linqts';
import { count } from "console";
import { BoxMsg, DialogConfirm, Responsestart, Sweetalert } from "../Systems/SystemComponent";

const Controller = 'api/RequestApproval';
const RequestApproval = () => {
    const [lstStep, setStep] = React.useState([] as any);
    const [lstReason, setReason] = React.useState([] as any);
    const [sEmployeeID, setsEmployeeID] = useState("");
    const [rowSelected, setRowSelected] = React.useState([] as any);
    const [rowSelected_sub, setRowSelected_sub] = React.useState([] as any);

    const [ApproveName, setBTApprove] = useState("");
    const [rejectName, setBTreject] = useState("");
    const [cancelName, setBTcancel] = useState("");


    const header: CellHeader[] = [
        { label: "", Sortby: "", SortType: false, ClassName: "align-middle text-center", CSSStyle: { width: 1 }, },
        { label: "", Sortby: "", SortType: false, ClassName: "align-middle text-center", CSSStyle: { width: 1 }, },
        { label: "เลขที่ใบขอเบิก", Sortby: "", SortType: false, ClassName: "align-middle text-center text-nowrap", CSSStyle: { width: 110 }, },
        { label: "ชื่อผู้ขอเบิก", Sortby: "", SortType: false, ClassName: "align-middle text-center", },
        { label: "เหตุผลการเบิก", Sortby: "", SortType: false, ClassName: "align-middle text-center", },
        { label: "จำนวนเงิน", Sortby: "", SortType: false, ClassName: "align-middle text-right", },
        { label: "วันที่เบิก", Sortby: "", SortType: false, ClassName: "align-middle text-center", },
        { label: "หมายเหตุ/เหตุผล", Sortby: "", SortType: false, ClassName: "align-middle text-center", },
    ];
    const subheader: CellHeader[] = [
        { label: "", Sortby: "", SortType: false, ClassName: "align-middle text-center text-nowrap", CSSStyle: { width: 1 } },
        { label: "ที่", Sortby: "", SortType: false, ClassName: "align-middle text-center text-nowrap", CSSStyle: { width: 1 } },
        { label: "รหัสวัสดุ", Sortby: "", SortType: false, ClassName: "align-middle text-center", },
        { label: "ชื่อวัสดุ", Sortby: "", SortType: false, ClassName: "align-middle text-center", },
        { label: "จำนวนขอเบิก", Sortby: "", SortType: false, ClassName: "align-middle text-right", },
        { label: "จำนวนอนุมัติ", Sortby: "", SortType: false, ClassName: "align-middle text-center", CSSStyle: { width: "20%" } },
        { label: "หน่วยนับ", Sortby: "", SortType: false, ClassName: "align-middle text-center", },
        { label: "ราคารวม", Sortby: "", SortType: false, ClassName: "align-middle text-right", },
        { label: "หมายเหตุ/เหตุผล", Sortby: "", SortType: false, ClassName: "align-middle text-center", },
    ];
    const toggle = (i) => {
        const newCollapse = collapses.slice();
        newCollapse[i] = !newCollapse[i];
        setCollapse(newCollapse);
    };
    const [lstData_H, setlstData] = useState([] as any);
    const [collapses, setCollapse] = useState(Array(lstData_H.length).fill(false));
    useEffect(() => {
        GetDataOnPageLoad();
    }, []);
    const GetDataOnPageLoad = async () => {
        let result: any = await AxiosPostJson(Controller + "/GetData_List");
        console.log("result", result)
        setlstData(result.data.RequestApproval_H);
        setBTApprove(result.data.ApproveName)
        setBTreject(result.data.rejectName)
        setBTcancel(result.data.cancelName)
    }

    const onDeleteClick = () => {

        //var qCheckApp = new LINQ<any>(lstData_H).Where(w => rowSelected.indexOf(w.nRequestID) > -1).ToArray();
        //console.log("qCheckApp", qCheckApp)
        //var Alllist: any = [...lstData_H];
        //qCheckApp.forEach(element => {
        //    let nIndxItem = Alllist.findIndex(
        //        (fi) => fi.nID === element.nID
        //    );
        //    if (nIndxItem != -1) {
        //        if (element.sReason1 === "") {
        //            Alllist[nIndxItem].sAlert = "alert-danger";
        //        } else {
        //            Alllist[nIndxItem].sAlert = "";
        //        }
        //    }
        //})
    };

    const onSelectedRow = (id) => {
        setRowSelected([rowSelected, id])
    }
    const onDeSelectedRow = (id) => {
        let index = rowSelected.indexOf(id)
        if (index !== -1) {
            rowSelected.splice(index, 1);
            setRowSelected([rowSelected]);
        }
    }

    const onSelectedRow_sub = (id) => {
        setRowSelected_sub([...rowSelected_sub, id])
    }
    const onDeSelectedRow_sub = (id) => {
        let index = rowSelected_sub.indexOf(id)
        if (index !== -1) {
            rowSelected_sub.splice(index, 1);
            setRowSelected_sub([...rowSelected_sub]);
        }
    }
    const CreateDataRow = (obj, inx) => {
        return (
            <Fragment>
                <tr key={inx} className={obj.sAlert === "" ? "" : obj.sAlert}>
                    {
                        <td className="align-middle text-center"><CustomInput type="checkbox" id={`body_${obj.nRequestID}`} label={''}
                            onChange={(e: any) => {
                                let el = e.target;
                                if (el.checked) {
                                    let dataSelect = obj.sub_List.map(y => y.nID);
                                    setRowSelected_sub(dataSelect);
                                    onSelectedRow(obj.nRequestID);
                                    lstData_H.forEach(element => {
                                        if (element.nRequestID == obj.nRequestID) {
                                            const IsNote = document.querySelector(`#sNote_${element.nRequestID}`)
                                            if (IsNote) { IsNote.removeAttribute("Disabled") }
                                            element.sub_List.forEach(val => {
                                                const IsLimite = document.querySelector(`#nLimitednumber_${val.nID}`)
                                                if (IsLimite) {
                                                    IsLimite.removeAttribute("Disabled");
                                                }
                                            })
                                        } else {
                                            const IsNote = document.querySelector(`#sNote_${element.nRequestID}`)
                                            if (IsNote) { IsNote.setAttribute("Disabled", ""); }
                                            element.sub_List.forEach(val => {
                                                const IsLimite = document.querySelector(`#nLimitednumber_${val.nID}`)
                                                if (IsLimite) { IsLimite.setAttribute("Disabled", ""); }
                                            })
                                        }
                                    })
                                } else {
                                    setRowSelected_sub([]);
                                    onDeSelectedRow(obj.nRequestID);
                                    const IsNote = document.querySelector(`#sNote_${obj.nRequestID}`)
                                    if (IsNote) {
                                        IsNote.setAttribute("Disabled", "");
                                    }
                                    const IsLimite = document.querySelector(`#nLimitednumber_${obj.nID}`)
                                    if (IsLimite) {
                                        IsLimite.setAttribute("Disabled", "");
                                    }
                                    lstData_H.forEach(element => {
                                        const IsNote = document.querySelector(`#sNote_${element.nRequestID}`)
                                        if (IsNote) { IsNote.setAttribute("Disabled", ""); }
                                        element.sub_List.forEach(val => {
                                            const IsLimite = document.querySelector(`#nLimitednumber_${val.nID}`)
                                            if (IsLimite) { IsLimite.setAttribute("Disabled", ""); }
                                        })
                                    })
                                }
                            }}
                            checked={rowSelected.indexOf(obj.nRequestID) !== -1}
                        /></td>
                    }
                    <td className="align-middle text-center">
                        <Button size="sm" type="button" color="link" onClick={() => toggle(inx)} > <FontAwesomeIcon icon={["far", "plus-square"]} /> </Button>
                    </td>
                    <td className="align-middle text-center">{obj.sRequestNo}</td>
                    <td className="align-middle text-center">{obj.sFullName}</td>
                    <td className="align-middle text-center">{obj.sReasonName}</td>
                    <td className="align-middle text-right">{obj.nRequest_TotalPrice}</td>
                    <td className="align-middle text-center">{obj.dCreate}</td>
                    <td className="align-middle text-center">
                        <input className="form-control form-control-sm " maxLength={250} name={"sNote_" + obj.nRequestID} id={"sNote_" + obj.nRequestID} disabled placeholder="กรณี ส่งกลับแก้ไข/ยกเลิก"
                            onBlur={(e) => {
                                obj.sNote = e.target.value;
                            }} /></td>
                </tr>
                <tr>
                    <td colSpan={10} className="p-0">
                        <Collapse isOpen={collapses[inx]} key={inx}>
                            <Card className="border-0">
                                <CardBody style={{ backgroundColor: "#ecf4ff" }}>
                                    <div>
                                        <CreateTable
                                            Header={subheader}
                                            defaultFontSize={true}
                                            ItemData={obj.sub_List}
                                            CreateDataRow={SubCreateDataRow}
                                            createFooterRow={() => createFooterRow(obj.sub_List)} />
                                    </div>
                                </CardBody>
                            </Card>
                        </Collapse>
                    </td>
                </tr>
            </Fragment>
        );
    };
    const SubCreateDataRow = (obj, Subindex) => {
        let nLimitednumber = document.getElementById("nLimitednumber_" + obj.nID); // ราคา
        if (nLimitednumber != null) {
            InputFormat.Numeric(nLimitednumber, false, 16, 0, 0, obj.nRequest_Amount);
        }
        return (
            <tr key={Subindex}>
                {
                    <td className="align-middle text-center"><CustomInput type="checkbox" id={`body_${obj.nID}`} label={''}
                        onChange={(e: any) => {
                            let el = e.target
                            if (el.checked) {
                                onSelectedRow_sub(obj.nID);
                                obj.IsApprove = true;
                                const IsNote = document.querySelector(`#sNotesub_${obj.nMaterialID}`)
                                if (IsNote) {
                                    IsNote.setAttribute("Disabled", "");
                                }
                            } else {
                                onDeSelectedRow_sub(obj.nID);
                                obj.IsApprove = false;
                                const IsNote = document.querySelector(`#sNotesub_${obj.nMaterialID}`)
                                if (IsNote) {
                                    IsNote.removeAttribute("Disabled")
                                }
                            }
                        }}
                        checked={rowSelected_sub.indexOf(obj.nID) !== -1}
                    /></td>
                }
                <td className="align-middle text-center">{Subindex + 1 + "."}</td>
                <td className="align-middle text-center">{obj.sMaterialCode}</td>
                <td className="align-middle text-center">{obj.sMaterialName}</td>
                <td className="align-middle text-right">{obj.nRequest_Amount}</td>
                <td className="align-middle text-center">
                    <input className="form-control form-control-sm" defaultValue={obj.nPay_Amount} maxLength={250} name="nLimitednumber" id={"nLimitednumber_" + obj.nID} disabled placeholder="โปรดระบุจำนวนอนุมัติ"
                        onBlur={(e) => {
                            if (e.target.value != "") {
                                var Alllist: any = lstData_H;
                                let lstval = new LINQ<any>(Alllist).FirstOrDefault(w => w.nRequestID == obj.nRequestID);
                                lstval.sub_List.forEach(val => {
                                    if (parseInt(e.target.value) != val.nPay_Amount) {
                                        const IsNote = document.querySelector(`#sNotesub_${obj.nMaterialID}`)
                                        if (IsNote) {
                                            IsNote.removeAttribute("Disabled");
                                        }
                                    } else {
                                        const IsNote = document.querySelector(`#sNotesub_${obj.nMaterialID}`)
                                        if (IsNote) {
                                            IsNote.setAttribute("Disabled", "");
                                        }
                                    }
                                })
                                obj.nPay_Amount = e.target.value;
                                if (e.target.value != "") obj.nPay_TotalPrice = parseFloat(e.target.value) * obj.nPrice;
                                else obj.nPay_TotalPrice = 0;
                                setlstData([...lstData_H])
                            }
                        }} />
                </td>
                <td className="align-middle text-center">{obj.sUnitName}</td>
                <td className="align-middle text-right">{obj.nPay_TotalPrice}</td>
                <td className="align-middle text-center">
                    <input className="form-control form-control-sm" maxLength={250} name={"sNotesub_" + obj.nMaterialID} id={"sNotesub_" + obj.nMaterialID} disabled placeholder="ระบุเหตุผลกรณี ปรับลดจำนวน"
                        onBlur={(e) => {
                            obj.sNote = e.target.value;
                        }} />
                </td>
            </tr>
        );
        //return (
        //    <tr key={Subindex}>
        //        <td className="align-middle text-center">{Subindex + 1 + "."}</td>
        //        <td className="align-middle text-center">{obj.sMaterialCode}</td>
        //        <td className="align-middle text-center">{obj.sMaterialName}</td>
        //        <td className="align-middle text-right">{obj.nRequest_Amount}</td>
        //        <td className="align-middle text-center">{obj.sUnitName}</td>
        //        <td className="align-middle text-right">{obj.nPay_TotalPrice}</td>
        //    </tr>
        //);
    };
    const createFooterRow = (obj) => {
        let nSum = new LINQ<any>(obj).Select(s => s.nPay_TotalPrice).Sum();
        return (
            lstData_H.length != 0 &&
            <tfoot>
                <tr className="bg-light" >
                    <td colSpan={7} className="text-center">ราคารวม</td>
                    <td className="text-right"> <b>{nSum}</b></td>
                    <td className="text-left"> <b>บาท</b></td>
                </tr>
            </tfoot>
        )
    }
    const SearchData = async (event, errors: [], values) => {
        if (errors.length == 0) {
            let data = {
                sReasonID: values.ReasonID,
                sStepID: values.StepID,
                sOrgID: values.sOrgID,
                sRequestNo: values.sRequestNo,
                sEmployeeID: sEmployeeID,
            }
            let result: any = await AxiosPostJson(Controller + "/GetData_List", data);
            setlstData(result.data.RequestApproval_H);
        }
    };
    const onClickHeadCB = (e: any, currentData: any) => { };
    const OnAction = async (ActionID) => { //2 = อนุมัติ, 5 = ส่งกลับแก้ไข, 6 = ยกเลิก
        let sWarning = "โปรดเลือกรายการที่ท่านต้องการ";
        if (rowSelected.length > 1) {
            let qCheckApp = new LINQ<any>(lstData_H).Where(w => rowSelected.indexOf(w.nRequestID) > -1).ToArray();
            let IsPass = true;
            if (ActionID === 5 || ActionID === 6) {
                var Alllist: any = [...lstData_H];
                qCheckApp.forEach(element => {
                    let nIndxItem = Alllist.findIndex((fi) => fi.nRequestID === element.nRequestID);
                    if (nIndxItem != -1) {
                        console.log("element", element)
                        if (element.sNote === null || element.sNote === "") {
                            IsPass = false;
                            Alllist[nIndxItem].sAlert = "alert-danger";
                        } else {
                            Alllist[nIndxItem].sAlert = "";
                        }
                    }
                })
                setlstData([...Alllist])
            }

            if (IsPass) {
                var data = {
                    lst: qCheckApp,
                    nActionID: ActionID,
                };
                DialogConfirm(async () => {
                    let result: any = await AxiosPostJson(Controller + "/Savedata", data);
                    if (result.data === Responsestart.success) {
                        Sweetalert.Success(BoxMsg.Title_Success, BoxMsg.Desc_Success_Save, null);
                        GetDataOnPageLoad();
                    } else if (result.data === Responsestart.warning) {
                        Sweetalert.Warning(BoxMsg.Title_Warning, "ข้อมูลไม่ถูกต้อง", null);
                    } else {
                        Sweetalert.Error(BoxMsg.Title_Error, "ข้อมูลไม่ถูกต้อง", null);
                    }
                }, "", "", ActionID == 2 ? "ท่านต้องการ" + ApproveName + "หรือไม่?" : ActionID == 5 ? "ท่านต้องการ" + rejectName + "หรือไม่?" : ActionID == 6 ? "ท่านต้องการ" + cancelName + "หรือไม่?" : "")
            }
        } else Sweetalert.Warning(BoxMsg.Title_Warning, ActionID == 2 ? sWarning + ApproveName : ActionID == 5 ? sWarning + rejectName : ActionID == 6 ? sWarning + cancelName : "", null);
    }
    const CheckPosition = () => {
        return (
            <Fragment>
                <div className="form-row">
                    <div className="col-auto">
                        <button type="button" className="btn btn-success btn-sm" onClick={e => OnAction(2)}><i className="fas fa-check"></i> {ApproveName}</button>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-warning btn-sm" onClick={e => OnAction(5)}> <i className="fa fa-share fa-flip-horizontal"></i> {rejectName}</button>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-danger btn-sm" onClick={e => OnAction(6)}><i className="fas fa-times"></i> {cancelName}</button>
                    </div>
                </div>
            </Fragment>
        );
    }
    return (
        <div id="PAGE_REQAPRV">
            <div className="container">
                <div className="ipane ipane-1">
                    <div className="ipane-head">รายการรออนุมัติ</div>
                    <div className="ipane-body p-3">
                        <div className="form-row">
                            <div className="col-auto ml-auto">
                                <AvForm onSubmit={SearchData} >
                                    <div className="form-row">
                                        <div className="col-auto">
                                            <div className="input-group">
                                                <AvInput type="text" autoComplete="off" name="sRequestNo" className="form-control-sm" placeholder="เลขที่ใบขอเบิก" />
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className="form-group">
                                                <AvInput type="Date" name="dDocDate" tag={[Input, ThaiDatePicker]} small className="form-control" placeholder="วันที่เริ่มต้น" />
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className="form-group">
                                                <AvInput type="Date" name="dReceiveDate" tag={[Input, ThaiDatePicker]} small className="form-control" placeholder="วันที่สิ้นสุด" />
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className="form-group">
                                                <FormGroup>
                                                    <Button className="form-control-sm btn btn-dark" ><i className="fas fa-search"></i></Button>
                                                </FormGroup>
                                            </div>
                                        </div>
                                    </div>
                                </AvForm>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <CreateTable
                                Header={header}
                                ItemData={lstData_H}
                                CreateDataRow={CreateDataRow}
                                onBtnDelClick={onDeleteClick}
                                onClickHeadCB={onClickHeadCB} />
                        </div>
                        <div className="justify-content-start">
                            <div className="col-auto">
                                <div className="form-group bt-CheckPosition" >
                                    {
                                        CheckPosition()
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default RequestApproval;