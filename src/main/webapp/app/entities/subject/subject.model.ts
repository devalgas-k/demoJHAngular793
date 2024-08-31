export interface ISubject {
  id: number;
  name?: string | null;
}

export type NewSubject = Omit<ISubject, 'id'> & { id: null };
