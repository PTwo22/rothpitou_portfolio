import { useAtom, useAtomValue } from 'jotai';
import React, { useRef } from 'react';
import { isEmailModalVisibleAtom, emailAtom } from '../store';
import { useState } from 'react';
import emailjs from "@emailjs/browser";
import clickSound from '/sounds/undertale-ding.mp3';

export default function EmailModal(){
    // EmailJS link: https://dashboard.emailjs.com/admin

    // * EmailJS setup
    const form = useRef();
    const dingSound = new Audio(clickSound);
    // dingSound.volume = 0.5;

    const sendEmail = (e) => {
        e.preventDefault();
        dingSound.volume = 0.2;
        dingSound.play();
        emailjs.sendForm("service_t0kzzo4", "template_e03lnwa", form.current, "TMTO1ehEntZPfPZW2").then(() => {
            alert("Email sent successfully!");
            form.current.reset();
        }),
        (error) => {
            alert("Failed to send email. Please try again later.", error.text);
        };
    };

    // * copy email to clipboard setup
    const [isVisible, setIsVisible] = useAtom(isEmailModalVisibleAtom);
    const email = useAtomValue(emailAtom);

    const [onCopyMessage, setOnCopyMessage] = useState("");

    const buttons = [
        {
            id: 0,
            name: "Copy",
            handler: () => {
                navigator.clipboard.writeText(email);
                setOnCopyMessage("Email copied to clipboard!");
            },
        },
        {
            id: 1,
            name: "Exit",
            handler: () => {
                setIsVisible(false);
            }
        }
    ];

    return (
        isVisible && (
            <div className="modal">
                <div className="modal-content">
                    <div className="contact-form-wrapper">
                        <form ref={form} onSubmit={sendEmail} className="contact-form">
                            <h1>Contact Me</h1>

                            <label>Name</label>
                            <input type="text" name="user_name" required placeholder="e.g. Kimi No Nawa"/>

                            <label>Email</label>
                            <input type="email" name="user_email" required placeholder="Your Email"/>

                            <label>Subject</label>
                            <input type="subject" name="subject" required placeholder="Your Subject"/>

                            <label>Message</label>
                            <textarea name="message" rows="4" required placeholder="Your Message (e.g. awesome website and I want to work with you)"></textarea>
                            <input type="submit" value="Send Messenger Pigeon" />
                            <p>(volume warning)</p>
                        </form>
                    </div>


                    <h1>Copy email to clipboard?</h1>
                    <span>{email}</span>
                    <p>{onCopyMessage}</p>
                    <div className="modal-btn-container">
                        {buttons.map((button) => (
                            <button key={button.id} className="modal-btn" onClick={button.handler}>
                                {button.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )
    );
}