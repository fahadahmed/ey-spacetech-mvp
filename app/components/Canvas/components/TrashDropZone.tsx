import React from 'react';
import classNames from 'classnames';
import { useDrop } from 'react-dnd';
import { COMPONENT, ROW, COLUMN } from '../utils/constants';

const ACCEPTS = [ROW, COLUMN, COMPONENT];

type TrashDropZoneProps = {
  data: any;
  onDrop: (data: any, item: any) => void;
};
const TrashDropZone = ({ data, onDrop }: TrashDropZoneProps) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ACCEPTS,
    drop: (item, monitor) => {
      onDrop(data, item);
    },
    canDrop: (item: any, monitor) => {
      const layout = data.layout;
      const itemPath = item.path;
      const splitItemPath = itemPath.split('-');
      const itemPathRowIndex = splitItemPath[0];
      const itemRowChildrenLength =
        layout[itemPathRowIndex] && layout[itemPathRowIndex].children.length;

      // prevent removing a col when row has only one col
      if (
        item.type === COLUMN &&
        itemRowChildrenLength &&
        itemRowChildrenLength < 2
      ) {
        return false;
      }

      return true;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;
  return (
    <div
      className={classNames('trashDropZone', { active: isActive })}
      ref={drop}
    >
      TRASH
    </div>
  );
};
export default TrashDropZone;
