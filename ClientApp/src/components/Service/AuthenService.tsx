import { AuthToken } from "./Config/AuthToken";
import { AxiosPostJson } from "./Config/AxiosMethod";
import { getHistory } from "../../App";
export default class AuthenService {
    static SignIn(props: any) { return AxiosPostJson('api/User/SignIn', props); }
    static async SignOut() {
        await AuthToken.set(null);
        getHistory().push("/");
    }

    static UserInfo() { return AxiosPostJson('api/User/UserInfo'); }
}