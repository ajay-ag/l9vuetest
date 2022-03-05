export default function guest({ next, store }) {
  if (store.getters["auth/auth"].loggedIn) {
    return next({
      name: "dashboard",
    });
  }
  return next();
}
