import React, { Fragment, useState } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, CustomInput } from "reactstrap";
import CreateTable, { CellHeader } from "../../Systems/Table";
import { BoxMsg, DialogConfirm, DialogDelete, Encrypt, Responsestart, Sweetalert, TooltipsMSG } from "../../Systems/SystemComponent";
import axios from "axios";
import { AxiosGetJson, AxiosPostJson } from "../../Service/Config/AxiosMethod";
import * as ThaiDatePicker from "../../ST_Handlers/ThaiDatePicker";
import { string } from "@amcharts/amcharts4/core";
const Controller = 'api/AdminParcelGroup'

const ParcelGroup = () => {
    const history = useHistory();

    const [oTB_Material_Group, setTB_Material_Group] = useState([] as any);

    React.useEffect(() => {

        GetDataOnPageLoad()

    }, []);


    const GetDataOnPageLoad = async () => {

        let result: any = await AxiosGetJson(Controller + "/ParcelGroup");
        setTB_Material_Group(result);


    }



    const [RowSelected, setRowSelected] = useState([] as any);
    const [txtSearch, SetTxtSearch] = React.useState({
        stxtSearch: "",
        sIsActive: "",
    });

    const { stxtSearch, sIsActive } = txtSearch;


    var onDeleteData = () => {

        if (RowSelected.length > 0) {

            DialogDelete(async () => {
                let result: any = await AxiosPostJson(Controller + "/ParcelGroup_Del_data", RowSelected,);
                if (result.data.sStatus === Responsestart.success) {
                    await Sweetalert.Success(BoxMsg.Title_Success, BoxMsg.Desc_Success_Delete, null);
                    GetDataOnPageLoad()
                } else if (result.data.sStatus === Responsestart.warning) {
                    Sweetalert.Warning(BoxMsg.Title_Warning, result.data.sMsg, null);
                } else {
                    Sweetalert.Error(BoxMsg.Title_Error, result.data.sMsg, null);
                }
            })
        }
    }



    const SearchData = async () => {


        let result: any = await AxiosGetJson(Controller + "/ParcelGroup_SearchData?sName=" + stxtSearch + "&sIsActive=" + sIsActive);
        setTB_Material_Group(result);
    };

    var onClickHeadCB = (e: any, currentData: any) => {
        let el = e.target;
        let dataSelect = el.checked
            ? currentData === null
                ? []
                : currentData.map((x: any) => x.nGroupID)
            : [];
        setRowSelected(dataSelect);
    };
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

    const header: CellHeader[] = [
        {
            Sortby: "",
            SortType: Number,
            label: "",
            ClassName: "align-middle text-center",
            IsCheckBox: true,
            CSSStyle: { width: 25 },
        },
        {
            Sortby: "nOrder",
            SortType: Number,
            label: "ที่",
            ClassName: "align-middle text-center ",
            CSSStyle: { width: 60 },
        },
        {
            label: "ชื่อกลุ่มวัสดุ",
            Sortby: "sName",
            ClassName: "align-middle",
            SortType: String,
        },
        {
            label: "สถานะ",
            Sortby: "sActive",
            ClassName: "align-middle text-center",
            SortType: String,
            CSSStyle: { width: 300 },
        },
        {
            label: "ปรับปรุงล่าสุด",
            Sortby: "dUpdate",
            ClassName: "align-middle text-center",
            SortType: String,
            CSSStyle: { width: 300 },
        },
        {
            Sortby: "",
            SortType: false,
            label: (
                <Button
                    size="sm"
                    color="primary"
                    type="button"
                    data-tip={TooltipsMSG.Add}
                    onClick={() => {
                        history.push("/admin-parcelgroup-edit");
                    }}
                >
                    <FontAwesomeIcon icon={["fas", "plus"]} />
                </Button>
            ),
            ClassName: "align-middle text-center",
            CSSStyle: { width: 1 },
        },
    ];



    const getLinkTo_Edit = (nGroupID: number) => {

        let sMode = Encrypt("Edit")
        let sGroupID = Encrypt(nGroupID)
        let sTypeComponent = `/admin-parcelgroup-edit`

        let sPath = `${sTypeComponent}?sGroupID=${sGroupID}&&sMode=${sMode}`
        return history.push(sPath);
    };



    const SetOrder = async (sOrder: any, nGroupID: any) => {


        if (sOrder != 0) {
            let result: any = await AxiosPostJson(Controller + "/SetOrder?sOrder=" + sOrder + "&nGroupID=" + nGroupID);


            if (result.data.sStatus === Responsestart.success) {
                Sweetalert.Success(BoxMsg.Title_Success, BoxMsg.Desc_Success_Save, null);
                GetDataOnPageLoad()
            } else if (result.data.sStatus === Responsestart.warning) {
                Sweetalert.Warning(BoxMsg.Title_Warning, result.data.sMsg, null);
            } else {
                Sweetalert.Error(BoxMsg.Title_Error, result.data.sMsg, null);
            }
        }




    }


    const CreateData = (o: any, i: any) => {
        return (
            <tr key={i}>
                {
                    <td className="align-middle text-center">


                        {o.IsUse ? (
                            null
                        ) : (
                                <CustomInput
                                    type="checkbox"
                                    id={`cbBody_${o.nGroupID}`}
                                    label={""}
                                    onChange={(e: any) => {
                                        let el = e.target;
                                        if (el.checked) {
                                            onSelectedRow(o.nGroupID);
                                        } else {
                                            onDeSelectedRow(o.nGroupID);
                                        }
                                    }}
                                    checked={RowSelected.indexOf(o.nGroupID) !== -1}
                                />
                            )}




                    </td>
                }

                <td className="align-middle text-center">
                    <select className="form-control form-control-sm" name="nOrder" id="nOrder" value={o.nOrder != null ? o.nOrder.toString() : "1"}
                        onChange={(e: any) => SetOrder(e.target.value, o.nGroupID)}>
                        {

                            oTB_Material_Group.map((p) => {
                                return (
                                    <option value={p.nOrder} className="dropdown-item" >{p.nOrder}</option>
                                )
                            })
                        }


                    </select>

                </td>
                <td className="align-middle">{o.sName}</td>
                <td className="align-middle text-center">
                    <Badge
                        color={o.IsActive ? "success" : "danger"}
                        style={{ fontSize: 11 }}
                    >
                        {o.sActive}
                    </Badge>
                </td>

                <td className="align-middle text-center">{o.dUpdate}</td>
                <td className="align-middle text-center">

                    <Button size="sm" type="button" color="info" onClick={() => { getLinkTo_Edit(o.nGroupID) }}>
                        <FontAwesomeIcon icon={["fas", "pencil-alt"]} />
                    </Button>

                </td>
            </tr>
        );
    };

    return (
        <Fragment>
            <div className="form-row justify-content-end">
                <div className="col-auto">
                    <div className="form-group">
                        <input
                            className="form-control form-control-sm"
                            placeholder="ชื่อกลุ่มวัสดุ"
                            type="text"
                            onChange={(e) =>
                                SetTxtSearch({
                                    ...txtSearch,
                                    stxtSearch: e.target.value,
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
                                    sIsActive: e.target.value,
                                });
                            }}
                        >
                            <option value="">- สถานะ -</option>
                            <option value="1">ใช้งาน</option>
                            <option value="0">ไม่ใช้งาน</option>
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
                    ItemData={oTB_Material_Group}
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
export default ParcelGroup;
