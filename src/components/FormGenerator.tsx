import React from 'react';
import { FormProvider, SubmitHandler, useForm, ControllerRenderProps } from 'react-hook-form';
import { FormField, FormItem } from './ui/form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { FormSchema } from './RegularForm';

const fieldGenerator = (type: string, field: ControllerRenderProps<Record<string, any>, string>) => {
  if (type === 'input')
    return <Input type="text" placeholder="Qui quis ut ullamco" onChange={field.onChange} defaultValue={field.value} />;

  return <div>Not available</div>;
};

export function FormGenerator({ schema, onSubmit }: FormGeneratorProps) {
  const methods = useForm<Record<string, any>>({
    defaultValues: {},
  });

  return (
    <FormProvider {...methods}>
      <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
        {schema.map((item) => {
          return (
            <FormField
              key={item.name}
              control={methods.control}
              name={`${item.name}`}
              render={({ field }) => (
                <FormItem>
                  <Label>{item.name}</Label>
                  {fieldGenerator(item.type, field)}
                </FormItem>
              )}
            />
          );
        })}
      </form>
    </FormProvider>
  );
}

type FormGeneratorProps = {
  schema: FormSchema['schema'];
  onSubmit: SubmitHandler<Record<string, any>>;
};
