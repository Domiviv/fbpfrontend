import { Role } from './Role.model';

export class User {
  idUser: number;
  email: string;
  pwd: string;
  lastName: string;
  firstName: string;
  address: string;
  address2: string;
  newsletter: boolean;
  role: Role;

  constructor() {
  }
}
