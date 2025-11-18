import { Box, Button, Grid2, IconButton, Paper, Typography } from "@mui/material";
import { currenyTRY } from "../utils/formats";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function ProductItem({ product, handleAddItem, handleRemoveItem, cartItem }) {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ lg: 4, md: 5, sm: 6, xs: 12 }}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <img
            src={`http://localhost:5000/images/${product.image}`}
            style={{ width: "100%" }}
          />
        </Paper>
      </Grid2>
      <Grid2 size={{ lg: 8, md: 7, sm: 6, xs: 12 }}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography component="h1" variant="h4" color="secondary.dark">
            {product.title}
          </Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Typography sx={{mt:2}} color="secondary" variant="h5">{currenyTRY.format(product.price)}</Typography>

          {!cartItem || cartItem?.product.quantity === 0 ? (
            <Button variant="contained" color="secondary" sx={{display:"flex", alignItems:"center", gap:"5px", mt:"5px"}} onClick={() => handleAddItem(product.id)}>
              <AddShoppingCartIcon fontSize="small"/>Sepete Ekle
            </Button>
          ) : (
            <Box display="flex" flexDirection="column" gap={1} mt={1}>
              <Typography variant="body2">Sepetinizde bu üründen bulunmaktadır.</Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <IconButton color="primary" onClick={() => handleAddItem(product.id)}>
                  <AddCircleOutlineIcon/>
                </IconButton>
                {cartItem?.product.quantity}
                <IconButton color="primary" onClick={() => handleRemoveItem(product.id)}>
                  <RemoveCircleOutlineIcon/>
                </IconButton>
              </Box>
            </Box>
          )}

        </Paper>
      </Grid2>
    </Grid2>
  );
}
