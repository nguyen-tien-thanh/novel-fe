import React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

export function TextInput({ name, validation = {}, ...rest }) {
  const { register } = useFormContext()

  return <TextField {...register(name, validation)} {...rest} />
}

export function AutoCompleteInput({ name, label, options, getOptionLabel, validation = {}, ...rest }) {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({ field }) => (
        <Autocomplete
          {...field}
          {...rest}
          options={options}
          value={field.value ?? (rest.multiple ? [] : null)}
          getOptionLabel={getOptionLabel}
          onChange={(e, val) => {
            field.onChange(val ?? [])
          }}
          renderInput={params => <TextField {...params} label={label} />}
        />
      )}
    />
  )
}
