import { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { COMPONENT } from '../utils/constants';

const style = {
  border: '1px dashed black',
  padding: '0.5rem 1rem',
  backgroundColor: 'white',
  cursor: 'move',
};
type ComponentProps = {
  data: any;
  components: any;
  path: any;
};
const Component = ({ data, components, path }: ComponentProps) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: COMPONENT,
    item: { type: COMPONENT, id: data.id, path },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const component = components[data.id];
  console.log(data, component);
  return (
    <div>
      <div
        ref={ref}
        style={{ ...style, opacity, height: '300px' }}
        className="component draggable"
      >
        {/* <GraphTile title={component.name} description={component.content} graphType={component.graphType} showMenu /> */}
        <div>{component.id}</div>
        <div>{component.content}</div>
      </div>
    </div>
  );
};
export default Component;
