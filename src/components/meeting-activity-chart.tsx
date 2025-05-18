import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { Card, CardBody, CardHeader } from "@heroui/react";

interface MeetingData {
  name: string;
  meetings: number;
  participants: number;
}

const data: MeetingData[] = [
  { name: "Mon", meetings: 12, participants: 48 },
  { name: "Tue", meetings: 19, participants: 67 },
  { name: "Wed", meetings: 15, participants: 58 },
  { name: "Thu", meetings: 22, participants: 93 },
  { name: "Fri", meetings: 18, participants: 62 },
  { name: "Sat", meetings: 8, participants: 24 },
  { name: "Sun", meetings: 5, participants: 15 }
];

export const MeetingActivityChart: React.FC = () => {
  return (
    <Card className="gradient-card shadow-md h-full">
      <CardHeader className="flex flex-col gap-1 pb-0">
        <h3 className="text-lg font-semibold">Meeting Activity</h3>
        <p className="text-sm text-foreground-500">Last 7 days</p>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorMeetings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--heroui-primary-500))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--heroui-primary-500))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorParticipants" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--heroui-secondary-500))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--heroui-secondary-500))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--heroui-default-200))" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              style={{
                fontSize: "12px",
                fill: "hsl(var(--heroui-foreground-500))"
              }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              style={{
                fontSize: "12px",
                fill: "hsl(var(--heroui-foreground-500))"
              }}
            />
            <Tooltip
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
              wrapperStyle={{
                fontSize: "12px",
                paddingTop: "10px"
              }}
            />
            <Area
              type="monotone"
              dataKey="meetings"
              stroke="hsl(var(--heroui-primary-500))"
              fillOpacity={1}
              fill="url(#colorMeetings)"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Area
              type="monotone"
              dataKey="participants"
              stroke="hsl(var(--heroui-secondary-500))"
              fillOpacity={1}
              fill="url(#colorParticipants)"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};