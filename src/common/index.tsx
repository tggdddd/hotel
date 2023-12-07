import {getState} from "@/state/state";
import {buildKey, StateEnum} from "@/state/stateEnum";
import {getUser} from "@/state/userState";
import {NavigateOptions, To, useLocation, useNavigate} from "react-router-dom";

export interface AppLoaderParamsInterface {
    redirect: string | undefined,
    isLogin: boolean,
    user: Object | undefined | null,
    showMenu: boolean,
    path: string
}


export function useRouteStatus() {
    const reactLocation = useLocation();
    const navigate = useNavigate();
    // const [status, setStatus] = useState<AppLoaderParamsInterface>(new AppLoaderParams(reactLocation.pathname))
    // useEffect(() => {
    //     console.log("当前Effect")
    //     if (status.path !== reactLocation.pathname){
    //         console.log("修改状态")
    //         setStatus(new AppLoaderParams(reactLocation.pathname))
    //     }
    // }, [status.path,reactLocation.pathname]);

    class AppLoaderParams implements AppLoaderParamsInterface {
        constructor(public path = "/") {
        }

        //跳转页面
        get redirect() {
            // 访问重定向首页
            if (this.path === '/') {
                return "/home"
            }
            if (!this.isLogin && this.auth) {
                return "/login"
            }
        }

        //  是否显示菜单
        get showMenu() {
            return getState(buildKey(StateEnum.SHOW_MENU, this.path)) === true
        }

        //是否已登录
        get isLogin() {
            return this.user != null;
        }

        // 是否需要登录
        get auth() {
            console.log(buildKey(StateEnum.SHOULD_LOGIN, this.path), this.path, getState(buildKey(StateEnum.SHOULD_LOGIN, this.path)))
            return getState(buildKey(StateEnum.SHOULD_LOGIN, this.path)) === true
        }

        // 登录账号信息
        get user() {
            return getUser() || {}
        }

        navigate(to: To, options?: NavigateOptions | undefined) {
            navigate(to, options)
        }

        back() {
            navigate(-1)
        }

        backTo(value: number) {
            navigate(value)
        }
    }

    return new AppLoaderParams(reactLocation.pathname);
}