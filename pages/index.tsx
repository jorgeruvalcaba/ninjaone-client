import { useState, useEffect } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import _ from 'lodash'

import { Device } from '../api'
import { BASE_URL } from '../constants'
import { Select } from '../components/Select'

type HomeProps = {
  fetchedDevices: Device[]
}

type Type = {
  name: string
  slug: string
}

const TYPES: Type[] = [
  { name: 'All', slug: 'ALL' },
  { name: 'Mac', slug: 'MAC' },
  { name: 'Windows Server', slug: 'WINDOWS_SERVER' },
  { name: 'Windows Workstation', slug: 'WINDOWS_WORKSTATION' },
]

const SORT_BY: Type[] = [
  { name: 'System Name', slug: 'system_name' },
  { name: 'HDD Capacity', slug: 'hdd_capacity' },
]

const [DEFAULT_TYPE] = TYPES

const DISPLAY_TYPES = {
  MAC: 'Mac',
  WINDOWS_SERVER: 'Windows Server',
  WINDOWS_WORKSTATION: 'Windows Workstation',
}

export default function Home({ fetchedDevices }: HomeProps) {
  const [baseDevices] = useState(fetchedDevices)
  const [devices, setDevices] = useState(fetchedDevices)
  const [type, setType] = useState<Type>(DEFAULT_TYPE)
  const [sortBy, setSortBy] = useState<Type>({ name: 'Select...', slug: '' })

  console.log({ type, sortBy, devices })

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
            <div className="flex flex-row mb-8">
              <div className="mr-8 flex">
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

            {devices.length > 0 ? (
              <div className="w-full flex flex-col">
                <div className="w-2/5">
                  {devices.map((device) => (
                    <div
                      key={device.id}
                      className="border-2 border-black rounded-lg p-4 mb-4 shadow hover:shadow-2xl transition ease-in-out hover:-translate-y-1 hover:scale-110 duraction-300 delay-150"
                    >
                      <p className="text-md font-semibold font-poppins">
                        {device.system_name}
                      </p>
                      <p className="text-sm font-poppins">
                        {
                          DISPLAY_TYPES[
                            device.type as keyof typeof DISPLAY_TYPES
                          ]
                        }{' '}
                        · {device.hdd_capacity} GB SDD disk
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </main>
        </div>
      </div>
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
