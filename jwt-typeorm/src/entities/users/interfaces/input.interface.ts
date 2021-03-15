export interface UserInput {
  email: string;
  name: string;
  password: string
}

export interface UserUpdateInput {
  id: string;
  email?: string;
  name?: string;
  password?: string;
}
