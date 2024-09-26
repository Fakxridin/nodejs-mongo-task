export function createGuard(store) {
  return (to, from, next) => {
    const user = store.state.auth.user;

    if (!to.matched.some((record) => record.meta.requireAuth)) {
      next();
      return;
    }

    if (user) {
      next();
      return;
    }

    next({ name: 'Login' });
  };
}

export function createNonGuard(store) {
  return (to, from, next) => {
    const user = store.state.auth.user;

    if (to.matched.some((record) => record.meta.hasAuth) && user) {
      next({ name: 'Home' });
      return;
    }

    next();
  };
}
