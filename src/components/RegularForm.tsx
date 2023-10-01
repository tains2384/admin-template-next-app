import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm, useFieldArray, SubmitHandler, FormProvider } from 'react-hook-form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { FormField, FormItem, FormMessage } from './ui/form';
import { Button } from './ui/button';
import { get } from 'lodash';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { XMarkIcon } from '@heroicons/react/24/solid';

const formSchema = z.object({
  schema: z
    .object({
      type: z.string().min(1),
      name: z.string().min(1),
    })
    .array()
    .min(1),
});

export function RegularForm({ onSubmit }: RegularFormProps) {
  const t = useTranslations('form');

  const methods = useForm<FormSchema>({
    defaultValues: { schema: [] },
    resolver: zodResolver(formSchema),
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control: methods.control,
    name: 'schema',
  });

  const handleAddComponent = () => {
    const items = methods.getValues('schema');
    const lastItemInArray = get(items, `${Math.max(items.length - 1, 0)}`);

    // if (lastItemInArray && lastItemInArray.type === '' && lastItemInArray.name === '') return;

    append({ type: '', name: '' });
    methods.clearErrors(`schema.${Math.max(items.length, 0)}`);
  };

  const handleRemoveComponent = (idx: number) => {
    remove(idx);
  };

  const formValues = methods.watch();

  return (
    <FormProvider {...methods}>
      <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
        {fields.map((item, index) => {
          return (
            <div key={item.id} className="grid grid-cols-2 gap-4 pr-12 relative">
              <FormField
                control={methods.control}
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
                          <SelectItem value="select">Select</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
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

        <pre>{JSON.stringify(formValues, null, 4)}</pre>
      </form>
    </FormProvider>
  );
}

type RegularFormProps = {
  onSubmit: SubmitHandler<FormSchema>;
};

export type FormSchema = {
  schema: FormItem[];
};

type FormItem = { type: string; name: string };
