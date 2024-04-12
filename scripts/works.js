const workDivs = document.getElementsByClassName("frame-work");

function onMouseWorkUpdate(e) {
    e.currentTarget.style.setProperty('--mouseX', `${(e.offsetX/(e.currentTarget.clientWidth/2)-1)/1000}`);
    e.currentTarget.style.setProperty('--mouseY', `${(e.offsetY/(e.currentTarget.clientHeight/2)-1)/1000}`);
};

function onAnimationEndWork(e) {

    if (e.currentTarget.end) {
        e.currentTarget.classList.remove("activeWork");
        e.currentTarget.style.removeProperty('width');
        e.currentTarget.style.removeProperty('margin');
        e.currentTarget.end = false;
        e.currentTarget.style.setProperty('animation', `0s`);
        e.currentTarget.backDiv.remove();
    }
    e.currentTarget.style.setProperty('animation', `0s`);

};


function onClickWork(e) {
    if (!e.currentTarget.classList.contains("activeWork")) {
        document.getElementById("activeWorkBlur").style.setProperty('display', 'block');
        document.getElementById("activeWorkBlur").style.setProperty('opacity', '0');
        document.getElementById("activeWorkBlur").offsetTop = document.getElementById("activeWorkBlur").offsetTop;
        document.getElementById("activeWorkBlur").style.setProperty('opacity', '1');
        let div = e.currentTarget.backDiv = e.currentTarget.cloneNode();
        e.currentTarget.getElementsByClassName("text")[0].style.setProperty('transition-delay', '1.2s');
        e.currentTarget.getElementsByClassName("text")[0].style.setProperty('transition-duration', '0.5s');
        div.style.setProperty('animation', `1s disapearWork`);
        div.style.setProperty('width', `0`);
        div.style.setProperty('margin', `0`);
        e.currentTarget.style.setProperty('--originX', `${e.currentTarget.getBoundingClientRect().left}px`);
        e.currentTarget.style.setProperty('--originY', `${e.currentTarget.getBoundingClientRect().top}px`);
        e.currentTarget.style.setProperty('--scrollY', `${scrollY}`);
        e.currentTarget.parentElement.insertBefore(div, e.currentTarget);
        /*for (const work of document.getElementsByClassName("activeWork")) {
            //work.classList.remove("activeWork");
            //work.classList.add("endWork");
            work.end = true;
            work.classList.remove("activeWorkDesc");
            work.style.setProperty('animation', `1s reverse selectWorkMove, 1s reverse selectWorkRotate`);
            work.style.setProperty('left', 'var(--originX)');
            work.style.setProperty('top', 'var(--originY)');
            work.style.setProperty('width', '230px');
            work.backDiv.style.setProperty('animation', `1s reverse disapearWork`);
            work.backDiv.style.setProperty('width', `230px`);
            work.backDiv.style.setProperty('margin', `2vw`);
        }*/
        e.currentTarget.classList.add("activeWork");
        e.currentTarget.classList.add("activeWorkDesc");
        e.currentTarget.style.setProperty('animation', `1s selectWorkMove, 1s selectWorkRotate`);
    }
};

for (const work of workDivs) {
    //work.style.setProperty('--secondary-color', `rgb(${Math.random()*50+50},${Math.random()*50+50},${Math.random()*50+50})`);
    work.addEventListener('mousemove', onMouseWorkUpdate, false);
    work.addEventListener('click', onClickWork);  
    work.addEventListener("animationend", onAnimationEndWork, false);
}

document.getElementById("activeWorkBlur").addEventListener('transitionend', (e) => {
    if (e.currentTarget.style.getPropertyValue("opacity") === "0") document.getElementById("activeWorkBlur").style.setProperty('display', 'none');
}, false);

window.addEventListener('click', function(e){   
    for (const work of document.getElementsByClassName("activeWork")) {
        if (!work.contains(e.target) || e.target.classList.contains("close-button")){
            work.style.setProperty('--originY', `${parseInt(work.style.getPropertyValue("--originY")) + (work.style.getPropertyValue("--scrollY")-scrollY)}px`);
            work.end = true;
            work.classList.remove("activeWorkDesc");
            work.style.setProperty('animation', `1s reverse selectWorkMove, 1s reverse selectWorkRotate`);
            work.style.setProperty('width', `230px`);
            work.style.setProperty('margin', `2vw`);
            document.getElementById("activeWorkBlur").style.setProperty('opacity', '0');
            work.getElementsByClassName("text")[0].style.setProperty('transition-delay', '0s');
            work.getElementsByClassName("text")[0].style.setProperty('transition-duration', '0.2s');
            work.backDiv.style.setProperty('animation', `1s reverse disapearWork`);
            work.backDiv.style.setProperty('width', `230px`);
            work.backDiv.style.setProperty('margin', `2vw`);
        }
    }
});