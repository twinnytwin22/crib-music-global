"use client";
import useFormStateContext from "app/context/FormContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { max, min } from "./lib";

export const StepButtons = () => {
  const { decrementStep, step } = useFormStateContext();
  return (
    <div className="flex text-black justify-between space-x-1">
      <div className="flex space-x-1">
        <div
          onClick={decrementStep}
          className={`p-2.5 bg-red-300 h-fit rounded rounded-l-lg hover:bg-red-400 ease-in-out duration-200 items-center text-xs gap-2 ${
            step === min ? "hidden" : "flex"
          }`}
        >
          <FaChevronLeft /> Back
        </div>
        <button
          type={"submit"}
          // onClick={incrementStep}
          className={`p-2.5 bg-red-300 h-fit rounded rounded-r-lg hover:bg-red-400 ease-in-out duration-200 items-center text-xs gap-2 ${
            step === max ? "hidden" : "flex"
          }`}
        >
          Next <FaChevronRight />
        </button>
      </div>
      <input
        type="submit"
        //placeholder="Next"
        className={`p-2.5 bg-red-300 h-fit rounded rounded-r-lg hover:bg-red-400 ease-in-out duration-200 items-center text-xs gap-2 ${
          step !== max ? "hidden" : "flex"
        }`}
      />
    </div>
  );
};
