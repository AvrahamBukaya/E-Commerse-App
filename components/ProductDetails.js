import { useState } from 'react'
import Link from 'next/link'
import Notification from './Notification'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux'
import { add } from '../redux/cartSlice'
import Style from '../styles/Products.module.css'






const ProductDetails = ({ data }) => {

    const [product, setProduct] = useState(data);
    const [pushNotification, setPushNotification] = useState(false);
    const dispatch = useDispatch();
    const data_products = useSelector(state => state.cart.products);



    const handleInc = () => {
        setProduct(prev => ({ ...prev, qnt: Number(prev.qnt) + 1 }));

    }

    const handleDecr = () => {
        product.qnt > 0 ? setProduct(prev => ({ ...prev, qnt: prev.qnt - 1 })) : setProduct(prev => ({ ...prev, qnt: 0 }));
    }



    const handleClick = () => {

        dispatch(add(product));



    }




    return <>
        {/* <CssBaseline /> */}
        {pushNotification && <Notification img={product.image} />}
        <Container maxWidth="sm" className={Style.card_wrapper}>
            <Box>
                <div className={Style.cardImage}>
                    <img src={product.image} width={300} height={200}></img>
                </div>
                <div className={Style.cardInfo}>
                    <h2>{product.name}</h2>
                    <b>Description:</b><br />
                    {product.desc}<br /><br />
                    <b>Price:</b>{product.price}$
                </div>
            </Box>
            <br />
            <Stack direction="row" spacing={5} className={Style.qnt}>
                <Button variant="contained" color="success" onClick={handleDecr}>-</Button>
                <span>{product.qnt}</span>
                <Button variant="contained" color="success" onClick={handleInc}>+</Button>
                <Button onClick={handleClick} >Add To Cart</Button>
            </Stack>


        </Container>
        <Container maxWidth="xs" className={Style.prd_btn_wrapper}>
            <Link href="/"><Button size='small' variant="contained">Home</Button></Link>
            <Link href="/cart"><Button size="small" variant="contained">Continue To Cart</Button></Link>
        </Container>




    </>
}

export default ProductDetails;