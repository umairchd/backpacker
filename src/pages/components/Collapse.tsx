import { Transition } from "@headlessui/react";
import { FC, Fragment, HTMLProps, useEffect, useState } from "react";

type CollapseProps = {
  open?: boolean;
  openText?: string;
  hideText?: string;
};

const Collapse: FC<HTMLProps<HTMLDivElement> & CollapseProps> = ({
  open,
  openText = "Show More",
  hideText = "Show Less",
  children,
}) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <div>{children}</div>
      </Transition>
      <button
        className="inline-block py-1 font-semibold text-orange-600 cursor-pointer"
        aria-controls="pickup-locations"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? hideText : openText}
      </button>
    </>
  );
};

export default Collapse;
