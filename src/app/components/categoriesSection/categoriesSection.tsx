'use client'

import { righteous, roboto } from '@/app/ui/fonts'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import styles from '../../../../styles/categoriesSection.module.scss'
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { Category } from '@/interfaces/types';
import monitor from '../../../../public/img/monitor.webp'
import { useState, useEffect } from 'react';

export default function CategoriesSection(){
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        async function fetchCategories(){
            try {
                const {data} = await axios.get<Category[]>(`/api/categories`)
                setCategories(data)
            } catch (error) {
                console.error("Error fetching categories ", error)
            }
        }

        fetchCategories()
    }, [])

    if (categories.length === 0) {
        return <div>Cargando...</div>
    }

    return(
        <section className={styles.categoriesSection}>
            <div className={styles.categoriesTitleContainer}>
                <h3 className={`${righteous.className} ${styles.cateogiesTitle}`}>CATEGORÍAS</h3>
                <div className={styles.categoriesTitleUnderline}></div>
            </div>

            <div className={styles.categoriesContainer}>
                <Splide
                options={{
                    breakpoints: {
                        767:{
                            perPage: 2,
                            gap: '1.5rem',
                            padding: '20px'
                        },
                        991:{
                            perPage: 3,
                            gap: '2rem',
                            padding: '25px'
                        },
                        1199:{
                            perPage: 5,
                            gap: '1.8rem',
                            padding: '20px'
                        }
                    },
                    type: 'loop',
                    perPage: 6,
                    perMove: 1,
                    gap: '2rem',
                    padding: '30px'
                }}
                >
                    {categories.map(category => (
                        <SplideSlide key={category.id} className={styles.categoryContainer}>
                        <Link href={`/categoria/${category.name.toLowerCase()}`}>
                            <Image
                                src={monitor}
                                alt={`${category.name} image`}
                                className={styles.categoryImage}
                                height={180}
                            />
                            <span className={`${styles.categoryTitle} ${roboto.className}`}>{category.name.toUpperCase()}</span>
                        </Link>
                    </SplideSlide>
                    ))}
                </Splide>
            </div>
        </section>
    )
}