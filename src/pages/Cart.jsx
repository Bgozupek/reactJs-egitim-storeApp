import { useState } from "react";
import requests from "../api/apiClient";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { currenyTRY } from "../utils/formats";
import { useCartContext } from "../context/CartContext";

export default function CartPage() {

  const {cart, setCart} = useCartContext();
  const [status, setStatus] = useState({loading:false, id:""})

  function handleAddItem(productId, id){
    setStatus({loading:true, id: id})
    requests.cart.addItem(productId)
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error))
      .finally(setStatus({loading: false, id:""}))
  }
   function handleRemoveItem(productId, id,  quantity= 1){
    setStatus({loading:true, id: id})
    requests.cart.deleteItem(productId,quantity)
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error))
      .finally(setStatus({loading: false, id:""}))
  }

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
                  style={{width: "100%"}} 
                  alt={item.product.title} 
                />
              </TableCell>
              <TableCell>{item.product.title}</TableCell>
              <TableCell>{currenyTRY.format(item.product.price)}</TableCell>
              <TableCell align="center">
                <IconButton color="primary" onClick={() => handleAddItem(item.product.productId, "add"+ item.product.productId)}>
                  {status.loading && status.id === "add"+ item.product.productId ? (
                    <CircularProgress size="20px"/>
                  ) : (
                  <AddCircleOutlineIcon/>
                  )}
                </IconButton>
                {item.product.quantity}
                <IconButton color="primary" onClick={() => handleRemoveItem(item.product.productId, "remove"+ item.product.productId)}>
                  {status.loading && status.id === "remove"+ item.product.productId ? (
                    <CircularProgress size="20px"/>
                  ) : (
                  <RemoveCircleOutlineIcon/>
                  )}
                </IconButton>
              </TableCell>
              <TableCell>{currenyTRY.format(item.product.quantity * item.product.price)}</TableCell>
              <TableCell>
                <IconButton color="error" onClick={() => handleRemoveItem(item.product.productId, "remov_all"+ item.product.productId, item.product.quantity)}>
                  {status.loading && status.id === "remov_all"+ item.product.productId ? (
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
    </TableContainer>
  );
}
