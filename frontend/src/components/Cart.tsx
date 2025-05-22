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

import { showToast } from "@/utils/toast";
import type { Customer } from "@/types/types";
import { fetchProducts } from "@/store/slices/ProductSlice";
import { SHIPPING_COST } from "@/types/constant";

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
  const shippingCost = totalQuantity * SHIPPING_COST;
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
        showToast("warning", "Please select a customer before checkout.");
        return;
      }

      if (Items.items.length === 0) {
        showToast("warning", "Cart is empty.");
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
      dispatch(fetchProducts());
    } catch (error) {
      console.error("Checkout failed:", error);
      showToast("error", "Checkout failed. Please try again.");
    }
  };

  const handleIncrease = (item: any) => {
    if (item.quantity >= item.product.countInStock) {
      showToast("warning", "Cannot add more. Product is out of stock.");
    } else {
      dispatch(increaseQuantity(item.product._id));
    }
  };

  return (
    <div className=" w-140 lg:w-140 h-screen flex flex-col justify-between  shadow-md bg-white">
      <div>
        <div className="w-full bg-white h-10 p-2 shadow-sm mb-6">
          <h2 className="font-semibold text-md lg:text-lg">Cart Items</h2>
        </div>
        <div className="mx-2">
          <CustomerSelect
            customers={customers}
            onSelect={handleCustomerSelect}
          />
        </div>
        <div className="p-2 ">
          {cartItems.length === 0 ? (
            <div className="h-80 w-full flex flex-col justify-center items-center">
              <LucideShoppingBag className="w-8 h-8 text-orange-400 mb-3" />
              <h2 className="text-orange-400 text-lg font-semibold">
                Your cart is empty
              </h2>
            </div>
          ) : (
            <div className="flex flex-col gap-1 my-2 h-71 lg:h-80 overflow-y-auto overflow-x-hidden">
              {cartItems.map((item) => (
                <CartItem
                  key={item.product._id}
                  item={item}
                  onIncrease={() => handleIncrease(item)}
                  onDecrease={() =>
                    dispatch(decreaseQuantity(item.product._id))
                  }
                  onRemove={() =>
                    dispatch(removeItemFromCart(item.product._id))
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-2">
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
