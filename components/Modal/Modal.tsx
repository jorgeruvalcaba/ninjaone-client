import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react'
import { Transition, Dialog } from '@headlessui/react'

import { Select } from '../Select'
import { DEFAULT_TYPE, FormValue, Type, ADD_TYPES } from '../../types'

type ModalProps = {
  isOpen: boolean
  // eslint-disable-next-line no-unused-vars
  closeModal: (value: any) => void
  // eslint-disable-next-line no-unused-vars
  onSubmit: (value: any) => void
  title: string
}

const DEFAULT_FORM_VALUE = {
  systemName: '',
  type: '',
  hddCapacity: '',
}

export const Modal = ({ isOpen, closeModal, title, onSubmit }: ModalProps) => {
  const [type, setType] = useState<Type>(DEFAULT_TYPE)
  const [values, setValues] = useState<FormValue>(DEFAULT_FORM_VALUE)

  useEffect(() => {
    setValues({ ...values, type: type.slug })
  }, [type])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value: typeof values[keyof typeof values] = event.target.value
    setValues({ ...values, [event.target.id]: value })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(values)
    setValues(DEFAULT_FORM_VALUE)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-full max-w-md transform overflow-hidden
                rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>

                <form className="mt-2" onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label
                      htmlFor="systemName"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      System Name*
                    </label>
                    <input
                      id="systemName"
                      className="bg-white border-2 border-black text-gray-900 
                      text-sm rounded-lg block w-full p-2.5"
                      placeholder="Mac-Pro"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <Select
                      options={ADD_TYPES}
                      value={type}
                      onValueChange={setType}
                      label="Type*"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="hddCapacity"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      HDD Capacity (GB)*
                    </label>
                    <input
                      id="hddCapacity"
                      className="bg-white border-2 border-black text-gray-900 
                      text-sm rounded-lg block w-full p-2.5"
                      placeholder="500"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-row">
                    <button
                      type="submit"
                      className="mt-4 inline-flex justify-center rounded-lg border-2 
                      border-black bg-white px-4 py-2 text-sm font-medium text-black
                      hover:bg-gray-200 hover:disabled:bg-white hover:disabed:bg-white focus:outline-none focus-visible:ring-2 
                      focus-visible:ring-gray-500 focus-visible:ring-offset-2
                      disabled:border-gray-200 disabled:text-gray-200"
                      disabled={
                        values.type === 'ALL' ||
                        !values.hddCapacity ||
                        !values.systemName
                      }
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="mt-4 ml-4 inline-flex justify-center rounded-lg border-2 
                      border-black bg-white px-4 py-2 text-sm font-medium text-black
                      hover:bg-gray-200 focus:outline-none focus-visible:ring-2 
                      focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
