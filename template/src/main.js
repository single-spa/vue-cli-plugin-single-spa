import './set-public-path';
import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';

import App from './App.vue';<% if (usesRouter) { %>
import router from './router';<% } %>

Vue.config.productionTip = false;

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h<% if(isTs) {%>: any<% } %>) {
      return h(App, {
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          mountParcel: this.mountParcel
        },
      });
    },<% if (usesRouter) { %>
    router,<% } %>
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
