import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import GroupCard from "@/components/dashboard/GroupCard";
import PostsTable from "@/components/posts/PostsTable";

export default async function Home() {
  return (
    <div className="flex flex-col justify-evenly h-full ">
      <GroupCard />
      <AnalyticsChart />
      {/* <PostsTable title="Latest Posts" limit={5} /> */}
    </div>
  );
}
