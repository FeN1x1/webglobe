export const state = {
  jobs: [
    { id: 1, name: "test 3", salary: 17 },
    { id: 2, name: "test 2", salary: 16 },
    { id: 3, name: "test 3", salary: 17 },
  ],
};
export const mutations = {};
export const actions = {};
export const getters = {
  getJobById: (state) => (id) => {
    return state.jobs.find((job) => job.id === id);
  },
};
