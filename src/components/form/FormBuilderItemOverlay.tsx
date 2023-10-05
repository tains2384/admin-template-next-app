import { XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Button } from '../ui/button';
import { FormField, FormItem, FormMessage } from '../ui/form';
import { SelectFixedOptionForm } from './SelectFixedOptionForm';
import { SelectRemoteOptionForm } from './SelectRemoteOptionForm';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { useTranslations } from 'next-intl';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { get } from 'lodash';
import { Input } from '../ui/input';
import { FormItem as FormItemType } from '.';

export function FormBuilderItemOverlay({
  index,
  formValue,
  formState,
}: {
  index: number;
  formValue: Record<string, any>;
  formState: Record<string, any>;
}) {
  console.log('🚀 ~ formValue:', formValue);
  const t = useTranslations('form');

  // const componentType = get(schema, `type`);

  return (
    <div className="grid grid-cols-2 gap-4 pr-14 relative p-3 rounded border border-gray-200 bg-white">
      <FormItem>
        <Label>{t('component_type')}</Label>
        <Select defaultValue={formValue.schema[index].type}>
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
              <SelectItem value="select-remote-option">Select with remote options</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>

      <FormItem>
        <Label>{t('component_name')}</Label>
        <Input type="text" defaultValue={formValue.schema[index].name} />
        <FormMessage />
      </FormItem>

      {/* {componentType === 'select-fixed-option' ? <SelectFixedOptionForm index={index} className="col-span-2" /> : null}
      {componentType === 'select-remote-option' ? (
        <SelectRemoteOptionForm index={index} className="col-span-2" />
      ) : null} */}

      <Button type="button" variant="outline" size="icon" className="absolute right-[0.5em] top-[3.125em]">
        <XMarkIcon className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
}
