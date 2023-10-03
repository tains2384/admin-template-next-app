import React from 'react';
import { FormField, FormItem, FormMessage } from '../ui/form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useFormContext } from 'react-hook-form';
import { FormSchema } from '.';
import { cn } from '~/utils';

export function SelectRemoteOptionForm({ index, className }: SelectRemoteOptionFormProps) {
  const methods = useFormContext<FormSchema>();

  const { control } = methods;

  return (
    <div className={cn('grid grid-cols-2 gap-4', className)}>
      <FormField
        control={control}
        name={`schema.${index}.remoteOption.endpoint`}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <Label>API endpoint</Label>
            <Input type="text" placeholder="Qui quis ut ullamco" onChange={field.onChange} defaultValue={field.value} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`schema.${index}.remoteOption.valueKey`}
        render={({ field }) => (
          <FormItem>
            <Label>Value key</Label>
            <Input type="text" onChange={field.onChange} defaultValue={field.value || 'value'} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`schema.${index}.remoteOption.labelKey`}
        render={({ field }) => (
          <FormItem>
            <Label>Label key</Label>
            <Input type="text" onChange={field.onChange} defaultValue={field.value || 'label'} />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

type SelectRemoteOptionFormProps = {
  index: number;
  className?: string;
};
