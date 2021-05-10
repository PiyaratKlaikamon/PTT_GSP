import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { AxiosGetJson, AxiosPostJson } from "../../Service/Config/AxiosMethod";
import {
  AvForm,
  AvField,
  AvRadioGroup,
  AvRadio,
  AvGroup,
} from "availity-reactstrap-validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, CustomInput } from "reactstrap";
import CreateTable, { CellHeader } from "../../Systems/Table";
import {
  BoxMsg,
  DialogConfirm,
  DialogDelete,
  Encrypt,
  Responsestart,
  Sweetalert,
  TooltipsMSG,
} from "../../Systems/SystemComponent";
import { Link } from "react-router-dom";
import { parse } from "query-string";

const ReasonWithdrawal_Edit = () => {
  const history = useHistory();
  const [data, setData] = useState({
    nReasonID: 0,
    sName: "",
    sDetail: "",
    sUpdate: "",
    IsActive: true,
  });

  const { nReasonID, sName, sDetail, sUpdate, IsActive } = data;
  const [cChangeradio, setChangeradio] = useState("1");

  const onDataSubmit = (e, errors, values) => {
    if (errors.length === 0) {
      let data = {
        nReasonID: nReasonID,
        sName: sName,
        sDetail: sDetail,
        IsActive: values.cChangeradio == "1" ? true : false,
      };
      DialogConfirm(
        async () => {
          let result: any = await AxiosPostJson(
            "api/ReasonWithdrawal/SavetoDB",
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
      //       "api/ReasonWithdrawal/SavetoDB",
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
      "api/ReasonWithdrawal/EditReason?nID=" + nID,
      {}
    );
    setData(result);
    // setlstWorkMaterial(result.lstWorkMaterial);
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
          <div className="col-xl-6">
            <div className="form-group">
              <b>เหตุผลในการเบิก</b> <span className="text-danger">•</span>
              <AvField
                name="sname"
                type="text"
                errorMessage="โปรดระบุเหตุผลในการเบิก"
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
        <div className="row">
          <div className="col-auto">
            <div className="form-group">
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
                    required
                    value={cChangeradio}
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
        </div>
        <hr />

        <div className="form-row">
          <div className="col-auto">
            <a href="admin-reasonwithdrawal">
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
                    to="/admin-reasonwithdrawal"
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
export default ReasonWithdrawal_Edit;
