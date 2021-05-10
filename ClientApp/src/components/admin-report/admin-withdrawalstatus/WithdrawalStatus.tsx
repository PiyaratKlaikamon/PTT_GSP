import React, { Fragment, useState } from "react";
import { AxiosGetJson } from "../../Service/Config/AxiosMethod";
import CreateTable, { CellHeader } from "../../Systems/Table";
const Controller = 'api/WithdrawalStatus'
const WithdrawalStatus = () => {

    const [oV_Withdrawal_Status, setoV_Withdrawal_Status] = useState([] as any);
    const [oStepID, setoStepID] = useState([] as any);


    React.useEffect(() => {

        GetDataOnPageLoad()
    }, []);

    const GetDataOnPageLoad = async () => {

        let result: any = await AxiosGetJson(Controller + "/GetV_Withdrawal_Status");
        //setoV_Withdrawal_Status(result);
        setoStepID(result);
    }

    const SearchData = async () => {


        let result: any = await AxiosGetJson(Controller + "/GetV_Withdrawal_Status_SearchData?sStepID=" + sStepID + "&sStartDate=" + sStartDate + "&sEndDate=" + sEndDate);
        setoV_Withdrawal_Status(result);

    };

    const [txtSearch, SetTxtSearch] = React.useState({
        stxtSearch: "",
        sStepID: "",
        sStartDate: "",
        sEndDate: "",
    });
    const { stxtSearch, sStepID, sStartDate, sEndDate } = txtSearch;

    const header: CellHeader[] = [
        {
            Sortby: "",
            SortType: Number,
            label: "ที่",
            ClassName: "align-middle text-center text-nowrap",
            CSSStyle: { width: 70 },
        },
        {
            label: "สถานะ",
            Sortby: "",
            ClassName: "align-middle",
            SortType: Number,
        },
        {
            label: "จำนวน",
            Sortby: "",
            ClassName: "align-middle",
            SortType: Number,
            CSSStyle: { width: 170 },
        },
    ];

    const CreateData = (o: any, i: any) => {
        return (
            <tr key={i}>
                <td className="align-middle text-center">{i + 1 + "."}</td>
                <td className="align-middle">{o.sName}</td>
                <td className="align-middle text-center">{o.nCountRequestID}</td>
            </tr>
        );
    };

    return (
        <Fragment>
            <div className="row">
                <div className="col-md-3">
                    <div className="form-group">
                        <b>วันที่เริ่มต้น</b>
                        <input
                            type="date"
                            className="form-control "

                            onChange={(e) => {
                                SetTxtSearch({
                                    ...txtSearch,
                                    sStartDate: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <b>วันที่สิ้นสุด</b>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="วันที่สิ้นสุด"
                            onChange={(e) => {
                                SetTxtSearch({
                                    ...txtSearch,
                                    sEndDate: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <b>สถานะ</b>
                        <select
                            className="form-control"
                            onChange={(e) => {
                                SetTxtSearch({
                                    ...txtSearch,
                                    sStepID: e.target.value,
                                });
                            }}
                        >
                            <option value="">- สถานะ -</option>
                            {
                                oStepID.map((p) => {
                                    return (
                                        <option value={p.nStepID} className="dropdown-item" >{p.sName}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-row justify-content-center">
                <div className="col-auto">
                    <div className="form-group">
                        <button type="button" className="btn btn-dark" onClick={() => SearchData()}>
                            <i className="fas fa-search"></i> ค้นหา
            </button>
                    </div>
                </div>
            </div>
            <div className="row mt-1">
                <CreateTable
                    Header={header}
                    ItemData={oV_Withdrawal_Status}
                    CreateDataRow={CreateData}
                    IsHasBtnDEL={false}
                />
            </div>



        </Fragment>
    );
};
export default WithdrawalStatus;
