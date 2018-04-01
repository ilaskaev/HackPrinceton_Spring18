import { FolderDocument } from './folder-document';
export interface Folder {
    date: Date;
    documents?: FolderDocument[]
}
