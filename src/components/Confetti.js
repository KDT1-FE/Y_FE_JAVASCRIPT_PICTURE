import { Component } from '../core';
import confetti from 'canvas-confetti';

export default class Confetti extends Component {
    render() {
        this.el.innerHTML = /*html*/ `
            <canvas></canvas>
            `;
        this.el.style.position = 'fixed';
        this.el.style.height = '0px';

        const confettiCanvas = document.querySelector('canvas');
        const confettiEffectedCanvas = confetti.create(confettiCanvas, {
            resize: true,
            useWorker: true,
        });

        const confettiEndTime = Date.now() + 3 * 1000;

        const confettiColors = ['#bb0000', '#000000'];

        (function frame() {
            confettiEffectedCanvas({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: confettiColors,
            });
            confettiEffectedCanvas({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: confettiColors,
            });

            if (Date.now() < confettiEndTime) {
                requestAnimationFrame(frame);
            }
        })();
    }
}
