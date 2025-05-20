import { Button } from "./ui/button";

interface Props {
  onClear: () => void;
  onCheckout: () => void;
}

const CartActions = ({ onClear, onCheckout }: Props) => (
  <div className="flex justify-evenly gap-2 mt-4">
    <Button
      className="w-1/2 h-10 bg-orange-500 hover:bg-orange-700"
      onClick={onClear}
    >
      Clear Cart
    </Button>
    <Button
      className="w-1/2 h-10 bg-green-500 hover:bg-green-700"
      onClick={onCheckout}
    >
      CheckOut
    </Button>
  </div>
);

export default CartActions;
