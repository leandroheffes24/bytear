import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import styles from '../../../../styles/homeBannerSection.module.scss'
import HomeMobileBanner1 from '../../../../public/img/banner1mobile.png'
import HomeMobileBanner2 from '../../../../public/img/banner2mobile.jpg'
import HomeDesktopBanner1 from '../../../../public/img/banner1Desktop.png'
import HomeDesktopBanner2 from '../../../../public/img/banner2Desktop.jpg'
import Image from 'next/image';

export default function HomeBannerSection(){
    return(
        <Splide
            options={{
                height: '290px',
                lazyLoad: 'sequential',
                breakpoints: {
                    767:{
                        height: '250px'
                    },
                    991:{
                        height: '450px'
                    },
                    1199:{
                        height: '210px'
                    }
                }
            }}
        >
            <SplideSlide className={styles.splideSlide}>
                <Image
                    data-splide-lazy-srcset={`${HomeMobileBanner1} 991w, ${HomeDesktopBanner1} 1199w`}
                    data-splide-lazy={HomeDesktopBanner1}
                    src={HomeDesktopBanner1}
                    alt='Banner Inicio 1'
                    fill
                />
            </SplideSlide>
            <SplideSlide className={styles.splideSlide}>
                <Image
                    data-splide-lazy-srcset={`${HomeMobileBanner2} 991w, ${HomeDesktopBanner2} 1199w`}
                    data-splide-lazy={HomeDesktopBanner2}
                    src={HomeDesktopBanner2}
                    alt='Banner Inicio 2'
                    fill
                />
            </SplideSlide>
        </Splide>
    )
}