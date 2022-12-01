import { useDrag } from 'react-dnd';
import { SIDEBAR_ITEM } from '../utils/constants';
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

type SideBarItemType = {
  data: any;
};


const SideBarItem = ({ data }: SideBarItemType) => {
  console.log(data);
  const [{ opacity }, drag] = useDrag({
    type: SIDEBAR_ITEM,
    item: data,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  return (
    <div className="sideBarItem" ref={drag} style={{ opacity }}>

      <DonutChart data={stubData} options={donutOptions} />
      {data.component.type}
    </div>
  );
};
export default SideBarItem;
