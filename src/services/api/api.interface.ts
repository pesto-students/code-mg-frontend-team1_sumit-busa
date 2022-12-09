import { Status } from "../../components/student/MonacoEditor";

export interface AssignmentListTeacher {
  id: number;
  title: string;
  createdAt: string;
  dueDate: string;
  _count: {
    submissions: number;
  };
}
export interface AssignmentListStudent {
  id: number;
  title: string;
  createdAt: string;
  dueDate: string;
}

export interface Assignment {
  title: string;
  problemStatement: string;
  allowedLanguages: string[];
  id: number;
  submissions: Submission[];
}

export interface Submission {
  language: string;
  submission: string;
}

export interface ClassRequest {
  name: String;
  description: String;
}
export interface ClassResponse {
  id: number;
  name: String;
  description: String;
  createdById: number;
  createdAt: String;
  updatedAt: String;
  _count: null | any;
}
export interface AddStudentRequest {
  classId: number;
  emails: String[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface CreateAssignment {
  title: string;
  dueDate?: string;
  problemStatement?: string;
  classId: number;
  maximumRunTime: number;
  testCases: TestCase[];
  allowedLanguages: string[];
}

export interface TeacherSubmissions {
  assignment: Assignment;
  submissions: {
    student: {
      fullName: string;
      email: string;
    };
    language: string;
    status: string;
    errorCount: number;
    totalCount: number;
    successCount: number;
    updatedAt: string;
  }[];
}

export interface TeacherSubmission extends Submission {
  student: { fullName: string };
  status: "Pass" | "Fail";
  result: typeof Status[keyof typeof Status];
  assignment: {
    problemStatement: string;
    title: string;
  };
}
