export type Folder<T> = {
    name: string,
    createdOn: Date,
    services: T[]
};