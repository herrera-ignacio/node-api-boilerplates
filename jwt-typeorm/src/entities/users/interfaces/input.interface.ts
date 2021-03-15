export interface UserInput {
  email: string;
  name: string;
  password: string
}

export interface UserUpdateInput extends Partial<UserInput> {
  id: string;
}
