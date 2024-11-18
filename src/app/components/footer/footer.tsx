import styles from "../../../../styles/footer.module.scss"
import { righteous } from '@/app/ui/fonts'

export default function Footer(){
    return(
        <footer className={styles.footer}>
            <section className={styles.contactSection}>
                <h4 className={`${righteous.className} ${styles.footerSectionTitle}`}>CONTACTO</h4>

                <div className={styles.contactSectionInformationContainer}>
                    <svg viewBox="0 0 24 24"  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={styles.contactSectionIcon}>
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z" />
                        <path d="M11 4h2" />
                        <path d="M12 17v.01" />
                    </svg>
                    <span className={styles.contactSectionText}>+54 9 11-2345-6789</span>
                </div>

                <div className={styles.contactSectionInformationContainer}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={styles.contactSectionIcon}>
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                        <path d="M3 7l9 6l9 -6" />
                    </svg>
                    <span className={styles.contactSectionText}>contactobytear@gmail.com</span>
                </div>
            </section>

            <div className={styles.separator}></div>

            <section className={styles.developerInfoAndCopyright}>
                <span className={styles.copyrightText}>© 2024 Bytear - Todos los derechos reservados.</span>
                <span className={styles.developerText}>Sitio web desarrollado por <a className={styles.developerLink} href="https://leandroheffes.com.ar">Leandro Heffes</a></span>
            </section>
        </footer>
    )
}