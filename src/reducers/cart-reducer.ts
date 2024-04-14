import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

export type CartActions = 
  { type: 'add-to-cart', payload: {item: Guitar}} |
  { type: 'remove-from-cart', payload: {id: Guitar['id']}} |
  { type: 'decrease-quantity', payload: {id: Guitar['id']}} |
  { type: 'increase-quantity', payload: {id: Guitar['id']}} |
  { type: 'clear-cart'} 

export type CartState = {
  data: Guitar[]
  cart: CartItem[]   
}

// Verificar si loalStorage tiene algo
const initialCart = () : CartItem[] => {
  const localStorageCart = localStorage.getItem('cart')
  return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const initialState : CartState = {
  data: db,
  cart: initialCart()
}

const MIN_ITEMS = 1
const MAX_ITEMS = 5

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions 
) => {

  if(action.type === 'add-to-cart'){

    const itemExists = state.cart.find((guitar) => guitar.id === action.payload.item.id)
    let updateCart : CartItem[] = [] 

    // Comprobar si ya existe o no
    if(itemExists) {
    // Sumar un nuevo item
    updateCart = state.cart.map(item => {
      if(item.id === action.payload.item.id){
        if(item.quantity < MAX_ITEMS){
          return {...item, quantity: item.quantity + 1}
        } else {
          return item
        }
      } else {
        return item
      }
    })
  } else {
    // Agregar un nuevo item
    const newItem : CartItem = {...action.payload.item, quantity : 1}
    updateCart = [...state.cart, newItem]
  }
    return {
      ...state,
      cart: updateCart
    }
  }

  // Eliminar item del carrito
  if(action.type === 'remove-from-cart'){
    const cart = state.cart.filter( item => item.id !== action.payload.id )
    return {
      ...state,
      cart
    }
  }

  if(action.type === 'decrease-quantity'){

    // Decrementar elementos
    const cart = state.cart.map( item => {
      if(item.id === action.payload.id && item.quantity > MIN_ITEMS){
        return{
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    return {
      ...state,
      cart
    }
  }

  // Incrementar elementos
  if(action.type === 'increase-quantity'){
    const cart = state.cart.map( item => {
      if(item.id === action.payload.id && item.quantity < MAX_ITEMS){
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })

    return {
      ...state,
      cart
    }
  }

  // Limpiar el carrito
  if(action.type === 'clear-cart'){
    return {
      ...state,
      cart: []
    }
  }
}