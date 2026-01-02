import { useAtom } from 'jotai';
import { emailModalVisibleAtom, emailAtom } from '../store';
import { useState } from 'react';

export default function EmailModal(){

    const [isVisible, setIsVisible] = useAtom(emailModalVisibleAtom);
    const email = useAtom(emailAtom);

    const [onCopyMessage, setOnCopyMessage] = useState("");
    // TODO make it so that you can send email from here (probably by using EmailJS)
    const buttons = [
        {
            id: 0,
            name: "Yes",
            handler: () => {
                navigator.clipboard.writeText(email);
                setOnCopyMessage("Email copied to clipboard!");
            },
        },
        {
            id: 1,
            name: "No",
            handler: () => {
                setIsVisible(false);
            }
        }
    ];

    return (
        isVisible && (
            <div className="modal">
                <div className="modal-content">
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