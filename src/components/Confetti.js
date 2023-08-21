import { Component } from '../core';
import confetti from 'canvas-confetti';

export default class Confetti extends Component {
    render() {
        const myCanvas = document.querySelector('canvas');
        this.el.innerHTML = /*html*/ `
            <canvas id="my-canvas"></canvas>
        `;
        this.el.style.position = 'fixed';
        this.el.style.height = '0px';
        const myConfetti = confetti.create(myCanvas, {
            resize: true,
            useWorker: true,
        });

        const button = this.el.querySelector('.confetti__button');
        const end = Date.now() + 3 * 1000;

        const colors = ['#bb0000', '#000000'];

        (function frame() {
            myConfetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors,
            });
            myConfetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    }
}
