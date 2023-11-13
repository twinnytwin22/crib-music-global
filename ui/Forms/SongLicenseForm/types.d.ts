
export interface FormQuestions {
    question: string | undefined;
    response: string | string[] | undefined;
    options?: any[] | null | undefined;
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
    song_title: string | null;
  }