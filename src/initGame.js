// where we call kaplay functions
import makeEmailIcon from "./components/EmailIcon";
import makeSection from "./components/Section";
import makeSocialIcon from "./components/SocialIcon";
import makeSkillIcon from "./components/SkillIcon";
import makeWorkExperienceCard from "./components/WorkExperienceCard";
import makeProjectCard from "./components/ProjectCard";
import { PALETTE } from "./constants";
import makePlayer from "./entities/Player";
import makeKaplayCtx from "./kaplayCtx";
import { cameraZoomValueAtom, store } from "./store";
import { makeAppear } from "./utils";

// ! can't use default async for some reason - will investigate later (maybe)
export async function initGame(){ // async because we'll load json files

    const generalData = await(await fetch("./configs/generalData.json")).json();
    const socialsData = await(await fetch("./configs/socialsData.json")).json();
    const skillsData = await(await fetch("./configs/skillsData.json")).json();
    const experiencesData = await(await fetch("./configs/experiencesData.json")).json();
    const projectsData = await(await fetch("./configs/projectsData.json")).json();

    const k = makeKaplayCtx(); // global kaplay context
    // * loadSprite is a kaplay function to load an image as a sprite
    // k.loadSprite("player", "./sprites/grian-sprite-sheet.png", {
    k.loadSprite("player", "./sprites/my-sprite-sheet.png", {
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
        },
        
    });
    k.loadFont("Determination Mono", "./fonts/DeterminationMonoWeb.ttf");

    // ! add more if applicable
    // * social logos
    k.loadSprite("github-logo", "./logos/github-logo.png");
    k.loadSprite("linkedin-logo", "./logos/linkedin-logo.png");
    k.loadSprite("instagram-logo", "./logos/instagram-logo.png");
    k.loadSprite("linktree-logo", "./logos/linkedin-logo.png");
    k.loadSprite("email-logo", "./logos/email-logo.png");

    // * projects thumbnailss
    k.loadSprite("portfolio-site-project", "./projects/portfolio-site-project.png");

    // * skill logos
    // TODO add and subtract - maybe add a button to list the skills too cuz I aint drawing all that
    // TO ADD (Tech): Java, C++, Docker, AWS, Arduino, SQL, PyTorch, TensorFlow, Kaplay
    // TO ADD (Skills): OOP, REST API, AI/ML, Game Dev, Web Dev, Computer Vision
    k.loadSprite("javascript-logo", "./logos/js-logo.png");
    k.loadSprite("typescript-logo", "./logos/ts-logo.png");
    k.loadSprite("react-logo", "./logos/react-logo.png");
    k.loadSprite("nextjs-logo", "./logos/nextjs-logo.png");
    k.loadSprite("postgres-logo", "./logos/postgres-logo.png");
    k.loadSprite("html-logo", "./logos/html-logo.png");
    k.loadSprite("css-logo", "./logos/css-logo.png");
    k.loadSprite("tailwind-logo", "./logos/tailwind-logo.png");
    k.loadSprite("python-logo", "./logos/python-logo.png");
   
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

    // all sections to interactive/collide with

    // * About section
    makeSection(k, k.vec2(k.center().x, k.center().y - 400), generalData.section1Name , (parent) => {
        const container = parent.add([k.pos(-805, -700), k.opacity(0)]);
        container.add([ // title (my name)
            k.text(generalData.header.title, { font: "Determination Mono", size: 88 }),
            k.color(k.Color.fromHex(PALETTE.colour4)),
            k.pos(400, -100),
            k.opacity(0),
            k.area(),
        ]);

        container.add([ // title (my name) - backdrop
            k.text(generalData.header.title, { font: "Determination Mono", size: 88 }),
            k.color(k.Color.fromHex(PALETTE.colour3)),
            k.pos(396, -104),
            k.opacity(0),
            k.area(),
        ]);

        container.add([ // subtitle - will need to adjust manually based on text length changes
            k.text(generalData.header.subtitle, { font: "Determination Mono", size: 48 }),
            k.color(k.Color.fromHex(PALETTE.colour3)),
            k.pos(150, 0),
            k.opacity(0),
            k.area(),
        ]);

        const socialContainer = container.add([k.pos(130, 0), k.opacity(0)]);

        for(const socialData of socialsData){
            // console.log(socialData);
            if(socialData.name === "Email"){
                makeEmailIcon(k, socialContainer, k.vec2(socialData.pos.x, socialData.pos.y), socialData.imageData, socialData.name, socialData.address);
                continue;
            }
            makeSocialIcon(
                k,
                socialContainer,
                k.vec2(socialData.pos.x, socialData.pos.y),
                socialData.imageData,
                socialData.name,
                socialData.link,
                socialData.description
            );
        }
        makeAppear(k, container);
        makeAppear(k, socialContainer);

    });

    // * Skills section
    makeSection(k, k.vec2(k.center().x - 400, k.center().y), generalData.section2Name, (parent) => {

        const container = parent.add([k.opacity(0), k.pos(-300, 0)]);

        for(const skillData of skillsData){
            makeSkillIcon(
                k, 
                container, 
                k.vec2(skillData.pos.x, skillData.pos.y), 
                skillData.logoData, 
                skillData.name
            );
        }
        makeAppear(k, container);
    });

    // * Experience section
    makeSection(k, k.vec2(k.center().x + 400, k.center().y), generalData.section3Name, (parent) => {
        
        const container = parent.add([k.opacity(0), k.pos(0)]);

        for(const experienceData of experiencesData){
            makeWorkExperienceCard(
                k, 
                container, 
                k.vec2(experienceData.pos.x, experienceData.pos.y), 
                experienceData.cardHeight, 
                experienceData.roleData
            );
        }
        makeAppear(k, container);
    });

    // * Projects section
    makeSection(k, k.vec2(k.center().x, k.center().y + 400), generalData.section4Name, (parent) => {
        
        const container = parent.add([k.opacity(0), k.pos(0)]);

        for(const projectData of projectsData){
            makeProjectCard(
                k,
                container,
                k.vec2(projectData.pos.x, projectData.pos.y),
                projectData.data,
                projectData.thumbnail,
            );
        }
        makeAppear(k, container);
    });
    makePlayer(k, k.vec2(k.center()), 700);

    // tiltedBackground.onUpdate(() =>{
        
    // })
}