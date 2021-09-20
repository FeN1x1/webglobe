export const state = {
  persons: [
    {
      id: 1,
      firstname: "Ferko",
      lastname: "Perko",
      title: "Mgr",
      email: "perko@gmail.com",
      phone: "+421900000000",
      job: {
        id: 1
      },
    },
    { id: 2, firstname: 1, lastname: "test", title: 17, email: "test", phone: "test", job: {} },
    { id: 3, firstname: 1, lastname: "test", title: 17, email: "test", phone: "test", job: {} },
  ],
  person: {},
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

let personId = 4;

export const namespaced = true;

export const mutations = {
  SET(state, person) {
    state.person = person;
  },
  ADD(state, obj) {
    state.persons.push({
      ...obj.person,
      id: personId++,
      job: {
        id: obj.job.id,
        name: obj.job.name,
        salary: !obj.job.salary ? obj.job.original_salary : obj.job.salary,
      },
    });
  },
  DELETE(state, id) {
    state.persons = state.persons.filter((item) => item.id !== id);
  },
  UPDATE(state, person) {
    const personIndex = state.persons.findIndex((item) => item.id === person.id);
    state.persons[personIndex] = person;
  },
  SET_COUNT(state) {
    state.count = state.persons.length;
    state.pagination.pages = Math.ceil(state.count / state.pagination.perPage);
  },
  PAGINATE(state, page) {
    state.pagination.paginated = state.persons.slice(
      state.pagination.perPage * (page - 1),
      state.pagination.perPage * page
    );
  },
  SET_FILTER(state, active) {
    state.filter.filterActive = active;
  },
  ADD_FILTER(state, filter) {
    state.filter.unfiltered = state.persons;
    state.persons = state.persons.filter((item) => item.name.includes(filter.name));
  },
  REMOVE_FILTER(state) {
    state.persons = state.filter.unfiltered;
  },
};

export const actions = {
  fetch({ getters, commit }, id) {
    commit("SET", getters.getById(id));
  },
  create({ commit, dispatch, rootGetters }, obj) {
    const rootJob = rootGetters["job/getById"](obj.job.id);
    obj.job["name"] = rootJob.name;
    obj.job["original_salary"] = rootJob.salary;
    commit("ADD", obj);
    dispatch(
      "notification/create",
      { message: `Osoba ${obj.person.firstname + " " + obj.person.lastname} bola úspešne vytvorená.` },
      { root: true }
    );
  },
  update({ commit, dispatch, rootGetters }, obj) {
    const rootJob = rootGetters["job/getById"](obj.job.id);
    const person = {
      ...obj.person,
      job: {
        id: obj.job.id,
        name: rootJob.name,
        salary: !obj.job.salary ? rootJob.salary : obj.job.salary,
      },
    };
    commit("UPDATE", person);
    dispatch(
      "notification/create",
      { message: `Osoba ${obj.person.firstname + " " + obj.person.lastname} bola úspešne upravená.` },
      { root: true }
    );
  },
  delete({ commit, dispatch, getters }, id) {
    const person = getters.getById(id);
    commit("DELETE", id);
    dispatch(
      "notification/create",
      { message: `Osoba ${person.firstname + " " + person.lastname} bola úspešne vymazaná.` },
      { root: true }
    );
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
    return state.persons.find((item) => item.id === +id);
  },
};
