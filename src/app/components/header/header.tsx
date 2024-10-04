import styles from '../../../../styles/header.module.scss'
import BytearLogo from '../../../../public/img/bytear-logo.png'
import Image from 'next/image'
import { IconMenu2 } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Header(){
    const [isNavbarOpen, setNavbarOpen] = useState(false)

    const handleOpenNavbar = () => {
        setNavbarOpen(true)
    }

    const handleCloseNavbar = () => {
        setNavbarOpen(false)
    }

    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerLogoContainer}>
                    <Image
                        src={BytearLogo}
                        alt='Bytear Logo'
                        width={130}
                        className={styles.headerLogo}
                    />
                </div>

                <div className={styles.headerOpenNavbarIconContainer}>
                    <IconMenu2
                        stroke={2}
                        width={40}
                        height={40}
                        className={styles.headerOpenNavbarIcon}
                        onClick={handleOpenNavbar}
                    />
                </div>

                <nav className={styles.headerDesktopNavbar}>
                    <Link href='/' className={styles.headerDesktopNavbarLink}>Inicio</Link>
                    <Link href='/productos' className={styles.headerDesktopNavbarLink}>Productos</Link>
                </nav>
            <div className={styles.headerBorderBottom}></div>
            </header>

            {isNavbarOpen && (
                <nav className={styles.headerNavbar}>
                    <div className={styles.headerNavbarLinksContainer}>
                        <Link href="/" className={styles.headerNavbarLink}>Inicio</Link>
                        <Link href="/productos" className={styles.headerNavbarLink}>Productos</Link>
                    </div>

                    <div className={styles.headerNavbarCloseNavbarIconContainer}>
                        <IconX
                            stroke={2}
                            width={35}
                            height={35}
                            className={styles.navbarCloseNavbarIcon}
                            onClick={handleCloseNavbar}
                        />
                    </div>
                </nav>
            )}
        </>
    )
}