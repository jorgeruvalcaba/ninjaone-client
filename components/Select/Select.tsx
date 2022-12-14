import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

type SelectProps = {
  options: Array<any>
  value: any
  // eslint-disable-next-line no-unused-vars
  onValueChange: (value: any) => void
  placeholder?: string
  label?: string
  className?: string
}

export const Select = ({
  options,
  value,
  onValueChange,
  label,
  className = '',
}: SelectProps) => {
  return (
    // <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
    //   <SelectPrimitive.Trigger aria-label="types">
    //     <Button>
    //       <SelectPrimitive.Value placeholder={placeholder} aria-label={value} />
    //       <SelectPrimitive.Icon className="ml-2">
    //         <ChevronDownIcon />
    //       </SelectPrimitive.Icon>
    //     </Button>
    //   </SelectPrimitive.Trigger>
    //   <SelectPrimitive.Content>
    //     <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700">
    //       <ChevronUpIcon />
    //     </SelectPrimitive.ScrollUpButton>
    //     <SelectPrimitive.Viewport className="bg-white border-2 border-black p-2 rounded-lg shadow-lg">
    //       <SelectPrimitive.Group>
    //         {options.map((option, index) => (
    //           <SelectPrimitive.Item
    //             key={`${option}-${index}`}
    //             value={option}
    //             className={cx(
    //               'relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 font-medium focus:bg-gray-100 dark:focus:bg-gray-900',
    //               'radix-disabled:opacity-50',
    //               'focus:outline-none select-none'
    //             )}
    //           >
    //             <SelectPrimitive.ItemText>{option}</SelectPrimitive.ItemText>
    //             <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
    //               <CheckIcon />
    //             </SelectPrimitive.ItemIndicator>
    //           </SelectPrimitive.Item>
    //         ))}
    //       </SelectPrimitive.Group>
    //     </SelectPrimitive.Viewport>
    //     <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700">
    //       <ChevronDownIcon />
    //     </SelectPrimitive.ScrollDownButton>
    //   </SelectPrimitive.Content>
    // </SelectPrimitive.Root>
    <div className={`w-52 ${className}`}>
      <Listbox value={value} onChange={onValueChange}>
        {label ? <Listbox.Label>{label}</Listbox.Label> : null}
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg border-2 border-black bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{value.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border-2 border-black bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-900">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
