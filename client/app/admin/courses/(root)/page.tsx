import CreateCourseModal from "./_components/create-course-modal";

const CoursesPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold font-space-grotesk">Courses</h2>

        <CreateCourseModal />
      </div>
    </div>
  );
};

export default CoursesPage;
