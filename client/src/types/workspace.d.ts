declare global {
    interface Workspace {
        workspaceid: string;
        name: string;
        description: string;
    }

    interface WorkspaceState {
        workspaces: Workspace[];
    }
}
export { }