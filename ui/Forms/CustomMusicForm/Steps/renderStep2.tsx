'use client'

import useFormStateContext from "app/context/FormContext";
import { StepButtons } from "../StepButtons";

export const Step2 = () => {

  const {
    setFormState,
    register,
    setValue,
    watch,
    handleSubmit,
    incrementStep,
    form_questions
  } = useFormStateContext();
  const onSubmit = (data) => {
    setFormState(data);
    incrementStep();
  }

  //console.log(checked)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-8 text-base text-zinc-900 dark:text-zinc-300 text-center">
        {form_questions[0]?.question}
      </p>
      {form_questions[0]?.options?.map((option, index: number) => {
        const formResponse = watch(`form_questions.0.response`)
        const checked = formResponse === option
        return (
          <div className="relative z-0 w-full mb-3 group form-g" key={option}>
            <input
              {...register(`form_questions.0.response`, { required: true })}
              checked={checked}
              type="radio"
              value={option}
              onChange={() => setValue(`form_questions.0.response`, option)} // Set the value on change
              id={option[index]} // Use index to generate unique IDs
              className="hidden py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
            />
            <label
              htmlFor={option[index]} // Use index to generate unique IDs
              className={`inline-flex items-center justify-between w-full p-5 text-black bg-white border-2 border-zinc-200 rounded-lg cursor-pointer  dark:border-zinc-800 peer-checked:border-red-300   dark:peer-checked:text-zinc-300 peer-checked:text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:bg-zinc-950 dark:hover:bg-zinc-900  ${formResponse === option && ''}`}
            >
              <div className="block">
                <div className="w-full text-lg font-medium">{option}</div>
                <div className="w-full text-sm"></div>
              </div>
            </label>
          </div>
        )
      })}
      <StepButtons />

    </form>
  );
};