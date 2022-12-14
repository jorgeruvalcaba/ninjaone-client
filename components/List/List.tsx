import { Device } from '../../types'
import { ListItem } from '../ListItem'

type ListProps = {
  items: Device[]
  // eslint-disable-next-line no-unused-vars
  onEdit: (value: any) => void
  // eslint-disable-next-line no-unused-vars
  onDelete: (value: any) => void
}

export const List = ({ items, onEdit, onDelete }: ListProps) => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-2/5">
        {items.map((device) => (
          <ListItem
            key={device.id}
            device={device}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}
