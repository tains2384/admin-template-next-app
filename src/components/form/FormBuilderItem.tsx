import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Button } from '../ui/button';
import { FormField, FormItem, FormMessage } from '../ui/form';
import { SelectFixedOptionForm } from './SelectFixedOptionForm';
import { SelectRemoteOptionForm } from './SelectRemoteOptionForm';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { useTranslations } from 'next-intl';
import { FieldArrayWithId, UseFieldArrayMove, UseFieldArrayRemove, useFormContext } from 'react-hook-form';
import { get } from 'lodash';
import { FormSchema } from '.';
import { Input } from '../ui/input';
import { cn } from '~/utils';

export function FormBuilderItem({ index, isDragging, field, move, remove, isFirst, isLast }: FormBuilderItemProps) {
  const t = useTranslations('form');

  const methods = useFormContext<FormSchema>();
  const { control } = methods;

  const componentType = get(field, `type`);

  const handleRemoveComponent = (idx: number) => {
    console.log('🚀 ~ handleRemoveComponent ~ idx:', idx);
    remove(idx);
  };

  const handleMoveDown = (currentIndex: number) => {
    move(currentIndex, currentIndex + 1);
  };

  const handleMoveUp = (currentIndex: number) => {
    move(currentIndex, currentIndex - 1);
  };

  return (
    <div className="grid grid-cols-2 gap-4 pr-14 relative p-3 rounded border border-gray-200 bg-white">
      <div className="flex gap-2 absolute top-2 right-2">
        <button
          type="button"
          disabled={isFirst}
          className={cn({ 'opacity-50': isFirst })}
          onClick={handleMoveUp.bind(null, index)}
        >
          <ChevronUpIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          disabled={isLast}
          className={cn({ 'opacity-50': isLast })}
          onClick={handleMoveDown.bind(null, index)}
        >
          <ChevronDownIcon className="h-4 w-4" />
        </button>
      </div>

      <FormField
        control={control}
        name={`schema.${index}.type`}
        render={({ field }) => (
          <FormItem>
            <Label>{t('component_type')}</Label>
            <Select onValueChange={field.onChange} value={field.value}>
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
        )}
      />

      <FormField
        control={control}
        name={`schema.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <Label>{t('component_name')}</Label>
            <Input type="text" onChange={field.onChange} value={field.value} />
            <FormMessage />
          </FormItem>
        )}
      />

      {!isDragging && componentType === 'select-fixed-option' ? (
        <SelectFixedOptionForm index={index} className="col-span-2" />
      ) : null}
      {!isDragging && componentType === 'select-remote-option' ? (
        <SelectRemoteOptionForm index={index} className="col-span-2" />
      ) : null}

      <Button
        type="button"
        variant="outline"
        size="icon"
        className="absolute right-[0.5em] top-[3.125em]"
        onClick={handleRemoveComponent.bind(null, index)}
      >
        <XMarkIcon className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
}

type FormBuilderItemProps = {
  index: number;
  isDragging?: boolean;
  field: FieldArrayWithId<FormSchema, 'schema', 'id'>;
  move: UseFieldArrayMove;
  remove: UseFieldArrayRemove;
  isFirst?: boolean;
  isLast?: boolean;
};
