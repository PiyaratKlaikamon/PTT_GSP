import React, { Fragment, useState } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "reactstrap";
import { TooltipsMSG } from "../Systems/SystemComponent";
import CreateTable, { CellHeader } from "../Systems/Table";

const AddParcel = () => {
  const history = useHistory();
  const [lstData_example, setlstData] = useState([
    {
      nOrder: 640003,
      dCreate: "22/03/2564",
      sNote: "เพิ่ม Lot#1",
      sType: "PO",
      sValue: "343,280.00",
      sUser_Create: "สมชาย ทองปาน",
      sStatus: "บันทึก",
    },
    {
      nOrder: 640002,
      dCreate: "22/03/2564",
      sNote: "ตรวจเช็ค Stock",
      sType: "Reconcile",
      sValue: "343,280.00",
      sUser_Create: "สมชาย ทองปาน",
      sStatus: "ส่งกลับแก้ไข",
    },
    {
      nOrder: 640001,
      dCreate: "22/03/2564",
      sNote: "ตรวจเช็ค Stock",
      sType: "Reconcile",
      sValue: "343,280.00",
      sUser_Create: "สมชาย ทองปาน",
      sStatus: "รออนุมัติ",
    },
  ]);

  const [RowSelected, setRowSelected] = useState([] as any);
  const [txtSearch, SetTxtSearch] = React.useState({
    stxtSearch: "",
    sIsActive: "",
  });

  const { stxtSearch, sIsActive } = txtSearch;
  const onDeleteData = () => {};
  const SearchData = () => {};

  const header: CellHeader[] = [
    {
      Sortby: "",
      SortType: Number,
      label: "ที่",
      ClassName: "align-middle text-center text-nowrap",
      CSSStyle: { width: 70 },
    },
    {
      label: "เลขที่รายการ",
      Sortby: "",
      ClassName: "align-middle",
      SortType: Number,
    },
    {
      label: "วันที่สร้างรายการ",
      Sortby: "",
      ClassName: "align-middle",
      SortType: Number,
    },
    {
      label: "หมายเหตุ",
      Sortby: "",
      ClassName: "align-middle",
      SortType: Number,
    },
    {
      label: "ประเภทรายการ",
      Sortby: "",
      ClassName: "align-middle",
      SortType: Number,
    },
    {
      label: "ผู้ทำรายการ",
      Sortby: "",
      ClassName: "align-middle text-center",
      SortType: String,
    },
    {
      label: "สถานะ",
      Sortby: "",
      ClassName: "align-middle text-center",
      SortType: String,
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
            history.push("/admin-addparcel-edit");
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
        <td className="align-middle text-center">{i + 1}</td>
        <td className="align-middle text-center">{o.nOrder}</td>
        <td className="align-middle text-center">{o.dCreate}</td>
        <td className="align-middle">{o.sNote}</td>
        <td className="align-middle text-center">{o.sType}</td>
        <td className="align-middle">{o.sUser_Create}</td>
        <td className="align-middle text-center">{o.sStatus}</td>
        <td className="align-middle text-center">
          <a href="admin-addparcel-edit">
            <Button size="sm" type="button" color="info">
              <FontAwesomeIcon icon={["fas", "pencil-alt"]} />
            </Button>
          </a>
        </td>
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
            <select
              className="form-control form-control-sm"
              onChange={(e) => {
                SetTxtSearch({
                  ...txtSearch,
                  stxtSearch: e.target.value,
                });
              }}
            >
              <option value="">- ประเภท -</option>
              <option value="1">PO</option>
              <option value="2">Reconcile</option>
            </select>
          </div>
        </div>
        <div className="col-auto">
          <div className="form-group">
            <input
              className="form-control form-control-sm"
              placeholder="วันที่เริ่มต้น"
              type="date"
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
            <select
              className="form-control form-control-sm"
              onChange={(e) => {
                SetTxtSearch({
                  ...txtSearch,
                  sIsActive: e.target.value,
                });
              }}
            >
              <option value="">- สถานะ -</option>
              <option value="1">บันทึก</option>
              <option value="2">รออนุมัติ</option>
              <option value="3">ส่งกลับแก้ไข</option>
              <option value="4">อนุมัติ</option>
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
          ItemData={lstData_example}
          CreateDataRow={CreateData}
          IsHasBtnDEL={false}
        />
      </div>
    </Fragment>
  );
};
export default AddParcel;
