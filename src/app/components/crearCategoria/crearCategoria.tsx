'use client'
import { useRef, useState } from "react";
import axios from 'axios'
import styles from "../../../../styles/crearProducto.module.scss"
import { useRouter } from "next/navigation";

export default function CrearCategoria (){
    const [category, setCategory] = useState({
        name: "",
        image: null
    })

    const form = useRef<HTMLFormElement>(null)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if(e.target instanceof HTMLInputElement && e.target.type === "file"){
            setCategory({
                ...category,
                [e.target.id]: e.target.files ? e.target.files[0] : null
            })            
        } else {
            setCategory({
                ...category,
                [e.target.id]: e.target.value
            })
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", category.name)
        if(category.image){
            formData.append("image", category.image)
        }

        try {
            const res = await axios.post("/api/categories", formData)
            console.log(res);
            if(form.current){form.current.reset()}
            router.push("/")
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <main className={styles.main}>
            <form className={styles.createProductForm} onSubmit={handleSubmit} ref={form}>
                <div className={styles.labelAndInputContainer}>
                    <label className={styles.labelForm} htmlFor="name">Nombre de la categoría</label>
                    <input className={styles.inputForm} type="text" placeholder="nombre" id="name" onChange={handleChange} autoFocus />
                </div>

                <div className={styles.labelAndInputContainer}>
                    <label className={styles.labelForm} htmlFor="image">Imágen</label>
                    <input type="file" id="image" onChange={handleChange} />
                </div>

                <button className={styles.submitButton} type="submit">Crear categoria</button>
            </form>
        </main>
    )
}