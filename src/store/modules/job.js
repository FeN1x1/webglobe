export const state = {
  jobs: [
    { id: 1, name: "test 3", salary: 17 },
    { id: 2, name: "test 2", salary: 16 },
    { id: 3, name: "test 3", salary: 17 },
    { id: 4, name: "test 3", salary: 17 },
    { id: 5, name: "test 2", salary: 16 },
    { id: 6, name: "test 3", salary: 17 },
    { id: 7, name: "test 3", salary: 17 },
    { id: 8, name: "test 2", salary: 16 },
    { id: 9, name: "test 3", salary: 17 },
    { id: 10, name: "test 3", salary: 17 },
    { id: 11, name: "test 2", salary: 16 },
    { id: 12, name: "test 3", salary: 17 },
    { id: 13, name: "test 3", salary: 17 },
    { id: 14, name: "test 2", salary: 16 },
    { id: 15, name: "test 3", salary: 17 },
    { id: 16, name: "test 3", salary: 17 },
    { id: 17, name: "test 2", salary: 16 },
    { id: 18, name: "test 3", salary: 17 },
    { id: 19, name: "test 3", salary: 17 },
    { id: 20, name: "test 2", salary: 16 },
    { id: 21, name: "test 3", salary: 17 },
  ],
  job: {},
  jobsCount: 0,
  jobsPaginated: [{}],
  jobsPerPage: 10
};

let jobId = 22;

export const namespaced = true;

export const mutations = {
  SET(state, job) {
    state.job = job;
  },
  ADD(state, job) {
    state.jobs.push({
      ...job,
      id: jobId++,
    });
  },
  DELETE(state, id) {
    state.jobs = state.jobs.filter((item) => item.id !== id);
  },
  UPDATE(state, job) {
    const jobIndex = state.jobs.findIndex((item) => item.id === job.id);
    state.jobs[jobIndex] = job;
  },
  SET_COUNT(state) {
    state.jobsCount = state.jobs.length;
  },
  PAGINATE(state, page) {
    state.jobsPaginated = state.jobs.slice(state.jobsPerPage * (page - 1), state.jobsPerPage * page);
  },
};

export const actions = {
  fetch({ getters, commit }, id) {
    commit("SET", getters.getById(id));
  },
  create({ commit, dispatch }, job) {
    commit("ADD", job);
    dispatch(
      "notification/create",
      { message: `Pracovná pozícia ${job.name} bola úspešne vytvorená.` },
      { root: true }
    );
  },
  update({ commit, dispatch }, job) {
    commit("UPDATE", job);
    dispatch("notification/create", { message: `Pracovná pozícia ${job.name} bola úspešne upravená.` }, { root: true });
  },
  delete({ commit, dispatch, getters }, id) {
    const job = getters.getById(id);
    commit("DELETE", id);
    dispatch("notification/create", { message: `Pracovná pozícia ${job.name} bola úspešne vymazaná.` }, { root: true });
  },
  clear({ commit }) {
    commit("SET", {});
  },
  fetchList({ commit }, page) {
    commit("SET_COUNT");
    commit("PAGINATE", page);
  },
};

export const getters = {
  getById: (state) => (id) => {
    return state.jobs.find((item) => item.id === +id);
  }
};
