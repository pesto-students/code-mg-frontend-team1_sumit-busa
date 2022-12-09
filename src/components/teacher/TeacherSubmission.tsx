import { useParams } from "react-router-dom";

const TeacherSubmission = () => {
  const { submissionId } = useParams();
  return <>Hello World{submissionId}</>;
};

export default TeacherSubmission;
