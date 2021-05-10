import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, CustomInput } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import CreateTable, { CellHeader } from "../../Systems/Table";
import {
  BoxMsg,
  DialogConfirm,
  DialogDelete,
  Responsestart,
  Sweetalert,
  TooltipsMSG,
} from "../../Systems/SystemComponent";
import axios from "axios";
import { AxiosGetJson, AxiosPostJson } from "../../Service/Config/AxiosMethod";

const ParcelGroup = () => {
  const history = useHistory();
  const [RowSelected, setRowSelected] = useState([] as any);
  const [DataUsed, setDataUsed] = useState([] as any);
  const [txtSearch, SetTxtSearch] = React.useState({
    stxtSearch: "",
    sIsActive: "",
  });

  const { stxtSearch, sIsActive } = txtSearch;

  // var onClickHeadCB = (e: any, currentData: any) => {
  //   debugger
  //   let el = e.target;
  //   let dataSelect = el.checked
  //     ? currentData === null
  //       ? []
  //       : currentData
  //           .filter((x: any) => x.IsUse === false)
  //           .map((e: any) => e.nUnitID)
  //     : [];
  //   setRowSelected(dataSelect);
  // };

var onClickHeadCB = (e: any, currentData: any) => {
  let el = e.target;
  let dataSelect = el.checked
    ? currentData === null
      ? []
      : currentData.map((x: any) => x.nUnitID)
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

  const [lstData, setlstData] = React.useState([] as any);

  const [data, setData] = useState({
    nID: 0,
    sName: "",
    sDetail: "",
    sUpdate: "",
    IsActive: true,
  });

  const { nID, sName, sDetail, sUpdate, IsActive } = data;

  
  // const SearchData = () => {
  //   let urlPath = "";
  //   if (stxtSearch !== "" || sIsActive !== "") {
  //     urlPath =
  //       "https://localhost:44349/api/Material_Unit/GetListMaterialUnit?txtSearch=" +
  //       (stxtSearch === "" ? "none" : stxtSearch) +
  //       "&sIsActive=" +
  //       sIsActive;
  //   } else {
  //     urlPath = "https://localhost:44349/api/Material_Unit/GetListMaterialUnit";
  //   }
  //   axios
  //     .get(urlPath)
  //     .then((res) => {
  //       const _data = res.data.lstMaterial_unit;
  //       setlstData(_data);
  //       // var used = _data.find(function (element) {
  //       //   return element.IsUse === true;
  //       // });
  //       // // console.log(used)
  //       // setDataUsed(used);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    GetDataOnPageNewLoad();
  }, []);

  const GetDataOnPageNewLoad = async () => {
    let result: any = await AxiosGetJson("api/Material_Unit/GetListMaterialUnit");
    setlstData(result.lstMaterial_unit);
  };

  const SearchData = async () => {
    let urlPath = "";
    if (stxtSearch !== "" || sIsActive !== "") {
      urlPath =
        "api/Material_Unit/GetListMaterialUnit?txtSearch=" +
        (stxtSearch === "" ? "none" : stxtSearch) +
        "&sIsActive=" +
        sIsActive;
    } else {
      urlPath = "api/Material_Unit/GetListMaterialUnit";
    }
    let result: any = await AxiosGetJson(urlPath);
    console.log("result", result);
    setlstData(result.lstMaterial_unit);
  };

  useEffect(() => {
    GetDataOnPageNewLoad();
  }, []);

  const onDeleteData = () => {
    if (RowSelected.length > 0) {
      DialogDelete(async () => {
        var str = RowSelected.toString();
        let result: any = await AxiosPostJson(
          "api/Material_Unit/DeleteData?str=" + str
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

  // const onDataSubmit = (e, errors) => {
  //   if (errors.length === 0) {
  //     if (nID) {
  //       axios
  //         .get(
  //           process.env.REACT_APP_API_URL +
  //             "https://localhost:44349/api/Material_Unit/EditMaterialUnit",
  //           {}
  //         )
  //         .then((res) => {})
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }
  //   }
  // };

  var onDataSubmit = async (e: any, errors: string | any[]) => {
    console.log("a");
    if (errors.length === 0) {
      if (nID) {
        let result: any = await AxiosGetJson("api/Material_Unit/EditMaterialUnit");
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
      label: "ที่",
      Sortby: "",
      ClassName: "align-middle text-center",
      SortType: Number,
      CSSStyle: { width: 50 },
    },
    {
      label: "ชื่อหน่วยนับวัสดุ",
      Sortby: "sName",
      ClassName: "align-middle text-nowrap",
      SortType: String,
    },
    {
      label: "สถานะ",
      Sortby: "sStatus_Name",
      ClassName: "align-middle text-center",
      SortType: String,
      CSSStyle: { width: 210 },
    },
    {
      label: "ปรับปรุงล่าสุด",
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
            history.push("/admin-parcelunit_edit?nID=0");
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
              id={`cbBody_${o.nUnitID}`}
              label={""}
              onChange={(e: any) => {
                let el = e.target;
                if (el.checked) {
                  onSelectedRow(o.nUnitID);
                } else {
                  onDeSelectedRow(o.nUnitID);
                }
              }}
              checked={RowSelected.indexOf(o.nUnitID) !== -1}
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
              history.push("/admin-parcelunit_edit?nID=" + o.nUnitID);
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
                placeholder="ชื่อหน่วยนับวัสดุ"
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
                <option value="">- สถานะ-</option>
                <option value="1">ใช้งาน</option>
                <option value="2">ไม่ใช้งาน</option>
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
export default ParcelGroup;
