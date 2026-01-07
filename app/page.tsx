import { MainLayout } from "@/components/main-layout"

export default function Home() {
  return (
    <MainLayout>
      {/* This inner div is a temporary placeholder for your "Glass Card" */}
      <section className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Guido Nunes
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Software Engineer
        </p>
      </section>
    </MainLayout>
  );
}
