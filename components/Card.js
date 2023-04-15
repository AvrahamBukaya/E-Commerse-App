// import * as React from 'react';
import { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Style from '../styles/Products.module.css'

export default function ProductCard({ data }) {

    const [showQnt, setShowQnt] = useState(false)

    return (
        <Card sx={{ maxWidth: 300, height: 500 }} >
            <CardMedia
                sx={{ height: 150 }}
                title="green iguana"
                image={`${data.image}`}
                className={Style.card_img} />

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {data.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {data.desc}
                </Typography>
            </CardContent >
            <CardActions className={Style.prd_footer}>

                {/* <Button size="small">Learn More</Button> */}
            </CardActions>
        </Card >
    );
}

