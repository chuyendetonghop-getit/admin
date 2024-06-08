import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import GroupCard from "@/components/dashboard/GroupCard";
import PostsTable from "@/components/posts/PostsTable";

export default async function Home() {
  return (
    <>
      <GroupCard />
      <AnalyticsChart />
      <PostsTable title="Latest Posts" limit={5} />
    </>
  );
}
