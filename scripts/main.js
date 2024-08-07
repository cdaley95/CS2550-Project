/*Moved page switching to it's own JS file called page.js*/

/*
Changes background video depending on the theme selected, 
enables and disables theme override while also changing the 
text in the toggle button.
*/

function changeTheme() {
    const themeOverride = document.getElementById('themeOverride');
    const themeBtn = document.getElementById('themebtn');
    const bgVid = document.getElementById('bgVid');
    const bgVideo = document.getElementById('bgVideo');

    if (themeOverride.disabled) {
        bgVid.src = "videos/bgviddark.mp4";
        bgVideo.load();
        themeOverride.disabled = false;
        themeBtn.textContent = 'Light Mode';
    } else {
        bgVid.setAttribute("src", "videos/bgvid.mp4");
        bgVideo.load();
        themeOverride.disabled = true;
        themeBtn.textContent = 'Dark Mode';
    }
}

//Moves the theme toggle button to the footer and back upon media query trigger.

function moveThemeButton() {
    const themeBtn = document.getElementById('themebtn');
    const footerCont = document.querySelector('.footer-content');
    const paddedCont = document.querySelector('.padded-cont');
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    function handleMediaQueryChange(e) {
        if (e.matches) {
            footerCont.insertBefore(themeBtn, footerCont.children[1]);
        } else {
            paddedCont.appendChild(themeBtn);
        }
    }

    handleMediaQueryChange(mediaQuery);

    mediaQuery.addEventListener('change', handleMediaQueryChange);
}

document.addEventListener('DOMContentLoaded', moveThemeButton);
document.addEventListener("DOMContentLoaded", function(event) {    
    initValidation("myform", "valform-success");
 });
