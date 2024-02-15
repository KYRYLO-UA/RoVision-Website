function changeLanguage(lang) {
    localStorage.setItem('lang', lang);
    updateLanguageDisplay();
}

function updateLanguageDisplay() {
    var langPreference = localStorage.getItem('lang');
    if (langPreference === 'ua') {
        document.querySelectorAll('.en').forEach(function(el) {
            el.style.display = 'none';
        });
        document.querySelectorAll('.ua').forEach(function(el) {
            el.style.display = 'inline';
        });
    } else {
        document.querySelectorAll('.en').forEach(function(el) {
            el.style.display = 'inline';
        });
        document.querySelectorAll('.ua').forEach(function(el) {
            el.style.display = 'none';
        });
    }
}

function getUserCountry(callback) {
    fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
        callback(data.country_code);
    })
    .catch(error => {
        console.error('Error fetching user country:', error);
    });
}

function setLanguagePreference(lang) {
    localStorage.setItem('lang', lang);
}

function handleLanguagePreference(countryCode) {
    if (countryCode === 'UA') {
        setLanguagePreference('ua');
    } else {
        setLanguagePreference('en');
    }
}

window.onload = function() {
    var langPreference = localStorage.getItem('lang');

    if (!langPreference) {
        getUserCountry(handleLanguagePreference);
    }

    updateLanguageDisplay();

    document.querySelectorAll('.lang-option').forEach(function(el) {
        el.addEventListener('click', function() {
            var lang = this.classList.contains('ua') ? 'en' : 'ua';
            changeLanguage(lang);
        });
    });
};
