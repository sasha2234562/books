import {FC, memo} from 'react';
import {Actor} from "../../redux/slices/actors-slice.ts";
import s from './card-actor.module.scss';
import {Link} from "react-router";

interface Props {
    actor: Actor;
}

export const CardActor: FC<Props> = memo(({actor}) => {

    return (
        <div className={s.actor_card_container}>
            <Link to={`/actor/${actor.id}`}>
                <img src={actor.photo} alt="actor photo" className={s.actor_photo} loading={'lazy'}/>
            </Link>
            <h2 className={s.actor_name}>{actor.name}</h2>
        </div>
    );
});
