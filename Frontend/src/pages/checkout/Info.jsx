import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import {useSelector} from "react-redux"
import { currenyTRY } from "../../utils/formats";

export default function Info() {
    const { cart } = useSelector((state) => state.cart)

    const total = cart?.cartItems.reduce(
        (toplam, item) => toplam + item.product.price * item.product.quantity, 0 
    )
    
    return (
        <>
        <Typography variant="subtitle2" color={{color:"text.secondary"}}>
            Sepetinizin Toplam Fiyatı
        </Typography>
        <Typography variant="h5" gutterBottom>
            {currenyTRY.format(total)}
        </Typography>
        <List>
            {cart?.cartItems.map((item)=> (
                <ListItem key={item.product.productId}>
                    <ListItemAvatar>
                        <Avatar variant="square" src={`http://localhost:5000/images/${item.product.image}`}/>
                    </ListItemAvatar>
                    <ListItemText primary={item.product.title} secondary={`x${item.product.quantity}`}/>
                    <Typography variant="body1">
                        {currenyTRY.format(item.product.price * item.product.quantity)}
                    </Typography>
                </ListItem>
            ))}
        </List>
        </>
    )
}