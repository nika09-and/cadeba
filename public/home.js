const shopButton = document.getElementById('shopButton');
const mainMenu = document.getElementById('mainMenu');
const shop = document.getElementById('shop');
const exitFromShop =document.getElementById('exit');
const avatarProducts = document.getElementById('avatarProducts');
const iconProducts = document.getElementById('iconProducts');
const bannerProducts = document.getElementById('bannerProducts');
const deckProducts = document.getElementById('deckProducts');
const chestProducts = document.getElementById('chestProducts');
const avatarButton = document.getElementById('avatar');
const iconButton = document.getElementById('icons');
const bannerButton = document.getElementById('banners');
const deckButton = document.getElementById('decks');
const chestButton = document.getElementById('chests');
const avatarIcon = document.getElementById('avatarIcon');
const iconsIcon = document.getElementById('iconsIcon');
const bannersIcons = document.getElementById('bannersIcons');
const decksIcons = document.getElementById('decksIcons');
const chestsIcons = document.getElementById('chestsIcons');
const shopTitle = document.getElementById('shopTitle');
const MQuestButton = document.getElementById('MQuestButton');
const MDeckButton = document.getElementById('MDeckButton');
const MPlayButton = document.getElementById('MPlayButton');
const apologyWindow = document.getElementById('apology');
const apologyButton = document.getElementById('apologyButton');
const settingsButton = document.getElementById('settingsButton');
const themeSong = document.getElementById("theme-song");
const buttonSound = document.getElementById("buttonSound");





MPlayButton.addEventListener("click", () => {
    window.location.href = "playing.html";  // Replace with your new page's file path
  });

themeSong.addEventListener("ended", () => {
    themeSong.currentTime = 0; // Restart from the beginning
    themeSong.play();
  });

shopButton.addEventListener('click', () => {
    buttonSound.play(); 
    setTimeout(function() {
        mainMenu.style.display = "none";
        shop.style.display = "block";
    }, 300);
})

exitFromShop.addEventListener('click', () => {
    setTimeout(function() {
        shop.style.display = "none";
        mainMenu.style.display = "block";
    }, 300);
})

avatarButton.addEventListener('click', () => iconActions("avatar"));
iconButton.addEventListener('click', () => iconActions("icon"));
bannerButton.addEventListener('click', () => iconActions("banner"));
deckButton.addEventListener('click', () => iconActions("deck"));
chestButton.addEventListener('click', () => iconActions("chest"));
MQuestButton.addEventListener('click', () => apology());
MDeckButton.addEventListener('click', () => apology());
settingsButton.addEventListener('click', () => apology());
apologyButton.addEventListener('click', () => {
    apologyWindow.style.display = "none";
    console.log("using button");
});
apologyWindow.addEventListener('click', () => {
    apologyWindow.style.display = "none";
});




function iconActions (status){

    setSVGColor(avatarIcon, "#5A7071");
    setSVGColor(iconsIcon, "#5A7071");
    setSVGColor(bannersIcons, "#5A7071");
    setSVGColor(decksIcons, "#5A7071");
    setSVGColor(chestsIcons, "#5A7071");

    switch(status){

        case "avatar":{
            avatarProducts.style.display = "grid";
            iconProducts.style.display = "none";
            bannerProducts.style.display = "none";
            deckProducts.style.display = "none";
            chestProducts.style.display = "none";

            setSVGColor(avatarIcon, "#e2dfcf");
            shopTitle.textContent = "avatars";

            break;
        }
        case "icon":{
            avatarProducts.style.display = "none";
            iconProducts.style.display = "grid";
            bannerProducts.style.display = "none";
            deckProducts.style.display = "none";
            chestProducts.style.display = "none";

            setSVGColor(iconsIcon, "#e2dfcf");
            shopTitle.textContent = "icons";

            break;
        }
        case "banner":{
            avatarProducts.style.display = "none";
            iconProducts.style.display = "none";
            bannerProducts.style.display = "grid";
            deckProducts.style.display = "none";
            chestProducts.style.display = "none";

            shopTitle.textContent = "banners";
            setSVGColor(bannersIcons, "#e2dfcf");

            break;
        }
        case "deck":{
            avatarProducts.style.display = "none";
            iconProducts.style.display = "none";
            bannerProducts.style.display = "none";
            deckProducts.style.display = "grid";
            chestProducts.style.display = "none";

            shopTitle.textContent = "decks";
            setSVGColor(decksIcons, "#e2dfcf");

            break;
        }
        case "chest":{
            avatarProducts.style.display = "none";
            iconProducts.style.display = "none";
            bannerProducts.style.display = "none";
            deckProducts.style.display = "none";
            chestProducts.style.display = "grid";

            shopTitle.textContent = "chests";
            setSVGColor(chestsIcons, "#e2dfcf");

            break;
        }
    }
}

function setSVGColor(svgElement, color) {
    // Check if the element has a path or other sub-elements
    const paths = svgElement.querySelectorAll('path, circle, rect, polygon, line, polyline, ellipse');
    if (paths.length > 0) {
        paths.forEach(path => path.setAttribute('fill', color));
    } else {
        // Directly apply color if it's the SVG root element
        svgElement.setAttribute('fill', color);
    }
}

function apology(){
    apologyWindow.style.display="flex";
    buttonClickSound();
}

function buttonClickSound(){
    buttonSound.currentTime = 0; 
    buttonSound.volume = 0.3;
    buttonSound.play(); 
}

document.addEventListener('DOMContentLoaded', () => {
    
    function playAudio() {
        themeSong.volume = 0.2;
        themeSong.play().catch(error => console.log("Audio play failed:", error));
        document.removeEventListener('click', playAudio); // Remove listener after first click
    }

    document.addEventListener('click', playAudio); // Play audio when user clicks anywhere
});