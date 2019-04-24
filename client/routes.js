import CateLog from './pages/index.jsx';
import CodeSpliting from "./pages/code-spliting.jsx";
import Todo from "./pages/todo.jsx";
import AsyncCancel from './pages/async-cancel.jsx';
import WaterFall from './pages/water-fall.jsx';
import WaterMark from './pages/water-mark.jsx';
import ConcurrentRequest from './pages/concurrent-request.jsx';
import NotFound from './pages/not-found.jsx';
import TransitionCompo from "./pages/transition-compo/transition-compo.jsx";

export default [
    {id: 'catelog', path: '/', component: CateLog, exact: true},
    {id: 'code-spliting', path: '/code-spliting', component: CodeSpliting},
    {id: 'todo', path: '/todo', component: Todo},
    {id: 'async-cancel', path: '/async-cancel', component: AsyncCancel},
    {id: 'water-fall', path: '/water-fall', component: WaterFall},
    {id: 'water-mark', path: '/water-mark', component: WaterMark},
    {id: 'concurrent-request', path: '/concurrent-request', component: ConcurrentRequest},
    {id: 'transition-compo', path: '/transition-compo', component: TransitionCompo},
    {id: 'not-found', path: null, component: NotFound}
];