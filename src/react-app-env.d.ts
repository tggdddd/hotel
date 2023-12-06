/// <reference types="react-scripts" />


declare var process: {
    env: {
        REACT_APP_API_URL: string;
    };
};
declare type RouteObject = {
    auth: boolean
}