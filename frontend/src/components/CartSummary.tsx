interface Props {
  subtotal: number;
  shipping: number;
  total: number;
}

const CartSummary = ({ subtotal, shipping, total }: Props) => (
  <div className="p-2 bg-gray-100 w-full rounded">
    <div className="flex justify-between">
      <h3 className="text-gray-600 font-semibold mt-1">Subtotal :</h3>
      <span className="text-gray-800 font-semibold">
        ${subtotal.toFixed(2)}
      </span>
    </div>
    <div className="flex justify-between">
      <h3 className="text-gray-600 font-semibold mt-1">Shipping Cost :</h3>
      <span className="text-gray-800 font-semibold">
        ${shipping.toFixed(2)}
      </span>
    </div>
    <div className="flex justify-between">
      <h3 className="text-gray-600 font-semibold mt-1">Total Price :</h3>
      <span className="text-orange-500 font-semibold">${total.toFixed(2)}</span>
    </div>
  </div>
);

export default CartSummary;
