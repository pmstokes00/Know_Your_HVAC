// Define image descriptions and initialize the game with descriptions
const descriptions = {
	"basic_havc_system.jpeg": {
        "showName": "Central Air Conditioning System",
        "description": "A central air conditioning system is a common type of cooling system used in residential and commercial buildings. It consists of several interconnected components working together to provide efficient cooling throughout the indoor space. Below are the key components of a central air AC system:"
    },
	"condenser_unit.jpeg": {
        "showName": "Condenser",
        "description": "The condenser unit is typically located outside the building and contains components such as the compressor, condenser coil, and fan. It is responsible for releasing heat from the indoor air to the outdoor environment."
    },
	"evaporator_coil.jpeg": {
        "showName": "Evaporator Coil",
        "description": "The evaporator coil is located inside the building, usually in the air handler unit or furnace. It absorbs heat from the indoor air and converts it into cool air, which is then distributed throughout the building."
    },
	"refrigerant_lines.jpeg": {
        "showName": "Refrigerant Lines",
        "description": "Refrigerant lines connect the condenser unit to the evaporator coil, allowing refrigerant to circulate between the two components. Refrigerant is a chemical substance that absorbs and releases heat as it changes from a liquid to a gas and back again."
    },
	"air_ducts.jpeg.jpeg": {
		"showName": "Air Ducts",
		"description": "Air ducts are a network of channels or pipes that distribute cool air from the evaporator coil to various rooms or zones within the building. They also return warm air back to the evaporator coil for cooling."
	},
	"thermostat.jpeg": {
		"showName": "Thermostat",
		"description": "Air ducts are a network of channels or pipes that distribute cool air from the evaporator coil to various rooms or zones within the building. They also return warm air back to the evaporator coil for cooling."
    },
	"air_handler_unit.jpeg": {
		"showName": "Air Handler Unit",
		"description": "Air ducts are a network of channels or pipes that distribute cool air from the evaporator coil to various rooms or zones within the building. They also return warm air back to the evaporator coil for cooling."
    },	
	"filter.jpeg": {
		"showName": "filter",
		"description": "The filter is located within the air handler unit and is responsible for trapping dust, pollen, and other airborne particles to maintain indoor air quality. It should be regularly cleaned or replaced to ensure optimal system performance."
    }
};
// Initialize the game with descriptions
initializeGame(descriptions);

// Function to initialize the game with descriptions
	function initializeGame(descriptions) {
		// Define image data
		const images = Object.keys(descriptions).map(imagePath => ({
			image_path: `static/Images/${imagePath}`,
			show_name: descriptions[imagePath].showName,
			description: descriptions[imagePath].description
		}));

		// Initialize index to track current image, score, and total attempts counter
		let currentIndex = 0;
		let score = 0;
		let totalAttempts = 0; // Add variable to track total attempts
		let incorrectAttempts = 0;
		let soundPlayed = false; // Flag to track whether sound has been played
		let totalImagesCount = 0;

		// Update total count of images
		document.getElementById('total-count').textContent = images.length;

		// Function to display current image, description, and choices
		function displayImage(index) {
			const image = images[index];
			const currentImage = document.getElementById('current-image');
			currentImage.src = image.image_path;
			currentImage.alt = image.show_name;
			document.getElementById('description').textContent = image.description;
			generateChoices(image.show_name);
		}

    // Function to generate multiple choices
	function generateChoices(correctShowName) {
		const choicesContainer = document.getElementById('choices');
		choicesContainer.innerHTML = ''; // Clear previous choices
		const allShowNames = images.map(image => image.show_name);
		const shuffledShowNames = shuffleArray(allShowNames);
		const correctIndex = shuffledShowNames.indexOf(correctShowName);
		shuffledShowNames.splice(correctIndex, 1); // Remove correct answer from the array
		shuffledShowNames.sort(() => Math.random() - 0.5); // Shuffle remaining options
		shuffledShowNames.splice(Math.floor(Math.random() * 4), 0, correctShowName); // Insert correct answer at a random position
		shuffledShowNames.forEach((showName, index) => {
			if (index < 4) {
				const choiceButton = document.createElement('button');
				choiceButton.textContent = showName;
				choiceButton.classList.add('choice-button');
				choiceButton.addEventListener('click', () => {
					totalAttempts++; // Increment total attempts on each choice
					document.getElementById('attempt-count').textContent = totalAttempts; // Update attempts display
					if (showName === correctShowName) {
						choiceButton.style.color = 'white'; // Change text color to white for the correct answer
						document.getElementById('result').textContent = 'Correct!';
						document.getElementById('result').style.display = 'block'; // Show result message
						score++; // Increase score
						document.getElementById('score-value').textContent = score; // Update score display
						setTimeout(() => {
							document.getElementById('result').style.display = 'none'; // Hide result message after 2 seconds
						}, 2000); // Hide message after 2 seconds
						nextImage(); // Move to next image
					} else {
						document.getElementById('result').textContent = 'Incorrect. Try again';
						document.getElementById('result').style.display = 'block'; // Show result message
						incorrectAttempts++;
						totalAttempts++; // Increment total attempts
						document.getElementById('attempt-count').textContent = totalAttempts; // Update total attempts display
						setTimeout(() => {
							document.getElementById('result').style.display = 'none'; // Hide result message after 2 seconds
						}, 2000); // Hide message after 2 seconds
						if (incorrectAttempts === 3) {
							nextImage(); // Move to next image after 3 incorrect attempts
							incorrectAttempts = 0; // Reset incorrect attempts counter
						}
					}
				});
				choicesContainer.appendChild(choiceButton);
			}
		});
	}


    // Function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to move to the next image
    function nextImage() {
        currentIndex++;
        if (currentIndex >= images.length) {
            document.getElementById('game-over').innerHTML = 'Game Over<br>Restart?<br>Click here.';
            document.getElementById('game-over').style.display = 'block'; // Show game over message
            document.getElementById('game-over').addEventListener('click', restartGame);
        } else {
            displayImage(currentIndex);
        }
    }

    // Function to restart the game
    function restartGame() {
        currentIndex = 0; // Reset index
        incorrectAttempts = 0; // Reset incorrect attempts counter
        totalIncorrectAttempts = 0; // Reset total incorrect attempts counter
        score = 0; // Reset score
        document.getElementById('score-value').textContent = score; // Reset score display
        document.getElementById('attempt-count').textContent = totalIncorrectAttempts; // Reset total incorrect attempts display
        displayImage(currentIndex); // Display first image
        document.getElementById('game-over').style.display = 'none'; // Hide game over message
    }

    // Function to move to the next image
    function nextImage() {
        currentIndex++;
        if (currentIndex >= images.length) {
            document.getElementById('game-over').innerHTML = 'Game Over<br>Restart?<br>Click here.';
            document.getElementById('game-over').style.display = 'block'; // Show game over message
            document.getElementById('game-over').addEventListener('click', restartGame);
        } else {
            displayImage(currentIndex);
        }
    }

    // Function to restart the game
    function restartGame() {
        currentIndex = 0; // Reset index
        incorrectAttempts = 0; // Reset incorrect attempts counter
		incorrect =0;
        score = 0; // Reset score
        document.getElementById('score-value').textContent = score; // Reset score display
        displayImage(currentIndex); // Display first image
        document.getElementById('game-over').style.display = 'none'; // Hide game over message
    }

	// Event listener for the play sound button
	document.getElementById('play-sound-button').addEventListener('click', function() {
		// Logic to play the sound when the button is clicked
		const audio = new Audio('static/default_sound.mp3');
		audio.play();
		// Set the flag to true indicating the sound has been played
		soundPlayed = true;
		// Hide the play sound button after playing sound
		document.getElementById('play-sound-button').style.display = 'none';
		// Enable the choice buttons after sound is played
		enableChoiceButtons();
		// Display the first image after the sound is played
		displayImage(currentIndex);
		// Update the total images count
		totalImagesCount = images.length;
		// Set the total images count as a CSS custom property
		document.documentElement.style.setProperty('--total-images', totalImagesCount);
		// Update the total images count display
	document.getElementById('total-count').textContent = totalImagesCount;
	});

    // Function to enable choice buttons
    function enableChoiceButtons() {
        const choiceButtons = document.querySelectorAll('.choice-button');
        choiceButtons.forEach(button => {
            button.disabled = false; // Enable each choice button
        });
    }

    // Initial display
    // Since we're removing the sound button, we need to call displayImage directly
    displayImage(currentIndex);
	
    // Optional: Add event listeners for keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = images.length - 1; // Wrap around to the last image
            }
            displayImage(currentIndex);
        } else if (event.key === 'ArrowRight') {
            currentIndex++;
            if (currentIndex >= images.length) {
                currentIndex = 0; // Wrap around to the first image
            }
            displayImage(currentIndex);
        }
    });
}
