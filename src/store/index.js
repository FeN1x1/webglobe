import Vue from "vue";
import Vuex from "vuex";
import * as job from "@/store/modules/job.js";
import * as person from "@/store/modules/person.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    job,
    person,
  },
});
