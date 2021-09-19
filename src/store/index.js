import Vue from "vue";
import Vuex from "vuex";
import * as job from "@/store/modules/job.js";
import * as person from "@/store/modules/person.js";
import * as notification from "@/store/modules/notification.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    job,
    person,
    notification,
  },
});
