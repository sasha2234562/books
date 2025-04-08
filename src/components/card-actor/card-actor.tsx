import {FC, memo} from 'react';
import {Actor, setSelectActor} from "../../redux/slices/actors-slice.ts";
import s from './card-actor.module.scss';
import {Link} from "react-router";
import {useAppDispatch} from "../../redux/store.ts";

interface Props{
    actor: Actor;
}

export const CardActor:FC<Props> = memo(({actor}) => {
    const dispatch = useAppDispatch();

    const onClickSelectActor = ()=> dispatch(setSelectActor(actor))
    return (
        <div className={s.actor_card_container}>
            <Link to={`/actor/${actor.id}`} onClick={onClickSelectActor}>
                <img src={actor.photo} alt="actor photo" className={s.actor_photo} loading={'lazy'}/>
            </Link>
            <h2 className={s.actor_name}>{actor.name}</h2>
        </div>
    );
});
