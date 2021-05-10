import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Badge, Button, CustomInput, FormGroup, Label } from 'reactstrap';
import { parse } from "query-string"
import { AvForm, AvField, AvRadioGroup, AvRadio, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import CreateTable, { CellHeader } from '../../Systems/Table';
import { BoxMsg, Decrypt, DialogConfirm, Responsestart, Sweetalert } from '../../Systems/SystemComponent';
import axios from 'axios';
import { string } from '@amcharts/amcharts4/core';
import { AxiosGetJson } from '../../Service/Config/AxiosMethod';
import { Typeahead } from 'react-bootstrap-typeahead'
import { Feedback, Tune } from '@material-ui/icons';
const Controller = 'api/AdminUserPermission'


const User_Permission_edit = (props: any) => {
    const history = useHistory();
    const [rowSelected, setRowSelected] = useState([] as any);
    const [sPassword, setPassword] = useState("");
    const [sCFPassword, setCFPassword] = useState("");
    const [check, setcheck] = useState(false);
    const [oTM_Option_Sub, setTM_Option_Sub] = React.useState([] as any);
    const [opersonel_info, setopersonel_info] = React.useState([] as any);

    const [Selected_Code, setSelected_Code] = useState(-1);
    const [txtSearch, SetTxtSearch] = useState({
        sFullname: "",
        sIsActive: "",
    });
    const [oTb_user, setTb_user] = useState([] as any);

    const [lstData, setlstData] = useState([
        {
            value: "",
            label: "",
            Search: ""

        }
    ]);

    var { sEmployeeID, sMode } = parse(window.location.search);
    sEmployeeID = sEmployeeID && Decrypt(sEmployeeID)
    sMode = sMode && Decrypt(sMode)

    const [optState, setoptState] = useState([] as any);
    const [Active, setisActive] = useState(true);
    const [sSearchUserID, setSearchUserID] = useState("");
    const ColoredLine = (color) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 3,
                margin: '5% 0px 3%'
            }}
        />
    );



    React.useEffect(() => {

        GetDataOnPageLoad()
        GetTMOptionSub()
    }, []);


    const GetDataOnPageLoad = async () => {

        let result: any = await AxiosGetJson(Controller + "/User_Permission_edit?sEmployeeID=" + sEmployeeID);
        setTb_user(result);

    }
    const GetTMOptionSub = async () => {

        let result: any = await AxiosGetJson(Controller + "/GetTMOptionSub");
        setTM_Option_Sub(result);


    };

    const SetSearch = async (o:any) => {

 
        if (o == "3") {

            let result: any = await AxiosGetJson(Controller + "/SetSearch?SearchBy=" + o);
            setopersonel_info([]);
            setlstData([{ ...lstData, value: "0", label: "", Search: "0", }])
            setcheck(true)
            setoptState(result);

        } else if (o == "") {

            setlstData([{ ...lstData, value: "0", label: "", Search: "0", }])
            setcheck(true)
            setoptState([])
        } else {

            let result: any = await AxiosGetJson(Controller + "/SetSearch?SearchBy=" + o);
            setlstData([{ ...lstData, value: "0", label: "", Search: "0", }])
            setcheck(true)
            setoptState(result);
        }
  
    };



    const onSave = (values: any) => {


    };



    const onInvalidSubmit = (event, errors: [], values) => {
        if (errors.length == 0) {
            onSave(values);
        }
    };
    const getLinkTo_Edit = () => {
        let sTypeComponent = `/admin-user-permission-list`
        let sPath = `${sTypeComponent}`
        return history.push(sPath);
    }
    const defaultValues = {
        locationType: '0',
        select: '1',
        sEmployeecode: '',
        sFullName: '',
        sPosition: '',
        sAgencyname: '',
        sEmail: '',
        sPassword: '',
        radioIsActive: '0'
    };
    const ChangeRadio = (val) => {
        if (val.target != null) {
        }
    }
    const isNumberKey = (val) => {
        setSearchUserID(val.target.value);
    }




    




    const GetPersonelInfoByCode = async (Code: any) => {

        let result: any = await AxiosGetJson(Controller + "/GetPersonelInfoByCode?Code=" + Code);

        setopersonel_info(result);


    };
    const Editdata = (i: any) => {

        if (i.length > 0) {
            GetPersonelInfoByCode(i[0].value)
            setcheck(false)
        } else {
            setcheck(true)
        }

        setlstData(i)
    }


    console.log("lstData", lstData)
    return (

        <Fragment>
            <AvForm onSubmit={onInvalidSubmit} model={defaultValues}>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >สิทธิ์การใช้งาน <span className="text-danger">•</span></b>
                                <AvField
                                    type="select"
                                    name="select"
                                    value={oTb_user.nRoleID}
                                    errorMessage="โปรดระบุสิทธิ์การใช้งาน"
                                    validate={{
                                        required: { value: true },
                                    }}
                                    //onChange={e => { SetSearch(e.target.value) }}

                                    onChange={(e) => {
                                        SetSearch(e.target.value)
                                    }}



                                >

                                    <option value="">- สิทธิ์การใช้งาน -</option>
                                    {
                                        oTM_Option_Sub.map((p) => {
                                            return (
                                                <option value={p.nSubID} className="dropdown-item" >{p.sName}</option>
                                            )
                                        })
                                    }
                                </AvField>
                            </AvGroup>
                        </div>
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <b className="" >รหัสพนักงาน - ชื่อ-นามสกุล <span className="text-danger">•</span></b>
                            <div className="input-group">
                                
                                <Typeahead
                                    filterBy={['Search']}   //ให้ filter จากอะไร (อ้างอิงจาก optState โดยชื่อ field ต้องตรงกัน)
                                    id="Sert"
                                    options={optState} // optState คือ state ที่ใช้ในการเก็บค่า option autocomplete
                                    placeholder="ค้นหาด้วย รหัสพนักงาน,ชื่อ-นามสกุล"
                                    name="Sert"
                                    onChange={e => { Editdata(e) }} //event เมื่อเลือกค่าหรือกรอกค่าเสร็จแล้ว ส่วนใหญ่ใช้สำหรับ set state ของ valState
                                    minLength={0} // set ให้กรอกตัวอักษรกี่ตัวแล้วให้ autocomplete แสดง
                                    selected={lstData}
                                    //defaultSelected={optState.slice(0, 1)}
                                    //selected={lstData} // valState คือ state ที่ใช้ในการเก็บค่าที่เลือกหรือกรอกข้อมูล autocomplete
                                    //onSelected={e => { CheckValue() }} //event keyup ใน autocomplete ***optional
                                    errorMessage="โปรดระบุรหัสพนักงาน"
                                    //size="small" // small medium large *** อันนี้ไม่แน่ใจ
                                    //disabled={} // set enable/ disable ***default false                                                   
                                    isInvalid={check} // set valid/ invalid ***default true

                                > </Typeahead>
                                
                                <span className="input-group-text" id="basic-addon2"><i className="fas fa-search"></i></span>
                            </div>
                            {check ? <small className="text-danger">โปรดระบุรหัสพนักงาน-ชื่อ-นามสกุล</small> : null}
                            
                            
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >ชื่อ-นามสกุล </b>
                                <AvInput name="sFullName" id="sFullName" value={(opersonel_info.length ==0 ?
                                    ((oTb_user.sFirstName != null ? oTb_user.sFirstName : "") + " " + (oTb_user.sLastName != null ? oTb_user.sLastName : ""))
                                    : (opersonel_info.FNAME != null ? opersonel_info.FNAME : "") + " " + (opersonel_info.LNAME != null ? opersonel_info.LNAME : ""))         
                                    } required disabled />
                                <AvFeedback>โปรดระบบ ชื่อ-นามสกุล!</AvFeedback>
                            </AvGroup>
                        </div>
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >หน่วยงาน </b>
                                <AvInput name="sAgencyname" id="sAgencyname" value={oTb_user.sEmployeeID} required disabled />
                                <AvFeedback>โปรดระบบ หน่วยงาน!</AvFeedback>
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >ตำแหน่ง </b>
                                <AvInput name="sPosition" id="sPosition" value={oTb_user.sOrgName} required disabled />
                                <AvFeedback>โปรดระบบ ตำแหน่ง!</AvFeedback>
                            </AvGroup>
                        </div>
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >อีเมล </b>
                                <AvInput name="sEmail" id="sEmail" type="email" value={oTb_user.sEmail} placeholder="example@email.com" required disabled />
                                <AvFeedback>โปรดระบุ อีเมล</AvFeedback>
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >รหัสผู้อนุมัติ <span className="text-danger">•</span></b>
                                <div className="input-group">
                                    <AvInput name="sApprovercode" id="sApprovercodeID" required value={oTb_user.nMG_N1} />
                                    <div className="input-group-append">
                                        <span className="input-group-text" id="basic-addon2"><i className="fas fa-search"></i></span>
                                    </div>
                                </div>
                                <AvFeedback>โปรดระบบ รหัสผู้อนุมัติ!</AvFeedback>
                            </AvGroup>
                        </div>
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b className="form-check-b" >ชื่อ-นามสกุล ผู้อนุมัติ </b>
                                <AvInput name="spersonwhoapproved" id="spersonwhoapproved" required disabled />
                                <AvFeedback>โปรดระบุ ชื่อ-นามสกุล ผู้อนุมัติ!</AvFeedback>
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 col-xl-6">
                            <AvGroup>
                                <b>สถานะ</b>
                                <AvRadioGroup inline name="radioIsActive" required>
                                    <AvRadio label="ใช้งาน" value="0" />
                                    <AvRadio label="ไม่ใช้งาน" value="1" />
                                </AvRadioGroup>
                            </AvGroup>
                        </div>
                    </div>
                </div>
                <ColoredLine color="#2196f3" />
                <div className="form-row justify-content-between">
                    <div className="form-row justify-content-start">
                        <div className="col-auto">
                            <div className="form-group">
                                <button type="button" className="btn btn-secondary" onClick={() => getLinkTo_Edit()}>
                                    <i className="fas fa-arrow-left"></i> กลับ</button>
                            </div>
                        </div>
                    </div>
                    <div className="form-row justify-content-end">
                        <div className="col-auto">
                            <div className="form-group">
                                <FormGroup>
                                    <Button className="btn btn-primary"><i className="fas fa-save"></i> บันทึก</Button>
                                </FormGroup>

                                <Link id={"LinkBackToList"} to="" hidden ></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </AvForm>
        </Fragment >
    );
};
export default User_Permission_edit;

