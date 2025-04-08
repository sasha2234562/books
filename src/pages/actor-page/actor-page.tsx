import {useAppSelector} from "../../redux/store.ts";
import {useNavigate} from "react-router";
import s from './actor-page.module.scss'

const ActorPage = () => {
    const selectActor = useAppSelector(state => state.actors.selectedActor);
    const navigate = useNavigate();

    console.log(selectActor)

    if (!selectActor) {
        navigate(-1);
        return null;
    }

    return (
        <main className={s.actor_page_container}>
            <div className={s.actor_section_info}>
                <img src={selectActor.photo} alt={`photo ${selectActor.name}`} className={s.actor_photo} />
                <h2 className={s.actor_name}>{selectActor.name}</h2>
            </div>
            <div className={s.actor_section_info}>
                <div>
                    <span className={s.contact_info}>{selectActor.address.city}, {selectActor.address.street}</span>
                </div>
                <div>
                    <a href={'#'} className={s.contact_info}>{selectActor.email}</a>
                </div>
                <div>
                    <a href={'#'} className={s.contact_info}>{selectActor.website}</a>
                </div>
                <div>
                    <span className={s.contact_info}>{selectActor.company.name}, {selectActor.company.catchPhrase}</span>
                </div>
            </div>
        </main>
    );
};
export default ActorPage;
