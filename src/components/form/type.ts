export type SelectOption = { value: string; label: string };

export type SelectRemoteOptionConfig = {
  endpoint: string;
  valueKey?: string;
  labelKey?: string;
};

export type FormItem = {
  type: string;
  name: string;
  options?: SelectOption[];
  remoteOption?: SelectRemoteOptionConfig;
};

export type FormSchema = {
  schema: FormItem[];
};
