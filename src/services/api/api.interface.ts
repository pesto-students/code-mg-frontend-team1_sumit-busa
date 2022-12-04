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
}
