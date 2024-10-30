'use client'
import { useRef, useState } from "react";
import axios from 'axios'
import styles from "../../../../styles/crearProducto.module.scss"
import { useRouter } from "next/navigation";

export default function CrearCategoria (){
    const [category, setCategory] = useState({
        name: ""
    })

    const form = useRef<HTMLFormElement>(null)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setCategory({
            ...category,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await axios.post("/api/categories", category)
        console.log(res);
        if(form.current){form.current.reset()}
        router.push("/productos")
    }

    return(
        <form className={styles.createProductForm} onSubmit={handleSubmit} ref={form}>
            <div className={styles.labelAndInputContainer}>
                <label className={styles.labelForm} htmlFor="name">Nombre de la categoría</label>
                <input className={styles.inputForm} type="text" placeholder="nombre" id="name" onChange={handleChange} autoFocus />
            </div>

            <button className={styles.submitButton} type="submit">Crear categoria</button>
        </form>
    )
}