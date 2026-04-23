import React from 'react';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';
import { Alert } from '../atoms/Alert';

interface FormFieldConfig {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

interface AuthFormProps {
  fields: FormFieldConfig[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitLabel: string;
  error?: string;
  success?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  fields,
  onSubmit,
  submitLabel,
  error,
  success
}) => {
  return (
    <>
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      <form onSubmit={onSubmit} className="space-y-6 relative z-10">
        {fields.map((field, index) => (
          <FormField
            key={index}
            label={field.label}
            type={field.type}
            value={field.value}
            onChange={field.onChange}
            placeholder={field.placeholder}
            required
          />
        ))}

        <Button type="submit" className="w-full mt-2">
          {submitLabel}
        </Button>
      </form>
    </>
  );
};
