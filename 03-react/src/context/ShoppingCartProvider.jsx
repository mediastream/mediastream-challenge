import {createContext, useContext, useReducer} from 'react'
import shoppingCartReducer, { initialState } from './shoppingCartReducer'

export const ShoppingCardContext = createContext()

export default function ShoppingCardProvider({children}){

    return (
        <ShoppingCardContext.Provider
         value={useReducer(shoppingCartReducer, initialState)}
        >
            {children}
        </ShoppingCardContext.Provider>
    )
}

export const useStore =() => useContext(ShoppingCardContext)[0]
export const useDispatch =() => useContext(ShoppingCardContext)[1]