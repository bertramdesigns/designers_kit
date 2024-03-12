// https://joyofcode.xyz/svelte-stores-guide
import { writable } from 'svelte/store';


const windowsStoreInitial = {
    workspace: {
        name: 'default',
        workspaceFolderPath: ''
    },
    sidebar: {
        show: true,
        position: "left",
        // "" and panelLeft.show = false will hide the sidebar as default
        activeTile: ""
    },
    panelRight: {
        show: false,
        panelViews: [""]
    },
    panelLeft: {
        show: false,
        panelViews: [""]
    },
};

type WindowStore = typeof windowsStoreInitial;

export const windowStore = createWindowsStore(null);

function createWindowsStore(config: WindowStore | null = null) {
    const { subscribe, set, update } = writable(config ? config : windowsStoreInitial);

    function togglePanelVis(zone: "right" | "left", visible?: boolean) {
        update(window => {
            // prepared for future multi-panel support (bottom, top, etc.)
            switch (zone) {
                case "right":
                    // toggle or set to forced state
                    visible === undefined ?
                        window.panelRight.show = !window.panelRight.show : window.panelRight.show = visible;
                    break;
                case "left":
                    visible === undefined ?
                        window.panelLeft.show = !window.panelLeft.show : window.panelLeft.show = visible;
                    break;
            }
            return window;
        });
    }
    function setSidebarActiveTile(tile: string) {
        update(window => {
            window.sidebar.activeTile = tile;
            return window;
        });
    }


    return {
        subscribe,
        togglePanelVis,
        setSidebarActiveTile,
        set,
        update
    };
}