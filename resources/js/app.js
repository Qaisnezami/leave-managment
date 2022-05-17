require('./bootstrap');

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();
window.Vue = require('vue');



// Vue.$gate = new Gate(window.user);

import { createApp } from 'vue';
import router from './router'
import leaveIndex from './components/leave/index.vue'

createApp({
    components:{leaveIndex}
}).use(router).mount('#app')