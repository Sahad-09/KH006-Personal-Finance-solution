import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { Box, Button, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import regression, { DataPoint } from "regression";

const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:4000/kpi");
    const data = response.data;

    console.log("YOYO ", data[0].monthlyData);

    for (let i = 0; i < 10; i++) {
      // console.log(`Month: ${data[0].monthlyData[i].month}`);
      // console.log(`Revenue: ${data[0].monthlyData[i].revenue}`);
      // console.log(`Expenses: ${data[0].monthlyData[i].expenses}`);
      console.log("-----------");
    }

    // Replace 'your_api_endpoint_here' with the actual API endpoint

    // // Now you can access the data properties like totalProfit, totalRevenue, etc.
    // console.log("Total Revenue:", data.totalRevenue);
    // console.log("Total Expenses:", data.totalExpenses);

    // // Access monthlyData array
    // const monthlyData = data.monthlyData;
    // monthlyData.forEach((month) => {
    //   console.log("Month:", month.month);
    //   console.log("Revenue:", month.revenue);
    //   console.log("Expenses:", month.expenses);
    //   console.log("Operational Expenses:", month.operationalExpenses);
    //   console.log("Non-Operational Expenses:", month.nonOperationalExpenses);
    //   console.log("------------------------");
    // });
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

// Call the fetchData function

const Predictions = () => {
  const [response, setResponse] = useState("");
  const [prompt, setPrompt] = useState("");

  const currentData = `{ month: "January", revenue: 15000, expenses: 10000 },
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
  { month: "December", revenue: 19000, expenses: 11500 },`;

  fetchData();
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);
  const [predictedValues, setPredictedValues] = useState("");

  const monthlyData = [
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
  ];

  const formattedData = useMemo(() => {
    const formatted: Array<DataPoint> = monthlyData.map(
      ({ revenue }, i: number) => {
        return [i, revenue];
      }
    );
    const regressionLine = regression.linear(formatted);

    const result = monthlyData.map(({ month, revenue }, i: number) => {
      const predictedRevenue = regressionLine.predict(i + 12)[1];
      console.log(`Predicted Revenue for ${month}: ${predictedRevenue}`);
      return {
        name: month,
        "Actual Revenue": revenue,
        "Regression Line": regressionLine.points[i][1],
        "Predicted Revenue": predictedRevenue,
      };
    });

    return result;
  }, [monthlyData]);

  return (
    <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
      <div className="container">
        <Button
          onClick={async () => {
            const res = await axios.post("http://localhost:3000/chat", {
              prompt,
            });
            setIsPredictions(!isPredictions);
            setResponse(res.data);
            setPrompt("Give financial tips");
          }}
          sx={{
            color: palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
          }}>
          Show Predicted Revenue for Next Year
        </Button>
        <Typography variant="h3">Revenue and Predictions</Typography>
      </div>
      <Box>
        <Typography variant="h6">
          charted revenue and predicted revenue based on a simple linear
          regression model
        </Typography>
      </Box>
      <Typography variant="h6">{response}</Typography>
      <FlexBetween m="1rem 2.5rem" gap="1rem"></FlexBetween>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}>
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
            <Label value="Month" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={[12000, 26000]}
            axisLine={{ strokeWidth: "0" }}
            style={{ fontSize: "10px" }}
            tickFormatter={(v) => `$${v}`}>
            <Label
              value="Revenue in USD"
              angle={-90}
              offset={-5}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="Actual Revenue"
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Regression Line"
            stroke="#8884d8"
            dot={{ strokeWidth: 5 }} // Add this line to render dots
          />
          {isPredictions && (
            <Line
              strokeDasharray="5 5"
              dataKey="Predicted Revenue"
              stroke={palette.secondary[500]}
              dot={{ strokeWidth: 5 }} // Add this line to render dots
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Predictions;
