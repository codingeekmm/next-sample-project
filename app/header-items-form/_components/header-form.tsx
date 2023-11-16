'use client';

import { Autocomplete, FormControl, Grid, MenuItem, TextField } from '@mui/material';

import { useFormContext } from 'react-hook-form';

import { HeaderItemsFormData } from '@/app/_formSchema/header_items_schema';
import React from 'react';

export function HeaderForm() {
  const methods = useFormContext<HeaderItemsFormData>();

  // A Numbers mock
  const AMockList = [
    { id: '1', number: '10023866' },
    { id: '2', number: '100234964' },
    { id: '3', number: '151854622' },
  ];

  const A_numbers = AMockList.map((obj) => ({
    id: obj.id,
    label: obj.number,
  }));
  const A_defaultValue = A_numbers.find((e) => {
    return e.label == methods.getValues('header.header_attr1');
  });
  // B Numbers mock
  const B_numbers = [
    { id: '1', label: 'A - 1230006' },
    { id: '2', label: 'A - 1230007' },
    { id: '3', label: 'B - 1530006' },
  ];
  const B_defaultValue = B_numbers.find((e) => {
    return e.label == methods.getValues('header.header_attr2');
  });

  // C Numbers mock
  const C_numbers = [
    { id: '1', label: 'C - 1230006' },
    { id: '2', label: 'C - 1230007' },
    { id: '3', label: 'C - 1530006' },
  ];
  const C_defaultValue = C_numbers.find((e) => {
    return e.label == methods.getValues('header.header_attr3');
  });

  // D Numbers mock
  const D_numbers = [
    { id: '1', label: 'D - 1230006' },
    { id: '2', label: 'D - 1230007' },
    { id: '3', label: 'D - 1530006' },
  ];
  const D_defaultValue = D_numbers.find((e) => {
    return e.label == methods.getValues('header.header_attr4');
  });

  return (
    <>
      <Grid container spacing={2} margin={0}>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <Autocomplete
              defaultValue={A_defaultValue}
              {...methods.register('header.header_attr1')}

              onChange={(e) => {
                methods.setFocus('header.header_attr2');
                //setFocus('header.header2', { shouldSelect: true });
              }}

              onInputChange={(e, newValue) => {
                methods.setValue('header.header_attr1', newValue);
              }}
              disablePortal

              freeSolo
              options={A_numbers}

              renderOption={(props, option) => {
                return (
                  <MenuItem {...props} key={option.id}>
                    {option.label}
                  </MenuItem>
                );
              }}

              renderInput={(params) => (
                <TextField
                  helperText={methods.formState.errors.header?.header_attr1?.message}
                  {...params}
                  label={'test-header.header_attr1'}
                  variant='standard'
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <Autocomplete
              defaultValue={B_defaultValue}
              {...methods.register('header.header_attr2')}
              onChange={(e) => {
                methods.setFocus('header.header_attr3');
              }}
              onInputChange={(e, newValue) => {
                methods.setValue('header.header_attr2', newValue);
                //setFocus('c');
              }}
              openOnFocus
              disablePortal
              freeSolo
              options={B_numbers}
              renderOption={(props, option) => {
                return (
                  <MenuItem {...props} key={option.id}>
                    {option.label}
                  </MenuItem>
                );
              }}
              renderInput={(params) => (
                <TextField
                  helperText={methods.formState.errors.header?.header_attr2?.message}
                  {...params}
                  label={'header.header_attr2'}
                  variant='standard'
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={1.5}>
          <FormControl fullWidth>
            <Autocomplete
              defaultValue={C_defaultValue}
              {...methods.register('header.header_attr3')}
              onChange={(e) => {
                methods.setFocus('header.header_attr4');
              }}
              onInputChange={(e, newValue) => {
                methods.setValue('header.header_attr3', newValue);
              }}
              openOnFocus
              disablePortal
              //freeSolo
              options={C_numbers}
              renderOption={(props, option) => {
                return (
                  <MenuItem {...props} key={option.id}>
                    {option.label}
                  </MenuItem>
                );
              }}
              renderInput={(params) => (
                <TextField
                  helperText={methods.formState.errors.header?.header_attr3?.message}
                  {...params}
                  label={'header.header_attr3'}
                  variant='standard'
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={1.5}>
          <FormControl fullWidth>
            <Autocomplete
              defaultValue={D_defaultValue}
              {...methods.register('header.header_attr4')}
              onChange={(e) => {
                //setFocus('header.header5');
              }}
              onInputChange={(e, newValue) => {
                methods.setValue('header.header_attr4', newValue);
              }}
              openOnFocus
              disablePortal
              freeSolo
              options={D_numbers}
              renderOption={(props, option) => {
                return (
                  <MenuItem {...props} key={option.id}>
                    {option.label}
                  </MenuItem>
                );
              }}
              renderInput={(params) => (
                <TextField
                  helperText={methods.formState.errors.header?.header_attr4?.message}
                  {...params}
                  label={'header.header_attr4'}
                  variant='standard'
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <span>Info1</span>
        </Grid>
      </Grid>
    </>
  );
}
