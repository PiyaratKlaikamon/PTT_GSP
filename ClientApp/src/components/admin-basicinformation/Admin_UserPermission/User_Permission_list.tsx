import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Badge, Button, CustomInput } from 'reactstrap';
import { parse } from "query-string"
import CreateTable, { CellHeader } from '../../Systems/Table';
import { AxiosGetJson } from '../../Service/Config/AxiosMethod';
import axios from 'axios';
import { Encrypt } from '../../Systems/SystemComponent';
const Controller = 'api/AdminUserPermission';

const User_Permission_list = (props: any) => {
    const history = useHistory();
    const [lstDataRow, setLstDataRow] = React.useState([] as any);
    const [rowSelected, setRowSelected] = React.useState([] as any);
    const [oTM_Option_Sub, setTM_Option_Sub] = React.useState([] as any);
    const [oSetSearch, setSetSearch] = React.useState([] as any);

    
    const [txtSearch, SetTxtSearch] = React.useState({
        sFullname: "",
        sIsActive: "",
        sRoleID: "",
    });


    const { sFullname, sIsActive, sRoleID } = txtSearch;
    const header: CellHeader[] = [
        { label: "", Sortby: "", SortType: Number, ClassName: "align-middle text-center", IsCheckBox: true, CSSStyle: { width: "2%" } },
        { label: "ที่", Sortby: "", SortType: Number, ClassName: "align-middle text-center text-nowrap", CSSStyle: { width: 50 } },
        { label: "รหัสพนักงาน", Sortby: "sEmployeeID", SortType: Number, ClassName: "align-middle text-center" },
        { label: "ชื่อ-นามสกุล", Sortby: "sName", SortType: String, ClassName: "align-middle", },
        { label: "สิทธิ์การใช้งาน", Sortby: "sOptSub", SortType: String, ClassName: "align-middle text-center" },
        { label: "หน่วยงาน", Sortby: "sPosition", SortType: String, ClassName: "align-middle text-center" },
        { label: "สถานะ", Sortby: "IsActive", SortType: String, ClassName: "align-middle text-center" },
        { Sortby: "", SortType: false, label: <Button size="sm" color="#007bff" className="btn btn-primary btn-sm" type="button" onClick={() => { history.push("/admin-user-permission-edit") }}><i className="fas fa-plus"></i></Button>, CSSStyle: { width: 1 }, ClassName: "align-middle text-center", },
    ];



    useEffect(() => {

        GetDataOnPageLoad();
        GetTMOptionSub()
        GetDataSearch()
    }, []);


    const GetDataSearch = async () => {

        let result: any = await AxiosGetJson(Controller + "/SetSearch");
        setSetSearch(result);


    };


    const GetDataOnPageLoad = async () => {

        let result: any = await AxiosGetJson(Controller + "/GetVUser");
        setlstData(result);

  
    };
    const GetTMOptionSub = async () => {

        let result: any = await AxiosGetJson(Controller + "/GetTMOptionSub");
        setTM_Option_Sub(result);


    };

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
    const [lstData, setlstData] = useState([
        {
            nID: "1.", sEmployeecode: "580589", sFullname: "สมชาย ทองปาน", sLicense: "เจ้าหน้าที่วัสดุ", sAgency: "ผ.จด.พย.", isActive: "ใช้งาน"
        },
    ]);
    const CreateDataRow = (o: any, i: any) => {
        return (
            <tr key={i}>
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
                <td className="text-center align-middle text-center">{i + 1+"."}</td>
                <td className="text-center align-middle">{o.sEmployeeID}</td>
                <td className="text-leift align-middle">{o.sName}  </td>
                <td className="text-center align-middle">{o.sOptSub}</td>
                <td className="text-center align-middle">{o.sPosition}</td>
                <td className="text-center align-middle">
                    <Badge color={o.IsActive === true ? "success" : "danger"} style={{ fontSize: 11 }}>
                        {o.IsActive === true ? "ใช้งาน" : "ไม่ใช้งาน"}
                    </Badge >
                </td>
                <td className="text-center align-middle"><Button size="sm" className="btn btn-info btn-sm" type="button" onClick={() => { getLinkTo_Edit(o.sEmployeeID) }}><i className="fas fa-pencil-alt"></i></Button></td>
            </tr>
        )
    }
    const getLinkTo_Edit = (sEmployeeID: number) => {

        let sMode = Encrypt("Edit")
        let sEmployeeIDi = Encrypt(sEmployeeID)
        let sTypeComponent = `/admin-user-permission-edit`

        let sPath = `${sTypeComponent}?sEmployeeID=${sEmployeeIDi}&&sMode=${sMode}`
        return history.push(sPath);
    };
    const SearchData = async () => {

        let result: any = await AxiosGetJson(Controller + "/User_Permission_SearchData?sFullname=" + sFullname + "&sIsActive=" + sIsActive + "&sRoleID=" + sRoleID);
        setlstData(result);
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
                                    placeholder="ชื่อ-นามสกุล"
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
                                    className="form-control form-control-sm"
                                    onChange={(e) => {
                                        SetTxtSearch({
                                            ...txtSearch,
                                            sRoleID: e.target.value,
                                        });
                                    }}
                                >
                                    <option value="">- สิทธิ์การใช้งาน -</option>
                                    {
                                        oTM_Option_Sub.map((p) => {
                                            return (
                                                <option value={p.nSubID} className="dropdown-item" >{p.sName}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="form-group">
                                <select
                                    className="form-control form-control-sm"
                                    onChange={(e) => {
                                        SetTxtSearch({
                                            ...txtSearch,
                                            sIsActive: e.target.value,
                                        });
                                    }}
                                >
                                    <option value="">สถานะ</option>
                                    <option value="1">ใช้งาน</option>
                                    <option value="2">ไม่ใช้งาน</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="form-group ">
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
export default User_Permission_list;

