import { PALETTE } from "../constants";

export default function makeSection(k, posVec2, sectionName, onCollide=null) {

    // TODO make it so that you transition to a new scene when colliding with this section
    // section game object
    const section = k.add([
        k.rect(200, 200, {radius: 10}),
        k.anchor("center"),
        k.area(), // ! must have this for collisions to work
        k.pos(posVec2),
        k.color(PALETTE.colour3),
        sectionName, // tag to identify the section
    ]);
    section.add([
        k.text(sectionName, {font: "Determination Mono", size: 64}),
        k.color(PALETTE.colour3),
        k.anchor("center"),
        k.pos(0, -150)
    ]);

    if(onCollide){
        const onCollideController = section.onCollide("player", () => {
            onCollide(section);
            onCollideController.cancel(); // prevent multiple triggers/duplicates
        });
    }

    return section;
}