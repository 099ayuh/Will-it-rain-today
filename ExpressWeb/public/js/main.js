const subbtn = document.getElementById('SubmitBtn');
const cityName = document.getElementById('cityName');
const City_Name = document.getElementById('City_name');
const temp_status = document.getElementById('temp_status');
const temp_real_val = document.getElementById('temp_real_val');
const datahide = document.querySelector('.middle-layer');
const Day  = document.getElementById('day');
const DayToday  = document.getElementById('Today-data');
const date = new Date();
const DayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var MonthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
Day.innerText = `${DayArr[date.getDay()]}`;
DayToday.innerText = `${date.getDate()} ${MonthArr[date.getMonth()]}`;

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === "") {
        City_Name.innerText = `Please Write the Name before Search`;
        datahide.classList.add('data_hide');
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=858f54c9786e8dab5e2306b06f55df26`;
            const response = await fetch(url);
            const data = await response.json();
            // console.log(data);
            const arrData = [data];
            console.log(arrData);
            const temp_mood = arrData[0].weather[0].main;
            City_Name.innerText = `${arrData[0].name} , ${arrData[0].sys.country}  (${temp_mood})`;
            temp_real_val.innerText = `${Math.trunc(arrData[0].main.temp)}`;
            // temp_status.innerText = arrData[0].weather[0].main;
            console.log(temp_mood);
            if (temp_mood == "Clear") {
                console.log("Clear")
                temp_status.innerHTML = `<i class="fas fa-sun" style="color : #eccc68;"></i>`
            } else if (temp_mood == "Clouds") {
                console.log("Clouds")
                temp_status.innerHTML = `<i class="fas fa-cloud-sun" style="color : #968e4b;"></i>`
            } else if (temp_mood == "Rain") {
                console.log("Rain")
                temp_status.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy" style="color : skyblue;"></i>`
            } else if (temp_mood == "Thunderstorm") {
                console.log("Thunderstrom")
                temp_status.innerHTML = `<i class="fa-solid fa-cloud-bolt" style="color : gray;"></i>`
            } else if (temp_mood == "Haze") {
                console.log("Haze")
                temp_status.innerHTML = `<img src="https://img.icons8.com/fluency/48/000000/foggy-night-1.png" width="70px" height="70.4px"/>`;
            } else {
                console.log("Else")
                temp_status.innerHTML = `<i class="fas fa-cloud" style="color : #f1f2f6;"></i>`
            }

            datahide.classList.remove('data_hide');

            // console.log(arrData[0].main.temp);
            // console.log(arrData[0].weather[0].main);
        }
        catch (err) {
            console.log(err)
            City_Name.innerText = `Please Enter the City name Properly`;
            datahide.classList.add('data_hide');
        }
    }
}

subbtn.addEventListener('click', getInfo);