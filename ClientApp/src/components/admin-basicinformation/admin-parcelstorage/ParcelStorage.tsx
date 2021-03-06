import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, CustomInput } from "reactstrap";
import {
  BoxMsg,
  DialogDelete,
  Responsestart,
  Sweetalert,
  TooltipsMSG,
} from "../../Systems/SystemComponent";
import CreateTable, { CellHeader } from "../../Systems/Table";
import axios from "axios";
import { AvForm } from "availity-reactstrap-validation";
import { AxiosGetJson, AxiosPostJson } from "../../Service/Config/AxiosMethod";

const ParcelStorage = () => {
  const history = useHistory();
  const [RowSelected, setRowSelected] = useState([] as any);

  const [lstData, setlstData] = React.useState([] as any);

  const [data, setData] = useState({
    nID: 0,
    sName: "",
    sDetail: "",
    sUpdate: "",
    IsActive: true,
  });

  const { nID, sName, sDetail, sUpdate, IsActive } = data;
  const [txtSearch, SetTxtSearch] = React.useState({
    stxtSearch: "",
    sIsActive: "",
  });

  const { stxtSearch, sIsActive } = txtSearch;

  const GetDataOnPageNewLoad = async () => {
    let result: any = await AxiosGetJson(
      "api/Material_Location/GetListMaterialLocation"
    );
    setlstData(result.lstMaterial_location);
  };

  const SearchData = async () => {
    let urlPath = "";
    if (stxtSearch !== "" || sIsActive !== "") {
      urlPath =
        "api/Material_Location/GetListMaterialLocation?txtSearch=" +
        (stxtSearch === "" ? "none" : stxtSearch) +
        "&sIsActive=" +
        sIsActive;
    } else {
      urlPath = "api/Material_Location/GetListMaterialLocation";
    }
    let result: any = await AxiosGetJson(urlPath);
    console.log("result", result);
    setlstData(result.lstMaterial_location);
  };

  useEffect(() => {
    GetDataOnPageNewLoad();
  }, []);

  const onDeleteData = () => {
    if (RowSelected.length > 0) {
      DialogDelete(async () => {
        var str = RowSelected.toString();
        let result: any = await AxiosPostJson(
          "api/Material_Location/DeleteData?str=" + str
        );
        if (result.data.sStatus === Responsestart.success) {
          await Sweetalert.Success(
            BoxMsg.Title_Success,
            BoxMsg.Desc_Success_Delete,
            null
          );
          GetDataOnPageNewLoad();
        } else if (result.data.sStatus === Responsestart.warning) {
          Sweetalert.Warning(
            BoxMsg.Desc_Warning_Delete,
            result.data.sMsg,
            null
          );
        } else {
          Sweetalert.Error(BoxMsg.Title_Error, result.data.sMsg, null);
        }
      });
    }
  };
  
  var onDataSubmit = async (e: any, errors: string | any[]) => {
    console.log("a");
    if (errors.length === 0) {
      if (nID) {
        let result: any = await AxiosGetJson(
          "api/Material_Location/EditMaterialLocation"
        );
      }
    }
  };

  var onClickHeadCB = (e: any, currentData: any) => {
    let el = e.target;
    let dataSelect = el.checked
      ? currentData === null
        ? []
        : currentData.map((x: any) => x.nLocationID)
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
      CSSStyle: { width: 1 },
    },
    {
      Sortby: "",
      SortType: Number,
      label: "?????????",
      ClassName: "align-middle text-center",
      CSSStyle: { width: 50 },
    },
    {
      label: "?????????????????????????????????",
      Sortby: "sName",
      ClassName: "align-middle text-nowrap",
      SortType: String,
    },
    {
      label: "???????????????",
      Sortby: "sStatus_Name",
      ClassName: "align-middle text-center",
      SortType: String,
      CSSStyle: { width: 250 },
    },
    {
      label: "??????????????????????????????????????????",
      Sortby: "sUpdate",
      ClassName: "align-middle text-center",
      SortType: String,
      CSSStyle: { width: 250 },
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
            history.push("/admin-parcel_storage-edit?nID=0");
          }}
        >
          <FontAwesomeIcon icon={["fas", "plus"]} />
        </Button>
      ),
      ClassName: "align-middle text-center",
      CSSStyle: { width: 1 },
    },
  ];

  const CreateData = (o: any, i: any) => {
    return (
      <tr key={i}>
        {o.IsUse ? (
          <td></td>
        ) : (
          <td className="align-middle text-center">
            <CustomInput
              type="checkbox"
              id={`cbBody_${o.nLocationID}`}
              label={""}
              onChange={(e: any) => {
                let el = e.target;
                if (el.checked) {
                  onSelectedRow(o.nLocationID);
                } else {
                  onDeSelectedRow(o.nLocationID);
                }
              }}
              checked={RowSelected.indexOf(o.nLocationID) !== -1}
            />
          </td>
        )}
        <td className="align-middle text-center">{i + 1 + " ."}</td>
        <td className="align-middle text-nowrap">{o.sName}</td>
        <td className="align-middle text-center">
          <Badge
            color={o.bStatus ? "success" : "danger"}
            style={{ fontSize: 11 }}
          >
            {o.sStatus_Name}
          </Badge>
        </td>
        <td className="align-middle text-center">{o.sUpdate}</td>
        <td className="align-middle text-center">
          {/* <a href="admin-parcel_storage-edit"> */}
          <Button
            size="sm"
            type="button"
            color="info"
            onClick={() => {
              history.push("/admin-parcel_storage-edit?nID=" + o.nLocationID);
            }}
          >
            <FontAwesomeIcon icon={["fas", "pencil-alt"]} />
          </Button>
          {/* </a> */}
        </td>
      </tr>
    );
  };

  return (
    <Fragment>
      <AvForm onSubmit={onDataSubmit}>
        <div className="form-row justify-content-end">
          <div className="col-auto">
            <div className="form-group">
              <input
                className="form-control form-control-sm"
                placeholder="?????????????????????????????????"
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
                <option value="">- ??????????????? -</option>
                <option value="1">??????????????????</option>
                <option value="2">???????????????????????????</option>
              </select>
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
        <div className="row mt-1">
          <CreateTable
            Header={header}
            ItemData={lstData}
            CreateDataRow={CreateData}
            IsHasBtnDEL={true}
            onBtnDelClick={onDeleteData}
            onClickHeadCB={onClickHeadCB}
            rowSelected={RowSelected}
          />
        </div>
      </AvForm>
    </Fragment>
  );
};
export default ParcelStorage;
