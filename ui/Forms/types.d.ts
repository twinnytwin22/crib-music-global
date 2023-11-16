export type FormQuestions = {
  question: string | undefined;
  response?: string | string[] | undefined;
  options?: any[] | null | undefined;
};

export type IFormProps = {
  email: string | undefined;
  subject?: string | undefined;
  message?: string | undefined;
  first_name?: string | undefined;
  last_name?: string | undefined;
  phone_number?: string | undefined;
  website?: string | undefined;
  company_name?: string | undefined;
  linkedin_profile?: string | undefined;
  form_questions?: FormQuestions[];
  form_type?: string | undefined;
  song_id?: string | number | null;
  song_title?: string | null;
  onHandleBack: (step, setStep) => void;
  onHandleNext: (step, setStep) => void;
  setFormState: (state: Partial<IFormProps>) => void;
  formState: Partial<IFormProps>;
  //  handleSubmit: SubmitHandler<BusinessLicenseFormProps>;
  step: number;
  setStep: (step: number) => void;
  defaultValues: BusinessLicenseFormProps;
  min: number | null;
  max: number | null;

  status: string;
  setStatus: (status: string) => void;
  isInRange: (s, min, max) => void;
};
