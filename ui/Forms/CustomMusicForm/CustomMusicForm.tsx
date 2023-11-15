"use client";
import useFormStateContext from "app/context/FormContext";
import { useEffect } from "react";
import { Step1 } from "./Steps/renderStep1";
import { Step2 } from "./Steps/renderStep2";
import { Step3 } from "./Steps/renderStep3";
import { Step4 } from "./Steps/renderStep4";
import { Step5 } from "./Steps/renderStep5";
import { questions } from "./lib";

function CustomMusicForm() {
  const formQuestions = questions.map((question) => ({
    question: question.q,
    options: question.options,
    response: "",
  }))
  const {
    status, 
    min,
    max,
    setStatus,
    updateFormQuestions,
    updateFormType,
    step,
    updateMinMax

  } = useFormStateContext();

  useEffect(() => {
    if(!min && !max){
    setStatus('loading')
    updateFormQuestions(formQuestions)
    updateMinMax(1,5)
    updateFormType('Custom Music Request');
    setStatus('ready')
    }
  },[min, max])


  return  (
    <div className=" font-work-sans">
          <div className="py-8  px-4 mx-auto max-w-full">

           <h2 className="mb-4 text-2xl font-medium text-center text-zinc-900 dark:text-white font-owners">Custom Music Inquiry</h2>
        <p className="mb-8 font-light text-center text-zinc-500 dark:text-zinc-300 ">Fill out the following information and our team with reach out with a quote within 24 hours.</p>
       
       
      {(status !== 'loading') &&
      <div
        // onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
        className="w-full mx-auto h-[410px] max-h-full min-h-full relative"
      >
        <div className="min-h-[315px] max-h-fit">
          {step === min && <Step1/>}
          {step === 2 && <Step2/>}
          {step === 3 && <Step3/>}
          {step === 4 && <Step4/>}
          {step === max && <Step5/>}

          {status === "error" && (
            <div className="text-red-500">Sorry there was an error</div>
          )}
          {status === "success" && !step && (
            <div className="text-green-500">Success</div>
          )}
        </div>
       
      </div>}
      </div>
    </div>
  );
}

export default CustomMusicForm;
