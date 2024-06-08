import PostsPagination from "@/components/posts/PostsPagination";
import PostsTable from "@/components/posts/PostsTable";

const PostsPage = () => {
  return (
    <>
      <PostsTable />
      <PostsPagination />
    </>
  );
};

export default PostsPage;
