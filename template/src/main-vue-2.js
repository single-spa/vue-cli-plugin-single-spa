import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';

import App from './App.vue';<% if (usesRouter) { %>
import router from './router';<% } if (usesStore) { %>
import store from './store';<% } if (usesVuetify) { %>
import vuetify from './plugins/vuetify'<% } %>

Vue.config.productionTip = false;

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h<% if(isTs) {%>: any<% } %>) {
      return h(App, {
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecycle-props
          // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
          /*
          name: this.name,
          mountParcel: this.mountParcel,
          singleSpa: this.singleSpa,
          */
        },
      });
    },<% if (usesRouter) { %>
    router,<% } if (usesStore) { %>
    store,<% } if (usesVuetify) { %>
    vuetify,<% } %>
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
