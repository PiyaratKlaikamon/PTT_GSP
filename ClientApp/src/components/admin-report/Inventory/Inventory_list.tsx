import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Collapse,
  CustomInput,
} from "reactstrap";
import { parse } from "query-string";
import CreateTable, { CellHeader } from "../../Systems/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AvForm,
  AvField,
  AvRadioGroup,
  AvRadio,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";
import { AxiosBlobJson, AxiosGetJson } from "../../Service/Config/AxiosMethod";
import Select from "react-select";

const Inventory_list = () => {
  const [lstData, setlstData] = React.useState([] as any);
  const [txtSearch, SetTxtSearch] = React.useState({
    stxtSearch: "",
  });

  const { stxtSearch } = txtSearch;

  const [optGroup, setoptGroup] = useState([] as any);
  const [valGroup, setValGroup] = useState([] as any);

  const [optCate, setoptCate] = useState([] as any);
  const [valCate, setValCate] = useState([] as any);

  const [optVendor, setoptVendor] = useState([] as any);
  const [valVendor, setValVendor] = useState([] as any);

  useEffect(() => {
    GetDropdownGroup();
    GetDropdownCate();
    GetDropdownVendor();
    GetDataOnPageNewLoad();
  }, []);

  const GetDropdownGroup = async () => {
    let result: any = await AxiosGetJson(
      "api/InventoryMaterial/GetMaterialGroup"
    );
    setoptGroup(result);
  };
  const GetDropdownCate = async () => {
    let result: any = await AxiosGetJson(
      "api/InventoryMaterial/GetMaterialCate"
    );
    setoptCate(result);
  };
  const GetDropdownVendor = async () => {
    let result: any = await AxiosGetJson("api/InventoryMaterial/GetVendor");
    setoptVendor(result);
  };

  const GetDataOnPageNewLoad = async () => {
    let result: any = await AxiosGetJson(
      "api/InventoryMaterial/GetListInventoryMate"
    );
    setlstData(result.lstInventoryMate);
  };

  const ReportExcel = async () => {
    let result: any = await AxiosBlobJson(
      "api/InventoryMaterial/Reportexcel",
      lstData
    );
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
      stxtSearch !== ""
    ) {
      urlPath =
        "api/InventoryMaterial/GetListInventoryMate?txtSearch=" +
        (stxtSearch === "" ? "none" : stxtSearch)
    } else {
      urlPath = "api/InventoryMaterial/GetListInventoryMate";
    }
    let result: any = await AxiosGetJson(urlPath);
    console.log("result", result);
    setlstData(result.lstInventoryMate);
  };

  const header: CellHeader[] = [
    {
      label: "?????????",
      Sortby: "",
      SortType: Number,
      ClassName: "align-middle text-center",
      CSSStyle: { width: 1 },
    },
    {
      label: "???????????????????????????",
      Sortby: "nParcelcode",
      SortType: Number,
      ClassName: "align-middle text-center text-nowrap",
    },
    {
      label: "???????????????????????????",
      Sortby: "sParcelname",
      SortType: String,
      ClassName: "align-middle text-center",
    },
    {
      label: "Max",
      Sortby: "sParcelname",
      SortType: String,
      ClassName: "align-middle text-center",
    },
    {
      label: "Min",
      Sortby: "sParcelname",
      SortType: String,
      ClassName: "align-middle text-center",
    },
    {
      label: "Suggestion Order",
      Sortby: "sParcelname",
      SortType: String,
      ClassName: "align-middle text-center",
    },
    {
      label: "Re-Order Point",
      Sortby: "sParcelname",
      SortType: String,
      ClassName: "align-middle text-center",
    },
    {
      label: "????????????????????????????????????",
      Sortby: "nRemainingamount",
      SortType: String,
      ClassName: "align-middle text-center",
    },
    {
      label: "????????????????????????",
      Sortby: "sUnit",
      SortType: String,
      ClassName: "align-middle text-center",
    },
    {
      label: "??????????????????",
      Sortby: "sSeller",
      SortType: String,
      ClassName: "align-middle text-center",
    },
  ];

  const CreateDataRow = (o: any, i: any) => {
    return (
      <Fragment>
        <tr key={i}>
          <td className="align-middle text-center">{i + 1}</td>
          <td className="align-middle text-center">{o.sMaterialCode}</td>
          <td className="align-middle">{o.sName}</td>
          <td className="align-middle text-right">{o.nMax}</td>
          <td className="align-middle text-center">{o.nMin}</td>
          <td className="align-middle text-center"></td>
          <td className="align-middle text-center">{o.nReorderPoint}</td>
          <td className="align-middle text-center">{o.nMat_Banlance}</td>
          <td className="align-middle text-center">{o.sUnitname}</td>
          <td className="align-middle text-center">{o.sVendorName}</td>
        </tr>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <AvForm>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <b>??????????????????????????????</b> <span className="text-danger">???</span>
              <Select
                isClearable
                options={optGroup}
                closeMenuOnSelect={true}
                placeholder="?????????????????????????????????????????????"
                errorMessage="?????????????????????????????????????????????????????????"
                value={valGroup}
                onChange={(value) => {
                  setValGroup(value);
                  SetTxtSearch({...txtSearch, stxtSearch: value
                  })
                }}
              />
              {/* <AvField
                type="select"
                name="sGroup"
                errorMessage="??????????????????????????????????????????????????????"
                validate={{
                  required: { value: true },
                }}
                className="form-control"
                onChange={(e) =>
                  SetTxtSearch({
                    ...txtSearch,
                    txtSearch: e.target.value,
                  })
                }
              >
                <option value="">- ?????????????????????????????? -</option>
                <option value="1">???????????????????????????????????????</option>
                <option value="2">??????????????????????????????????????????????????????</option>
                <option value="3">????????????????????????????????????</option>
              </AvField> */}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <b>?????????????????????????????????</b>
              <Select
                isClearable
                isMulti
                options={optCate}
                closeMenuOnSelect={true}
                placeholder="????????????????????????????????????????????????"
                errorMessage="????????????????????????????????????????????????????????????"
                value={valCate}
                onChange={(value) => {
                  setValCate(value);
                  SetTxtSearch({...txtSearch, stxtSearch: value
                  })
                }}
              />
              {/* <AvField
                type="select"
                name="sType"
                className="form-control"
                onChange={(e) =>
                  SetTxtSearch({
                    ...txtSearch,
                    txtSearch: e.target.value,
                  })
                }
              >
                <option value="">- ????????????????????????????????? -</option>
                <option value="1">???????????????????????????</option>
                <option value="2">??????????????????</option>
                <option value="3">???????????????</option>
              </AvField> */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <b>???????????? / ???????????????????????????</b>
              <AvField
                type="text"
                name="name"
                className="form-control"
                autoComplete="off"
                onChange={(e) =>
                  SetTxtSearch({
                    ...txtSearch,
                    stxtSearch: e.target.value,
                  })
                }
                onKeyPress={(e) => {
                  e.key === "Enter" && SearchData();
                }}
              ></AvField>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <b>??????????????????</b>
              <Select
                isClearable
                options={optVendor}
                closeMenuOnSelect={true}
                placeholder="?????????????????????????????????"
                errorMessage="?????????????????????????????????????????????"
                value={valVendor}
                onChange={(value) => {
                  setValVendor(value);
                  SetTxtSearch({...txtSearch, stxtSearch: value
                  })
                }}
              />
              {/* <AvField
                type="select"
                name="sale"
                className="form-control"
                onChange={(e) =>
                  SetTxtSearch({
                    ...txtSearch,
                    txtSearch: e.target.value,
                  })
                }
              >
                <option value="">- ?????????????????? -</option>
                <option value="1">Office Mate</option>
                <option value="2">Lotus</option>
              </AvField> */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck1"
              />
              <label className="form-check-label">Re-Order Point</label>
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
              <button type="button" className="btn btn-success" onClick={() => {ReportExcel();}}>
                <i className="fas fa-file-excel"></i> Excel
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-1">
          <CreateTable
            Header={header}
            ItemData={lstData}
            CreateDataRow={CreateDataRow}
          />
        </div>
      </AvForm>
    </Fragment>
  );
};
export default Inventory_list;
