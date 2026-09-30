import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsPage = document.querySelector('.projects')

if(projectsPage){
        // const tl = gsap.timeline();

        // tl.to('.js-img', {
        //     scrollTrigger: {
        //         trigger: '.p',
        //         start: 'top 10%',
        //         end: 'bottom bottom',
        //         scrub: 0.5,
        //         pin: true,
        //         pinSpacing: false,
        //     },
        //     height: 0,
        //     stagger: .5,
        //     marginBottom: 50,
        // })
        gsap.fromTo('.js-img', {scale:1.2},{scale:1, duration:0.5, stagger: 0.1})
}