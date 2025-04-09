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

const sortOptions = ['по возрастанию', 'по убыванию'];

function debounce<T extends (...args: never[]) => void>(func: T, delay: number) {
    // Variable to hold the timeout ID for debounce
    let timer: number;
    return (...args: Parameters<T>): void => {
        // Clear the existing timeout
        clearTimeout(timer);
        timer = setTimeout(() => {
            // Call the original function with the provided arguments
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
    const sort = watch('sort');
    const [filteredActors, setFilteredActors] = useState<Actor[]>(actors);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const filterAndSortActors = useCallback((searchValue: string, sortValue: string): void => {
        const filtered = actors.filter(item => item.name.toLowerCase().startsWith(searchValue.toLowerCase()));

        // Sort only if sort option is selected
        if (sortValue) {
            filtered.sort((a, b) => sortValue === sortOptions[1] ? b.age - a.age : a.age - b.age);
        }

        setFilteredActors(filtered);
    }, [actors]);

    const debouncedFilterAndSortActors = useMemo(() => debounce(filterAndSortActors, 300), [filterAndSortActors]);

    useEffect(() => {
        debouncedFilterAndSortActors(search, sort);
    }, [search, sort, debouncedFilterAndSortActors]);

    return (
        <main className={s.main_container}>
            <form className={s.form_container}>
                <Input {...register("search")} placeholder={'Поиск'}/>
                <Select
                    options={sortOptions}
                    onClickSelect={(value) => setValue('sort', value)}
                    value={watch('sort')}
                    placeholder={'Сортировка по возрасту'}
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
