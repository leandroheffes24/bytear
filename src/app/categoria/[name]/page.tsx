'use client'

import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/header/header";
import ProductosPorCategoria from "@/app/components/productosPorCategoria/productosPorCategoria";
import { useParams } from "next/navigation";

export default function Page(){
    const params = useParams()
    const categoryName: string = Array.isArray(params?.name) ? params?.name[0] : params?.name || ""
    return(
        <>
            <Header/>
            <ProductosPorCategoria categoryName={categoryName}/>
            <Footer/>
        </>
    )
}