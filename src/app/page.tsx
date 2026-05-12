import MainLayout from "@/components/MainLayout";
import Users from "./users/page";
import QueryProvider from "@/components/QueryProvider";

export default function Home() {
  return (
    <main>
      <QueryProvider>
        <MainLayout>
          <Users />
        </MainLayout>
      </QueryProvider>
    </main>
  );
}
