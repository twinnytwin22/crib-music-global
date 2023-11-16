"use client";
import useFormStateContext, {
  IFormContextProps,
} from "app/context/FormContext";
import { usePathname, useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { IFormProps } from "ui/Forms/types";
import { StepButtons } from "../StepButtons";

export const Step5 = () => {
  const {
    setFormState,
    reset,
    form_questions,
    max,
    register,
    setStep,
    handleSubmit,
    step,
    defaultValues,
  } = useFormStateContext();
  const router = useRouter();
  const pathname = usePathname();
  //console.log(watch(), song_title)
  const onSubmit: SubmitHandler<IFormProps | IFormContextProps | any> = async (
    formData,
  ) => {
    if (step === max) {
      try {
        const updates: IFormProps | IFormContextProps | any = {
          ...formData,
          subject: formData.form_type,
        };

        const res = await fetch("/api/contact/requests/business-inquiry/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });

        if (res.ok) {
          toast.success("Your message was sent successfully");
          reset();
          setFormState(defaultValues);
          setStep(1);
          router.push(pathname, { scroll: false });
        }
      } catch (err) {
        console.error("Error sending email. Please try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative z-0 w-full mb-6 group">
        <p className="mb-8 text-base text-center text-zinc-500 dark:text-zinc-300">
          {form_questions[3]?.question}
        </p>
        <div className="relative z-0 w-full mb-6 ">
          <textarea
            // value={formData.email}
            //   onChange={handleChange}
            {...register(`form_questions.3.response`, { required: true })}
            type="text"
            name="message"
            id="message"
            className="block min-h-[150px] py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
            placeholder=" "
            // required
          />
          <label
            htmlFor="message"
            className="font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            THe details
          </label>
        </div>
      </div>
      {/*
        
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
        </div> */}
      <StepButtons />
    </form>
  );
};
