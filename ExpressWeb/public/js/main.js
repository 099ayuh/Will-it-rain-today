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
            temp_real_val.innerText = `${Math.round(arrData[0].main.temp)}`;
            // temp_status.innerText = arrData[0].weather[0].main;
            console.log(temp_mood);
            const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            temp_status.innerHTML = `<img src='${iconURL}' style="box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px; border-radius:2rem; background-color:gray; width="70px"; height="70px";"/>`;
            document.querySelector(".Dynamic_Img").style.backgroundImage =
                `url('https://source.unsplash.com/900x900/?"nature-${temp_mood}"')`;

            datahide.classList.remove('data_hide');

            // console.log(arrData[0].main.temp);
            // console.log(arrData[0].weather[0].main);
        }
        catch (err) {
            console.log(err)
            City_Name.innerText = `Please Enter the City Name Properly or Check Your Internet Connection Properly`;
            datahide.classList.add('data_hide');
        }
    }
}

subbtn.addEventListener('click', getInfo);
