import { notFound } from "next/navigation";
import DepartmentGallery from "@/app/components/DepartmentGallery";
import { getInspirationDepartment} from "@/app/lib/inspiration/data";

export default async function InspirationDepartmentPage({ params }) {
  const { department } = await params;

  const data = await getInspirationDepartment(department);

  // If user goes to /inspiration/random → 404
  if (!data) {
    notFound();
  }

  return (
    <DepartmentGallery
      subtitle={data.subtitle}
      title={data.title}
      items={data.items}
    />
  );
}