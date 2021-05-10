import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Card, CardBody, Collapse, FormGroup, } from "reactstrap";
import CreateTable, { CellHeader } from "../../Systems/Table";
import { Typeahead } from 'react-bootstrap-typeahead'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { AxiosBlobJson, AxiosGetJson, AxiosPostJson } from "../../Service/Config/AxiosMethod";
import moment from "moment";

const Controller = 'api/Withdrawal_history';
const _Withdrawal_history = (props) => {
    const history = useHistory();
    const [lstStep, setStep] = React.useState([] as any);
    const [lstReason, setReason] = React.useState([] as any);
    const [sEmployeeID, setsEmployeeID] = useState("");
    const [lstAutoCompleted, setlstAutoCompleted] = useState([] as any);
    const header: CellHeader[] = [
        { label: "", Sortby: "", SortType: false, ClassName: "align-middle text-center", CSSStyle: { width: 1 }, },
        { label: "เลขที่ใบขอเบิก", Sortby: "", SortType: false, ClassName: "align-middle text-center text-nowrap", CSSStyle: { width: 110 }, },
        { label: "ผู้ขอเบิก", Sortby: "", SortType: false, ClassName: "align-middle text-center", },
        { label: "เหตุผลในการเบิก", Sortby: "", SortType: false, ClassName: "align-middle text-center", },
        { label: "วันที่เบิก", Sortby: "", SortType: false, ClassName: "align-middle text-center", },
        { label: "จำนวนเงิน", Sortby: "", SortType: false, ClassName: "align-middle text-right", },
        { label: "หน่วยงาน", Sortby: "", SortType: false, ClassName: "align-middle text-center", },
        { label: "สถานะ", Sortby: "", SortType: false, ClassName: "align-middle text-center", },
    ];
    const subheader: CellHeader[] = [
        { label: "ที่", Sortby: "", SortType: false, ClassName: "align-middle text-center text-nowrap", CSSStyle: { width: 1 } },
        { label: "รหัสวัสดุ", Sortby: "", SortType: false, ClassName: "align-middle text-center", },
        { label: "ชื่อวัสดุ", Sortby: "", SortType: false, ClassName: "align-middle text-center", },
        { label: "จำนวนขอเบิก", Sortby: "", SortType: false, ClassName: "align-middle text-right", },
        { label: "จำนวนที่ได้รับ", Sortby: "", SortType: false, ClassName: "align-middle text-right", },
        { label: "หน่วยนับ", Sortby: "", SortType: false, ClassName: "align-middle text-center", },
        { label: "ราคารวม", Sortby: "", SortType: false, ClassName: "align-middle text-right", },
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
        setlstData(result.data.Withdrawal_history_H);
        setStep(result.data.TM_Step_Request);
        setReason(result.data.TB_Reason);
        setlstAutoCompleted(result.data.lstAutoCompleted)
    }
    var onDeleteClick = () => { };
    const CreateDataRow = (o: any, i: any) => {
        return (
            <Fragment>
                <tr key={i}>
                    <td className="align-middle text-center">
                        <Button
                            size="sm"
                            type="button"
                            color="link"
                            onClick={() => toggle(i)}
                        >
                            <FontAwesomeIcon icon={["far", "plus-square"]} />
                        </Button>
                    </td>
                    <td className="align-middle text-center">{o.sRequestNo}</td>
                    <td className="align-middle text-center">{o.sFullName}</td>
                    <td className="align-middle text-center">{o.sReasonName}</td>
                    <td className="align-middle text-center">{o.dCreate}</td>
                    <td className="align-middle text-right">{o.nRequest_TotalPrice}</td>
                    <td className="align-middle text-center">{o.sOrgID}</td>
                    <td className="align-middle text-center">{o.StepName}</td>
                </tr>
                <tr>
                    <td colSpan={10} className="p-0">
                        <Collapse isOpen={collapses[i]} key={i}>
                            <Card className="border-0">
                                <CardBody>
                                    <div>
                                        <CreateTable
                                            Header={subheader}
                                            defaultFontSize={true}
                                            ItemData={o.sub_List}
                                            CreateDataRow={SubCreateDataRow}
                                        />
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
        return (
            <tr key={Subindex}>
                <td className="align-middle text-center">{Subindex + 1 + "."}</td>
                <td className="align-middle text-center">{obj.sMaterialCode}</td>
                <td className="align-middle text-center">{obj.sMaterialName}</td>
                <td className="align-middle text-right">{obj.nRequest_Amount}</td>
                <td className="align-middle text-right">{obj.nPay_Amount}</td>
                <td className="align-middle text-center">{obj.sUnitName}</td>
                <td className="align-middle text-right">{obj.nPay_TotalPrice}</td>
            </tr>
        );
    };
    const ChTypeahead = (data) => {
        if (data.length != 0) {
            setsEmployeeID(data[0].sEmployeeID)
        }
    };
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
            setlstData(result.data.Withdrawal_history_H);
        }
    };
    var onClickHeadCB = (e: any, currentData: any) => { };

    const ExportExce = async () => {
        let fileName = "Withdrawal_history" + moment(new Date()).format("ddMMyyyyHHmm") + ".xlsx";
        let result: any = await AxiosBlobJson(Controller + "/Export_Withdrawal");
        saveExcel(result.data, fileName)
    }
    const saveExcel = (result, fileName) => {
        const url = window.URL.createObjectURL(new Blob([result]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
    return (
        <Fragment>
            <AvForm onSubmit={SearchData} >
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <b>เลขที่ใบขอเบิก</b>
                            <AvField type="text" name="sRequestNo" id="sRequestNo" className="form-control" autoComplete="off" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <b>รหัส / ชื่อผู้ขอเบิก</b>
                            <div className="input-group">
                                <Typeahead
                                    filterBy={['MaterialCode']}
                                    id="autoCompletedID"
                                    options={lstAutoCompleted}
                                    placeholder="ค้นหาด้วย รหัส , ชื่อผู้ขอเบิก"
                                    name="autoCompletedID"
                                    onChange={e => { ChTypeahead(e) }}
                                    minLength={0} />
                                <div className="input-group-append">
                                    <span className="input-group-text" id="basic-addon2"><i className="fas fa-search"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <b>หน่วยงาน</b>
                            <AvField type="select" name="sOrgID" className="form-control">
                                <option value="">- หน่วยงาน -</option>
                                <option value="1">คอก.</option>
                                <option value="2">คยก.6</option>
                                <option value="3">คยก.5</option>
                                <option value="4">ครส.</option>
                                <option value="5">คฟร.</option>
                            </AvField>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <b>สถานะ</b>
                            <AvField type="select" name="StepID" className="form-control" >
                                <option value="">- สถานะ -</option>
                                {
                                    lstStep.map((el, indx) => {
                                        return (
                                            <option value={el.nStepID + ""}>{el.sName}</option>
                                        );
                                    })
                                }
                            </AvField>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <b>เหตุผลในการเบิก</b>
                            <AvField type="select" name="ReasonID" className="form-control" >
                                <option value="">- เหตุผลในการเบิก -</option>
                                {
                                    lstReason.map((el, indx) => {
                                        return (
                                            <option value={el.nReasonID + ""}>{el.sName}</option>
                                        );
                                    })
                                }
                            </AvField>
                        </div>
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-auto">
                        <div className="form-group">
                            <FormGroup>
                                <Button className="btn btn-dark" ><i className="fas fa-search"></i> ค้นหา </Button>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="form-group">
                            <button type="button" className="btn btn-success" onClick={ExportExce}> <i className="fas fa-file-excel"></i> Excel </button>
                        </div>
                    </div>
                </div>
            </AvForm>
            <div className="row mt-1">
                <CreateTable
                    Header={header}
                    ItemData={lstData_H}
                    CreateDataRow={CreateDataRow}
                    onBtnDelClick={onDeleteClick}
                    onClickHeadCB={onClickHeadCB} />
            </div>
        </Fragment>
    );
};
export default _Withdrawal_history;
