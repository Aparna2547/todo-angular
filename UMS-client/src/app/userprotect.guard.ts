import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';



function isInBrowserEnvironment(): boolean {
  return typeof window !== 'undefined';
}


// export const userprotectGuard: CanActivateFn = (route, state) => {
 
//   const router = inject(Router);
//   const token = isInBrowserEnvironment() ? localStorage.getItem('token'):null;
//   console.log('token',token)
//   if(!token){
//     return true
//   }else{
//   console.log('ivde token',token)
    
//     router.navigate(['/']);
//     return false
//   }
// };

export const userprotectGuard: CanActivateFn = async (route, state) => {
   console.log('heuuu')
  const router = inject(Router);
  const token = await window.localStorage.getItem('token');
  console.log('token in',token)
  if(!token){
    return true
  }else{
  console.log('ivde token',token)
    
    router.navigate(['/']);
    return false
  }
};




