import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { UseFormProps, useForm } from "react-hook-form";
import { questions } from "./lib";
import useFormStore from "./store";
import { FormQuestions, IFormProps } from "./types";

export interface IFormContextProps extends IFormProps {
  decrementStep: () => void;
  incrementStep: () => void;
}
type TAllFormProps = IFormProps | IFormContextProps | UseFormProps;
const store = useFormStore.getState();
const FormContext = createContext<IFormProps | IFormContextProps | any>(store);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const song = {
    id: "",
    title: "",
  };
  const formQuestions = questions.map((question) => ({
    question: question.q,
    options: question.options,
    response: "",
  }));
  const store = useFormStore();
  const {
    song_title,
    status,
    setStatus,
    id,
    min,
    max,
    step,
    setStep,
    defaultValues: values,
  } = useFormStore();
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormProps>({
    mode: "all",
    defaultValues: values,
  });
  const isInRange = (s: number) => s >= min && s <= max;
  const setSong = (newSong: { id: string; song_title: string }) =>
    useFormStore.setState(newSong);
  const setFormQuestions = (newQuestionSet: FormQuestions[]) =>
    useFormStore.setState({ form_questions: newQuestionSet });
  const setFormType = (formType: string) =>
    useFormStore.setState({ form_type: formType });

  const updateSong = useCallback(
    (newSong: any) => {
      setValue("song_title", newSong.title);
      setValue("id", newSong.id);
      setSong(newSong);
    },
    [setSong, setValue]
  );
  const updateFormType = useCallback(
    (newFormType: string) => {
      setValue("form_type", newFormType);
      setFormType(newFormType);
    },
    [setFormType, setValue]
  );
  const updateFormQuestions = useCallback(
    (newFormQuestions: FormQuestions[]) => {
      setValue("form_questions", newFormQuestions);
      setFormQuestions(formQuestions);
    },
    [setFormQuestions]
  );

  const incrementStep = () => {
    const newStep = step + 1;
    if (isInRange(newStep)) {
      setStep(newStep);
    }
  };

  const decrementStep = () => {
    const prevStep = step - 1;
    if (isInRange(prevStep)) {
      setStep(prevStep);
    }
  };

  const value = useMemo(
    () => ({
      ...store,
      song_title,
      id,
      status,
      setStatus,
      decrementStep,
      incrementStep,
      watch,
      setValue,
      register,
      handleSubmit,
      control,
      updateFormQuestions,
      updateFormType,
      updateSong,
    }),
    [
      store,
      status,
      setStatus,
      setSong,
      decrementStep,
      incrementStep,
      watch,
      setValue,
      register,
      handleSubmit,
      updateFormQuestions,
      updateFormType,
      updateSong,
      control,
    ]
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export function useFormStateContext() {
  return useContext(FormContext);
}
