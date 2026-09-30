import Typed from 'typed.js';

const typedTitle = document.querySelector('#typedTitle')

if(typedTitle){
    const typed = new Typed('#typedTitle', {
        strings: ['I am <strong>Olena Pohybil</strong>', 'Frontend developer', 'Welcome to my portfolio'],
        typeSpeed: 70,
        delay: 30
    });
}