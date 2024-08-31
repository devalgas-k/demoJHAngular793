import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IExpertise, NewExpertise } from '../expertise.model';

export type PartialUpdateExpertise = Partial<IExpertise> & Pick<IExpertise, 'id'>;

export type EntityResponseType = HttpResponse<IExpertise>;
export type EntityArrayResponseType = HttpResponse<IExpertise[]>;

@Injectable({ providedIn: 'root' })
export class ExpertiseService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/expertise');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(expertise: NewExpertise): Observable<EntityResponseType> {
    return this.http.post<IExpertise>(this.resourceUrl, expertise, { observe: 'response' });
  }

  update(expertise: IExpertise): Observable<EntityResponseType> {
    return this.http.put<IExpertise>(`${this.resourceUrl}/${this.getExpertiseIdentifier(expertise)}`, expertise, { observe: 'response' });
  }

  partialUpdate(expertise: PartialUpdateExpertise): Observable<EntityResponseType> {
    return this.http.patch<IExpertise>(`${this.resourceUrl}/${this.getExpertiseIdentifier(expertise)}`, expertise, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExpertise>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IExpertise[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getExpertiseIdentifier(expertise: Pick<IExpertise, 'id'>): number {
    return expertise.id;
  }

  compareExpertise(o1: Pick<IExpertise, 'id'> | null, o2: Pick<IExpertise, 'id'> | null): boolean {
    return o1 && o2 ? this.getExpertiseIdentifier(o1) === this.getExpertiseIdentifier(o2) : o1 === o2;
  }

  addExpertiseToCollectionIfMissing<Type extends Pick<IExpertise, 'id'>>(
    expertiseCollection: Type[],
    ...expertiseToCheck: (Type | null | undefined)[]
  ): Type[] {
    const expertise: Type[] = expertiseToCheck.filter(isPresent);
    if (expertise.length > 0) {
      const expertiseCollectionIdentifiers = expertiseCollection.map(expertiseItem => this.getExpertiseIdentifier(expertiseItem)!);
      const expertiseToAdd = expertise.filter(expertiseItem => {
        const expertiseIdentifier = this.getExpertiseIdentifier(expertiseItem);
        if (expertiseCollectionIdentifiers.includes(expertiseIdentifier)) {
          return false;
        }
        expertiseCollectionIdentifiers.push(expertiseIdentifier);
        return true;
      });
      return [...expertiseToAdd, ...expertiseCollection];
    }
    return expertiseCollection;
  }
}
