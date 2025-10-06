declare global {
   type SignInFormData = {
      email: string;
      password: string;
   };

   type SignUpFormData = {
      fullName: string;
      email: string;
      password: string;
   };

   type FormInputProps = {
      name: string;
      label: string;
      placeholder: string;
      type?: string;
      register: UseFormRegister;
      error?: FieldError;
      validation?: RegisterOptions;
      disabled?: boolean;
      value?: string;
   };

   type Option = {
      value: string;
      label: string;
   };

   type SelectFieldProps = {
      name: string;
      label: string;
      placeholder: string;
      options: readonly Option[];
      control: Control;
      error?: FieldError;
      required?: boolean;
   };

   type FooterLinkProps = {
      text: string;
      linkText: string;
      href: string;
   };
}

export {};