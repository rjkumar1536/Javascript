let loc = document.querySelector('.location-timezone');
let temp = document.querySelector('.temprature-degree');
let desc = document.querySelector('.temperature-description');
let span = document.querySelector('span');
window.addEventListener('load', ()=>{
    let long;
    let lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
               long = position.coords.longitude;
               lat = position.coords.latitude;
               const proxy = `https://cors-anywhere.herokuapp.com/`;
               const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=786e8cd8246287c3337b12813ca4553c`;
               fetch(api,{mode:'cors'}).then((response)=>{
                    return response.json();
                }).then(data=>{
                    // console.log(data);
                    loc.textContent= data.name;
                    temp.textContent = data.main.temp - 273.15;
                    desc.textContent = data.weather[0].description
                    // console.log(data.weather[0].description, data.main.temp, , data.timezone);
                });
        });
    }
});
var skycons = new Skycons({"color": "white"});
                    skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
let degree = document.addEventListener('click', ()=>{

    console.log(span.textContent, span.innerHTML)
    if(span.textContent == "C"){
        span.textContent = 'F';
        temp.textContent = Math.floor(( temp.textContent - 32 )/ 1.8);
        console.log(temp.innerText)
    }
    else{
        span.textContent= 'C';
        temp.textContent= Math.floor(5/9 * parseInt(temp.textContent) + 32);
        console.log(temp.innerText)
    }
})

