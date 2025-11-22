import { CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { currenyTRY } from "../../utils/formats";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, deleteItemFromCart } from "./cartSlice";


export default function CartPage() {

  const { cart , status } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cart?.cartItems.reduce(
    (toplam, item) => toplam + item.product.price * item.product.quantity, 0 
  )
  const tax = total * 0.2;
  const subTotal = total - tax;

    if(!cart || !cart.cartItems || cart.cartItems.length === 0)
      return <Typography component="h4">Sepetinizde ürün yok</Typography>

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth:650}}>
        <TableHead>
          <TableRow>
            <TableCell sx={{width: 110}}></TableCell>
            <TableCell>Ürün</TableCell>
            <TableCell sx={{width: 130}}>Fiyat</TableCell>
            <TableCell align="center" sx={{width: 190}}>Adet</TableCell>
            <TableCell sx={{width: 130}}>Toplam</TableCell>
            <TableCell sx={{width: 80}}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.cartItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <img 
                  src={`http://localhost:5000/images/${item.product.image}`}
                  style={{width: "100%", height: "90px", objectFit: "contain"}} 
                  alt={item.product.title} 
                />
              </TableCell>
              <TableCell>{item.product.title}</TableCell>
              <TableCell>{currenyTRY.format(item.product.price)}</TableCell>
              <TableCell align="center">
                <IconButton color="primary" onClick={() => dispatch(addItemToCart({productId: item.product.productId}))}>
                  {status === "pendingAddItem"+ item.product.productId ? (
                    <CircularProgress size="20px"/>
                  ) : (
                  <AddCircleOutlineIcon/>
                  )}
                </IconButton>
                {item.product.quantity}
                <IconButton color="primary" onClick={() => dispatch(deleteItemFromCart({productId: item.product.productId, quantity: 1, key : "single"}))}>
                  {status === "pendingDeleteItem"+ item.product.productId + "single" ? (
                    <CircularProgress size="20px"/>
                  ) : (
                  <RemoveCircleOutlineIcon/>
                  )}
                </IconButton>
              </TableCell>
              <TableCell>{currenyTRY.format(item.product.quantity * item.product.price)}</TableCell>
              <TableCell>
                <IconButton color="error" onClick={() => dispatch(deleteItemFromCart({productId: item.product.productId, quantity: item.product.quantity, key : "all"}))}>
                  {status === "pendingDeleteItem"+ item.product.productId + "all" ? (
                    <CircularProgress size="20px"/>
                  ) : (
                  <DeleteIcon/>
                  )}
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Table sx={{minWidth:650}}>
        <TableBody>
            <TableRow>
              <TableCell align="right" sx={{display:"flex", gap:3}}>
                <Typography>{currenyTRY.format(subTotal)}</Typography>
                <Typography>Ara Toplam</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" sx={{display:"flex", gap:3}}>
                <Typography>{currenyTRY.format(tax)}</Typography>
                <Typography>Vergi</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" sx={{display:"flex", gap:3}}>
                <Typography>{currenyTRY.format(total)}</Typography>
                <Typography>Toplam</Typography>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>      
    </TableContainer>
  );
}
