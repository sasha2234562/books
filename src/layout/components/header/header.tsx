import s from './header.module.scss'
import logo from '../../../assets/logo.svg'
import {Link} from "react-router";

export const Header = () => {
    return (
        <div className={s.container_header}>
            <div>
                <img src={logo} className={s.logo} alt="логотип"/>
            </div>
            <h2 className={s.title_header}>В нашем приложении вы можете найти информацию о любом актёре Голливуда</h2>
            <Link to={'/'}><span className={s.link}>На главную</span></Link>
        </div>
    );
};
