import * as React from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import CreateTable, { CellHeader } from "../Systems/Table";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Badge, Button, Collapse, CustomInput, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, TabContent, TabPane, UncontrolledDropdown } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import TextField from '@material-ui/core/TextField/TextField';



const ParcelGroup_Edit = () => {
    const history = useHistory();
    const [historyShow, sethistoryShow] = useState(false);
    const [Activetab, setActivetab] = useState("tabHistorySupervisor");
    const [userPosition, setuserPosition] = useState("" as String);
    const [userParcelOfficer, setuserParcelOfficer] = useState(false);



    const CheckUser = () => {

        if (userPosition == "ParcelOfficer") {
            setuserParcelOfficer(true)
        }


    }


    const SetModal = () => {
        sethistoryShow(!historyShow)
    }



    useEffect(() => {
        CheckUser()

    }, []);



    const [lstData, setlstData] = useState([
        {
            nID: 1,
            sName: "Example Data 1",
            nNumber: 1,
            nNumberApp: 1,
            nAmount: 1000000,
            sNamea: "Example Data 1",
        },
        {
            nID: 2,
            sName: "Example Data 2",
            nNumber: 1,
            nNumberApp: 1,
            nAmount: 100,
            sUpdate: "01/03/2021",
            sNamea: "Example Data 2",
        },
        {
            nID: 3,
            sName: "Example Data 3",
            nNumber: 1,
            nNumberApp: 1,
            nAmount: 100,
            sUpdate: "01/03/2021",
            sNamea: "Example Data 3",
        },
    ]);



    const [parcelList, setParceLlist] = useState(false);


    const parcelListopen = () => {
        setParceLlist(!parcelList)

    };


    const header: CellHeader[] = [
        {
            label: "ที่",
            Sortby: "",
            ClassName: "align-middle",
            SortType: Number,
        },
        {
            label: "ชื่อวัสดุ",
            Sortby: "",
            ClassName: "align-middle text-center",
            SortType: String,
            CSSStyle: { width: 210 },
        },
        {
            label: "จำนวนขอเบิค",
            Sortby: "",
            ClassName: "align-middle text-center",
            SortType: String,
            CSSStyle: { width: 210 },
        },
        {
            label: "จำนวนอนุมัติ",
            Sortby: "",
            ClassName: "align-middle text-center",
            SortType: String,
            CSSStyle: { width: 210 },
        },
        {
            label: "หน่วย",
            Sortby: "",
            ClassName: "align-middle text-center",
            SortType: String,
            CSSStyle: { width: 210 },
        },
        {
            label: "ราคา",
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
    ];


    const [RowSelected, setRowSelected] = useState([] as any);

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


    const CreateData = (o: any, i: any) => {
        return (



            userParcelOfficer == false ? (
                <tr>
                    <td className="align-middle" style={{ width: "1px" }}>{i + 1}</td>
                    <td className="align-middle text-left" style={{ width: "5px" }}>{o.sName}</td>
                    <td className="align-middle text-right" style={{ width: "5px" }}>{o.nNumber}</td>
                    <td className="text-center" style={{ width: "5px" }}>{o.nNumberApp}</td>
                    <td className="align-middle text-center" style={{ width: "5px" }}>ชิ้น</td>
                    <td className="align-middle text-right" style={{ width: "5px" }}>{o.nAmount}</td>
                    <td className="align-middle text-center" style={{ width: "5px" }}>{o.sNamea} </td>
                </tr>)
                :
                (<tr >
                    <td className="align-middle" style={{ width: "1px" }}>{i + 1}</td>
                    <td className="align-middle text-left" style={{ width: "5px" }}>{o.sName}</td>
                    <td className="align-middle text-right" style={{ width: "5px" }}>{o.nNumber}</td>
                    <td className="text-center" style={{ width: "5px" }}>
                        <input className="form-control text-right "
                            type="text"
                            defaultValue={o.nNumberApp}
                        />
                    </td>
                    <td className="align-middle text-center" style={{ width: "5px" }}>ชิ้น</td>
                    <td className="align-middle text-right" style={{ width: "5px" }}>{o.nAmount}</td>

                    <td className="align-middle text-center" style={{ width: "5px" }}>
                        <input className="form-control text-right"
                            type="text"
                            defaultValue={o.sNamea}
                            placeholder="ระบุเหตุผลกรณี ปรับลดจำนวน"
                        />
                    </td>
                </tr>)



        );
    };


    var onClickHeadCB = (e: any, currentData: any) => {
        let el = e.target;
        let dataSelect = el.checked
            ? currentData === null
                ? []
                : currentData.map((x: any) => x.nID)
            : [];
        setRowSelected(dataSelect);
    };

    const onDeleteAdminGroup = () => { };
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const HistorySupervisor_header: CellHeader[] = [
        {
            Sortby: "",
            SortType: false,
            label: "ที่",
            CSSStyle: { width: "1%" }
        },
        {
            label: "ชื่อวัสดุ",
            Sortby: "",
            SortType: false,
            CSSStyle: { width: "4%" }
        },
        {
            label: "จำนวนขอเบิก",
            Sortby: "",
            SortType: false,
            CSSStyle: { width: "4%" }
        },
        {
            label: "จำนวนอนุมัติ",
            Sortby: "",
            SortType: false,
            CSSStyle: { width: "4%" }
        },
        {
            Sortby: "",
            SortType: false,
            label: "หน่วย",
            CSSStyle: { width: "1%" }

        },
        {
            Sortby: "",
            SortType: false,
            label: "ราคา",
            CSSStyle: { width: "1%" }
        },
        {
            Sortby: "",
            SortType: false,
            label: "หมายเหตุ/เหตุผล",
            CSSStyle: { width: "1%" }
        }
    ];


    const HistorySupervisor_CreateDataRow = (o: any, i: any) => {
        return (
            <tr key={i}>
                <td className="align-middle" style={{ width: "1px" }}>{i + 1}</td>
                <td className="align-middle text-left" style={{ width: "5px" }}>{o.sName}</td>
                <td className="align-middle text-right" style={{ width: "5px" }}>{o.nNumber}</td>
                <td className="text-center" style={{ width: "5px" }}>{o.nNumberApp}</td>
                <td className="align-middle text-center" style={{ width: "5px" }}>ชิ้น</td>
                <td className="align-middle text-right" style={{ width: "5px" }}>{o.nAmount}</td>
                <td className="align-middle text-center" style={{ width: "5px" }}>{o.sNamea}</td>
            </tr>
        )
    }


    const getLinkToPendingApproval = () => {
        //let sTypeComponent = `admin-ParcelUnit_Edit/`
        //let nID = Encrypt(id)
        //let sMode = Encrypt("Edit")
        //let sPath = `${sTypeComponent}?nID=${nID}&&sMode=${sMode}`
        history.push("/admin-pendingapproval");
    }

    return (
        <Fragment>



            <div className="form-group">
                <div className="row">
                    <div className="col">

                        เลขที่รายการ
                        <div className="form-control readOnly">

                        </div>

                    </div>
                    <div className="col">

                        รหัสพนักงาน
                        <div className="form-control readOnly">

                        </div>


                    </div>
                </div>


            </div>

            <div className="form-group">
                <div className="row">
                    <div className="col">
                        ชื่อ-นามสกุล
                        <div className="form-control readOnly">

                        </div>
                    </div>
                    <div className="col">
                        อีเมล
                        <div className="form-control readOnly">

                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col">
                        ตำแหน่ง
                        <div className="form-control readOnly">

                        </div>
                    </div>
                    <div className="col">

                        หน่วยงาน
                        <div className="form-control readOnly">

                        </div>

                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col">
                        เหตุผลในการเบิค
                        <div className="form-control readOnly">

                        </div>

                    </div>
                    <div className="col">

                        สถานที่ใช้งาน
                        <div className="form-control readOnly">

                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col">
                        หมายเหตุ
                        <div className="form-control readOnly">

                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="small">
                                <b>&nbsp;</b>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="exampleCheck1"
                                />
                                <div className="form-check-label small">
                                    <b>Fast Track</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="form-group">
                <div className="row mt-1">
                    <CreateTable
                        Header={header}
                        ItemData={lstData}
                        CreateDataRow={CreateData}
                    />


                </div>
            </div>




            <div className="form-row">
                <div className="col-auto">
                    <button
                        type="button"
                        className="btn btn-dark btn-sm"
                        onClick={() => sethistoryShow(true)}
                    >
                        <i className="fas fa-history"></i> ประวัติการทำรายการ
                  </button>
                </div>
                <div className="col-auto ml-auto">
                    <div className="form-row">
                        <div className="col-auto">
                            <div className="form-group">
                                <a>รวม </a>
                                <NumberFormat value={lstData.map(item => item.nAmount).reduce((a, b) => a + b)} className="foo" decimalScale={2} displayType={'text'} thousandSeparator={true} />
                                <a> บาท</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={historyShow}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
            >



                <ModalHeader toggle={SetModal}>ประวัติการทำรายการ</ModalHeader>

                <ModalBody>



                    <Nav className="nav nav-tabs navTabList" role="tablist">
                        <NavItem>
                            <NavLink
                                className={Activetab === "tabHistorySupervisor" ? "active" : ""}

                                onClick={() => {
                                    setActivetab("tabHistorySupervisor");
                                }}
                            >
                                <i className="fas fa-users-cog"></i> ประวัติการทำรายการ (ผู้บังคับบัญชาผู้ขอเบิก)
                        </NavLink>
                        </NavItem>
                        <NavItem hidden={userParcelOfficer} >
                            <NavLink
                                className={Activetab === "tabHistoryParcelOfficer" ? "active" : ""}

                                onClick={() => {
                                    setActivetab("tabHistoryParcelOfficer");
                                    //GetDataOnPagePinLoad();
                                }}
                            >
                                <i className="fas fa-user-friends"></i> ประวัติการทำรายการ (เจ้าหน้าที่วัสดุ)
                        </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink
                                className={Activetab === "tabHistory" ? "active" : ""}
                                onClick={() => {
                                    setActivetab("tabHistory");
                                    //GetDataOnPagePinLoad();
                                }}
                            >
                                <i className="fas fa-user-friends"></i> ประวัติการทำรายการ
                        </NavLink>
                        </NavItem>



                    </Nav>
                    <TabContent activeTab={Activetab}>
                        <TabPane tabId="tabHistorySupervisor">
                            tabHistorySupervisor
                            <div className="row mt-1">
                                <CreateTable
                                    Header={HistorySupervisor_header}
                                    ItemData={lstData}
                                    CreateDataRow={HistorySupervisor_CreateDataRow}
                                />
                            </div>
                            <div className="form-group readOnly">
                                <label>หมายเหตุ/เหตุผล</label>
                                <textarea className="form-control" disabled rows={3}></textarea>
                            </div>
                        </TabPane>

                        <TabPane tabId="tabHistoryParcelOfficer">

                            tabHistoryParcelOfficer
                            <div className="row mt-1">
                                <CreateTable
                                    Header={HistorySupervisor_header}
                                    ItemData={lstData}
                                    CreateDataRow={HistorySupervisor_CreateDataRow}
                                />
                            </div>

                            <div className="form-group readOnly">
                                <label>หมายเหตุ/เหตุผล</label>
                                <textarea className="form-control" disabled rows={3}></textarea>
                            </div>


                        </TabPane>
                        <TabPane tabId="tabHistory">


                            tabHistory
                            <div className="row mt-1">
                                <CreateTable
                                    Header={HistorySupervisor_header}
                                    ItemData={lstData}
                                    CreateDataRow={HistorySupervisor_CreateDataRow}
                                />
                            </div>
                            <div className="form-group ">
                                <label>หมายเหตุ/เหตุผล</label>
                                <textarea className="form-control" disabled rows={3}></textarea>
                            </div>
                        </TabPane>
                    </TabContent>

                    <ModalFooter>
                        <Button className="btn-primary" onClick={() => sethistoryShow(false)}>ปิด</Button>
                    </ModalFooter>
                </ModalBody>

            </Modal>
            <div className="form-group">
                <label>หมายเหตุ/เหตุผล</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
            </div>

            <hr />

            <div className="row" >
                <div className="col">
                    <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => getLinkToPendingApproval()}
                    >
                        <i className="fas fa-arrow-left"></i> กลับ
            </button>



                </div>
                <div className="d-flex justify-content-center">
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
                    <div className="col-auto">
                        <button type="button" className="btn btn-danger btn-sm">
                            <i className="fas fa-times"></i> ยกเลิกคำขอ
                        </button>

                    </div>



                </div>
            </div>





        </Fragment>
    );
};

export default ParcelGroup_Edit;
