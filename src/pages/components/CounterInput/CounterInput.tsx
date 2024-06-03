import { FC } from "react";

interface CounterInputProps {
  id: string;
  value: number;
  onChange: (value: number, id: string) => void;
}

const CounterInput: FC<CounterInputProps> = ({ id, value, onChange }) => (
  <div className="flex">
    <button
      type="button"
      className="rounded-l-32px text-white -mr-1 after:bg-transparent after:inline-block after:absolute after:w-14px after:h-2px after:rounded-1px after:bg-white after:-translate-x-1/2 after:-translate-y-1/2 before:bg-transparent before:inline-block before:absolute before:w-14px before:h-2px before:rounded-1px before:bg-white before:-translate-x-1/2 before:-translate-y-1/2 bg-transparent border-none flex items-center justify-center w-8 h-8 cursor-pointer m-0 relative"
      onClick={() => onChange(value > 0 ? value - 1 : value, id)}
    />
    <input
      type="number"
      className="w-12 h-10 text-2xl border-y border-inputBorder font-bold text-center py-1px px-2px outline-none"
      min={0}
      value={value}
      disabled
    />
    <button
      type="button"
      onClick={() => onChange(value + 1, id)}
      className="rounded-r-32px text-white -ml-1 after:bg-transparent after:inline-block after:absolute after:w-14px after:h-2px after:rounded-1px after:bg-white after:-translate-x-1/2 after:-translate-y-1/2 before:bg-transparent before:inline-block before:absolute before:w-14px before:h-2px before:rounded-1px before:bg-white before:-translate-x-1/2 before:-translate-y-1/2 bg-transparent border-none flex items-center justify-center w-8 h-8 cursor-pointer m-0 relative plus after:rotate-90 after:text-white"
    />
  </div>
);

export default CounterInput;
