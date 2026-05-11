import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import styled from "styled-components";
import Heading from '../../ui/Heading';
import { useDarkMode } from "../../contexts/DarkMode";

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  { duration: "1 night", value: 0, color: "#ef4444" },
  { duration: "2 nights", value: 0, color: "#f97316" },
  { duration: "3 nights", value: 0, color: "#eab308" },
  { duration: "4-5 nights", value: 0, color: "#84cc16" },
  { duration: "6-7 nights", value: 0, color: "#22c55e" },
  { duration: "8-14 nights", value: 0, color: "#14b8a6" },
  { duration: "15-21 nights", value: 0, color: "#3b82f6" },
  { duration: "21+ nights", value: 0, color: "#a855f7" },
];

const startDataDark = [
  { duration: "1 night", value: 0, color: "#b91c1c" },
  { duration: "2 nights", value: 0, color: "#c2410c" },
  { duration: "3 nights", value: 0, color: "#a16207" },
  { duration: "4-5 nights", value: 0, color: "#4d7c0f" },
  { duration: "6-7 nights", value: 0, color: "#15803d" },
  { duration: "8-14 nights", value: 0, color: "#0f766e" },
  { duration: "15-21 nights", value: 0, color: "#1d4ed8" },
  { duration: "21+ nights", value: 0, color: "#7e22ce" },
];

function prepareData(startData, stays) {
  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;

      if (num === 1) return arr.map(obj => obj.duration === "1 night" ? { ...obj, value: obj.value + 1 } : obj);
      if (num === 2) return arr.map(obj => obj.duration === "2 nights" ? { ...obj, value: obj.value + 1 } : obj);
      if (num === 3) return arr.map(obj => obj.duration === "3 nights" ? { ...obj, value: obj.value + 1 } : obj);
      if ([4, 5].includes(num)) return arr.map(obj => obj.duration === "4-5 nights" ? { ...obj, value: obj.value + 1 } : obj);
      if ([6, 7].includes(num)) return arr.map(obj => obj.duration === "6-7 nights" ? { ...obj, value: obj.value + 1 } : obj);
      if (num >= 8 && num <= 14) return arr.map(obj => obj.duration === "8-14 nights" ? { ...obj, value: obj.value + 1 } : obj);
      if (num >= 15 && num <= 21) return arr.map(obj => obj.duration === "15-21 nights" ? { ...obj, value: obj.value + 1 } : obj);
      if (num > 21) return arr.map(obj => obj.duration === "21+ nights" ? { ...obj, value: obj.value + 1 } : obj);

      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

export default function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox>
      <Heading as="h4">Stay duration</Heading>

      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="50%"
            cy="50%"
            paddingAngle={5}
          >
            {data.map((entry) => (
              <Cell 
                key={entry.duration} 
                fill={entry.color} 
                stroke={entry.color} 
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}