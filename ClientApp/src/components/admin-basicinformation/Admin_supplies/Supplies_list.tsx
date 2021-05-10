import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Badge, Button, CustomInput } from 'reactstrap';
import { parse } from "query-string"
import CreateTable, { CellHeader } from '../../Systems/Table';
import img from '../../../Images/NEOR14NT2SL.jpeg';
import { BoxMsg, DialogDelete, Encrypt, Responsestart, Sweetalert } from '../../Systems/SystemComponent';
import { AxiosGetJson, AxiosPostJson } from '../../Service/Config/AxiosMethod';

const Controller = 'api/Supplies';
const _Supplies = (props) => {
    const history = useHistory();
    const [rowSelected, setRowSelected] = React.useState([] as any);
    const [lstData, setlstData] = useState([] as any);
    const [txtSearch, SetTxtSearch] = React.useState({
        sFullname: "",
        sIsActive: "",
        nCategoryID: "",
        nGroupID: "",
    });
    const [lstCategory, setlstCategory] = useState([] as any);
    const [lstGroup, setlstGroup] = useState([] as any);
    const { sFullname, sIsActive, nCategoryID, nGroupID } = txtSearch;
    useEffect(() => {
        GetDataOnPageLoad();
    }, []);
    const GetDataOnPageLoad = async () => {
        let result: any = await AxiosGetJson(Controller + "/GetData_List");
        setlstData(result.lstData);
        setlstCategory(result.lstCategory)
        setlstGroup(result.lstGroup)
    }
    const header: CellHeader[] = [
        { Sortby: "nMaterialID", SortType: Number, label: "", ClassName: "align-middle text-center", IsCheckBox: true, CSSStyle: { width: "2%" } },
        { Sortby: "", SortType: Number, ClassName: "align-middle text-center text-nowrap", label: "ที่", CSSStyle: { width: 50 } },
        { label: "รหัสวัสดุ", Sortby: "sMaterialCode", SortType: String, ClassName: "align-middle text-center" },
        { label: "ชื่อวัสดุ", Sortby: "sName", SortType: String, ClassName: "align-middle " },
        { label: "ภาพหน้าปก", Sortby: "", SortType: String, ClassName: "align-middle text-center" },
        { label: "ราคา", Sortby: "nPrice", SortType: String, ClassName: "align-middle text-center" },
        { label: "หน่วย", Sortby: "UnitsName", SortType: String, ClassName: "align-middle text-center" },
        { label: "จำนวนคงเหลือ", Sortby: "nMat_Balance", SortType: String, ClassName: "align-middle text-center" },
        { label: "Min", Sortby: "nMin", SortType: String, ClassName: "align-middle text-center" },
        { label: "Max", Sortby: "nMax", SortType: String, ClassName: "align-middle text-center" },
        { label: "สถานะ", Sortby: "", SortType: String, ClassName: "align-middle text-center", },
        { Sortby: "", SortType: false, label: <Button size="sm" color="#007bff" className="btn btn-primary btn-sm" type="button" onClick={() => { history.push(`/admin-supplies_edit?nID=${Encrypt(0)}`); }}><i className="fas fa-plus"></i></Button>, CSSStyle: { width: 1 }, ClassName: "align-middle text-center" },
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
    const CreateDataRow = (o: any, i: any) => {
        return (
            <tr key={i}>
                {
                    <td className="text-center align-middle"><CustomInput type="checkbox" id={`News_${o.nMaterialID}`} label={''}
                        onChange={(e: any) => {
                            let el = e.target
                            if (el.checked) {
                                onSelectedRow(o.nMaterialID)
                            } else {
                                onDeSelectedRow(o.nMaterialID)
                            }
                        }}
                        checked={rowSelected.indexOf(o.nMaterialID) !== -1}
                    /></td>
                }
                <td className="text-center align-middle">{i + 1}</td>
                <td className="text-center align-middle">{o.sMaterialCode}</td>
                <td className="text-left align-middle">{o.sName}</td>
                <td className="text-center align-middle"><img src={o.sFile_Path} width="100" height="80"></img></td>
                <td className="text-center align-middle">{o.nPrice}</td>
                <td className="text-center align-middle">{o.UnitsName}</td>
                <td className="text-center align-middle">{o.nMat_Balance}</td>
                <td className="text-center align-middle">{o.nMin}</td>
                <td className="text-center align-middle">{o.nMax}</td>
                <td className="text-center align-middle">
                    <Badge color={o.IsActive === true ? "success" : "danger"} style={{ fontSize: 11 }}>
                        {o.IsActive === true ? "ใช้งาน" : "ไม่ใช้งาน"}
                    </Badge >
                </td>
                <td className="text-center align-middle"><Button size="sm" className="btn btn-info btn-sm" type="button" onClick={() => { history.push(`/admin-supplies_edit?nID=${Encrypt(o.nMaterialID)}`); }}><i className="fas fa-pencil-alt"></i></Button></td>
            </tr>
        )
    }
    const SearchData = async () => {
        console.log("txtSearch", txtSearch)
        let result: any = await AxiosGetJson(Controller + "/SearchTitle?txtSearch=" + sFullname + "&sIsActive=" + sIsActive + "&nCategoryID=" + nCategoryID
            + "&nGroupID=" + nGroupID);
        setlstData(result);
    };
    var onClickHeadCB = (e: any, currentData: any) => {
        let el = e.target;
        let dataSelect = el.checked ? currentData === null ? [] : currentData.map((x: any) => x.nMaterialID) : [];
        setRowSelected(dataSelect);
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
                                    className="form-control"
                                    placeholder="รหัส/ชื่อวัสดุ"
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
                                <select
                                    className="custom-select form-control"
                                    onChange={(e) => {
                                        SetTxtSearch({
                                            ...txtSearch,
                                            nGroupID: e.target.value,
                                        });
                                    }}
                                >
                                    <option value={"0"}>กลุ่มวัสดุ</option>
                                    {
                                        lstGroup.map((el, indx) => {
                                            return (
                                                <option value={el.nGroupID + ""}>{el.sName}</option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="form-group">
                                <select
                                    className="custom-select form-control"
                                    onChange={(e) => {
                                        SetTxtSearch({
                                            ...txtSearch,
                                            nCategoryID: e.target.value,
                                        });
                                    }}
                                >
                                    <option value={"0"}>ประเภทวัสดุ</option>
                                    {
                                        lstCategory.map((el, indx) => {
                                            return (
                                                <option value={el.nCategoryID + ""}>{el.sName}</option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="form-group">
                                <select
                                    className="custom-select form-control"
                                    onChange={(e) => {
                                        SetTxtSearch({
                                            ...txtSearch,
                                            sIsActive: e.target.value,
                                        });
                                    }}
                                >
                                    <option value={"0"}>สถานะ</option>
                                    <option value={"1"}>ใช้งาน</option>
                                    <option value={"2"}>ไม่ใช้งาน</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="form-group">
                                <button
                                    type="button"
                                    className="btn btn-dark"
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
                    onBtnDelClick={onDeleteClick}
                    onClickHeadCB={onClickHeadCB}
                    rowSelected={rowSelected}
                />
            </div>
        </Fragment >
    );
};
export default _Supplies;

