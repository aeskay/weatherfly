navigator.serviceWorker.register('/sw.js');

const apiKey = '2c91e0e478c158547a7270923ee75911',
      searchBox = document.getElementById('search'),
      searchBtn = document.getElementById('searchBtn'),
      cityName = document.getElementById('cityName'),
      countryName = document.getElementById('countryName'),
      weatherImg = document.getElementById('weatherImg'),
      cityTemp = document.getElementById('cityTemp'),
      description = document.querySelector('.description'),
      searchForm = document.querySelector('.searchForm'),
      humidity = document.getElementById('humidity'),
      pressure = document.getElementById('pressure'),
      wind = document.getElementById('wind'),
      visibility = document.getElementById('visibility');


window.addEventListener('load', (event) => {
  if (localStorage.getItem("cityKey") !== null) {
    console.log('Not null');
    cityName.innerText = localStorage.getItem("cityKey");
    countryName.innerText = localStorage.getItem("countryKey");
    cityTemp.innerHTML = localStorage.getItem("tempKey");
    description.innerText = localStorage.getItem("descKey");
    // const icon = iconJson;
    weatherImg.setAttribute('src', localStorage.getItem("imgKey"));
    humidity.innerText = localStorage.getItem("humidityKey");
    pressure.innerText = localStorage.getItem("pressureKey");
    wind.innerText = localStorage.getItem("windKey");
    visibility.innerText = localStorage.getItem("visibilityKey");
  } else {
    console.log('Still null');
  }
});

searchForm.addEventListener('submit', function(e){
  e.preventDefault();
  const inpValue = searchBox.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inpValue}&appid=${apiKey}&units=metric`;
  localStorage.setItem("cityKey", inpValue);
  fetch(url)
  .then((result) => {
    return result.json();
  })
  .then((data) => {
    console.log(data);
    const countryJson = data.sys["country"],
          cityJson = data["name"],
          tempJson = data.main["temp"] + '&deg;',
          descriptionJson =data.weather[0]["description"],
          iconJson = data.weather[0]["icon"],
          imgJson = `https://openweathermap.org/img/wn/${iconJson}@2x.png`,
          humidityJson = data.main["humidity"] + '%',
          pressureJson = data.main["pressure"] + 'hPa',
          windJson = data.wind["speed"] + 'm/s',
          visibilityJson = data["visibility"] + 'meter';
    
    countryName.innerText = countryJson;
    cityName.innerText = cityJson;
    cityTemp.innerHTML = tempJson;
    description.innerText = descriptionJson;
    // const icon = iconJson;
    weatherImg.setAttribute('src', imgJson);
    humidity.innerText = humidityJson;
    pressure.innerText = pressureJson;
    wind.innerText = windJson;
    visibility.innerText = visibilityJson;

    localStorage.setItem("countryKey", countryJson);
    localStorage.setItem("tempKey", tempJson);
    localStorage.setItem("descKey", descriptionJson);
    localStorage.setItem("iconKey", iconJson);
    localStorage.setItem("imgKey", imgJson);
    localStorage.setItem("humidityKey", humidityJson);
    localStorage.setItem("pressureKey", pressureJson);
    localStorage.setItem("windKey", windJson);
    localStorage.setItem("visibilityKey", visibilityJson);

    
  })
  searchForm.reset();
  // cityName = varName;
});


   






