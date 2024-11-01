'use client'
import Image from 'next/image'
import BytearLogo from '../../../../public/img/bytear-logo.png'
import styles from '../../../../styles/ingresar.module.scss'
import Link from 'next/link'
import { useRef, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function CrearCuenta (){
    // const phoneLengthValidation = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if(event.target.value.length >= event.target.maxLength){
    //         event.preventDefault();
    //         console.log("llego");
            
    //     }
    // }
    const [user, setUser] = useState({
        name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
    })

    const form = useRef<HTMLFormElement>(null)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await axios.post("/api/users", user)
        console.log(res);
        if(form.current){form.current.reset()}
        router.push("/")
    }

    return(
        <main className={styles.mainRegister}>
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
                    <form className={styles.form} ref={form} onSubmit={handleSubmit}>
                        <div className={styles.labelInputContainer}>
                            <label htmlFor="name" className={styles.label}>Nombre</label>
                            <input type="text" id='name' placeholder='Nombre' className={styles.input} maxLength={40} onChange={handleChange}/>
                        </div>

                        <div className={styles.labelInputContainer}>
                            <label htmlFor="last_name" className={styles.label}>Apellido</label>
                            <input type="text" id='last_name' placeholder='Apellido' className={styles.input} maxLength={40} onChange={handleChange}/>
                        </div>

                        <div className={styles.labelInputContainer}>
                            <label htmlFor="email" className={styles.label}>Email</label>
                            <input type="email" id='email' placeholder='Email' className={styles.input} maxLength={70} onChange={handleChange}/>
                        </div>

                        <div className={styles.labelInputContainer}>
                            <label htmlFor="phone" className={styles.label}>Número de teléfono (con código de país)</label>
                            <input type="number" id='phone' placeholder='Ej: +541123456789' className={styles.input} maxLength={3} onChange={handleChange}/>
                        </div>

                        <div className={styles.labelInputContainer}>
                            <label htmlFor="password" className={styles.label}>contraseña</label>
                            <input type="password" id='password' placeholder='Contraseña' className={styles.input} maxLength={40} onChange={handleChange}/>
                        </div>

                        <button type='submit' className={styles.submitButton}>Crear cuenta</button>
                    </form>
                </div>

                <p className={styles.createAccountText}>¿Ya tienes una cuenta? <Link className={styles.createAccountLink} href={'/ingresar'}>Ingresa</Link>.</p>
            </div>
        </main>
    )
}