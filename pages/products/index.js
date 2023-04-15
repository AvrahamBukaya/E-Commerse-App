
import { getAll } from '../../firebase/utils'
import Product from '../../components/Product'
import Style from '../../styles/Products.module.css'
import Link from 'next/link'


export const getServerSideProps = async () => {

    const data = await getAll("Products");

    return {
        props: {
            data
        }
    }





}


const Products = ({ data }) => {


    return <article>
        <section className={Style.product_header}>
            <h4>Products </h4>
        </section>
        <hr />

        <section className={Style.products_wrapper}>

            {data.map(p => {
                return <Link href={`/products/${p.id}`} key={p.id}>
                    <Product data={p} />
                </Link>
            })}
        </section></article>
}

export default Products;