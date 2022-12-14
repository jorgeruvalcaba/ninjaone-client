import { MouseEventHandler, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  className?: string
}

export const Button = ({
  children,
  onClick,
  disabled,
  className,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={`inline-block px-6 py-2 border-2 border-gray-800 text-gray-800 
        text-sm rounded-lg hover:bg-black 
        hover:bg-opacity-5 focus:outline-none focus:ring-0 transition
        disabled:border-gray-200 disabled:text-gray-200 
        duration-150 ease-in-out ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
