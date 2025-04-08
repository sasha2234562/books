import {createRoot} from 'react-dom/client'
import './index.scss'
import {AppRouter} from "./app-router.tsx";
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)
