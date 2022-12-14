import { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
}

export function Button({ children }: ButtonProps) {
  return (
    <button
      className="inline-flex select-none items-center justify-center 
        rounded-md px-4 py-2 text-sm font-medium bg-white border-2 border-black text-gray-700
      hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 
        focus-visible:ring-opacity-75 group radix-state-open:bg-gray-50 
        radix-state-on:bg-gray-50 radix-state-instant-open:bg-gray-50 
        radix-state-delayed-open:bg-gray-50"
    >
      {children}
    </button>
  )
}

Button.displayName = 'Button'
export default Button
