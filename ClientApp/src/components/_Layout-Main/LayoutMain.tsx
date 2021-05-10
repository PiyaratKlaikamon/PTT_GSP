import * as React from 'react';
import './LayoutMain.css';
import NavBar from './LayoutMain_Menu';
import ILayoutMain from './interface';
import AuthenService from '../Service/AuthenService';
import { Sweetalert, BoxMsg } from "../Systems/SystemComponent";
import { Link } from 'react-router-dom';

export default class LayoutMain extends React.PureComponent<any, { scrollY: number, U_Name: string, U_Position, U_RoleID: number }> {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: 0,
            U_Name: "",
            U_Position: "",
            U_RoleID: 0
        };
    }

    private MenuID_Selected: Number = parseInt(this.props.MenuID_Selected) || 0;

    private arrMenu: Array<ILayoutMain.Menu> = [
        { label: "หน้าหลัก", to: "home", active: this.MenuID_Selected === 1 },
        { label: "บัญชีรายการวัสดุ", to: undefined, active: this.MenuID_Selected === 2 },
        { label: "วัสดุแนะนำสำหรับลักษณะงาน", to: undefined, active: this.MenuID_Selected === 3 },
        { label: "แบบคำขอเบิกวัสดุ", to: "request-form", active: this.MenuID_Selected === 4 },
        { label: "รายการเบิกวัสดุ", to: "request-list", active: this.MenuID_Selected === 5 },
        { label: "รายการรออนุมัติ", to: "request-approval", active: this.MenuID_Selected === 6 }
    ];

    private Element = {
        BODY: document.getElementsByTagName("body")[0],
        BODY_AddClass: (sClass: string) => { this.Element.BODY.classList.add(sClass); },
        BODY_RemoveClass: (sClass: string) => { this.Element.BODY.classList.remove(sClass); }
    };

    RedirectToLogin() {
        let e_lnkLogin = document.getElementById("lnkLogin");
        if (e_lnkLogin) e_lnkLogin.click();
    }

    UserInfo_SetState = async () => {
        try {
            let r: any = await AuthenService.UserInfo();
            if (r.data) {
                this.setState({
                    U_Name: r.data.sName,
                    U_Position: r.data.sPosition,
                    U_RoleID: r.data.nRoleID
                });
            }
            else Sweetalert.Error(BoxMsg.Title_Warning, BoxMsg.Desc_Warning_SessionExpire, this.RedirectToLogin);
        }
        catch { Sweetalert.Error(BoxMsg.Title_Warning, BoxMsg.Desc_Warning_SessionExpire, this.RedirectToLogin); }
    };

    componentDidMount() {
        this.UserInfo_SetState();
        window.onscroll = () => { this.setState({ scrollY: window.scrollY }) }
    }

    render() {
        return (
            <div id="PAGE_MAIN">
                <div id="SITE_CONTENT">
                    <div id="HEAD" style={this.state.scrollY > 35 ? { backgroundColor: "rgba(17,32,94,0.9)" } : undefined}>
                        <div className="head-content">
                            <a href="" className="head-logo">
                                <div className="logo-icon">
                                    <img src={require('../../Images/ico-ptt-white.png')} />
                                </div>
                                <div className="logo-name">
                                    <b>ระบบเบิก-จ่าย</b>
                                    <div>วัสดุสิ้นเปลือง</div>
                                </div>
                            </a>
                            <div className="head-menu">
                                <NavBar id="navTOP" source={this.arrMenu} />
                                {/* <a id="NAVBAR_TRIGGER" onClick={this.NAVBAR_Expand}><i className="fa fa-bars"></i></a> */}
                            </div>
                            <div className="head-userinfo">
                                <div className="u-box">
                                    <div className="u-icon">
                                        <img src={require('../../Images/ico-user.png')} />
                                    </div>
                                    <div className="u-content">
                                        <div className="u-title">{this.state.U_Name}</div>
                                        <div className="u-desc">{this.state.U_Position}</div>
                                    </div>
                                    <div className="pl-1 pr-1">
                                        <i className="fa fa-chevron-circle-down"></i>
                                    </div>
                                </div>
                                <ul className="u-tools">
                                    <li>
                                        <a href={undefined} className="btn btn-block btn-sm btn-light rounded-pill">
                                            <i className="fa fa-history"></i> ประวัติการเบิก
                                        </a>
                                    </li>
                                    {
                                        this.props.U_RoleID == 1 || this.props.U_RoleID == 2
                                            ? <li>
                                                <a href="admin-pendingapproval" className="btn btn-block btn-sm btn-info rounded-pill">
                                                    <i className="fa fa-cog"></i> ผู้ดูแลระบบ
                                                </a>
                                            </li>
                                            : null
                                    }
                                    <li>
                                        <a href="/login" className="btn btn-block btn-sm btn-danger rounded-pill">
                                            <i className="fa fa-sign-out"></i> ออกจากระบบ
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id="BODY" style={this.props.BODY_style}>{this.props.children}</div>
                    <div id="FOOT">
                        <div className="footer-row">
                            <div className="footer-cell">
                                <img src={require('../../Images/ico-ptt-white.png')} height={20} />
                            </div>
                            <div className="footer-cell">
                                <b>บริษัท ปตท. จำกัด (มหาชน)</b>
                                <div>555 ถนนสุขุมวิท ต.มาบตาพุด อ.เมืองฯ จ.ระยอง 21150</div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link id="lnkLogin" to="/login" hidden={true}></Link>
            </div>);
    }
}