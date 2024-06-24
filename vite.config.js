import vue from "@vitejs/plugin-vue2";
import Components from "unplugin-vue-components/vite";
import { ElementUiResolver } from "unplugin-vue-components/resolvers";

export default {
	plugins: [
		vue(),
		Components({
			resolvers: [ElementUiResolver()],
		}),
	],
};
