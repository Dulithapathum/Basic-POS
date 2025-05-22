import { CURRENCY_SIGN } from "@/types/constant";
import { Card } from "./ui/card";
import { FaRegTrashAlt } from "react-icons/fa";

interface Props {
  item: any;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartItem = ({ item, onIncrease, onDecrease, onRemove }: Props) => (
  <Card className="w-full flex flex-row items-center justify-between py-2 px-3 rounded-md">
    <img
      src={item.product.image}
      alt={item.product.name}
      width={50}
      className="brightness-80 rounded"
    />
    <div className="flex w-full justify-between items-center">
      <div>
        <h4 className="font-semibold text-sm capitalize lg:text-md">
          {item.product.name}
        </h4>
        <p className="text-gray-500 text-[12px]  mt-1">
          {CURRENCY_SIGN} {item.product.price.toFixed(2)}
        </p>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center">
          <div
            className="w-4 h-4 flex items-center justify-center rounded border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white  transition-colors duration-200 cursor-pointer"
            onClick={onDecrease}
          >
            -
          </div>
          <span className="mx-2 text-gray-600">{item.quantity}</span>
          <div
            className="w-4 h-4 flex items-center justify-center rounded border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white  transition-colors duration-200 cursor-pointer"
            onClick={onIncrease}
          >
            +
          </div>
        </div>
        <p className="text-gray-600 text-[12px]">
          {CURRENCY_SIGN} {(item.product.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
    <button
      className="hover:text-red-500 transition-colors duration-200 cursor-pointer"
      onClick={onRemove}
    >
      <FaRegTrashAlt />
    </button>
  </Card>
);

export default CartItem;
