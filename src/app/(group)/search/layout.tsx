import FilterSidebar from "@/components/filter-sidebar";

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-start max-w-8xl m-auto items-start px-7 max-h-[90vh] overflow-hidden">
      <div className="w-fit flex  gap-5">
      <FilterSidebar />
      {children}
      </div>
    </div>
  );
}
