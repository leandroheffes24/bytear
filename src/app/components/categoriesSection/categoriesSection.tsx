import { righteous, roboto } from '@/app/ui/fonts'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import styles from '../../../../styles/categoriesSection.module.scss'
import Image from 'next/image';
import cpuImage from '../../../../public/img/cpu.webp'
import monitorImage from '../../../../public/img/monitor.jpg'
import Link from 'next/link';

export default function CategoriesSection(){
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
                    <SplideSlide className={styles.categoryContainer}>
                        <Link href={'/categoria'}>
                            <Image
                                src={cpuImage}
                                alt='CPU'
                                className={styles.categoryImage}
                                height={180}
                            />
                            <span className={`${styles.categoryTitle} ${roboto.className}`}>COMPUTADORAS</span>
                        </Link>
                    </SplideSlide>

                    <SplideSlide className={styles.categoryContainer}>
                        <Link href={'/categoria'}>
                            <Image
                                src={monitorImage}
                                alt='MONITOR'
                                className={styles.categoryImage}
                                height={180}
                            />
                        </Link>
                        <span className={`${styles.categoryTitle} ${roboto.className}`}>MONITORES</span>
                    </SplideSlide>
                </Splide>
            </div>
        </section>
    )
}