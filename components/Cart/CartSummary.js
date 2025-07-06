export default function CartSummary({ totalPrice, onCheckout, onClear }) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Order Summary</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>$2.99</span>
        </div>
        <div className="border-t border-gray-200 pt-2 flex justify-between font-bold">
          <span>Total</span>
          <span>${(totalPrice + 2.99).toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-6 space-y-2">
        <button
          onClick={onCheckout}
          className="w-full btn-primary py-2 px-4"
        >
          Proceed to Checkout
        </button>
        <button
          onClick={onClear}
          className="w-full btn-outline py-2 px-4"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}