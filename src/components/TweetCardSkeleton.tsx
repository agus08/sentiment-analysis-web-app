export const TweetCardSkeleton = () => {
  return (
    <div
      className="p-4 rounded-xl border max-w-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 animate-pulse"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded mb-1"></div>
            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
        <div className="h-6 w-6 bg-blue-300 dark:bg-blue-700 rounded-full"></div>
      </div>
      <div className="h-6 w-full bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
      <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
      <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-600 rounded"></div>
      <div className="mt-4 h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded"></div>
    </div>
  );
};
