import {Header} from "./components/header/header.tsx";
import {Outlet} from "react-router";
import s from './layout.module.scss';
import {useAppSelector} from "../redux/store.ts";
import {Loader} from "../components";

export const Layout = () => {
    const showLoader = useAppSelector(state => state.actors.showLoader);

    return (
        <div className={s.layout_container}>
            {showLoader && <Loader/>}
            <Header/>
            <Outlet/>
        </div>
    );
};
