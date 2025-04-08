import {BrowserRouter, Route, Routes} from "react-router";
import {Layout} from "./layout/layout.tsx";
import {lazy, Suspense} from "react";

const ActorPage = lazy(() => import('./pages/actor-page/actor-page.tsx'));
const MainPage = lazy(() => import('./pages/main-page/main-page.tsx'));

export const AppRouter = () => (
    <BrowserRouter>
        <Suspense fallback={<div>Загрузка страницы...</div>}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path={'/'} element={<MainPage />} />
                    <Route path={'/actor/:id'} element={<ActorPage />} />
                </Route>
            </Routes>
        </Suspense>
    </BrowserRouter>
);
