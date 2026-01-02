// stores all the data needed for the portfolio. e.g. socials, projects, email, etc.
// needed to pass data between kaplay and react components
// more on jotai: https://github.com/pmndrs/jotai

import { atom, createStore } from "jotai";

// TODO adjust accordingly
export const isSocialModalVisibleAtom = atom(false);
export const selectLinkAtom = atom(null);
export const selectedLinkDescriptionAtom = atom("");

export const isEmailModalVisibleAtom = atom(false);
export const emailAtom = atom("");

export const isProjectModalVisibleAtom = atom(false);
export const chosenProjectDataAtom = atom({
    title: "",
    links: [{
        id: 0,
        name: "",
        link: "",
    }],
});

export const cameraZoomValueAtom = atom({ value: 1 });

export const store = createStore();
