import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, FormGroup, Input } from 'reactstrap';
import { AxiosPostJson } from '../Service/Config/AxiosMethod';
import CreateTable, { CellHeader } from '../Systems/Table';
import moment from 'moment';
import { BoxMsg, DialogDelete, Encrypt, Responsestart, Sweetalert } from '../Systems/SystemComponent';
import { AvForm, AvInput } from 'availity-reactstrap-validation';
import ThaiDatePicker from '../ST_Handlers/ThaiDatePicker';

const Controller = 'api/Good_Receive';
const Goods_receive_list = (props) => {
    const history = useHistory();
    const [rowSelected, setRowSelected] = React.useState([] as any);
    const [lstData, setlstData] = useState([] as any);
    const [Materialsource, setlstMaterialsource] = useState([] as any);

    useEffect(() => {
        GetDataOnPageLoad();
    }, []);
    const GetDataOnPageLoad = async () => {
        let result: any = await AxiosPostJson(Controller + "/GetData_List");
        console.log("result", result)
        setlstMaterialsource(result.data.Materialsource)
        setlstData(result.data.lstData)
    }
    const header: CellHeader[] = [
        { label: "ที่", Sortby: "", SortType: Number, ClassName: "align-middle text-center text-nowrap", CSSStyle: { width: 50 } },
        { label: "เลขที่ใบรับวัสดุ", Sortby: "sRequestNo", SortType: String, ClassName: "align-middle text-center" },
        { label: "แหล่งที่มาของวัสดุ", Sortby: "sName", SortType: String, ClassName: "align-middle text-center" },
        { label: "วันที่เอกสาร", Sortby: "dDocDate", SortType: String, ClassName: "align-middle text-center" },
        { label: "วันที่รับวัสดุ", Sortby: "dReceiveDate", SortType: String, ClassName: "align-middle text-center" },
        { label: "ผู้ทำรายการ", Sortby: "UnitsName", SortType: String, ClassName: "align-middle text-center" },
        { Sortby: "", SortType: false, label: <Button size="sm" color="#007bff" className="btn btn-primary btn-sm" type="button" onClick={() => { history.push(`/admin-Goods-Receive_edit?nID=${Encrypt(0)}`); }}><i className="fas fa-plus"></i></Button>, CSSStyle: { width: 1 }, ClassName: "align-middle text-center" },
    ];
    var onDeleteClick = () => {
        if (rowSelected.length > 0) {
            var data = {
                nID: rowSelected
            };
            DialogDelete(async () => {
                let result: any = await AxiosPostJson(Controller + "/Del_lst", data);
                if (result.data.Status === Responsestart.success) {
                    await Sweetalert.Success(BoxMsg.Desc_Success_Delete, "", null);
                    GetDataOnPageLoad();
                } else if (result.data.Status === Responsestart.warning) {
                    Sweetalert.Warning(BoxMsg.Desc_Warning_Delete, result.data.sMsg, null);
                } else {
                    Sweetalert.Error(BoxMsg.Title_Error, result.data.sMsg, null);
                }
            });
        }
    }

    const CreateDataRow = (o: any, i: any) => {
        return (
            <tr key={i}>
                <td className="text-center align-middle">{i + 1 + "."}</td>
                <td className="text-center align-middle">{o.sRequestNo}</td>
                <td className="text-center align-middle">{o.sName}</td>
                <td className="text-center align-middle">{o.dDocDate}</td>
                <td className="text-center align-middle">{o.dReceiveDate}</td>
                <td className="text-center align-middle">-</td>
                <td className="text-center align-middle"><Button size="sm" className="btn btn-info btn-sm" type="button" onClick={() => { history.push(`/admin-Goods-Receive_edit?nID=${Encrypt(o.nRequestID)}`); }}><i className="fas fa-pencil-alt"></i></Button></td>
            </tr>
        )
    }
    const SearchData = async (event, errors: [], values) => {
        console.log("values", values)

        if (errors.length == 0) {
            let data = {
                sRequestNo: values.sRequestNo,
                sSourceID: values.sSourceID,
                dDocDate: values.dDocDate,
                dReceiveDate: values.dReceiveDate
            }
            let result: any = await AxiosPostJson(Controller + "/GetData_List", data);
            console.log("result", result)
            setlstData(result.data.lstData)
        }
    };
    var onClickHeadCB = (e: any, currentData: any) => {
        let el = e.target;
        let dataSelect = el.checked ? currentData === null ? [] : currentData.map((x: any) => x.nMaterialID) : [];
        setRowSelected(dataSelect);
    }
    return (
        <Fragment>
            <div className="form-row">
                <div className="col-auto ml-auto">
                    <AvForm onSubmit={SearchData} >
                        <div className="form-row">
                            <div className="col-auto">
                                <div className="form-group">
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="form-group">
                                    <AvInput type="text" name="sRequestNo" className="form-control" placeholder="เลขที่ใบรับวัสดุ" />
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="form-group">
                                    <AvInput type="select" name="sSourceID" >
                                        <option value={""}>แหล่งที่มาของวัสดุ</option>
                                        {
                                            Materialsource.map((el, indx) => {
                                                return (
                                                    <option value={el.nSubID + ""}>{el.sName}</option>
                                                );
                                            })
                                        }
                                    </AvInput>
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="form-group">
                                    {/*<AvInput type="Date" name="dDocDate" className="form-control" placeholder="วันที่เริ่มต้น" />*/}

                                    <AvInput type="Date" name="dDocDate" tag={[Input, ThaiDatePicker]} className="form-control" placeholder="วันที่เริ่มต้น" />

                                    {/*<ThaiDatePicker small={true} maxDate={this.state.date2} value={this.state.date1}*/}
                                    {/*    onChange={(value) => {*/}
                                    {/*        let maxDate = this.state.date2;*/}
                                    {/*        if (value && maxDate) maxDate = value > maxDate ? undefined : maxDate;*/}
                                    {/*        this.setState({ date1: value, date2: maxDate });*/}
                                    {/*    }} />*/}
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="form-group">
                                    <AvInput type="Date" name="dReceiveDate" tag={[Input, ThaiDatePicker]} className="form-control" placeholder="วันที่สิ้นสุด" />
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="form-group">
                                    <FormGroup>
                                        <Button className="btn btn-dark" ><i className="fas fa-search"></i></Button>
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
                    ItemData={lstData}
                    CreateDataRow={CreateDataRow}
                    onBtnDelClick={onDeleteClick}
                    onClickHeadCB={onClickHeadCB}
                    rowSelected={rowSelected}
                />
            </div>
        </Fragment >
    );
};
export default Goods_receive_list;

