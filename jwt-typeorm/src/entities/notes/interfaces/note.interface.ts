import { IUser } from '../../users/interfaces';

export interface INote {
  title: string;
  folder: string;
  content: string;
  creator: IUser;
}
