// first page user sees
import React, { useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import clickSound from '/sounds/undertale-ding.mp3';
import { gameStartedAtom } from '../store';


export default function StartPage(){
    /* TODO
    - add interactivity to the button to go to next page
    - input animations in the background and a pixelated transition effect when going to the next page
    */
    const setGameStarted = useSetAtom(gameStartedAtom);
    // navigate to home page function
    // const navigate = useNavigate();
    

    const handleClick = () => {
        const dingSound = new Audio(clickSound);
        dingSound.play();
        setGameStarted(true);
        // navigate("/home"); // to be changed
    };

    return (
        <div class="startpage pixel-box">
            <h1 class="middle">Hi! I'm Rothpitou</h1>
            <p class="middle">An interactive portforlio.</p>
            <button class="middle" onClick={(handleClick)}>
                Begin
            </button>
        </div>
    );
}