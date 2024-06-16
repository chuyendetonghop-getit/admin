"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

import { getDashboardAnalytics } from "@/lib/actions";
import { useEffect, useState } from "react";

const AnalyticsChart = () => {
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      const data = await getDashboardAnalytics();
      setData(data as any);
    })();
  }, []);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Analytics For This Year</CardTitle>
          <CardDescription>Views Per Month</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart
                width={1100}
                height={300}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="users"
                  stroke="#8884d8"
                  name="User"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="posts"
                  stroke="#4ad0a6"
                  name="Post"
                />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                {/* <YAxis /> */}
                <Tooltip />
                <YAxis yAxisId="left">
                  <Label
                    value="Users"
                    angle={-90}
                    position="insideLeft"
                    style={{ textAnchor: "middle" }}
                  />
                </YAxis>
                <YAxis yAxisId="right" orientation="right">
                  <Label
                    value="Posts"
                    angle={-90}
                    position="insideRight"
                    style={{ textAnchor: "middle" }}
                  />
                </YAxis>

                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AnalyticsChart;
