import React from 'react';
import ReactDOM from 'react-dom/client';
import RouteViewProvider from "@/router/index"

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouteViewProvider/>
    </React.StrictMode>
);