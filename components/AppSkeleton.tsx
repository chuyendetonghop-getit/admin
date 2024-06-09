import React from "react";
import { Skeleton } from "./ui/skeleton";

type SkeletonProps = {
  numberOfLines?: number;
};

function AppSkeleton({ numberOfLines = 10 }: SkeletonProps) {
  return (
    <div className="p-3">
      {Array.from({ length: numberOfLines }).map((_, index) => (
        // <div
        //   key={index}
        //   className="animate-pulse bg-gray-200 h-8 my-1 w-full"
        // />
        <Skeleton className="w-full h-[30px] rounded-full mt-4" />
      ))}
    </div>
  );
}

export default AppSkeleton;
