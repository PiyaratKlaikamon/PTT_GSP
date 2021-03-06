import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { AxiosGetJson, AxiosPostJson } from "../../Service/Config/AxiosMethod";
import { AvForm } from "availity-reactstrap-validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, CustomInput } from "reactstrap";
import CreateTable, { CellHeader } from "../../Systems/Table";
import {
  BoxMsg,
  DialogDelete,
  Encrypt,
  Responsestart,
  Sweetalert,
  TooltipsMSG,
} from "../../Systems/SystemComponent";

const ReasonWithdrawal = () => {
  const history = useHistory();
  const [data, setData] = useState({
    nID: 0,
    sName: "",
    sDetail: "",
    sUpdate: "",
    IsActive: true,
  });

  const { nID, sName, sDetail, sUpdate, IsActive } = data;
  const [RowSelected, setRowSelected] = useState([] as any);
  const [lstData, setlstData] = React.useState([] as any);

  const [txtSearch, SetTxtSearch] = React.useState({
    stxtSearch: "",
    sIsActive: "",
  });

  const { stxtSearch, sIsActive } = txtSearch;

  useEffect(() => {
    GetDataOnPageNewLoad();
  }, []);

  const GetDataOnPageNewLoad = async () => {
    let result: any = await AxiosGetJson("api/ReasonWithdrawal/GetListReason");
    setlstData(result.lst_Reason);
  };

  const SearchData = async () => {
    let urlPath = "";
    if (stxtSearch !== "" || sIsActive !== "") {
      urlPath =
        "api/ReasonWithdrawal/GetListReason?txtSearch=" +
        (stxtSearch === "" ? "none" : stxtSearch) +
        "&sIsActive=" +
        sIsActive;
    } else {
      urlPath = "api/ReasonWithdrawal/GetListReason";
    }
    let result: any = await AxiosGetJson(urlPath);
    console.log("result", result);
    setlstData(result.lst_Reason);
  };

  var onClickHeadCB = (e: any, currentData: any) => {
    let el = e.target;
    let dataSelect = el.checked
      ? currentData === null
        ? []
        : currentData.map((x: any) => x.nReasonID)
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

  const onDeleteData = () => {
    if (RowSelected.length > 0) {
      DialogDelete(async () => {
        var str = RowSelected.toString();
        let result: any = await AxiosPostJson(
          "api/ReasonWithdrawal/DeleteData?str=" + str
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
        let result: any = await AxiosGetJson("api/ReasonWithdrawal/EditReason");
      }
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
      label: "?????????",
      Sortby: "",
      ClassName: "align-middle text-center",
      SortType: Number,
      CSSStyle: { width: 50 },
    },
    {
      label: "?????????????????????????????????????????????",
      Sortby: "sName",
      ClassName: "align-middle text-nowrap",
      SortType: String,
    },
    {
      label: "???????????????",
      Sortby: "sStatus_Name",
      ClassName: "align-middle text-center",
      SortType: String,
      CSSStyle: { width: 210 },
    },
    {
      label: "??????????????????????????????????????????",
      Sortby: "sUpdate",
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
            history.push("/admin-reasonwithdrawal_edit?nID=0");
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
              id={`cbBody_${o.nReasonID}`}
              label={""}
              onChange={(e: any) => {
                let el = e.target;
                if (el.checked) {
                  onSelectedRow(o.nReasonID);
                } else {
                  onDeSelectedRow(o.nReasonID);
                }
              }}
              checked={RowSelected.indexOf(o.nReasonID) !== -1}
            />
          </td>
        )}
        <td className="align-middle text-center">{i + 1 + " ."}</td>
        <td className="align-middle">{o.sName}</td>
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
          <Button
            size="sm"
            type="button"
            color="info"
            onClick={() => {
              history.push("/admin-reasonwithdrawal_edit?nID=" + o.nReasonID);
            }}
          >
            <FontAwesomeIcon icon={["fas", "pencil-alt"]} />
          </Button>
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
                placeholder="?????????????????????????????????????????????"
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
                <option value="">- ???????????????-</option>
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
export default ReasonWithdrawal;
