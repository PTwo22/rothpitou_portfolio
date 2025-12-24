// first page user sees
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import clickSound from '../assets/sounds/undertale-ding.mp3';
import clickSound from '/public/sounds/undertale-ding.mp3';


function StartPage(){
    /* TODO
    - add interactivity to the button to go to next page
    - input animations in the background and a pixelated transition effect when going to the next page
    */
    // navigate to home page function
    const navigate = useNavigate();
    const dingSound = new Audio(clickSound);

    const handleClick = () => {
        dingSound.play();
        navigate("/home");
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
export default StartPage;