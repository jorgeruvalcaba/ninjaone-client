import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'

import { Device } from '../../types'
import { Button } from '../Button'

type ListItemProps = {
  device: Device
  // eslint-disable-next-line no-unused-vars
  onEdit: (value: any) => void
  // eslint-disable-next-line no-unused-vars
  onDelete: (value: any) => void
}

const DISPLAY_TYPES = {
  MAC: 'Mac',
  WINDOWS_SERVER: 'Windows Server',
  WINDOWS_WORKSTATION: 'Windows Workstation',
}

export const ListItem = ({ device, onEdit, onDelete }: ListItemProps) => {
  return (
    <div
      key={device.id}
      className="border-2 border-black rounded-lg p-4 mb-4 shadow 
      hover:shadow-2xl transition ease-in-out hover:-translate-y-1 
      hover:scale-110 duraction-300 delay-150 flex flex-row justify-between"
    >
      <div>
        <p className="text-md font-semibold font-poppins">
          {device.system_name}
        </p>
        <p className="text-sm font-poppins">
          {DISPLAY_TYPES[device.type as keyof typeof DISPLAY_TYPES]} ·{' '}
          {device.hdd_capacity} GB HDD
        </p>
      </div>
      <div className="flex flex-row">
        <Button className="px-3 group" onClick={() => onEdit(device)}>
          <PencilSquareIcon
            className="h-5 w-5 text-gray-500 group-hover:text-black "
            aria-hidden="true"
          />
        </Button>
        <Button className="ml-2 px-3 group" onClick={() => onDelete(device)}>
          <TrashIcon
            className="h-5 w-5 text-gray-500 group-hover:text-black "
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  )
}
