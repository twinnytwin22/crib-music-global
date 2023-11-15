"use client";
import useFormStateContext from "app/context/FormContext";
import { useEffect } from "react";
import { Step1 } from "./Steps/renderStep1";
import { Step2 } from "./Steps/renderStep2";
import { Step3 } from "./Steps/renderStep3";
import { Step4 } from "./Steps/renderStep4";
import { questions } from "./lib";

function BusinessLicenseForm({ song }) {
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
    updateSong,
    step,
  } = useFormStateContext();

  useEffect(() => {
    if(song){
    setStatus('loading')
    updateSong(song)
    updateFormType('Business License Inquiry');
    updateFormQuestions(formQuestions)
    setStatus('ready')
    }
  },[song])


  return (status !== 'loading') && (
    <div className=" font-work-sans">
      <div
        // onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
        className="w-full mx-auto h-[410px] max-h-full min-h-full relative"
      >
        <div className="min-h-[315px] max-h-fit">
          {step === min && <Step1/>}
          {step === 2 && <Step2/>}
          {step === 3 && <Step3/>}
          {step === max && <Step4/>}
          {status === "error" && (
            <div className="text-red-500">Sorry there was an error</div>
          )}
          {status === "success" && !step && (
            <div className="text-green-500">Success</div>
          )}
        </div>
       
      </div>
    </div>
  );
}

export default BusinessLicenseForm;
