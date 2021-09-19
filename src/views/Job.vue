<template>
  <section class="text-gray-600 body-font relative">
    <div class="container px-5 mx-auto">
      <Header :titleName="title" />
      <div class="lg:w-1/2 md:w-2/3 mx-auto">
        <div class="flex flex-wrap -m-2">
          <div class="p-2 w-1/2">
            <div class="relative">
              <label for="name" class="leading-7 text-sm text-gray-600">Názov</label>
              <input
                type="text"
                id="name"
                name="name"
                ref="name"
                :value="job.name"
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div class="p-2 w-1/2">
            <div class="relative">
              <label for="salary" class="leading-7 text-sm text-gray-600">Štandardný plat</label>
              <input
                type="number"
                id="salary"
                name="salary"
                ref="salary"
                :value="job.salary"
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div class="p-2 mt-4 w-full">
            <button
              v-if="id !== 0"
              @click="updateJob"
              class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Upraviť
            </button>
            <button
              v-else
              @click="createJob"
              class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
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
    updateJob() {
      this.$store.dispatch("job/update", {
        id: this.id,
        name: this.$refs.name.value,
        salary: this.$refs.salary.value,
      });
      this.$router.push({
        name: "jobsList",
        params: {},
      });
    },
    createJob() {
      this.$store.dispatch("job/create", {
        name: this.$refs.name.value,
        salary: this.$refs.salary.value,
      });
      this.$router.push({
        name: "jobsList",
        params: {},
      });
    },
  },
};
</script>

<style scoped></style>
