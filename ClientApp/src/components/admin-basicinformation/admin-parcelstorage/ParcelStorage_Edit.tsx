import React, { Fragment, useEffect, useState } from "react";
import {
  AvForm,
  AvField,
  AvRadioGroup,
  AvRadio,
  AvGroup,
} from "availity-reactstrap-validation";
import {
  BoxMsg,
  DialogConfirm,
  Responsestart,
  Sweetalert,
} from "../../Systems/SystemComponent";
import axios from "axios";
import { Link } from "react-router-dom";
import { parse } from "query-string";
import { AxiosGetJson, AxiosPostJson } from "../../Service/Config/AxiosMethod";

const ParcelStorage_Edit = () => {
  const [cChangeradio, setChangeradio] = useState("1");

  const [data, setData] = useState({
    nLocationID: 0,
    sName: "",
    sDetail: "",
    sUpdate: "",
    IsActive: true,
  });

  const { nLocationID, sName, sDetail, sUpdate, IsActive } = data;

  const onDataSubmit = (e, errors, values) => {
    if (errors.length === 0) {
      let data = {
        nLocationID: nLocationID,
        sName: sName,
        sDetail: sDetail,
        IsActive: values.cChangeradio == "1" ? true : false,
      };

      DialogConfirm(
        async () => {
          let result: any = await AxiosPostJson(
            "api/Material_Location/SavetoDB",
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
    //       "api/Material_Location/SavetoDB",
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

  const EditData = async () => {
    var { nID } = parse(window.location.search);
    let result: any = await AxiosGetJson(
      "api/Material_Location/EditMaterialLocation?nID=" + nID,
      {}
    );
    setData(result);
    setChangeradio(result.bStatus == false ? "0" : "1");
  };

  useEffect(() => {
    EditData();
  }, []);

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
              <b>ชื่อสถานที่</b> <span className="text-danger">•</span>
              <AvField
                type="text"
                name="name"
                errorMessage="โปรดระบุชื่อสถานที่"
                validate={{
                  required: { value: true },
                  maxLength: { value: 250 },
                }}
                className="form-control-sm"
                autoComplete="off"
                value={sName}
                onChange={(e: { target: { value: any } }) => {
                  setData({ ...data, sName: e.target.value });
                }}
              ></AvField>
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
                validate={{
                  maxLength: { value: 2500 },
                }}
                onChange={(e: { target: { value: any } }) => {
                  setData({ ...data, sDetail: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-auto">
            <div className="form-group">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="0"
                  checked={IsActive === true}
                  onChange={(e: { target: { value: any } }) => {
                    setData({ ...data, IsActive: true });
                  }}
                />
                &nbsp;
                <label className="form-check-label">ใช้งาน</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="1"
                  checked={IsActive === false}
                  onChange={(e: { target: { value: any } }) => {
                    setData({ ...data, IsActive: false });
                  }}
                />
                &nbsp;
                <label className="form-check-label">ไม่ใช้งาน</label>
              </div>
            </div>
          </div>
        </div> */}
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
                  name="cChangeradio"
                  value={cChangeradio}
                  required
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
        <hr />
        <div className="form-row">
          <div className="col-auto">
            <a href="admin-parcelstorage">
              <button type="button" className="btn btn-secondary">
                <i className="fas fa-arrow-left"></i> ย้อนกลับ
              </button>
            </a>
          </div>
          <div className="col-auto ml-auto">
            <div className="form-row">
              <div className="col-auto">
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-save"></i> บันทึก
                  </button>
                  <Link
                    id={"LinkBackToList"}
                    to="/admin-parcelstorage"
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
export default ParcelStorage_Edit;
