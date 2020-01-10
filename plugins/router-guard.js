export default ({ app }) => {
   app.router.afterEach((to, from) => {
     console.log('to', to);
     console.log('from', from);
     if(from.fullPath.includes('intro') && to.fullPath === '/home') {
       localStorage.setItem('welcome', 'true');
     }
   })
}
