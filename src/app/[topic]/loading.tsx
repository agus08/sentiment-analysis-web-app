import { TweetCardSkeleton } from "@/components/TweetCardSkeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <div className="flex flex-col space-y-6">
    {[1, 2, 3, 4].map((_, i) => (<TweetCardSkeleton key={i} />))}
  </div>
}