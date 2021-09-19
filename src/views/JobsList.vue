<template>
  <div class="flex flex-col max-w-6xl mx-auto">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <Header :titleName="`Zoznam pracovných pozícií - strana číslo ${page}`" />
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Názov
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ job.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ job.salary }}
                </td>
                <td class="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <router-link
                    class="text-indigo-600 hover:text-indigo-900"
                    :to="{ name: 'editJob', params: { id: job.id } }"
                    >Upraviť</router-link
                  >
                </td>
                <td class="pr-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <span @click="deleteJob(job.id)" class="cursor-pointer text-indigo-600 hover:text-indigo-900"
                    >Vymazať</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-6">
          <div class="flex justify-center space-x-1">
            <router-link
              :to="{ name: 'jobsList', query: { page: page - 1 } }"
              v-if="page != 1"
              class="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md bg-gray-100 border-gray-100"
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

            <!-- <button
              type="button"
              title="Page 1"
              class="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md text-coolGray-900 bg-coolGray-50 border-coolGray-50"
            >
              1
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md bg-gray-100 border-gray-100"
              title="Page 2"
            >
              2
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md bg-gray-100 border-gray-100"
              title="Page 3"
            >
              3
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md bg-gray-100 border-gray-100"
              title="Page 4"
            >
              4</button
            > -->
            <router-link
              v-if="hasNextPage"
              :to="{ name: 'jobsList', query: { page: page + 1 } }"
              class="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md bg-gray-100 border-gray-100"
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
</template>

<script>
import Header from "@/components/UI/Header.vue";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      jobs: (state) => state.job.jobsPaginated,
    }),
    ...mapState("job", ["jobsCount", "jobsPerPage"]),
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    hasNextPage() {
      return this.jobsCount > this.page * this.jobsPerPage;
    },
  },
  components: {
    Header,
  },
  methods: {
    ...mapActions("job", ["delete"]),
    deleteJob(id) {
      this.$store.dispatch("job/delete", id);
    },
  },
  created() {
    this.$store.dispatch("job/fetchList", this.page);
  },
};
</script>

<style scoped></style>
