import React, { useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ControllerRenderProps } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SelectOption, SelectRemoteOptionConfig } from '.';

export function SelectRemoteOption({ field, optionConfig }: SelectRemoteOptionProps) {
  const { data } = useQuery({ queryKey: [`${field.name}-options`], queryFn: () => axios.get(optionConfig.endpoint) });

  const options = useMemo(() => {
    return (
      data?.data?.map((d: Record<string, string>) => ({
        value: d[optionConfig.valueKey],
        label: d[optionConfig.labelKey],
      })) || []
    );
  }, [data?.data, optionConfig.labelKey, optionConfig.valueKey]);

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

type SelectRemoteOptionProps = {
  field: ControllerRenderProps<Record<string, any>, string>;
  optionConfig: Required<SelectRemoteOptionConfig>;
};
