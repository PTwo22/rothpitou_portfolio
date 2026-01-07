
import kaplay from "kaplay";

export default function makeKaplayCtx(){

    return kaplay({
        global: false, // can only import kaplay functions from this function
        pixelDensity: 2, // to make it look sharp
        touchToMouse: true, // enable touch support (on mobile)
        debug: true, // TODO set to false for production
        debugKey: "f1", // press 'q' to toggle debug mode
        // TODO make this f1 despite being on MacOS
        canvas: document.getElementById("game"),
    });
}