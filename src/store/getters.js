export default {
  isAuthenticated: state => !!state.token,
  role: state => (state.user ? state.user.role : null),
  isLoading: state => !!state.loading.length
};
