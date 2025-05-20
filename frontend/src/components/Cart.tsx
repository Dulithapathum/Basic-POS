import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { LucideShoppingBag } from "lucide-react";

import type { RootState, AppDispatch } from "../store/Store";
import {
  removeItemFromCart,
  increaseQuantity,
  decreaseQuantity,
  setCustomerId,
  clearCart,
} from "../store/slices/CartSlice";

import CustomerSelect from "./CustomerSelect";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import CartActions from "./CartActions";
import type { Customer } from "./CustomerTable";
import { showToast } from "@/utils/toast";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const Items = useSelector((state: RootState) => state.cart);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subTotalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );
  const shippingCost = totalQuantity * 5;
  const totalPrice = subTotalPrice + shippingCost;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/customers`
        );
        setCustomers(response.data.data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  const handleCustomerSelect = (customerId: string) => {
    dispatch(setCustomerId(customerId));
  };

  const handleClearCart = () => dispatch(clearCart());

  const handleCheckout = async () => {
    try {
      if (!Items.customerId) {
        showToast("error", "Please select a customer before checkout.");
        return;
      }

      if (Items.items.length === 0) {
        showToast("error", "Cart is empty.");
        return;
      }
      await axios.post(`${import.meta.env.VITE_API_URL}/api/cart`, {
        customerId: Items.customerId,
        items: Items.items.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
      });

      showToast("success", " Checkout successful");
      dispatch(clearCart());
    } catch (error) {
      console.error("Checkout failed:", error);
      showToast("error", "Checkout failed. Please try again.");
    }
  };

  return (
    <div className="w-150 shadow-md bg-white">
      <div className="w-full bg-white h-15 p-5 shadow-sm">
        <h2 className="font-semibold text-lg">Cart Items</h2>
      </div>

      <div className="p-4">
        <CustomerSelect customers={customers} onSelect={handleCustomerSelect} />

        {cartItems.length === 0 ? (
          <div className="h-100 w-full flex flex-col justify-center items-center">
            <LucideShoppingBag className="w-10 h-10 text-orange-400 mb-2" />
            <h2 className="text-orange-400 text-xl font-semibold">
              Your cart is empty
            </h2>
          </div>
        ) : (
          <div className="flex flex-col gap-2 my-5 h-92 overflow-y-auto overflow-x-hidden">
            {cartItems.map((item) => (
              <CartItem
                key={item.product._id}
                item={item}
                onIncrease={() => dispatch(increaseQuantity(item.product._id))}
                onDecrease={() => dispatch(decreaseQuantity(item.product._id))}
                onRemove={() => dispatch(removeItemFromCart(item.product._id))}
              />
            ))}
          </div>
        )}

        <CartSummary
          subtotal={subTotalPrice}
          shipping={shippingCost}
          total={totalPrice}
        />
        <CartActions onClear={handleClearCart} onCheckout={handleCheckout} />
      </div>
    </div>
  );
};

export default Cart;
