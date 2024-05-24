import { ServiceStatus } from ".";

export type Service = {
    id: string,
    name: string,
    description?: string,
    status: ServiceStatus,
    tags: string[],
    price: string;
    duration: number
};

export type DraftService = {
    id: string,
    name: string
}