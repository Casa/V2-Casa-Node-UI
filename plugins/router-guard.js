export default ({ app }) => {
   app.router.afterEach((to, from) => {
     if(from.fullPath.includes('intro') && to.fullPath === '/home') {
       localStorage.setItem('welcome', 'true');
     }
   })
}
