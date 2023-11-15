import { useEffect } from 'react';
import { create } from 'zustand';
import { isInRange } from './lib';
import { FormQuestions, IFormProps } from './types';


const useFormStore = create<IFormProps>((set) => ({
    song_id: null,
    song_title: null,
    email: '',
    subject: '',
    message: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    website: '',
    company_name: '',
    linkedin_profile: '',
    form_questions: [
      {
        question: '',
        options: [],
        response: '',
      },
    ],
    defaultValues: {
      song_id: null,
      song_title: null,
      email: '',
      subject: '',
      message: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      website: '',
      company_name: '',
      linkedin_profile: '',
      form_questions: [
        {
          question: '',
          options: [],
          response: '',
        },
      ],
    },
    formState:  {
     song_id: null,
      song_title: null,
      email: '',
      subject: '',
      message: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      website: '',
      company_name: '',
      linkedin_profile: '',
      form_questions: [
        {
          question: '',
          options: [],
          response: '',
        },
      ],
    },
    form_type: undefined,
    step: 1, 
    setStep: (step: number) => set({step}),
    setFormState: (state) => set(state),
    onHandleBack: (step, setStep) => {
      const newStep: number = step + 1;
      if (isInRange(newStep)) {
        setStep(newStep);
      }
    },
    onHandleNext: (step, setStep) => {
      const newStep: number = step + 1;
      if (isInRange(newStep)) {
        setStep(newStep);
      }
    },
    min: 1, 
    max: 4, 
    isInRange: (s: number, min: number, max: number) =>  s >= min && s <= max,
    setStatus: (status: string) => ({status}),
    status: ''
  }));
  

  export const useLoadFormData = ({ newSong, newQuestionSet, formType }: { newSong?: any; newQuestionSet?: FormQuestions[]; formType?: string }) => {
    const ready = (newSong && newSong.length > 1) && newQuestionSet && formType
    useEffect(() => {
      if(ready){
        
      }
      
    },[newSong, newQuestionSet, formType])
  }
  export default useFormStore;