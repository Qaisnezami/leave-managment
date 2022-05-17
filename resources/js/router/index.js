import { createRouter,createWebHistory } from "vue-router";

import LeaveIndex from '../components/leave/index.vue'
import LeaveCreate from '../components/leave/create.vue'

const routes = [
    {
        path : '/',
        name : 'leave.index',
        component : LeaveIndex,
    },
    {
        path : '/create',
        name : 'leave.create',
        component : LeaveCreate,
    }
];

export default createRouter({
    history:createWebHistory(),
    routes
})