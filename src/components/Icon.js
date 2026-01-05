import { PALETTE } from "../constants";

// to make all icons needed (socials, tools, etc.)
export default function makeIcon(k, parent, posVec2, imageData, subtitle){

    const icon = parent.add([
        k.sprite(imageData.name, {
            width: imageData.width,
            height: imageData.height,
        }),
        k.anchor("center"),
        k.pos(posVec2),
        k.opacity(0),
        k.offscreen({ hide: true, distance: 300 }), // saving performance
    ]);

    const subtitleText = icon.add([ // child of icon
        k.text(subtitle, {font: "Determination Mono", size: 32}),
        k.color(k.Color.fromHex(PALETTE.colour3)),
        k.anchor("center"),
        k.pos(0, 100), // position relative to icon
        k.opacity(0),
    ]);

    return [icon, subtitleText];
}