'use client'
import { ProductAndImage } from '@/interfaces/types'
import styles from '../../../../styles/productosPorCategoria.module.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { righteous } from '@/app/ui/fonts'
import Link from 'next/link'
import MobileFilters from './components/mobileFilters'

export default function ProductosPorCategoria({categoryName}: {categoryName: string}){
    const [products, setProducts] = useState<ProductAndImage[]>([])
    const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false)
    const [filteredProducts, setFilteredProducts] = useState<ProductAndImage[]>([])
    const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)

    const handleFiltersClick = () => {
        setShowMobileFilters(!showMobileFilters)
    }

    const applyPriceFilter = (min: number | undefined, max: number | undefined) => {
        let filtered = [...products]
        if(min !== undefined){
            filtered = filtered.filter(product => product.discount_price >= min)
        }
        if(max !== undefined){
            filtered = filtered.filter(product => product.discount_price <= max)
        }
        setFilteredProducts(filtered)
    }

    useEffect(() => {
        async function fetchProducts(){
            try {
                const {data} = await axios.get<{productsWithImages: ProductAndImage[]}>(`/api/categories/${categoryName}`)
                setProducts(data.productsWithImages)
                setFilteredProducts(data.productsWithImages)
            } catch (error) {
                console.error("Error fetching products ", error)
            }
        }

        fetchProducts()
    }, [categoryName])

    return(
        <main className={styles.categoryMain}>
            <div className={styles.categoryTitleContainer}>
                <h3 className={`${styles.categoryTitle} ${righteous.className}`}>{categoryName.toUpperCase()}</h3>
            </div>

            <section className={styles.desktopFilterSection}>
                filter section
            </section>

            <div className={styles.filterAndOrderProductsButtonsContainer}>
                <button className={styles.filterAndOrderProductsButton} onClick={handleFiltersClick}>
                    FILTRAR
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={styles.filterAndOrderProductsIcon}>
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" />
                    </svg>
                </button>

                <button className={styles.filterAndOrderProductsButton}>
                    ORDENAR
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={styles.filterAndOrderProductsIcon}>
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M3 8l4 -4l4 4" />
                        <path d="M7 4l0 9" />
                        <path d="M13 16l4 4l4 -4" />
                        <path d="M17 10l0 10" />
                    </svg>
                </button>
            </div>

            {showMobileFilters &&
                <MobileFilters
                    closeComponent={() => setShowMobileFilters(false)}
                    applyFilter={applyPriceFilter}
                    setMinPrice={setMinPrice}
                    setMaxPrice={setMaxPrice}
                />
            }

            <section className={styles.productsSection}>
                {filteredProducts.map(product => (
                    <div className={styles.productContainer} key={product.id}>
                        <Link href={`/productos/${product.id}`}>
                            <Image
                                src={product.image}
                                alt={`${product.name} imágen`}
                                width={100}
                                height={100}
                                className={styles.productImage}
                            />
                            <p className={styles.productName}>{product.name}</p>
                            <p className={styles.productPrice}>${product.discount_price}</p>
                        </Link>
                    </div>
                ))}
            </section>
        </main>
    )
}