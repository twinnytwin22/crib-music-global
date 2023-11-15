"use client";

import { StepButtons } from "../StepButtons";
import { useFormStateContext } from "../formContext";

export const Step1 = () => {
  const {
    setFormState,
    onHandleBack,
    register,
    setValue,
    watch,
    handleSubmit,
    incrementStep,
    decrementStep,
  } = useFormStateContext();

  const onSubmit = (data) => {
    setFormState(data);
    incrementStep();
  };

  return (
    <form className=" w-full mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            //defaultValue={first_name}
            // value={formData?.first_name}
            //onChange={handleChange}
            type="text"
            //  name="first_name"
            id="first_name"
            className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
            placeholder=" "
            //  required
            {...register("first_name", { required: true })}
          />
          <label
            htmlFor="first_name"
            className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            First name
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            // defaultValue={last_name}
            // value={formData.last_name}
            //onChange={handleChange}
            {...register("last_name", { required: true })}
            type="text"
            name="last_name"
            id="last_name"
            className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
            placeholder=" "
            // required
          />
          <label
            htmlFor="last_name"
            className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Last name
          </label>
        </div>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          // value={formData.email}
          //   onChange={handleChange}
          {...register("email", { required: true })}
          type="email"
          name="email"
          id="email"
          className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
          placeholder=" "
          // required
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email address
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          // value={formData.website}
          //  onChange={handleChange}
          {...register("website", { required: true })}
          type="url"
          name="website"
          id="website"
          className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
          placeholder=" "
          // required
        />
        <label
          htmlFor="website"
          className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Your website URL
        </label>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            //  value={formData.phone_number}
            //  onChange={handleChange}
            {...register("phone_number", { required: true })}
            type="tel"
            name="phone_number"
            id="phone_number"
            className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
            placeholder=" "
            // required
          />
          <label
            htmlFor="phone_number"
            className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone number (123-456-7890)
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            // value={formData.company_name}
            {...register("company_name", { required: true })}
            // onChange={handleChange}
            type="text"
            name="company_name"
            id="company_name"
            className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
            placeholder=" "
            // required
          />
          <label
            htmlFor="company_name"
            className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Company (Ex. Google)
          </label>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <StepButtons />
      </div>
    </form>
  );
};
