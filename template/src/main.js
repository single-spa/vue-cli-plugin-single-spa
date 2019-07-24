import Vue from 'vue';
import App from './App.vue';<% if (usesRouter) { %>
import router from './router';<% } %>
import singleSpaVue from 'single-spa-vue';

Vue.config.productionTip = false;

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: (h<% if(isTs) {%>: any<% } %>) => h(App),<% if (usesRouter) { %>
    router,<% } %>
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
