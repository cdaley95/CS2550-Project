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
                selectedSection.style.display = 'block';
                selectedSection.classList.add('fade-in');
                selectedSection.classList.add('active');
            }, { once: true });
        }
    });
    var activeSection = document.querySelector('.content.active');
    if (!activeSection) {
        var selectedSection = document.getElementById(sectionId);
        selectedSection.style.display = 'block';
        selectedSection.classList.add('fade-in');
        selectedSection.classList.add('active');
    }
}
