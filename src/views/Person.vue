<template>
  <section class="relative text-gray-600 body-font">
    <div class="container px-5 mx-auto">
      <Header :titleName="title" />
      <div class="mx-auto lg:w-1/2 md:w-2/3">
        <div class="flex flex-wrap -m-2">
          <div class="w-1/2 p-2">
            <div class="relative">
              <label for="firstname" class="text-sm leading-7 text-gray-600">Meno</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                ref="firstname"
                :value="person.firstname"
                class="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
          <div class="w-1/2 p-2">
            <div class="relative">
              <label for="lastname" class="text-sm leading-7 text-gray-600">Priezvisko</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                ref="lastname"
                :value="person.lastname"
                class="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
          <div class="w-1/2 p-2">
            <div class="relative">
              <label for="title" class="text-sm leading-7 text-gray-600">Titul</label>
              <input
                type="text"
                id="title"
                name="title"
                ref="title"
                :value="person.title"
                class="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
          <div class="w-1/2 p-2">
            <div class="relative">
              <label for="email" class="text-sm leading-7 text-gray-600">E-Mail</label>
              <input
                type="email"
                id="email"
                name="email"
                ref="email"
                :value="person.email"
                class="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
          <div class="w-1/2 p-2">
            <div class="relative">
              <label for="phone" class="text-sm leading-7 text-gray-600">Telefónne číslo</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                ref="phone"
                :value="person.phone"
                class="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
          <div class="w-1/2 p-2">
            <div class="relative">
              <label for="jobName" class="text-sm leading-7 text-gray-600">Pracovná pozícia</label>
              <select
                id="jobName"
                name="jobName"
                ref="jobId"
                class="w-full px-2 py-3 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
              >
                <option v-for="job in jobs" :value="job.id" :key="job.id">{{ job.name }}</option>
              </select>
            </div>
          </div>
          <div class="w-1/2 p-2">
            <div class="relative">
              <span class="block p-2 text-sm leading-7 text-gray-600">Typ platu</span>
              <label for="job" class="inline-flex items-center space-x-4 text-gray-800 cursor-pointer">
                <span>Bežný</span>
                <span class="relative">
                  <input id="job" @click="toggleSalary = !toggleSalary" type="checkbox" class="hidden peer" />
                  <div class="w-10 h-6 bg-gray-600 rounded-full shadow-inner peer-checked:bg-indigo-500"></div>
                  <div
                    class="absolute inset-y-0 left-0 w-4 h-4 m-1 bg-gray-100 rounded-full shadow peer-checked:right-0 peer-checked:left-auto"
                  ></div>
                </span>
                <span>Iný</span>
              </label>
            </div>
          </div>
          <div v-if="toggleSalary" class="w-1/2 p-2">
            <div class="relative">
              <label for="salary" class="text-sm leading-7 text-gray-600">Plat</label>
              <input
                type="number"
                id="salary"
                name="salary"
                ref="salary"
                class="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
          <div class="w-full p-2 mt-4">
            <button
              v-if="id !== 0"
              @click="personAction('update')"
              class="flex px-8 py-2 mx-auto text-lg text-white bg-gray-400 border-0 rounded focus:outline-none hover:bg-gray-500"
            >
              Upraviť
            </button>
            <button
              v-else
              @click="personAction('create')"
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
import _ from "lodash";

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
      toggleSalary: false,
    };
  },
  components: {
    Header,
  },
  created() {
    if (this.id !== 0) {
      this.$store.dispatch("person/fetch", this.id);
      this.title = "Upraviť osobu";
    } else {
      this.$store.dispatch("person/clear");
      this.title = "Nová osoba";
    }

    if (!_.isEmpty(this.person.job) && this.id !== 0) {
      this.toggleSalary = true;
    }
  },
  computed: {
    ...mapState({
      person: (state) => state.person.person,
    }),
    ...mapState("job", ["jobs"]),
  },
  methods: {
    ...mapActions("person", ["fetch", "update", "create"]),
    personAction(action) {
      this.$store.dispatch(`person/${action}`, {
        person: {
          id: this.id,
          firstname: this.$refs.firstname.value,
          lastname: this.$refs.lastname.value,
          title: this.$refs.title.value,
          email: this.$refs.email.value,
          phone: this.$refs.phone.value,
        },
        job: {
          id: this.$refs.jobId.value,
          salary: this.toggleSalary ? this.$refs.salary.value : false,
        },
      });
      this.$router.push({
        name: "personsList",
        query: { page: this.currentPage },
      });
    },
  },
};
</script>

<style scoped></style>
