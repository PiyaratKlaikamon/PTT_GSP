import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import { useHistory } from "react-router";
import { Button, Input } from 'reactstrap';
import { AxiosGetJson } from '../Service/Config/AxiosMethod';
import ThaiDatePicker from '../ST_Handlers/ThaiDatePicker';
import { Encrypt, TooltipsMSG } from '../Systems/SystemComponent';
import CreateTable, { CellHeader } from '../Systems/Table';
import { AvInput } from 'availity-reactstrap-validation';
const Controller = 'api/AdminRequestToImproveStock'


const Request_to_ImproveStock = () => {
    const history = useHistory();

    const [oV_Stock_Update, setV_Stock_Update] = useState([] as any);
    const [oTM_Step_Stock_Update, setTM_Step_Stock_Update] = useState([] as any);




    React.useEffect(() => {

        GetDataOnPageLoad()
        GetStep()

        

    }, []);

    const GetDataOnPageLoad = async () => {

        let result: any = await AxiosGetJson(Controller + "/Request_to_ImproveStock");
        setV_Stock_Update(result);
    }

    const GetStep = async () => {

        let result: any = await AxiosGetJson(Controller + "/GetStep");
        setTM_Step_Stock_Update(result);
    }

    const [txtSearch, SetTxtSearch] = useState({
        stxtSearch: "",
        sStepID: "",
        dStartDate: undefined as (Date | undefined),
        dEndDate: undefined as (Date | undefined),
    });

    //const { stxtSearch, sStepID, dStartDate, dEndDate } = txtSearch;

    const SearchData = async () => {
        let sStartDate = txtSearch.dStartDate == undefined ? "" : DateFormat(txtSearch.dStartDate);
        let sEndDate = txtSearch.dEndDate == undefined ? "" : DateFormat(txtSearch.dEndDate);


        let result: any = await AxiosGetJson(Controller + "/Request_to_ImproveStock_SearchData?sRequestNo=" + txtSearch.stxtSearch + "&sStepID=" + txtSearch.sStepID + "&sStartDate=" + sStartDate + "&sEndDate=" + sEndDate);
        setV_Stock_Update(result);

    };


    const header: CellHeader[] = [
        {
            Sortby: "",
            SortType: Number,
            label: "ที่",
            ClassName: "align-middle text-center text-nowrap",
            CSSStyle: { width: 70 },
        },
        {
            label: "เลขที่ใบขอปรับปรุง",
            Sortby: "sRequestNo",
            ClassName: "align-middle text-center",
            SortType: String,
        },
        {
            label: "เหตุผลที่ขอปรับปรุง",
            Sortby: "sReason",
            ClassName: "text-left",
            SortType: String,
        },
        {
            label: "ผู้สร้างรายการ",
            Sortby: "",
            ClassName: "align-middle",
            SortType: String,
        },
        {
            label: "วันที่ปรับปรุง",
            Sortby: "sUpdate",
            ClassName: "align-middle text-center",
            SortType: String,
        },

        {
            label: "สถานะ",
            Sortby: "sStep",
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
                        history.push("/admin-Request-to-ImproveStock-Edit");
                    }}
                >
                    <FontAwesomeIcon icon={["fas", "plus"]} />
                </Button>
            ),
            ClassName: "align-middle text-center",
            CSSStyle: { width: 1 },
        },
    ];

    const getLinkTo_Edit = (nRequestID: number) => {

        let sMode = Encrypt("Edit")
        let sRequestID = Encrypt(nRequestID)
        let sTypeComponent = `/admin-Request-to-ImproveStock-Edit`

        let sPath = `${sTypeComponent}?sMode=${sMode}&&sRequestID=${sRequestID}`
        return history.push(sPath);
    };
    const CreateData = (o: any, i: any) => {
        return (
            <tr key={i}>
                <td className="align-middle text-center">{i + 1 + "."}</td>
                <td className="align-middle text-center">{o.sRequestNo}</td>
                <td className="align-middle">{o.sReason}</td>
                <td className="align-middle">{o.nCreateBy}</td>
                <td className="align-middle text-center">{o.sUpdate}</td>
                <td className="align-middle text-center">{o.sStep}</td>

                <td className="align-middle text-center">
                    <Button size="sm" type="button" color="info" onClick={() => { getLinkTo_Edit(o.nRequestID) }}>
                        <FontAwesomeIcon icon={["fas", "pencil-alt"]} />
                    </Button>
                </td>
            </tr>
        );
    };






    const DateFormat = (today: any) => {
        let day = today.getDate() < 10 ? ("0" + today.getDate().toString()) : today.getDate().toString();
        let month = (today.getMonth() + 1) < 10 ? ("0" + (today.getMonth() + 1).toString()) : (today.getMonth() + 1).toString();
        let date = today.getFullYear() + "/"+ month + "/" + day ;

        return date;
    }

    return (
        <Fragment>
            <div className="form-row justify-content-end">
                <div className="col-auto">
                    <div className="form-group">
                        <input
                            className="form-control form-control-sm"
                            placeholder="เลขที่ใบขอปรับปรุง"
                            type="text"
                            onChange={(e) => {
                                SetTxtSearch({
                                    ...txtSearch,
                                    stxtSearch: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="col-auto">
                    <div className="form-group">



                        <ThaiDatePicker
                            value={txtSearch.dStartDate}
                            small={true}
                            placeholder="วันที่เริ่มต้น"
                            onChange={(value) => {
                                SetTxtSearch({
                                    ...txtSearch,
                                    dStartDate: value,
                                });

                            }} />

                    </div>
                </div>
                <div className="col-auto">
                    <div className="form-group">


                        <ThaiDatePicker
                            value={txtSearch.dEndDate}
                            small={true}
                            placeholder="วันที่สิ้นสุด"
                            onChange={(value) => {
                                SetTxtSearch({
                                    ...txtSearch,
                                    dEndDate: value,
                                });
                            }} />


                    </div>
                </div>
                <div className="col-auto">
                    <div className="form-group">
                        <select
                            className="form-control form-control-sm"
                            onChange={(e) => {
                                SetTxtSearch({
                                    ...txtSearch,
                                    sStepID: e.target.value,
                                });
                            }}
                        >
                            <option value="">- สถานะ -</option>
                            {
                                oTM_Step_Stock_Update.map((p) => {
                                    return (
                                        <option value={p.nStepID} className="dropdown-item" >{p.sName}</option>
                                    )
                                })
                            }
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
                    ItemData={oV_Stock_Update}
                    CreateDataRow={CreateData}
                    IsHasBtnDEL={false}
                />
            </div>
        </Fragment>
    );
};
export default Request_to_ImproveStock;
