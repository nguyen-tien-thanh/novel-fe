'use client'

import { cn } from '@/lib'
import React from 'react'
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form'

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export const Form = <TFormValues extends FieldValues>({
  onSubmit,
  children,
  style,
  className,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>()
  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={style}
        className={cn(
          'form',
          'max-w-[500px] mx-auto',
          'flex flex-col gap-y-4 p-6 md:p-8 lg:p-10',
          'rounded-lg border-2 border-neutral-300',
          'shadow-md hover:shadow-lg transition-shadow duration-300',
          'focus-within:ring-2 focus-within:ring-neutral-500',
          className,
        )}
      >
        {React.Children.map(children, child => {
          return React.isValidElement(child) ? React.cloneElement(child, { ...child.props }) : child
        })}
        <button
          type="submit"
          className="mt-4 rounded-lg border border-neutral-500  py-2 px-4 font-semibold text-sm 
            hover:bg-neutral-500 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
        >
          Gửi
        </button>
      </form>
    </FormProvider>
  )
}
