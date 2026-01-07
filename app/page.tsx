import { MainLayout } from "@/components/main-layout"
import { Card } from "@/components/card"
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <MainLayout>
      <Card>
        {/* This inner div is a temporary placeholder for your "Glass Card" */}
        <Hero />
      </Card>
    </MainLayout>
  );
}
