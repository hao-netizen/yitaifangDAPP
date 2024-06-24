import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Login from "./login/login.vue";
import axios from "axios";
import User from "./user/index.vue";
import Layout from "./layout/index.vue";
import Carousel from "./carousel/index.vue";

// 创建实例时配置默认值
const instance = axios.create({
	baseURL: "http://localhost:9000",
});

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.common[
	"authorization"
] = `${window.localStorage.getItem("token")}`;

Vue.prototype.$http = instance;

Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({
	routes: [
		{
			path: "/",
			component: Layout,
			children: [
				{ path: "/user", name: "user", component: User },
				{ path: "/carousel", name: "carousel", component: Carousel },
			],
		},
		{ path: "/login", name: "login", component: Login },
	],
});

router.beforeEach((to, from, next) => {
	const token = localStorage.getItem("token")
  if (to.path !== '/login' && !token) next({ path: '/login' })
  else next()
})

new Vue({
	router,
	render: h => h(App),
}).$mount("#app");
