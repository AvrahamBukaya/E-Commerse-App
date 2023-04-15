import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';





const Navbar = () => {

    const totalItems = useSelector(state => state.cart.totalProducts);

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));



    return <nav>
        <div className='icon'>
            AB Online Market
            <Image className='img' src='/icon_web.jpg' width={30} height={30} alt="icon_site" />
        </div>

        <Button><Link href="/" className='link'>Home</Link></Button>
        <Button><Link href="/products" className='link'>products</Link></Button>
        <Button><Link href="/customers" className='link'>customers</Link></Button>

        {/**Cart Icon */}

        {/* 
        <Button className='cart_icon'> <Link href='/cart' className='icon_cart'>{totalItems}<Image src={'/cart-shopping.svg'} width={40} height={40} alt="cart icon"></Image></Link></Button> */}
        <Link href="/cart">
            <IconButton aria-label="cart">
                <StyledBadge badgeContent={totalItems} color="secondary">
                    <ShoppingCartIcon />
                </StyledBadge>
            </IconButton>
        </Link>
    </nav >
}

export default Navbar;