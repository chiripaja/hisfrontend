import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router)
  
  const hasToken=()=> {
    return !!localStorage.getItem('tokengalenos');
  }
  if(hasToken()){
    const authservice=inject(AuthService);
    const token=localStorage.getItem('tokengalenos')!
    const dataToken=JSON.parse(atob(token.split('.')[1]))
    console.log(dataToken.exp)
    const fechaexpiracion = new Date(dataToken.exp*1000);
    if(new Date()>=fechaexpiracion){
      authservice.logout()
      return false;
    }
    if (localStorage.getItem('tokengalenos')) {
      return true;
    }
    else {
      router.navigate(['/']); 
      return false;
    }
  }
  else{
    router.navigate(['']);
    return false
  }

};
