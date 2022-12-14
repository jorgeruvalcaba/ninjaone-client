import { Device } from '../../api'
import { ListItem } from '../ListItem'

type ListProps = {
  items: Device[]
}

export const List = ({ items }: ListProps) => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-2/5">
        {items.map((device) => (
          <ListItem key={device.id} device={device} />
        ))}
      </div>
    </div>
  )
}
