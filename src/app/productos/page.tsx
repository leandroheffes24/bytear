import axios from 'axios'
import { Product } from '@/interfaces/types'

async function loadProducts(): Promise<Product[]>{
    const {data} = await axios.get<Product[]>(`${process.env.URL_WEBSITE}/api/products`)
    return data
}

export default async function Products (){
    const products = await loadProducts()

    return <>
        {products.map(product => (
            <div key={product.id}>
                <h1>{product.name}</h1>
                <h2>{product.discount_price}</h2>
                <h2>{product.not_discount_price}</h2>
                <p>{product.stock}</p>
                <p>{product.description}</p>
            </div>
        ))}
    </>
}