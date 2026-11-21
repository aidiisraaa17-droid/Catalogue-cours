import { HttpInterceptorFn } from '@angular/common/http';

const API = 'http://localhost:3000';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const requete = req.clone({
    url: API + req.url
  });

  console.log(`[API] ${req.method} ${requete.url}`);

  return next(requete);
};