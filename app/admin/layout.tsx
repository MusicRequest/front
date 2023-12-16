import NavBar from "./ui/NavBar";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { eventId: string };
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 min-h-screen">
      <NavBar />
      <>{children}</>
    </div>
  );
}
