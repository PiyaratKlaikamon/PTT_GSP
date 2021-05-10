import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Badge, Button, Card, CardBody, Collapse, CustomInput } from 'reactstrap';
import { parse } from "query-string"
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import CreateTable, { CellHeader } from '../../Systems/Table';
import './Disbursement_Report.css';

am4core.addLicense("CH208466903");
const _Disbursement = (props) => {
    const history = useHistory();
    const [lstDataRow, setLstDataRow] = React.useState([] as any);
    const [rowSelected, setRowSelected] = React.useState([] as any);
    const [txtSearch, SetTxtSearch] = React.useState({
        sFullname: "",
        sIsActive: "",
    });
    const headerT_1: CellHeader[] = [
        { label: "ที่", Sortby: "", SortType: Number, ClassName: "align-middle text-center", CSSStyle: { width: "2%" } },
        { label: "ประเภทวัสดุ", Sortby: "sFullname", SortType: String, ClassName: "align-middle" },
        { label: "จำนวน", Sortby: "dCreateData", SortType: String, ClassName: "align-middle text-center" },
        { label: "ราคา", Sortby: "nAmount", SortType: String, ClassName: "align-middle text-center" },
    ];
    const headerT_2: CellHeader[] = [
        { label: "ที่", Sortby: "", SortType: Number, ClassName: "align-middle text-center text-nowrap", CSSStyle: { width: 110 } },
        { label: "ชื่อวัสดุ", Sortby: "sParcelanme", SortType: String, ClassName: "align-middle" },
        { label: "หน่วย", Sortby: "sUnit", SortType: String, ClassName: "align-middle text-center" },
        { label: "ราคาต่อหน่วย", Sortby: "sReceivedamount", SortType: String, ClassName: "align-middle text-center" },
        { label: "จำนวน", Sortby: "sReceivedamount", SortType: String, ClassName: "align-middle text-center" },
        { label: "ราคา", Sortby: "sPrice", SortType: String, ClassName: "align-middle text-center" },
    ];

    var onDeleteClick = () => {

    }
    var onSelectedRow = (id: number) => {
        setRowSelected([...rowSelected, id])
    }
    var onDeSelectedRow = (id: number) => {
        var index = rowSelected.indexOf(id)
        if (index !== -1) {
            rowSelected.splice(index, 1);
            setRowSelected([...rowSelected]);
        }
    }
    const [lstDataT_1, setlstData] = useState([
        { nNO: 1, sParceltype: "ถ่าน", sNumber: "5", sPrice: "500.00" },
        { nNO: 2, sParceltype: "กระดาษ", sNumber: "18", sPrice: "890.00" },
        { nNO: 3, sParceltype: "ปากกา", sNumber: "12", sPrice: "760.00" },
    ]);
    const CreateDataRowT_1 = (o: any, i: any) => {
        return (
            <Fragment>
                <tr key={i}>
                    <td className="text-center">{o.nNO}</td>
                    <td className="text-center">{o.sParceltype}</td>
                    <td className="text-center">{o.sNumber}</td>
                    <td className="text-center">{o.sPrice}</td>
                </tr>
            </Fragment>
        )
    }
    const [collapses, setCollapse] = useState(Array(lstDataT_1.length).fill(false))

    const [lstDataT_2, setsublstData] = useState([
        { nNO: 1, sParcelName: "ถ่านไฟฉาย ขนาด C 1.5 V.", sUnit: "ก้อน", sUnitprice: "100.00", sNumber: "5", sPrice: "500.00" },
        { nNO: 2, sParcelName: "ถ่านไฟฉาย ขนาด D 1.5 V.ธรรมดา", sUnit: "ก้อน", sUnitprice: "49.50", sNumber: "18", sPrice: "890.00" },
        { nNO: 3, sParcelName: "ถ่านไฟฉาย ขนาด 9 V. ALKALINE", sUnit: "ก้อน", sUnitprice: "63.50", sNumber: "12", sPrice: "760.00" },

    ]);
    const CreateDataRowT_2 = (o: any, i: any) => {
        return (
            <Fragment>
                <tr key={i}>
                    <td className="text-center">{o.nNO}</td>
                    <td className="text-center">{o.sParcelName}</td>
                    <td className="text-center">{o.sUnit}</td>
                    <td className="text-center">{o.sUnitprice}</td>
                    <td className="text-center">{o.sNumber}</td>
                    <td className="text-center">{o.sPrice}</td>
                </tr>
            </Fragment>
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
    const SearchData = async () => { };
    var onClickHeadCB = (e: any, currentData: any) => { }
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

    useEffect(() => {
        PIEcharts();
    }, []);

    const PIEcharts = () => {
        var chart = am4core.create("Pie_ParcelgroupID", am4charts.PieChart);
        chart.legend = new am4charts.Legend();
        chart.data = [{
            "country": "วัสดุสำนักงาน",
            "litres": "55%"
        }, {
            "country": "วัสดุสำหรับช่าง",
            "litres": "31%"
        }, {
            "country": "ของใช้ทั่วไป",
            "litres": "14%"
        }
        ];

        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeOpacity = 1;

        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

        chart.hiddenState.properties.radius = am4core.percent(0);


    }

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

                        </div>
                        <div className="col-auto">

                        </div>
                        <div className="col-auto">
                            <div className="form-group">
                                <select className="custom-select form-control" onChange={(e) => { SetTxtSearch({ ...txtSearch, sIsActive: e.target.value, }); }} >
                                    <option value="">หน่วยงาน</option>
                                    <option value="1">พนักงาน ปตท.</option>
                                    <option value="2">พนักงานภายนอก</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="form-group">
                                <select className="custom-select form-control" onChange={(e) => { SetTxtSearch({ ...txtSearch, sIsActive: e.target.value, }); }} >
                                    <option value="">สถานะ</option>
                                    <option value="1">ใช้งาน</option>
                                    <option value="2">ไม่ใช้งาน</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="form-group">
                                <button type="button" className="btn btn-dark" onClick={() => SearchData()} > <i className="fas fa-search"></i></button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                        <div className="form-group">
                            <input type="date" className="form-control" placeholder="วันที่เริ่มต้น" onChange={(e) => SetTxtSearch({ ...txtSearch, sFullname: e.target.value, })} onKeyPress={(e) => { e.key === "Enter" && SearchData(); }} required />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                        <div className="form-group">
                            <input type="date" className="form-control" placeholder="วันที่สิ้นสุด" onChange={(e) => SetTxtSearch({ ...txtSearch, sFullname: e.target.value, })} onKeyPress={(e) => { e.key === "Enter" && SearchData(); }} required />
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-12">
                            <b>จำนวนวัสดุ</b>
                        </div>
                        <div className="form-group">
                                <div id="Pie_ParcelgroupID"></div>
                            </div>
                    </div>
                    <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                        <div className="form-group">
                            <div id="Pie_ParcelgroupID"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-1">
                <CreateTable
                    Header={headerT_1}
                    ItemData={lstDataT_1}
                    CreateDataRow={CreateDataRowT_1}
                    onBtnDelClick={onDeleteClick}
                    onClickHeadCB={onClickHeadCB}
                    rowSelected={rowSelected}
                />
            </div>
            <div className="row mt-1">
                <CreateTable
                    Header={headerT_2}
                    ItemData={lstDataT_2}
                    CreateDataRow={CreateDataRowT_2}
                    onBtnDelClick={onDeleteClick}
                    onClickHeadCB={onClickHeadCB}
                    rowSelected={rowSelected}
                />
            </div>
        </Fragment >
    );
};
export default _Disbursement;

