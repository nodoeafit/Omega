import { User } from './user.model';


export interface Group {
    id: number;
    name: string;
    mentor: User;
    students: User[];
}
