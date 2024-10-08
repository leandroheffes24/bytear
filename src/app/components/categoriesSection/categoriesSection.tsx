import { righteous } from '@/app/ui/fonts'
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
                    // height: '290px',
                    // breakpoints: {
                    //     767:{
                    //         height: '250px'
                    //     },
                    //     991:{
                    //         height: '450px'
                    //     },
                    //     1199:{
                    //         height: '210px'
                    //     }
                    // }
                    type   : 'loop',
                    perPage: 2,
                    perMove: 1,
                    gap: '1.5rem',
                    padding: '20px'
                }}
                >
                    <SplideSlide className={styles.categoryContainer}>
                        <Link href={'/categoría'}>
                            <Image
                                src={cpuImage}
                                alt='CPU'
                                className={styles.categoryImage}
                                height={180}
                            />
                            <span className={`${styles.categoryTitle} ${righteous.className}`}>COMPUTADORAS</span>
                        </Link>
                    </SplideSlide>

                    <SplideSlide className={styles.categoryContainer}>
                        <Image
                            src={monitorImage}
                            alt='MONITOR'
                            className={styles.categoryImage}
                            height={180}
                        />
                        <span className={`${styles.categoryTitle} ${righteous.className}`}>MONITORES</span>
                    </SplideSlide>
                </Splide>
            </div>
        </section>
    )
}