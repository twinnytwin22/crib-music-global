"use client";

import useFormStateContext from "app/context/FormContext";
import { StepButtons } from "../StepButtons";

export const Step3 = () => {
  const {
    form_questions,
    setFormState,
    register,
    setValue,
    handleSubmit,
    incrementStep,
  } = useFormStateContext();
  const onSubmit = (data) => {
    setFormState(data);
    incrementStep();
  };
  //  console.log(watch())
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-8 text-sm text-zinc-900 dark:text-zinc-300 text-center">
        {form_questions[1]?.question}
      </p>
      {form_questions[1]?.options?.map((option, i: number) => (
        <div className="relative z-0 w-full mb-3 group" key={i}>
          <input
            {...register(`form_questions.1.response`, {
              required: "A response is required",
            })}
            type="radio"
            value={option?.size}
            onChange={() => setValue(`form_questions.1.response`, option?.size)} // Set the value on change
            id={option?.size}
            className="hidden py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
          />
          <label
            htmlFor={option?.size}
            className={`inline-flex items-center justify-between w-full p-5 text-black bg-white border-2 border-zinc-200 rounded-lg cursor-pointer  dark:border-zinc-800 peer-checked:border-red-300   dark:peer-checked:text-zinc-300 peer-checked:text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:bg-zinc-950 dark:hover:bg-zinc-900`}
          >
            <div className="block">
              <div className="w-full text-base font-medium">{option?.size}</div>
              <div className="w-full text-sm">
                {option?.count + " Employees" || ""}
              </div>
            </div>
          </label>
        </div>
      ))}

      <div className="flex justify-between items-center">
        <StepButtons />
      </div>
    </form>
  );
};
