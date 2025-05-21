import type { Customer } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props {
  customers: Customer[];
  onSelect: (customerId: string) => void;
}

const CustomerSelect = ({ customers, onSelect }: Props) => (
  <Select onValueChange={onSelect}>
    <SelectTrigger className="w-full p-2 ">
      <SelectValue placeholder="Select a Customer" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Customers</SelectLabel>
        {customers.map((customer) => (
          <SelectItem key={customer._id} value={customer._id}>
            {customer.firstname} {customer.lastname}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default CustomerSelect;
