import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useState } from "react";
import { Button, Card, CardBody, Collapse, CustomInput } from "reactstrap";
import CreateTable, { CellHeader } from "../Systems/Table";

const ApprovalList = () => {
  const [lstData_example, setlstData] = useState([
    {
      Order: 6403001,
      sNote: "เพิ่ม Lot#1",
      sCreator: "สะอาด สีสดใส",
      dDate: "22/03/2564 16:35 น.",
      sReason: 1,
    },
    {
      Order: 6403002,
      sNote: "ตรวจเช็ค Stock",
      sCreator: "ยิ่งยอด จันทร์โทลา",
      dDate: "23/03/2564 16:35 น.",
      sReason: 1,
    },
    {
      Order: 6403003,
      sNote: "ตรวจเช็ค Stock",
      sCreator: "อภิรัช ทรงดี",
      dDate: "23/03/2564 16:35 น.",
      sReason: 1,
    },
  ]);

  const [sublstData, setsublstData] = useState([
    {
      nID: 1,
      sParcelcode: "1001-002",
      sParcelanme: "ถ่านไฟฉาย ขนาด C 1.5 V.",
      sNum: "-5",
      sUnit: "ก้อน",
      sReason: "ชำรุดใช้การไม่ได้",
    },
    {
      nID: 2,
      sParcelcode: "1005-004",
      sParcelanme: "เทปกระดาษกาวย่น 2",
      sNum: "3",
      sUnit: "ม้วน",
      sReason: "อัปเดตข้อมูล",
    },
    {
      nID: 3,
      sParcelcode: "1014-009",
      sParcelanme: "ปากกาเมจิก 2หัว SAKURA สีดำ",
      sNum: "-4",
      sUnit: "แท่ง",
      sReason: "สูญหาย",
    },
  ]);
  const [RowSelected, setRowSelected] = useState([] as any);
  const [collapses, setCollapse] = useState(
    Array(lstData_example.length).fill(false)
  );

  const toggle = (i) => {
    const newCollapse = collapses.slice();
    newCollapse[i] = !newCollapse[i];
    setCollapse(newCollapse);
  };
  const [txtSearch, SetTxtSearch] = React.useState({
    stxtSearch: "",
    sIsActive: "",
  });

  const { stxtSearch, sIsActive } = txtSearch;
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

  const header: CellHeader[] = [
    {
      Sortby: "",
      SortType: Number,
      label: "",
      ClassName: "align-middle text-center",
      IsCheckBox: false,
      CSSStyle: { width: 1 },
    },
    {
      Sortby: "",
      SortType: Number,
      label: "",
      ClassName: "align-middle text-center text-nowrap",
      CSSStyle: { width: 1 },
    },
    {
      Sortby: "",
      SortType: Number,
      label: "เลขที่รายการ",
      ClassName: "align-middle text-center text-nowrap",
      CSSStyle: { width: 70 },
    },
    {
      label: "หมายเหตุ",
      Sortby: "",
      ClassName: "align-middle",
      SortType: String,
    },
    {
      label: "ผู้สร้างรายการ",
      Sortby: "",
      ClassName: "align-middle",
      SortType: String,
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
      CSSStyle: { width: 210 },
    },
  ];

  const CreateData = (o: any, i: any) => {
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
          <td className="align-middle text-center">{o.Order}</td>
          <td className="align-middle">{o.sNote}</td>
          <td className="align-middle">{o.sCreator}</td>
          <td className="align-middle text-center">{o.dDate}</td>
          <td className="align-middle">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="กรณี ส่งกลับแก้ไข"
            />
          </td>
        </tr>
        <tr>
          <td colSpan={10} className="p-0">
            <Collapse isOpen={collapses[i]} key={i}>
              <Card className="border-0">
                <CardBody>
                  <div>
                    <CreateTable
                      Header={subheader}
                      ItemData={sublstData}
                      CreateDataRow={SubCreateDataRow}
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

  const subheader: CellHeader[] = [
    {
      label: "ที่",
      Sortby: "",
      SortType: Number,
      ClassName: "align-middle text-center text-nowrap",
      CSSStyle: { width: 1 },
    },
    {
      label: "รหัสวัสดุ",
      Sortby: "sParcelcode",
      SortType: String,
      ClassName: "align-middle",
    },
    {
      label: "ชื่อวัสดุ",
      Sortby: "sParcelanme",
      SortType: String,
      ClassName: "align-middle",
    },
    {
      label: "จำนวน",
      Sortby: "sRequestamount",
      SortType: String,
      ClassName: "align-middle text-center",
    },
    {
      label: "หน่วย",
      Sortby: "sReceivedamount",
      SortType: String,
      ClassName: "align-middle text-center",
    },
    {
      label: "เหตุผล",
      Sortby: "sUnit",
      SortType: String,
      ClassName: "align-middle text-center",
    },
  ];

  const SubCreateDataRow = (obj, Subindex) => {
    return (
      <tr key={Subindex}>
        <td className="align-middle text-center">{obj.nID}</td>
        <td className="align-middle text-center">{obj.sParcelcode}</td>
        <td className="align-middle">{obj.sParcelanme}</td>
        <td className="align-middle text-right">{obj.sNum}</td>
        <td className="align-middle text-center">{obj.sUnit}</td>
        <td className="align-middle">{obj.sReason}</td>
      </tr>
    );
  };
  return (
    <Fragment>
      <div className="form-row">
        <div className="col-auto ml-auto">
          <div className="form-group">
            <input
              className="form-control form-control-sm"
              placeholder="เลขที่รายการ"
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
            <input
              className="form-control form-control-sm"
              placeholder="วันที่เริ่มต้น"
              type="date"
              required
              onChange={(e) =>
                SetTxtSearch({
                  ...txtSearch,
                  stxtSearch: e.target.value,
                })
              }
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
              onChange={(e) =>
                SetTxtSearch({
                  ...txtSearch,
                  stxtSearch: e.target.value,
                })
              }
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
      <div className="row mt-1">
        <CreateTable
          Header={header}
          ItemData={lstData_example}
          CreateDataRow={CreateData}
          IsHasBtnDEL={false}
          rowSelected={RowSelected}
        />
      </div>
      <div className="form-row">
        <div className="col-auto">
          <button type="submit" className="btn btn-success btn-sm">
            <i className="fas fa-check"></i> อนุมัติ
          </button>
        </div>
        <div className="col-auto">
          <button type="button" className="btn btn-warning btn-sm">
            <i className="fa fa-share fa-flip-horizontal"></i> ส่งกลับแก้ไข
          </button>
        </div>
      </div>
    </Fragment>
  );
};
export default ApprovalList;
