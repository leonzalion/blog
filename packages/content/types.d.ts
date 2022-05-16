/*
	A "listing" specifies the data that is given about a content type when a minimal information is needed to display basic information on a list.

	If the content type is not suffixed, it represents all the data that is associated with the content type.

	"metadata" describes the structure of `content/metadata/<content-type>.json`, which contains listings for all entries of the content
*/

export interface ArticleListing {
	slug: string;
	title: string;
	dateCreated: string;
}

export interface Article extends ArticleListing {
	content: string;
}

export interface ArticleFileMatter {
	title: string;
	dateCreated: string;
	published: boolean;
}

/**
	Map of article slugs to article listings
*/
export type ArticlesMetadata = Record<string, ArticleListing>;

export interface DailyTimeblock {
	dateString: string;
	content: string;
}

export type DailyTimeblocksMetadata = { dateStrings: string[] };

export interface Task {
	description: string;
	completed: boolean;
	deadline?: string;
	deadlineNotes: string;
}

export interface TaskListSnapshotListing {
	dateString: string;
}

export interface TaskListSnapshot extends TaskListSnapshotListing {
	tasks: Task[];
}

/**
	Each date string is associate with a task list snapshot.
*/
export type TaskListSnapshotsMetadata = Record<string, TaskListSnapshotListing>;
