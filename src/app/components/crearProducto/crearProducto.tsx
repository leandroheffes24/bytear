'use client'
import { useRef, useState } from "react";
import axios from 'axios'
import styles from "../../../../styles/crearProducto.module.scss"

export default function CrearProducto (){
    const [product, setProduct] = useState({
        name: "",
        discount_price: 0,
        not_discount_price: 0,
        stock: 0,
        description: "",
        category_id: "",
        brand_id: "",
        image: ""
    })

    const form = useRef<HTMLFormElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setProduct({
            ...product,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await axios.post("/api/products", product)
        console.log(res);
        if(form.current){form.current.reset()}
    }

    return(
        <form className={styles.createProductForm} onSubmit={handleSubmit} ref={form}>
            <div className={styles.labelAndInputContainer}>
                <label className={styles.labelForm} htmlFor="name">Nombre del producto</label>
                <input className={styles.inputForm} type="text" placeholder="name" id="name" onChange={handleChange} />
            </div>

            <div className={styles.labelAndInputContainer}>
                <label className={styles.labelForm} htmlFor="discount_price">Precio con descuento</label>
                <input className={styles.inputForm} type="number" placeholder="0.00" id="discount_price" onChange={handleChange} />
            </div>

            <div className={styles.labelAndInputContainer}>
                <label className={styles.labelForm} htmlFor="not_discount_price">Precio sin descuento</label>
                <input className={styles.inputForm} type="number" placeholder="0.00" id="not_discount_price" onChange={handleChange} />
            </div>

            <div className={styles.labelAndInputContainer}>
                <label className={styles.labelForm} htmlFor="stock">Stock disponible</label>
                <input className={styles.inputForm} type="number" placeholder="10" id="stock" onChange={handleChange} />
            </div>

            <div className={styles.labelAndInputContainer}>
                <label className={styles.labelForm} htmlFor="description">Descripción</label>
                <textarea className={styles.inputForm} name="description" id="description" maxLength={999} onChange={handleChange}></textarea>
            </div>

            <div className={styles.labelAndInputContainer}>
                <label className={styles.labelForm} htmlFor="category_id">Categoría</label>
                <select name="category_id" id="category_id" onChange={handleChange}>
                    <option value="" defaultChecked></option>
                    <option value="e0f39834-c598-4a87-b0c9-b4c0b93e4887">Monitores</option>
                    <option value="COMPUTADORAS">Computadoras</option>
                </select>
            </div>

            <div className={styles.labelAndInputContainer}>
                <label className={styles.labelForm} htmlFor="brand_id">Marca</label>
                <select name="brand_id" id="brand_id" onChange={handleChange}>
                    <option value="" defaultChecked></option>
                    <option value="e11c2caf-d54b-4be2-8b89-7553bb3bb4c3">Logitech</option>
                    <option value="ASUS">ASUS</option>
                </select>
            </div>

            <div className={styles.labelAndInputContainer}>
                <label className={styles.labelForm} htmlFor="image">Imágen</label>
                <input type="file" id="image" onChange={handleChange} />
            </div>

            <button className={styles.submitButton} type="submit">Crear producto</button>
        </form>
    )
}