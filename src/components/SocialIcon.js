import { PALETTE } from "../constants";
import makeIcon from "./Icon";
import { opacityTrickleDown } from "../utils";
import { atom } from "jotai";
import { isSocialModalVisibleAtom, selectedLinkDescriptionAtom, selectedLinkAtom, store } from "../store";

export default function makeSocialIcon(k, parent, posVec2, imageData, subtitle, link, description){
    
    const [socialIcon, subtitleText] = makeIcon(
        k, 
        parent, 
        posVec2, 
        imageData, 
        subtitle,
    );

    const linkSwitch = socialIcon.add([ // child of icon - collision area to open window
        k.circle(30),
        k.color(k.Color.fromHex(PALETTE.colour3)),
        k.anchor("center"),
        k.area(),
        k.pos(0, 170),
        k.opacity(0),
    ]);

    linkSwitch.onCollide("player", () => {
        store.set(isSocialModalVisibleAtom, true);
        store.set(selectedLinkAtom, link);
        store.set(selectedLinkDescriptionAtom, description);
    });

    opacityTrickleDown(parent, [subtitleText, linkSwitch]); // make subtitle and circle appear

    return socialIcon;

}