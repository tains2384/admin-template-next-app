import React from 'react';
import { FormField, FormItem, FormMessage } from '../ui/form';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { FormSchema } from './type';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { cn } from '~/utils';
import { useTranslations } from 'next-intl';

export function SelectFixedOptionForm({ index, className }: SelectFixedOptionFormProps) {
  const t = useTranslations('form');

  const methods = useFormContext<FormSchema>();

  const { control } = methods;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: `schema.${index}.options`,
  });

  const handleRemove = (idx: number) => {
    remove(idx);
  };

  const handleAdd = () => {
    append({ value: '', label: '' });
  };

  return (
    <div className={cn('space-y-4', className)}>
      {fields.map((item, idx) => {
        return (
          <div key={item.id} className="grid grid-cols-2 gap-4 pr-12 relative">
            <FormField
              control={control}
              name={`schema.${index}.options.${idx}.label`}
              render={({ field }) => (
                <FormItem>
                  <Label>Label</Label>
                  <Input type="text" onChange={field.onChange} defaultValue={field.value} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`schema.${index}.options.${idx}.value`}
              render={({ field }) => (
                <FormItem>
                  <Label>Value</Label>
                  <Input type="text" onChange={field.onChange} defaultValue={field.value} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-[2.25em]"
              onClick={handleRemove.bind(null, idx)}
            >
              <XMarkIcon className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        );
      })}
      <Button type="button" variant="outline" className="w-full" onClick={handleAdd}>
        {t('add_option')}
      </Button>
    </div>
  );
}

type SelectFixedOptionFormProps = {
  index: number;
  className?: string;
};
