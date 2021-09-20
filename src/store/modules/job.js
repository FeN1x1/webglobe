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
  count: 0,
  pagination: {
    paginated: [{}],
    perPage: 10,
    pages: 0,
  },
  filter: {
    unfiltered: [{}],
    filterActive: false,
  },
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
    state.count = state.jobs.length;
    state.pagination.pages = Math.ceil(state.count / state.pagination.perPage);
  },
  PAGINATE(state, page) {
    state.pagination.paginated = state.jobs.slice(
      state.pagination.perPage * (page - 1),
      state.pagination.perPage * page
    );
  },
  SET_FILTER(state, active) {
    state.filter.filterActive = active;
  },
  ADD_FILTER(state, filter) {
    state.filter.unfiltered = state.jobs;
    state.jobs = state.jobs.filter((item) => item.name.includes(filter.name));
  },
  REMOVE_FILTER(state) {
    state.jobs = state.filter.unfiltered;
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
  delete({ commit, dispatch, getters, rootState }, id) {
    const job = getters.getById(id);
    // WIP job deleting
    // const persons = rootState.person.persons;
    // const jobsToDelete = persons.find((item) => item.job.id == id); 
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
  addFilter({ commit }, filter) {
    commit("SET_FILTER", true);
    commit("ADD_FILTER", filter);
  },
  removeFilter({ commit }, filter) {
    commit("SET_FILTER", false);
    commit("REMOVE_FILTER", filter);
  },
};

export const getters = {
  getById: (state) => (id) => {
    return state.jobs.find((item) => item.id === +id);
  },
};
