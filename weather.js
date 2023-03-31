


const apiKey="215197090a8db280e8eef8655c44c49e";
const apiUrl= "https://api.openweathermap.org/data/2.5/weather?units=metric&";
const searchBox= $(".search input");
const searchBtn= $(".search button");

async function checkWeather(city){
    const response = await fetch(`${apiUrl}&appid=${apiKey}&q=${city}`);
    if(response.status==404){$(".error").css('display', 'block'); $('.weather').css('display', 'none');}
    else{$(".error").css('display', 'none');$(".weather").css('display', 'block')};
    var data = await response.json();
    var icon = data.weather[0].main;

    

    $(".city").text(data.name);
    $(".temp").text(Math.round(data.main.temp));
    bg_temp(Math.round(data.main.temp));
    $(".humidity").text(data.main.humidity);
    $(".wind").text(Math.round(data.wind.speed));
    $(".weather-icon").attr("src",`images\\${icon.toLowerCase()}.png`);

}

searchBtn.on("click", ()=> {checkWeather(searchBox.val().split(" ").map((x)=> x[0].toUpperCase()+x.slice(1,).toLowerCase()).join(" "));});

//-------------------Weather user's location---------------
if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}
else{
    $('.error').css('display','block').text(`Browser doesn't support geolocation`);
    $('.weather').css('display', 'none');
} 
// -----set user's position
function setPosition(position){

    let lat=position.coords.latitude;
    let lon=position.coords.longitude;
    
    getWeather(lat,lon);

}
// -----error message

function showError(error){
    $('.error').css('display','block').text(`${error.message}`);
    $('.weather').css('display', 'none');
}

// ----- get weather from API
 function getWeather(lat,lon){
    let coordAPI=`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(coordAPI)
        .then(function(resp){
            let data =resp.json();
            return data;
        })
        .then(function(data){
            console.log(data);
            var icon = data.weather[0].main;
            $('.weather').css('display','block');
            $('.city').text(`${data.name}`);
            $('.temp').text(Math.round(data.main.temp));
            bg_temp(Math.round(data.main.temp));
            $('.humidity').text(data.main.humidity);
            $('.wind').text(Math.round(data.wind.speed));
            $('.weather-icon').attr("src",`images\\${icon.toLowerCase()}.png`);
        })
    }

    function bg_temp(t){
        t<10 ? ([$('.details'),$('.card')].map(x=>x.attr('class','card rainy')))
        : (t<25)&&(t>=10)? ([$('.details'),$('.card')].map(x=>x.attr('class','card medium')))
        :([$('.details'),$('.card')].map(x=>x.attr('class','card sunny')));
    }

    //------Celcius to Farenheit

    function CelToFar(temp){
        return Math.round((temp*9/5)+32);
    }

    function FarToCel(temp){
        return Math.round((temp -32)*5/9);
    }
    //-----Celcius to Farenheit Event
    $('.sym').on('click', function(){ 
    //    let unit= $('.sym')[0].outerText
        if($('.sym')[0].outerText==='°c'){
            $('.sym')[0].innerText='°F';
            $('.temp').text(CelToFar(parseInt($('.temp').text())));
        } else if($('.sym')[0].outerText==='°F'){
            $('.sym')[0].innerText='°c';
            $('.temp').text(FarToCel(parseInt($('.temp').text())));  
        } else{
            $('.sym')[0].text('refresh')
        }
        })

    
    
    