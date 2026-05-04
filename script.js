/*Plant Care Tip Based on Current Weather*/
document.addEventListener("DOMContentLoaded", () => {
    let currentWeather = "weather unavailable";

    function mapWeatherCodeToDescription(code) {
        const weatherDescriptions = {
            0: "clear sky.",
            1: "mainly clear.",
            2: "partly cloudy.",
            3: "overcast.",
            45: "fog.",
            48: "rime fog.",
            51: "light drizzle.",
            53: "moderate drizzle.",
            55: "dense drizzle.",
            56: "light freezing drizzle.",
            57: "dense freezing drizzle.",
            61: "slight rain.",
            63: "moderate rain.",
            65: "heavy rain.",
            66: "light freezing rain.",
            67: "heavy freezing rain.",
            71: "slight snow fall.",
            73: "moderate snow fall.",
            75: "heavy snow fall.",
            77: "snow grains.",
            80: "slight rain showers.",
            81: "moderate rain showers.",
            82: "violent rain showers.",
            85: "slight snow showers.",
            86: "heavy snow showers.",
            95: "thunderstorm.",
            96: "thunderstorm with slight hail.",
            99: "thunderstorm with heavy hail."
        };

        return weatherDescriptions[code] || "unknown weather";
    }

    async function fetchWeather() {
        try {
            const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=42.3314&longitude=-83.0458&current_weather=true&temperature_unit=fahrenheit");
            const data = await response.json();

            const weatherCode = data.current_weather.weathercode;
            currentWeather = mapWeatherCodeToDescription(weatherCode);
        } catch (error) {
            currentWeather = "weather unavailable";
        }
    }

    function updatePlantWeatherTip() {
        const plantWeatherTip = document.getElementById("plantWeatherTip");
        const currentWeatherText = document.getElementById("currentWeatherText");
		const weather = currentWeather;

        if (!plantWeatherTip || !currentWeatherText) return;


        if (currentWeather.includes("rain") || currentWeather.includes("drizzle")) {
			emoji = "🌧️";
            plantWeatherTip.textContent = "Tip: Rainwater is a great chemical-free way to keep your plants hydrated. Today is a good day to collect rainwater! Bonus-Tip: Use a coffee filter to remove debris before storing.";
        } 
        else if (currentWeather.includes("clear")) {
			emoji = "☀️";
            plantWeatherTip.innerHTML = "Tip: It’s a beautiful sunny day! Be careful with direct sunlight. African Violets prefer bright, indirect light and can burn in direct sun. <a href='africanviolets.html#light'> CLICK HERE TO LEARN MORE</a>.";
        }
		else if (weather.includes("cloud") || weather.includes("overcast")) {
			emoji = "☁️";
			plantWeatherTip.innerHTML = "Tip: Cloudy days are perfect for African Violets. The light is naturally filtered. <a href='africanviolets.html#light'> CLICK HERE TO LEARN MORE</a>.";
		} 
		else if (weather.includes("snow")) {
			emoji = "❄️";
			plantWeatherTip.innerHTML = "Tip: Cold weather means dry indoor air. Consider increasing humidity for your plants. <a href='africanviolets.html#temp'> CLICK HERE TO LEARN MORE</a>.";
		}
		else if (weather.includes("fog")) {
			emoji = "🌫️";
			plantWeatherTip.textContent = "Tip: Foggy days usually mean lower light. You may want to keep plants closer to a window.";
		}
        else {
			emoji = "🌿";
            plantWeatherTip.textContent = "Tip: Today is a good day to check your plant’s soil. African Violets like lightly moist soil, but not soggy.";
        }
		
		currentWeatherText.innerHTML = "The current weather is: " + currentWeather + " <span class='weatheremoji'>" + emoji + "</span>";
    }

    async function initializePage() {
        await fetchWeather();
        updatePlantWeatherTip();
    }

    initializePage();
});




/*Form Order Total*/
document.addEventListener("DOMContentLoaded", () => {

	const totalElement = document.getElementById("total");
	const orderForm = document.getElementById("plantorderform");
	const summaryField = document.getElementById("orderSummary");
	const totalField = document.getElementById("orderTotalField");
	const orderList = document.getElementById("orderList");

	if (!totalElement || !orderForm) return;

	function updateTotal() {
		let total = 0;
		let summary = "";
		let displayList = "";

		document.querySelectorAll('.plant-entry').forEach(entry => {
			const qtyInput = entry.querySelector('input[type="number"]');
			const label = entry.querySelector('label');

			const qty = parseInt(qtyInput.value, 10) || 0;

			if (qty > 0) {
				const name = entry.dataset.name;

				total += qty * 6;
				summary += qty + " x " + name + "\n";
				displayList += qty + " x " + name + "<br>";
			}
		});

		totalElement.textContent = "$" + total;

		if (orderList) {
			orderList.innerHTML = displayList;
		}

		if (summaryField) {
			summaryField.value = summary;
		}

		if (totalField) {
			totalField.value = "$" + total;
		}
	}

	document.querySelectorAll('input[type="number"]').forEach(input => {
		input.addEventListener('input', updateTotal);
	});

	orderForm.addEventListener("reset", () => {
		setTimeout(updateTotal, 0);
	});

	updateTotal();
});


/*Automatically Check Checkbox when Qty Entered and Uncheck when Qty Removed*/
document.querySelectorAll('.plant-entry').forEach(entry => {
    const qtyInput = entry.querySelector('input[type="number"]');
    const checkbox = entry.querySelector('input[type="checkbox"]');

    if (!qtyInput || !checkbox) return;


    qtyInput.addEventListener('input', () => {
        const qty = parseInt(qtyInput.value, 10) || 0;
        checkbox.checked = qty > 0;
    });


    checkbox.addEventListener('change', () => {
        if (!checkbox.checked) {
            qtyInput.value = "";
        } else if (!qtyInput.value) {
            qtyInput.value = 1;
        }


        qtyInput.dispatchEvent(new Event('input'));
    });
});