document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const dropzones = document.querySelectorAll('.dropzone');
    const score = document.getElementById('score');
    const powerUp = document.getElementById('powerUp');
    let totalPower = 0;

    let draggedElement = null;
    let originalDropzone = null;
    let dropZoneChecker = 0;
    let cardsArray = [];

    cards.forEach(card => {
        card.addEventListener('dragstart', (e) => {
            draggedElement = card;
            originalDropzone = card.parentElement;
            e.dataTransfer.setData('text/plain', card.id);
            card.classList.add('dragging');
        });

        card.addEventListener('dragend', () => {
            draggedElement.classList.remove('dragging');
            draggedElement = null;
            originalDropzone = null;
        });
    });

    dropzones.forEach(dropzone => {
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            const cardId = e.dataTransfer.getData('text/plain');
            const card = document.getElementById(cardId);
            
            if (dropzone !== originalDropzone && dropzone.children.length === 0) {
                dropzone.appendChild(card);
                resetCardPosition(card);
            } else if (dropzone !== originalDropzone && dropzone.children.length === 1) {
                const existingCard = dropzone.children[0];
                originalDropzone.appendChild(existingCard);
                dropzone.appendChild(card);
                resetCardPosition(card);
                resetCardPosition(existingCard);
            }
            
            if(card.getAttribute('data-status') == "notAdded"){
                dropZoneChecker++;
                totalPower += parseInt(card.getAttribute('data-power'));
                score.textContent = totalPower;
                card.setAttribute('data-status', 'added')
                cardsArray.push(card.getAttribute('data-name'));
            }

            if(dropZoneChecker == 2){
                setTimeout(function() {
                    cardsLogic(cardsArray[0], cardsArray[1]);
                    cardsLogic(cardsArray[1], cardsArray[0]);
                    score.style.color = "#76f476";
                    setTimeout(function() {
                        score.style.color = "#e2dfcf";
                    }, 500)
                }, 500);
                dropZoneChecker = 0;
            }
            console.log(dropZoneChecker);
        });
    });

    function resetCardPosition(card) {
        card.style.position = 'relative';
        card.style.left = '0';
        card.style.top = '0';
        card.style.zIndex = 'auto';
    }

    function cardsLogic(card1, card2){
        switch(card1){
            case "queen":{
                console.log("queen has been");
                if(card2 == "king"){
                    score.textContent = totalPower += 3;
                    playPowerUp();
                }
                else if(card2 == "builder"){
                    console.log("+ 1 resource!")
                }
                if(card2 == "killer"){
                    score.textContent = totalPower -= 1;
                }
                break;
            }
            case "priest":{
                console.log("priest has been");
                if(card2 == "queen"){
                    score.textContent = totalPower += 3;
                    playPowerUp();
                }
            }
        }
    }

    function playPowerUp(){
        powerUp.currentTime = 0;
        powerUp.play();
    }
});
