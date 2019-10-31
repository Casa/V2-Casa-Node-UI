import API from '@/helpers/api';

export default async function (context) {
  // Don't run this middleware if we are already on the loading page
  if(context.route.name === 'loading') {
    return;
  }

  // Check to see if the node is still booting up
  const loading = await API.get(context.$axios, `${context.$env.API_MANAGER}/v1/telemetry/boot`);

  if(typeof sessionStorage !== 'undefined') {
    const session = sessionStorage.getItem('loading');

    // This session data is used to bypass the loading page in case the node is unable to start
    if(session === 'ignored') {
      return;
    }
  }

  // If there is a network failure, an exception will be thrown and loading will return false
  if(loading === false || (loading && parseInt(loading.percent) !== 100)) {
    context.redirect('/loading');
  }
}
