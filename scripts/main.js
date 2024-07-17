// Fade out current section, remove active tag, fade in next section, add active tag
function showSection(sectionId) {
    var sections = document.querySelectorAll('.content');
    sections.forEach(function(section) {
        if (section.classList.contains('active')) {
            section.classList.add('fade-out');
            section.classList.remove('fade-in');
            section.addEventListener('animationend', function() {
                section.classList.remove('active', 'fade-out');
                section.style.display = 'none';
                var selectedSection = document.getElementById(sectionId);
                selectedSection.style.display = 'flex';
                selectedSection.classList.add('fade-in');
                selectedSection.classList.add('active');
            }, { once: true });
        }
    });
}

function changeTheme() {
    const themeOverride = document.getElementById('themeOverride');
    const button = document.getElementById('themebtn');
    const bgVid = document.getElementById('bgVid');
    const bgVideo = document.getElementById('bgVideo');

    if (themeOverride.disabled) {
        bgVid.src = "videos/bgviddark.mp4";
        bgVideo.load();
        themeOverride.disabled = false;
        button.textContent = 'Light Mode';
    } else {
        bgVid.setAttribute("src", "videos/bgvid.mp4");
        bgVideo.load();
        themeOverride.disabled = true;
        button.textContent = 'Dark Mode';
    }
}

function moveThemeButton() {
    const themeBtn = document.getElementById('themebtn');
    const footerContent = document.querySelector('.footer-content');
    const paddedCont = document.querySelector('.padded-cont');
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    function handleMediaQueryChange(e) {
        if (e.matches) {
            footerContent.insertBefore(themeBtn, footerContent.children[1]);
        } else {
            paddedCont.appendChild(themeBtn);
        }
    }

    handleMediaQueryChange(mediaQuery);

    mediaQuery.addEventListener('change', handleMediaQueryChange);
}

document.addEventListener('DOMContentLoaded', moveThemeButton);
