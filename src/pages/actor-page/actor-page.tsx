import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import s from './actor-page.module.scss';
import {useEffect} from "react";
import {useParams} from "react-router";
import {getSingleUsers} from "../../redux/thunks/get-single-user.ts";

const ActorPage = () => {
    const dispatch = useAppDispatch();
    const selectActor = useAppSelector(state => state.actors.singleActor);
    const location = useParams();

    useEffect(() => {
        if (location.id) {
            dispatch(getSingleUsers(+location.id));
        }
    }, [location.id]);

    // If selectActor is not loaded
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
