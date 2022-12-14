import { Device } from '../../api'

type ListItemProps = {
  device: Device
}

const DISPLAY_TYPES = {
  MAC: 'Mac',
  WINDOWS_SERVER: 'Windows Server',
  WINDOWS_WORKSTATION: 'Windows Workstation',
}

export const ListItem = ({ device }: ListItemProps) => {
  return (
    <div
      key={device.id}
      className="border-2 border-black rounded-lg p-4 mb-4 shadow hover:shadow-2xl transition ease-in-out hover:-translate-y-1 hover:scale-110 duraction-300 delay-150"
    >
      <p className="text-md font-semibold font-poppins">{device.system_name}</p>
      <p className="text-sm font-poppins">
        {DISPLAY_TYPES[device.type as keyof typeof DISPLAY_TYPES]} ·{' '}
        {device.hdd_capacity} GB HDD
      </p>
    </div>
  )
}
