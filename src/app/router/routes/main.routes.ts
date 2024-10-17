import { RouteRecordRaw } from 'vue-router'
import { MainLayout } from 'app/layouts'

export default [
	{
		name: 'main',
		component: () => import('pages/main/MainPage.vue'),
		path: '/',
		meta: {
			title: 'FCC',
			layout: MainLayout
		}
	}
] as RouteRecordRaw[]
