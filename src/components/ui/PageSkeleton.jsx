import React from 'react';

const Shimmer = () => (
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite_linear]" />
);

export const CardSkeleton = () => (
  <div className="relative w-full rounded-[2rem] p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden min-h-[420px] flex flex-col justify-between">
    <div>
      <div className="relative w-full h-44 rounded-2xl bg-zinc-150 dark:bg-zinc-800 overflow-hidden mb-5">
        <Shimmer />
      </div>
      <div className="flex justify-between items-start mb-4">
        <div className="h-6 w-24 bg-zinc-150 dark:bg-zinc-850 rounded-full relative overflow-hidden">
          <Shimmer />
        </div>
        <div className="h-6 w-16 bg-zinc-150 dark:bg-zinc-850 rounded-full relative overflow-hidden">
          <Shimmer />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-8 w-3/4 bg-zinc-150 dark:bg-zinc-850 rounded-xl relative overflow-hidden">
          <Shimmer />
        </div>
        <div className="h-4 w-full bg-zinc-150 dark:bg-zinc-850 rounded-lg relative overflow-hidden">
          <Shimmer />
        </div>
        <div className="h-4 w-5/6 bg-zinc-150 dark:bg-zinc-850 rounded-lg relative overflow-hidden">
          <Shimmer />
        </div>
      </div>
    </div>
    <div className="mt-6 flex items-center justify-between">
      <div className="flex -space-x-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="w-10 h-10 rounded-full bg-zinc-150 dark:bg-zinc-800 border-2 border-white dark:border-zinc-900 relative overflow-hidden">
            <Shimmer />
          </div>
        ))}
      </div>
      <div className="w-12 h-12 rounded-full bg-zinc-150 dark:bg-zinc-800 relative overflow-hidden">
        <Shimmer />
      </div>
    </div>
  </div>
);

const PageSkeleton = ({ view }) => {
  const renderLandingSkeleton = () => (
    <div className="w-full min-h-screen pt-32 pb-20 px-6 lg:px-8 space-y-16">
      {/* Hero Skeleton */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="h-14 w-4/5 bg-zinc-200 dark:bg-zinc-800 rounded-2xl relative overflow-hidden">
            <Shimmer />
          </div>
          <div className="h-14 w-3/5 bg-zinc-200 dark:bg-zinc-800 rounded-2xl relative overflow-hidden">
            <Shimmer />
          </div>
          <div className="space-y-3 pt-4">
            <div className="h-5 w-full bg-zinc-150 dark:bg-zinc-850 rounded-lg relative overflow-hidden">
              <Shimmer />
            </div>
            <div className="h-5 w-11/12 bg-zinc-150 dark:bg-zinc-850 rounded-lg relative overflow-hidden">
              <Shimmer />
            </div>
          </div>
          <div className="flex gap-4 pt-6">
            <div className="h-14 w-40 bg-zinc-200 dark:bg-zinc-800 rounded-2xl relative overflow-hidden">
              <Shimmer />
            </div>
            <div className="h-14 w-44 bg-zinc-200 dark:bg-zinc-800 rounded-2xl relative overflow-hidden">
              <Shimmer />
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
            <Shimmer />
          </div>
        </div>
      </div>

      {/* Grid Cards Section */}
      <div className="max-w-7xl mx-auto space-y-8 pt-10">
        <div className="h-10 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-xl relative overflow-hidden">
          <Shimmer />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  );

  const renderCatalogSkeleton = () => (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-8 bg-zinc-50/50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4">
          <div className="h-12 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-2xl relative overflow-hidden">
            <Shimmer />
          </div>
          <div className="h-6 w-96 bg-zinc-150 dark:bg-zinc-850 rounded-xl relative overflow-hidden">
            <Shimmer />
          </div>
        </div>

        {/* Filter Tabs Skeleton */}
        <div className="flex gap-3 overflow-x-auto pb-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-12 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-2xl shrink-0 relative overflow-hidden">
              <Shimmer />
            </div>
          ))}
        </div>

        {/* Grid of Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderDashboardSkeleton = () => (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-8 bg-zinc-50/50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile Card Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white dark:bg-zinc-900 p-10 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-8">
            <div className="w-28 h-28 rounded-full bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
              <Shimmer />
            </div>
            <div className="space-y-3">
              <div className="h-10 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-xl relative overflow-hidden">
                <Shimmer />
              </div>
              <div className="h-5 w-64 bg-zinc-150 dark:bg-zinc-850 rounded-lg relative overflow-hidden">
                <Shimmer />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-28 w-36 bg-zinc-150 dark:bg-zinc-850 rounded-2xl relative overflow-hidden">
              <Shimmer />
            </div>
            <div className="h-28 w-36 bg-zinc-150 dark:bg-zinc-850 rounded-2xl relative overflow-hidden">
              <Shimmer />
            </div>
          </div>
        </div>

        {/* Ticket Profile Card + Alerts Skeletons */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-80 h-96 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 relative overflow-hidden">
            <Shimmer />
          </div>
          <div className="flex-1 w-full space-y-3">
            <div className="h-16 w-full bg-zinc-200 dark:bg-zinc-800 rounded-2xl relative overflow-hidden"><Shimmer /></div>
            <div className="h-16 w-full bg-zinc-200 dark:bg-zinc-800 rounded-2xl relative overflow-hidden"><Shimmer /></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderParentsSkeleton = () => (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-8 bg-zinc-50/50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="h-12 w-80 bg-zinc-200 dark:bg-zinc-800 rounded-2xl relative overflow-hidden"><Shimmer /></div>
          <div className="h-6 w-96 bg-zinc-150 dark:bg-zinc-850 rounded-xl relative overflow-hidden"><Shimmer /></div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="h-32 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-150 dark:border-zinc-800 relative overflow-hidden"><Shimmer /></div>
          <div className="h-32 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-150 dark:border-zinc-800 relative overflow-hidden"><Shimmer /></div>
          <div className="h-32 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-150 dark:border-zinc-800 relative overflow-hidden"><Shimmer /></div>
        </div>
      </div>
    </div>
  );

  const renderProfileSkeleton = () => (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-8 bg-zinc-50/50 dark:bg-zinc-950">
      <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-[2.5rem] border border-zinc-150 dark:border-zinc-800 shadow-sm space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-28 h-28 rounded-full bg-zinc-250 dark:bg-zinc-800 relative overflow-hidden"><Shimmer /></div>
          <div className="h-6 w-40 bg-zinc-200 dark:bg-zinc-800 rounded-md relative overflow-hidden"><Shimmer /></div>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-850 rounded relative overflow-hidden"><Shimmer /></div>
            <div className="h-14 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl relative overflow-hidden"><Shimmer /></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-850 rounded relative overflow-hidden"><Shimmer /></div>
            <div className="h-14 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl relative overflow-hidden"><Shimmer /></div>
          </div>
          <div className="h-14 w-full bg-zinc-200 dark:bg-zinc-800 rounded-2xl relative overflow-hidden"><Shimmer /></div>
        </div>
      </div>
    </div>
  );

  const renderPricingSkeleton = () => (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-8 bg-zinc-50/50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="h-12 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-2xl mx-auto relative overflow-hidden"><Shimmer /></div>
          <div className="h-6 w-96 bg-zinc-150 dark:bg-zinc-850 rounded-xl mx-auto relative overflow-hidden"><Shimmer /></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="h-[500px] bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-150 dark:border-zinc-800 relative overflow-hidden"><Shimmer /></div>
          <div className="h-[500px] bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-150 dark:border-zinc-800 relative overflow-hidden"><Shimmer /></div>
        </div>
      </div>
    </div>
  );

  switch (view) {
    case 'landing':
      return renderLandingSkeleton();
    case 'catalog':
      return renderCatalogSkeleton();
    case 'dashboard':
      return renderDashboardSkeleton();
    case 'parents':
      return renderParentsSkeleton();
    case 'profile':
      return renderProfileSkeleton();
    case 'pricing':
      return renderPricingSkeleton();
    default:
      return renderCatalogSkeleton();
  }
};

export default PageSkeleton;
