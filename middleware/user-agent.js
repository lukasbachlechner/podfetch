export default function ({ req, store }) {
  if (process.server) {
    const userAgent = req.headers['user-agent'];
    const isIOS = userAgent?.match(/AppleWebKit/);
    const isIOSDevice = userAgent?.match(/(iPod|iPhone|iPad)/);
    if (!!isIOS && !!isIOSDevice) {
      store.commit('SET_IOS', true);
    }
  }
}
