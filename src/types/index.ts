export type ProjectStatus = 'Active' | 'Pending' | 'Completed' | 'On Hold'; //project status types

export interface Project {
    id: string;
    projectName: string;
    latitude: number;
    longitude: number;
    status: ProjectStatus;
    lastUpdated: string; //date in ISO format
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
}
