import { faker } from '@faker-js/faker';
import type { Project, ProjectStatus } from '../types';

export const generateProjects = (count: number): Project[] => {
    const projects: Project[] = [];

    faker.seed(123);

    for (let i = 0; i < count; i++) {
        const status: ProjectStatus = faker.helpers.arrayElement(['Active', 'Pending', 'Completed', 'On Hold']);

        projects.push({
            id: faker.string.uuid(),
            projectName: faker.company.name() + ' Project',
            latitude: faker.location.latitude(),
            longitude: faker.location.longitude(),
            status: status,
            lastUpdated: faker.date.recent({ days: 30 }).toISOString(),
        });
    }

    return projects;
};

// Generate 5000 records immediately to be used by the API service
export const MOCK_DATA = generateProjects(5000);
