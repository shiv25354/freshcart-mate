
const LoadingState = () => {
  return (
    <div className="px-4 space-y-4">
      <div className="h-[300px] bg-muted animate-pulse rounded-lg"></div>
      <div className="h-16 bg-muted animate-pulse rounded-lg"></div>
      <div className="h-20 bg-muted animate-pulse rounded-lg"></div>
      <div className="h-40 bg-muted animate-pulse rounded-lg"></div>
    </div>
  );
};

export default LoadingState;
