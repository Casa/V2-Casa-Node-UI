import API from '@/helpers/api';

export default async function (context) {
  // Check to see if the user is registered. If the user is not registered, redirect them to the intro page.
  const data = await API.get(context.$axios, `${context.$env.API_MANAGER}/v1/accounts/registered`);

  if(data && data.registered === false) {
    context.redirect('/intro');
  }
}
