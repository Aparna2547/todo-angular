import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

async function authGuardGuard(route:any, state:any) {
  const router = inject(Router);
  const token = await getTokenFromLocalStorage();
  
  if (token) {
    console.log('Token found:', token);
    return true;
  } else {
    console.log('Token not found');
    router.navigate(['/login']);
    return false;
  }
}

async function getTokenFromLocalStorage(): Promise<string | null> {
  try {
    if (isInBrowserEnvironment()) {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
}

function isInBrowserEnvironment(): boolean {
  return typeof window !== 'undefined';
}

export default authGuardGuard;
