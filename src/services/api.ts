import { type Project, type PaginatedResponse } from '../types';
import { MOCK_DATA } from './mockData';

const DELAY_MS = 300;

export const fetchProjects = async (
    page: number = 1,
    pageSize: number = 10,
    filterText: string = ''
): Promise<PaginatedResponse<Project>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let filteredData = MOCK_DATA;

            if (filterText) {
                const lowerFilter = filterText.toLowerCase();
                filteredData = MOCK_DATA.filter((p) =>
                    p.projectName.toLowerCase().includes(lowerFilter) ||
                    p.status.toLowerCase().includes(lowerFilter)
                );
            }

            const total = filteredData.length;
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            const data = filteredData.slice(start, end);

            resolve({
                data,
                total,
                page,
                pageSize,
            });
        }, DELAY_MS);
    });
};

export const fetchAllProjects = async (): Promise<Project[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_DATA);
        }, DELAY_MS);
    });
}
