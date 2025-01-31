document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cards');
    const shuffleButton = document.getElementById('shuffleButton');
    const dropzones = document.querySelectorAll('.dropzone');
    const score = document.getElementById('score');
    const powerUp = document.getElementById('powerUp');

    let totalPower = 0;
    let draggedElement = null;
    let originalDropzone = null;
    let cardsArray = [];
    let dropzoneCardCount = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
    };

    // Define sets of dropzones
    let dropzoneSets = {
        1: [1, 2],
        2: [3, 4],
        3: [5, 6]
    };

    // Card data (name, power, image)
    let cardData = [
        { name: "builder", power: 1, image: "materials/main menu/characters/cards_builder.png" },
        { name: "farmer", power: 1, image: "materials/main menu/characters/cards_farmer.png" },
        { name: "guard", power: 2, image: "materials/main menu/characters/cards_guard.png" },
        { name: "jocker", power: 2, image: "materials/main menu/characters/cards_jocker.png" },
        { name: "killer", power: 4, image: "materials/main menu/characters/cards_killer.png" },
        { name: "king", power: 3, image: "materials/main menu/characters/cards_king.png" },
        { name: "messenger", power: 2, image: "materials/main menu/characters/cards_messenger.png" },
        { name: "priest", power: 1, image: "materials/main menu/characters/cards_priest.png" },
        { name: "queen", power: 2, image: "materials/main menu/characters/cards_queen.png" },
        { name: "forger", power: 2, image: "materials/main menu/characters/cards_shield builder.png" }
    ];

    // Shuffle and generate cards
    shuffleButton.addEventListener('click', () => {
        // Clear existing cards
        cardsContainer.innerHTML = '';
        let remainingCards = [...cardData];

        // Generate up to 6 random cards
        for (let i = 0; i < 6; i++) {
            if (remainingCards.length === 0) break;
            const index = getRandomInteger(0, remainingCards.length - 1);
            const selectedCard = remainingCards[index];

            // Create the card div
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("card");
            cardDiv.setAttribute("id", `card${i + 1}`);
            cardDiv.setAttribute("draggable", "true");
            cardDiv.setAttribute("data-power", selectedCard.power);
            cardDiv.setAttribute("data-status", "notAdded");
            cardDiv.setAttribute("data-name", selectedCard.name);

            // Create the image element
            const cardImg = document.createElement("img");
            cardImg.src = selectedCard.image;
            cardImg.alt = selectedCard.name;
            cardImg.classList.add("card-img");
            cardImg.setAttribute("draggable", "false");

            // Append the image to the div and add it to the container
            cardDiv.appendChild(cardImg);
            cardsContainer.appendChild(cardDiv);

            // Add drag-and-drop functionality
            addDragAndDropEvents(cardDiv);

            // Remove the card from the remaining pool
            remainingCards.splice(index, 1);
        }
    });

    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function addDragAndDropEvents(card) {
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
    }

    dropzones.forEach(dropzone => {
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            const cardId = e.dataTransfer.getData('text/plain');
            const card = document.getElementById(cardId);
            card.style.width = "13vw";
            card.style.height = "auto";

            const dropzoneId = dropzone.id; // Get the dropzone ID (e.g., dropzone1, dropzone2, etc.)
            const dropzoneIndex = parseInt(dropzoneId.replace('dropzone', ''));

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

            if (card.getAttribute('data-status') === "notAdded") {
                totalPower += parseInt(card.getAttribute('data-power'));
                score.textContent = totalPower;
                card.setAttribute('data-status', 'added');

                let cardName = card.getAttribute('data-name');
                console.log("Attempting to push:", cardName);

                cardsArray.push(cardName);
            }

            // Track how many cards are in this dropzone
            dropzoneCardCount[dropzoneIndex]++;

            // Determine set of the current dropzone
            let dropzoneSet = Object.keys(dropzoneSets).find(setKey => dropzoneSets[setKey].includes(dropzoneIndex));

            // Trigger logic when both cards are placed in a set
            if (dropzoneCardCount[dropzoneSets[dropzoneSet][0]] === 1 && dropzoneCardCount[dropzoneSets[dropzoneSet][1]] === 1) {
                console.log(`Both cards placed in dropzone set ${dropzoneSet}`);
                setTimeout(() => {
                    // Ensure both cards are inside the set's dropzones
                    let setCards = [];
                    dropzoneSets[dropzoneSet].forEach(index => {
                        const setDropzone = document.getElementById(`dropzone${index}`);
                        setDropzone.children.length && setCards.push(setDropzone.children[0].getAttribute('data-name'));
                    });

                    // Call cards logic with the pair
                    if (setCards.length === 2) {
                        console.log("Cards in this set:", setCards);
                        cardsLogic(setCards[0], setCards[1]);
                        cardsLogic(setCards[1], setCards[0]);
                        score.style.color = "#76f476";
                    setTimeout(function() {
                        score.style.color = "#e2dfcf";
                    }, 500)
                    }

                    // Reset the dropzone card count after both cards are processed
                    dropzoneSets[dropzoneSet].forEach(index => dropzoneCardCount[index] = 0);
                }, 500);
            }
        });
    });

    function resetCardPosition(card) {
        card.style.position = 'relative';
        card.style.left = '0';
        card.style.top = '0';
        card.style.zIndex = 'auto';
    }

    function cardsLogic(card1, card2) {
        console.log("Card logic triggered!");
        console.log(`card1: "${card1}", card2: "${card2}"`);

        switch (card1) {
            case "queen":{
                console.log("Queen has been played");
                if (card2 === "king") {
                    score.textContent = totalPower += 3;
                    playPowerUp();
                } else if (card2 === "builder") {
                    console.log("+1 resource!");
                }
                if (card2 === "killer") {
                    score.textContent = totalPower -= 1;
                }
                break;
            }
            case "priest":{
                console.log("Priest has been played");
                if (card2 === "queen") {
                    score.textContent = totalPower += 3;
                    playPowerUp();
                }
                break;
            }
            case "guard": {
                if (card2 === "queen") {
                    break;
                }
                score.textContent = totalPower += 1;
                playPowerUp();
                break;
            }
            case "messenger": {
                if (card2 === "jocker") {
                    score.textContent = totalPower += 1;
                    playPowerUp();
                }
                break;
            }
            case "forger": {
                if (card2 === "farmer") {
                    score.textContent = totalPower += 1;
                    playPowerUp();
                }
                break;
            }
            case "farmer": {
                if (card2 === "forger") {
                    score.textContent = totalPower += 1;
                    playPowerUp();
                }
                break;
            }
            case "killer": {
                if (card2 === "forger") {
                    break;
                }
                score.textContent = totalPower -= 2;
                break;
            }
            case "king": {
                if (card2 === "guard") {
                    score.textContent = totalPower += 1;
                    playPowerUp();
                }
                if (card2 === "killer") {
                    score.textContent = totalPower -= 1;
                }
                break;
            }
            case "builder": {
                if (card2 === "forger") {
                    score.textContent = totalPower += 2;
                    playPowerUp();
                }
                break;
            }
        }
    }

    function playPowerUp() {
        powerUp.currentTime = 0;
        powerUp.play();
    }
});
