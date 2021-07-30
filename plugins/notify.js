export default function ({ app }, inject) {
  const notify = (content, level = 'success') => {
    app.store.commit('notifications/SET_NOTIFICATION', {
      content,
      level,
    });
  };
  inject('notify', notify);
}
