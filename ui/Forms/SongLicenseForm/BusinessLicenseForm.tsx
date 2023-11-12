"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { toast } from "react-toastify";
interface FormQuestions {
  question: string | undefined;
  response: string | string[] | undefined;
  options?: any[] | null | undefined

}

export interface BusinessLicenseFormProps {
  email: string | undefined;
  subject: string | undefined;
  message: string | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
  phone_number: string | undefined;
  website: string | undefined;
  company_name: string | undefined;
  linkedin_profile: string | undefined;
  form_questions?: FormQuestions[];
  form_type?: string | undefined;
  id: string | number;
  song_title: string | null
}

const min = 1;
const max = 4;
const isInRange = (s: number) => s >= min && s <= max;

function BusinessLicenseForm({ song }) {
  const questions = [
    {
      q: 'What type of license is needed?',
      options: [
        "Individual", "Business"
      ]
    },
    {
      q: "How big is your company?",
      options: [
        {
          size: 'Small',
          count: '1-50'
        },
        {
          size: 'Medium',
          count: '51-250'
        },
        {
          size: "Large",
          count: '250+'
        }
      ]
    },
    { q: "What is your intended use?",
   options: [
      "Web/Social", "Industrial", "Internal", "Podcast", "VOD/OTT", "Film Festival", "Video Games", "Broadcast"
   ] },
  ];
  const router = useRouter();
  const pathname = usePathname()
  const initialState: BusinessLicenseFormProps = {
    id: song?.id,
    song_title: song?.title,
    email: "",
    subject: "",
    message: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    website: "",
    company_name: "",
    linkedin_profile: "",
    form_questions: questions.map((question) => ({
      question: question.q,
      options: question.options,
      response: "",
    })),
    form_type: undefined, // You can add the form_type if needed
  };

  const [formData, setFormData] = useState<BusinessLicenseFormProps>(initialState);
  const [status, setStatus] = useState<string | null>("");
  const [step, setStep] = useState<number | null>(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    questionIndex?: number,
  ) => {
    const { name, value } = e.target;
    console.log(name,value)
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      form_questions: prevFormData?.form_questions?.map((question, index) => {
        if (index === questionIndex) {
          return { ...question, response: value };
        }
        return question;
      }),
    }));
    console.log(formData)
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (step === max) {
      e.preventDefault();
      try {
        const updates: BusinessLicenseFormProps = {
          ...formData,
          form_type: "Business License Inquiry",
          subject: "Business License Inquiry",
        };
        const res = await fetch("/api/contact/requests/business-inquiry/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });
        if (res.ok) {
          setStatus("success");
          setStep(null);
          toast.success("Your message was sent successfully");
        }
        setFormData(initialState);
      } catch (err) {
        setStatus("error");
        console.log("Error sending email. Please try again later.");
      } finally {
        router.push(pathname, {scroll:false})
      }
    }
  };
  const headers = (index) => [
    {
      GetStarted: "Get Started",
      TellUsMore: "Tell Us More About You",
      FinishUp: "Finish Up",
      Completed: "All Done",
    },
  ];
  const renderStep1 = () => {
    return (
      <div className=" w-full mx-auto">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={formData?.first_name}
              onChange={handleChange}
              type="text"
              name="first_name"
              id="first_name"
              className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
              placeholder=" "
              required
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
              value={formData.last_name}
              onChange={handleChange}
              type="text"
              name="last_name"
              id="last_name"
              className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
              placeholder=" "
              required
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
            value={formData.email}
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
            placeholder=" "
            required
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
            value={formData.website}
            onChange={handleChange}
            type="url"
            name="website"
            id="website"
            className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
            placeholder=" "
            required
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
              value={formData.phone_number}
              onChange={handleChange}
              type="tel"
              name="phone_number"
              id="phone_number"
              className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
              placeholder=" "
              required
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
              value={formData.company_name}
              onChange={handleChange}
              type="text"
              name="company_name"
              id="company_name"
              className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="company_name"
              className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Company (Ex. Google)
            </label>
          </div>
        </div>
      </div>
    );
  };

  const renderStep2 = () => {
    return  (
      <div>
        <p className="mb-8 text-base text-zinc-900 dark:text-zinc-300 text-center">
          {formData?.form_questions && formData?.form_questions[0].question}
        </p>
        {formData?.form_questions && formData?.form_questions[0]?.options?.map((option) => (
        <div className="relative z-0 w-full mb-3 group" key={option}>
          <input
            type="radio"
            value={
              option
            }
            checked={formData?.form_questions && formData?.form_questions[0]?.response === option}
            onChange={(e) => handleChange(e, 0)}
            name={'response_1'}
            id={option}
            className="hidden py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor={option}
            className="inline-flex items-center justify-between w-full p-5 text-black bg-white border-2 border-zinc-200 rounded-lg cursor-pointer  dark:border-zinc-800 peer-checked:border-red-300  dark:peer-checked:text-zinc-300 peer-checked:text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:bg-zinc-950 dark:hover:bg-zinc-900"
          >
            <div className="block">
              <div className="w-full text-lg font-semibold">{option}</div>
              <div className="w-full text-sm"></div>
            </div>
          </label>
        </div>))}
      </div>
    );
  };

  const renderStep3 = () => {
    return (
      <div>
        <p className="mb-8 text-sm text-zinc-900 dark:text-zinc-300 text-center">
          {formData?.form_questions && formData?.form_questions[1].question}
        </p>
        {formData?.form_questions && formData?.form_questions[1]?.options?.map((option, i: number) => (
        <div className="relative z-0 w-full mb-3 group" key={i}>
          <input
            checked={formData?.form_questions && formData?.form_questions[1]?.response === option?.size}
            type="radio"
            value={
          option?.size
            }
            onChange={(e) => handleChange(e, 1)}
            name={'response_2'}
            id={option?.size}
            className="hidden py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor={option?.size}
            className="inline-flex items-center justify-between w-full p-5 text-black bg-white border-2 border-zinc-200 rounded-lg cursor-pointer  dark:border-zinc-800 peer-checked:border-red-300  dark:peer-checked:text-zinc-300 peer-checked:text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:bg-zinc-950 dark:hover:bg-zinc-900"
          >
            <div className="block">
              <div className="w-full text-lg font-semibold">{option?.size}</div>
              <div className="w-full text-sm">{(option?.count + " Employees") || ''}</div>
            </div>
          </label>
        </div>))}
      </div>
    );
  };

  const renderStep4 = () => {
    return (
      <div>
        <p className="mb-8 text-base text-center text-zinc-500 dark:text-zinc-300">
          {formData?.form_questions && formData?.form_questions[2].question}
        </p>
        <div className="relative z-0 w-full mb-6 group flex flex-wrap gap-2 justify-center">
        {formData?.form_questions && formData?.form_questions[2]?.options?.map((option, i: number) => (
<div className="flex gap-2 p-2 border rounded hover:bg-zinc-100 dark:hover:bg-zinc-950 border-zinc-300 dark:border-zinc-800 me-2 items-center h-fit" key={i}>
          <input
                      checked={formData?.form_questions && formData?.form_questions[2]?.response?.includes(option)}

          type="checkbox"
            value={option}
            onChange={(e) => handleChange(e, 2)}
            name={`response_3`}
            id={option}
            className=" accent-red-300"
            //placeholder=" "
            //required
          />

          <label
            htmlFor={option}
            className="text-sm"
          >
           {option}
          </label> 
          </div> ))}
        </div>
      </div>
    );
  };
  return (
    <div className=" font-work-sans">

      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
        className="w-full mx-auto h-[410px] max-h-full min-h-full relative"
      >
        <div className="min-h-[315px] max-h-fit">
          {step === min && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          {step === max && renderStep4()}
          {status === "error" && (
            <div className="text-red-500">Sorry there was an error</div>
          )}
          {status === "success" && !step && (
            <div className="text-green-500">Success</div>
          )}
        </div>
        {step && (
          <div className="flex justify-between items-center">
            <StepButtons step={step} set={setStep} />
            {step === max ? (
              <button
                type="submit"
                className="text-black bg-red-300 hover:bg-red-400 focus:ring-4 focus:outline-none rounded text-xs w-full sm:w-auto px-5 py-2.5 text-center duration-300 ease-in-out dark:focus:ring-red-400"
              >
                Submit
              </button>
            ) : (
              <div />
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default BusinessLicenseForm;

const StepButtons = ({
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
        className={`p-2.5 bg-red-300 h-fit rounded rounded-l-lg hover:bg-red-400 ease-in-out duration-200 items-center text-xs gap-2 ${step === min ? 'hidden' : 'flex'}`}
      >
        <FaChevronLeft /> Back
      </div>
      <div
        onClick={incrementStep}
        className={`p-2.5 bg-red-300 h-fit rounded rounded-r-lg hover:bg-red-400 ease-in-out duration-200 items-center text-xs gap-2 ${step === max ? 'hidden' : 'flex'}`}
      >
       Next <FaChevronRight />
      </div>
    </div>
  );
};
