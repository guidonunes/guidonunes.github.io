import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/portfolio/case-study";
import { Shell } from "@/components/portfolio/shell";
import { projectKeys, isProjectKey } from "@/lib/portfolio/content";
import { pageMetadata } from "@/lib/portfolio/metadata";
export const dynamicParams = false;
export const generateStaticParams = () => projectKeys.map((slug) => ({ slug }));
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (!isProjectKey(slug)) notFound();
  return pageMetadata("en", slug);
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!isProjectKey(slug)) notFound();
  return (
    <Shell lang="en" projectKey={slug}>
      <CaseStudy lang="en" projectKey={slug} />
    </Shell>
  );
}
