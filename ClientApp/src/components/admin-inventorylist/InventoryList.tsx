import React, { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, CustomInput } from "reactstrap";
import { TooltipsMSG } from "../Systems/SystemComponent";
import CreateTable, { CellHeader } from "../Systems/Table";
import {
  AxiosBlobJson,
  AxiosGetJson,
  AxiosPostJson,
} from "../Service/Config/AxiosMethod";

const InventoryList = () => {
  const [lstData, setlstData] = React.useState([] as any);

  const [txtSearch, SetTxtSearch] = React.useState({
    stxtSearch: "",
    sType: "",
    dsStartDate: "",
    dsEndDate: "",
  });

  const { stxtSearch, sType, dsStartDate, dsEndDate } = txtSearch;
  // const GetDataOnPageNewLoad = async () => {
  //   let result: any = await AxiosGetJson("api/InventoryList/GetListInventory");
  //   setlstData(result.lstInventory);
  // };

  const ReportExcel = async () => {
    let result: any = await AxiosBlobJson(
      "api/InventoryList/Reportexcel",
      lstData
    );
    debugger;
    // setlstData(result);
    const url = window.URL.createObjectURL(new Blob([result.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Test.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const SearchData = async () => {
    let urlPath = "";
    if (
      stxtSearch !== "" ||
      sType !== "" ||
      dsStartDate !== null ||
      dsEndDate !== null
    ) {
      // var sDate = "";
      // var eDate = "";
      // if (dsStartDate !== null) {
      //   sDate = DateFormat(dsStartDate);
      // }
      // if (dsEndDate !== null) {
      //   eDate = DateFormat(dsEndDate);
      // }
      urlPath =
        "api/InventoryList/GetListInventory?txtSearch=" +
        (stxtSearch === "" ? "none" : stxtSearch) +
        "&sType=" +
        sType +
        "&dsStartDate=" +
        dsStartDate +
        "&dsEndDate=" +
        dsEndDate;
    } else {
      urlPath = "api/InventoryList/GetListInventory";
    }
    let result: any = await AxiosGetJson(urlPath);
    console.log("result", result);
    setlstData(result.lstInventory);
  };

  useEffect(() => {
    // GetDataOnPageNewLoad();
  }, []);
  const header: CellHeader[] = [
    {
      Sortby: "",
      SortType: Number,
      label: "??????????????????????????????????????????????????????/????????????????????????",
      ClassName: "align-middle text-center text-nowrap",
      CSSStyle: { width: 100 },
    },
    {
      label: "??????????????????????????????????????????/?????????",
      Sortby: "",
      ClassName: "align-middle text-center text-nowrap",
      SortType: String,
      CSSStyle: { width: 100 },
    },
    {
      label: "??????????????????",
      Sortby: "",
      ClassName: "align-middle text-center text-nowrap",
      SortType: String,
      CSSStyle: { width: 180 },
    },
    {
      label: "???????????????????????????",
      Sortby: "",
      ClassName: "align-middle text-center",
      SortType: String,
    },
    {
      label: "???????????????????????????",
      Sortby: "",
      ClassName: "align-middle text-center",
      SortType: String,
    },
    {
      label: "???????????????",
      Sortby: "",
      ClassName: "align-middle text-center",
      SortType: String,
      CSSStyle: { width: 130 },
    },
    {
      label: "????????????????????????",
      Sortby: "",
      ClassName: "align-middle text-center",
      SortType: String,
      CSSStyle: { width: 130 },
    },
  ];

  const CreateData = (o: any, i: any) => {
    return (
      <tr key={i}>
        <td className="align-middle text-center">{o.sRequestNo}</td>
        <td className="align-middle text-center">{o.d_Date}</td>
        <td className="align-middle text-center">{o.sType}</td>
        <td className="align-middle text-center">{o.sMaterialCode}</td>
        <td className="align-middle">{o.sName}</td>
        <td className="align-middle text-right">{o.nAmount}</td>
        <td className="align-middle text-center">{o.sUnitname}</td>
      </tr>
    );
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <b>?????????????????????????????????????????????????????? / ????????????????????????</b>
            <input
              className="form-control"
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
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <b>???????????? / ???????????????????????????</b>
            <input
              className="form-control"
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
        <div className="col-md-6">
          <div className="form-group">
            <b>??????????????????</b>
            <select
              className="form-control"
              onChange={(e) =>
                SetTxtSearch({
                  ...txtSearch,
                  sType: e.target.value,
                })
              }
            >
              <option value="">- ????????????????????????????????? -</option>
              <option value="1">???????????????????????? Stock</option>
              <option value="2">?????????????????????????????? (Goods Receive)</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <b>??????????????????????????????????????????</b>
            <input
              className="form-control"
              placeholder="??????/??????/??????"
              type="date"
              required
              onChange={(e) => {
                SetTxtSearch({ ...txtSearch, dsStartDate: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <b>???????????????????????????????????????</b>
            <input
              className="form-control"
              placeholder="??????/??????/??????"
              type="date"
              required
              onChange={(e) => {
                SetTxtSearch({ ...txtSearch, dsEndDate: e.target.value });
              }}
            />
          </div>
        </div>
      </div>
      <div className="form-row justify-content-center">
        <div className="col-auto">
          <div className="form-group">
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => SearchData()}
            >
              <i className="fas fa-search"></i> ???????????????
            </button>
          </div>
        </div>
        <div className="col-auto">
          <div className="form-group">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                ReportExcel();
              }}
            >
              <i className="fas fa-file-excel"></i> Excel
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-1">
        <CreateTable
          Header={header}
          ItemData={lstData}
          CreateDataRow={CreateData}
          IsHasBtnDEL={false}
        />
      </div>
    </Fragment>
  );
};
export default InventoryList;
