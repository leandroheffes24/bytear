'use client'
import { useRef, useState, useEffect } from "react";
import axios from 'axios'
import styles from "../../../../styles/crearProducto.module.scss"
import { useRouter } from "next/navigation";
import { Brand, Category } from "@/interfaces/types";

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
    const router = useRouter()
    const [categories, setCategories] = useState<Category[]>([])
    const [brands, setBrands] = useState<Brand[]>([])

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const {data} = await axios.get<Category[]>(`${process.env.NEXT_PUBLIC_URL_WEBSITE}/api/categories`)
                setCategories(data)
            } catch (error) {
                console.error("Error cargando categorías", error)
            }
        }

        const loadBrands = async () => {
            try {
                const {data} = await axios.get<Brand[]>(`${process.env.NEXT_PUBLIC_URL_WEBSITE}/api/brands`)
                setBrands(data)
            } catch (error) {
                console.error("Error cargando marcas", error)
            }
        }

        loadCategories()
        loadBrands()       
    }, [])

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
        router.push("/productos")
    }

    return(
        <form className={styles.createProductForm} onSubmit={handleSubmit} ref={form}>
            <div className={styles.labelAndInputContainer}>
                <label className={styles.labelForm} htmlFor="name">Nombre del producto</label>
                <input className={styles.inputForm} type="text" placeholder="name" id="name" onChange={handleChange} autoFocus />
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
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className={styles.labelAndInputContainer}>
                <label className={styles.labelForm} htmlFor="brand_id">Marca</label>
                <select name="brand_id" id="brand_id" onChange={handleChange}>
                    <option value="" defaultChecked></option>
                    {brands.map(brand => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
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