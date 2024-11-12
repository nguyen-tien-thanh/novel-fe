import React from 'react'
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form'

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>
  children: React.ReactNode
  style?: React.CSSProperties
}

export const Form = <TFormValues extends FieldValues>({ onSubmit, children, style }: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>()
  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={style}>
        {children}
      </form>
    </FormProvider>
  )
}
