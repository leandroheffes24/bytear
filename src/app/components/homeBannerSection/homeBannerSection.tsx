import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import styles from '../../../../styles/homeBannerSection.module.scss'
import HomeMobileBanner1 from '../../../../public/img/banner1mobile.png'
import HomeMobileBanner2 from '../../../../public/img/banner2mobile.jpg'
import HomeDesktopBanner1 from '../../../../public/img/banner1Desktop.png'
import HomeDesktopBanner2 from '../../../../public/img/banner2Desktop.jpg'
import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';

export default function HomeBannerSection(){
    const [banner1, setBanner1] = useState<StaticImageData | string>('')
    const [banner2, setBanner2] = useState<StaticImageData | string>('')

    useEffect(() => {
        if(screen.width < 992){
            setBanner1(HomeMobileBanner1)
            setBanner2(HomeMobileBanner2)
        } else {
            setBanner1(HomeDesktopBanner1)
            setBanner2(HomeDesktopBanner2)
        }
    }, [])

    return(
        <Splide
            options={{
                height: '290px',
                lazyLoad: 'nearby',
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
                    src={banner1}
                    alt='Banner Inicio 1'
                    fill
                />
            </SplideSlide>
            <SplideSlide className={styles.splideSlide}>
                <Image
                    src={banner2}
                    alt='Banner Inicio 2'
                    fill
                />
            </SplideSlide>
        </Splide>
    )
}