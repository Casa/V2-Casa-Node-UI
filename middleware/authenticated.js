import API from '@/helpers/api';

export default async function (context) {
  // Make a JWT authenticated call to check if we're logged in
  const serial = await API.get(context.$axios, `${context.$env.API_MANAGER}/v1/telemetry/serial`);

  if(serial === false) {
    context.redirect('/login');
  }
}
