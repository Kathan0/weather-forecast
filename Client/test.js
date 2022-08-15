function submitCities(){
    var array = document.querySelectorAll('[id="city"]');
    // console.log(array[1].value);

    var data = {
        cities: []
    };

        let config = {
            headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
            }
        }

    for(var i=0; i<array.length; i++){
        data.cities.push(array[i].value);
    }
        console.log(data.cities);

        let URL = 'http://localhost:4000/getWeather';

        axios.post(URL, data, config)
        .then(res=>{
            console.log(res.data.result.weather);
            let string = ``, blank = '', count = 1;
            var data = res.data.result.weather;

            for(var i=0; i<data.length; i++){
                console.log(data[i].city_name+" "+data[i].temp+" "+data[i].feels_like);
                string += `<tr>
                <th>${i+1}</th>
                <th>${data[i].city_name}</th>
                <th>${data[i].temp}</th>
                <th>${data[i].feels_like}</th>
                </tr>"`
            }
            document.getElementById('table_body').innerHTML = blank;
            document.getElementById('table_body').innerHTML = string;
        })
        .catch(e=>{
            console.log(e);
        })
}

function addMore() {
    const div = document.createElement('div');
  
    div.className = 'container-center';
  
    div.innerHTML = `<input type="text" id="city" placeholder="City">
      <button aria-placeholder="Remove" id="remove" onclick="removeRow(this)">Remove</button>
    `;
  
    document.getElementById('addMore').appendChild(div);
  }
  
  function removeRow(input) {
    document.getElementById('addMore').removeChild(input.parentNode);
  }