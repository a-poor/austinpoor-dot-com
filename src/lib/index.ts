import _projectData from '../../content/projects.json';

export interface IProjectData {
    title: string;
    description: string;
    href: string;
}
export const projectData: IProjectData[] = _projectData;

