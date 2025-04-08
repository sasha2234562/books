import {Header} from "./components/header/header.tsx";
import {Outlet} from "react-router";
import s from './layout.module.scss';

export const Layout = () => {
    return (
        <div className={s.layout_container}>
            <Header/>
            <Outlet/>
        </div>
    );
};
