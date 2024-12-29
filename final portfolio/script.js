window.history.scrollRestoration = 'manual'; // Ensures browser doesn't remember the scroll position
window.onload = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
};//extraa...

gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


function Valuesetter(){
    gsap.set('#nav a',{
       y:"-100%" ,
       opacity: 0
    })
    gsap.set('.home .parent .child',{
        y:"100%" ,
    })
    gsap.set('.row i',{
        opacity: 0
    })
    document.querySelectorAll("#Visual>g").forEach(function (e) {
        var character = e.querySelector("path, polyline");
        if (character) {
            var length = character.getTotalLength();
            character.style.strokeDasharray = length + "px";
            character.style.strokeDashoffset = length + "px";
        }
    });
}
function revealtosopan(){
    document.querySelectorAll(".reveal")
    .forEach(function(elem){
        var Parent=document.createElement("span")
        var child=document.createElement("span")
        Parent.classList.add("parent");
        child.classList.add("child");
        child.innerHTML=elem.innerHTML;
        Parent.appendChild(child);
        elem.innerHTML="";
        elem.appendChild(Parent);
    })
}
function loaderanimation(){
    var tl = gsap.timeline();

tl
.from("#loader .child span", {
    x:50,
    delay: .5,
    stagger: 0.2,  
    duration: 1.4,
    ease: Power3.easeOut
})
.to("#loader .parent .child", {
    y: "-100%",
    duration: 1,
    delay: 1,
    ease: Circ.easeInOut
})
.to("#loader",{
    height:0,
    duration:1,
    ease: Circ.easeInOut
})
.to("#green",{
    height:"100%",
    top:0,
    duration:1,
    delay:-1,
    ease: Circ.easeInOut
})
.to("#green",{
    height:"0%",
    duration:1,
    delay:-0.5,
    ease: Circ.easeInOut,
    onComplete: function () {
        animateHomepage();
    }
    
})

}

function animatesvg() {
    document.querySelectorAll("#Visual>g").forEach(function (e) {
        var character = e.querySelector("path, polyline");
        if (character) {
            gsap.to(character, {
                strokeDashoffset: 0,
                delay:-0.7,
                duration: 3,
                ease: Expo.easeInOut,
            });
        }
    });
}
function animateHomepage(){
    tl=gsap.timeline();

    tl.to("#nav a",{
       y:0,
       opacity: 1,
       stagger:.05,
       ease:Expo.easeInOut  
    })
    tl.to(".home .parent .child",{
       y:0,
       stagger:.1,
       delay:-.9,
       duration:2,
       ease:Expo.easeInOut  
    })
    tl.to(".row i",{
       opacity: 1,
       delay:-0.5,
       duration:1,
       ease:Expo.easeInOut,
       onComplete: function(){
        animatesvg();
       } 
    })
    

}
// gsap.registerPlugin(ScrollTrigger);

// gsap.utils.toArray(".aboutcont").forEach((image) => {
//     gsap.fromTo(
//         image,
//         { yPercent: 0 }, // Start at the center (y = 0%)
//         {
//             yPercent: -50, // Move the image up by 50% (top moves while bottom stays fixed)
//             scrollTrigger: {
//                 trigger: image,
//                 start: "top 80%", // When the image's top reaches 80% of the viewport
//                 end: "top 20%", // When the image's top reaches 20% of the viewport
//                 scrub: true, // Smooth scrolling animation
//                 markers: true, // Optional for debugging (shows start and end points)
//             },
//         }
//     );
// });
gsap.registerPlugin(ScrollTrigger);

// Create the timeline to control all images together
const timeline = gsap.timeline({
    scrollTrigger: {
        trigger: "#aboutimage", // Trigger for the section
        start: "top 97%", // When the section comes into view
        end: "top 97%", // When the section is near the top
        scrub: 1, // Smooth sync with scroll (value increased for smoother effect)
        markers: false, // Display debugging markers
        invalidateOnRefresh: true, // Recalculate positions on window resize
    }
});

// Animate all images at the same time
gsap.utils.toArray(".aboutcont").forEach((image) => {
    timeline.fromTo(
        image,
        {
            rotate: -7, // Initial rotation to the left
        },
        {
            rotate: 0, // Slight rotation change to the right when scrolling down
            ease: "power2.inOut", // Smooth easing for scroll-based animation
        }
    );
});

// Refresh ScrollTrigger on resize
window.addEventListener("resize", () => ScrollTrigger.refresh());



    


revealtosopan();
Valuesetter();
loaderanimation();


