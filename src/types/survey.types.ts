export interface ICategory {
	title: string;
	questions: string[];
	interviewedUsers: string[];
}

export interface IQuestion {
	content: string;
	category: string;
}
