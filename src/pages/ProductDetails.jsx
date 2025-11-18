import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductItem from "../components/ProductItem";
import Loading from "../components/Loading";
import requests from "../api/apiClient";
import { useCartContext } from "../context/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const {cart, setCart} = useCartContext()
  
  const cartItem = cart?.cartItems.find(
    (i) => i.product.productId === product?.id
  )

  function handleAddItem(productId){
    requests.cart.addItem(productId)
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error))
  }
  function handleRemoveItem(productId){
    requests.cart.deleteItem(productId)
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const data = await requests.products.details(id);
        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductDetails();
  }, [id]);

  if (loading) return <Loading message="Yükleniyor..." />;

  if (!product) return <h1>Ürün bulunamadı.</h1>;

  return <ProductItem product={product} handleAddItem={handleAddItem} handleRemoveItem={handleRemoveItem} cartItem={cartItem}/>;
}
