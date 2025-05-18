import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";
import { Card, CardBody, CardHeader } from "@heroui/react";

interface DurationData {
  name: string;
  value: number;
  color: string;
}

const data: DurationData[] = [
  { name: "< 30 min", value: 35, color: "hsl(var(--heroui-primary-400))" },
  { name: "30-60 min", value: 45, color: "hsl(var(--heroui-primary-600))" },
  { name: "1-2 hours", value: 15, color: "hsl(var(--heroui-secondary-400))" },
  { name: "> 2 hours", value: 5, color: "hsl(var(--heroui-secondary-600))" }
];

export const MeetingDurationChart: React.FC = () => {
  return (
    <Card className="gradient-card shadow-md h-full">
      <CardHeader className="flex flex-col gap-1 pb-0">
        <h3 className="text-lg font-semibold">Meeting Duration</h3>
        <p className="text-sm text-foreground-500">Distribution by length</p>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              innerRadius={60}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}%`, "Percentage"]}
              contentStyle={{
                backgroundColor: "hsl(var(--heroui-content1))",
                borderColor: "hsl(var(--heroui-divider))",
                borderRadius: "8px",
                boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.1)"
              }}
              itemStyle={{
                fontSize: "12px",
                color: "hsl(var(--heroui-foreground))"
              }}
              labelStyle={{
                fontSize: "14px",
                fontWeight: "600",
                color: "hsl(var(--heroui-foreground))"
              }}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                fontSize: "12px",
                paddingTop: "20px"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};