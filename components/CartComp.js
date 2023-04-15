import { useSelector, useDispatch } from 'react-redux'
import { remove } from '../redux/cartSlice'
import Button from '@mui/material/Button';
import Style from '../styles/Products.module.css';




const CartComp = () => {
    const data = useSelector(state => state.cart.products);
    const dispatch = useDispatch();

    console.log(data);

    const handleRemoveItem = (e) => {
        const { name: id } = e.target;
        dispatch(remove(id));


    }


    // const [selectedIndex, setSelectedIndex] = useState(1);

    // const handleListItemClick = (event, index) => {
    //     setSelectedIndex(index);
    // };

    return (data.length > 0 ? <ul className={Style.cartWrapper}>
        {
            data?.map(p => {
                return <> <li>
                    <div className={Style.cartItem} key={p.id}>
                        <div>
                            <img src={p?.image} alt="cart item" />
                        </div>
                        <h4>{p.name}</h4>
                        <h5>Quantity:{p.qnt}</h5>
                        <h5>Total Price: {p.price * p.qnt}$</h5>
                        <h6>* price for single item {p.price} $</h6>
                        <hr />
                        <Button fullWidth="true" onClick={handleRemoveItem} name={p.id}>Remove Item</Button>
                    </div>
                </li >
                    <br />
                </>
            })

        }
        {/* <Link href="/checkout"><Button variant='contained'>Continue To Checkout</Button></Link> */}

    </ul > : <div>The Cart is Empty</div>)





}

export default CartComp;