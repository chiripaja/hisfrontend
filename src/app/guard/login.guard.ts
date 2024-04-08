import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const hasToken=()=> {
    return !!localStorage.getItem('tokengalenos');
  }
  if (hasToken()) {
    router.navigate(['/admin/listahis']);
    return false; 
  } else {
    return true; 
  }
};
