import ServiceStatus from "./serviceStatus";

export type Service = { 
    id: string,
    name: string,
    description?: string,
    status: ServiceStatus,
    tags?: string[],
};

export type DraftService = {
    id: string,
    name: string
}