'use client'

import React, { CSSProperties, FC, forwardRef, useState, useRef, useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { toolbarOptions } from '@/constants'
import dynamic from 'next/dynamic'
import { cn } from '@/lib'
import { TEntity } from '@/types'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { ReactQuillProps } from 'react-quill'
import { Button, Image } from '@/components'
import 'react-quill/dist/quill.snow.css'
import './quill.css'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface Option {
  [key: string | number]: string
}

interface AutoCompleteInputProps {
  name: string
  label: string
  options: TEntity[]
  optionName?: string
  optionValue?: string | number | undefined
  getOptionLabel?: (option: Option) => string
  validation?: InputValidationRules
  style?: object
  defaultValue?: TEntity[] | TEntity | number
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
  validation = {},
  multiple = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const [query, setQuery] = useState('')

  return (
    <div className="form-control w-full ">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <div className="input input-bordered ">
        <Controller
          name={name}
          control={control}
          rules={validation}
          render={({ field }) => {
            const { value, onChange } = field
            const filteredOptions = options.filter(option =>
              option[optionName].toLowerCase().includes(query.toLowerCase()),
            )

            const handleSelect = selectedOption => {
              onChange(selectedOption)
            }

            return (
              <Combobox value={value} onChange={handleSelect} multiple={multiple}>
                <div className="relative py-1.5">
                  <ComboboxInput
                    className="w-full rounded-lg border-none py-1.5 pr-8 pl-3 text-sm focus:outline-none"
                    displayValue={(items: TEntity[] | number) => {
                      return multiple && Array.isArray(items)
                        ? items.map(item => item[optionName]).join(', ')
                        : typeof items !== 'number'
                          ? items?.[optionName]?.toString()
                          : filteredOptions.find(opt => opt.id === (items as number))?.[optionName]?.toString() || ''
                    }}
                    onChange={event => {
                      setQuery(event.target.value)
                    }}
                  />
                  <ComboboxButton className="group absolute inset-y-0 right-0 ">
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  </ComboboxButton>
                  <ComboboxOptions className="absolute w-full z-10 mt-3 bg-base-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map(option => (
                        <ComboboxOption
                          key={option.id}
                          value={option}
                          className="flex cursor-pointer items-center gap-2 rounded-lg py-1.5 select-none hover:bg-base-200"
                        >
                          <CheckIcon
                            className={`h-5 w-5 ${
                              Array.isArray(value) && value?.some(item => item.id === option.id)
                                ? 'text-primary'
                                : 'invisible'
                            }`}
                          />
                          <span className="text-sm">{option[optionName]}</span>
                        </ComboboxOption>
                      ))
                    ) : (
                      <div className="py-2 px-3 text-sm text-gray-500">No results found</div>
                    )}
                  </ComboboxOptions>
                </div>
              </Combobox>
            )
          }}
        />
      </div>
      {errors[name]?.message && typeof errors[name].message === 'string' && (
        <span className="label-text-alt text-red-500">{errors[name].message}</span>
      )}
    </div>
  )
}

interface EditorInputProps extends Partial<ReactQuillProps> {
  name: string
  label?: string
  validation?: InputValidationRules
  // defaultValue?: TEntity[] | TEntity
  style?: CSSProperties
}

const ReactQuillWrapper = forwardRef<unknown, ReactQuillProps>((props, ref) => (
  // @ts-expect-error: ref forwarding is handled here
  <ReactQuill {...props} ref={ref} />
))

ReactQuillWrapper.displayName = 'ReactQuillWrapper'

export const EditorInput: React.FC<EditorInputProps> = ({
  name,
  label,
  validation = {},
  defaultValue,
  style = {},
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => (
          <ReactQuillWrapper
            {...field}
            {...rest}
            value={field.value || ''}
            onChange={field.onChange}
            modules={{ toolbar: toolbarOptions }}
          />
        )}
      />
      {errors[name]?.message && typeof errors[name].message === 'string' && (
        <span className="label-text-alt text-red-500">{errors[name].message}</span>
      )}
    </>
  )
}

export const FileInput: FC<InputProps> = ({
  label,
  iconPosition = 'end',
  icon,
  name,
  validation = {},
  className,
  ...props
}) => {
  const {
    register,
    setValue,
    reset,
    formState: { errors, defaultValues },
  } = useFormContext()
  const [fileBlob, setFileBlob] = useState<Blob | null>(null)

  const errorMessage = errors[name]?.message ?? ''

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const updatedBlob = new Blob([file], { type: file.type })
      setValue(name, file)
      setFileBlob(updatedBlob)
    }
  }

  const handleDelete = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setValue(name, undefined)
    setFileBlob(null)
    reset({ [name]: undefined })
  }

  const defaultImage = defaultValues?.[name] as string

  useEffect(() => {
    if (defaultImage) {
      setValue(name, defaultImage)
    }
  }, [defaultImage, setValue, name])

  return (
    <>
      <input
        {...register(name, { ...validation })}
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className={cn(
          'w-full',
          errorMessage && 'input-error',
          'file-input file-input-sm lg:file-input-md file-input-bordered w-full',
          className,
        )}
        {...props}
        type="file"
      />
      {(defaultImage || fileBlob) && (
        <div className="mt-4 relative place-items-center">
          <div className="relative w-fit">
            <Image
              width={300}
              height={300}
              src={
                (fileBlob && fileBlob.type.startsWith('image/') && URL.createObjectURL(fileBlob)) || defaultImage || ''
              }
              alt="Preview"
              className="mt-2 max-w-xs border"
            />
            <Button
              onClick={handleDelete}
              type="button"
              className="!btn-sm absolute top-2 right-2 !text-xs"
              aria-label="Delete image"
              icon
            >
              ✖
            </Button>
          </div>
        </div>
      )}
      {errorMessage && typeof errorMessage === 'string' && (
        <p className="pt-1.5 px-1 text-error text-xs">{errorMessage}</p>
      )}
    </>
  )
}
