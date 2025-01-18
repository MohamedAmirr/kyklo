import { AlarmCheck, CalendarIcon, Check } from 'lucide-react';
import { Bar, BarChart, Cell, XAxis } from 'recharts';

import { Card, CardContent } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const HomePage = () => {
  // Generate last 7 days of activity data
  const generateActivityData = () => {
    const days = 7;
    const today = new Date();

    return Array.from({ length: days }, (_, index) => {
      const date = new Date(today);
      // Now we subtract days to get the last 7 days
      date.setDate(today.getDate() - (days - 1 - index));

      return {
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        hours: Math.floor(Math.random() * 8) + 2,
      };
    });
  };

  const chartData = generateActivityData();

  const chartConfig = {
    hours: {
      label: 'Hours',
      color: 'red',
    },
  } satisfies ChartConfig;

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <h1 className="text-2xl font-bold mb-4">Good morning, Hazem👋</h1>
      <div className="flex flex-row gap-8">
        <div className="w-fit h-[400px] px-8 py-4 rounded-lg border border-gray">
          <div className="w-full flex flex-row justify-between items-center mb-4">
            <span className="text-2xl font-bold">Activity</span>
            <div className="flex flex-row gap-2 text-sm border border-gray-200 rounded-[25px] px-3 py-2">
              <CalendarIcon size={20} /> <span>Last 7 days</span>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <span className="text-[42px] font-bold">24,9</span>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Hours</span>
              <span className="text-sm text-gray-500">spent</span>
            </div>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <ChartContainer config={chartConfig} className="min-h-[200px]">
              <BarChart data={chartData}>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="hours" radius={4} opacity={0.3}>
                  {chartData.map((entry, index) => {
                    const maxHours = Math.max(...chartData.map((d) => d.hours));
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill="red"
                        opacity={entry.hours === maxHours ? 1 : 0.3}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </div>
        <div className="w-[580px] flex flex-col gap-6 border border-gray-200 rounded-lg px-8 py-8 ">
          <span className="text-2xl font-bold">Progress Statistics</span>
          <div className="flex flex-row gap-2 items-center">
            <span className="text-[42px] font-bold">64%</span>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Total</span>
              <span className="text-sm text-gray-500">activity</span>
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-between  ">
            <Card className="p-4 w-[160px]">
              <CardContent className="flex flex-col items-center justify-center gap-2">
                <AlarmCheck
                  size={42}
                  className="bg-gray-200 rounded-full p-2"
                />
                <span className="text-lg">8</span>
                <span className="text-sm text-gray-500">In Progress</span>
              </CardContent>
            </Card>
            <Card className="p-4 w-[160px]">
              <CardContent className="flex flex-col items-center justify-center gap-2">
                <Check size={42} className="bg-gray-200 rounded-full p-2" />
                <span className="text-lg">12</span>
                <span className="text-sm text-gray-500">Completed</span>
              </CardContent>
            </Card>
            <Card className="p-4 w-[160px]">
              <CardContent className="flex flex-col items-center justify-center gap-2">
                <AlarmCheck
                  size={42}
                  className="bg-gray-200 rounded-full p-2"
                />
                <span className="text-lg">14</span>
                <span className="text-sm text-gray-500">Pending</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
