const hamMenu = document.querySelector('div.ham-menu');

hamMenu.addEventListener('click', () => {
    const sideMenu = document.querySelector('div.side-menu');
    const bars = document.querySelectorAll('.bars');

    bars.forEach((bar) => {
        bar.classList.toggle('open')
    })

    sideMenu.classList.toggle('open');
})

function redirect(dest) {
    window.location.href = dest
}