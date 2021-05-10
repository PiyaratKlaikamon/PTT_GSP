import React from "react";
import "./style.css";
import AuthenService from "../Service/AuthenService";
import { AxiosPostJson } from "../Service/Config/AxiosMethod";
import ScrollArea from "react-scrollbar";
import NumericInput from "../ST_Handlers/NumericInput";
import numeral from "numeral";
import { Sweetalert, BoxMsg } from "../Systems/SystemComponent";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';

class RequestReason {
    ReasonID: number = 0;
    Name: string = "";
}
class MaterialGroup {
    public GroupID: number = 0;
    public Name: string = "";
}
class MaterialCategory {
    public GroupID: number = 0;
    public CategoryID: number = 0;
    public Name: string = "";
}
class MaterialItem {
    public GroupID: number = 0;
    public CategoryID: number = 0;
    public ItemID: number = 0;
    public Code: string = "";
    public Name: string = "";
    public Amount_Input: number = 0;
    public Amount_Total: number = 0;
    public Amount_InProgress: number = 0;
    public Price: number = 0;
    public ImgSrc: string = "";
}
class MaterialItem_Selected {
    public ItemID: number = 0;
    public Amount: number = 0;
}
class RequestData {
    public nRequestID: number = 0;
    public sLocation: string = "";
    public nReasonID?: number;
    public sReasonDetail: string = "";
    public isFastTrack: boolean = false;
    public sFastTrackDetail: string = "";
    public nWorkID?: number;
    public lstMaterial_Selected?: Array<MaterialItem_Selected>;
}

class UserAccount {
    public sEmployeeCode: string = "";
    public sUnitCode: string = "";
    public nRoleID: number = 0;
    public sName: string = "";
    public sPosition: string = "";
    public sOrganization: string = "";
    public sEmail: string = "";
}

interface IState {
    UserInfo: UserAccount | null,
    source_reason: Array<RequestReason>,
    source_group: Array<MaterialGroup>,
    source_category: Array<MaterialCategory>,
    source_item: Array<MaterialItem>,

    expanded_GroupID: Array<number>,
    selected_GroupID: number
    selected_CategoryID: number,
    filter_text: string,

    item_filtered: Array<MaterialItem>,
    page_length: number,
    page_selected: number,

    cart_item: Array<MaterialItem_Selected>,

    req: RequestData
}

export default class RequestForm extends React.Component<{}, IState>{
    constructor(props) {
        super(props);
        this.state = {
            UserInfo: null,
            source_reason: [],
            source_group: [],
            source_category: [],
            source_item: [],

            expanded_GroupID: [],
            selected_GroupID: 0,
            selected_CategoryID: 0,
            filter_text: "",

            item_filtered: [],
            page_length: 0,
            page_selected: 0,

            cart_item: [],

            req: {
                nRequestID: 0,
                sLocation: "",
                nReasonID: undefined,
                sReasonDetail: "",
                isFastTrack: false,
                sFastTrackDetail: "",
                nWorkID: undefined,
                lstMaterial_Selected: []
            }
        };
    }

    private page_size = 9;
    Material_Binding = () => {
        const arrItem = Array.from(this.state.source_item);
        const nGroupID = this.state.selected_GroupID;
        const nCategoryID = this.state.selected_CategoryID;
        const sText = this.state.filter_text;

        const arrItem_filtered = arrItem.filter(w => {
            return (
                w.GroupID == nGroupID &&
                (nCategoryID ? w.CategoryID == nCategoryID : true) &&
                (sText ? w.Name.toLocaleLowerCase().indexOf(sText) > -1 : true)
            );
        });

        this.setState({
            item_filtered: arrItem_filtered,
            page_length: Math.ceil(arrItem_filtered.length / this.page_size),
            page_selected: 1
        });
    }

    UserInfo_SetState = async () => {
        let r: any = await AuthenService.UserInfo();
        if (r.data) {
            var ua = r.data;
            this.setState({
                UserInfo: {
                    sEmployeeCode: ua.sEmployeeCode,
                    sUnitCode: ua.sUnitCode,
                    nRoleID: ua.nRoleID,
                    sName: ua.sName,
                    sPosition: ua.sPosition,
                    sOrganization: ua.sOrganization,
                    sEmail: ua.sEmail,
                }
            });
        }
    }
    RequestForm_Prepare = async () => {
        let r: any = await AxiosPostJson("api/Material/RequestForm_Prepare");
        if (r.data) {
            let d = r.data;
            var nGroupID_first = d.lstGroupData.length ? d.lstGroupData[0].GroupID : 0;
            d.lstItemData.forEach(i => i["Amount_Input"] = i.Amount_Total ? 1 : 0);
            this.setState({
                source_reason: d.lstReasonData,
                source_group: d.lstGroupData,
                source_category: d.lstCategoryData,
                source_item: d.lstItemData,
                expanded_GroupID: [nGroupID_first],
                selected_GroupID: nGroupID_first
            }, this.Material_Binding);
        }
    }

    componentDidMount() {
        this.UserInfo_SetState();
        this.RequestForm_Prepare();
    }

    Pagination_Create = () => {
        let arrLI = [] as Array<JSX.Element>;
        let page_selected = this.state.page_selected;
        let page_length = this.state.page_length;
        let page_start = page_selected - 2;
        let page_end = page_selected + 2;
        for (var i = (page_start < 1 ? 1 : page_start); i <= (page_end > page_length ? page_length : page_end); i++) {
            arrLI.push(
                <li key={"PAGE_" + i} className={"page-item" + (page_selected == i ? " active" : "")}>
                    <button className="page-link" onClick={() => this.setState({ page_selected: i }, this.Material_Binding)}>{i}</button>
                </li>);
        }
        return arrLI;
    }

    Number_Mask = (n: number) => { return numeral(n).format("0,0"); }

    MaterialItem_SetValue(ItemID: number, Key: string, Value: any) {
        let arrItem = Array.from(this.state.source_item);
        let item = arrItem.find(w => w.ItemID == ItemID);
        if (item) {
            item[Key] = Value;
            this.setState({ source_item: arrItem });
        }
    }
    CartItem_SetValue(ItemID: number, Key: string, Value: any) {
        let arrItem = Array.from(this.state.cart_item);
        let item = arrItem.find(w => w.ItemID == ItemID);
        if (item) {
            item[Key] = Value;
            this.setState({ cart_item: arrItem });
        }
    }
    RequestData_SetValue(Key: string, Value: any) {
        let req_data = this.state.req;
        req_data[Key] = Value;
        this.setState({ req: req_data });
    }

    CatalogBoard_Create = () => {
        let page_size = this.page_size;
        let page_selected = this.state.page_selected;
        let index_start = (page_selected - 1) * page_size;

        let arrSlot = [] as Array<JSX.Element>;
        Array.from(this.state.item_filtered).splice(index_start, this.page_size).map(d => {
            arrSlot.push(
                <div key={"ITEM_" + d.ItemID} className="catalog-slot">
                    <div className="g-box">
                        <div className="g-info">
                            <div className="g-info-l">
                                <div className="g-image" style={{ backgroundImage: "url(" + d.ImgSrc + ")" }}></div>
                                <div className="text-center mt-2">{d.Code}</div>
                            </div>
                            <div className="g-info-r">
                                <div className="g-name" title={d.Name}>{d.Name}</div>
                                <div className="mt-2">
                                    <div className="text-muted">ราคา {this.Number_Mask(d.Price)} บาท</div>
                                </div>
                                <div className="mt-2">
                                    <div className="form-row flex-nowrap align-items-center">
                                        <div className="col-auto">จำนวน</div>
                                        <div className="col-auto">
                                            <button className="btn btn-sm btn-link p-0"
                                                onClick={() => this.MaterialItem_SetValue(d.ItemID, "Amount_Input", d.Amount_Input - 1)}
                                                disabled={d.Amount_Input <= 1} >
                                                <i className="fa fa-minus-circle"></i>
                                            </button>
                                        </div>
                                        <div className="col-auto px-0">
                                            <NumericInput className="g-input form-control form-control-sm text-center p-0"
                                                value={d.Amount_Input} minValue={0} maxValue={d.Amount_Total}
                                                onChange={(value) => this.MaterialItem_SetValue(d.ItemID, "Amount_Input", value || 1)}
                                                disabled={d.Amount_Total <= 0} />
                                        </div>
                                        <div className="col-auto">
                                            <button className="btn btn-sm btn-link p-0"
                                                onClick={() => this.MaterialItem_SetValue(d.ItemID, "Amount_Input", d.Amount_Input + 1)}
                                                disabled={d.Amount_Input >= d.Amount_Total} >
                                                <i className="fa fa-plus-circle"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-2">
                                    <button type="button" className="g-button"
                                        onClick={() => {
                                            let arrItem_selected = Array.from(this.state.cart_item);
                                            let itemSelected = arrItem_selected.find(w => w.ItemID == d.ItemID);
                                            let isEnoughAmount = true;
                                            if (itemSelected) {
                                                let n = itemSelected.Amount + d.Amount_Input
                                                isEnoughAmount = d.Amount_Total >= n;
                                                if (isEnoughAmount) itemSelected.Amount = n;
                                            }
                                            else arrItem_selected.push({ ItemID: d.ItemID, Amount: d.Amount_Input });

                                            if (isEnoughAmount) this.setState({ cart_item: arrItem_selected },
                                                () => { if (d.Amount_Input > 1) this.MaterialItem_SetValue(d.ItemID, "Amount_Input", 1); });
                                            else Sweetalert.Warning(BoxMsg.Title_Warning,
                                                "สามารถเบิก <b>[" + d.Code + "] " + d.Name + "</b> ได้ไม่เกิน " + d.Amount_Total + " ชิ้น");
                                        }}
                                        disabled={d.Amount_Input <= 0}>
                                        <i className="fa fa-cart-plus"></i> เพิ่ม
                                </button>
                                </div>
                            </div>
                        </div>
                        <div className="g-amount">
                            <div className="g-amount-label g-amount-total">วัสดุทั้งหมด {this.Number_Mask(d.Amount_Total)} ชิ้น</div>
                            <div className="g-amount-label g-amount-pending">รอดำเนินการ {this.Number_Mask(d.Amount_InProgress)} ชิ้น</div>
                        </div>
                    </div>
                </div>)
        });

        return <div className="catalog-board">{arrSlot}</div>
    };

    ItemCart_Create = () => {
        let arrItem = Array.from(this.state.source_item);
        let arrItem_selected = Array.from(this.state.cart_item);

        let nAmountSum = arrItem_selected.reduce((temp, d) => temp + (d.Amount || 0), 0);
        let nPriceSum = 0;

        let e_tbody =
            <tbody>
                {
                    arrItem_selected.map((d, i) => {
                        let x = arrItem.find(w => w.ItemID == d.ItemID);
                        if (x) nPriceSum += d.Amount * x.Price;
                        return x ? (
                            <tr key={"cart_item_" + x.ItemID}>
                                <td className="align-middle text-center text-nowrap">{x.Code}</td>
                                <td className="align-middle">{x.Name}</td>
                                <td className="align-middle text-center">
                                    <div className="form-row flex-nowrap justify-content-center align-items-center">
                                        <div className="col-auto">
                                            <button className="btn btn-sm btn-link p-0"
                                                onClick={() => this.CartItem_SetValue(d.ItemID, "Amount", d.Amount - 1)}
                                                disabled={d.Amount <= 1} >
                                                <i className="fa fa-minus-circle"></i>
                                            </button>
                                        </div>
                                        <div className="col-auto px-0">
                                            <NumericInput className="form-control form-control-sm text-center" style={{ width: 35 }}
                                                value={d.Amount}
                                                onChange={(value) => this.CartItem_SetValue(d.ItemID, "Amount", value || 1)} />
                                        </div>
                                        <div className="col-auto">
                                            <button className="btn btn-sm btn-link p-0"
                                                onClick={() => {
                                                    if (x) {
                                                        if (d.Amount >= x.Amount_Total) {
                                                            Sweetalert.Warning(BoxMsg.Title_Warning,
                                                                "สามารถเบิก <b>[" + x.Code + "] " + x.Name + "</b> ได้ไม่เกิน " + x.Amount_Total + " ชิ้น");
                                                        }
                                                        else this.CartItem_SetValue(d.ItemID, "Amount", d.Amount + 1);
                                                    }
                                                }}>
                                                <i className="fa fa-plus-circle"></i>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td className="align-middle text-right text-nowrap">{this.Number_Mask(x.Price * d.Amount)}</td>
                                <td className="align-middle text-center">
                                    <button className="btn btn-sm btn-danger"
                                        onClick={() => {
                                            Sweetalert.Confirm(BoxMsg.Title_Confirm, BoxMsg.Desc_Confirm_Delete, () => {
                                                arrItem_selected.splice(i, 1);
                                                this.setState({ cart_item: arrItem_selected }, Sweetalert.Close);
                                            });
                                        }}>
                                        <i className="fa fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>) : null
                    })
                }
            </tbody>;

        let e_tfoot =
            <tfoot>
                <tr style={{ height: 40 }}>
                    <th style={{ borderRightWidth: 0 }}></th>
                    <th className="align-middle text-center" style={{ borderLeftWidth: 0 }}>รวมทั้งหมด</th>
                    <th className="align-middle text-center">{this.Number_Mask(nAmountSum)}</th>
                    <th className="align-middle text-right" style={{ borderRightWidth: 0 }}>{this.Number_Mask(nPriceSum)}</th>
                    <th style={{ borderLeftWidth: 0 }}></th>
                </tr>
            </tfoot>;

        return (<table className="table table-bordered table-condensed table-striped table-sm small bg-white mb-0">
            <thead>
                <tr style={{ height: 40 }}>
                    <th className="align-middle text-center">รหัสวัสดุ</th>
                    <th className="align-middle text-center">ชื่อวัสดุ</th>
                    <th className="align-middle text-center text-nowrap">จำนวน (ชิ้น)</th>
                    <th className="align-middle text-center">ราคารวม (บาท)</th>
                    <th className="align-middle text-center" style={{ width: 1 }}></th>
                </tr>
            </thead>
            {e_tbody}
            {
                this.state.cart_item.length
                    ? e_tfoot
                    : <tbody><tr><td colSpan={5} className="align-middle text-center alert-warning py-4">ยังไม่มีข้อมูลในรายการ</td></tr></tbody>
            }
        </table>);
    }

    refFormRequester = React.createRef<HTMLFormElement>();
    //arrInvalidField = Array<string>();

    RedirectToList = () => {
        let e_lnkReqList = document.getElementById("lnkReqList");
        if (e_lnkReqList) e_lnkReqList.click();
    }

    render() {
        return (
            <div id="PAGE_REQFORM">
                <div className="container">
                    <AvForm ref={this.refFormRequester} className="ipane ipane-1"
                        onSubmit={(e, arrErrorField, objValue) => {
                            if (arrErrorField.length)
                                Sweetalert.Warning(BoxMsg.Title_Warning, BoxMsg.Desc_Warning_Save);
                            else if (!this.state.cart_item.length)
                                Sweetalert.Warning(BoxMsg.Title_Warning, "โปรดระบุรายการวัสดุที่ต้องการเบิก");
                            else {
                                Sweetalert.Confirm(BoxMsg.Title_Confirm, "ท่านต้องการส่งคำขอเบิกหรือไม่?",
                                    async () => {
                                        let d = await AxiosPostJson("api/Material/Request_Save", this.state.req);
                                        if (d.data) {
                                            let r = d.data;
                                            if (r.Success) Sweetalert.Success(BoxMsg.Title_Success, BoxMsg.Desc_Success_Save, this.RedirectToList);
                                            else Sweetalert.Error(BoxMsg.Title_Error, r.Message);
                                        }
                                    });
                            }
                        }}>
                        <div className="ipane-head">แบบคำขอเบิกวัสดุ</div>
                        <div className="ipane-body small">
                            <div className="row">
                                <div className="col-input col-lg-3 col-md-6">
                                    <b className="text-dark">ผู้ขอเบิก</b>
                                    <div>{this.state.UserInfo ? (this.state.UserInfo.sEmployeeCode + " - " + this.state.UserInfo.sName) : null}</div>
                                </div>
                                <div className="col-input col-lg-3 col-md-6">
                                    <b className="text-dark">ตำแหน่ง</b>
                                    <div>{this.state.UserInfo ? this.state.UserInfo.sPosition : null}</div>
                                </div>
                                <div className="col-input col-lg-3 col-md-6">
                                    <b className="text-dark">หน่วยงาน</b>
                                    <div>{this.state.UserInfo ? this.state.UserInfo.sOrganization : null}</div>
                                </div>
                                <div className="col-input col-lg-3 col-md-6">
                                    <b className="text-dark">อีเมล</b>
                                    <div>{this.state.UserInfo ? this.state.UserInfo.sEmail : null}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-input col-lg-3 col-md-6">
                                    <b className="text-dark">สถานที่ใช้งาน</b>
                                    <AvField name="txtLocation" type="text" className="form-control form-control-sm"
                                        value={this.state.req.sLocation}
                                        onChange={(e) => { this.RequestData_SetValue("sLocation", e.currentTarget.value); }}
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'โปรดระบุสถานที่ใช้งาน'
                                            }
                                        }} />
                                </div>
                                <div className="col-input col-lg-3 col-md-6">
                                    <b className="text-dark">เหตุผลในการเบิก</b>
                                    <AvField name="ddlReason" type="select" className="form-control form-control-sm"
                                        value={this.state.req.nReasonID}
                                        onChange={(e) => { this.RequestData_SetValue("nReasonID", +e.currentTarget.value || undefined); }}
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'โปรดระบุเหตุผลในการเบิก'
                                            }
                                        }}>
                                        <option key="REASON_0" value="">- ระบุ -</option>
                                        {
                                            this.state.source_reason.map((d, i) => {
                                                return <option key={"REASON_" + d.ReasonID} value={d.ReasonID}>{d.Name}</option>
                                            })
                                        }
                                    </AvField>
                                </div>
                                <div className="col-input col-lg-6">
                                    <b className="text-dark">หมายเหตุเพิ่มเติม</b>
                                    <input type="text" className="form-control form-control-sm"
                                        value={this.state.req.sReasonDetail}
                                        onChange={(e) => { this.RequestData_SetValue("sReasonDetail", e.currentTarget.value); }} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-input col">
                                    <div className="custom-control custom-checkbox">
                                        <input id="cbFastTrack" type="checkbox" className="custom-control-input"
                                            checked={this.state.req.isFastTrack}
                                            onChange={(e) => { this.RequestData_SetValue("isFastTrack", e.currentTarget.checked); }} />
                                        <label htmlFor="cbFastTrack" className="custom-control-label"><b>FAST TRACK</b></label>
                                    </div>
                                    <AvField name="txtFastTrackDetail" type="text" className="form-control form-control-sm" placeholder="เหตุผลในการเบิก"
                                        disabled={!this.state.req.isFastTrack}
                                        value={this.state.req.sFastTrackDetail}
                                        onChange={(e) => { this.RequestData_SetValue("sFastTrackDetail", e.currentTarget.value); }}
                                        validate={{
                                            required: {
                                                value: this.state.req.isFastTrack,
                                                errorMessage: 'โปรดระบุเหตุผลในการเบิกแบบ Fast Track'
                                            }
                                        }} />
                                </div>
                            </div>
                        </div>
                    </AvForm>

                    <div className="ipane ipane-2">
                        <div className="ipane-head">บัญชีรายการวัสดุ</div>
                        <div className="ipane-body">
                            <div className="row">
                                <div className="col-input col-lg-3 col-md-4 py-0 pr-1">
                                    <div key="GROUP_0" className="list-group-item bg-transparent px-0 border-top-0 border-left-0 border-right-0 rounded-0">
                                        <b>หมวดหมู่ทั้งหมด</b>
                                    </div>
                                    <ScrollArea speed={0.25} className="scrollarea-catalog">
                                        <ul className="list-group list-group-flush">
                                            {
                                                this.state.source_group.map(g => {
                                                    return <li key={"GROUP_" + g.GroupID} className="list-group-item bg-transparent px-0">
                                                        <div className="form-row flex-nowrap align-items-center">
                                                            <div className="col">
                                                                <a className={"link-filter filter-group" + (this.state.selected_GroupID == g.GroupID ? " filter-selected" : "")}
                                                                    onClick={() => this.setState({ selected_GroupID: g.GroupID, selected_CategoryID: 0 }, this.Material_Binding)}>
                                                                    <div className="link-icon">
                                                                        {this.state.selected_GroupID == g.GroupID ? <i className="fa fa-check-circle"></i> : <i className="fa fa-circle"></i>}
                                                                    </div>
                                                                    <div className="link-label">{g.Name}</div>
                                                                </a>
                                                            </div>
                                                            <div className="col-auto">
                                                                <button className="btn btn-sm btn-light rounded-circle" onClick={() => {
                                                                    let arrGroupID = Array.from(this.state.expanded_GroupID);
                                                                    let nIndex = arrGroupID.indexOf(g.GroupID);
                                                                    if (nIndex > -1) arrGroupID.splice(nIndex, 1); else arrGroupID.push(g.GroupID);
                                                                    this.setState({ expanded_GroupID: arrGroupID }, this.Material_Binding)
                                                                }}>
                                                                    {this.state.expanded_GroupID.indexOf(g.GroupID) > -1 ? <i className="fa fa-chevron-up"></i> : <i className="fa fa-chevron-down"></i>}
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <ul className={"list-unstyled collapse" + (this.state.expanded_GroupID.indexOf(g.GroupID) > -1 ? " show" : "")}>
                                                            {
                                                                this.state.source_category.filter(w => w.GroupID == g.GroupID).map(c => {
                                                                    return <li key={"CATEGORY_" + c.CategoryID}>
                                                                        <a className={"link-filter" + (this.state.selected_CategoryID == c.CategoryID ? " filter-selected" : "")}
                                                                            onClick={() => this.setState({ selected_GroupID: g.GroupID, selected_CategoryID: this.state.selected_CategoryID == c.CategoryID ? 0 : c.CategoryID }, this.Material_Binding)}>
                                                                            <div className="link-icon">{this.state.selected_CategoryID == c.CategoryID ? <i className="far fa-check-circle"></i> : null}</div>
                                                                            <div className="link-label">{c.Name}</div>
                                                                        </a>
                                                                    </li>
                                                                })
                                                            }
                                                        </ul>
                                                    </li>
                                                })
                                            }
                                            <li key="GROUP_X" className="list-group-item bg-transparent"></li>
                                        </ul>
                                    </ScrollArea>
                                </div>
                                <div className="col-input col-lg-9 col-md-8 p-0">
                                    <div className="box-view">
                                        <div className="box-head">
                                            <div className="row align-items-center">
                                                <div className="col-auto mr-auto">
                                                    <div className="iform-search">
                                                        <input className="iform-input" type="text" placeholder="ค้นหา"
                                                            onKeyUp={(e) => this.setState({ filter_text: e.currentTarget.value.trim() }, this.Material_Binding)} />
                                                        <div className="iform-icon"><i className="fa fa-search"></i></div>
                                                    </div>
                                                </div>
                                                <div className="col-auto ml-auto">
                                                    {this.state.item_filtered.length ? <ul className="pagination pagination-sm mb-0">
                                                        <li className={"page-item" + (this.state.page_selected > 1 ? "" : " disabled")}>
                                                            <button className="page-link" aria-label="Previous"
                                                                onClick={() => { if (this.state.page_selected > 1) this.setState({ page_selected: this.state.page_selected - 1 }, this.Material_Binding) }}>
                                                                <i className="fa fa-angle-double-left"></i>
                                                            </button>
                                                        </li>
                                                        {this.Pagination_Create()}
                                                        <li className={"page-item" + (this.state.page_selected < this.state.page_length ? "" : " disabled")}
                                                            onClick={() => { if (this.state.page_selected < this.state.page_length) this.setState({ page_selected: this.state.page_selected - 1 }, this.Material_Binding) }}>
                                                            <button className="page-link" aria-label="Next">
                                                                <i className="fa fa-angle-double-right"></i>
                                                            </button>
                                                        </li>
                                                    </ul> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-body">
                                            <ScrollArea speed={0.25} className="scrollarea-catalog">
                                                {this.CatalogBoard_Create()}
                                            </ScrollArea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ipane ipane-3">
                        <div className="ipane-head">รายการเบิกวัสดุ <i className="fa fa-shopping-cart"></i></div>
                        <div className="ipane-body bg-transparent">
                            {this.ItemCart_Create()}
                        </div>
                    </div>

                    <div className="form-row mt-3">
                        <div className="col-auto ml-auto">
                            <button className="btn btn-dark" onClick={this.RedirectToList}>ยกเลิก</button>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-primary"
                                onClick={() => {
                                    let formRequester = this.refFormRequester.current;
                                    if (formRequester) formRequester.submit();
                                }}>
                                <i className="fa fa-paper-plane"></i> ส่งคำขอเบิก
                            </button>
                            <Link id="lnkReqList" to="/request-list" hidden></Link>
                        </div>
                    </div>
                </div>
            </div>);
    }

}