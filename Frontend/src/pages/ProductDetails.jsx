import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductItem from "../components/ProductItem";
import Loading from "../components/Loading";
import requests from "../api/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, deleteItemFromCart } from "./cart/cartSlice";
import { fetchProductById, selectProductById } from "./catalog/catalogSlice";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const {cart} = useSelector((state) => state.cart);
  const product = useSelector((state) => selectProductById(state, id))
  const { status } = useSelector((state) => state.catalog)
  const dispatch = useDispatch();

  
  const cartItem = cart?.cartItems.find(
    (i) => i.product.productId === product?.id
  )

  function handleAddItem(productId){
    dispatch(addItemToCart({productId: productId}))
  }
  function handleRemoveItem(productId){
    dispatch(deleteItemFromCart({productId: productId}))
  }

  useEffect(() => {
   if(!product && id) dispatch(fetchProductById(id))
  }, [id]);

  if (status === "pendingfetchProductById") return <Loading message="Yükleniyor..." />;

  if (!product) return <h1>Ürün bulunamadı.</h1>;

  return <ProductItem product={product} handleAddItem={handleAddItem} handleRemoveItem={handleRemoveItem} cartItem={cartItem}/>;
}
