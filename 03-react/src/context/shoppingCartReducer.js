export const initialState = {
    movies: [
        {
            id: 1,
            name: 'Star Wars',
            price: 20,
            quantity: 0
        },
        {
            id: 2,
            name: 'Minions',
            price: 25,
            quantity: 0
        },
        {
            id: 3,
            name: 'Fast and Furious',
            price: 10,
            quantity: 0
        },
        {
            id: 4,
            name: 'The Lord of the Rings',
            price: 5,
            quantity: 0
        }
    ],
    discountRules: [
        {
            m: [3, 2],
            discount: 0.25
        },
        {
            m: [2, 4, 1],
            discount: 0.5
        },
        {
            m: [4, 2],
            discount: 0.1
        }
    ],
    cart: []
}

const shoppingCartReducer = (state, action) => {

    const { type, payload } = action

    switch (type) {

        case 'ADD_ITEM_TO_CART':

            if (state.cart.map(item => item.id).indexOf(payload.id) !== -1) return state;
            return {
                ...state,
                cart: [...state.cart, { ...payload, quantity: 1 }],
            }

        case 'INCREMENT_QUANTITY_OF_ITEM':

            const itemChangedIncreaseCount = state.movies.filter(item => item.id === payload && ({ ...item, quantity: item.quantity += 1 }))
            return {
                ...state,
                cart: [
                    ...state.cart.filter(item => item.id !== payload),
                    ...itemChangedIncreaseCount
                ],
            }

        case 'DECREASE_QUANTITY_OF_ITEM':

            const itemChangedDecreaseCount = state.movies.filter(item => item.id === payload && ({ ...item, quantity: item.quantity -= 1 }))
            if (itemChangedDecreaseCount[0].quantity <= 0) return { ...state, cart: [...state.cart.filter(item => item.id !== payload)] }
            return {
                ...state,
                cart: [
                    ...state.cart.filter(item => item.id !== payload),
                    ...itemChangedDecreaseCount
                ],
            }

        default:

            return state
    }
}

export default shoppingCartReducer;