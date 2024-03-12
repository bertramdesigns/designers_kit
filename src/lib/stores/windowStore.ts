// https://joyofcode.xyz/svelte-stores-guide
import { writable } from 'svelte/store';


const windowsStoreInitial = {
    workspace: {
        name: 'default',
        workspaceFolderPath: ''
    },
    sidebar: {
        show: true,
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

    function togglePanelVis(zone: "right" | "left") {
        update(window => {
            // prepared for future multi-panel support (bottom, top, etc.)
            switch (zone) {
                case "right":
                    window.panelRight.show = !window.panelRight.show;
                    break;
                case "left":
                    window.panelLeft.show = !window.panelLeft.show;
                    break;
            }
            return window;
        });
    }

    return {
        subscribe,
        togglePanelVis
    };
}