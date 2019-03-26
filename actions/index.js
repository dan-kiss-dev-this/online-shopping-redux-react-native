export const APPLY_DISCOUNT = "APPLY_DISCOUNT";
export const UPDATE_DISCOUNT_CODE = "UPDATE_DISCOUNT_CODE";

//below is an action creator
export function applyDiscount(price) {
    let newPrice = (price*.9).toFixed(2);
    console.log('you did apply_discount ', newPrice)
    return {
        type: APPLY_DISCOUNT,
        value: newPrice,
    };
}

export function updateDiscountCode(discountCode) {
    console.log(15,discountCode);
    return {
        type: UPDATE_DISCOUNT_CODE,
        value: discountCode,
    };
}