import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Badge, Button, CustomInput, Collapse, Card, CardBody } from "reactstrap";
import CreateTable, { CellHeader } from "../Systems/Table";
import { Encrypt, TooltipsMSG } from "../Systems/SystemComponent";
import "../admin-pendingapproval/PendingApproval.css";
import NumberFormat from 'react-number-format';




const ParcelGroup = () => {
    const history = useHistory();

    const [RowSelected, setRowSelected] = useState([] as any);
    const [RowSelecteds, setRowSelecteds] = useState([] as any);

    const [btnToPendingApproval_Detail, setbtnToPendingApproval_Detail] = useState(true);
    const [hiddenbtnCancel, sethiddenbtnCancel] = useState(false);
    const [hiddenbtnInput, sethiddenbtnInput] = useState(false);
    const [hiddenbtncheckboxs, sethiddenbtncheckboxs] = useState(false);
    const [userPosition, setuserPosition] = useState("");



    const CheckUser = (value: string) => {
        if (value === "1") {
            sethiddenbtnCancel(true)
            sethiddenbtnInput(false)
            sethiddenbtncheckboxs(false)
            //setuserPosition("Supervisor");
        } else if (value === "2") {
            sethiddenbtnCancel(false)
            sethiddenbtnInput(false)
            sethiddenbtncheckboxs(true)
            //setuserPosition("ParcelOfficer");
        } else if (value === "3") {
            sethiddenbtnCancel(true)
            sethiddenbtnInput(true)
            sethiddenbtncheckboxs(true)
            //setuserPosition("chiefParcelOfficer");
        } else {
            sethiddenbtnCancel(false)
            sethiddenbtnInput(false)
            sethiddenbtncheckboxs(false)
            //setuserPosition("");
        }


    }

    const toggle = (i: number) => {

        const newCollapse = collapses.slice()
        newCollapse[i] = !newCollapse[i]
        setCollapse(newCollapse)

    }

    var onSelectedRow = (id: number) => {
        setRowSelected([...RowSelected, id]);
    };

    var onDeSelectedRow = (id: number) => {
        var index = RowSelected.indexOf(id);
        if (index !== -1) {
            RowSelected.splice(index, 1);
            setRowSelected([...RowSelected]);
        }
    };

    var onSelectedRows = (id: number) => {
        setRowSelecteds([...RowSelecteds, id]);
    };
    var onDeSelectedRows = (id: number) => {
        var index = RowSelecteds.indexOf(id);
        if (index !== -1) {
            RowSelecteds.splice(index, 1);
            setRowSelecteds([...RowSelecteds]);
        }
    };


    const [lstData, setlstData] = useState([
        {
            nID: 1,
            sName: "Example Data 1",
            sNamet: "สะอาด สีสดใส	",
            re: "ใช้งาน",
            Amount: "2,500.00",
            sUpdate: "01/03/2021",
            sNamea: "Example Data 1",
        },
        {
            nID: 2,
            sName: "Example Data 1",
            sNamet: "ยิ่งยอด จันทร์โทลา	",
            Amount: "12890.50",
            sUpdate: "01/03/2021",
            sNamea: "Example Data 1",
            re: "ใช้งาน",
        },
        {
            nID: 3,
            sName: "Example Data 1",
            sNamet: "อภิรัช ทรงดี",
            Amount: "2,800.00",
            sUpdate: "01/03/2021",
            sNamea: "Example Data 1",
            re: "ใช้งาน",
        },
    ]);





    const [lstDataTest, setlstDataTest] = useState([
        {
            nID: 1,
            sName: "แว่นตา เลนส์ใส",
            nNumber: 8,
            nNumberApp: 8,
            nAmount: "800",
            sNamea: "Example Data 1",
        },
        {
            nID: 2,
            sName: "แว่นครอบแว่นสายตา เลนส์ใส",
            nNumber: 15,
            nNumberApp: 15,
            nAmount: "1,500",
            sUpdate: "01/03/2021",
            sNamea: "Example Data 2",
        },
        {
            nID: 3,
            sName: "แว่นครอบตา ป้องกันสารเคมี",
            nNumber: 5,
            nNumberApp: 5,
            nAmount: "500",
            sUpdate: "01/03/2021",
            sNamea: "Example Data 3",
        },
    ]);




    const [collapses, setCollapse] = useState(Array(lstData.length).fill(false))


    const header: CellHeader[] = [
        {
            label: "",
            Sortby: "",
            ClassName: "align-middle",
            SortType: Number,
            IsCheckBox: true,
        },
        {
            label: "",
            Sortby: "",
            ClassName: "align-middle",
            SortType: Number,

        },

        {
            label: "เลขที่รายการ",
            Sortby: "",
            ClassName: "align-middle",
            SortType: Number,
        },
        {
            label: "ชื่อ-นามสกุล",
            Sortby: "",
            ClassName: "align-middle text-left",
            SortType: Number,
        },
        {
            label: "เหตุผลการเบิก",
            Sortby: "",
            ClassName: "align-middle t",
            SortType: String,
            CSSStyle: { width: 210 },
        },
        {
            label: "จำนวนเงิน",
            Sortby: "",
            ClassName: "align-middle text-center",
            SortType: String,
            CSSStyle: { width: 210 },
        },
        {
            label: "วันที่สร้างรายการ",
            Sortby: "",
            ClassName: "align-middle text-center",
            SortType: String,
            CSSStyle: { width: 210 },
        },
        {
            label: "หมายเหตุ / เหตุผล",
            Sortby: "",
            ClassName: "align-middle text-center",
            SortType: String,
            CSSStyle: { width: 210 },
        },
        {
            label: "",
            Sortby: "",
            ClassName: "align-middle",
            SortType: Number,
        },
    ];




    const subheader: CellHeader[] = [
        { Sortby: "", SortType: Number, ClassName: "align-middle text-center text-nowrap", label: "", CSSStyle: { width: 1 } },
        { Sortby: "", SortType: Number, ClassName: "align-middle text-center text-nowrap", label: "ที่", CSSStyle: { width: 1 } },
        { label: "ชื่อวัสดุ", Sortby: "", SortType: String, ClassName: "align-middle" },
        { label: "จำนวนของเบิก", Sortby: "", SortType: String, ClassName: "align-middle text-center" },
        { label: "จำนวนอนุมัติ", Sortby: "", SortType: String, ClassName: "align-middle text-center" },
        { label: "หน่วย", Sortby: "", SortType: String, ClassName: "align-middle text-center" },
        { label: "ราคา", Sortby: "", SortType: String, ClassName: "align-middle text-center" },
        { label: "หมายเหตุ/เหตุผล", Sortby: "", SortType: String, ClassName: "align-middle text-center" },
    ];


    const SubCreateDataRow = (o, Subindex) => {
        return (
            <tr key={Subindex}>

                <td className="align-middle text-center" style={{ width: "1px" }}>
                    {hiddenbtncheckboxs === false?
                        <CustomInput
                            type="checkbox"
                            id={`subcbBody_${o.nID}`}
                            label={""}
                            onChange={(e: any) => {
                                let el = e.target;
                                if (el.checked) {
                                    onSelectedRows(o.nID);
                                } else {
                                    onDeSelectedRows(o.nID);
                                }
                            }}
                            checked={RowSelecteds.indexOf(o.nID) !== -1}
                        />
                    :null
                    }
                </td>

                <td className="align-middle text-center" style={{ width: "1px" }}>
                    {Subindex + 1}</td>
                <td className="align-middle text-left" style={{ width: "5px" }}>         {o.sName}</td>
                <td className="align-middle text-right" style={{ width: "5px" }}>{o.nNumber}</td>


                {
                    hiddenbtnInput === false ?
                        <td className="text-center" style={{ width: "5px" }}>
                            <input className="form-control form-control-sm text-right "
                                type="text"
                                defaultValue={o.nNumberApp}
                            />
                        </td>
                        :
                        <td className="text-center" style={{ width: "5px" }}>
                            {o.nNumberApp}
                        </td>
                }
                <td className="align-middle text-center" style={{ width: "5px" }}>ชิ้น</td>
                <td className="align-middle text-right" style={{ width: "5px" }}>{o.nAmount}</td>
                {
                    hiddenbtnInput === false ?
                        <td className="align-middle text-center" style={{ width: "5px" }}>
                            <input className="form-control form-control-sm text-right"
                                type="text"
                                placeholder="ระบุเหตุผลกรณี ปรับลดจำนวน"
                            />
                        </td>
                        :
                        <td className="text-center" style={{ width: "5px" }}>
                            {o.sNamea}
                        </td>
                }
            </tr>
        )
    }



    const onDeleteAdminGroup = () => { };
    var onClickHeadCB = (e: any, currentData: any) => {
        let el = e.target;
        let dataSelect = el.checked
            ? currentData === null
                ? []
                : currentData.map((x: any) => x.nID)
            : [];
        setRowSelected(dataSelect);
    };

    const getLinkToParcelGroup_Edit = (id: number) => {
        let sTypeComponent = `admin-ParcelUnit_Edit/`
        let nID = Encrypt(id)
        let sMode = Encrypt("Edit")
        let sPath = `${sTypeComponent}?nID=${nID}&&sMode=${sMode}`
        history.push("/admin-parcelunit_edit");
    }


    const getLinkToPendingApproval_Detail = (id: number) => {
        //let sTypeComponent = `admin-ParcelUnit_Edit/`
        //let nID = Encrypt(id)
        //let sMode = Encrypt("Edit")
        //let sPath = `${sTypeComponent}?nID=${nID}&&sMode=${sMode}`
        history.push("/admin-pendingapproval-detail");
    }

    const CreateData = (o: any, i: any) => {
        return (


            <React.Fragment>
                <tr key={i}>
                    {
                        <td className="align-middle text-center">
                            <CustomInput
                                type="checkbox"
                                id={`cbBody_${o.nID}`}
                                label={""}
                                onChange={(e: any) => {
                                    let el = e.target;
                                    if (el.checked) {
                                        onSelectedRow(o.nID);
                                    } else {
                                        onDeSelectedRow(o.nID);
                                    }
                                }}
                                checked={RowSelected.indexOf(o.nID) !== -1}
                            />
                        </td>
                    }
                    <td className="align-middle text-center">
                        <div className="row">
                            <div className="col ">
                                <Button
                                    size="sm"
                                    type="button"
                                    color="link"
                                    onClick={() => toggle(i)}
                                >
                                    <FontAwesomeIcon icon={["far", "plus-square"]} />
                                </Button>
                            </div>
                        </div>
                    </td>
                    <td className="align-middle text-center" >

                        {i + 1}
                    </td>
                    <td className="align-middle text-left">{o.sNamet}</td>
                    <td className="align-middle text-left">{o.re}</td>
                    <td className="align-middle text-right">{o.Amount}</td>
                    <td className="align-middle text-center">{o.sUpdate}</td>
                    <td className="align-middle text-center">
                        <input className="form-control text-right "
                            type="text"
                            placeholder="กรณี ส่งกลับแก้ไข/ยกเลิก"

                        /></td>
                    <td>
                        <div className="col" hidden={btnToPendingApproval_Detail}>

                            <Button size="sm" type="button" color="info" onClick={() => getLinkToPendingApproval_Detail(o.nID)} >


                                <FontAwesomeIcon icon={["fas", "edit"]} />
                            </Button>
                        </div>

                    </td>
                </tr>

                <tr >
                    <td colSpan={8} className="p-0">
                        <Collapse isOpen={collapses[i]} key={i}>
                            <Card>
                                <CardBody>


                                    <div >
                                            <CreateTable
                                                Header={subheader}
                                                ItemData={lstDataTest}
                                                CreateDataRow={SubCreateDataRow}
                                            />
                                    </div>
                                    <div className="d-flex flex-row-reverse">
                                        <div className="p-2">
                                            <a>รวม </a>
                                            <a>2,800.00</a>
                                            {
                                                //<NumberFormat value={lstDataTest.map(item => item.nAmount).reduce((a, b) => a + b)} className="foo" decimalScale={2} displayType={'text'} thousandSeparator={true} />
                                            }
                                            <a> บาท</a>


                                        </div>

                                    </div >
                                </CardBody>
                            </Card>

                        </Collapse>
                    </td>
                </tr>
            </React.Fragment>
        );


    };

    return (
        <Fragment>
            <div className="form-row justify-content-end">
                <div className="col-auto">
                    <div className="form-group">
                        <select
                            className="form-control form-control-sm"
                            name="nOrder"
                            id="nOrder"
                            onChange={(e) => {
                                CheckUser(e.target.value);
                            }}
                        >
                            <option value="0">-เลือกตำแหน่งพนักงาน-</option>
                            <option value="1">ผู้บังคับบัญชา</option>
                            <option value="2">เจ้าหน้าที่วัสดุ</option>
                            <option value="3">หัวหน้าวัสดุ</option>
                        </select>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="form-group">
                        <input
                            className="form-control form-control-sm"
                            placeholder="เลขที่รายการ"
                            type="text"
                        />
                    </div>
                </div>
                <div className="col-auto">
                    <div className="form-group">
                        <input
                            className="form-control form-control-sm"
                            placeholder="รหัส/ชื่อ-นามสกุล"
                            type="text"
                        />
                    </div>
                </div>
                <div className="col-auto">
                    <div className="form-group">
                        <input
                            className="form-control form-control-sm"
                            placeholder="วันที่เริ่มต้น"
                            type="date"
                            required
                        />
                    </div>
                </div>
                <div className="col-auto">
                    <div className="form-group">
                        <input
                            className="form-control form-control-sm"
                            placeholder="วันที่สิ้นสุด"
                            type="date"
                            required
                        />
                    </div>
                </div>


                <div className="col-auto">
                    <div className="form-group">
                        <button type="button" className="btn btn-dark btn-sm">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="row mt-1">
                <CreateTable
                    Header={header}
                    ItemData={lstData}
                    CreateDataRow={CreateData}
                    IsHasBtnDEL={false}
                    onBtnDelClick={onDeleteAdminGroup}
                    onClickHeadCB={onClickHeadCB}
                    rowSelected={RowSelected}
                />


            </div>


            <div className="form-row" >

                    <div className="col-auto">
                        <button type="submit" className="btn btn-success btn-sm">
                            <i className="fas fa-check"></i> อนุมัติคำขอ
                         </button>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-warning btn-sm">
                            <i className="fa fa-share fa-flip-horizontal"></i> ส่งกลับแก้ไข
                        </button>
                    </div>


                    {hiddenbtnCancel === false ?
                        (<div className="col-auto" >
                            <button type="button" className="btn btn-danger btn-sm">
                                <i className="fas fa-times"></i> ยกเลิกคำขอ
                        </button>
                        </div>)
                        :
                        null
                    }

            </div>



        </Fragment>
    );

};
export default ParcelGroup;
