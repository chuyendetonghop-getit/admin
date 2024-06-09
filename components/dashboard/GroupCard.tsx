import React from "react";
import DashboardCardItem from "./DashboardCard";
import { Flag, Newspaper, User } from "lucide-react";
import { getDashboardCommonStatistics } from "@/lib/actions";

async function GroupCard() {
  const result = await getDashboardCommonStatistics();

  console.log("->>", result);
  return (
    <div className="flex flex-col md:flex-row justify-evenly gap-5 mb-5">
      <DashboardCardItem
        title="Users"
        count={result?.data?.[0] ?? 111}
        icon={<User className="text-slate-500" size={72} />}
      />

      <DashboardCardItem
        title="Posts"
        count={result?.data?.[1] ?? 222}
        icon={<Newspaper className="text-slate-500" size={72} />}
      />
      <DashboardCardItem
        title="Reports"
        count={result?.data?.[2] ?? 333}
        icon={<Flag className="text-slate-500" size={72} />}
      />
    </div>
  );
}

export default GroupCard;
