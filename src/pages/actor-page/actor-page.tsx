import {useEffect} from "react";
import {useAppSelector} from "../../redux/store.ts";
import {useNavigate} from "react-router";
import s from './actor-page.module.scss';

const ActorPage = () => {
    const selectActor = useAppSelector(state => state.actors.selectedActor);
    const navigate = useNavigate();

    useEffect(() => {
        // Navigate back if selectActor is null
        if (!selectActor) {
            navigate(-1);
        }
    }, [selectActor, navigate]);

    // If selectActor is not loaded yet, return null to render nothing
    if (!selectActor) {
        return null;
    }

    return (
        <main className={s.actor_page_container}>
            <div className={s.actor_section_info}>
                <img src={selectActor.photo} alt={`photo ${selectActor.name}`} className={s.actor_photo}/>
                <h2 className={s.actor_name}>{selectActor.name}</h2>
            </div>
            <div className={s.actor_section_contact}>
                <span className={s.contact}>{selectActor.address.city}, {selectActor.address.street}</span>
                <a href={'#'} className={s.contact_link}>{selectActor.email}</a>
                <a href={'#'} className={s.contact_link}>{selectActor.website}</a>
                <span
                    className={s.contact_info}>{selectActor.company.name}, {selectActor.company.catchPhrase}</span>
            </div>
        </main>
    );
};

export default ActorPage;
