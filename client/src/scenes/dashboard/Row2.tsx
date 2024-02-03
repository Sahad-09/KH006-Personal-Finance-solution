import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
// import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import {
  Tooltip,
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

// Dummy data
// Updated Dummy Data for Row1
const dummyOperationalData = [
  {
    monthlyData: [
      {
        month: "January",
        operationalExpenses: 5000,
        nonOperationalExpenses: 3000,
      },
      {
        month: "February",
        operationalExpenses: 6000,
        nonOperationalExpenses: 3500,
      },
      // Add more months as needed
      {
        month: "March",
        operationalExpenses: 5500,
        nonOperationalExpenses: 3200,
      },
      {
        month: "April",
        operationalExpenses: 4800,
        nonOperationalExpenses: 2800,
      },
      {
        month: "May",
        operationalExpenses: 5200,
        nonOperationalExpenses: 3100,
      },
      {
        month: "June",
        operationalExpenses: 6700,
        nonOperationalExpenses: 4000,
      },
      {
        month: "July",
        operationalExpenses: 7200,
        nonOperationalExpenses: 4300,
      },
      {
        month: "August",
        operationalExpenses: 5800,
        nonOperationalExpenses: 3400,
      },
      {
        month: "September",
        operationalExpenses: 6200,
        nonOperationalExpenses: 3600,
      },
      {
        month: "October",
        operationalExpenses: 6800,
        nonOperationalExpenses: 3800,
      },
    ],
  },
];

const dummyProductData = [
  { _id: "1", price: 50, expense: 20 },
  { _id: "2", price: 80, expense: 30 },
  // Add more product entries as needed
  { _id: "3", price: 60, expense: 25 },
  { _id: "4", price: 70, expense: 35 },
  { _id: "5", price: 90, expense: 40 },
  { _id: "6", price: 55, expense: 22 },
  { _id: "7", price: 75, expense: 28 },
  { _id: "8", price: 85, expense: 32 },
  { _id: "9", price: 65, expense: 26 },
  { _id: "10", price: 95, expense: 45 },
];

const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
  // Add more data as needed
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 150 },
  { name: "Group F", value: 120 },
  { name: "Group G", value: 80 },
  { name: "Group H", value: 50 },
  { name: "Group I", value: 30 },
  { name: "Group J", value: 20 },
];

const Row2 = () => {
  // const { palette } = useTheme();
  // const pieColors = [palette.primary[800], palette.primary[300]];
  // const { data: operationalData } = useGetKpisQuery();
  // const { data: productData } = useGetProductsQuery();

  // const operationalExpenses = useMemo(() => {
  //   return (
  //     operationalData &&
  //     operationalData[0].monthlyData.map(
  //       ({ month, operationalExpenses, nonOperationalExpenses }) => {
  //         return {
  //           name: month.substring(0, 3),
  //           "Operational Expenses": operationalExpenses,
  //           "Non Operational Expenses": nonOperationalExpenses,
  //         };
  //       }
  //     )
  //   );
  // }, [operationalData]);

  // const productExpenseData = useMemo(() => {
  //   return (
  //     productData &&
  //     productData.map(({ _id, price, expense }) => {
  //       return {
  //         id: _id,
  //         price: price,
  //         expense: expense,
  //       };
  //     })
  //   );
  // }, [productData]);
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];

  // Replace API calls with dummy data
  const operationalData = dummyOperationalData;
  const productData = dummyProductData;

  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Operational Expenses": operationalExpenses,
            "Non Operational Expenses": nonOperationalExpenses,
          };
        }
      )
    );
  }, [operationalData]);

  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price: price,
          expense: expense,
        };
      })
    );
  }, [productData]);

  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Operational vs Non-Operational Expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpenses}
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
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e">
        <BoxHeader title="Campaigns and Targets" sideText="+4%" />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}>
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">
              Finance goals of the campaign that is desired
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography mt="0.4rem" variant="h5">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              Margins are up by 30% from last month.
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="f">
        <BoxHeader title="Product Prices vs Expenses" sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}>
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
