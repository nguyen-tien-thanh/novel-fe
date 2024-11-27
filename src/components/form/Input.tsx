'use client'

import React, { useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { toolbarOptions } from '@/constants'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export const Input = ({ name, label, type = 'text', validation = {}, style = {}, ...rest }) => {
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
      sx={style}
      {...rest}
    />
  )
}

export const AutoCompleteInput = ({
  name,
  label,
  options,
  optionName = 'name',
  optionValue = 'id',
  getOptionLabel = option => option?.[optionName] || '',
  validation = {},
  style = {},
  defaultValue,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const errorMessage = errors[name]?.message ?? ''

  // Determine initial value based on whether multiple selection is enabled

  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Autocomplete
          {...field}
          {...rest}
          options={options}
          sx={style}
          multiple={rest.multiple}
          value={
            rest.multiple
              ? options.filter(option => field.value?.some(val => val[optionValue] === option[optionValue]))
              : options.find(option => option[optionValue] === field.value) || null
          }
          getOptionLabel={getOptionLabel}
          onChange={(e, val) => {
            const selectedValue = rest.multiple
              ? val.map(option => ({ [optionValue]: option[optionValue] }))
              : val
                ? val[optionValue]
                : null
            field.onChange(selectedValue)
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

export const EditorInput = ({ name, label, validation = {}, defaultValue, style = {}, ...rest }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      defaultValue={defaultValue}
      render={({ field }) => (
        <ReactQuill
          {...field}
          {...rest}
          theme="snow"
          value={field.value || ''}
          onChange={field.onChange}
          modules={{
            toolbar: toolbarOptions,
          }}
          style={{ height: 500, ...style }}
        />
      )}
    />
  )
}
