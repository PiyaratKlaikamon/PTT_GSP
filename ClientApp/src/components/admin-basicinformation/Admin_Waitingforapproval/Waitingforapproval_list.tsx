import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Badge, Button, Card, CardBody, Collapse, CustomInput } from 'reactstrap';
import { parse } from "query-string"
import CreateTable, { CellHeader } from '../../Systems/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AvForm, AvField, AvRadioGroup, AvRadio, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { List as LINQ } from 'linqts';

const _Waitingforapproval = (props) => {
    const history = useHistory();
    const [lstDataRow, setLstDataRow] = React.useState([] as any);
    const [rowSelected, setRowSelected] = React.useState([] as any);
    const [txtSearch, SetTxtSearch] = React.useState({
        sFullname: "",
        sIsActive: "",
    });
    const header: CellHeader[] = [
        { Sortby: "nID", SortType: Number, label: "", ClassName: "align-middle text-center", IsCheckBox: true, CSSStyle: { width: "2%" } },
        { Sortby: "", SortType: Number, label: "", ClassName: "align-middle text-center", CSSStyle: { width: "2%" } },
        { label: "เลขที่รายการ", Sortby: "sName", SortType: String, ClassName: "align-middle" },
        { label: "ชื่อ-นามสกุล", Sortby: "sFullname", SortType: String, ClassName: "align-middle text-center" },
        { label: "เหตุผลการเบิก", Sortby: "sReason", SortType: String, ClassName: "align-middle text-center" },
        { label: "จำนวนเงิน", Sortby: "nAmount", SortType: String, ClassName: "align-middle text-center" },
        { label: "วันที่สร้างรายการ", Sortby: "sUpdate", SortType: String, ClassName: "align-middle text-center" },
        { label: "หมายเหตุ/หมายเหตุ", Sortby: "sReason1", SortType: String, ClassName: "align-middle text-center" },
    ];
    const subheader: CellHeader[] = [
        { Sortby: "", SortType: Number, ClassName: "align-middle text-center text-nowrap", label: "ลำดับที่", CSSStyle: { width: 110 } },
        { label: "ชื่อวัสดุ", Sortby: "", SortType: String, ClassName: "align-middle" },
        { label: "จำนวนของเบิก", Sortby: "", SortType: String, ClassName: "align-middle text-center" },
        { label: "ราคาต่อหน่วย", Sortby: "", SortType: String, ClassName: "align-middle text-center" },
        { label: "ราคารวม", Sortby: "", SortType: String, ClassName: "align-middle text-center" },
    ];
    const toggle = (i) => {
        const newCollapse = collapses.slice()
        newCollapse[i] = !newCollapse[i]
        setCollapse(newCollapse)

    }
    const [lstData, setlstData] = useState([
        { nID: "1", sName: "T1", sFullname: "6403003", sReason: "ปริมวรัศมิ์ พัชร์ธราพล", nAmount: "3,213.00", sUpdate: "01/04/2021", sReason1: "-", sAlert: "" },
        { nID: "2", sName: "T2", sFullname: "6403002", sReason: "นำพล ศรีบุญเพ็ง", nAmount: "6,262.00", sUpdate: "07/06/2021", sReason1: "-", sAlert: "" },
        { nID: "3", sName: "T3", sFullname: "6403001", sReason: "ชัยธินิน รัตนทารส", nAmount: "529,526.00", sUpdate: "23/08/2021", sReason1: "-", sAlert: "" },
    ]);
    const [sublstData, setsublstData] = useState([
        { nID: "1", sName: "575.00 บาท", sFullname: "หลอดไฟ LED 18W Bulb แสงสีขาว Daylight", sReason: "5 ดวง", nAmount: 1, sUpdate: "01/03/2021", sReason1: "115.00 บาท" },
        { nID: "2", sName: "1,560.00 บาท", sFullname: "น็อตหัวเหลี่ยมสแตนเลส Stainless Steel Hex Bolt M6x85 (น็อตเบอร์ 10)", sReason: "120 ตัว", nAmount: 1, sUpdate: "01/03/2021", sReason1: "13.00 บาท" },

    ]);
    const [collapses, setCollapse] = useState(Array(lstData.length).fill(false))

    var onDeleteClick = () => {
        //if (rowSelected.length > 0) {
        //    var data = {.
        //        nID: rowSelected
        //    };
        var qCheckApp = new LINQ<any>(lstData).Where(w => rowSelected.indexOf(w.nID) > -1).ToArray();
        var Alllist: any = [...lstData];
        qCheckApp.forEach(element => {
            let nIndxItem = Alllist.findIndex(
                (fi) => fi.nID === element.nID
            );
            if (nIndxItem != -1) {
                if (element.sReason1 === "") {
                    Alllist[nIndxItem].sAlert = "alert-danger";
                } else {
                    Alllist[nIndxItem].sAlert = "";
                }
            }
        })
        setlstData([...Alllist])
    }

    var onSelectedRow = (id: number) => {
        setRowSelected([...rowSelected, id])
    }
    var onDeSelectedRow = (id: number) => {
        var index = rowSelected.indexOf(id)
        var Alllist: any = [...lstData];
        if (index !== -1) {
            rowSelected.splice(index, 1);
            let nIndxItem = Alllist.findIndex(
                (fi) => fi.nID === id
            );
            if (nIndxItem != -1) {
                Alllist[nIndxItem].sAlert = "";
            }
            setRowSelected([...rowSelected]);
        }
        setlstData([...Alllist])
    }
    const CreateDataRow = (o: any, i: any) => {
        return (
            <Fragment>
                <tr key={i} className={o.sAlert === "" ? "" : o.sAlert}>
                    {
                        <td className="align-middle text-center"><CustomInput type="checkbox" id={`News_${o.nID}`} label={''}
                            onChange={(e: any) => {
                                let el = e.target
                                if (el.checked) {
                                    onSelectedRow(o.nID)
                                } else {
                                    onDeSelectedRow(o.nID)
                                }
                            }}
                            checked={rowSelected.indexOf(o.nID) !== -1}
                        /></td>
                    }
                    <td className="align-middle text-center">
                        <Button size="sm" type="button" color="link" onClick={() => toggle(i)} >
                            <FontAwesomeIcon icon={["far", "plus-square"]} />
                        </Button>
                    </td>
                    <td className="text-center align-middle">{o.sFullname}</td>
                    <td className="text-center align-middle">{o.sReason}</td>
                    <td className="text-center align-middle">{o.sReason1}</td>
                    <td className="text-right align-middle">{o.nAmount}</td>
                    <td className="text-center align-middle">{o.sUpdate}</td>
                    <td className="text-center align-middle">
                        <input className="form-control form-control-sm" maxLength={250} name="ssReason1" id="ssReason1ID" placeholder="ระบุหมายเหตุ"
                            onBlur={(e) => {
                                o.sReason1 = e.target.value;
                            }} />
                    </td>
                </tr>
                <tr>
                    <td colSpan={10} className="p-0">
                        <Collapse isOpen={collapses[i]} key={i}>
                            <Card className="border-0">
                                <CardBody>
                                    <div >
                                        <CreateTable
                                            Header={subheader}
                                            ItemData={sublstData}
                                            defaultFontSize={true}
                                            CreateDataRow={SubCreateDataRow}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Collapse>
                    </td>
                </tr>
            </Fragment>
        )
    }
    const SubCreateDataRow = (obj, Subindex) => {
        return (
            <tr key={Subindex}>
                <td className="text-center">{obj.nID}</td>
                <td className="text-left">{obj.sFullname}</td>
                <td className="text-right">{obj.sReason}</td>
                <td className="text-right">{obj.sReason1}</td>
                <td className="text-right">{obj.sName}</td>
            </tr>
        )
    }
    const getLinkToTNEW_datail = (id: number) => {
        //let sTypeComponent = `/admin-Master-edit/`
        //let nID_Mas = Encrypt(id)
        //let nID_Type = Encrypt(PnID_Type)
        //let sMode = Encrypt("Edit")
        //let sPath = `${sTypeComponent}?nID=${nID_Mas}&&sMode=${sMode}&&type=${nID_Type}`
        //history.push(sPath);
    }
    const getLinkTo_Edit = () => {
        let sTypeComponent = `/admin-supplies_edit`
        let sPath = `${sTypeComponent}`
        return history.push(sPath);
    }
    const getLinkTo_list = () => {
        //let sTypeComponent = `/admin-Master`
        //let sPath = `${sTypeComponent}`
        //return history.push(sPath);
    }
    const SearchData = async () => {

    };
    var onClickHeadCB = (e: any, currentData: any) => {

    }
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
    return (
        <Fragment>
            <div className="form-row">
                <div className="col-auto ml-auto">
                    <div className="form-row">
                        <div className="col-auto">
                            <div className="form-group">
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="เลขที่รายการ"
                                    onChange={(e) =>
                                        SetTxtSearch({
                                            ...txtSearch,
                                            sFullname: e.target.value,
                                        })
                                    }
                                    onKeyPress={(e) => {
                                        e.key === "Enter" && SearchData();
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="รหัส/ชื่อ-นามสกุล"
                                    onChange={(e) =>
                                        SetTxtSearch({
                                            ...txtSearch,
                                            sFullname: e.target.value,
                                        })
                                    }
                                    onKeyPress={(e) => {
                                        e.key === "Enter" && SearchData();
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="form-group">
                                <input
                                    type="date"
                                    className="form-control form-control-sm"
                                    placeholder="วันที่เริ่มต้น"
                                    onChange={(e) =>
                                        SetTxtSearch({
                                            ...txtSearch,
                                            sFullname: e.target.value,
                                        })
                                    }
                                    onKeyPress={(e) => {
                                        e.key === "Enter" && SearchData();
                                    }}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="form-group">
                                <input
                                    type="date"
                                    className="form-control form-control-sm"
                                    placeholder="วันที่สิ้นสุด"
                                    onChange={(e) =>
                                        SetTxtSearch({
                                            ...txtSearch,
                                            sFullname: e.target.value,
                                        })
                                    }
                                    onKeyPress={(e) => {
                                        e.key === "Enter" && SearchData();
                                    }}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="form-group">
                                <button
                                    type="button"
                                    className="btn btn-dark btn-sm"
                                    onClick={() => SearchData()}
                                >
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-1">
                <CreateTable
                    Header={header}
                    ItemData={lstData}
                    CreateDataRow={CreateDataRow}
                    IsHasBtnDEL={true}
                    defaultCancel={true}
                    onBtnDelClick={onDeleteClick}
                    onClickHeadCB={onClickHeadCB}
                    rowSelected={rowSelected}
                />
            </div>
            {/*<ColoredLine color="#2196f3" />*/}
            {/*<div className="form-row justify-content-between">*/}
            {/*    <div className="form-row justify-content-start">*/}
            {/*        <div className="col-auto">*/}
            {/*            <div className="form-group">*/}
            {/*                <button type="button" className="btn btn-secondary" onClick={c => { getLinkTo_list() }}>*/}
            {/*                    <i className="fas fa-times"></i> ยกเลิก</button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </Fragment >
    );
};
export default _Waitingforapproval;

