import { APPLY_DISCOUNT, UPDATE_DISCOUNT_CODE } from '../actions'

const defaultState = {
    objectInCart: {
      name: 'Essentials by OFM Essentials Racecar-Style Leather Gaming Chair, Red',
      details: 'Details: this chair is so fancy, is comes in lots of cool colors and can be adjusted in over 12 ways. Great for coders.',
      imageURL: 'https://i5.walmartimages.com/asr/e73e1252-642c-4473-93ea-fd3b564a7027_1.3e81ea58fa3042452fe185129a4a865f.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
      priceItem: 104.99,
      tax: 9.97,
      pickupSavings: 3.99,
      priceFull: 110.97,
      priceFinal: 110.97,
      discountAmount: 0,
    },
    discountCode: '',
  }

export const baseReducer = (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_DISCOUNT_CODE:
            return {
                ...state,
                discountCode: action.value
            }
        case APPLY_DISCOUNT:
            return {
                ...state,
                objectInCart: { ...state.objectInCart, priceFinal : action.value }
            }
        default:
            return state;
    }
}