import { useState, useEffect } from 'react'
import Head from 'next/head'
import _ from 'lodash'
import { PlusIcon } from '@heroicons/react/20/solid'

import {
  DEFAULT_TYPE,
  Device,
  FormValue,
  Type,
  TYPES,
  ModalTitles,
} from '../types'
import { Select } from '../components/Select'
import { List } from '../components/List'
import { Modal } from '../components/Modal'
import { Button } from '../components/Button'
import { deleteDevice, getDevices, saveDevice, updateDevice } from '../api'

const SORT_BY: Type[] = [
  { name: 'System Name', slug: 'system_name' },
  { name: 'HDD Capacity', slug: 'hdd_capacity' },
]

export default function Home() {
  const [baseDevices, setBaseDevices] = useState<Device[]>()
  const [devices, setDevices] = useState(baseDevices)
  const [type, setType] = useState<Type>(DEFAULT_TYPE)
  const [sortBy, setSortBy] = useState<Type>({ name: 'Select...', slug: '' })
  const [isOpen, setIsOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState<ModalTitles>(
    ModalTitles.AddDevice
  )
  const [deviceToUpdate, setDeviceToUpdate] = useState<Device>()
  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    const fetchDevices = async () => {
      const fetchedDevices = await getDevices()
      if (fetchedDevices) setBaseDevices(fetchedDevices)
    }

    fetchDevices()
  }, [refetch])

  useEffect(() => {
    if (baseDevices) {
      const newDevices = baseDevices.filter((device) => {
        if (type.name === 'All') return device
        return device.type === type.slug
      })
      setDevices(newDevices)
    }
  }, [type, baseDevices])

  const handleSortBy = (value: Type) => {
    let sortedDevices: Device[] = []

    if (value.slug === 'hdd_capacity') {
      sortedDevices = _.sortBy(devices, (device: Device) =>
        parseInt(device.hdd_capacity, 10)
      )
    } else {
      sortedDevices = _.orderBy(devices, [value.slug], ['asc'])
    }

    setSortBy(value)
    setDevices(sortedDevices)
  }

  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  const openNewDeviceModal = () => {
    setModalTitle(ModalTitles.AddDevice)
    openModal()
  }

  const handleEdit = (device: Device) => {
    setDeviceToUpdate(device)
    setModalTitle(ModalTitles.UpdateDevice)
    openModal()
  }

  const handleSubmit = async (data: FormValue) => {
    let res

    console.log({ data, deviceToUpdate })
    if (deviceToUpdate?.id && deviceToUpdate.id !== '') {
      res = await updateDevice(data)
      setDeviceToUpdate(undefined)
    } else {
      res = await saveDevice(data)
    }

    // @ts-ignore
    if (res.status < 300) setRefetch(!refetch)
    closeModal()
  }

  const handleDelete = async (data: FormValue) => {
    const res = await deleteDevice(data)

    // @ts-ignore
    if (res.status < 300) setRefetch(!refetch)
  }

  return (
    <>
      <Head>
        <title>Device Management</title>
        <meta name="description" content="NinjaOne Take Home Exercise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto mt-24 flex flex-row justify-center">
        <div className="flex flex-col w-full">
          <h1 className="text-4xl font-bold font-poppins mb-8 text-center">
            Device Management
          </h1>
          <main>
            <div className="flex flex-row justify-between mb-8">
              <div className="flex flex-row">
                <div className="mr-8">
                  <Select
                    options={TYPES}
                    value={type}
                    onValueChange={setType}
                    label="Type:"
                  />
                </div>
                <div className="mr-8 flex">
                  <Select
                    options={SORT_BY}
                    value={sortBy}
                    onValueChange={handleSortBy}
                    label="Sort by:"
                  />
                </div>
              </div>
              <div className="self-end">
                <Button onClick={openNewDeviceModal} className="flex flex-row">
                  <PlusIcon className="h-5 w-5 text-black" aria-hidden="true" />{' '}
                  Add Item
                </Button>
              </div>
            </div>

            {devices && devices?.length > 0 ? (
              <List
                items={devices}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ) : null}
          </main>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        onSubmit={handleSubmit}
        title={modalTitle}
        deviceToUpdate={deviceToUpdate}
      />
    </>
  )
}
