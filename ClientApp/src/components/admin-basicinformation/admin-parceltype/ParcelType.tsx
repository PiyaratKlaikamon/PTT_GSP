import React, { Fragment, useState } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, CustomInput } from "reactstrap";
import { BoxMsg, DialogConfirm, DialogDelete, Encrypt, Responsestart, Sweetalert, TooltipsMSG } from "../../Systems/SystemComponent";
import CreateTable, { CellHeader } from "../../Systems/Table";
import axios from "axios";
import { AxiosGetJson, AxiosPostJson } from "../../Service/Config/AxiosMethod";
const Controller = 'api/AdminParcelType';

const ParcelType = () => {
    const history = useHistory();
    const [RowSelected, setRowSelected] = useState([] as any);
    const [oV_Material_Category, setV_Material_Category] = useState([] as any);
    const [oMaterial_Group, setMaterial_Group] = useState([] as any);

    const [txtSearch, SetTxtSearch] = React.useState({
        stxtSearch: "",
        sIsActive: "",
        sGroupID: ""
    });

    const { stxtSearch, sIsActive, sGroupID } = txtSearch;


    React.useEffect(() => {

        GetDataOnPageLoad()
        GetMaterial_Group()

    }, []);


    const GetDataOnPageLoad = async () => {

        let result: any = await AxiosGetJson(Controller + "/ParcelType");
        setV_Material_Category(result);

    }

    const GetMaterial_Group = async () => {
        let result: any = await AxiosGetJson(Controller + "/GetMaterial_Group");
        setMaterial_Group(result);
    }



    const onDeleteData = async () => {


        if (RowSelected.length > 0) {

            DialogDelete(async () => {
                let result: any = await AxiosPostJson(Controller + "/GetMaterialGroup__Del_data", RowSelected,);
                if (result.data.sStatus === Responsestart.success) {
                    Sweetalert.Success(BoxMsg.Title_Success, BoxMsg.Desc_Success_Delete, null);
                    GetDataOnPageLoad()
                } else if (result.data.sStatus === Responsestart.warning) {
                    Sweetalert.Warning(BoxMsg.Title_Warning, result.data.sMsg, null);
                } else {
                    Sweetalert.Error(BoxMsg.Title_Error, result.data.sMsg, null);
                }
            })
        }



    };

    const SearchData = async () => {

        let result: any = await AxiosGetJson(Controller + "/GetMaterialGroup_SearchData?sName=" + stxtSearch + "&sGroupID=" + sGroupID + "&sIsActive=" + sIsActive);
        setV_Material_Category(result);
    };

    var onClickHeadCB = (e: any, currentData: any) => {
        let el = e.target;
        let dataSelect = el.checked
            ? currentData === null
                ? []
                : currentData.map((x: any) => x.nCategoryID)
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


    const SetOrder = async (sOrder: any, nCategoryID: any) => {


        if (sOrder != 0) {
            let result: any = await AxiosPostJson(Controller + "/SetOrder?sOrder=" + sOrder + "&nCategoryID=" + nCategoryID);


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

    const header: CellHeader[] = [
        {
            Sortby: "",
            SortType: Number,
            label: "",
            ClassName: "align-middle text-center",
            IsCheckBox: true,
            CSSStyle: { width: 50 },
        },
        {
            Sortby: "nOrder",
            SortType: Number,
            label: "ที่",
            ClassName: "align-middle text-center ",
            CSSStyle: { width: 60 },
        },
        {
            label: "รหัสประเภทวัสดุ",
            Sortby: "sCategoryCode",
            ClassName: "align-middle text-center",
            SortType: String,
        },
        {
            label: "ชื่อประเภทวัสดุ",
            Sortby: "sCategoryName",
            ClassName: "align-middle",
            SortType: String,
        },
        {
            label: "กลุ่มวัสดุ",
            Sortby: "sGroupName",
            ClassName: "align-middle",
            SortType: String,
        },
        {
            label: "สถานะ",
            Sortby: "sActive",
            ClassName: "align-middle text-center",
            SortType: String,
            CSSStyle: { width: 210 },
        },
        {
            label: "ปรับปรุงล่าสุด",
            Sortby: "dUpdate",
            ClassName: "align-middle text-center",
            SortType: String,
            CSSStyle: { width: 210 },
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
                        history.push("/admin-parceltype-edit");
                    }}
                >
                    <FontAwesomeIcon icon={["fas", "plus"]} />
                </Button>
            ),
            ClassName: "align-middle text-center",
            CSSStyle: { width: 1 },
        },
    ];


    const getLinkTo_Edit = (nCategoryID: number) => {

        let sMode = Encrypt("Edit")
        let sCategoryID = Encrypt(nCategoryID)
        let sTypeComponent = `/admin-parceltype-edit`

        let sPath = `${sTypeComponent}?sCategoryID=${sCategoryID}&&sMode=${sMode}`
        return history.push(sPath);
    };

    const CreateData = (o: any, i: any) => {
        return (
            <tr key={i}>
                {
                    <td className="align-middle text-center">

                        {o.IsUse != null ?
                            null
                            :
                            <CustomInput
                                type="checkbox"
                                id={`cbBody_${o.nCategoryID}`}
                                label={""}
                                onChange={(e: any) => {
                                    let el = e.target;
                                    if (el.checked) {
                                        onSelectedRow(o.nCategoryID);
                                    } else {
                                        onDeSelectedRow(o.nCategoryID);
                                    }
                                }}
                                checked={RowSelected.indexOf(o.nCategoryID) !== -1}
                            />
                            
                        }
                    </td>
                }
                <td className="align-middle text-center">
                    <select className="form-control form-control-sm" name="nOrder" id="nOrder" value={o.nOrder != null ? o.nOrder.toString() : "1"}
                        onChange={(e: any) => SetOrder(e.target.value, o.nCategoryID)}>
                        {

                            oV_Material_Category.map((p) => {
                                return (
                                    <option value={p.nOrder} className="dropdown-item" >{p.nOrder}</option>
                                )
                            })
                        }


                    </select>

                </td>

                <td className="align-middle text-center">{o.sCategoryCode}</td>
                <td className="align-middle">{o.sCategoryName}</td>
                <td className="align-middle">{o.sGroupName}</td>
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

                    <Button size="sm" type="button" color="info" onClick={() => { getLinkTo_Edit(o.nCategoryID) }}>
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
                            placeholder="รหัส / ชื่อประเภทวัสดุ"
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
                            onChange={(e) =>
                                SetTxtSearch({
                                    ...txtSearch,
                                    sGroupID: e.target.value,
                                })
                            }
                        >
                            <option value="" className="dropdown-item" >- กลุ่มวัสดุ -</option>
                            {
                                oMaterial_Group.map((p) => {
                                    return (
                                        <option value={p.sGroupID} className="dropdown-item" >{p.sName}</option>
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
                    ItemData={oV_Material_Category}
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
export default ParcelType;
