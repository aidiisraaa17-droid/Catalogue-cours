import {
  inject
} from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import {
  Session
} from '../services/session';

export const authGuard: CanActivateFn = (route, state) => {

  const session = inject(Session);

  const router = inject(Router);

  if (session.connecte()) {

    return true;

  }

  return router.createUrlTree(
    ['/connexion'],
    {
      queryParams: {
        retour: state.url
      }
    }
  );

};