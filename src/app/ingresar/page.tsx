import Image from 'next/image'
import BytearLogo from '../../../public/img/bytear-logo.png'
import styles from '../../../styles/ingresar.module.scss'
import Link from 'next/link'

export default function Page (){
    return(
        <main className={styles.main}>
            <div className={styles.loginContainer}>
                <div className={styles.logoContainer}>
                    <Image
                        src={BytearLogo}
                        alt='Bytear logo'
                        width={180}
                        className={styles.logo}
                    />
                </div>

                <div className={styles.formContainer}>
                    <form className={styles.form}>
                        <div className={styles.labelInputContainer}>
                            <label htmlFor="email" className={styles.label}>email</label>
                            <input type="email" id='email' placeholder='email' className={styles.input}/>
                        </div>

                        <div className={styles.labelInputContainer}>
                            <label htmlFor="password" className={styles.label}>contraseña</label>
                            <input type="password" id='password' placeholder='contraseña' className={styles.input}/>
                        </div>

                        <button type='submit' className={styles.submitButton}>Ingresar</button>
                    </form>
                </div>

                <p className={styles.createAccountText}>¿No tienes una cuenta? <Link className={styles.createAccountLink} href={'/crear-cuenta'}>Crea una</Link>.</p>
            </div>
        </main>
    )
}