export interface Product{
    id: string,
    name: string,
    discount_price: number,
    not_discount_price: number,
    stock: number,
    description: string,
    category_id: number,
    brand_id: number
}

export interface User{
    id: string,
    name: string,
    last_name: string,
    email: string,
    phone: string,
    password: string,
    rank: string
}

export interface Category{
    id: string,
    name: string
}

export interface Brand{
    id: string,
    name: string
}

export interface QueryResult{
    fieldCount: number,
    affectedRows: number,
    insertId: number,
    serverStatus: number,
    warningCount: number,
    message: string,
    protocol41: boolean,
    changedRows: number
}