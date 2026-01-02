// where we call kaplay functions
import makeSection from "./components/Section";
import { PALETTE } from "./constants";
import makePlayer from "./entities/Player";
import makeKaplayCtx from "./kaplayCtx";
import { cameraZoomValueAtom, store } from "./store";

// ! can't use default async for some reason - will investigate later (maybe)
export async function initGame(){ // async because we'll load json files
    const k = makeKaplayCtx(); // global kaplay context
    // * loadSprite is a kaplay function to load an image as a sprite
    // TODO remake oc spritesheet - 32x32 for higher res
    k.loadSprite("player", "./sprites/grian-sprite-sheet.png", {
        sliceX: 2,
        sliceY: 4,
        anims: {
            "walk-down-idle": 0,
            "walk-down": { from: 0, to: 1, loop: true},
            "walk-left-idle": 2,
            "walk-left": { from: 2, to: 3, loop: true},
            "walk-right-idle": 4,
            "walk-right": { from: 4, to: 5, loop: true},
            "walk-up-idle": 6,
            "walk-up": { from: 6, to: 7, loop: true},
            // TODO add diaganal movement animations - this is a temporary fix
            "walk-left-down-idle": 2,
            "walk-left-down": { from: 2, to: 3, loop: true},
            "walk-right-down-idle": 4,
            "walk-right-down": { from: 4, to: 5, loop: true},
            "walk-left-up-idle": 2,
            "walk-left-up": { from: 2, to: 3, loop: true},
            "walk-right-up-idle": 4,
            "walk-right-up": { from: 4, to: 5, loop: true},
        }  
    });
    k.loadFont("Determination Mono", "./fonts/DeterminationMonoWeb.ttf");
    // TODO create/source logos and replace loads
    // ! add more if applicable
    k.loadSprite("github-logo", "./logos/sample.webp");
    k.loadSprite("linkedin-logo", "./logos/sample.webp");
    k.loadSprite("instagram-logo", "./logos/sample.webp");
    k.loadSprite("linktree-logo", "./logos/sample.webp");
   
    // TODO have water as the shader and overlay it with a tilemap/just map - add conlisions too
    // Load your 16x16 tiles
    k.loadSprite("water-tile-1", "./tiles/023.png", { wrap: "repeat" });
    k.loadSprite("water-tile-2", "./tiles/024.png", { wrap: "repeat" });
    // k.loadShaderURL("tiledPattern", null, "./shaders/tiledPattern.frag");

    if (k.width() < 1000) {
        store.set(cameraZoomValueAtom, 0.5);
        k.camScale(k.vec2(0.5)); // on smaller screens, set a lower zoom
    }else{
        store.set(cameraZoomValueAtom, 0.8);
        k.camScale(k.vec2(0.8));
    }

    k.onUpdate(() => {
        const camZoomValue = store.get(cameraZoomValueAtom);
        if(camZoomValue !== k.camScale())
            k.camScale(k.vec2(camZoomValue));
    });


    // const tiledBackground = k.add([
    //     k.uvquad(k.width(), k.height()),
    //     k.shader("tiledPattern", () => ({
    //         u_time: k.time() / 10,
    //         // Ensure these are correctly referenced
    //         u_tex1: k.getSprite("water-tile-1").tex, 
    //         u_tex2: k.getSprite("water-tile-1").tex,
    //         u_speed: k.vec2(0.5, -0.5),
    //         u_aspect: k.width() / k.height(),
    //         u_size: 10.0,
    //     })),
    //     k.pos(0),
    //     k.fixed(),
    // ]);

    // ! original tiled background shader code
    k.loadShaderURL("tiledPattern", null, "./shaders/tiledPattern.frag");
    const tiledBackground = k.add([
        k.uvquad(k.width(), k.height()),
        k.shader("tiledPattern", () => ({
            u_time: k.time() / 20,
            u_colour1: k.Color.fromHex(PALETTE.colour1),
            u_colour2: k.Color.fromHex(PALETTE.colour2),
            u_speed: k.vec2(1, -1),
            u_aspect: k.width() / k.height(),
            u_size: 5,
        })),
        k.pos(0),
        // TODO may remove if we do a screen transition logic
        k.fixed(), // so it stays in place when the camera moves
    ]);
    k.onResize(() => {
        tiledBackground.width = k.width();
        tiledBackground.height = k.height();
        tiledBackground.uniform.u_aspect = k.width() / k.height();
    });

    makeSection(k, k.vec2(k.center().x, k.center().y - 400), "About", (parent) => {
        
    });
    makeSection(k, k.vec2(k.center().x - 400, k.center().y), "Skills", (parent) => {
        
    });
    makeSection(k, k.vec2(k.center().x, k.center().y + 400), "Experience", (parent) => {
        
    });
    makeSection(k, k.vec2(k.center().x + 400, k.center().y), "Projects", (parent) => {
        
    });
    makePlayer(k, k.vec2(k.center()), 700);

    // tiltedBackground.onUpdate(() =>{
        
    // })
}