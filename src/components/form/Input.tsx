'use client'

import React, { FC, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { toolbarOptions } from '@/constants'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import { cn } from '@/lib'
import { ICategory, IChapter, IProduct } from '@/types'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface Option {
  [key: string]: string | number | undefined
}

interface AutoCompleteInputProps {
  name: string
  label: string
  options: Option[]
  optionName?: string
  optionValue?: string | number | undefined
  getOptionLabel?: (option: Option) => string
  validation?: InputValidationRules
  style?: object
  defaultValue?: ICategory | IChapter | IProduct | undefined
  multiple?: boolean
}

export interface InputValidationRules {
  required?: boolean | string
  minLength?: number | { value: number; message: string }
  maxLength?: number | { value: number; message: string }
  pattern?: RegExp | { value: RegExp; message: string }
  [key: string]: unknown
}

export interface InputPropsBase extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  className?: string
  validation?: InputValidationRules
}

export type IconOnly = {
  icon?: React.ReactNode
  iconPosition?: 'start' | 'end'
  label?: never
}

export type LabelOnly = {
  label?: string
  iconPosition?: never
  icon?: never
}

export type InputProps = InputPropsBase & (IconOnly | LabelOnly)

export const Input: FC<InputProps> = ({
  label,
  iconPosition = 'end',
  icon,
  name,
  type = 'text',
  validation = {},
  className,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const errorMessage = errors[name]?.message ?? ''

  return (
    <>
      <label className="input input-bordered flex items-center gap-2">
        {label && <span>{label}</span>}
        {iconPosition === 'start' && icon}
        <input
          {...register(name, { ...validation })}
          type={type}
          className={cn('w-full', errorMessage && 'input-error', className)}
          {...props}
        />
        {iconPosition === 'end' && icon}
      </label>
      {errorMessage && typeof errorMessage === 'string' && (
        <p className="pt-1.5 px-1 text-error text-xs">{errorMessage}</p>
      )}
    </>
  )
}

export const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  name,
  label,
  options,
  optionName = 'name',
  optionValue = 'id',
  getOptionLabel = option => option?.[optionName] || '',
  validation = {},
  style = {},
  defaultValue,
  multiple = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const errorMessage = errors[name]?.message ?? ''

  const _options = [{ id: -1, name: '' }, ...options]

  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">{label}</span>
          </label>

          <div className="relative">
            <select
              {...field}
              multiple={multiple}
              className={`select select-bordered w-full ${errors[name] ? 'select-error' : ''}`}
              style={style}
              onChange={e => {
                const selectedValue = multiple
                  ? Array.from(e.target.selectedOptions).map(option => option.value)
                  : e.target.value
                field.onChange(selectedValue)
              }}
            >
              {_options.map((option, index) => (
                <option key={index} value={option[optionValue]}>
                  {getOptionLabel(option) as React.ReactNode}
                </option>
              ))}
            </select>

            {errorMessage && typeof errorMessage === 'string' && (
              <label className="label">
                <span className="label-text-alt text-red-500">{errorMessage}</span>
              </label>
            )}
          </div>
        </div>
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
          style={{ height: 200, ...style }}
        />
      )}
    />
  )
}
