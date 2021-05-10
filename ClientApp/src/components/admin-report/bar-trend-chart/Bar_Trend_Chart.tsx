import { useHistory } from "react-router";
import * as React from 'react';
import { Fragment, useState } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import CreateTable, { CellHeader } from "../../Systems/Table";
import Select from "react-select";
import { AxiosGetJson } from "../../Service/Config/AxiosMethod";
const Controller = 'api/BarTrendChart'


am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_material);
am4core.addLicense("CH208466903");


const Bar_Trend_Chart = () => {

    const [oResult, setResult] = useState([] as any);
    
    const [oTB_Material_Group, setTB_Material_Group] = useState([] as any);

    const [oTB_Material_Category, setTB_Material_Category] = useState([] as any);
    const [oValCate, setValCate] = useState([] as any);

    const [oTB_Materials, setTB_Materials] = useState([] as any);
    const [oValMaterials, setValMaterials] = useState([] as any);

    const [txtSearch, SetTxtSearch] = React.useState({
        StartCreatedDate: "",
        EndCreatedDate: "",
        GroupID: "",
        CategoryID: "",
        MaterialID: ""
        
    });
    const { StartCreatedDate, EndCreatedDate, GroupID, CategoryID, MaterialID } = txtSearch;

    const SearchData = async () => {

        let CategoryID = oValCate.map(a => a.value).toString();
        let MaterialID = oValMaterials.map(a => a.value).toString();


        if (GroupID == "") {
            let result: any = await AxiosGetJson(Controller + "/GetExecStpBarTrendChart1SearchData?StartCreatedDate=" + StartCreatedDate + "&EndCreatedDate=" + EndCreatedDate + "&GroupID=" + GroupID + "&CategoryID=" + CategoryID + "&MaterialID=" + MaterialID);
            setResult(result);
        } else if ((GroupID != "" && CategoryID != "") || MaterialID !="" ) {
            let result: any = await AxiosGetJson(Controller + "/GetExecStpBarTrendChart3SearchData?StartCreatedDate=" + StartCreatedDate + "&EndCreatedDate=" + EndCreatedDate + "&GroupID=" + GroupID + "&CategoryID=" + CategoryID + "&MaterialID=" + MaterialID);
            setResult(result);
        } else {

            let result: any = await AxiosGetJson(Controller + "/GetExecStpBarTrendChart2SearchData?StartCreatedDate=" + StartCreatedDate + "&EndCreatedDate=" + EndCreatedDate + "&GroupID=" + GroupID + "&CategoryID=" + CategoryID + "&MaterialID=" + MaterialID);
            setResult(result);


        }

        
    };

    React.useEffect(() => {

        GetMaterialGroup()
        GetMaterialCate()
        GetMaterial()

    }, []);


    const GetMaterialGroup = async () => {
        let result: any = await AxiosGetJson("api/AdminParcelType" + "/GetMaterial_Group");
        setTB_Material_Group(result);
    }

    const GetMaterialCate = async () => {
        let result: any = await AxiosGetJson("api/InventoryMaterial" + "/GetMaterialCate");
        setTB_Material_Category(result);

    }

    const GetMaterial = async () => {
        let result: any = await AxiosGetJson(Controller + "/GetTB_Materials");
        setTB_Materials(result);

    }
    

    //const GetDropdownGroup = async () => {
    //    let result: any = await AxiosGetJson(
    //        "api/InventoryMaterial/GetMaterialGroup"
    //    );
    //    setoptGroup(result);
    //};






    {
        //** chartdiv1  End
    }



    let chart = am4core.create('chartdiv1', am4charts.XYChart)
    chart.colors.step = 2;



    let title = chart.titles.create();
    title.text = "การจ่ายวัสดุ (จำนวนชิ้น)"
    title.fontSize = 25;
    title.marginBottom = 30;

    chart.legend = new am4charts.Legend()
    chart.legend.position = 'bottom'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'dCreate'
    xAxis.renderer.cellStartLocation = 0.1
    xAxis.renderer.cellEndLocation = 0.9
    xAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());

    yAxis.min = 0;
    yAxis.title.text = "จำนวนชิ้น";

    function createSeries(value, name) {
        let series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'dCreate'
        series.name = name

        series.events.on("hidden", arrangeColumns);
        series.events.on("shown", arrangeColumns);

        let bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.interactionsEnabled = false
        bullet.dy = -10;
        bullet.label.text = '{valueY}'
        bullet.label.fill = am4core.color('#000000')

        return series;
    }


    //-----

    // Create dimension object
    var summary = [] as any
    oResult.forEach(r => {
        const index = summary.findIndex(s => s.dCreate === r.dCreate)
        // Check for existing of date
        // not exists
        if (index === -1) {
            const obj = {}
            obj['dCreate'] = r.dCreate
            obj[r.sGroupName] = r.nTotalAmt
            summary.push(obj)
        }
        // exists
        else {
            // check for existing of property
            // exists
            if (summary[index][r.sGroupName]) {
                summary[index][r.sGroupName] += r.nTotalAmt
            }
            // not exists
            else {
                summary[index][r.sGroupName] = r.nTotalAmt
            }

        }
    })

    chart.data = summary

    if (summary.length > 0) {
        Object.keys(summary[0]).forEach(k => {
            if (k !== 'dCreate') {
                createSeries(k, k)
            }
        })
    }

     //-----

    function arrangeColumns() {

        let series = chart.series.getIndex(0);

        let w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
        if (series!.dataItems.length > 1) {
            let x0 = xAxis.getX(series!.dataItems.getIndex(0)!, "categoryX");
            let x1 = xAxis.getX(series!.dataItems.getIndex(1)!, "categoryX");
            let delta = ((x1 - x0) / chart.series.length) * w;
            if (am4core.isNumber(delta)) {
                let middle = chart.series.length / 2;

                let newIndex = 0;
                chart.series.each(function (series) {
                    if (!series.isHidden && !series.isHiding) {
                        series.dummyData = newIndex;
                        newIndex++;
                    }
                    else {
                        series.dummyData = chart.series.indexOf(series);
                    }
                })
                let visibleCount = newIndex;
                let newMiddle = visibleCount / 2;

                chart.series.each(function (series) {
                    let trueIndex = chart.series.indexOf(series);
                    let newIndex = series.dummyData;

                    let dx = (newIndex - trueIndex + middle - newMiddle) * delta

                    series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                    series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                })
            }
        }
    }


    {
        //** chartdiv1  Start
    }



    {
        //** chartdiv2  Start
    }


    let chart2 = am4core.create('chartdiv2', am4charts.XYChart)
    chart2.colors.step = 2;

    let title2 = chart2.titles.create();
    title2.text = "การจ่ายวัสดุ (มูลค่า)"
    title2.fontSize = 25;
    title2.marginBottom = 30;

    chart2.legend = new am4charts.Legend()
    chart2.legend.position = 'bottom'
    chart2.legend.paddingBottom = 20
    chart2.legend.labels.template.maxWidth = 95


    let xAxis2 = chart2.xAxes.push(new am4charts.CategoryAxis())
    xAxis2.dataFields.category = 'dCreate'
    xAxis2.renderer.cellStartLocation = 0.1
    xAxis2.renderer.cellEndLocation = 0.9
    xAxis2.renderer.grid.template.location = 0;

    let yAxis2 = chart2.yAxes.push(new am4charts.ValueAxis());
    yAxis2.min = 0;
    yAxis2.title.text = "ราคา";

    function createSeries2(value, name) {
        let series = chart2.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'dCreate'
        series.name = name

        series.events.on("hidden", arrangeColumns2);
        series.events.on("shown", arrangeColumns2);

        let bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.interactionsEnabled = false
        bullet.dy = -10;
        bullet.label.text = '{valueY}'
        bullet.label.fill = am4core.color('#000000')

        return series;
    }


    //-----

    // Create dimension object
    var summary2 = [] as any
    oResult.forEach(r => {
        const index = summary2.findIndex(s => s.dCreate === r.dCreate)
        // Check for existing of date
        // not exists
        if (index === -1) {
            const obj = {}
            obj['dCreate'] = r.dCreate
            obj[r.sGroupName] = r.nTotalPrice
            summary2.push(obj)
        }
        // exists
        else {
            // check for existing of property
            // exists
            if (summary2[index][r.sGroupName]) {
                summary2[index][r.sGroupName] += r.nTotalPrice
            }
            // not exists
            else {
                summary2[index][r.sGroupName] = r.nTotalPrice
            }

        }
    })

    chart2.data = summary2

    if (summary2.length > 0) {
        Object.keys(summary2[0]).forEach(k => {
            if (k !== 'dCreate') {
                createSeries2(k, k)
            }
        })
    }

     //-----


    function arrangeColumns2() {

        let series = chart2.series.getIndex(0);

        let w = 1 - xAxis2.renderer.cellStartLocation - (1 - xAxis2.renderer.cellEndLocation);
        if (series!.dataItems.length > 1) {
            let x0 = xAxis2.getX(series!.dataItems.getIndex(0)!, "categoryX");
            let x1 = xAxis2.getX(series!.dataItems.getIndex(1)!, "categoryX");
            let delta = ((x1 - x0) / chart2.series.length) * w;
            if (am4core.isNumber(delta)) {
                let middle = chart2.series.length / 2;

                let newIndex = 0;
                chart2.series.each(function (series) {
                    if (!series.isHidden && !series.isHiding) {
                        series.dummyData = newIndex;
                        newIndex++;
                    }
                    else {
                        series.dummyData = chart2.series.indexOf(series);
                    }
                })
                let visibleCount = newIndex;
                let newMiddle = visibleCount / 2;

                chart2.series.each(function (series) {
                    let trueIndex = chart2.series.indexOf(series);
                    let newIndex = series.dummyData;

                    let dx = (newIndex - trueIndex + middle - newMiddle) * delta

                    series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                    series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                })
            }
        }
    }


    {
        //** chartdiv2  End
    }






    const headerlstDataTest: CellHeader[] = [
        { Sortby: "", SortType: Number, ClassName: "align-middle text-center text-nowrap", label: "ที่", CSSStyle: { width: 1 } },
        { label: "กลุ่มวัสดุ", Sortby: "", SortType: String, ClassName: "align-middle text-left" },
        { label: "จำนวนชิ้น", Sortby: "", SortType: String, ClassName: "align-middle text-center" },
        { label: "มูลค่า", Sortby: "", SortType: String, ClassName: "align-middle text-center" }
    ];

    const [ItemDatalstDataTest, setlstDataTest] = useState([
        {
            nID: 1, sName: "ถ่าน", nNumber: 8, nAmount: "500.00", sNamea: "Example Data 1",
        },
        {
            nID: 2, sName: "กระดาษ", nNumber: 18, nNumberApp: 15, nAmount: "890.00", sUpdate: "01/03/2021", sNamea: "Example Data 2",
        },
        {
            nID: 3, sName: "ปากกา", nNumber: 12, nNumberApp: 5, nAmount: "760.00", sUpdate: "01/03/2021", sNamea: "Example Data 3",
        },
    ]);

    const CreateDataRowlstDataTest = (o, Subindex) => {
        return (
            <tr key={Subindex}>
                <td className="align-middle text-center" style={{ width: "1px" }}>{Subindex + 1}</td>
                <td className="align-middle text-left" style={{ width: "5px" }}> {o.sGroupName}</td>
                <td className="align-middle text-right" style={{ width: "5px" }}>{o.nTotalAmt}</td>
                <td className="align-middle text-right" style={{ width: "5px" }}>{o.nTotalPrice}</td>

            </tr>
        )
    }

    {
        //** lstDataTest  End
    }





    {
        //** lstDataTest2  Start
    }


    const headerlstDataTest2: CellHeader[] = [
        { Sortby: "", SortType: Number, ClassName: "align-middle text-center text-nowrap", label: "ที่", CSSStyle: { width: 1 } },
        { label: "ประเภทวัสดุ", Sortby: "", SortType: String, ClassName: "align-middle text-left" },
        { label: "จำนวนชิ้น", Sortby: "", SortType: String, ClassName: "align-middle text-center" },
        { label: "มูลค่า", Sortby: "", SortType: String, ClassName: "align-middle text-center" }

    ];


    const [ItemDatalstDataTest2, setItemDatalstDataTest2] = useState([
        {
            nID: 1, sName: "ถ่านไฟฉาย ขนาด C 1.5 V.", nNumber: 5, nAmounta: "100.00", nAmount: "500.00",
        },
        {
            nID: 2, sName: "ถ่านไฟฉาย ขนาด D 1.5 V.ธรรมดา", nNumber: 18, nAmounta: "49.50", nAmount: "890.00",
        },
        {
            nID: 3, sName: "ถ่านไฟฉาย ขนาด 9 V. ALKALINE", nNumber: 12, nAmounta: "63.50", nAmount: "760.00",
        },
    ]);

    const CreateDataRowlstDataTest2 = (o, Subindex) => {
        return (
            <tr key={Subindex}>
                <td className="align-middle text-center" style={{ width: "1px" }}>{Subindex + 1}</td>
                <td className="align-middle text-left" style={{ width: "5px" }}> {o.sName}</td>
                <td className="align-middle text-center" style={{ width: "5px" }}>ก้อน</td>
                <td className="align-middle text-center" style={{ width: "5px" }}>ถ่าน</td>


            </tr>
        )
    }


    const headerlstDataTest3: CellHeader[] = [
        { Sortby: "", SortType: Number, ClassName: "align-middle text-center text-nowrap", label: "ที่", CSSStyle: { width: 1 } },
        { label: "รหัสวัสดุ", Sortby: "", SortType: String, ClassName: "align-middle text-left" },
        { label: "ชื่อวัสดุ", Sortby: "", SortType: String, ClassName: "align-middle text-center" },
        { label: "หน่วยนับ", Sortby: "", SortType: String, ClassName: "align-middle text-center" },
        { label: "ประเภทวัสดุ", Sortby: "", SortType: String, ClassName: "align-middle text-center" },
        { label: "ราคาต่อหน่วย", Sortby: "", SortType: String, ClassName: "align-middle text-center" },
        { label: "จำนวนชิ้น", Sortby: "", SortType: String, ClassName: "align-middle text-center" },
        { label: "มูลค่า", Sortby: "", SortType: String, ClassName: "align-middle text-center" }
    ];


    const CreateDataRowlstDataTest3 = (o, Subindex) => {
        return (
            <tr key={Subindex}>
                <td className="align-middle text-center" style={{ width: "1px" }}>{Subindex + 1}</td>
                <td className="align-middle text-left" style={{ width: "5px" }}> {o.sName}</td>
                <td className="align-middle text-center" style={{ width: "5px" }}>ก้อน</td>
                <td className="align-middle text-center" style={{ width: "5px" }}>ถ่าน</td>
                <td className="align-middle text-center" style={{ width: "1px" }}>{Subindex + 1}</td>
                <td className="align-middle text-left" style={{ width: "5px" }}> {o.sName}</td>
                <td className="align-middle text-center" style={{ width: "5px" }}>ก้อน</td>
                <td className="align-middle text-center" style={{ width: "5px" }}>ถ่าน</td>
               

            </tr>
        )
    }

    {
        //** lstDataTest2  End
    }

 
    //const Test = (o: any) => {

    //    let result = o.map(a => a.value).toString();

          
       
    
       
       

    //}

    console.log("TxtSearch", txtSearch)
    console.log("ValCate", oValCate)
    
    return (
        <Fragment>
            <AvForm>

                <div className="row">
                    <div className="form-group col-md-6">
                        <b>วันที่เริ่มต้น </b><span className="text-danger">•</span>
                        <input
                            className="form-control col-md-6"
                            placeholder="วันที่เริ่มต้น"
                            type="date"
                            onChange={(e) => {
                                SetTxtSearch({
                                    ...txtSearch,
                                    StartCreatedDate: e.target.value,
                                });
                            }}
                            required
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <b>วันที่สิ้นสุด </b><span className="text-danger">•</span>
                        <input
                            className="form-control col-md-6"
                            placeholder="วันที่สิ้นสุด"
                            type="date"
                            onChange={(e) => {
                                SetTxtSearch({
                                    ...txtSearch,
                                    EndCreatedDate: e.target.value,
                                });
                            }}
                            required
                        />
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <b>กลุ่มวัสดุ</b> 
                            <AvField
                                type="select"
                                name="sGroupID"
                                className="form-control"
                                value={"0"}
                                onChange={(e) => {
                                    SetTxtSearch({
                                        ...txtSearch,
                                        GroupID: e.target.value,
                                    });
                                }}
                            >
                                <option value="" className="dropdown-item" >- กลุ่มวัสดุ -</option>
                                {
                                    oTB_Material_Group.map((p) => {
                                        return (
                                            <option value={p.sGroupID} className="dropdown-item" >{p.sName}</option>
                                        )
                                    })

                                }
                            </AvField>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group ">
                            <b>ประเภทวัสดุ</b> 
                            <Select
                                isClearable
                                isMulti
                                options={oTB_Material_Category}
                                closeMenuOnSelect={true}
                                placeholder="- เลือกประเภทวัสดุ -"
                                errorMessage="กรุณาระบุประเภทวัสดุ"
                                value={oValCate}
                                onChange={(value) => {
                                    setValCate(value);

                                }}
                            />
                            {
                                //<AvField
                                //    type="select"
                                //    name="type"
                                //    disabled={true}
                                //    className="form-control"
                                //    value={"0"}
                                //>
                                //    <option value="0"></option>
                                //    <option value="1">ถ่านไฟฉาย</option>
                                //    <option value="2">กระดาษ</option>
                                //    <option value="3">ปากกา</option>
                                //</AvField>

                            }
                            
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <b>วัสดุ</b> 
                            <Select
                                isClearable
                                isMulti
                                options={oTB_Materials}
                                closeMenuOnSelect={true}
                                placeholder="- เลือกวัสดุ -"
                                errorMessage="กรุณาระบุกลุ่มวัสดุ"
                                value={oValMaterials}
                                onChange={(value) => {
                                    setValMaterials(value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group ">
                            <b>หน่วยงาน</b> 
                            <AvField
                                type="select"
                                name="type"
                                disabled={false}
                                className="form-control"
                                value={"0"}
                            >
                                <option value="0"></option>
                                <option value="1">คอก.</option>
                                <option value="2">คยก.6</option>
                                <option value="3">คยก.5</option>
                                <option value="4">ครส.</option>
                                <option value="5">คฟร.</option>

                            </AvField>
                        </div>
                    </div>
                </div>
                <div className="form-row justify-content-md-center" >

                    <div className="col-auto">
                        <button type="submit" className="btn btn-dark" onClick={() => SearchData()}>
                            <i className="fas fa-search"></i> ค้นหา
                         </button>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-danger">
                            <i className="far fa-file-pdf"></i> PDF
                        </button>
                    </div>


                    <div className="col-auto " >
                        <button type="button" className="btn btn-success">
                            <i className="far fa-file-excel"></i> Excel
                        </button>
                    </div>


                </div>




                <div className="row">
                    <div className="form-group col-md-6">

                        <div id="chartdiv1" style={{ width: "100%", height: "500px" }}></div>
                    </div>
                    <div className="form-group col-md-6">

                        <div id="chartdiv2" style={{ width: "100%", height: "500px" }}></div>
                    </div>

                </div>

                {

                    //<div className="row">
                    //    <div className="form-group col-md-6">
                    //        <div id="chartdiv3" style={{ width: "100%", height: "500px" }}></div>
                    //    </div>
                    //    <div className="form-group col-md-6">

                    //        <div id="chartdiv4" style={{ width: "100%", height: "500px" }}></div>
                    //    </div>
                    //</div>
                }
                

                <div className="row mt-1">
                    <CreateTable
                        Header={headerlstDataTest}
                        ItemData={oResult}
                        CreateDataRow={CreateDataRowlstDataTest}
                    />
                </div>

                <div className="row mt-1">
                    <CreateTable
                        Header={headerlstDataTest2}
                        ItemData={ItemDatalstDataTest2}
                        CreateDataRow={CreateDataRowlstDataTest2}
                    />
                </div>

                <div className="row mt-1">
                    <CreateTable
                        Header={headerlstDataTest3}
                        ItemData={ItemDatalstDataTest2}
                        CreateDataRow={CreateDataRowlstDataTest3}
                    />
                </div>

            </AvForm>
        </Fragment>
    );

};
export default Bar_Trend_Chart;



