export const state = {
  notifications: [],
};

let notificationId = 1;

export const namespaced = true;

export const mutations = {
  ADD(state, notification) {
    state.notifications.push({
      ...notification,
      id: notificationId++,
    });
  },

  DELETE(state, notification) {
    state.notifications = state.notifications.filter((item) => item.id !== notification.id);
  },
};

export const actions = {
  create({ commit }, notification) {
    commit("ADD", notification);
  },
  remove({ commit }, notification) {
    commit("DELETE", notification);
  },
};
