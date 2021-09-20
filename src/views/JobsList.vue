<template>
  <div class="flex flex-col max-w-6xl mx-auto">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <Header titleName="Zoznam pracovných pozícií" />
      <div class="flex flex-col mx-8 my-2 sm:flex-row">
        <div class="relative block">
          <span class="absolute inset-y-0 left-0 flex items-center h-full pl-2">
            <svg viewBox="0 0 24 24" class="w-4 h-4 text-gray-500 fill-current">
              <path
                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
              ></path>
            </svg>
          </span>
          <input
            ref="filter"
            placeholder="Vyhľadať podľa názvu"
            class="block w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-b border-gray-200 rounded appearance-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
          />
        </div>

        <button
          v-if="!filter.filterActive"
          @click="setFilter(true)"
          class="flex px-6 py-2 ml-auto text-center text-white bg-gray-400 border-0 rounded text-md focus:outline-none hover:bg-gray-500"
        >
          Filtrovať
        </button>
        <button
          v-else
          @click="setFilter(false)"
          class="flex px-6 py-2 ml-auto text-center text-white bg-gray-400 border-0 rounded text-md focus:outline-none hover:bg-gray-500"
        >
          Zrušiť filter
        </button>
      </div>
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                >
                  Názov
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                >
                  Štandardný plat
                </th>

                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Upraviť</span>
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Vymazať</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="job in jobs" :key="job.id">
                <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {{ job.name }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {{ job.salary }}
                </td>
                <td class="px-2 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <router-link
                    class="text-indigo-600 hover:text-indigo-900"
                    :to="{ name: 'editJob', params: { id: job.id, currentPage: page } }"
                    >Upraviť</router-link
                  >
                </td>
                <td class="py-4 pr-6 text-sm font-medium text-right whitespace-nowrap">
                  <span @click="deleteJob(job.id)" class="text-indigo-600 cursor-pointer hover:text-indigo-900"
                    >Vymazať</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-center p-3 px-6">
          <div class="items-center mt-6 space-y-2 text-sm font-medium text-gray-500 sm:space-y-0 sm:space-x-3 sm:flex">
            <span class="block"
              >Strana <span class="text-lg">{{ page }}</span> z <span class="text-lg">{{ pagination.pages }}</span>
            </span>
            <div class="space-x-1">
              <router-link
                v-if="page != 1"
                :to="{ name: 'jobsList', query: { page: page - 1 } }"
                class="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow"
              >
                <svg
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-4"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </router-link>
              <router-link
                v-if="hasNextPage"
                :to="{ name: 'jobsList', query: { page: page + 1 } }"
                class="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow"
              >
                <svg
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-4"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/UI/Header.vue";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      jobs: (state) => state.job.pagination.paginated,
    }),
    ...mapState("job", ["count", "perPage", "pages", "pagination", "filter"]),
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    hasNextPage() {
      return this.count > this.page * this.pagination.perPage;
    },
    fetchData() {
      this.$store.dispatch("job/fetchList", this.page);
    },
  },
  components: {
    Header,
  },
  methods: {
    ...mapActions("job", ["delete", "addFilter", "removeFilter"]),
    deleteJob(id) {
      this.$store.dispatch("job/delete", id);
      this.fetchData;
    },
    setFilter(filterType) {
      if (filterType) {
        this.$store.dispatch("job/addFilter", {
          name: this.$refs.filter.value,
        });
      } else {
        this.$store.dispatch("job/removeFilter");
      }
      this.fetchData;
    },
  },
  created() {
    this.fetchData;
  },
};
</script>

<style scoped></style>
