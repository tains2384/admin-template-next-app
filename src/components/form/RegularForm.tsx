import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm, useFieldArray, SubmitHandler, FormProvider, useWatch, SubmitErrorHandler } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { FormField, FormItem, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { get, last } from 'lodash';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { SelectFixedOptionForm } from './SelectFixedOptionForm';
import { FormSchema } from './type';

const formSchema = z.object({
  schema: z
    .object({
      type: z.string().min(1),
      name: z.string().min(1),
      options: z.object({ value: z.string().min(1), label: z.string().min(1) }).array(),
    })
    // .refine(
    //   (val) => {
    //     if (val.type === 'select-fixed-option' && val.options?.length === 0) return false;
    //     return true;
    //   },
    //   { message: 'Select must have at least 1 option',  }
    // )
    .array()
    .min(1),
});

export function RegularForm({ onSubmit }: RegularFormProps) {
  const t = useTranslations('form');

  const methods = useForm<FormSchema>({
    defaultValues: { schema: [] },
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, control, watch, clearErrors, getValues, resetField } = methods;

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control: control,
    name: 'schema',
  });

  const handleAddComponent = () => {
    const items = getValues('schema');
    // const lastItemInArray = get(items, `${Math.max(items.length - 1, 0)}`);
    // if (lastItemInArray && lastItemInArray.type === '' && lastItemInArray.name === '') return;

    append({ type: '', name: '' });
    clearErrors(`schema.${Math.max(items.length, 0)}`);
  };

  const handleRemoveComponent = (idx: number) => {
    remove(idx);
  };

  const formValues = useWatch({ control });

  const handleError: SubmitErrorHandler<FormSchema> = (error, event) => {
    console.log('🚀 ~ handleError ~ error:', error, event);
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit, handleError)}>
        {fields.map((item, index) => {
          const componentType = get(formValues.schema, `${index}.type`);

          return (
            <div key={item.id} className="grid grid-cols-2 gap-4 pr-12 relative">
              <FormField
                control={control}
                name={`schema.${index}.type`}
                render={({ field }) => (
                  <FormItem>
                    <Label>{t('component_type')}</Label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select a component type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Simple component</SelectLabel>
                          <SelectItem value="input">Input</SelectItem>
                          <SelectItem value="textarea">Textarea</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Select component</SelectLabel>
                          <SelectItem value="select-fixed-option">Select with fixed options</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`schema.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <Label>{t('component_name')}</Label>
                    <Input
                      type="text"
                      placeholder="Qui quis ut ullamco"
                      onChange={field.onChange}
                      defaultValue={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {componentType === 'select-fixed-option' ? (
                <SelectFixedOptionForm index={index} className="col-span-2" />
              ) : null}

              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-[2.25em]"
                onClick={handleRemoveComponent.bind(null, index)}
              >
                <XMarkIcon className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          );
        })}

        <div className="grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" className="w-full" onClick={handleAddComponent}>
            {t('add_component')}
          </Button>
          <Button disabled={fields.length === 0} type="submit" className="w-full">
            {t('generate')}
          </Button>
        </div>

        <pre className="whitespace-break-spaces">{JSON.stringify(formValues, null, 4)}</pre>
      </form>
    </FormProvider>
  );
}

type RegularFormProps = {
  onSubmit: SubmitHandler<FormSchema>;
};
