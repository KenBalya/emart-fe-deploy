import React from 'react'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType: 'primary' | 'secondary' | 'tertiary' | 'danger'
  callToAction: boolean
  disabled?: boolean
  isLoading?: boolean
  children: string
  icon?: React.ReactNode | null
}