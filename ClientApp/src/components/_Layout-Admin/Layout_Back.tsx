import React, { Fragment, useState } from "react";
import "./Layout_Back.css";
import logo from "../../Images/ico-ptt.png";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

const Layout_Back = (props: any) => {
  const [isActiveST, setIsActiveST] = useState(true);
  const onClickST = () => setIsActiveST(!isActiveST);
  const [isActiveRP, setIsActiveRP] = useState(true);
  const onClickRP = () => setIsActiveRP(!isActiveRP);

  const [isSideNav, setIsSideNav] = useState(true);

  const toggleSideNav = () => {
    setIsSideNav(!isSideNav);
    if (document.body.className === "navbar-side") {
      document.body.classList.remove("navbar-side");
    } else {
      document.body.classList.add("navbar-side");
    }
  };

  return (
    <Fragment>
      <div id="SITE_CONTENT">
        <div id="CONTENT_BLOCK">
          <a id="MENU_CLOSE" onClick={toggleSideNav}>
            <i className="fas fa-exchange-alt"></i>
          </a>
        </div>
        <div className="content-header">
          <div className="header-item">
            <div className="main-title">
              <div className="logo-web">
                <a>
                  <img src={logo} />
                </a>
              </div>
              <div className="title">
                <div className="title-main">ระบบ เบิก-จ่ายวัสดุสิ้นเปลือง</div>
              </div>
            </div>
            <div className="main-info">
              <div className="info-detail">
                <div className="info-title">สมชาย ทองปาน</div>
              </div>
              <div className="info-tool">
                <button
                  type="button"
                  className="btn btn-danger badge badge-pill font-weight-normal"
                >
                  <i className="fa fa-sign-out-alt"></i>
                </button>
              </div>
            </div>
            <a id="MENU_TRIGGER" role="button" onClick={toggleSideNav}>
              <i className="fa fa-bars"></i>
            </a>
          </div>
        </div>
        <div className="content-body">
          <div className="body-side">
            <div className="main-nav">
              <PerfectScrollbar
                options={{ wheelSpeed: 0.25 }}
                style={{
                  position: "relative",
                  height: "calc(100vh - 130px)",
                  paddingRight: "7px",
                  overflow: "hidden",
                }}
              >
                <ul
                  className="menu"
                  style={{
                    transform:
                      isActiveST && isActiveRP
                        ? "translateX(0%)"
                        : "translateX(-100%)",
                  }}
                >
                  <li>
                    <a href="admin-pendingapproval">
                      <div
                        className="menu-icon"
                        style={{ backgroundColor: "#FAD02C" }}
                      >
                        <i className="fas fa-file-signature"></i>
                      </div>
                      <div className="menu-label">รายการรออนุมัติ</div>
                    </a>
                  </li>
                  <li>
                    <a href="admin-parcel-pickinglist">
                      <div
                        className="menu-icon"
                        style={{ backgroundColor: "#51B9CD" }}
                      >
                        <i className="fas fa-hand-holding-usd"></i>
                      </div>
                      <div className="menu-label">รายการเบิกวัสดุ</div>
                    </a>
                  </li>
                  <li>
                    <a href="admin-Request-to-ImproveStock-Edit-List">
                      <div
                        className="menu-icon"
                        style={{ backgroundColor: "#F34C50" }}
                      >
                        <i className="fas fa-clock"></i>
                      </div>
                      <div className="menu-label">รายการรออนุมัติขอปรับปรุง Stock</div>
                    </a>
                  </li>
                  {/* <li>
                    <a href="admin-Waiting_for_approval">
                      <div
                        className="menu-icon"
                        style={{ backgroundColor: "#F34C50" }}
                      >
                        <i className="fas fa-times"></i>
                      </div>
                      <div className="menu-label">ยกเลิกรายการรออนุมัติ</div>
                    </a>
                  </li>
                  <li>
                    <a href="admin-approval-list">
                      <div
                        className="menu-icon"
                        style={{ backgroundColor: "#4ddf96" }}
                      >
                        <i className="fas fa-clock"></i>
                      </div>
                      <div className="menu-label">
                        รายการรออนุมัติการเพิ่ม-ลด วัสดุ
                      </div>
                    </a>
                  </li> */}
                  {/* <li>
                    <a href="admin-addparcel">
                      <div
                        className="menu-icon"
                        style={{ backgroundColor: "#FF9636" }}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </div>
                      <div className="menu-label">เพิ่ม-ลด วัสดุ</div>
                    </a>
                  </li> */}
                  <li>
                    <a href="admin-Request-to-ImproveStock">
                      <div
                        className="menu-icon"
                        style={{ backgroundColor: "#4ddf96" }}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </div>
                      <div className="menu-label">ขอปรับปรุง Stock</div>
                    </a>
                  </li>
                  <li>
                    <a href="admin-Goods-Receive_list">
                      <div
                        className="menu-icon"
                        style={{ backgroundColor: "#FF9636" }}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </div>
                      <div className="menu-label">
                        ทำรับวัสดุ (Goods Receive)
                      </div>
                    </a>
                  </li>
                  {/* <li>
                    <a href="admin-Request-to-ImproveStock-Edit-List">
                      <div
                        className="menu-icon"
                        style={{ backgroundColor: "#FF9636" }}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </div>
                      <div className="menu-label">
                        รายการรออนุมัติขอปรับปรุง Stock
                      </div>
                    </a>
                  </li> */}

                  <li>
                    <a href="admin-inventorylist">
                      <div
                        className="menu-icon"
                        style={{ backgroundColor: "#BD97CB" }}
                      >
                        <i className="fas fa-save"></i>
                      </div>
                      <div className="menu-label">สรุปรายการรับวัสดุ</div>
                    </a>
                  </li>
                  <li>
                    <a
                      className={`${isActiveRP ? "" : "menu-focus"}`}
                      onClick={onClickRP}
                    >
                      <div
                        className="menu-icon"
                        style={{ backgroundColor: "#F8C0C8" }}
                      >
                        <i className="fas fa-copy"></i>
                      </div>
                      <div className="menu-label">รายงาน</div>
                      <div className="menu-caret">
                        <i className="fas fa-angle-right"></i>
                      </div>
                    </a>
                    <ul className="menu-sub">
                      <li>
                        <a
                          className={`${isActiveRP ? "btn-back" : ""}`}
                          onClick={onClickRP}
                        >
                          <i className="fas fa-angle-left"></i> &nbsp;ย้อนกลับ
                        </a>
                      </li>
                      <li>
                        <a href="admin-Inventory_material">
                          <div
                            className="menu-icon"
                            style={{ backgroundColor: "#e8334d" }}
                          >
                            <i className="fas fa-copy"></i>
                          </div>
                          <div className="menu-label">วัสดุคงคลัง</div>
                        </a>
                      </li>
                      <li>
                        <a href="admin-Withdrawal_history">
                          <div
                            className="menu-icon"
                            style={{ backgroundColor: "#ea445c" }}
                          >
                            <i className="fas fa-copy"></i>
                          </div>
                          <div className="menu-label">
                            ประวัติการเบิกแยกตามบุคคลและสถานะ
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="admin-withdrawalstatus">
                          <div
                            className="menu-icon"
                            style={{ backgroundColor: "#ec556c" }}
                          >
                            <i className="fas fa-copy"></i>
                          </div>
                          <div className="menu-label">จำนวนสถานะการเบิก</div>
                        </a>
                      </li>
                      <li>
                        <a href="Disbursement_Report">
                          <div
                            className="menu-icon"
                            style={{ backgroundColor: "#ee678b" }}
                          >
                            <i className="fas fa-copy"></i>
                          </div>
                          <div className="menu-label">PIE CHART การเบิก</div>
                        </a>
                      </li>
                      <li>
                        <a href="admin-Bar_Trend_Chart">
                          <div
                            className="menu-icon"
                            style={{ backgroundColor: "#f0798a" }}
                          >
                            <i className="fas fa-database"></i>
                          </div>
                          <div className="menu-label">
                               CHART ตามกลุ่มวัสดุ
                          </div>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="has-children">
                    <a
                      className={`${isActiveST ? "" : "menu-focus"}`}
                      onClick={onClickST}
                    >
                      <div
                        className="menu-icon"
                        style={{ backgroundColor: "#999999" }}
                      >
                        <i className="fas fa-layer-group"></i>
                      </div>
                      <div className="menu-label">ข้อมูลพื้นฐาน</div>
                      <div className="menu-caret">
                        <i className="fas fa-angle-right"></i>
                      </div>
                    </a>
                    <ul className="menu-sub">
                      <li>
                        <a
                          className={`${isActiveST ? "btn-back" : ""}`}
                          onClick={onClickST}
                        >
                          <i className="fas fa-angle-left"></i> &nbsp;ย้อนกลับ
                        </a>
                      </li>
                      <li>
                        <a href="admin-parcelgroup">
                          <div
                            className="menu-icon"
                            style={{ backgroundColor: "#2d2d2d" }}
                          >
                            <i className="fas fa-database"></i>
                          </div>
                          <div className="menu-label">กลุ่มวัสดุ</div>
                        </a>
                      </li>
                      <li>
                        <a href="admin-parceltype">
                          <div
                            className="menu-icon"
                            style={{ backgroundColor: "#373737" }}
                          >
                            <i className="fas fa-database"></i>
                          </div>
                          <div className="menu-label">ประเภทวัสดุ</div>
                        </a>
                      </li>
                      <li>
                        <a href="admin-parcelunit">
                          <div
                            className="menu-icon"
                            style={{ backgroundColor: "#414141" }}
                          >
                            <i className="fas fa-database"></i>
                          </div>
                          <div className="menu-label">หน่วยนับวัสดุ</div>
                        </a>
                      </li>
                      <li>
                        <a href="admin-parcelstorage">
                          <div
                            className="menu-icon"
                            style={{ backgroundColor: "#4b4b4b" }}
                          >
                            <i className="fas fa-database"></i>
                          </div>
                          <div className="menu-label">สถานที่เก็บวัสดุ</div>
                        </a>
                      </li>
                      <li>
                        <a href="admin-supplies_list">
                          <div
                            className="menu-icon"
                            style={{ backgroundColor: "#545454" }}
                          >
                            <i className="fas fa-database"></i>
                          </div>
                          <div className="menu-label">วัสดุ</div>
                        </a>
                      </li>
                      <li>
                        <a href="admin-reasonwithdrawal">
                          <div
                            className="menu-icon"
                            style={{ backgroundColor: "#545454" }}
                          >
                            <i className="fas fa-database"></i>
                          </div>
                          <div className="menu-label">เหตุผลในการเบิก</div>
                        </a>
                      </li>
                      <li>
                        <a href="admin-jobdescription">
                          <div
                            className="menu-icon"
                            style={{ backgroundColor: "#5e5e5e" }}
                          >
                            <i className="fas fa-database"></i>
                          </div>
                          <div className="menu-label">กำหนดลักษณะงาน</div>
                        </a>
                      </li>
                      <li>
                        <a href="admin-manageseller">
                          <div
                            className="menu-icon"
                            style={{ backgroundColor: "#686868" }}
                          >
                            <i className="fas fa-database"></i>
                          </div>
                          <div className="menu-label">จัดการข้อมูลผู้ขาย</div>
                        </a>
                      </li>
                      <li>
                        <a href="admin-approvallimit">
                          <div
                            className="menu-icon"
                            style={{ backgroundColor: "#727272" }}
                          >
                            <i className="fas fa-database"></i>
                          </div>
                          <div className="menu-label">
                            กำหนดวงเงินการอนุมัติ
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="admin-user-permission-list">
                          <div
                            className="menu-icon"
                            style={{ backgroundColor: "#7c7c7c" }}
                          >
                            <i className="fas fa-database"></i>
                          </div>
                          <div className="menu-label">กำหนดสิทธิ์ผู้ใช้งาน</div>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </PerfectScrollbar>
            </div>
          </div>
          <div className="body-main">
            <div className="main-head">
              <div className="head-flag">
                <div className="flag-item">
                  <div id="headIcon" className="head-icon"></div>
                  <div id="headTitle" className="head-title">
                    <b>{props.title}</b>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-body">{props.children}</div>
          </div>
        </div>
        <div className="content-footer">
          <div className="footer-panel">
            <div className="footer-content">
              <div className="footer-title">บริษัท ปตท. จำกัด (มหาชน)</div>
              <div className="footer-desc">
                555 ถนนสุขุมวิท ต.มาบตาพุด อ.เมืองฯ จ.ระยอง 21150
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="SITE_NAVBAR">
        <div id="MENU_SIDE">
          <ul
            className="menu"
            style={{
              transform:
                isActiveST && isActiveRP
                  ? "translateX(0%)"
                  : "translateX(-100%)",
            }}
          >
            <li>
              <a href="admin-pendingapproval">
                <div
                  className="menu-icon"
                  style={{ backgroundColor: "#FAD02C" }}
                >
                  <i className="fas fa-file-signature"></i>
                </div>
                <div className="menu-label">รายการรออนุมัติ</div>
              </a>
            </li>
            <li>
              <a href="admin-parcel-pickinglist">
                <div
                  className="menu-icon"
                  style={{ backgroundColor: "#51B9CD" }}
                >
                  <i className="fas fa-hand-holding-usd"></i>
                </div>
                <div className="menu-label">รายการเบิกวัสดุ</div>
              </a>
            </li>
            <li>
              <a href="admin-Waiting_for_approval">
                <div
                  className="menu-icon"
                  style={{ backgroundColor: "#F34C50" }}
                >
                  <i className="fas fa-times"></i>
                </div>
                <div className="menu-label">ยกเลิกรายการรออนุมัติ</div>
              </a>
            </li>
            <li>
              <a href="admin-approval-list">
                <div
                  className="menu-icon"
                  style={{ backgroundColor: "#4ddf96" }}
                >
                  <i className="fas fa-clock"></i>
                </div>
                <div className="menu-label">
                  รายการรออนุมัติการเพิ่ม-ลด วัสดุ
                </div>
              </a>
            </li>
            <li>
              <a href="admin-addparcel">
                <div
                  className="menu-icon"
                  style={{ backgroundColor: "#FF9636" }}
                >
                  <i className="fas fa-plus-circle"></i>
                </div>
                <div className="menu-label">เพิ่ม-ลด วัสดุ</div>
              </a>
            </li>
            <li>
              <a href="admin-Request-to-ImproveStock">
                <div
                  className="menu-icon"
                  style={{ backgroundColor: "#FF9636" }}
                >
                  <i className="fas fa-plus-circle"></i>
                </div>
                <div className="menu-label">ขอปรับปรุง Stock</div>
              </a>
            </li>

            <li>
              <a href="admin-inventorylist">
                <div
                  className="menu-icon"
                  style={{ backgroundColor: "#BD97CB" }}
                >
                  <i className="fas fa-save"></i>
                </div>
                <div className="menu-label">สรุปรายการรับวัสดุ</div>
              </a>
            </li>
            <li className="has-children">
              <a
                className={`${isActiveRP ? "" : "menu-focus"}`}
                onClick={onClickRP}
              >
                <div
                  className="menu-icon"
                  style={{ backgroundColor: "#F8C0C8" }}
                >
                  <i className="fas fa-copy"></i>
                </div>
                <div className="menu-label">รายงาน</div>
                <div className="menu-caret">
                  <i className="fas fa-angle-right"></i>
                </div>
              </a>
              <ul className="menu-sub">
                <li>
                  <a
                    className={`${isActiveRP ? "btn-back" : ""}`}
                    onClick={onClickRP}
                  >
                    <i className="fas fa-angle-left"></i> &nbsp;ย้อนกลับ
                  </a>
                </li>
                <li>
                  <a href="admin-Inventory">
                    <div
                      className="menu-icon"
                      style={{ backgroundColor: "#e8334d" }}
                    >
                      <i className="fas fa-copy"></i>
                    </div>
                    <div className="menu-label">วัสดุคงคลัง</div>
                  </a>
                </li>
                <li>
                  <a href="admin-Withdrawal_history">
                    <div
                      className="menu-icon"
                      style={{ backgroundColor: "#ea445c" }}
                    >
                      <i className="fas fa-copy"></i>
                    </div>
                    <div className="menu-label">
                      ประวัติการเบิกแยกตามบุคคลและสถานะ
                    </div>
                  </a>
                </li>
                <li>
                  <a href="admin-withdrawalstatus">
                    <div
                      className="menu-icon"
                      style={{ backgroundColor: "#ec556c" }}
                    >
                      <i className="fas fa-copy"></i>
                    </div>
                    <div className="menu-label">จำนวนสถานะการเบิก</div>
                  </a>
                </li>
                <li>
                  <a href="Disbursement_Report">
                    <div
                      className="menu-icon"
                      style={{ backgroundColor: "#ee678b" }}
                    >
                      <i className="fas fa-copy"></i>
                    </div>
                    <div className="menu-label">PIE CHART การเบิก</div>
                  </a>
                </li>
                <li>
                  <a href="admin-Bar_Trend_Chart">
                    <div
                      className="menu-icon"
                      style={{ backgroundColor: "#f0798a" }}
                    >
                      <i className="fas fa-database"></i>
                    </div>
                    <div className="menu-label">BAR &amp; TREND CHART</div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="has-children">
              <a
                className={`${isActiveST ? "" : "menu-focus"}`}
                onClick={onClickST}
              >
                <div
                  className="menu-icon"
                  style={{ backgroundColor: "#999999" }}
                >
                  <i className="fas fa-layer-group"></i>
                </div>
                <div className="menu-label">ข้อมูลพื้นฐาน</div>
                <div className="menu-caret">
                  <i className="fas fa-angle-right"></i>
                </div>
              </a>
              <ul className="menu-sub">
                <li>
                  <a
                    className={`${isActiveST ? "btn-back" : ""}`}
                    onClick={onClickST}
                  >
                    <i className="fas fa-angle-left"></i> &nbsp;ย้อนกลับ
                  </a>
                </li>
                <li>
                  <a href="admin-parcelgroup">
                    <div
                      className="menu-icon"
                      style={{ backgroundColor: "#2d2d2d" }}
                    >
                      <i className="fas fa-database"></i>
                    </div>
                    <div className="menu-label">กลุ่มวัสดุ</div>
                  </a>
                </li>
                <li>
                  <a href="admin-parceltype">
                    <div
                      className="menu-icon"
                      style={{ backgroundColor: "#373737" }}
                    >
                      <i className="fas fa-database"></i>
                    </div>
                    <div className="menu-label">ประเภทวัสดุ</div>
                  </a>
                </li>
                <li>
                  <a href="admin-parcelunit">
                    <div
                      className="menu-icon"
                      style={{ backgroundColor: "#414141" }}
                    >
                      <i className="fas fa-database"></i>
                    </div>
                    <div className="menu-label">หน่วยนับวัสดุ</div>
                  </a>
                </li>
                <li>
                  <a href="admin-parcelstorage">
                    <div
                      className="menu-icon"
                      style={{ backgroundColor: "#4b4b4b" }}
                    >
                      <i className="fas fa-database"></i>
                    </div>
                    <div className="menu-label">สถานที่เก็บวัสดุ</div>
                  </a>
                </li>
                <li>
                  <a href="admin-supplies_list">
                    <div
                      className="menu-icon"
                      style={{ backgroundColor: "#545454" }}
                    >
                      <i className="fas fa-database"></i>
                    </div>
                    <div className="menu-label">วัสดุ</div>
                  </a>
                </li>
                <li>
                  <a href="admin-reasonwithdrawal">
                    <div
                      className="menu-icon"
                      style={{ backgroundColor: "#545454" }}
                    >
                      <i className="fas fa-database"></i>
                    </div>
                    <div className="menu-label">เหตุผลในการเบิก</div>
                  </a>
                </li>
                <li>
                  <a href="admin-jobdescription">
                    <div
                      className="menu-icon"
                      style={{ backgroundColor: "#5e5e5e" }}
                    >
                      <i className="fas fa-database"></i>
                    </div>
                    <div className="menu-label">กำหนดลักษณะงาน</div>
                  </a>
                </li>
                <li>
                  <a href="admin-manageseller">
                    <div
                      className="menu-icon"
                      style={{ backgroundColor: "#686868" }}
                    >
                      <i className="fas fa-database"></i>
                    </div>
                    <div className="menu-label">จัดการข้อมูลผู้ขาย</div>
                  </a>
                </li>
                <li>
                  <a href="admin-approvallimit">
                    <div
                      className="menu-icon"
                      style={{ backgroundColor: "#727272" }}
                    >
                      <i className="fas fa-database"></i>
                    </div>
                    <div className="menu-label">กำหนดวงเงินการอนุมัติ</div>
                  </a>
                </li>
                <li>
                  <a href="admin-user-permission-list">
                    <div
                      className="menu-icon"
                      style={{ backgroundColor: "#7c7c7c" }}
                    >
                      <i className="fas fa-database"></i>
                    </div>
                    <div className="menu-label">กำหนดสิทธิ์ผู้ใช้งาน</div>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div id="SITE_OVERLAY"></div>
    </Fragment>
  );
};
export default Layout_Back;
