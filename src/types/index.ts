export type ProjectStatus = 'Active' | 'Pending' | 'Completed' | 'On Hold';

export interface Project {
    id: string;
    projectName: string;
    latitude: number;
    longitude: number;
    status: ProjectStatus;
    lastUpdated: string; // ISO Date string
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
}
