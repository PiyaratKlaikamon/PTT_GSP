import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, CustomInput } from "reactstrap";
import { BoxMsg, Decrypt, DialogDelete, Encrypt, Responsestart, Sweetalert, TooltipsMSG } from "../../Systems/SystemComponent";
import CreateTable, { CellHeader } from "../../Systems/Table";
import { AxiosPostJson, AxiosGetJson } from "../../Service/Config/AxiosMethod";
import { string } from "@amcharts/amcharts4/core";
const Controller = 'api/ManageSeller';
const ManageSeller = () => {
    const history = useHistory();

    const [lstData, setlstData] = useState([] as any);

    const [RowSelected, setRowSelected] = useState([] as any);
    const [txtSearch, SetTxtSearch] = React.useState({
        stxtSearch: "",
        sIsActive: "",
    });

    const { stxtSearch, sIsActive } = txtSearch;
    const onDeleteData = () => {
        if (RowSelected.length > 0) {
            var data = {
                nID: RowSelected
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
    };
    const SearchData = async () => {
        let result: any = await AxiosGetJson(Controller + "/SearchTNewbyTitle?txtSearch=" + stxtSearch + "&sIsActive=" + sIsActive);
        setlstData(result);
    };

    var onClickHeadCB = (e, currentData) => {
        let el = e.target;
        let dataSelect = el.checked ? currentData === null ? [] : currentData.map((x: any) => x.nVendorID) : [];
        setRowSelected(dataSelect);
    };
    var onSelectedRow = (id) => { setRowSelected([...RowSelected, id]); };

    var onDeSelectedRow = (id) => {
        var index = RowSelected.indexOf(id);
        if (index !== -1) {
            RowSelected.splice(index, 1);
            setRowSelected([...RowSelected]);
        }
    };

    useEffect(() => {
        GetDataOnPageLoad();
    }, []);
    const GetDataOnPageLoad = async () => {
        let result: any = await AxiosGetJson(Controller + "/GetData_List");
        setlstData(result);
    }
    const header: CellHeader[] = [
        { Sortby: "", SortType: false, label: "", IsCheckBox: true, CSSStyle: { width: 1 }, },
        { Sortby: "nRow", SortType: Number, label: "ที่", ClassName: "align-middle text-center text-nowrap", CSSStyle: { width: 70 }, },
        { Sortby: "sCompanyCode", SortType: string, label: "รหัสบริษัท", ClassName: "align-middle text-center text-nowrap", CSSStyle: { width: 70 }, },
        { label: "ชื่อบริษัท", Sortby: "sCompanyName", ClassName: "align-middle text-center ", SortType: string, },
        { label: "ชื่อผู้ติดต่อ", Sortby: "sContactName", ClassName: "align-middle text-center", SortType: string, },
        { label: "อีเมล", Sortby: "sEmail", ClassName: "align-middle text-center", SortType: string, },
        { label: "เบอร์ติดต่อ", Sortby: "sTel", ClassName: "align-middle text-center", SortType: Number, },
        { label: "สถานะ", Sortby: "IsActive", ClassName: "align-middle text-center", SortType: "", },
        { Sortby: "", SortType: false, label: (<Button size="sm" color="primary" type="button" data-tip={TooltipsMSG.Add} onClick={() => { history.push(`/admin-manage_seller-edit?nID=${Encrypt(0)}`); }}><FontAwesomeIcon icon={["fas", "plus"]} /></Button>), ClassName: "align-middle text-center", CSSStyle: { width: 1 }, },
    ];

    const CreateData = (o, i) => {
        return (
            <tr key={i}>
                {
                    <td className="align-middle text-center">
                        <CustomInput
                            type="checkbox"
                            id={`cbBody_${o.nVendorID}`}
                            label={""}
                            onChange={(e) => {
                                let el = e.target;
                                if (el.checked) {
                                    onSelectedRow(o.nVendorID);
                                } else {
                                    onDeSelectedRow(o.nVendorID);
                                }
                            }}
                            checked={RowSelected.indexOf(o.nVendorID) !== -1}
                        />
                    </td>
                }
                <td className="align-middle text-center">{o.nRow}</td>
                <td className="align-middle text-center">{o.sCompanyCode}</td>
                <td className="align-middle text-center">{o.sCompanyName}</td>
                <td className="align-middle text-center">{o.sContactName}</td>
                <td className="align-middle text-center">{o.sEmail}</td>
                <td className="align-middle text-center">{o.sTel}</td>
                <td className="align-middle text-center">
                    <Badge color={o.IsActive == "0" ? "success" : "danger"} style={{ fontSize: 11 }} > {o.isActive == "0" ? "ใช้งาน" : "ไม่ใช้งาน"} </Badge>
                </td>
                <td className="align-middle text-center">
                    <Button size="sm" type="button" color="info" onClick={() => {
                        history.push(`/admin-manage_seller-edit?nID=${Encrypt(o.nVendorID)}`);
                    }}>
                        <FontAwesomeIcon icon={["fas", "pencil-alt"]} />
                    </Button>
                </td>
            </tr >
        );
    };

    return (
        <Fragment>
            <div className="form-row justify-content-end">
                <div className="col-auto">
                    <div className="form-group">
                        <input className="form-control form-control-sm" placeholder="ชื่อบริษัท / ผู้ติดต่อ" type="text" onChange={(e) => SetTxtSearch({ ...txtSearch, stxtSearch: e.target.value, })} onKeyPress={(e) => {
                            e.key === "Enter" && SearchData();
                        }} /> </div>
                </div>
                <div className="col-auto">
                    <div className="form-group">
                        <select className="form-control form-control-sm" onChange={(e) => { SetTxtSearch({ ...txtSearch, sIsActive: e.target.value, }); }} >
                            <option value="">- สถานะ -</option>
                            <option value="1">ใช้งาน</option>
                            <option value="2">ไม่ใช้งาน</option>
                        </select>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="form-group">
                        <button type="button" className="btn btn-dark btn-sm" onClick={() => SearchData()}>
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
                    IsHasBtnDEL={true}
                    onBtnDelClick={onDeleteData}
                    onClickHeadCB={onClickHeadCB}
                    rowSelected={RowSelected}
                />
            </div>
        </Fragment>
    );
};
export default ManageSeller;
