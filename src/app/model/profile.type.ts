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

export type Todo = {
    userId: number,
    completed: boolean,
    title: string,
    id: number
}