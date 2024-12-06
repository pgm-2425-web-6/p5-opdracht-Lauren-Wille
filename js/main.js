let currentIndex = 0;

  const menu = document.querySelector('.menu');
  const menuLines = document.querySelector('.menu-lines');

  menuLines.addEventListener('click', () => {
    menu.classList.toggle('active'); 
    menuLines.classList.toggle('active');
  });
