import React, { Fragment } from "react";
import "./style.css"
import { useHistory } from "react-router";
import AuthenService from "../Service/AuthenService";
import { AuthToken } from "../Service/Config/AuthToken";
import { Sweetalert, BoxMsg } from "../Systems/SystemComponent";

const Login = () => {
    const history = useHistory();
    const [st_CapsLock, setActiveCapsLock] = React.useState<Boolean>();

    const Input_GetValue = (_inputID: string) => {
        var _val: string | undefined;
        var _input = document.getElementById(_inputID) as HTMLInputElement | null;
        if (_input) _val = _input.value || "";
        return _val;
    };

    const Login_Action = async (_Username: string, _Password: string) => {
        let obj = { sUsername: _Username, sPassword: _Password };
        const response = await AuthenService.SignIn(obj);
        const token = response.data.token;
        if (token) {
            AuthToken.set(token);
            history.push("/home");
        }
        else {
            Sweetalert.Warning(BoxMsg.Title_Warning, response.data.message, null);
            await AuthenService.SignOut()
        };
    };
    const formLogin_onSubmit = () => {
        var _Username = Input_GetValue("txtUsername");
        var _Password = Input_GetValue("txtPassword");
        if (_Username && _Password) Login_Action(_Username, _Password);
        else Sweetalert.Warning(BoxMsg.Title_Warning, "โปรดระบุชื่อผู้ใช้งานและรหัสผ่าน", null);
    };
    const txtUsername_onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.which === 13 && e.currentTarget.value) {
            var e_txtPassword = document.getElementById("txtPassword");
            if (e_txtPassword) e_txtPassword.focus();
            return false;
        }
        else if (e.which === 220) return false;
    };
    const txtPassword_onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.which === 13) {
            formLogin_onSubmit();
            return false;
        }
        else if (e.which === 220) return false;
    };



    React.useEffect(() => {
        document.addEventListener("mouseenter", (e: MouseEvent) => { try { setActiveCapsLock(e.getModifierState("CapsLock")) } catch { } });
        document.addEventListener("click", (e: MouseEvent) => { try { setActiveCapsLock(e.getModifierState("CapsLock")) } catch { } });
        document.addEventListener("keyup", (e: KeyboardEvent) => { try { setActiveCapsLock(e.getModifierState("CapsLock")) } catch { } });
    }, [])

    return (
        <div id="LOGIN">
            <form className="box-login">
                <img src={require("../../Images/ico-ptt-white.png")} className="mb-1" style={{ marginLeft: -10 }} />
                <div className="box-title title-2">ระบบเบิก-จ่าย</div>
                <div className="box-title title-1">วัสดุสิ้นเปลืองและวัสดุสำนักงาน</div>

                <div className="form-group mt-4">
                    <div className="login-input">
                        <img src={require("./assets/ico-engineer.png")} />
                        <input id="txtUsername" type="text" placeholder="ชื่อผู้ใช้งาน" onKeyPress={txtUsername_onKeyPress} autoComplete="off" />
                    </div>
                </div>
                <div className="form-group mb-4">
                    <div className="login-input">
                        <img src={require("./assets/ico-warning.png")} />
                        <input id="txtPassword" type="password" placeholder="รหัสผ่าน" onKeyPress={txtPassword_onKeyPress} autoComplete="off" />
                    </div>
                </div>
                <div className="form-row align-items-center">
                    <div className="col-auto mr-auto pl-3">
                        {st_CapsLock
                            ? <Fragment>
                                <span className="badge badge-pill badge-danger"><i className="fa fa-exclamation"></i></span> Caps Lock ถูกเปิดใช้งานอยู่
                            </Fragment>
                            : null}
                    </div>
                    <div className="col-auto ml-auto">
                        <button id="btnLogin" type="button" className="btn btn-info"
                            onClick={formLogin_onSubmit}>เข้าสู่ระบบ <i className="fa fa-arrow-right"></i></button>
                    </div>
                </div>
            </form>
            <div className="box-overview"></div>
        </div>);
}
export default Login;