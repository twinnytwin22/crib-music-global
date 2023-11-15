'use client'
import useFormStateContext, { IFormContextProps, } from "app/context/FormContext";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { StepButtons } from "../StepButtons";
import { IFormProps } from "../types";

export const Step4 = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const {
    setFormState,
    reset,
    form_questions,
    max,
    register,
    setValue,
    setStep,
    handleSubmit,
    step,
    defaultValues
  } = useFormStateContext();
    const router = useRouter();
    const pathname = usePathname();
  //console.log(watch(), song_title)
    const handleCheckboxChange = (e) => {
      const {value:option} = e.target
      // Toggle selected options
      if (selectedOptions.includes(option)) {
        setSelectedOptions((prevOptions) =>
          prevOptions.filter((item) => item !== option)
        );
      } else {
        setSelectedOptions((prevOptions) => [...prevOptions, option]);
      }
  
      // Update form value
      setValue(`form_questions.2.response`, selectedOptions);
    };
    const onSubmit: SubmitHandler<IFormProps | IFormContextProps | any> = async (
      formData
      ) => {
        if (step === max) {
          setValue(`form_questions.2.response`, selectedOptions);

          try {
            const updates: IFormProps | IFormContextProps | any = {
              ...formData,
              subject: formData.form_type
            };
    
            const res = await fetch(
              "/api/contact/requests/business-inquiry/",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates),
              }
            );
    
            if (res.ok) {
              toast.success("Your message was sent successfully");
              reset()
              setFormState(defaultValues)
              setStep(1)
              router.push(pathname, { scroll: false });
            }
          } catch (err) {
            console.error("Error sending email. Please try again later.");
          }
        }
      };
    
    
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="mb-8 text-base text-center text-zinc-500 dark:text-zinc-300">
          {form_questions[2].question}
        </p>
        <div className="relative z-0 w-full mb-6 group flex flex-wrap gap-2 justify-center">
          {
           form_questions[2]?.options?.map((option, i: number) => {

            const checked = selectedOptions.includes(option)
            //console.log(formResponse, 'FR')
            return (
              <div
                className="flex gap-2 p-2 border rounded hover:bg-zinc-100 dark:hover:bg-zinc-950 border-zinc-300 dark:border-zinc-800 me-2 items-center h-fit"
                key={i}
              >
                <input
                  {...register(`form_questions.2.response`, { required: "Please select at least one intended use." })}

                 checked={checked}
                  type="checkbox"
                  value={option}
                  onChange={handleCheckboxChange} // Set the value on change
                  // name={`response_3`}
                  id={option}
                  className=" accent-red-300"
                //placeholder=" "
                //required
                />

                <label htmlFor={option} className="text-sm">
                  {option}
                </label>
              </div>
            )})}
        </div>
        <StepButtons/>
      </form>
    );
  };