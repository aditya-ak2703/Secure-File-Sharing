export interface IFile {
    id: number;
    owner: number;
    fileName: string;
    content: string;
}

export enum FILE_PERMISION {
    VIEW = "VIEW",
    DOWNLOAD = "DOWNLOAD",
}

export interface ISharableLink {
    id: number;
    permission: FILE_PERMISION;
    expiry: string;
    uuid: string;
    parent_file: number;
}