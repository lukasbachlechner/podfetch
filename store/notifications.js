export const state = () => ({
  notifications: [],
});

export const mutations = {
  SET_NOTIFICATION(state, notification) {
    notification.id = Math.random().toString(16).substr(2);
    state.notifications.push(notification);
  },
  REMOVE_NOTIFICATION(state, notificationId) {
    const notificationIndex = state.notifications.findIndex(
      (notification) => notification.id === notificationId
    );
    state.notifications.splice(notificationIndex, 1);
  },
};

export const actions = {};

export const getters = {
  notifications: (state) => state.notifications,
};
