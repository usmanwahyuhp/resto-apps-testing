/* eslint-disable linebreak-style */
/* eslint-disable indent */
import List from '../view/pages/list';
import Detail from '../view/pages/detail';
import Favourite from '../view/pages/favourite';

const routes = {
    '/': List, // default page
    '/list': List,
    '/detail/:id': Detail,
    '/favourite': Favourite,
};

export default routes;
