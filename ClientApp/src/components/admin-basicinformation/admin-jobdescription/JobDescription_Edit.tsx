import * as React from "react";
import { useState } from "react";
import { Fragment } from "react";
import CreateTable, { CellHeader } from "../../Systems/Table";
import {
  AvForm,
  AvField,
  AvRadioGroup,
  AvRadio,
  AvGroup,
  AvInput,
} from "availity-reactstrap-validation";
import "../../_Layout-Admin/Layout_Back";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Collapse,
  CustomInput,
} from "reactstrap";
import {
  BoxMsg,
  DialogConfirm,
  DialogDelete,
  Responsestart,
  Sweetalert,
  TooltipsMSG,
} from "../../Systems/SystemComponent";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import { AxiosGetJson, AxiosPostJson } from "../../Service/Config/AxiosMethod";
import { parse } from "query-string";
import { Typeahead } from "react-bootstrap-typeahead";

const JobDescription_Edit = (props: any) => {
  const [data, setData] = useState({
    nWorkID: 0,
    nReasonID: 0,
    sReason: "",
    sName: "",
    sDetail: "",
    IsActive: true,

    nMaterialID: 0,
    nAmount: 0,
  });

  const {
    nWorkID,
    nReasonID,
    sReason,
    sName,
    sDetail,
    IsActive,
    nMaterialID,
    nAmount,
  } = data;
  const [form, setForm] = React.useState([] as any);
  var resetFrom = () => {
    setData({
      nWorkID: 0,
      nReasonID: 0,
      sReason: "",
      sName: "",
      sDetail: "",
      IsActive: true,
      nMaterialID: 0,
      nAmount: 0,
    });
    form.reset();
  };

  const [lstData, setlstData] = React.useState([] as any);
  const [lstautoComplete, setlstautoComplete] = useState([
    {
      value: "",
      label: "",
      MaterialCode: "",
      sUnitname: "",
    },
  ]);

  const space = [
    {
      value: "",
      label: "",
      MaterialCode: "",
      sUnitname: "",
    },
  ];

  const [lstWorkMaterial, setlstWorkMaterial] = React.useState([] as any);

  const [optReason, setReason] = useState([] as any);
  const [valReason, setValReason] = useState([] as any);
  const [optMaterialsID, setMaterialsID] = useState([] as any);

  const [optMaterials, setoptMaterials] = useState([] as any);
  const [valMaterialsID, setValMaterialsID] = useState([] as any);

  const setDataEdit = (o) => {
    setData({ ...data, nMaterialID: o.nMaterialID, nAmount: o.nAmount });
    var data = optMaterials.filter((a) => a.value === o.nMaterialID.toString());
    if (data.length > 0) {
      var dataauto = [
        {
          value: o.nMaterialID,
          label: o.sMaterialCode + " " + ":" + " " + o.sName,
          MaterialCode: o.sMaterialCode + " " + o.sName,
          sUnitname: o.sUnitName,
        },
      ];
      setlstautoComplete(dataauto);
    }
    setChangeradioMate(o.bStatus === false ? "0" : "1");
  };

  const onDeleteItem = (o) => {
    DialogDelete(async () => {
      var array = [...lstData]; // make a separate copy of the array
      var index = array.indexOf(o);
      if (index !== -1) {
        array.splice(index, 1);
        setlstData(array);
      }
      Sweetalert.Success(
        BoxMsg.Title_Confirm,
        BoxMsg.Desc_Success_Delete,
        null
      );
    });
  };

  const history = useHistory();
  var nReason: any = [];
  var nMaterial: any = [];

  const [cChangeradio, setChangeradio] = useState("1");
  const [cChangeradioMate, setChangeradioMate] = useState("1");

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [RowSelected, setRowSelected] = useState([] as any);
  const [check, setcheck] = useState(false);

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
    // {
    //   Sortby: "",
    //   SortType: Number,
    //   label: "",
    //   ClassName: "align-middle text-center",
    //   CSSStyle: { width: 1 },
    // },
    {
      label: "ที่",
      Sortby: "",
      ClassName: "align-middle text-center",
      SortType: Number,
      CSSStyle: { width: 1 },
    },
    {
      label: "รหัสวัสดุ",
      Sortby: "",
      ClassName: "align-middle text-center text-nowrap",
      SortType: Number,
      CSSStyle: { width: 1 },
    },
    {
      label: "ชื่อวัสดุ",
      Sortby: "",
      ClassName: "align-middle text-center text-nowrap",
      SortType: String,
      CSSStyle: { width: 210 },
    },
    {
      label: "จำนวนที่แนะนำ",
      Sortby: "",
      ClassName: "align-middle text-center text-nowrap",
      SortType: String,
      CSSStyle: { width: 210 },
    },
    {
      label: "หน่วยนับ",
      Sortby: "",
      ClassName: "align-middle text-center text-nowrap",
      SortType: String,
      CSSStyle: { width: 210 },
    },
    {
      label: "สถานะ",
      Sortby: "",
      ClassName: "align-middle text-center",
      SortType: String,
      CSSStyle: { width: 100 },
    },
  ];

  const CreateData = (o: any, i: any) => {
    return (
      <tr key={i}>
        <td className="align-middle text-center text-nowrap">
          <Button
            size="sm"
            type="button"
            color="info"
            onClick={(e) => {
              toggle();
              setDataEdit(o);
            }}
          >
            <FontAwesomeIcon icon={["fas", "pencil-alt"]} />
          </Button>{" "}
          <Button
            size="sm"
            type="button"
            color="danger"
            style={{ width: "32px" }}
            onClick={(e) => {
              onDeleteItem(o);
            }}
          >
            <FontAwesomeIcon icon={["fas", "times"]} />
          </Button>
        </td>

        {/* <td className="align-middle text-center">
          <Button
            size="sm"
            type="button"
            color="danger"
            style={{ width: "32px" }}
          >
            <FontAwesomeIcon icon={["fas", "times"]} />
          </Button>
        </td> */}
        <td className="align-middle text-center">{i + 1 + " ."}</td>
        <td className="align-middle text-center">{o.sMaterialCode}</td>
        <td className="align-middle text-center">{o.sName}</td>
        <td className="align-middle text-center">{o.nAmount}</td>
        <td className="align-middle text-center">{o.sUnitName}</td>
        <td className="align-middle text-center">
          <Badge
            color={o.bStatus ? "success" : "danger"}
            style={{ fontSize: 11 }}
          >
            {o.sStatus_Name}
          </Badge>
        </td>
      </tr>
    );
  };

  const onDataSubmit = (e, errors, values) => {
    if (errors.length === 0) {
      let data = {
        nWorkID: nWorkID,
        nReasonID: nReasonID,
        sReason: sReason,
        sName: sName,
        sDetail: sDetail,
        lstWorkMaterial: lstData,
        IsActive: values.cChangeradio == "1" ? true : false,
      };
      DialogConfirm(
        async () => {
          let result: any = await AxiosPostJson(
            "api/JobDescription/SavetoDB",
            data
          );
          if (result.data.sStatus === Responsestart.success) {
            Sweetalert.Success(
              BoxMsg.Desc_Success_Save,
              BoxMsg.Desc_Success_Save,
              null
            );

            await LinkToListPage();
          } else if (result.data.sStatus === Responsestart.warning) {
            Sweetalert.Warning(BoxMsg.Title_Warning, result.data.sMsg, null);
          } else {
            Sweetalert.Error(BoxMsg.Title_Error, result.data.sMsg, null);
          }
        },
        null,
        BoxMsg.Title_Confirm,
        BoxMsg.Desc_Confirm_Save
      );
      //   DialogConfirm(async () => {
      //     let result: any = await AxiosPostJson(
      //       "api/JobDescription/SavetoDB",
      //       data
      //     );
      //     console.log("result", result);
      //     if (result.data.sStatus === Responsestart.success) {
      //       await LinkToListPage();
      //       await Sweetalert.Success(
      //         BoxMsg.Title_Confirm,
      //         BoxMsg.Desc_Success_Save,
      //         null
      //       );
      //     } else if (result.data.sStatus === Responsestart.warning) {
      //       Sweetalert.Warning(BoxMsg.Title_Warning, result.data.sMsg, null);
      //     } else {
      //       Sweetalert.Error(BoxMsg.Title_Error, result.data.sMsg, null);
      //     }
      //   });
      // } else {
      //   Sweetalert.Warning(BoxMsg.Title_Warning, "", null);
    }
  };

  const onDeleteData = async (nMaterialID: number) => {
    DialogDelete(async () => {
      let result: any = await AxiosPostJson(
        "api/JobDescription/onDeleteDataMaterial"
      );
      if (result.data.sStatus === Responsestart.success) {
        await Sweetalert.Success(
          BoxMsg.Title_Success,
          BoxMsg.Desc_Success_Delete,
          null
        );
        GetDataMaterial();
      } else if (result.data.sStatus === Responsestart.warning) {
        Sweetalert.Warning(BoxMsg.Title_Warning, result.data.sMsg, null);
      } else {
        Sweetalert.Error(BoxMsg.Title_Error, result.data.sMsg, null);
      }
    });
  };

  useEffect(() => {
    GetDropdownReason();
    EditData();
    GetDropdownMaterial();
    GetDataMaterial();
  }, []);

  const GetDropdownReason = async () => {
    let result: any = await AxiosGetJson("api/JobDescription/GetReason");
    setReason(result);
    nReason = result;
  };

  const GetDropdownMaterial = async () => {
    let result: any = await AxiosGetJson("api/JobDescription/GetMaterial");
    setoptMaterials(result);
  };

  const GetDataMaterial = async () => {
    var { nID } = parse(window.location.search);
    let result: any = await AxiosGetJson(
      "api/JobDescription/GetListMaterial?nID=" + nID
    );
    setlstData(result.lst_Materials);
  };

  const EditData = async () => {
    var { nID } = parse(window.location.search);
    let result: any = await AxiosGetJson(
      "api/JobDescription/EditData?nID=" + nID,
      {}
    );
    setData(result);
    setChangeradio(result.bStatus == false ? "0" : "1");

    if (nID === "0") {
    } else {
      let ag = nReason.find(
        (element: { value: any }) =>
          element.value === result.nReasonID.toString()
      );
      if (ag != undefined) {
        setValReason(ag);
      }
    }
  };

  const onAddMaterial = () => {
    // if (errors.length == 0) {
      if(lstautoComplete.length == 0)
      {
      }
    var lstname = lstautoComplete[0].label.split(":");
    if (lstname[1] === "" || lstname[1] === undefined) {
      return;
    }
    if (nAmount === 0 || nAmount === undefined) {
      return;
    } else {
      var a = [...lstData];
      a.push({
        nMaterialID: parseInt(lstautoComplete[0].value),
        sMaterialCode: lstname[0],
        sName: lstname[1],
        nAmount: nAmount,
        sUnitName: lstautoComplete[0].sUnitname,
        IsActive: cChangeradioMate == "1" ? true : false,
        bStatus: cChangeradioMate == "1" ? true : false,
        sStatus_Name: cChangeradioMate == "1" ? "ใช้งาน" : "ไม่ใช้งาน",
      });
      // resetFrom();
      setData({ ...data, nMaterialID: 0, nAmount: 0 });
      setlstautoComplete(space);
      setIsOpen(false);
      setlstData(a);
    }
    // }
  };

  const addDataIntable = (i: any) => {
    setlstautoComplete(i);
    if (i === null) {
      setcheck(true);
    } else {
      setcheck(false);
    }
  };

  const LinkToListPage = () => {
    let el = document.getElementById("LinkBackToList") as any;
    el && el.click();
  };

  return (
    <Fragment>
      <AvForm onSubmit={onDataSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <b>ลักษณะงาน</b> <span className="text-danger">•</span>
              <AvField
                name="work"
                type="text"
                errorMessage="โปรดระบุลักษณะงาน"
                validate={{
                  required: { value: true },
                  maxLength: { value: 100 },
                }}
                className="form-control"
                autoComplete="off"
                value={sName}
                onChange={(e: { target: { value: any } }) => {
                  setData({ ...data, sName: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <b>เหตุผลในการเบิก</b> <span className="text-danger">•</span>
              <Select
                isClearable
                options={optReason}
                closeMenuOnSelect={true}
                placeholder="เลือกเหตุผลในการเบิก"
                errorMessage="โปรดระบุเหตุผลในการเบิก"
                value={valReason}
                onChange={(value) => {
                  setValReason(value);
                  setData({ ...data, nReasonID: parseInt(value.value) });
                }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <b>รายละเอียด</b>
              <AvField
                name="cDescription"
                type="textarea"
                rows={4}
                value={sDetail}
                onChange={(e: { target: { value: any } }) => {
                  setData({ ...data, sDetail: e.target.value });
                }}
                validate={{
                  maxLength: { value: 2500 },
                }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-auto">
            <div className="row">
              <div className="col-auto">
                <b>สถานะ</b>
              </div>
            </div>
            <div className="row">
              <div className="col-auto">
                <AvRadioGroup
                  inline
                  name="cChangeradio"
                  value={cChangeradio}
                  required
                  classes="bg-transparent"
                >
                  <AvRadio label="&nbsp;ใช้งาน" value="1" id="inlineRadio1" />
                  <AvRadio
                    label="&nbsp;ไม่ใช้งาน"
                    value="0"
                    id="inlineRadio2"
                  />
                </AvRadioGroup>
              </div>
            </div>
          </div>
        </div>
        <b>รายการวัสดุ</b> <span className="text-danger">•</span>
        <Collapse isOpen={isOpen}>
          <Card>
            {/* <AvForm onSubmit={onAddMaterial} ref={(f) => setForm(f)}> */}
            <CardBody>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <b>รหัส/ชื่อวัสดุ</b> <span className="text-danger">•</span>
                    {/* <AvField
                        name="MaterialName"
                        type="text"
                        errorMessage="กรุณาระบุรหัส/ชื่อวัสดุ"
                        validate={{
                          required: { value: true },
                        }}
                        className="form-control"
                      /> */}
                    <div className="input-group">
                      <Typeahead
                        filterBy={["MaterialCode"]} //ให้ filter จากอะไร (อ้างอิงจาก optState โดยชื่อ field ต้องตรงกัน)
                        id="custom-filtering-example"
                        options={optMaterials} // optState คือ state ที่ใช้ในการเก็บค่า option autocomplete
                        placeholder="ค้นหาด้วยรหัส, ชื่อวัสดุ"
                        onChange={(e) => {
                          addDataIntable(e);
                        }} //event เมื่อเลือกค่าหรือกรอกค่าเสร็จแล้ว ส่วนใหญ่ใช้สำหรับ set state ของ valState
                        minLength={3} // set ให้กรอกตัวอักษรกี่ตัวแล้วให้ autocomplete แสดง
                        selected={lstautoComplete} // valState คือ stateที่ใช้ในการเก็บค่าที่เลือกหรือกรอกข้อมูล autocomplete
                        onInputChange={(e) => {}} //event keyup ใน autocomplete ***optional
                        //size="small" // small medium large *** อันนี้ไม่แน่ใจ
                        disabled={false} // set enable/ disable ***default false
                        isInvalid={check} // set valid/ invalid ***default true
                        errorMessage="โปรดระบุรหัส, ชื่อวัสดุ"
                      ></Typeahead>
                      <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">
                          <i className="fas fa-search"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6">
                  <div className="form-group">
                    <b>จำนวนที่แนะนำ</b> <span className="text-danger">•</span>
                    <AvField
                      name="Amount"
                      type="text"
                      errorMessage="โปรดระบุจำนวนที่แนะนำ"
                      validate={{
                        required: { value: true },
                      }}
                      className="form-control"
                      value={nAmount}
                      onChange={(e: { target: { value: any } }) => {
                        setData({ ...data, nAmount: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-auto">
                  <div className="row">
                    <div className="col-auto">
                      <label>
                        <b>สถานะ</b>
                      </label>{" "}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-auto">
                      <AvRadioGroup
                        inline
                        name="cChangeradioMate"
                        value={cChangeradioMate}
                        required
                      >
                        <AvRadio
                          label="&nbsp;ใช้งาน"
                          value="1"
                          id="inlineRadio3"
                        />
                        <AvRadio
                          label="&nbsp;ไม่ใช้งาน"
                          value="0"
                          id="inlineRadio4"
                        />
                      </AvRadioGroup>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </CardBody>
            <CardFooter>
              <div className="form-row">
                <div className="col-auto">
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn btn-dark btn-sm"
                      onClick={(e) => onAddMaterial()}
                    >
                      <i className="fas fa-upload"></i> เพิ่มรายการ
                    </button>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={toggle}
                    >
                      <i className="fas fa-times"></i> ยกเลิก
                    </button>
                  </div>
                </div>
              </div>
            </CardFooter>
            {/* </AvForm> */}
          </Card>
        </Collapse>
        <div className="row mt-0">
          <CreateTable
            Header={header}
            ItemData={lstData}
            CreateDataRow={CreateData}
            IsHasBtnDEL={false}
            onBtnDelClick={onDeleteData}
            rowSelected={RowSelected}
          />
        </div>
        <hr />
        <div className="form-row">
          <div className="col-auto">
            <a href="admin-jobdescription">
              <button type="button" className="btn btn-secondary">
                <i className="fas fa-arrow-left"></i> ย้อนกลับ
              </button>
            </a>
          </div>
          <div className="col-auto ml-auto">
            <div className="form-row">
              <div className="col-auto">
                <div className="form-group">
                  <button type="submit" className="btn btn-primary ">
                    <i className="fas fa-save"></i> บันทึก
                  </button>
                  <Link
                    id={"LinkBackToList"}
                    to="/admin-jobdescription"
                    hidden
                  ></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AvForm>
    </Fragment>
  );
};

export default JobDescription_Edit;
