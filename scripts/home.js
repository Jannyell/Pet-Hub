const divs = document.querySelectorAll('.slider-sec');
const radios = document.querySelectorAll('input[name="selector"]');
let currentIndex = 0;

function showDiv(index) {
    divs.forEach((div, i) => {
        if (i === index) {
            div.classList.add('ativado');
            radios[i].checked = true;
        } else {
            div.classList.remove('ativado');
        }
    });
}

radios.forEach((radio, index) => {
    radio.addEventListener('change', () => {
        showDiv(index);
        currentIndex = index;
    });
});

function autoSwitch() {
    currentIndex = (currentIndex + 1) % divs.length;
    showDiv(currentIndex);
}

// Mostrar a primeira div inicialmente
showDiv(currentIndex);

// Troca automática a cada 3 segundos
setInterval(autoSwitch, 5000);