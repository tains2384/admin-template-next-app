import React from 'react';
import { FormProvider, SubmitHandler, useForm, ControllerRenderProps } from 'react-hook-form';
import { FormField, FormItem } from '../ui/form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { FormSchema, SelectOption } from './type';

const fieldGenerator = (
  type: string,
  field: ControllerRenderProps<Record<string, any>, string>,
  rest: Record<string, any>
) => {
  if (type === 'input') return <Input type="text" onChange={field.onChange} defaultValue={field.value} />;

  if (type === 'textarea') return <Textarea onChange={field.onChange} defaultValue={field.value} />;

  if (type === 'select-fixed-option') {
    const options = rest.options || [];
    return (
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <SelectTrigger className="">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt: SelectOption) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (type === 'select-remote-option') {
  }
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
          const { name, type, ...rest } = item;
          return (
            <FormField
              key={name}
              control={methods.control}
              name={`${name}`}
              render={({ field }) => (
                <FormItem>
                  <Label>{name}</Label>
                  {fieldGenerator(type, field, rest)}
                </FormItem>
              )}
            />
          );
        })}

        <pre className="whitespace-break-spaces">{JSON.stringify(schema, null, 4)}</pre>
      </form>
    </FormProvider>
  );
}

type FormGeneratorProps = {
  schema: FormSchema['schema'];
  onSubmit: SubmitHandler<Record<string, any>>;
};
