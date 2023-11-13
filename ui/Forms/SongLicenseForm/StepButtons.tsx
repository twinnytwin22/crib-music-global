import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { isInRange, max, min } from "./lib";

export const StepButtons = ({
    step,
    set,
  }: {
    step: number;
    set: (step: number) => void;
  }) => {
    const incrementStep = () => {
      const newStep = step + 1;
      if (isInRange(newStep)) {
        set(newStep);
      }
    };
    const decrementStep = () => {
      const prevStep = step - 1;
      if (isInRange(prevStep)) {
        set(prevStep);
      }
    };
  
    return (
      <div className="flex text-black space-x-1">
        <div
          onClick={decrementStep}
          className={`p-2.5 bg-red-300 h-fit rounded rounded-l-lg hover:bg-red-400 ease-in-out duration-200 items-center text-xs gap-2 ${step === min ? "hidden" : "flex"
            }`}
        >
          <FaChevronLeft /> Back
        </div>
        <div
          onClick={incrementStep}
          className={`p-2.5 bg-red-300 h-fit rounded rounded-r-lg hover:bg-red-400 ease-in-out duration-200 items-center text-xs gap-2 ${step === max ? "hidden" : "flex"
            }`}
        >
          Next <FaChevronRight />
        </div>
      </div>
    );
  };
  