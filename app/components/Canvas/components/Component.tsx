import { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { COMPONENT } from '../utils/constants';
import { DonutChart } from "@carbon/charts-react";

const donutOptions = {
  resizable: false,
  donut: {
    alignment: "center"
  },
  height: "200px",
  pie: {
    labels: {
      enabled: false
    }
  },
  legend: {
    enabled: false
  },
  toolbar: {
    enabled: false
  }
};

const stubData = [
  {
    group: "2V2N 9KYPM version 1",
    value: 20000
  },
  {
    group: "L22I P66EP L22I P66EP L22I P66EP",
    value: 65000
  },
  {
    group: "JQAI 2M4L1",
    value: 75000
  },
  {
    group: "J9DZ F37AP",
    value: 1200
  },
  {
    group: "YEL48 Q6XK YEL48",
    value: 10000
  },
  {
    group: "Misc",
    value: 25000
  }
];


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
        style={{ ...style, opacity }}
        className="component draggable"
      >
        {/* <GraphTile title={component.name} description={component.content} graphType={component.graphType} showMenu /> */}
        <DonutChart data={stubData} options={donutOptions} />
        <div>{component.id}</div>
        <div>{component.content}</div>
      </div>
    </div>
  );
};
export default Component;
