import Login from '../containers/Login';
import Register from '../containers/Register';
import Main from '../containers/Main';
import Home from '../containers/Home';

import UserList from '../containers/UserList';
import Repository from '../containers/Repository';
import Document from '../containers/Document';
import LookShop from '../containers/LookShop';

import List from '../containers/list';
import { Hi } from '../utils';

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/main',
        name: 'main',
        component: Hi(Main),
        children: [
            {
                path: '/main/userlist',
                name: 'userlist',
                component: UserList,
            },
            {
                path: '/main/document',
                name: 'document',
                component: Document,
            },
            {
                path: '/main/repository',
                name: 'repository',
                component: Repository,
            },
            {
                path: '/main/lookShop',
                name: 'lookShop',
                component: LookShop,
            },
            {
                path: '/main/list',
                name: 'list',
                component: List,
            },
        ],
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
    },
];
export default routes;
