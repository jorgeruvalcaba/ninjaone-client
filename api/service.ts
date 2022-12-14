import { BASE_URL } from '../constants'
import { FormValue } from '../types'

export const saveDevice = async ({
  systemName,
  type,
  hddCapacity,
}: FormValue) => {
  const payload = { system_name: systemName, type, hdd_capacity: hddCapacity }

  try {
    const res = await fetch(`${BASE_URL}/devices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    return res
  } catch (err) {
    return err
  }
}

export const updateDevice = async ({
  id,
  systemName,
  type,
  hddCapacity,
}: FormValue) => {
  const payload = {
    system_name: systemName,
    type,
    hdd_capacity: hddCapacity,
  }

  try {
    const res = await fetch(`${BASE_URL}/devices/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    return res
  } catch (err) {
    return err
  }
}

export const deleteDevice = async ({ id }: FormValue) => {
  try {
    const res = await fetch(`${BASE_URL}/devices/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res
  } catch (err) {
    return err
  }
}
