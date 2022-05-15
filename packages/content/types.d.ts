export interface ArticleListing {
	slug: string;
	title: string;
	dateCreated: Date;
}

export interface ArticleData extends ArticleListing {
	content: string;
}

/**
	Map of article slugs to article listings
*/
export type ArticlesMetadata = Record<string, ArticleListing>;

export interface DailyTimeblock {
	dailyPlans: string;
	quarterlyPlans: string;
	thoughts: string;
	timeblocks: string;
	weeklyPlans: string;
}

/**
	Array of date strings
*/
export type DailyTimeblocksMetadata = string[];

export interface TasksData {
	dateString: string;
	content: string;
}

/**
	Map of date strings to task data.
*/
export type TasksMetadata = Record<string, TasksData>;
