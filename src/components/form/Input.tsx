import React from 'react'
import { Autocomplete, TextField, TextFieldProps } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

export function Input({ name, label, type = 'text', validation = {}, ...rest }) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const errorMessage = errors[name]?.message ?? ''

  return (
    <TextField
      {...register(name, { ...validation })}
      label={label}
      type={type}
      error={!!errors[name]}
      helperText={typeof errorMessage === 'string' ? errorMessage : ''}
      {...rest}
    />
  )
}

export function AutoCompleteInput({
  name,
  label,
  options,
  getOptionLabel = option => option?.label || '',
  validation = {},
  ...rest
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const errorMessage = errors[name]?.message ?? ''

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
            field.onChange(val ?? (rest.multiple ? [] : null))
          }}
          renderInput={params => (
            <TextField
              {...params}
              label={label}
              error={!!errors[name]}
              helperText={typeof errorMessage === 'string' ? errorMessage : ''}
            />
          )}
        />
      )}
    />
  )
}
