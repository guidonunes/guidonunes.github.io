import { Home } from "@/components/portfolio/home";
import { Shell } from "@/components/portfolio/shell";
import { pageMetadata } from "@/lib/portfolio/metadata";
export const metadata = pageMetadata("pt");
export default function Page() {
  return (
    <Shell lang="pt">
      <Home lang="pt" />
    </Shell>
  );
}
