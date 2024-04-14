import { useState, useEffect } from 'react'
import { Guitar, CartItem } from '../types'

const useCart = () => {

  // Verificar si loalStorage tiene algo
  const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [cart, setCart] = useState(initialCart)

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  // Guardar en localStorage auto
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  

  // Incrementar elementos
  function increaseQuantity(id : Guitar['id']){
    const updateCart = cart.map( item => {
      if(item.id === id && item.quantity < MAX_ITEMS){
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  // Decrementar elementos
  function decreaseQuantity(id : Guitar['id']){
    const updateCart = cart.map( item => {
      if(item.id === id && item.quantity > MIN_ITEMS){
        return{
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  // Limpiar el carrito
  function clearCart() {
    setCart([])
  }

  return {
    cart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
  }
}

export default useCart