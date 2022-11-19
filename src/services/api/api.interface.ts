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
