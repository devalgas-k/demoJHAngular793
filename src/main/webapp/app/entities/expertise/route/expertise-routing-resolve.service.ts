import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IExpertise } from '../expertise.model';
import { ExpertiseService } from '../service/expertise.service';

@Injectable({ providedIn: 'root' })
export class ExpertiseRoutingResolveService implements Resolve<IExpertise | null> {
  constructor(protected service: ExpertiseService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExpertise | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((expertise: HttpResponse<IExpertise>) => {
          if (expertise.body) {
            return of(expertise.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
