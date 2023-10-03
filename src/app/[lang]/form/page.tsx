'use client';

import { useState } from 'react';
import { FormSchema, FormGenerator, RegularForm } from '~/components/form';

export default function Page() {
  const [formSchema, setFormSchema] = useState<FormSchema['schema']>([]);

  const handleSubmitFormSchema = (data: FormSchema) => {
    console.log('🚀 ~ handleSubmitFormSchema ~ data:', data);
    setFormSchema(data.schema);
  };

  const handleSubmitFormGenerator = (data: Record<string, any>) => {
    console.log('🚀 ~ handleSubmitFormGenerator ~ data:', data);
  };

  return (
    <div className="grid grid-cols-2 justify-between w-screen h-screen p-4 gap-4">
      <div className="border border-gray-200 rounded p-4 flex-1">
        <RegularForm onSubmit={handleSubmitFormSchema} />
      </div>
      <div className="border border-gray-200 rounded p-4 flex-1">
        <FormGenerator schema={formSchema} onSubmit={handleSubmitFormGenerator} />
      </div>
    </div>
  );
}
