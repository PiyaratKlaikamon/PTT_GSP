import React, { Fragment, useState } from "react";
import { useHistory } from "react-router";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Badge,
  Button,
  Collapse,
  CustomInput,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  UncontrolledDropdown,
} from "reactstrap";
import { TooltipsMSG } from "../Systems/SystemComponent";
import CreateTable, { CellHeader } from "../Systems/Table";

const ParcelPickinglist_Detail = () => {
  const history = useHistory();
  const [historyShow, sethistoryShow] = useState(false);
  const toggle = () => sethistoryShow(!historyShow);
  const [Activetab, setActivetab] = useState("dd");

  const [sublstData, setsublstData] = useState([
    {
      sName: "แว่นตา เลนส์ใส",
      sRequestAmount: "8",
      sApproval: "8",
      sUnit: "ชิ้น",
      sPrice: "800.00",
      sReason: "เกินความจำเป็น",
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
  const [lstData, setlstData] = useState([
    {
      Order: 4,
      sStep: "รอหัวหน้าเจ้าหน้าที่วัสดุอนุมัติ",
      sApproveBy: "ชาติ อ่อนน้อม",
      sStatus: "อนุมัติ",
      sDate: "25/03/2564 17:35 น.",
    },
    {
      Order: 3,
      sStep: "รอเจ้าหน้าที่วัสดุอนุมัติ",
      sApproveBy: "สมชาย ทองปาน",
      sStatus: "อนุมัติ",
      sDate: "25/03/2564 17:35 น.",
    },
    {
      Order: 2,
      sStep: "รอผู้บังคับบัญชาอนุมัติ",
      sApproveBy: "ประสิทธิ์ วิชิรา",
      sStatus: "อนุมัติ",
      sDate: "25/03/2564 17:35 น.",
    },
    {
      Order: 1,
      sStep: "บันทึกแบบคำขอเบิกวัสดุ",
      sApproveBy: "อภิรัช ทรงดี",
      sStatus: "บันทึก",
      sDate: "25/03/2564 17:35 น.",
    },
  ]);
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
        <td className="align-middle text-center">{obj.sName}</td>
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

  const subheaderAA: CellHeader[] = [
    {
      Sortby: "",
      SortType: Number,
      ClassName: "align-middle text-center text-nowrap",
      label: "ที่",
      CSSStyle: { width: 110 },
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

  const SubCreateDataAA = (obj, Subindex) => {
    return (
      <tr key={Subindex}>
        <td className="align-middle text-center">{Subindex + 1}</td>
        <td className="align-middle text-center">{obj.sName}</td>
        <td className="align-middle text-right">{obj.sRequestAmount}</td>
        <td className="align-middle text-right">{obj.sApproval}</td>
        <td className="align-middle text-center">{obj.sUnit}</td>
        <td className="align-middle text-right">{obj.sPrice}</td>
        <td className="align-middle">{obj.sReason}</td>
      </tr>
    );
  };

  const subheaderDD: CellHeader[] = [
    {
      Sortby: "",
      SortType: Number,
      ClassName: "align-middle text-center text-nowrap",
      label: "ที่",
      CSSStyle: { width: 110 },
    },
    {
      label: "ขั้นตอน",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle",
    },
    {
      label: "ดำเนินการโดย",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle text-center",
    },
    {
      label: "สถานะ",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle text-center",
      CSSStyle: { width: 100 },
    },
    {
      label: "วันที่ดำเนินการ",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle text-center",
    },
  ];

  const SubCreateDataDD = (obj, Subindex) => {
    return (
      <tr key={Subindex}>
        <td className="align-middle text-center">{obj.Order}</td>
        <td className="align-middle">{obj.sStep}</td>
        <td className="align-middle">{obj.sApproveBy}</td>
        <td className="align-middle text-center">{obj.sStatus}</td>
        <td className="align-middle text-center">{obj.sDate}</td>
      </tr>
    );
  };

  return (
    <Fragment>
      <AvForm>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <b>เลขที่รายการ</b>
              <AvField
                type="text"
                name="note"
                className="form-control"
                autoComplete="off"
                disabled={true}
                placeholder="6403003"
              ></AvField>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <b>รหัสพนักงาน</b>
              <AvField
                type="text"
                name="note"
                className="form-control"
                autoComplete="off"
                disabled={true}
                placeholder="570242"
              ></AvField>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <b>ชื่อ-นามสกุล</b>
              <AvField
                type="text"
                name="note"
                className="form-control"
                autoComplete="off"
                disabled={true}
                placeholder="อภิรัช ทรงดี"
              ></AvField>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <b>อีเมล</b>
              <AvField
                type="text"
                name="note"
                className="form-control"
                autoComplete="off"
                disabled={true}
                placeholder="apiruch.t@pttplc.com"
              ></AvField>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <b>ตำแหน่ง</b>
              <AvField
                type="text"
                name="note"
                className="form-control"
                autoComplete="off"
                disabled={true}
                placeholder="พ.บริหารความปลอดภัย"
              ></AvField>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <b>หน่วยงาน</b>
              <AvField
                type="text"
                name="note"
                className="form-control"
                autoComplete="off"
                disabled={true}
                placeholder="ปภ.ผยก."
              ></AvField>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <b>เหตุผลในการเบิก</b>
              <AvField
                type="text"
                name="note"
                className="form-control"
                autoComplete="off"
                disabled={true}
                placeholder="ใช้งาน"
              ></AvField>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <b>สถานที่ใช้งาน</b>
              <AvField
                type="text"
                name="note"
                className="form-control"
                autoComplete="off"
                disabled={true}
                placeholder="ห้องประชุม 4"
              ></AvField>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <b>หมายเหตุ</b>
              <AvField
                type="text"
                name="note"
                className="form-control"
                autoComplete="off"
                disabled={true}
                placeholder="-"
              ></AvField>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <div className="small">
                <b>&nbsp;</b>
              </div>
              <div className="form-check pt-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <div className="form-check-label small">
                  <b>Fast Track</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <b>รายการวัสดุที่ขอเบิก</b>
        <div className="row mt-1">
          <CreateTable
            Header={subheaderEW}
            ItemData={sublstData}
            CreateDataRow={SubCreateDataEW}
            IsHasBtnDEL={false}
          />
        </div>

        <div className="form-row">
          <div className="col-auto ml-auto">
            <div className="form-row">
              <div className="col-auto">
                <div className="form-group">
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
        </div>

        <Modal
          isOpen={historyShow}
          toggle={toggle}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <ModalHeader toggle={toggle}>ประวัติการทำรายการ</ModalHeader>
          <ModalBody>
            <Nav className="nav nav-tabs navTabList" role="tablist">
              <NavItem>
                <NavLink
                  className={Activetab === "dd" ? "active" : ""}
                  onClick={() => {
                    setActivetab("dd");
                  }}
                >
                  <i className="fas fa-user-friends"></i> ลำดับสถานะ
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={Activetab === "aa" ? "active" : ""}
                  onClick={() => {
                    setActivetab("aa");
                  }}
                >
                  <i className="fas fa-user-friends"></i>{" "}
                  ผู้บังคับบัญชาผู้ขอเบิก
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={Activetab === "bb" ? "active" : ""}
                  onClick={() => {
                    setActivetab("bb");
                  }}
                >
                  <i className="fas fa-user-friends"></i> เจ้าหน้าที่วัสดุ
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={Activetab === "cc" ? "active" : ""}
                  onClick={() => {
                    setActivetab("cc");
                  }}
                >
                  <i className="fas fa-user-friends"></i>{" "}
                  หัวหน้าเจ้าหน้าที่วัสดุ
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={Activetab}>
              <TabPane tabId="aa">
                <div className="row mt-1">
                  <CreateTable
                    Header={subheaderAA}
                    ItemData={sublstData}
                    CreateDataRow={SubCreateDataAA}
                    IsHasBtnDEL={false}
                  />
                </div>
                <div className="form-row">
                  <div className="col-auto ml-auto">
                    <div className="form-row">
                      <div className="col-auto">
                        <div className="form-group">
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
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <div className="small">
                        <b>หมายเหตุ / เหตุผล</b>
                      </div>
                      <AvField name="cDescription" type="textarea" rows={4} />
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="bb">
                <div className="row mt-1"></div>
              </TabPane>
              <TabPane tabId="cc">
                <div className="row mt-1"></div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <div className="small">
                        <b>หมายเหตุ / เหตุผล</b>
                      </div>
                      <AvField name="cDescription" type="textarea" rows={4} />
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="dd">
                <div className="row mt-1">
                  <CreateTable
                    Header={subheaderDD}
                    ItemData={lstData}
                    CreateDataRow={SubCreateDataDD}
                    IsHasBtnDEL={false}
                  />
                </div>
              </TabPane>
            </TabContent>

            <ModalFooter>
              <Button className="btn-primary" onClick={toggle}>
                ปิด
              </Button>
            </ModalFooter>
          </ModalBody>
        </Modal>
        {/* <div className="row">
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
        </div> */}
        <hr />
        <div className="form-row">
          <div className="col-auto mr-auto">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                history.push("/admin-parcel-pickinglist");
              }}
            >
              <i className="fas fa-arrow-left"></i> กลับ
            </button>
          </div>

          <div className="col-auto">
            <div className="form-row">
              <div className="col-auto">
                <div className="form-group">
                  <button type="submit" className="btn btn-info">
                    <i className="fas fa-print"></i> พิมพ์แบบฟอร์ม
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-auto ml-auto">
            <div className="form-row">
              <div className="col-auto">
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={toggle}
                  >
                    <i className="fas fa-history"></i> ประวัติการทำรายการ
                  </button>
                </div>
              </div>
              <div className="col-auto">
                <div className="form-group">
                  <button type="submit" className="btn btn-success">
                    <i className="fas fa-check"></i> แจ้งรับวัสดุ
                  </button>
                </div>
              </div>
              <div className="col-auto">
                <button type="button" className="btn btn-danger">
                  <i className="fas fa-times"></i> ยกเลิกคำขอ
                </button>
              </div>
            </div>
          </div>
        </div>
      </AvForm>
    </Fragment>
  );
};
export default ParcelPickinglist_Detail;
