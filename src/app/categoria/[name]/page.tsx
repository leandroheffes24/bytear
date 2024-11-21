import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/header/header";
import ProductosPorCategoria from "@/app/components/productosPorCategoria/productosPorCategoria";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default function Page(params: Params){
    const categoryName: string = params.params.name
    return(
        <>
            <Header/>
            <ProductosPorCategoria categoryName={categoryName}/>
            <Footer/>
        </>
    )
}