import {useCallback, useEffect, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {getUsers} from "../../redux/thunks/get-users.ts";
import {CardActor} from "../../components/card-actor/card-actor.tsx";
import s from './main-page.module.scss';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "../../components/input/input.tsx";
import {Actor} from "../../redux/slices/actors-slice.ts";
import {Select} from "../../components/select/select.tsx";

const schema = z.object({
    search: z.string(),
    sort: z.string(),
});

type UserSchema = z.infer<typeof schema>;

const sortOptions = ['по возрастанию', 'по убыванию']

function debounce<T extends (...args: any[]) => any>(func: T, delay: number) {
    let timer: number;
    return function (...args: Parameters<T>) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

const MainPage = () => {
    const dispatch = useAppDispatch();
    const actors = useAppSelector(state => state.actors.actors);
    const {watch, register, setValue} = useForm<UserSchema>({
        defaultValues: {
            search: '',
            sort: '',
        },
        resolver: zodResolver(schema)
    });
    const search = watch('search');
    const sort = watch('sort')

    const [filteredActors, setFilteredActors] = useState<Actor[]>(actors);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    useEffect(() => {
        console.log(111)
        debouncedFilterAndSortActors(search, sort)
    }, [search, sort, actors]);

    const filterAndSortActors = useCallback((searchValue: string, sortValue: string) => {
        const filtered = actors.filter(item => item.name.toLowerCase().startsWith(searchValue.toLowerCase()))
            .sort((a, b) => sortValue === sortOptions[1] ?  b.age - a.age : a.age - b.age);
        setFilteredActors(filtered);
    }, [actors]);

    const debouncedFilterAndSortActors = useMemo(() => {
        return debounce(filterAndSortActors, 300)
    }, [filterAndSortActors]);

    return (
        <main className={s.main_container}>
            <form className={s.form_container}>
                <Input {...register("search")} />
                <Select
                    options={sortOptions}
                    onClickSelect={(value) => setValue('sort', value)}
                    value={watch('sort')}
                    defaultValue={sortOptions[0]}
                />
            </form>
            <section className={s.cards_section}>
                {filteredActors.map((actor) => (
                    <CardActor key={actor.id} actor={actor}/>
                ))}
            </section>
        </main>
    );
};

export default MainPage;
