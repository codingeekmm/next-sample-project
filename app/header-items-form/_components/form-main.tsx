'use client';

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';

import { AddCircle, EditCalendar, EditNote, Launch, Print, Save } from '@mui/icons-material';

import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { HeaderItemsFormData, headerItemsFormSchema } from '@/app/_formSchema/header_items_schema';
import type { HeaderWithItems } from '@/app/_repositories/Header';

import { HeaderForm } from './header-form';
import { ItemsFormLabel } from './items-form-label';
import { ItemsForm } from './items-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  header?: HeaderWithItems | null;
};

export function FormMain(props: Props) {
  const header = props.header;

  const router = useRouter();

  const [dialogIsOpen, setDialogIsOpen] = useState(false);


  let mode: 'edit' | 'create';
  if (header) {
    mode = 'edit';
  } else {
    mode = 'create';
  }


  let defaultValues: HeaderItemsFormData;
  if (header) {
    defaultValues = {
      header: {
        ...header,
      },
      items: header?.items.map((item) => {
        const { id, headerId, ...withoutId } = item;
        return withoutId;
      }),
      memo: {
        message: '',
      },
    };
  } else {
    const emptyFormData = {} as HeaderItemsFormData;
    defaultValues = {
      ...emptyFormData,

      items: [...Array(5)].map(() => ({})),

      memo: {
        message: '',
      },
    };
  }
  const methods = useForm({
    resolver: yupResolver(headerItemsFormSchema),
    defaultValues: defaultValues,
  });


  const { fields, append, remove } = useFieldArray({
    name: 'items',
    control: methods.control,
  });

  const onSubmit = methods.handleSubmit(async (formData) => {
    let response: Response;
    if (mode == 'edit') {
      response = await fetch(`/api/header-items/${header?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } else {
      // mode == 'create'
      response = await fetch('/api/header-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    }
    if (response.ok) {
      console.log(await response.json());
      router.refresh();
      router.push('/header-items-list');
    } else {
      // TODO:
      //setPostError('server error');
    }
  });


  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Box sx={{ flexGrow: 1 }}>
          {/* Header Form */}
          <HeaderForm />

          {/* Items Form */}
          <ItemsFormLabel />
          {fields.map((field, index) => (
            <ItemsForm key={index} field={field} index={index} remove={remove} />
          ))}

          {/* Submit */}
          <Grid container spacing={2} margin={0}>
            <Grid item xs={1}>
              <IconButton
                onClick={() => {
                  append({ items_attr1: '', items_attr2: '' });
                }}
              >
                <AddCircle />
              </IconButton>
            </Grid>
            <Grid item xs={1.5}>
              <Button variant='contained' color='primary' startIcon={<Print />}>
                Printer
              </Button>
            </Grid>
            <Grid item xs={1.5}>
              <Button
                variant='contained'
                color='primary'
                startIcon={<EditNote />}
                onClick={() => {
                  setDialogIsOpen(true);
                }}
              >
                メモ
              </Button>
            </Grid>
            <Grid item xs={2.0}></Grid>
            <Grid item xs={1.5}>
              <Button variant='contained' color='primary' startIcon={<EditCalendar />}>
                起票
              </Button>
            </Grid>
            <Grid item xs={2.5}>
              <Button variant='contained' color='primary' startIcon={<Launch />}>
                Direct Order
              </Button>
            </Grid>
            <Grid item xs={1.5}>
              <Button type='submit' variant='contained' color='primary' startIcon={<Save />}>
                保存
              </Button>
            </Grid>
          </Grid>
          <Dialog
            onClose={() => {
              setDialogIsOpen(false);
            }}
            open={dialogIsOpen}
          >
            <DialogTitle>メモ</DialogTitle>
            <DialogContent>
              <TextField multiline rows={10} {...methods.register('memo.message')} />
            </DialogContent>

          </Dialog>
        </Box>
      </form>
    </FormProvider>
  );
}
