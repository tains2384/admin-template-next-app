export type SelectOption = { value: string; label: string };

type FormItem = { type: string; name: string; options?: SelectOption[] };

export type FormSchema = {
  schema: FormItem[];
};
