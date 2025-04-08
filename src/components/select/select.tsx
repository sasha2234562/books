import {FC, memo, useEffect, useRef, useState} from "react";
import s from './select.module.scss'

interface Props {
    options: string[];
    value: string;
    onClickSelect: (value: string) => void;
    defaultValue: string;
}

export const Select: FC<Props> = memo(({options, value, onClickSelect, defaultValue}) => {
    const [openSelectOptions, setOpenSelectOptions] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
                setOpenSelectOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const onClickOptions = () => {
        setOpenSelectOptions(true);
    };

    const onClickSelectHandler = (value: string) => {
        onClickSelect(value);
        setOpenSelectOptions(false);
    }

    return (
        <div className={s.container} ref={elementRef}>
            <div className={openSelectOptions ? s.select_open : s.select}>
                <p className={value === '' ? s.select_value_default : s.select_value}
                   onClick={onClickOptions}>{value || defaultValue}</p>
                {openSelectOptions && <div className={s.options_container}>
                    <ul className={s.options_wrapper}>
                        {options.map(item => {
                            return (
                                <li key={item} className={s.option}
                                    onClick={() => onClickSelectHandler(item)}>{item}</li>);
                        })}
                    </ul>
                </div>}
            </div>
        </div>
    );
});
