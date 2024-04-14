import { useState, useEffect } from 'react'
import { Guitar, CartItem } from '../types'

const useCart = () => {

  // Verificar si loalStorage tiene algo
  const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [cart, setCart] = useState(initialCart)

  // Guardar en localStorage auto
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Limpiar el carrito
  function clearCart() {
    setCart([])
  }

  return {
    cart,
    clearCart,
  }
}

export default useCart