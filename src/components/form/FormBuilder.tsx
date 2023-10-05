import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { useForm, useFieldArray, SubmitHandler, FormProvider, useWatch, SubmitErrorHandler } from 'react-hook-form';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormSchema } from './type';
import { FormBuilderItem } from './FormBuilderItem';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  closestCenter,
  closestCorners,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { SortableItem } from '../SortableItem';
import { FormBuilderItemOverlay } from './FormBuilderItemOverlay';

const formSchema = z.object({
  schema: z
    .object({
      type: z.string().min(1),
      name: z.string().min(1),
      options: z
        .object({ value: z.string().min(1), label: z.string().min(1) })
        .array()
        .optional(),
      remoteOption: z
        .object({
          endpoint: z.string().min(1),
          valueKey: z.string().optional(),
          labelKey: z.string().optional(),
        })
        .optional(),
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

export function FormBuilder({ onSubmit }: FormBuilderProps) {
  const t = useTranslations('form');

  const methods = useForm<FormSchema>({
    defaultValues: {
      schema: [
        {
          type: 'select-remote-option',
          name: 'select-remote-option',
          remoteOption: {
            endpoint: 'https://651bfcdd194f77f2a5af317f.mockapi.io/admin-template/api/select-data',
            valueKey: 'id',
          },
        },
      ],
    },
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, control, clearErrors, getValues, formState } = methods;

  const { fields, append, move } = useFieldArray({
    control: control,
    name: 'schema',
  });

  const [draggingId, setDraggingId] = useState<UniqueIdentifier>('');

  const handleAddComponent = () => {
    const items = getValues('schema');
    // const lastItemInArray = get(items, `${Math.max(items.length - 1, 0)}`);
    // if (lastItemInArray && lastItemInArray.type === '' && lastItemInArray.name === '') return;

    append({ type: 'input', name: '' });
    clearErrors(`schema.${Math.max(items.length, 0)}`);
  };

  const formValue = useWatch({ control });

  const handleError: SubmitErrorHandler<FormSchema> = (error) => {
    console.log('🚀 ~ handleError ~ error:', error);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setDraggingId(event.active.id);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeIdx = fields.findIndex((field) => field.id === active.id);
      const overIdx = fields.findIndex((field) => field.id === over.id);
      move(activeIdx, overIdx);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setDraggingId('');
    // const { active, over } = event;

    // if (over && active.id !== over.id) {
    //   const activeIdx = fields.findIndex((field) => field.id === active.id);
    //   const overIdx = fields.findIndex((field) => field.id === over.id);
    //   move(activeIdx, overIdx);
    // }
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit, handleError)}>
        {/* <DndContext
          autoScroll={false}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragEnd}
        >
          <SortableContext items={fields}>
            {fields.map((item, index) => (
              <SortableItem key={item.id} id={item.id}>
                <FormBuilderItem index={index} isDragging={!!draggingId} />
              </SortableItem>
            ))}
          </SortableContext>

          <DragOverlay>
            {draggingId ? (
              <FormBuilderItemOverlay
                index={fields.findIndex((field) => field.id === draggingId)}
                formState={formState}
                formValue={formValue}
              />
            ) : null}
          </DragOverlay>
        </DndContext> */}

        {fields.map((item, index) => (
          <FormBuilderItem key={item.id} index={index} />
        ))}

        <div className="grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" className="w-full" onClick={handleAddComponent}>
            {t('add_component')}
          </Button>
          <Button disabled={fields.length === 0} type="submit" className="w-full">
            {t('generate')}
          </Button>
        </div>

        <pre className="whitespace-break-spaces">{JSON.stringify(formValue, null, 4)}</pre>
      </form>
    </FormProvider>
  );
}

type FormBuilderProps = {
  onSubmit: SubmitHandler<FormSchema>;
};
