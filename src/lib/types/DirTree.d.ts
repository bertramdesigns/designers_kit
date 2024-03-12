interface File {
    name: string;
    full_path: string;
    is_symlink: boolean;
    is_hidden: boolean;
    extension?: string;
    modified: string;
    accessed: string;
    created: string;
    size: number;
}

interface Folder {
    name: string;
    full_path: string;
    is_symlink: boolean;
    is_hidden: boolean;
    created: string;
    modified: string;
    files: File[];
    folders: Folder[];
}

type DirTree = {
    name: string;
    full_path: string;
    is_symlink: boolean;
    is_hidden: boolean;
    created: string;
    modified: string;
    files: File[];
    folders: Folder[];
};