export type Device = {
  id: string
  system_name: string
  type: string
  hdd_capacity: string
}

export type Type = {
  name: string
  slug: string
}

export const TYPES: Type[] = [
  { name: 'All', slug: 'ALL' },
  { name: 'Mac', slug: 'MAC' },
  { name: 'Windows Server', slug: 'WINDOWS_SERVER' },
  { name: 'Windows Workstation', slug: 'WINDOWS_WORKSTATION' },
]

export const ADD_TYPES: Type[] = [
  { name: 'Mac', slug: 'MAC' },
  { name: 'Windows Server', slug: 'WINDOWS_SERVER' },
  { name: 'Windows Workstation', slug: 'WINDOWS_WORKSTATION' },
]

export const [DEFAULT_TYPE] = TYPES

export const [DEFAULT_ADD_TYPE] = ADD_TYPES

export type FormValue = {
  id?: string
  systemName: string
  type: string
  hddCapacity: string
}

export enum ModalTitles {
  AddDevice = 'Add Device',
  UpdateDevice = 'Update Device',
}
