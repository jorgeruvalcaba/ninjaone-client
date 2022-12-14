import { useState, useEffect } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import _ from 'lodash'
import { PlusIcon } from '@heroicons/react/20/solid'

import { DEFAULT_TYPE, Device, FormValue, Type, TYPES } from '../types'
import { BASE_URL } from '../constants'
import { Select } from '../components/Select'
import { List } from '../components/List'
import { Modal } from '../components/Modal'
import { Button } from '../components/Button'
import { saveDevice } from '../api'

type HomeProps = {
  fetchedDevices: Device[]
}

enum ModalTitles {
  AddDevice = 'Add Device',
  UpdateDevice = 'Update Device',
}

const SORT_BY: Type[] = [
  { name: 'System Name', slug: 'system_name' },
  { name: 'HDD Capacity', slug: 'hdd_capacity' },
]

export default function Home({ fetchedDevices }: HomeProps) {
  const [baseDevices] = useState(fetchedDevices)
  const [devices, setDevices] = useState(fetchedDevices)
  const [type, setType] = useState<Type>(DEFAULT_TYPE)
  const [sortBy, setSortBy] = useState<Type>({ name: 'Select...', slug: '' })
  const [isOpen, setIsOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState<string>(ModalTitles.AddDevice)

  console.log({ devices })

  useEffect(() => {
    const newDevices = baseDevices.filter((device) => {
      if (type.name === 'All') return device
      return device.type === type.slug
    })
    setDevices(newDevices)
  }, [type, baseDevices])

  const handleSortBy = (value: Type) => {
    let sortedDevices = []

    if (value.slug === 'hdd_capacity') {
      sortedDevices = _.sortBy(devices, (device) =>
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

  const handleSubmit = (data: FormValue) => {
    const res = saveDevice(data)
    console.log({ res })
    closeModal()
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

            {devices.length > 0 ? <List items={devices} /> : null}
          </main>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        onSubmit={handleSubmit}
        title={modalTitle}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{
  fetchedDevices: Device[]
}> = async () => {
  const res = await fetch(`${BASE_URL}/devices`)
  const devices = await res.json()

  return { props: { fetchedDevices: devices } }
}
