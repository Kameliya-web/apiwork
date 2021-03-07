const url =
  "https://api.openweathermap.org/data/2.5/onecall?lat=50.4019514&lon=30.3926091&exclude=hourly&appid=cad2765a99d66a322a717999fe4ec6eb";
const city = document.querySelector(".current__city");
const temperature = document.querySelector(".current__temperature");
const description = document.querySelector(".current__description");
const feels_like = document.querySelector(".feelslike");
const pressure = document.querySelector(".pressure");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const now_icon = document.querySelector(".current__icon");
const icon = document.querySelector(".forecast__icon");
const temp = document.querySelector(".forecast__temperature");
const time = document.querySelector(".forecast__time");
const current__day = document.querySelector(".current__day");
const current__forcast = document.querySelector(".curr__forecast");

fetch(url)
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {
    city.innerHTML = data.timezone;
    now_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.current.weather[0]["icon"]}@2x.png">`;
    description.textContent = data.current.weather[0]["description"];
    temperature.innerHTML = Math.round(data.current.temp - 273) + "&deg;";
    feels_like.innerHTML = Math.round(data.current.feels_like - 273) + "&deg;";
    pressure.innerHTML = data.current.pressure + " Па";
    humidity.innerHTML = data.current.humidity + "%";
    wind.innerHTML = data.current.wind_speed + " м/с";

    console.log(data);

    let dailyk = data.daily;
    let day = [];
    let timeDate = [];
    let weatherForcast = [];
    let iconMass = [];

    dailyk.forEach((element) => {
      day.push(element.temp);
    });
    dailyk.forEach((weath) => {
      weatherForcast.push(weath.weather);
    });

    weatherForcast.forEach((iconmass) => {
      iconMass.push(iconmass[0]);
    });

    function iconms() {
      iconMass.map((i) => {
        console.log(i.icon);
        let li_icon = document.createElement("li");
        icon.append(li_icon);
        li_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${i.icon}@2x.png">`;
      });
    }

    console.log(day);
    console.log(iconMass);
    dailyk.forEach((dt) => {
      timeDate.push(dt.dt);
    });
    for (var i = 0; i < timeDate.length; i++) {
      let li_date = document.createElement("li");
      time.append(li_date);
      let a = new Date(timeDate[i] * 1000);
      let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let dayOfWeek = days[a.getDay()];
      li_date.innerHTML += dayOfWeek;
      current__day.innerHTML = dayOfWeek;
    }

    day.map((b) => {
      let li_temp = document.createElement("li");
      temp.append(li_temp);
      li_temp.innerHTML +=
        Math.round(b.min - 273) + "°" + "-" + Math.round(b.max - 273) + "°";
    });

    let allDayForcast = [];
    day.forEach((p) => {
      allDayForcast.push(p);
    });
    let allDay = allDayForcast[0];

    for (let pog in allDay) {
      let currForcast = document.createElement("li");
      current__forcast.append(currForcast);

      currForcast.innerHTML +=
        pog + " </br>" + Math.round(allDay[pog] - 273) + "°";
    }
    iconms();
  })
  .catch((error) => alert(error.message));
