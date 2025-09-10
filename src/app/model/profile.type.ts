export type Profile = {
    name: string,
    role: string,
    experience: number
}

export type Product = {
    title: string,
    price: number,
    category: string,
    inStock: boolean,
}

export type Student = {
    name:string;
    grade:number;
    passed:boolean
}

export type Cart = {
    id:number,
    name:string,
    price:number,
}

export type Task = {
    title:string,
    priority:string,
    done: boolean
}

// export type Todo = {
//     userId: number,
//     completed: boolean,
//     title: string,
//     id: number
// }

export interface Todo{
  userId: number;
  id: string;
  title: string;
  completed: boolean;
}

export interface UserLogin{
    email:string;
    password:string;
}

export interface UserRegister{
    email:string;
    username:string;
    password:string;
}


export interface User{
    id:string;
    username:string;
    email:string
}

export interface UserResponseSuccess{
    message:string;
    success:boolean;
    user:User
    token:string
}

export interface RegisterResponse{
    message:string | null;
    success:boolean
}

export interface UserResponseFailure{
    success:boolean;
    message:string
}