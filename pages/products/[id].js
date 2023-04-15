import { getAll, getById } from '../../firebase/utils';
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
const ProductDetails = dynamic(() => import('./../../components/ProductDetails'));



export const getServerSidePaths = async () => {

    const data = await getAll("Products");

    const paths = data.map(p => ({
        params: {
            id: p.id
        }
    }))

    return {
        paths,
        fallback: false
    }

}

export const getServerSideProps = async (context) => {
    const id = context.params.id;
    const data = await getById("Products", id);


    return {
        props: {
            data
        }
    }

}



const Details = ({ data }) => {

    return <Suspense><ProductDetails data={data} /></Suspense>


}

export default Details;