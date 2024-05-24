import { BTN_STYLE_TYPE } from "./constants";
import { ButtonProps } from './interface'
import ReactLoading from 'react-loading'
import React from 'react'

export const Button: React.FC<ButtonProps> = ({
    btnType,
    callToAction,
    icon,
    className,
    isLoading,
    children,
    ...props
  }) => (
    <button
      {...props}
      className={`px-6 py-3 font-koblenz-bold flex items-center gap-x-2 capitalize duration-300 font-bold justify-center text-sm
      ${className}
      ${props.disabled ? ' !bg-gray-600 ' : BTN_STYLE_TYPE[btnType]}
                  ${callToAction ? 'rounded-[40px] py-2 px-8' : 'rounded-xl'}
              `}
    >
      {!isLoading ? (
        <>
          {children}
          {icon}
        </>
      ) : (
        <ReactLoading type={'spin'} color={'#ffffff'} height={20} width={20} />
      )}
    </button>
  )