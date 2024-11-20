'use client'
import { ProductAndImage } from '@/interfaces/types'
import styles from '../../../../styles/productosPorCategoria.module.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

export default function ProductosPorCategoria({categoryName}: {categoryName: string}){
    const [products, setProducts] = useState<ProductAndImage[]>([])

    useEffect(() => {
        async function fetchProducts(){
            try {
                const {data} = await axios.get<{productsWithImages: ProductAndImage[]}>(`/api/categories/${categoryName}`)
                setProducts(data.productsWithImages)
            } catch (error) {
                console.error("Error fetching products ", error)
            }
        }

        fetchProducts()
    }, [categoryName])

    return(
        <section>
            {products.map(product => (
                <div key={product.id}>
                    <Image
                        src={product.image}
                        alt={`${product.name} image`}
                        width={100}
                        height={100}
                    />
                    <p>{product.name}</p>
                    <p>{product.discount_price}</p>
                    <p>{product.not_discount_price}</p>
                    <p>{product.stock}</p>
                    <p>{product.description}</p>
                </div>
            ))}
        </section>
    )
}