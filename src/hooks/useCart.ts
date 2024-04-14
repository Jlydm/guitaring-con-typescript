import { useState, useEffect, useMemo } from 'react'
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

  function addToCart(item : Guitar) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id)
    // Comprobar si ya existe o no
    if(itemExists >= 0) {
      // Sumar un nuevo item
      if(cart[itemExists].quantity >= MAX_ITEMS) return
      const updateCart = [...cart]
      updateCart[itemExists].quantity++
      setCart(updateCart)
    }else{
      // Agregar un nuevo item
      const newItem : CartItem = {...item, quantity : 1}
      setCart([...cart, newItem])
    }
  }

  // Eliminar item del carrito
  function removeFromCart(id : Guitar['id']){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

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

  // State Derivado
  const isEmpty = useMemo( () => cart.length === 0, [cart])
  const cartTotal = useMemo( () => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart] )

  return {
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart, 
    isEmpty,
    cartTotal
  }
}

export default useCart