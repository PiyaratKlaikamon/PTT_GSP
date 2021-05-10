import * as React from "react";
import { Route, Switch, Router } from "react-router";
// import Layout from "./components/Layout";
// import Home from "./components/Home";
// import Counter from "./components/Counter";
// import FetchData from "./components/FetchData";

import "./custom.css";

import { createBrowserHistory } from "history";

import Test_ThaiDatePicker from "./components/_Test-ThaiDatePicker/ThaiDatePicker";
import Test_NumericInput from "./components/_Test-NumericInput/NumericInput";

import Login from "./components/login/Login";

import LayoutFront from "./components/_Layout-Main/LayoutMain";
import Home from "./components/main-home/Home";
import RequestForm from "./components/main-request_form/RequestForm";
import RequestList from "./components/main-request_list/RequestList";
import RequestApproval from "./components/main-request_approval/RequestApproval";

import LayoutBack from "./components/_Layout-Admin/Layout_Back";
import User_Permission_list from "./components/admin-basicinformation/Admin_UserPermission/User_Permission_list";
import User_Permission_edit from "./components/admin-basicinformation/Admin_UserPermission/User_Permission_edit";
import ParcelGroup from "./components/admin-basicinformation/admin-parcelgroup/ParcelGroup";
import ParcelGroup_Edit from "./components/admin-basicinformation/admin-parcelgroup/ParcelGroup_Edit";
import ParcelType from "./components/admin-basicinformation/admin-parceltype/ParcelType";
import ParcelType_Edit from "./components/admin-basicinformation/admin-parceltype/ParcelType_Edit";
import ParcelUnit from "./components/admin-basicinformation/admin-parcelunit/ParcelUnit";
import ParcelUnit_Edit from "./components/admin-basicinformation/admin-parcelunit/ParcelUnit_Edit";
import ParcelStorage from "./components/admin-basicinformation/admin-parcelstorage/ParcelStorage";
import ParcelStorage_Edit from "./components/admin-basicinformation/admin-parcelstorage/ParcelStorage_Edit";
import Supplies_list from "./components/admin-basicinformation/Admin_supplies/Supplies_list";
import Supplies_edit from "./components/admin-basicinformation/Admin_supplies/Supplies_edit";
import JobDescription from "./components/admin-basicinformation/admin-jobdescription/JobDescription";
import JobDescription_Edit from "./components/admin-basicinformation/admin-jobdescription/JobDescription_Edit";
import PendingApproval from "./components/admin-pendingapproval/PendingApproval";
import PendingApproval_Detail from "./components/admin-pendingapproval/PendingApproval_Detail";
import Disbursement_Report from "./components/admin-report/pie-chart-Disbursement/Disbursement_Report";
import Bar_Trend_Chart from "./components/admin-report/bar-trend-chart/Bar_Trend_Chart";
import Request_to_ImproveStock from "./components/admin-request-to-improvestock/Request_to_ImproveStock";
import Request_to_ImproveStock_Edit from "./components/admin-request-to-improvestock/Request_to_ImproveStock_Edit";
import GoodsReceive_edit from "./components/admin-goods-receive/goods-receive_edit";
import GoodsReceive_list from "./components/admin-goods-receive/goods-receive_list";
import Request_to_ImproveStock_List from "./components/admin-request-to-improvestock-list/Request_to_ImproveStock_List";

import ManageSeller from "./components/admin-basicinformation/admin-manageseller/ManageSeller";
import ManageSeller_Edit from "./components/admin-basicinformation/admin-manageseller/ManageSeller_Edit";
import ApprovalLimit from "./components/admin-basicinformation/admin-approval-limit/ApprovalLimit";
import AddParcel from "./components/admin-addparcel/AddParcel";
import AddParcel_Edit from "./components/admin-addparcel/AddParcel_Edit"
import ParcelPickinglist from "./components/admin-parcel-pickinglist/ParcelPickinglist";
import Waitingforapproval from "./components/admin-basicinformation/Admin_Waitingforapproval/Waitingforapproval_list"
import Withdrawalhistorylist from "./components/admin-report/Withdrawal-history/Withdrawal_history_list"
import Inventory_list from "./components/admin-report/Inventory/Inventory_list"
import ParcelPickinglist_Detail from "./components/admin-parcel-pickinglist/ParcelPickinglist_Detail";
import InventoryList from "./components/admin-inventorylist/InventoryList";
import WithdrawalStatus from "./components/admin-report/admin-withdrawalstatus/WithdrawalStatus";
import ApprovalList from "./components/admin-approval-list/ApprovalList";
import ReasonWithdrawal from "./components/admin-basicinformation/admin-reason/ReasonWithdrawal";
import ReasonWithdrawal_Edit from "./components/admin-basicinformation/admin-reason/ReasonWithdrawal_Edit";


const baseUrl = document
    .getElementsByTagName("base")[0]
    .getAttribute("href") as string;
const history = createBrowserHistory({ basename: baseUrl });

export function getHistory() {
    return history;
}

const route = [
    { path: "/_Test-ThaiDatePicker", component: Test_ThaiDatePicker, exact: true },
    { path: "/_Test-NumericInput", component: Test_NumericInput, exact: true },


    { path: "/", component: Login, exact: true },
    { path: "/login", component: Login, exact: true },
    { path: "/home", component: Home, layout: LayoutFront, exact: true, layoutProps: { MenuID_Selected: 1 } },
    { path: "/request-form", component: RequestForm, layout: LayoutFront, exact: true, layoutProps: { MenuID_Selected: 4 } },
    { path: "/request-list", component: RequestList, layout: LayoutFront, exact: true, layoutProps: { MenuID_Selected: 5 } },
    { path: "/request-approval", component: RequestApproval, layout: LayoutFront, exact: true, layoutProps: { MenuID_Selected: 6 } },

    { path: "/admin-parcelgroup", component: ParcelGroup, layout: LayoutBack, exact: true, layoutProps: { title: "กลุ่มวัสดุ" }, },
    { path: "/admin-parcelgroup-edit", component: ParcelGroup_Edit, layout: LayoutBack, exact: true, layoutProps: { title: "กลุ่มวัสดุ" }, },
    { path: "/admin-user-permission-list", component: User_Permission_list, layout: LayoutBack, exact: true, layoutProps: { title: "กำหนดสิทธิ์ผู้ใช้งาน" }, },
    { path: "/admin-user-permission-edit", component: User_Permission_edit, layout: LayoutBack, exact: true, layoutProps: { title: "กำหนดสิทธิ์ผู้ใช้งาน" }, },
    { path: "/admin-parceltype", component: ParcelType, layout: LayoutBack, exact: true, layoutProps: { title: "ประเภทวัสดุ" }, },
    { path: "/admin-parceltype-edit", component: ParcelType_Edit, layout: LayoutBack, exact: true, layoutProps: { title: "ประเภทวัสดุ" }, },
    { path: "/admin-parcelunit", component: ParcelUnit, layout: LayoutBack, exact: true, layoutProps: { title: "หน่วยนับวัสดุ" }, },
    { path: "/admin-parcelunit_edit", component: ParcelUnit_Edit, layout: LayoutBack, exact: true, layoutProps: { title: "หน่วยนับวัสดุ" }, },
    { path: "/admin-parcelstorage", component: ParcelStorage, layout: LayoutBack, exact: true, layoutProps: { title: "สถานที่เก็บวัสดุ" }, },
    { path: "/admin-parcel_storage-edit", component: ParcelStorage_Edit, layout: LayoutBack, exact: true, layoutProps: { title: "สถานที่เก็บวัสดุ" }, },
    { path: "/admin-manageseller", component: ManageSeller, layout: LayoutBack, exact: true, layoutProps: { title: "จัดการข้อมูลผู้ขาย" }, },
    { path: "/admin-manage_seller-edit", component: ManageSeller_Edit, layout: LayoutBack, exact: true, layoutProps: { title: "จัดการข้อมูลผู้ขาย" }, },
    { path: "/admin-approvallimit", component: ApprovalLimit, layout: LayoutBack, exact: true, layoutProps: { title: "กำหนดวงเงินการอนุมัติ" }, },
    { path: "/admin-jobdescription", component: JobDescription, layout: LayoutBack, exact: true, layoutProps: { title: "กำหนดลักษณะงาน" }, },
    { path: "/admin-jobdescription_edit", component: JobDescription_Edit, layout: LayoutBack, exact: true, layoutProps: { title: "กำหนดลักษณะงาน" }, },
    { path: "/admin-pendingapproval", component: PendingApproval, layout: LayoutBack, exact: true, layoutProps: { title: "รายการรออนุมัติ" }, },
    { path: "/admin-addparcel", component: AddParcel, layout: LayoutBack, exact: true, layoutProps: { title: "เพิ่ม-ลด วัสดุ" }, },
    { path: "/admin-addparcel-edit", component: AddParcel_Edit, layout: LayoutBack, exact: true, layoutProps: { title: "เพิ่ม-ลด วัสดุ" }, },
    {path: "/admin-parcel-pickinglist",component: ParcelPickinglist,layout: LayoutBack,exact: true,layoutProps: { title: "รายการเบิกวัสดุ" },},
    { path: "/admin-supplies_list", component: Supplies_list, layout: LayoutBack, exact: true, layoutProps: { title: "วัสดุ" } },
    { path: "/admin-supplies_edit", component: Supplies_edit, layout: LayoutBack, exact: true, layoutProps: { title: "วัสดุ" } },
    { path: "/admin-Waiting_for_approval", component: Waitingforapproval, layout: LayoutBack, exact: true, layoutProps: { title: "ยกเลิกรายการรออนุมัติ" } },
    { path: "/admin-Withdrawal_history", component: Withdrawalhistorylist, layout: LayoutBack, exact: true, layoutProps: { title: "ประวัติการเบิกแยกตามบุคคลและสถานะ" } },
    { path: "/admin-Inventory_material", component: Inventory_list, layout: LayoutBack, exact: true, layoutProps: { title: "วัสดุคงคลัง" } },
    {path: "/admin-pendingapproval-detail",component: PendingApproval_Detail,layout: LayoutBack,exact: true,layoutProps: { title: "รายการรออนุมัติ" },},
    {path: "/admin-parcelpickinglist-detail",component: ParcelPickinglist_Detail,layout: LayoutBack,exact: true,layoutProps: { title: "รายการเบิกวัสดุ" },},
    {path: "/admin-inventorylist",component: InventoryList,layout: LayoutBack,exact: true,layoutProps: { title: "สรุปรายการรับวัสดุ" },},
    {path: "/admin-withdrawalstatus",component: WithdrawalStatus,layout: LayoutBack,exact: true,layoutProps: { title: "จำนวนสถานะการเบิก" },},
    { path: "/admin-approval-list", component: ApprovalList, layout: LayoutBack, exact: true, layoutProps: { title: "รายการรออนุมัติการเพิ่ม-ลด วัสดุ" },},
    { path: "/Disbursement_Report", component: Disbursement_Report, layout: LayoutBack, exact: true, layoutProps: { title: "PIE CHART ตามกลุ่มวัสดุ" },},
    { path: "/admin-Bar_Trend_Chart", component: Bar_Trend_Chart, layout: LayoutBack, exact: true, layoutProps: { title: "CHART ตามกลุ่มวัสดุ" }, }, 
    { path: "/admin-Request-to-ImproveStock", component: Request_to_ImproveStock, layout: LayoutBack, exact: true, layoutProps: { title: "ขอปรับปรุง Stock" }, }, 
    { path: "/admin-Request-to-ImproveStock-Edit", component: Request_to_ImproveStock_Edit, layout: LayoutBack, exact: true, layoutProps: { title: "ขอปรับปรุง Stock" }, }, 
    { path: "/admin-Goods-Receive_edit", component: GoodsReceive_edit, layout: LayoutBack, exact: true, layoutProps: { title: "ทำรับวัสดุ (Goods Receive)" }, }, 
    { path: "/admin-Goods-Receive_list", component: GoodsReceive_list, layout: LayoutBack, exact: true, layoutProps: { title: "ทำรับวัสดุ (Goods Receive)" }, }, 
    { path: "/admin-reasonwithdrawal", component: ReasonWithdrawal, layout: LayoutBack, exact: true, layoutProps: { title: "เหตุผลในการเบิก" }, }, 
    { path: "/admin-reasonwithdrawal_edit", component: ReasonWithdrawal_Edit, layout: LayoutBack, exact: true, layoutProps: { title: "เหตุผลในการเบิก" }, }, 
    { path: "/admin-Request-to-ImproveStock-Edit-List", component: Request_to_ImproveStock_List, layout: LayoutBack, exact: true, layoutProps: { title: "รายการรออนุมัติขอปรับปรุง Stock" }, }, 

];

export default () => (
    <Router history={history}>
        <Switch>
            {route.map((o) => {
                return (
                    <Route path={o.path} key={o.path} exact={o.exact}>
                        {o.layout ? (
                            <o.layout {...o.layoutProps}>
                                <o.component />
                            </o.layout>
                        ) : (
                            <o.component />
                        )}
                    </Route>
                );
            })}
        </Switch>
    </Router>

    //   <Layout>
    //       <Route exact path='/' component={Home} />
    //       <Route path='/counter' component={Counter} />
    //       <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    //   </Layout>
);
