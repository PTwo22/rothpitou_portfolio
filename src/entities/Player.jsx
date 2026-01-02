import { DIAGONAL_FACTOR } from "../constants";
import { isSocialModalVisibleAtom, isEmailModalVisibleAtom, isProjectModalVisibleAtom, store } from "../store";

export default function makePlayer(k, posVec2, speed){

    const player = k.add([
        k.sprite("player", { anim: "walk-down-idle" }),
        k.scale(8),
        k.anchor("center"),
        k.area({ shape: new k.Rect(k.vec2(0), 5, 10)}),
        k.body(), // adds collision (to push things around)
        k.pos(posVec2),
        "player", // creates objects without class
        {
            direction: k.vec2(0, 0),
            directionName: "walk-down",
        },
    ]);

    // could use kaplay's built-in function but may have bugs
    let isMouseDown = false;
    const game = document.getElementById("game");

    game.addEventListener("focusout", () => {
        isMouseDown = false;
    });
    game.addEventListener("mousedown", () => { 
        isMouseDown = true;
    });
    game.addEventListener("mouseup", () => { 
        isMouseDown = false;
    });
    game.addEventListener("touchstart", () => { 
        isMouseDown = true;
    });
    game.addEventListener("touchend", () => { 
        isMouseDown = false;
    });

    player.onUpdate(() => { // runs on 60fps
        if(!k.camPos().eq(player.pos)){
            k.tween( // gradual camera movement - main camera logic
                k.camPos(),
                player.pos,
                0.2,
                (newPos) => k.camPos(newPos),
                k.easings.linear,
            ); 
        }

        if(store.get(isSocialModalVisibleAtom) || store.get(isEmailModalVisibleAtom) || store.get(isProjectModalVisibleAtom))
            return; // freeze player when modal is open

        player.direction = k.vec2(0, 0);
        const worldMousePos = k.toWorld(k.mousePos()); // important to get world position on canvas

        if(isMouseDown){ // maths stuff.
            player.direction = worldMousePos.sub(player.pos).unit();
        }

        // * player's animations - limited to 4 animations for now
        // idle animation
        if(player.direction.eq(k.vec2(0, 0)) && !player.getCurAnim().name.includes("idle")){
            player.play(`${player.directionName}-idle`);
            return;
        }

        // TODO make so that it changes at 45 degree angles instead
        if (
            player.direction.x > 0 &&
            player.direction.y > -0.5 &&
            player.direction.y < 0.5
        )
            player.directionName = "walk-right";
      
        if (
            player.direction.x < 0 &&
            player.direction.y > -0.5 &&
            player.direction.y < 0.5
        )
            player.directionName = "walk-left";
    
        if (player.direction.x < 0 && player.direction.y < -0.8)
            player.directionName = "walk-up";
    
        if (player.direction.x < 0 && player.direction.y > 0.8)
            player.directionName = "walk-down";

        if (
            player.direction.x < 0 &&
            player.direction.y > -0.8 &&
            player.direction.y < -0.5
        )
            player.directionName = "walk-left-up";
      
        if (
            player.direction.x < 0 &&
            player.direction.y > 0.5 &&
            player.direction.y < 0.8
        )
            player.directionName = "walk-left-down";
    
        if (
            player.direction.x > 0 &&
            player.direction.y < -0.5 &&
            player.direction.y > -0.8
        )
            player.directionName = "walk-right-up";
    
        if (
            player.direction.x > 0 &&
            player.direction.y > 0.5 &&
            player.direction.y < 0.8
        )
            player.directionName = "walk-right-down";
      

        // done to not update to idle every cycle
        if(player.getCurAnim().name !== player.directionName){
            player.play(player.directionName, { speed : 3 });
        }

        if(player.direction.x && player.direction.y){ // diagonal movement speed fix
            player.move(player.direction.scale(DIAGONAL_FACTOR * speed));
            return;
        }
        player.move(player.direction.scale(speed));

    });

    return player;
}