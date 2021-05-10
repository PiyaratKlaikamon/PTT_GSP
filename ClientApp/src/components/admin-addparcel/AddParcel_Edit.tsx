import React, { Fragment, useState } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardBody, Collapse, CustomInput } from "reactstrap";
import { TooltipsMSG } from "../Systems/SystemComponent";
import CreateTable, { CellHeader } from "../Systems/Table";
import Fileuploader, { Extension } from "../../Fileuploader";
import "../_Layout-Admin/Layout_Back.css";

const AddParcel_Edit = () => {
  const [RowSelected, setRowSelected] = useState([] as any);

  const [lstData_example, setlstData] = useState([
    {
      nID: 1,
      sEmpcode: "1001-002",
      sName: "ถ่านไฟฉาย ขนาด C 1.5 V.",
      sPrice: "15.00",
      sNum: 80,
      sUnit: "ก้อน",
      sSum: "1,200",
    },
    {
      nID: 2,
      sEmpcode: "1005-004",
      sName: "เทปกระดาษกาวย่น 2",
      sPrice: "18.00",
      sNum: 50,
      sUnit: "ม้วน",
      sSum: 900,
    },
    {
      nID: 3,
      sEmpcode: "1014-009",
      sName: "ปากกาเมจิก 2หัว SAKURA สีดำ",
      sPrice: "13.50",
      sNum: 75,
      sUnit: "แท่ง",
      sSum: "1,012.5",
    },
  ]);
  const [lstData_example2, setlstData2] = useState([
    {
      nID: 1,
      sEmpcode: "1001-002",
      sName: "ถ่านไฟฉาย ขนาด C 1.5 V.",
      sPrice: "15.00",
      sNum: 5,
      sUnit: "ก้อน",
      sSum: 75,
    },
    {
      nID: 2,
      sEmpcode: "1005-004",
      sName: "เทปกระดาษกาวย่น 2",
      sPrice: "18.00",
      sNum: 10,
      sUnit: "ม้วน",
      sSum: 180,
    },
    {
      nID: 3,
      sEmpcode: "1014-009",
      sName: "ปากกาเมจิก 2หัว SAKURA สีดำ",
      sPrice: "13.50",
      sNum: 10,
      sUnit: "แท่ง",
      sSum: 135,
    },
  ]);
  const [txtSearch, SetTxtSearch] = React.useState({
    stxtSearch: "",
    sIsActive: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [showDataType, setShowDataType] = React.useState("PO");
  const [fileList, setFileList] = useState([] as any);

  const onDeleteData = () => {};
  const SearchData = () => {};

  var onClickHeadCB = (e: any, currentData: any) => {
    let el = e.target;
    let dataSelect = el.checked
      ? currentData === null
        ? []
        : currentData.map((x: any) => x.nID)
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
      SortType: false,
      label: (
        <Button
          size="sm"
          color="primary"
          type="button"
          data-tip={TooltipsMSG.Add}
          onClick={toggle}
        >
          <FontAwesomeIcon icon={["fas", "plus"]} />
        </Button>
      ),
      ClassName: "align-middle text-center",
      CSSStyle: { width: 1 },
    },
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
      label: "ที่",
      ClassName: "align-middle text-center text-nowrap",
      CSSStyle: { width: 70 },
    },
    {
      label: "รหัสวัสดุ",
      Sortby: "",
      ClassName: "align-middle",
        SortType: Number,
        CSSStyle: { width: 70 },
    },
    {
      label: "ชื่อวัสดุ",
      Sortby: "",
      ClassName: "align-middle",
      SortType: Number,
    },
    {
      label: "ราคา",
      Sortby: "",
      ClassName: "align-middle",
      SortType: Number,
    },
    {
      label: "จำนวน",
      Sortby: "",
      ClassName: "align-middle",
      SortType: Number,
    },
    {
      label: "หน่วย",
      Sortby: "",
      ClassName: "align-middle",
      SortType: Number,
    },
    {
      label: "ราคารวม",
      Sortby: "",
      ClassName: "align-middle",
      SortType: Number,
    },
  ];

  const CreateData = (o: any, i: any) => {
    return (
      <tr key={i}>
        <td className="align-middle text-center">
          <Button size="sm" type="button" color="info">
            <FontAwesomeIcon icon={["fas", "pencil-alt"]} />
          </Button>
        </td>

        {/* <td className="align-middle text-center">
          <Button size="sm" type="button" color="danger" style={{ width: 32 }}>
            <FontAwesomeIcon icon={["fas", "times"]} />
          </Button>
        </td> */}
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
        <td className="align-middle text-center">{i + 1}</td>
        <td className="align-middle text-center">{o.sEmpcode}</td>
        <td className="align-middle">{o.sName}</td>
        <td className="align-middle text-right">{o.sPrice}</td>
        <td className="align-middle text-right">{o.sNum}</td>
        <td className="align-middle text-center">{o.sUnit}</td>
        <td className="align-middle text-right">{o.sSum}</td>
      </tr>
    );
  };
  var onUploadFileSuccess = () => {};

  return (
    <Fragment>
      <AvForm>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <b>ประเภทรายการ</b> <span className="text-danger">•</span>
              <AvField
                type="select"
                name="type"
                errorMessage="โปรดระบุประเภทรายการ"
                validate={{
                  required: { value: true },
                }}
                className="form-control"
                value={"1"}
                onChange={(e) => {
                  if (e.target.value === "1") {
                    setShowDataType("PO");
                  } else if (e.target.value === "2") {
                    setShowDataType("Reconcile");
                  } else {
                    setShowDataType("");
                  }
                }}
              >
                <option value="">- ประเภทรายการ -</option>
                <option value="1">PO</option>
                <option value="2">Reconcile</option>
              </AvField>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <b>หมายเหตุ</b> <span className="text-danger">•</span>
              <AvField
                type="text"
                name="note"
                errorMessage="โปรดระบุหมายเหตุ"
                validate={{
                  required: { value: true },
                }}
                className="form-control"
                autoComplete="off"
              ></AvField>
            </div>
          </div>
        </div>

        {/* PO */}
        {showDataType === "PO" ? (
          <Fragment>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <b>เลขที่ใบสั่งซื้อ (PO Number)</b>{" "}
                  <span className="text-danger">•</span>
                  <AvField
                    type="text"
                    name="POcode"
                    errorMessage="โปรดระบุเลขที่ใบสั่งซื้อ"
                    validate={{
                      required: { value: true },
                    }}
                    className="form-control"
                    autoComplete="off"
                  ></AvField>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <b>วันที่รับวัสดุ</b> <span className="text-danger">•</span>
                  <AvField
                    type="date"
                    name="date"
                    errorMessage="โปรดระบุวันที่รับวัสดุ"
                    validate={{
                      required: { value: true },
                    }}
                    className="form-control"
                    autoComplete="off"
                  ></AvField>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <b>ผู้ขาย</b> <span className="text-danger">•</span>
                  <AvField
                    type="select"
                    name="sale"
                    errorMessage="โปรดระบุผู้ขาย"
                    validate={{
                      required: { value: true },
                    }}
                    className="form-control"
                  >
                    <option value="">- ผู้ขาย -</option>
                    <option value="1">Office Mate</option>
                    <option value="2">Lotus</option>
                  </AvField>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <b>แนบไฟล์</b>
                  {/* <span className="text-muted small">
                    {" "}
                    ขนาดไฟล์ไม่เกิน 10MB.,นามสกุล: .jpg .jpeg .png (500x500)
                  </span> */}
                  <Fileuploader
                    limit="1"
                    setFileList={setFileList}
                    fileList={fileList}
                    onComplete={onUploadFileSuccess}
                    onRemoveComplete={onUploadFileSuccess}
                    fileMaxSize="10"
                    extensions={Extension.PDF}
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="col-auto">
                <b>รายการวัสดุ</b>
              </div>
              <div className="col-auto ml-auto">
                <div className="form-row">
                  <div className="col-auto">
                    <span>มูลค่าวัสดุรวม</span>&nbsp;
                    <b>
                      <span>3,112.50</span>
                    </b>
                    &nbsp;
                    <span>บาท</span>&nbsp;
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <CreateTable
                Header={header}
                ItemData={lstData_example}
                CreateDataRow={CreateData}
                IsHasBtnDEL={true}
                onBtnDelClick={onDeleteData}
                onClickHeadCB={onClickHeadCB}
                rowSelected={RowSelected}
              />
            </div>
            <Collapse isOpen={isOpen}>
              <Card>
                <CardBody>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <b>รหัส / ชื่อวัสดุ</b>{" "}
                        <span className="text-danger">•</span>
                        <AvField
                          type="text"
                          name="parcelname"
                          errorMessage="โปรดระบุชื่อรหัส/วัสดุ"
                          validate={{
                            required: { value: true },
                          }}
                          className="form-control"
                        ></AvField>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <b>จำนวน</b> <span className="text-danger">•</span>
                        <AvField
                          type="text"
                          name="num"
                          errorMessage="โปรดระบุจำนวน"
                          validate={{
                            required: { value: true },
                          }}
                          className="form-control"
                          autoComplete="off"
                        ></AvField>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <b>ราคา</b> <span className="text-danger">•</span>
                        <AvField
                          type="text"
                          name="price"
                          errorMessage="โปรดระบุราคา"
                          validate={{
                            required: { value: true },
                          }}
                          className="form-control"
                          autoComplete="off"
                        ></AvField>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="form-row">
                    <div className="col-auto">
                      <div className="form-group">
                        <button type="submit" className="btn btn-dark">
                          <i className="fas fa-upload"></i> บันทึก
                        </button>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={toggle}
                        >
                          <i className="fas fa-times"></i> ยกเลิก
                        </button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Collapse>
          </Fragment>
        ) : null}
        {/* Reconcile */}
        {showDataType === "Reconcile" ? (
          <Fragment>
            <div className="form-row">
              <div className="col-auto">
                <div className="small">
                  <b>รายการวัสดุ</b>
                </div>
              </div>
              <div className="col-auto ml-auto">
                <div className="form-row">
                  <div className="col-auto">
                    <div className="small">
                      <span>มูลค่าวัสดุรวม</span>&nbsp;
                      <b>
                        <span>390</span>
                      </b>
                      &nbsp;
                      <span>บาท</span>&nbsp;
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <CreateTable
                Header={header}
                ItemData={lstData_example2}
                CreateDataRow={CreateData}
                IsHasBtnDEL={true}
                onBtnDelClick={onDeleteData}
                onClickHeadCB={onClickHeadCB}
                rowSelected={RowSelected}
              />
            </div>
            <Collapse isOpen={isOpen}>
              <Card>
                <CardBody>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="small">
                          <b>รหัส / ชื่อวัสดุ</b>{" "}
                          <span className="text-danger">•</span>
                        </div>
                        <AvField
                          type="text"
                          name="parcelname"
                          errorMessage="โปรดระบุรหัส/ชื่อวัสดุ"
                          validate={{
                            required: { value: true },
                          }}
                          className="form-control"
                        ></AvField>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="small">
                          <b>จำนวน</b> <span className="text-danger">•</span>
                        </div>
                        <AvField
                          type="text"
                          name="num"
                          errorMessage="โปรดระบุจำนวน"
                          validate={{
                            required: { value: true },
                          }}
                          className="form-control"
                          autoComplete="off"
                        ></AvField>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="small">
                          <b>ราคา</b> <span className="text-danger">•</span>
                        </div>
                        <AvField
                          type="text"
                          name="price"
                          errorMessage="โปรดระบุราคา"
                          validate={{
                            required: { value: true },
                          }}
                          className="form-control"
                          autoComplete="off"
                        ></AvField>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="form-row">
                    <div className="col-auto">
                      <div className="form-group">
                        <button type="submit" className="btn btn-dark">
                          <i className="fas fa-upload"></i> บันทึก
                        </button>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="form-group">
                        <button
                          type="button"
                                                  className="btn btn-outline-secondary"
                          onClick={toggle}
                        >
                          <i className="fas fa-times"></i> ยกเลิก
                        </button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Collapse>
          </Fragment>
        ) : null}

        <hr />
        <div className="form-row">
          <div className="col-auto">
            <a href="admin-addparcel">
              <button type="button" className="btn btn-secondary">
                <i className="fas fa-arrow-left"></i> กลับ
              </button>
            </a>
          </div>
          <div className="col-auto ml-auto">
            <div className="form-row">
              <div className="col-auto">
                <div className="form-group">
                  <button type="submit" className="btn btn-warning">
                    <i className="fa fa-share fa-flip-horizontal"></i>{" "}
                    ส่งกลับแก้ไข
                  </button>
                </div>
              </div>
              <div className="col-auto">
                <div className="form-group">
                  <button type="submit" className="btn btn-success">
                    <i className="fas fa-check"></i> อนุมัติ
                  </button>
                </div>
              </div>
              <div className="col-auto">
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-save"></i> บันทึก
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AvForm>
    </Fragment>
  );
};
export default AddParcel_Edit;
