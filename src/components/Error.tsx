import {useNavigate, useRouteError} from "react-router-dom";

export default function ({message}: any) {
    const navigate = useNavigate();
    const routeError = useRouteError() as Error;

    function back() {
        navigate(-1)
    }

    return (
        <>
            <h1>500</h1>
            <h2>{routeError.message}</h2>
            <div onClick={back}>点击返回</div>
        </>
    )
}