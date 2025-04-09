import {BrowserRouter, Route, Routes} from "react-router";
import {Layout} from "./layout/layout.tsx";
import {lazy, Suspense} from "react";
import {Loader} from "./components";
import {ACTOR_PAGE, MAIN} from "./shared/path.ts";

const ActorPage = lazy(() => import('./pages/actor-page/actor-page.tsx'));
const MainPage = lazy(() => import('./pages/main-page/main-page.tsx'));

export const AppRouter = () => (

    <BrowserRouter>
        <Suspense fallback={<Loader/>}>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path={MAIN} element={<MainPage/>}/>
                    <Route path={ACTOR_PAGE} element={<ActorPage/>}/>
                </Route>
            </Routes>
        </Suspense>
    </BrowserRouter>
);
