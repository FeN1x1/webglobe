<template>
  <section class="relative text-gray-600 body-font">
    <div class="container px-5 mx-auto">
      <Header :titleName="title" />
      <div class="mx-auto lg:w-1/2 md:w-2/3">
        <div class="flex flex-wrap -m-2">
          <div class="w-1/2 p-2">
            <div class="relative">
              <label for="name" class="text-sm leading-7 text-gray-600">Názov</label>
              <input
                type="text"
                id="name"
                name="name"
                ref="name"
                :value="job.name"
                class="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
          <div class="w-1/2 p-2">
            <div class="relative">
              <label for="salary" class="text-sm leading-7 text-gray-600">Štandardný plat</label>
              <input
                type="number"
                id="salary"
                name="salary"
                ref="salary"
                :value="job.salary"
                class="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
          <div class="w-full p-2 mt-4">
            <button
              v-if="id !== 0"
              @click="jobAction('update')"
              class="flex px-8 py-2 mx-auto text-lg text-white bg-gray-400 border-0 rounded focus:outline-none hover:bg-gray-500"
            >
              Upraviť
            </button>
            <button
              v-else
              @click="jobAction('create')"
              class="flex px-8 py-2 mx-auto text-lg text-white bg-gray-400 border-0 rounded focus:outline-none hover:bg-gray-500"
            >
              Vytvoriť
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";

import Header from "@/components/UI/Header.vue";
export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      title: "",
    };
  },
  components: {
    Header,
  },
  created() {
    if (this.id !== 0) {
      this.$store.dispatch("job/fetch", this.id);
      this.title = "Upraviť pracovnú pozíciu";
    } else {
      this.$store.dispatch("job/clear");
      this.title = "Nová pracovná pozícia";
    }
  },
  computed: mapState({
    job: (state) => state.job.job,
  }),
  methods: {
    ...mapActions("job", ["fetch", "update", "create"]),
    jobAction(action) {
      this.$store.dispatch(`job/${action}`, {
        id: this.id,
        name: this.$refs.name.value,
        salary: this.$refs.salary.value,
      });
      this.$router.push({
        name: "jobsList",
        query: { page: this.currentPage },
      });
    },
  },
};
</script>
