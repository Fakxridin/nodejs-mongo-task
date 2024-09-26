const getters = {
  user: (state) => state.user,
  isAuthenticated: (state) => !!state.user,
  status: (state) => state.status
};

export default getters;
