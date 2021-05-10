import React, { Fragment, useState } from "react";
import { AvForm, AvField, AvGroup, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardBody, Collapse, CustomInput, Input } from "reactstrap";
import { BoxMsg, Decrypt, DialogConfirm, DialogDelete, Responsestart, Sweetalert, TooltipsMSG } from "../Systems/SystemComponent";
import CreateTable, { CellHeader } from "../Systems/Table";
import Fileuploader, { Extension } from "../../Fileuploader";
import "../_Layout-Admin/Layout_Back.css";
import { AxiosGetJson, AxiosPostJson } from "../Service/Config/AxiosMethod";
import { parse } from "querystring";
import { Typeahead } from 'react-bootstrap-typeahead'
import { any } from "@amcharts/amcharts4/.internal/core/utils/Array";
import { useHistory } from "react-router";
import ThaiDatePicker from "../ST_Handlers/ThaiDatePicker";
const Controller = 'api/AdminRequestToImproveStock'



const Request_to_ImproveStock_Edit = () => {
    const [RowSelected, setRowSelected] = useState([] as any);
    const [cChangeradio, setChangeradio] = useState("1");
    const [oV_Stock_Update, setV_Stock_Update] = useState({});
    const [oV_Materials, setV_Materials] = useState([] as any);
    const [DisabledTypeahead, setDisabledTypeahead] = useState(true);
    const [olistADD, setlistADD] = useState([] as any);
    const [sSaveMode, setSaveMode] = useState("");
    const [oEditdata, setEditdata] = useState([] as any);
    const [nIdEdit, setIdEdit] = useState(0);
    const [Mode, setMode] = useState("");
    const history = useHistory();
    const [isInvalid, setisInvalid] = useState(false);
    const [sUpdatekc, setsUpdatekc] = useState<Date | undefined>(undefined);


    const [ModeAddorEdit, setModeAddorEdit] = useState("");
    const Approval = (event, errors: [], values) => {

        if (Mode == "Save") {
            if (errors.length == 0) {
                Requestapproval(values);
            }
        }
    }


    const [lstData, setlstData] = useState([
        {
            value: "",
            label: "",
            MaterialCode: "",
            sUnitName: "",
            nPrice: "",

        }
    ]);


    const [optState, setoptState] = useState([] as any);



    let { sMode, sRequestID } = parse(window.location.search);
    sRequestID = sRequestID && Decrypt(sRequestID)
    sMode = sMode && Decrypt(sMode)


    React.useEffect(() => {
        GetDataOnPageLoad()
    }, []);




    const GetDataOnPageLoad = async () => {

        let result: any = await AxiosGetJson(Controller + "/Request_to_ImproveStock_Edit?sRequestID=" + sRequestID);
        setV_Stock_Update(result);

        setsUpdatekc(new Date(result.dUpdate))


        let result_v_mt: any = await AxiosGetJson(Controller + "/GetV_Materials?sRequestID=" + sRequestID);
        setV_Materials(result_v_mt);


        let result_SetSearch: any = await AxiosGetJson(Controller + "/SetSearch");
        setoptState(result_SetSearch)
    }


    const Editdata = (i: any) => {
        setlstData(i)
    }



    const [isOpen, setIsOpen] = useState(false);
    const toggle = (i: string) => {
        //if (i = Mode) {
        //    setIsOpen(!isOpen)
        //} else
        if (i = "close") {
            setIsOpen(false)
        }
    }
    const DateFormat = (today: any) => {
        let day = today.getDate() < 10 ? ("0" + today.getDate().toString()) : today.getDate().toString();
        let month = (today.getMonth() + 1) < 10 ? ("0" + (today.getMonth() + 1).toString()) : (today.getMonth() + 1).toString();
        let date = today.getFullYear() + "/" + month + "/" + day;

        return date;
    }




    const onDeleteData = (id: number) => {

        DialogDelete(async () => {

            let array = [...oV_Materials]; // make a separate copy of the array
            if (id !== -1) {
                array.splice(id, 1);
                setV_Materials(array)
            }
            Sweetalert.Success(BoxMsg.Title_Confirm, BoxMsg.Desc_Success_Delete, null);

        })
    };

    const onClickHeadCB = (e: any, currentData: any) => {
        let el = e.target;
        let dataSelect = el.checked
            ? currentData === null
                ? []
                : currentData.map((x: any) => x.nMaterialID)
            : [];
        setRowSelected(dataSelect);
    };




    const header: CellHeader[] = [
        {
            Sortby: "",
            SortType: false,
            label: (
                <Button
                    size="sm"
                    color="primary"
                    type="button"
                    id={"Add"}
                    data-tip={TooltipsMSG.Add}
                    onClick={() => Add()}
                >
                    <FontAwesomeIcon icon={["fas", "plus"]} />
                </Button>
            ),
            ClassName: "align-middle text-center",
            Rowspan: 2,
            CSSStyle: { width: 50 },
        },
        {
            Sortby: "",
            SortType: Number,
            label: "",
            Rowspan: 2,
            ClassName: "align-middle text-center",
            CSSStyle: { width: 50 },
        },
        {
            Sortby: "",
            SortType: Number,
            label: "ที่",
            Rowspan: 2,
            ClassName: "align-middle text-center text-nowrap",
            CSSStyle: { width: 50 },
        },
        {
            label: "รหัสวัสดุ",
            Sortby: "",
            ClassName: "align-middle text-center text-nowrap",
            SortType: Number,
            Rowspan: 2,
            CSSStyle: { width: 100 },
        },
        {
            label: "ชื่อวัสดุ",
            Sortby: "",
            Rowspan: 2,
            ClassName: "align-middle",
            SortType: Number,
        },
        {
            label: "จำนวน",
            Sortby: "",
            ClassName: "align-middle text-center text-nowrap",
            SortType: Number,
            Rowspan: 2,
            CSSStyle: { width: 100 },
        },
        {
            label: "หน่วยนับ",
            Sortby: "",
            ClassName: "align-middle text-center text-nowrap",
            SortType: Number,
            Rowspan: 2,
            CSSStyle: { width: 100 },
        },
        {
            label: "ราคาต่อชิ้น",
            Sortby: "",
            ClassName: "align-middle text-center text-nowrap",
            SortType: Number,
            Rowspan: 2,
            CSSStyle: { width: 100 },
        },

        {
            Sortby: "",
            SortType: String,
            label: "ราคารวม",
            Colspan: 2,
            ClassName: "align-middle text-center text-nowrap",
            CSSStyle: { width: 100 },
        },
        {
            label: "สาเหตุ",
            Sortby: "",
            ClassName: "align-middle text-left ",
            Rowspan: 2,
            SortType: Number,
        },
    ];

    const Add = async () => {
        setIsOpen(true)
        setDisabledTypeahead(false)
        setlstData([{ ...lstData, value: "0", label: "", MaterialCode: "0", sUnitName: "", nPrice: "" }])
        setSaveMode("เพิ่มรายการ")
        setModeAddorEdit("Add")
        setEditdata({
            ...oEditdata,
            nMaterialID: 0,
            nRequestID: 0,
            sMaterialCode: "",
            MaterialName: "",
            nAmount: 0,
            sUnitName: "",
            nPrice: 0,
            nTotalPrice_Minus: 0,
            nTotalPrice_Plus: 0,
            sReason: ""
        })
    };


    const Edit = async (o: any, i: any) => {
        setIsOpen(true)
        setDisabledTypeahead(true)
        setEditdata(o)
        setIdEdit(i)
        setlstData([{ ...lstData, value: "0", label: o.sMaterialCode + " - " + o.sMaterialName, MaterialCode: "0", sUnitName: "", nPrice: "" }])
        setSaveMode("แก้ไขรายการ")
        setModeAddorEdit("Edit")

    };




    const Saveobj = (event, errors: [], values) => {

        let listname = lstData[0].label.split('-');

        if (listname.length != 1) {

            if (errors.length == 0) {
                if (values.nAmount != 0) {
                    if (ModeAddorEdit == "Add") {


                        DialogConfirm(async () => {
                            let s = [...oV_Materials]
                            s.push({
                                nMaterialID: parseInt(lstData[0].value),
                                sMaterialCode: listname[0],
                                sMaterialName: listname[1],
                                nAmount: parseInt(values.nAmount),
                                sUnitName: lstData[0].sUnitName,
                                nPrice: parseInt(lstData[0].nPrice),
                                nTotalPrice_Minus: values.Radio == "1" ? 0 : parseInt(values.nAmount),
                                nTotalPrice_Plus: values.Radio == "0" ? 0 : parseInt(values.nAmount),
                                sReason: values.sReason
                            })
                            setV_Materials(s)
                            setIsOpen(false)
                            Sweetalert.Success(BoxMsg.Desc_Success_Save, BoxMsg.Desc_Success_Save, null);
                        }, null, BoxMsg.Title_Confirm, "ท่านต้องการเพิ่มรายการนี้หรือไม่ ?")


                    } else {
                        DialogConfirm(async () => {

                            let lists = [...oV_Materials]
                            let id = nIdEdit
                            lists[id].nAmount = parseInt(values.nAmount)
                            lists[id].nTotalPrice_Minus = values.Radio == "1" ? 0 : parseInt(values.nAmount)
                            lists[id].nTotalPrice_Plus = values.Radio == "0" ? 0 : parseInt(values.nAmount)
                            lists[id].sReason = values.sReason
                            setV_Materials(lists)
                            setIsOpen(false)
                            Sweetalert.Success(BoxMsg.Desc_Success_Save, BoxMsg.Desc_Success_Save, null);
                        }, null, BoxMsg.Title_Confirm, "ท่านต้องการแก้ไขรายการนี้หรือไม่ ?")
                    }
                } else {
                    Sweetalert.Warning(BoxMsg.Title_Warning, "จำนวนไม่สามารถเป็น 0", null);
                }

            }
        } else {
            setisInvalid(true)

            Sweetalert.Warning(BoxMsg.Title_Warning, "กรุณาระบุ รหัส / ชื่อวัสดุ", null);

        }


    }

    const CheckValue = () => {


        let listname = lstData[0]

        if (listname) {

            let a = listname.label.split('-');

            if (a.length == 1) {
                setisInvalid(true)
            }

        }


    }

    const Requestapproval = async (values: any) => {

        if (oV_Materials.length != 0) {




            oV_Stock_Update.sReason = values.sReason
            oV_Stock_Update.sUpdatekc = DateFormat(values.dUpdate)
            let data = {
                oV_Stock_Update: oV_Stock_Update,
                oV_Materials: oV_Materials
            }



            DialogConfirm(async () => {


                let result: any = await AxiosPostJson(Controller + "/Requestapproval", data);
                if (result.data.sStatus === Responsestart.success) {
                    Sweetalert.Success(BoxMsg.Desc_Success_Save, BoxMsg.Desc_Success_Save, null);

                    return history.push(`/admin-Request-to-ImproveStock`);

                } else if (result.data.sStatus === Responsestart.warning) {
                    Sweetalert.Warning(BoxMsg.Title_Warning, result.data.sMsg, null);
                } else {
                    Sweetalert.Error(BoxMsg.Title_Error, result.data.sMsg, null);
                }


            }, null, BoxMsg.Title_Confirm, "ท่านต้องการอนุมัติรายการนี้หรือไม่ ?")
        } else
        {

            Sweetalert.Warning(BoxMsg.Title_Warning, "กรุณาเพิ่มรายการวัสดุ", null);
        }

    };
    const CreateData = (o: any, i: any) => {
        return (
            <React.Fragment key={i}>
                <tr >
                    <td className="align-middle text-center">
                        <Button size="sm" type="button" color="info" id={"Edit" + i} onClick={() => Edit(o, i)}>
                            <FontAwesomeIcon icon={["fas", "pencil-alt"]} />
                        </Button>
                    </td>
                    <td className="align-middle text-center">
                        <Button
                            size="sm"
                            type="button"
                            color="danger"
                            style={{ width: "32px" }}
                            onClick={() => onDeleteData(i)}
                        >
                            <FontAwesomeIcon icon={["fas", "times"]} />
                        </Button>
                    </td>

                    <td className="align-middle text-center text-nowrap">{i + 1}</td>
                    <td className="align-middle text-center text-nowrap">{o.sMaterialCode}</td>
                    <td className="align-middle text-nowrap">{o.sMaterialName}</td>
                    <td className="align-middle text-right text-nowrap">{o.nAmount} </td>
                    <td className="align-middle text-center text-nowrap">{o.sUnitName}</td>
                    <td className="align-middle text-right text-nowrap">{o.nPrice}</td>
                    <td className="align-middle text-right  text-nowrap">   {o.nTotalPrice_Plus == 0 ? null : o.nTotalPrice_Plus} </td>
                    <td className="align-middle text-right text-nowrap"> {o.nTotalPrice_Minus == 0 ? null : o.nTotalPrice_Minus} </td>
                    <td className="align-middle ">{o.sReason}</td>
                </tr>

            </React.Fragment>
        );
    };

    const createFooter = (o: any) => {
        const sumtotalminus = o.reduce((a, c) => a + c.nTotalPrice_Minus, 0)
        const sumtotalplus = o.reduce((a, c) => a + c.nTotalPrice_Plus, 0)
        return (
            o.length != 0 ?
                <tfoot>
                    <tr className="bg-light" >
                        <td colSpan={8} className="text-center" > <b>ราคารวม</b></td>
                        <td className="text-right "> <b>{sumtotalplus}</b></td>
                        <td className="text-right "> <b>{sumtotalminus} </b></td>
                        <td></td>
                    </tr>
                </tfoot>
                : null
        )
    }

    return (
        <Fragment>
            <AvForm onSubmit={Approval} >
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <b>วันที่ปรับปรุง</b> <span className="text-danger">•</span>
                            <AvGroup>
                                {/*<AvField name="sDocDate" type="date" tag={[Input, ThaiDatePicker]} value={dDocDate} required errorMessage="โปรดระบุ วันที่เอกสาร" />*/}
                                <AvField name="dUpdate" type="date"
                                    tag={[Input, ThaiDatePicker]}
                                    value={sUpdatekc}
                                    onChange={e => { setsUpdatekc(e) }}
                                />
                            </AvGroup>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <b>เหตุผลที่ขอปรับปรุง</b> <span className="text-danger">•</span>
                            <AvField
                                type="text"
                                name="sReason"
                                value={oV_Stock_Update.sReason}
                                errorMessage="โปรดระบุหมายเหตุ"
                                validate={{
                                    required: { value: true },
                                }}
                                onChange={e => { Editdata(e) }}
                                className="form-control"
                                autoComplete="off"
                            ></AvField>
                        </div>
                    </div>
                </div>
                <b>รายการวัสดุ</b> <span className="text-danger">•</span>
                <Collapse isOpen={isOpen}>
                    <div className="card">
                        <div className="card-body">
                            <AvForm onSubmit={Saveobj} id="button_1">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">

                                            <b>รหัส / ชื่อวัสดุ</b>{" "}
                                            <span className="text-danger">•</span>{" "}
                                            <a>(ระบุอย่างน้อย 3 ตัวอักษรเพื่อค้นหา)</a>
                                            <div className="input-group">
                                                <div className="input-group-append">
                                                    <span className="input-group-text" id="basic-addon2"><i className="fas fa-search"></i></span>
                                                </div>




                                                <Typeahead
                                                    filterBy={['MaterialCode']}   //ให้ filter จากอะไร (อ้างอิงจาก optState โดยชื่อ field ต้องตรงกัน)
                                                    id="custom-filtering-example"
                                                    options={optState.filter(o => oV_Materials.every(m => m.nMaterialID != o.value))} // optState คือ state ที่ใช้ในการเก็บค่า option autocomplete
                                                    placeholder="ค้นหาด้วย รหัส,ชื่อวัสดุ"
                                                    name="Sert"
                                                    onChange={e => { Editdata(e) }} //event เมื่อเลือกค่าหรือกรอกค่าเสร็จแล้ว ส่วนใหญ่ใช้สำหรับ set state ของ valState
                                                    minLength={3} // set ให้กรอกตัวอักษรกี่ตัวแล้วให้ autocomplete แสดง
                                                    defaultSelected={optState.slice(0, 1)}
                                                    selected={lstData} // valState คือ state ที่ใช้ในการเก็บค่าที่เลือกหรือกรอกข้อมูล autocomplete
                                                    onSelected={e => { CheckValue() }} //event keyup ใน autocomplete ***optional
                                                    required
                                                    //size="small" // small medium large *** อันนี้ไม่แน่ใจ
                                                    disabled={DisabledTypeahead} // set enable/ disable ***default false                                                   
                                                    isInvalid={isInvalid} // set valid/ invalid ***default true
                                                    errorMessage="โปรดระบุจำนวน"

                                                > </Typeahead>

                                            </div>

                                            {

                                                //    <b>รหัส / ชื่อวัสดุ</b>{" "}
                                                //<span className="text-danger">•</span>
                                                //<AvField
                                                //    type="text"
                                                //    name="parcelname"
                                                //    errorMessage="โปรดระบุชื่อรหัส/วัสดุ"
                                                //    validate={{
                                                //        required: { value: true },
                                                //    }}
                                                //    className="form-control"
                                                //></AvField>


                                            }

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <b>จำนวน</b> <span className="text-danger">•</span>
                                            <div className="form-row">
                                                <div className="col-ato col-form-label">
                                                    <AvGroup>
                                                        <AvRadioGroup inline name="Radio" required>
                                                            <AvRadio label="เพิ่ม" value="1" id="Radio1" />
                                                            <AvRadio label="ลด" value="0" id="Radio2" />
                                                        </AvRadioGroup>
                                                    </AvGroup>
                                                </div>
                                                <div className="col">
                                                    <AvField
                                                        type="number"
                                                        name="nAmount"
                                                        value={oEditdata.nAmount}
                                                        errorMessage="โปรดระบุจำนวน"
                                                        validate={{
                                                            required: { value: true },
                                                        }}
                                                        className="form-control"
                                                        autoComplete="off"
                                                    ></AvField>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <b>สาเหตุ</b> <span className="text-danger">•</span>
                                            <AvField
                                                type="text"
                                                name="sReason"
                                                value={oEditdata.sReason}
                                                errorMessage="โปรดระบุสาเหตุ"
                                                validate={{
                                                    required: { value: true },
                                                }}
                                                className="form-control"
                                                autoComplete="off"
                                            ></AvField>
                                        </div>
                                    </div>
                                    {
                                        //<div className="col-md-6">
                                        //    <AvGroup>
                                        //        <b>ประเภท</b>
                                        //        <AvRadioGroup inline name="radioIsActive" value={cChangeradio} required>
                                        //            <AvRadio label="เพิ่ม" value="1" id="IsActiveRadio1" />
                                        //            <AvRadio label="ลด" value="0" id="IsActiveRadio2" />
                                        //        </AvRadioGroup>
                                        //    </AvGroup>
                                        //</div>
                                        //<div className="col-md-6">
                                        //    <div className="form-group">
                                        //        <b>จำนวน</b> <span className="text-danger">•</span>
                                        //        <AvField
                                        //            type="text"
                                        //            name="price"
                                        //            errorMessage="โปรดระบุจำนวน"
                                        //            validate={{
                                        //                required: { value: true },
                                        //            }}
                                        //            className="form-control"
                                        //            autoComplete="off"
                                        //        ></AvField>
                                        //    </div>
                                        //</div>
                                    }
                                </div>
                                <hr />
                                <div className="form-row">
                                    <div className="col-auto">
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-dark btn-sm" onClick={() => setMode("Edit")}>
                                                <i className="fas fa-upload"></i> {sSaveMode}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <div className="form-group">
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() => toggle("Close")}
                                            >
                                                <i className="fas fa-times"></i> ยกเลิก
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </AvForm>
                        </div>
                    </div>
                </Collapse>
                <div className="row mt-1">
                    <CreateTable
                        Header={header}
                        ItemData={oV_Materials}
                        CreateDataRow={CreateData}
                        createFooterRow={() => createFooter(oV_Materials)}
                        Header2="4"
                        //IsHasBtnDEL={true}
                        //onBtnDelClick={onDeleteData}
                        onClickHeadCB={onClickHeadCB}
                        rowSelected={RowSelected}
                    />
                </div>
                <br />



                <hr />
                <div className="form-row">
                    <div className="col-auto">
                        <a href="admin-Request-to-ImproveStock">
                            <button type="button" className="btn btn-secondary">
                                <i className="fas fa-arrow-left"></i> ย้อนกลับ
                            </button>
                        </a>
                    </div>
                    <div className="col-auto ml-auto">
                        <div className="form-row">
                            <div className="col-auto">
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success" onClick={() => setMode("Save")}        >
                                        <i className="fas fa-check"></i> ขออนุมัติ
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
export default Request_to_ImproveStock_Edit;
