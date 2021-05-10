import React, { Fragment, useState } from "react";
import { useHistory } from "react-router";
import "./ParcelPickinglist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardBody,
  Collapse,
  CustomInput,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { TooltipsMSG } from "../Systems/SystemComponent";
import CreateTable, { CellHeader } from "../Systems/Table";

const ParcelPickinglist = () => {
  const [Activetab, setActivetab] = useState("ew");
  const [lstData_example, setlstData] = useState([
    {
      nOrder: 640003,
      sName: "สะอาด สีสดใส",
      sReason: "ใช้งาน",
      sAmount: "2,500.00",
      dDate: "24/03/2564 16:35 น.",
      sRecipient: "สะอาด สีสดใส",
      dPaymentDate: "25/03/2564 16:35 น.",
    },
    {
      nOrder: 640002,
      sName: "ยิ่งยอด จันทร์โทลา",
      sReason: "ใช้งาน",
      sAmount: "12,890.50",
      dDate: "24/03/2564 16:35 น.",
      sRecipient: "ยิ่งยอด จันทร์โทลา",
      dPaymentDate: "25/03/2564 16:35 น.",
    },
    {
      nOrder: 640001,
      sName: "อภิรัช ทรงดี",
      sReason: "ใช้งาน",
      sAmount: "2,800.00",
      dDate: "24/03/2564 16:35 น.",
      sRecipient: "อภิรัช ทรงดี",
      dPaymentDate: "25/03/2564 16:35 น.",
    },
  ]);

  const [sublstData, setsublstData] = useState([
    {
      sName: "แว่นตา เลนส์ใส",
      sRequestAmount: "8",
      sApproval: "8",
      sUnit: "ชิ้น",
      sPrice: "800.00",
    },
    {
      sName: "แว่นครอบแว่นสายตา เลนส์ใส",
      sRequestAmount: "15",
      sApproval: "15",
      sUnit: "ชิ้น",
      sPrice: "1,500.00",
    },
    {
      sName: "แว่นครอบตา ป้องกันสารเคมี",
      sRequestAmount: "5",
      sApproval: "5",
      sUnit: "ชิ้น",
      sPrice: "500.00",
    },
  ]);

  const [RowSelected, setRowSelected] = useState([] as any);
  const [collapses, setCollapse] = useState(
    Array(lstData_example.length).fill(false)
  );
  const toggle = (i: number) => {
    const newCollapse = collapses.slice();
    newCollapse[i] = !newCollapse[i];
    setCollapse(newCollapse);
  };
  const onDeleteData = () => {};
  const SearchData = () => {};

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

  const headerEW: CellHeader[] = [
    {
      Sortby: "",
      label: "",
      ClassName: "align-middle text-center",
      SortType: Number,
      CSSStyle: { width: 1 },
    },
    {
      label: "",
      Sortby: "",
      ClassName: "align-middle",
      SortType: Number,
      CSSStyle: { width: 1 },
    },
    {
      label: "เลขที่รายการ",
      Sortby: "",
      ClassName: "align-middle",
      SortType: Number,
    },
    {
      label: "ชื่อ-นามสกุล",
      Sortby: "",
      ClassName: "align-middle",
      SortType: String,
    },
    {
      label: "เหตุผลการเบิก",
      Sortby: "",
      ClassName: "align-middle",
      SortType: String,
    },
    {
      label: "จำนวนเงิน",
      Sortby: "",
      ClassName: "align-middle",
      SortType: Number,
    },
    {
      label: "วันที่สร้างรายการ",
      Sortby: "",
      ClassName: "align-middle text-center",
      SortType: String,
    },
    {
      label: "หมายเหตุ / เหตุผล",
      Sortby: "",
      ClassName: "align-middle text-center",
      SortType: String,
    },
    {
      label: "",
      Sortby: "",
      ClassName: "align-middle text-center",
      SortType: String,
    },
  ];

  const CreateDataEW = (o: any, i: any) => {
    return (
      <Fragment>
        <tr key={i}>
          {
            <td className="align-middle text-center">
              <CustomInput
                type="checkbox"
                id={`cbBody_${o.nID}`}
                label={""}
                onChange={(e: any) => {
                  let el = e.target;
                  if (el.checked) {
                    onSelectedRow(o.nID);
                  } else {
                    onDeSelectedRow(o.nID);
                  }
                }}
                checked={RowSelected.indexOf(o.nID) !== -1}
              />
            </td>
          }
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
          <td className="align-middle text-center">{o.nOrder}</td>
          <td className="align-middle text-center">{o.sName}</td>
          <td className="align-middle">{o.sReason}</td>
          <td className="align-middle text-right">{o.sAmount}</td>
          <td className="align-middle text-center">{o.dDate}</td>
          <td className="align-middle text-center">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="กรณียกเลิก"
            />
          </td>
          <td className="align-middle text-center">
            <a href="admin-parcelpickinglist-detail">
              <Button size="sm" type="button" color="info">
                <FontAwesomeIcon icon={["fas", "edit"]} />
              </Button>
            </a>
          </td>
        </tr>

        <tr>
          <td colSpan={12} className="p-0">
            <Collapse isOpen={collapses[i]} key={i}>
              <Card className="border-0">
                <CardBody>
                  <div>
                    <CreateTable
                      Header={subheaderEW}
                      ItemData={sublstData}
                      CreateDataRow={SubCreateDataEW}
                    />
                  </div>
                  <div className="row">
                    <div className="col-auto ml-auto">
                      <div className="form-row">
                        <div className="col-auto">
                          <div className="small">
                            <span>รวม</span>&nbsp;
                            <b>
                              <span>2800.00</span>
                            </b>
                            &nbsp;
                            <span>บาท</span>&nbsp;
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Collapse>
          </td>
        </tr>
      </Fragment>
    );
  };

  const subheaderEW: CellHeader[] = [
    {
      Sortby: "",
      SortType: Number,
      ClassName: "align-middle text-center text-nowrap",
      label: "ที่",
      CSSStyle: { width: 1 },
    },
    {
      label: "ชื่อวัสดุ",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle",
    },
    {
      label: "จำนวนขอเบิก",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle text-center",
    },
    {
      label: "จำนวนอนุมัติ",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle text-center",
      CSSStyle: { width: 100 },
    },
    {
      label: "หน่วย",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle text-center",
    },
    {
      label: "ราคา",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle text-center",
    },
    {
      label: "หมายเหตุ / เหตุผล",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle text-center",
    },
  ];

  const SubCreateDataEW = (obj, Subindex) => {
    return (
      <tr key={Subindex}>
        <td className="align-middle text-center">{Subindex + 1}</td>
        <td className="align-middle">{obj.sName}</td>
        <td className="align-middle text-right">{obj.sRequestAmount}</td>
        <td className="align-middle text-center">
          <input
            type="text"
            className="form-control form-control-sm text-right"
            value={obj.sApproval}
          />
        </td>
        <td className="align-middle text-center">{obj.sUnit}</td>
        <td className="align-middle text-right">{obj.sPrice}</td>
        <td className="align-middle text-center">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="ระบุเหตุผลกรณี ปรับลดจำนวน"
          />
        </td>
      </tr>
    );
  };

  const headerWM: CellHeader[] = [
    {
      Sortby: "",
      label: "",
      ClassName: "align-middle text-center",
      SortType: Number,
      CSSStyle: { width: 1 },
    },
    {
      label: "",
      Sortby: "",
      ClassName: "align-middle",
      SortType: Number,
      CSSStyle: { width: 1 },
    },
    {
      label: "เลขที่รายการ",
      Sortby: "",
      ClassName: "align-middle",
      SortType: Number,
    },
    {
      label: "ชื่อ-นามสกุล",
      Sortby: "",
      ClassName: "align-middle",
      SortType: String,
    },
    {
      label: "เหตุผลการเบิก",
      Sortby: "",
      ClassName: "align-middle",
      SortType: String,
    },
    {
      label: "จำนวนเงิน",
      Sortby: "",
      ClassName: "align-middle",
      SortType: Number,
    },
    {
      label: "วันที่สร้างรายการ",
      Sortby: "",
      ClassName: "align-middle text-center",
      SortType: String,
    },
    {
      label: "รหัสผู้รับ",
      Sortby: "",
      ClassName: "align-middle text-center",
      SortType: String,
      CSSStyle: { width: 100 },
    },
    {
      label: "หมายเหตุ / เหตุผล",
      Sortby: "",
      ClassName: "align-middle text-center",
      SortType: String,
    },
  ];

  const CreateDataWM = (o: any, i: any) => {
    return (
      <Fragment>
        <tr key={i}>
          {
            <td className="align-middle text-center">
              <CustomInput
                type="checkbox"
                id={`cbBody_${o.nID}`}
                label={""}
                onChange={(e: any) => {
                  let el = e.target;
                  if (el.checked) {
                    onSelectedRow(o.nID);
                  } else {
                    onDeSelectedRow(o.nID);
                  }
                }}
                checked={RowSelected.indexOf(o.nID) !== -1}
              />
            </td>
          }
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
          <td className="align-middle text-center">{o.nOrder}</td>
          <td className="align-middle">{o.sName}</td>
          <td className="align-middle">{o.sReason}</td>
          <td className="align-middle text-right">{o.sAmount}</td>
          <td className="align-middle text-center">{o.dDate}</td>
          <td className="align-middle text-center">
            <input type="text" className="form-control form-control-sm" />
          </td>
          <td className="align-middle text-center">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="กรณียกเลิก"
            />
          </td>
        </tr>

        <tr>
          <td colSpan={12} className="p-0">
            <Collapse isOpen={collapses[i]} key={i}>
              <Card className="border-0">
                <CardBody>
                  <div>
                    <CreateTable
                      Header={subheaderWM}
                      ItemData={sublstData}
                      CreateDataRow={SubCreateDataWM}
                    />
                  </div>
                  <div className="row">
                    <div className="col-auto ml-auto">
                      <div className="form-row">
                        <div className="col-auto">
                          <div className="small">
                            <span>รวม</span>&nbsp;
                            <b>
                              <span>2800.00</span>
                            </b>
                            &nbsp;
                            <span>บาท</span>&nbsp;
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Collapse>
          </td>
        </tr>
      </Fragment>
    );
  };

  const subheaderWM: CellHeader[] = [
    {
      Sortby: "",
      SortType: Number,
      ClassName: "align-middle text-center text-nowrap",
      label: "ที่",
      CSSStyle: { width: 1 },
    },
    {
      label: "ชื่อวัสดุ",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle",
    },
    {
      label: "จำนวนขอเบิก",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle text-center",
    },
    {
      label: "จำนวนอนุมัติ",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle text-center",
      CSSStyle: { width: 100 },
    },
    {
      label: "หน่วย",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle text-center",
    },
    {
      label: "ราคา",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle text-center",
    },
    {
      label: "หมายเหตุ / เหตุผล",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle text-center",
    },
  ];

  const SubCreateDataWM = (obj, Subindex) => {
    return (
      <tr key={Subindex}>
        <td className="align-middle text-center">{Subindex + 1}</td>
        <td className="align-middle">{obj.sName}</td>
        <td className="align-middle text-right">{obj.sRequestAmount}</td>
        <td className="align-middle text-center">
          <input
            type="text"
            className="form-control form-control-sm text-right"
            value={obj.sApproval}
          />
        </td>
        <td className="align-middle text-center">{obj.sUnit}</td>
        <td className="align-middle text-right">{obj.sPrice}</td>
        <td className="align-middle text-center">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="ระบุเหตุผลกรณี ปรับลดจำนวน"
          />
        </td>
      </tr>
    );
  };

  const headerSC: CellHeader[] = [
    {
      Sortby: "",
      label: "",
      ClassName: "align-middle text-center",
      SortType: Number,
      CSSStyle: { width: 1 },
    },
    {
      label: "",
      Sortby: "",
      ClassName: "align-middle",
      SortType: Number,
      CSSStyle: { width: 1 },
    },
    {
      label: "เลขที่รายการ",
      Sortby: "",
      ClassName: "align-middle",
      SortType: Number,
    },
    {
      label: "ชื่อ-นามสกุล",
      Sortby: "",
      ClassName: "align-middle",
      SortType: String,
    },
    {
      label: "เหตุผลการเบิก",
      Sortby: "",
      ClassName: "align-middle",
      SortType: String,
    },
    {
      label: "จำนวนเงิน",
      Sortby: "",
      ClassName: "align-middle",
      SortType: Number,
    },
    {
      label: "วันที่สร้างรายการ",
      Sortby: "",
      ClassName: "align-middle text-center",
      SortType: String,
    },
    {
      label: "ผู้รับ",
      Sortby: "",
      ClassName: "align-middle text-center",
      SortType: String,
    },
    {
      label: "วันที่จ่ายวัสดุ",
      Sortby: "",
      ClassName: "align-middle text-center",
      SortType: String,
    },
  ];

  const CreateDataSC = (o: any, i: any) => {
    return (
      <Fragment>
        <tr key={i}>
          {
            <td className="align-middle text-center">
              <CustomInput
                type="checkbox"
                id={`cbBody_${o.nID}`}
                label={""}
                onChange={(e: any) => {
                  let el = e.target;
                  if (el.checked) {
                    onSelectedRow(o.nID);
                  } else {
                    onDeSelectedRow(o.nID);
                  }
                }}
                checked={RowSelected.indexOf(o.nID) !== -1}
              />
            </td>
          }
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
          <td className="align-middle text-center">{o.nOrder}</td>
          <td className="align-middle">{o.sName}</td>
          <td className="align-middle">{o.sReason}</td>
          <td className="align-middle text-right">{o.sAmount}</td>
          <td className="align-middle text-center">{o.dDate}</td>
          <td className="align-middle">{o.sRecipient}</td>
          <td className="align-middle text-center">{o.dPaymentDate}</td>
        </tr>

        <tr>
          <td colSpan={12} className="p-0">
            <Collapse isOpen={collapses[i]} key={i}>
              <Card className="border-0">
                <CardBody>
                  <div>
                    <CreateTable
                      Header={subheaderSC}
                      ItemData={sublstData}
                      CreateDataRow={SubCreateDataSC}
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

  const subheaderSC: CellHeader[] = [
    {
      Sortby: "",
      SortType: Number,
      ClassName: "align-middle text-center text-nowrap",
      label: "ที่",
      CSSStyle: { width: 1 },
    },
    {
      label: "ชื่อวัสดุ",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle",
    },
    {
      label: "จำนวนขอเบิก",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle text-center",
    },
    {
      label: "จำนวนอนุมัติ",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle text-center",
    },
    {
      label: "หน่วย",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle text-center",
    },
    {
      label: "ราคา",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle text-center",
    },
  ];

  const SubCreateDataSC = (obj, Subindex) => {
    return (
      <tr key={Subindex}>
        <td className="align-middle text-center">{Subindex + 1}</td>
        <td className="align-middle">{obj.sName}</td>
        <td className="align-middle text-right">{obj.sRequestAmount}</td>
        <td className="align-middle text-right">{obj.sApproval}</td>
        <td className="align-middle text-center">{obj.sUnit}</td>
        <td className="align-middle text-right">{obj.sPrice}</td>
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
              placeholder="เลขที่รายการ"
              type="text"
            />
          </div>
        </div>
        <div className="col-auto">
          <div className="form-group">
            <input
              className="form-control form-control-sm"
              placeholder="รหัส / ชื่อ-นามสกุล"
              type="text"
            />
          </div>
        </div>
        <div className="col-auto">
          <div className="form-group">
            <select className="form-control form-control-sm">
              <option value="">- หน่วยงาน -</option>
              <option value="1">คอก.</option>
              <option value="2">คยก.6</option>
              <option value="3">คยก.5</option>
              <option value="4">ครส.</option>
              <option value="5">คฟร.</option>
            </select>
          </div>
        </div>
        <div className="col-auto">
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-sm"
              placeholder="วันที่เริ่มต้น"
              required
            />
          </div>
        </div>
        <div className="col-auto">
          <div className="form-group">
            <input
              className="form-control form-control-sm"
              placeholder="วันที่สิ้นสุด"
              type="date"
              required
            />
          </div>
        </div>
        <div className="col-auto">
          <div className="form-group">
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
      <Nav className="nav nav-tabs navTabList" role="tablist">
        <NavItem>
          <NavLink
            className={Activetab === "ew" ? "active" : ""}
            onClick={() => {
              setActivetab("ew");
            }}
          >
            รายการรอจัดอุปกรณ์ <span className="badge badge-info">3</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={Activetab === "wm" ? "active" : ""}
            onClick={() => {
              setActivetab("wm");
            }}
          >
            รายการให้พนักงานมารับวัสดุ <span className="badge badge-info">3</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={Activetab === "sc" ? "active" : ""}
            onClick={() => {
              setActivetab("sc");
            }}
          >
            รายการจ่ายวัสดุแล้ว <span className="badge badge-info">3</span>
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={Activetab}>
        <TabPane tabId="ew">
          <div className="row mt-1">
            <CreateTable
              Header={headerEW}
              ItemData={lstData_example}
              CreateDataRow={CreateDataEW}
              IsHasBtnDEL={false}
              onBtnDelClick={onDeleteData}
              rowSelected={RowSelected}
            />
          </div>
          <div className="form-row">
            <div className="col-auto">
              <div className="form-group">
                <button type="submit" className="btn btn-info btn-sm">
                  <i className="fas fa-print"></i> พิมพ์แบบฟอร์ม
                </button>
              </div>
            </div>
            <div className="col-auto">
              <div className="form-group">
                <button type="submit" className="btn btn-success btn-sm">
                  <i className="fas fa-check"></i> แจ้งรับวัสดุ
                </button>
              </div>
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-danger btn-sm">
                <i className="fas fa-times"></i> ยกเลิกคำขอ
              </button>
            </div>
          </div>
        </TabPane>
        <TabPane tabId="wm">
          <div className="row mt-1">
            <CreateTable
              Header={headerWM}
              ItemData={lstData_example}
              CreateDataRow={CreateDataWM}
              IsHasBtnDEL={false}
            />
          </div>
          <div className="form-row">
            <div className="col-auto">
              <div className="form-group">
                <button type="submit" className="btn btn-info btn-sm">
                  <i className="fas fa-print"></i> พิมพ์แบบฟอร์ม
                </button>
              </div>
            </div>
            <div className="col-auto">
              <div className="form-group">
                <button type="submit" className="btn btn-warning btn-sm">
                  <i className="fas fa-check"></i> จ่ายวัสดุ
                </button>
              </div>
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-danger btn-sm">
                <i className="fas fa-times"></i> ยกเลิกคำขอ
              </button>
            </div>
          </div>
        </TabPane>
        <TabPane tabId="sc">
          <div className="row mt-1">
            <CreateTable
              Header={headerSC}
              ItemData={lstData_example}
              CreateDataRow={CreateDataSC}
              IsHasBtnDEL={false}
            />
          </div>
          <div className="row">
            <div className="col-auto">
              <div className="form-group">
                <Button size="sm" type="button" color="info">
                  <i className="fas fa-print"></i> พิมพ์แบบฟอร์ม
                </Button>
              </div>
            </div>
          </div>
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default ParcelPickinglist;
