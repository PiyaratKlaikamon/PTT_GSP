import React, { Fragment, useEffect, useState } from "react";
import "./style.css";
import { AvForm, AvInput } from "availity-reactstrap-validation";
import ThaiDatePicker from "../ST_Handlers/ThaiDatePicker";
import { Button, Card, CardBody, Collapse, Input } from "reactstrap";
import CreateTable, { CellHeader } from "../Systems/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosGetJson } from "../Service/Config/AxiosMethod";
import { AvField } from "availity-reactstrap-validation";
import Select from "react-select";

const RequestList = () => {
  const [lstData, setlstData] = React.useState([] as any);

  const [optAgency, setoptAgency] = useState([] as any);
  const [valAgency, setValAgency] = useState([] as any);
  const [lstAgency, setlstAgency] = useState([] as any);

  const [txtSearch, SetTxtSearch] = React.useState({
    stxtSearch: "",
    dropdown: "",
    dsStartDate: undefined as Date | undefined,
    dsEndDate: undefined as Date | undefined,
  });
  const { stxtSearch, dropdown, dsStartDate, dsEndDate } = txtSearch;

  const [visible, setVisible] = useState({
    IsUser: false,
    IsApprove: false,
    IsCancel: false,
  });

  const { IsUser, IsApprove, IsCancel } = visible;

  const toggle = (i: number) => {
    const newCollapse = collapses.slice();
    newCollapse[i] = !newCollapse[i];
    setCollapse(newCollapse);
  };
  const [collapses, setCollapse] = useState(Array(lstData.length).fill(false));

  useEffect(() => {
    GetDataOnPageNewLoad();
    GetDropdownAgency();
  }, []);

  const GetDataOnPageNewLoad = async () => {
    let result: any = await AxiosGetJson("api/MainRequestList/GetListtRequest");
    setlstData(result.lstRequest);
  };

  const GetDropdownAgency = async () => {
    let result: any = await AxiosGetJson("api/MainRequestList/GetAgency");
    setoptAgency(result);
  };

  const DateFormat = (today: any) => {
    let day =
      today.getDate() < 10
        ? "0" + today.getDate().toString()
        : today.getDate().toString();
    let month =
      today.getMonth() + 1 < 10
        ? "0" + (today.getMonth() + 1).toString()
        : (today.getMonth() + 1).toString();
    let date = today.getFullYear() + "/" + month + "/" + day;

    return date;
  };

  const SearchData = async () => {
    let sStartDate = txtSearch.dsStartDate == undefined ? "" : DateFormat(txtSearch.dsStartDate);
    let sEndDate = txtSearch.dsEndDate == undefined ? "" : DateFormat(txtSearch.dsEndDate);
    let result: any = await AxiosGetJson("api/MainRequestList/GetListtRequest?txtSearch=" + txtSearch.stxtSearch + "&dropdown=" + txtSearch.dropdown + "&dsStartDate=" + sStartDate + "&dsEndDate=" + sEndDate);
    setlstData(result.lstRequest);
};

  // const SearchData = async () => {
  //   let urlPath = "";
  //   if (
  //     stxtSearch !== "" ||
  //     dropdown !== "" ||
  //     dsStartDate !== null ||
  //     dsEndDate !== null
  //   ) {
  //     urlPath =
  //       "api/MainRequestList/GetListtRequest?txtSearch=" +
  //       (stxtSearch === "" ? "none" : stxtSearch) +
  //       "&dropdown=" + dropdown +
  //       "&dsStartDate=" + dsStartDate +
  //       "&dsEndDate=" + dsEndDate;
  //   } else {
  //     urlPath = "api/MainRequestList/GetListtRequest";
  //   }
  //   let result: any = await AxiosGetJson(urlPath);
  //   console.log("result", result);
  //   setlstData(result.lstRequest);
  // };

  const createFooter = (o: any) => {
    const TotalPrice = o.reduce((a, c) => a + c.nPay_TotalPrice, 0);

    return o.length != 0 ? (
      <tfoot>
        <tr>
          <td
            colSpan={5}
            className="align-middle text-center"
            style={{ backgroundColor: "#AED6F1" }}
          >
            <b>ราคารวม</b>
          </td>
          <td
            className="align-middle text-right"
            style={{ backgroundColor: "#D6EAF8" }}
          >
            <b>{TotalPrice}</b>
          </td>
        </tr>
      </tfoot>
    ) : null;
  };

  const header: CellHeader[] = [
    {
      label: "",
      Sortby: "",
      SortType: Number,
      ClassName: "align-middle text-center",
      CSSStyle: { width: 1 },
    },
    {
      label: "เลขที่รายการ",
      Sortby: "",
      SortType: Number,
      ClassName: "align-middle text-center text-nowrap",
    },
    {
      label: "วันที่สร้างรายการ",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle text-center",
    },
    {
      label: "สถานะ",
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
    {
      label: "",
      Sortby: "",
      SortType: Number,
      ClassName: "align-middle text-center text nowrap",
    },
  ];

  const CreateDataRow = (o: any, i: any) => {
    return (
      <Fragment>
        <tr key={i}>
          <td className="align-middle text-center">
            <div className="row">
              <div className="col ">
                <Button
                  size="sm"
                  type="button"
                  color="link"
                  onClick={() => toggle(i)}
                >
                  <i
                    className={`${
                      collapses[i]
                        ? `far fa-minus-square`
                        : `far fa-plus-square`
                    }`}
                  ></i>
                </Button>
              </div>
            </div>
          </td>
          <td className="align-middle text-center">{o.sRequestNo}</td>
          <td className="align-middle text-center">{o.sCreate}</td>
          <td className="align-middle text-center">{o.sStepName}</td>
          <td className="align-middle text-center">{o.sNote}</td>
          <td className="align-middle text-center">
            <Button
              size="sm"
              type="button"
              color="info"
              style={{
                display: o.IsApprove || o.IsCancel ? "none" : "inherit",
              }}
            >
              <FontAwesomeIcon icon={["fas", "pencil-alt"]} />
            </Button>{" "}
            <Button
              size="sm"
              type="button"
              color="danger"
              style={{
                width: 32,
                display: o.IsApprove || o.IsCancel ? "none" : "inherit",
              }}
            >
              <FontAwesomeIcon icon={["fas", "times"]} />
            </Button>
          </td>
        </tr>

        <tr>
          <td colSpan={6} className="p-0">
            <Collapse isOpen={collapses[i]} key={i}>
              <Card className="border-0">
                <CardBody>
                  <CreateTable
                    Header={Subheader}
                    ItemData={o.lstRequestMaterial}
                    CreateDataRow={SubCreateDataRow}
                    createFooterRow={() => createFooter(o.lstRequestMaterial)}
                    defaultFontSize={true}
                  />
                </CardBody>
              </Card>
            </Collapse>
          </td>
        </tr>
      </Fragment>
    );
  };

  const Subheader: CellHeader[] = [
    {
      label: "ที่",
      Sortby: "",
      SortType: Number,
      ClassName: "align-middle text-center",
      CSSStyle: { width: 50 },
    },
    {
      label: "ชื่อวัสดุ",
      Sortby: "",
      SortType: Number,
      ClassName: "align-middle text-center text-nowrap",
    },
    {
      label: "จำนวนขอเบิก",
      Sortby: "",
      SortType: String,
      ClassName: "align-middle text-center",
    },
    {
      label: "หน่วยนับ",
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
    {
      label: "ราคารวม",
      Sortby: "",
      SortType: Number,
      ClassName: "align-middle text-center",
    },
  ];

  const SubCreateDataRow = (o: any, i: any) => {
    return (
      <Fragment>
        <tr key={i}>
          <td className="align-middle text-center">{i + 1 + " ."}</td>
          <td className="align-middle">{o.sName}</td>
          <td className="align-middle text-center">{o.nRequest_Amount}</td>
          <td className="align-middle text-center">{o.sUnitname}</td>
          <td className="align-middle text-center">{o.sReasonName}</td>
          <td className="align-middle text-right">{o.nPay_TotalPrice}</td>
        </tr>
      </Fragment>
    );
  };

  return (
    <AvForm>
      <div id="PAGE_REQLIST">
        <div className="container">
          <div className="ipane ipane-1">
            <div className="ipane-head">รายการเบิกวัสดุ</div>
            <div className="ipane-body p-3">
              <div className="form-row">
                <div className="col-md-2 ml-auto">
                  <div className="small">
                    <b>รหัสพนักงาน/ชื่อ-นามสกุล</b>
                  </div>
                  <input
                    type="text"
                    className="form-control form-control-sm"
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
                <div className="col-md-3">
                  <div className="small">
                    <b>หน่วยงาน</b>
                  </div>
                  <AvInput
                    type="select"
                    name="select"
                    value={valAgency}
                    onChange={(e) => {
                      setValAgency(e.target.value);
                      SetTxtSearch({
                        ...txtSearch,
                        dropdown: e.target.value,
                      });
                    }}
                    className="form-control form-control-sm"
                  >
                    <option value={""}>- เลือกหน่วยงาน -</option>
                    {optAgency.map((el, indx) => {
                      return <option value={el.value}>{el.label}</option>;
                    })}
                  </AvInput>
                </div>
                <div className="col-auto">
                  <div className="small">
                    <b>วันที่เริ่มต้น</b>
                  </div>
                  <ThaiDatePicker
                    value={dsStartDate}
                    small={true}
                    onChange={(value) => {
                      SetTxtSearch({
                        ...txtSearch,
                        dsStartDate: value,
                      });
                    }}
                  />
                  {/* <AvInput
                    type="Date"
                    name="dDocDate"
                    tag={[Input, ThaiDatePicker]}
                    className="form-control form-control-sm"
                    small={true}
                    onChange={(e) => {
                      SetTxtSearch({
                        ...txtSearch,
                        dsStartDate: e.target.value,
                      });
                    }}
                  /> */}
                </div>
                <div className="col-auto">
                  <div className="small">
                    <b>วันที่สิ้นสุด</b>
                  </div>
                  <ThaiDatePicker
                    value={dsEndDate}
                    small={true}
                    onChange={(value) => {
                      SetTxtSearch({
                        ...txtSearch,
                        dsEndDate: value,
                      });
                    }}
                  />
                  {/* <AvInput
                    type="Date"
                    name="dDocDate"
                    tag={[Input, ThaiDatePicker]}
                    className="form-control form-control-sm"
                    small={true}
                    onChange={(e) => {
                      SetTxtSearch({ ...txtSearch, dsEndDate: e.target.value });
                    }}
                  /> */}
                </div>
                <div className="col-auto">
                  <div className="small">&nbsp;</div>
                  <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    onClick={() => SearchData()}
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="row mt-4">
                <CreateTable
                  Header={header}
                  ItemData={lstData}
                  CreateDataRow={CreateDataRow}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AvForm>
  );
};
export default RequestList;
