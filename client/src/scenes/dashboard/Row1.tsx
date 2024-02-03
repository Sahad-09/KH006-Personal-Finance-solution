import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
// import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  BarChart,
  Bar,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  Area,
} from "recharts";

// Dummy Data
// Updated Dummy Data for Row2
const dummyData = [
  {
    monthlyData: [
      { month: "January", revenue: 15000, expenses: 10000 },
      { month: "February", revenue: 18000, expenses: 12000 },
      // Add more months as needed
      { month: "March", revenue: 20000, expenses: 11000 },
      { month: "April", revenue: 17000, expenses: 10500 },
      { month: "May", revenue: 19000, expenses: 11500 },
      { month: "June", revenue: 21000, expenses: 12500 },
      { month: "July", revenue: 16000, expenses: 9500 },
      { month: "August", revenue: 22000, expenses: 13500 },
      { month: "September", revenue: 18000, expenses: 11000 },
      { month: "October", revenue: 20000, expenses: 12000 },
      { month: "November", revenue: 23000, expenses: 14000 },
      { month: "December", revenue: 19000, expenses: 11500 },
    ],
  },
  // Add more data objects as needed
  {
    monthlyData: [
      { month: "January", revenue: 12000, expenses: 8000 },
      { month: "February", revenue: 15000, expenses: 10000 },
      { month: "March", revenue: 17000, expenses: 11000 },
      { month: "April", revenue: 14000, expenses: 9000 },
      { month: "May", revenue: 16000, expenses: 10000 },
      { month: "June", revenue: 18000, expenses: 11000 },
      { month: "July", revenue: 13000, expenses: 8000 },
      { month: "August", revenue: 19000, expenses: 12000 },
      { month: "September", revenue: 16000, expenses: 10000 },
      { month: "October", revenue: 18000, expenses: 11000 },
      { month: "November", revenue: 20000, expenses: 12000 },
      { month: "December", revenue: 17000, expenses: 10500 },
    ],
  },
];

const revenueExpensesDummy = dummyData[0].monthlyData.map(
  ({ month, revenue, expenses }) => ({
    name: month.substring(0, 3),
    revenue,
    expenses,
  })
);

const revenueProfitDummy = dummyData[0].monthlyData.map(
  ({ month, revenue, expenses }) => ({
    name: month.substring(0, 3),
    revenue,
    profit: (revenue - expenses).toFixed(2),
  })
);

const revenueDummy = dummyData[0].monthlyData.map(({ month, revenue }) => ({
  name: month.substring(0, 3),
  revenue,
}));

const Row1 = () => {
  const { palette } = useTheme();

  const revenueExpenses = useMemo(() => revenueExpensesDummy, []);
  const revenueProfit = useMemo(() => revenueProfitDummy, []);
  const revenue = useMemo(() => revenueDummy, []);

  // const { palette } = useTheme();
  // const { data } = useGetKpisQuery();

  // console.log(data);

  // const revenue = useMemo(() => {
  //   return (
  //     data &&
  //     data[0].monthlyData.map(({ month, revenue }) => {
  //       return {
  //         name: month.substring(0, 3),
  //         revenue: revenue,
  //       };
  //     })
  //   );
  // }, [data]);

  // const revenueExpenses = useMemo(() => {
  //   return (
  //     data &&
  //     data[0].monthlyData.map(({ month, revenue, expenses }) => {
  //       return {
  //         name: month.substring(0, 3),
  //         revenue: revenue,
  //         expenses: expenses,
  //       };
  //     })
  //   );
  // }, [data]);

  // const revenueProfit = useMemo(() => {
  //   return (
  //     data &&
  //     data[0].monthlyData.map(({ month, revenue, expenses }) => {
  //       return {
  //         name: month.substring(0, 3),
  //         revenue: revenue,
  //         profit: (revenue - expenses).toFixed(2),
  //       };
  //     })
  //   );
  // }, [data]);

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Revenue and Expenses"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              tick={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              tick={{ fontSize: "10px" }}
              domain={[8000, 23000]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="b">
        <BoxHeader
          title="Profit and Revenue"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={revenueProfit}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tick={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Revenue Month by Month"
          subtitle="graph representing the revenue month by month"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={revenue}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
