export default function ({$axios, app}) {
  // Add a hook into every API call made by axios
  $axios.interceptors.response.use(
    function (response) {
      return response;
    },

    // If there is an error
    function (error) {

      // During the migration process, we don't want to redirect the user. We will return a rejected promise without
      // updating the path.
      if (app.context.from.fullPath === '/migration/migrating') {
        return Promise.reject(error);
      }

      // Do not redirect to login for the following routes
      if (error.response.config.url.endsWith('/v1/device/shutdown')) {
        return Promise.reject(error);
      }

      const code = parseInt(error.response && error.response.status);

      // If the error is 401 (unauthorized), log the user out and redirect to the login page
      if ([401].includes(code)) {
        app.$auth.logout();
        app.router.push('/login');
      }

      return Promise.reject(error);
    }
  );
}
