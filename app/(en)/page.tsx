import { Home } from "@/components/portfolio/home";
import { Shell } from "@/components/portfolio/shell";
import { pageMetadata } from "@/lib/portfolio/metadata";
export const metadata = pageMetadata("en");
export default function Page() {
  return (
    <Shell lang="en">
      <Home lang="en" />
    </Shell>
  );
}
