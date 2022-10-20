import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/login',
			component: () => import('@/views/LoginView.vue'),
		},
		{
			path: '/signup',
			component: () => import('@/views/SignupView.vue'),
		},
		// {
		// 	path: '*',
		// 	component: () => import('@/views/LoginView.vue'),
		// },
	],
});
