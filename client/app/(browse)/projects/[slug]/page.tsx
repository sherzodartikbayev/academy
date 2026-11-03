import ForWhom from "@/components/course/for-whom";
import Review from "@/components/course/review";
import Header from "@/components/course/header";
import Learning from "@/components/course/learning";
import Curriculum from "../_components/curriculum";
import Enroll from "@/components/course/enroll";
import EnrollMobile from "@/components/course/enroll-mobile";

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

const ProjectDetailPage = async ({ params }: CourseDetailPageProps) => {
  const { slug } = await params;

  return (
    <div>
      <Header />

      <div className="flex mt-6 w-full items-start gap-x-4">
        <div className="w-full lg:w-2/3">
          <Learning />
          <Curriculum />
          <ForWhom />
          <Review />
        </div>
        <div className="hidden lg:flex lg:w-1/3 sticky top-24">
          <Enroll />
        </div>
      </div>

      <EnrollMobile />
    </div>
  );
};

export default ProjectDetailPage;
