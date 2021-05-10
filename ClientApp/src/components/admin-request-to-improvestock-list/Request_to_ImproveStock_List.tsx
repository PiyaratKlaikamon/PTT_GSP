import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AvForm } from "availity-reactstrap-validation";
import * as React from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import { Button, Card, CardBody, Collapse, CustomInput } from 'reactstrap';
import { AxiosGetJson } from '../Service/Config/AxiosMethod';
import ThaiDatePicker from '../ST_Handlers/ThaiDatePicker';
import CreateTable, { CellHeader } from '../Systems/Table';

const Controller = 'api/AdminRequestToImproveStock'

const Request_to_ImproveStock_List = () => {
    const [oV_Materials, setV_Materials] = useState([] as any);
    const [sModeButton, setsModeButton] = useState("");
    const [oSelect, setoSelect] = useState([]);

    const [txtSearch, SetTxtSearch] = React.useState({
        stxtSearch: "",
        sStepID: "",
        dStartDate: undefined as (Date | undefined),
        dEndDate: undefined as (Date | undefined),
    });
    const SearchData = async () => {
        let sStartDate = txtSearch.dStartDate == undefined ? "" : DateFormat(txtSearch.dStartDate);
        let sEndDate = txtSearch.dEndDate == undefined ? "" : DateFormat(txtSearch.dEndDate);

        let result: any = await AxiosGetJson(Controller + "/Request_to_ImproveStock_SearchData?sRequestNo=" + txtSearch.stxtSearch + "&sStepID=" + txtSearch.sStepID + "&sStartDate=" + sStartDate + "&sEndDate=" + sEndDate);
        setV_Stock_Update(result);

    };
    const DateFormat = (today: any) => {
        let day = today.getDate() < 10 ? ("0" + today.getDate().toString()) : today.getDate().toString();
        let month = (today.getMonth() + 1) < 10 ? ("0" + (today.getMonth() + 1).toString()) : (today.getMonth() + 1).toString();
        let date = today.getFullYear() + "/" + month + "/" + day;

        return date;
    }
    React.useEffect(() => {

        GetDataOnPageLoad()

    }, []);

    const GetDataOnPageLoad = async () => {

        let result: any = await AxiosGetJson(Controller + "/GetStock_Update_List?nRequestID=0");
        setV_Stock_Update(result);
    }
    const GetV_Materials = async (nRequestID: number) => {
        let result_v_mt: any = await AxiosGetJson(Controller + "/GetV_Materials?sRequestID=" + nRequestID.toString());
        setV_Materials(result_v_mt);
    }



    const [oV_Stock_Update, setV_Stock_Update] = useState([] as any);

    const header: CellHeader[] = [
        {
            label: "",
            Sortby: "",
            ClassName: "align-middle",
            SortType: Number,
            CSSStyle: { width: 50 },
        },
        {
            label: "",
            Sortby: "",
            ClassName: "align-middle",
            SortType: Number,
            CSSStyle: { width: 50 },

        },

        {
            label: "เลขที่ใบขอปรับปรุง",
            Sortby: "",
            ClassName: "align-middle text-center",
            SortType: Number,
        },
        {
            label: "เหตุผลที่ขอปรับปรุง",
            Sortby: "",
            ClassName: "align-middle text-left",
            SortType: Number,
        },
        {
            label: "ผู้สร้างรายการ",
            Sortby: "",
            ClassName: "align-middle t",
            SortType: String,
            CSSStyle: { width: 210 },
        },
        {
            label: "วันที่ปรับปรุง",
            Sortby: "",
            ClassName: "align-middle text-center",
            SortType: String,
            CSSStyle: { width: 210 },
        },
        {
            label: "หมายเหตุ/เหตุผล",
            Sortby: "",
            ClassName: "align-middle text-center",
            SortType: String,
            CSSStyle: { width: 210 },
        },
    ];
    const [RowSelected, setRowSelected] = useState([] as any);
    const onSelectedRow = (id: number,o:any) => {

        const remarkElem = document.querySelector(`#input_${id}`)
        if (remarkElem) {
            remarkElem.removeAttribute("Disabled")
        }
        setRowSelected([...RowSelected, id]);
    };
    const onDeSelectedRow = (nRequestID: number, o: any, id) => {



        let nNumber = document.getElementById("#input_${" + nRequestID + "}`");
        console.log("nNumber", nNumber)
        //document.getElementById("#input_${"+nRequestID+"}`") = "Johnny Bravo";




        let remarkElem = document.querySelector(`#input_${nRequestID}`)
        if (remarkElem) {
            remarkElem.setAttribute("Disabled", "true");
        }

        let index = RowSelected.indexOf(nRequestID);
        if (index !== -1) {
            RowSelected.splice(index, 1);
            setRowSelected([...RowSelected]);
        }
    };

    const toggle = (i: number) => {

        let newCollapse = collapses.slice()
        newCollapse[i] = !newCollapse[i]
        setCollapse(newCollapse)


    }
    const createFooter = (o: any) => {
        const sumtotalminus = o.reduce((a, c) => a + c.nTotalPrice_Minus, 0)
        const sumtotalplus = o.reduce((a, c) => a + c.nTotalPrice_Plus, 0)
        return (

            o.length != 0 ?
                <tfoot>
                    <tr className="bg-light" >
                        <td colSpan={6} className="text-center" > <b>ราคารวม</b></td>
                        <td className="text-right "> <b>{sumtotalplus}</b></td>
                        <td className="text-right "> <b>{sumtotalminus} </b></td>
                        <td className="text-right "> </td>
                    </tr>
                </tfoot>
                : null


        )
    }

    console.log("oSelect", oSelect)
    console.log("RowSelected", RowSelected)
    console.log("oV_Stock_Update", oV_Stock_Update)
    
    
    const headerMt: CellHeader[] = [
        {
            Sortby: "",
            SortType: Number,
            label: "ที่",
            Rowspan: 2,
            ClassName: "align-middle text-center text-nowrap",
            CSSStyle: { width: 1 },
        },
        {
            label: "รหัสวัสดุ",
            Sortby: "",
            ClassName: "align-middle text-center text-nowrap",
            SortType: Number,
            Rowspan: 2,
            CSSStyle: { width: 1 },
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
            CSSStyle: { width: 1 },
        },
        {
            label: "หน่วยนับ",
            Sortby: "",
            ClassName: "align-middle text-center text-nowrap",
            SortType: Number,
            Rowspan: 2,
            CSSStyle: { width: 1 },
        },
        {
            label: "ราคาต่อชิ้น",
            Sortby: "",
            ClassName: "align-middle text-center text-nowrap",
            SortType: Number,
            Rowspan: 2,
            CSSStyle: { width: 1 },
        },

        {
            Sortby: "",
            SortType: String,
            label: "ราคารวม",
            Colspan: 2,
            ClassName: "align-middle text-center text-nowrap",
            CSSStyle: { width: 110 },
        },
        {
            label: "สาเหตุ",
            Sortby: "",
            ClassName: "align-middle text-left ",
            Rowspan: 2,
            SortType: Number,
        },
    ];


    const CreateDataMt = (o: any, i: any) => {
        return (
            <React.Fragment key={i}>
                <tr >
                    <td className="align-middle text-center text-nowrap">{i + 1}</td>
                    <td className="align-middle text-center text-nowrap">{o.sMaterialCode}</td>
                    <td className="align-middle text-nowrap">{o.sMaterialName}</td>
                    <td className="align-middle text-right text-nowrap">{o.nAmount} </td>
                    <td className="align-middle text-center text-nowrap">{o.sUnitName}</td>
                    <td className="align-middle text-right text-nowrap">{o.nPrice}</td>
                    <td className="align-middle text-right  text-nowrap">   {o.nTotalPrice_Plus == 0 ? null : o.nTotalPrice_Plus} </td>
                    <td className="align-middle text-right text-nowrap "> {o.nTotalPrice_Minus == 0 ? null : o.nTotalPrice_Minus} </td>
                    <td className="align-middle ">{o.sReason}</td>
                </tr>

            </React.Fragment>
        );
    };
    const [collapses, setCollapse] = useState(Array(oV_Stock_Update.length).fill(false))

    const CreateData = (o: any, i: any) => {
        return (
            <React.Fragment key={i}>
                <tr >

                    <td className="align-middle text-center">
                        <CustomInput
                            type="checkbox"
                            id={`cbBody_${o.nRequestID}`}
                            label={""}
                            onChange={(e: any) => {
                                let el = e.target;
                                if (el.checked) {
                                    onSelectedRow(o.nRequestID,o);
                                } else {
                                    onDeSelectedRow(o.nRequestID,o,i);
                                }
                            }}
                            checked={RowSelected.indexOf(o.nRequestID) !== -1}
                        />
                    </td>

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


                    <td className="align-middle text-center">{o.sRequestNo}</td>
                    <td className="align-middle">{o.sReason}</td>
                    <td className="align-middle">{o.nCreateBy}</td>
                    <td className="align-middle text-center">{o.sUpdate}</td>
                    <td className="align-middle text-center">
                        <input className="form-control  form-control-sm"
                            id={`input_${o.nRequestID}`}
                            name={`input_${o.nRequestID}`}
                            value={o.sNote}
                            onChange={e => {  }}
                            disabled={true}
                            type="text"
                            placeholder="กรณี ส่งกลับแก้ไข"
                        /></td>
                </tr>

                <tr >
                    <td colSpan={8} className="p-0">
                        <Collapse isOpen={collapses[i]} key={i}>
                            <Card>
                                <CardBody>

                                    <CreateTable
                                        Header={headerMt}
                                        ItemData={o.oV_Materials}
                                        CreateDataRow={CreateDataMt}
                                        createFooterRow={() => createFooter(o.oV_Materials)}
                                        Header2="4"
                                        defaultFontSize={true}
                                    //IsHasBtnDEL={true}
                                    //onBtnDelClick={onDeleteData}
                                    //onClickHeadCB={onClickHeadCB}
                                    //rowSelected={RowSelected}
                                    />
                                </CardBody>
                            </Card>

                        </Collapse>
                    </td>
                </tr>
            </React.Fragment>
        );
    };


    const Approval = () => {


        if (sModeButton == "APP") {

        } else {


        }

    }

    const Rej = () => {

        if (sModeButton == "APP") {

        } else {


        }

    }

    return (
        <Fragment>
            <div className="form-row justify-content-end">
                <div className="col-auto">
                    <div className="form-group">
                        <input
                            className="form-control form-control-sm"
                            placeholder="เลขที่ใบขอปรับปรุง"
                            type="text"
                            onChange={(e) => {
                                SetTxtSearch({
                                    ...txtSearch,
                                    stxtSearch: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="col-auto">
                    <div className="form-group">
                        <ThaiDatePicker
                            value={txtSearch.dStartDate}
                            small={true}
                            placeholder="วันที่เริ่มต้น"
                            onChange={(value) => {
                                SetTxtSearch({
                                    ...txtSearch,
                                    dStartDate: value,
                                });

                            }} />

                        {
                            //<input
                            //    className="form-control form-control-sm"
                            //    placeholder="วันที่เริ่มต้น"
                            //    type="date"
                            //    onChange={(e) => {
                            //        SetTxtSearch({
                            //            ...txtSearch,
                            //            sStartDate: e.target.value,
                            //        });
                            //    }}
                            ///>
                        }
                    </div>
                </div>
                <div className="col-auto">
                    <div className="form-group">
                        <ThaiDatePicker
                            value={txtSearch.dEndDate}
                            small={true}
                            placeholder="วันที่สิ้นสุด"
                            onChange={(value) => {
                                SetTxtSearch({
                                    ...txtSearch,
                                    dEndDate: value,
                                });
                            }} />
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
            <div className="row mt-1">
                <CreateTable
                    Header={header}
                    ItemData={oV_Stock_Update}
                    CreateDataRow={CreateData}
                    IsHasBtnDEL={false}
                //onBtnDelClick={onDeleteAdminGroup}
                //onClickHeadCB={onClickHeadCB}
                //rowSelected={RowSelected}
                />


            </div>
            <div className="form-row" >

                <div className="col-auto">
                    <button type="submit" name="App" className="btn btn-success btn-sm" onClick={() => Approval()}>
                        <i className="fas fa-check"></i> อนุมัติคำขอ
                         </button>
                </div>
                <div className="col-auto">
                    <button type="submit" name="Rej" className="btn btn-warning btn-sm" onClick={() => Rej()}>
                        <i className="fa fa-share fa-flip-horizontal"></i> ส่งกลับแก้ไข
                        </button>
                </div>
            </div>
        </Fragment>
    );
};
export default Request_to_ImproveStock_List;
