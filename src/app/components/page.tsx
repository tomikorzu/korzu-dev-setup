import ComponentShowcase from "@/modules/ComponentShowcase/ComponentShowcase";
import { createMetadata } from "@/modules/shared/utils/seo.util";

export const metadata = createMetadata({
  title: "Components",
  description: "Browse every shared component in the starter's library.",
  path: "/components",
});

export default function ComponentsPage() {
  return <ComponentShowcase />;
}
