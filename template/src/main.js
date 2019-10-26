import Vue from 'vue';
import App from './App.vue';
<% if (usesRouter) { %>
  import router from './router';
<% } %>
import singleSpaVue from 'single-spa-vue';


Vue.config.productionTip = false;
const isProd = () => process.env.NODE_ENV === 'production'

if(!isProd()){
  new Vue({
    render: h => h(App)
  }).$mount("#app");
}

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
