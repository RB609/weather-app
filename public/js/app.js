const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#p1');
const msgTwo = document.querySelector('#p2');

//msgOne.textContent = 'From JavaScript';



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("OraOraOraOraOraOraOraOraOraOraOraOraOraOraOraOraOraOraOraOraOraOraOra");
    const location = search.value;
    msgOne.textContent = "Loading..";
    msgTwo.textContent = "";
    fetch('http://localhost:65535/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            msgOne.textContent = data.error; 
            console.log(data.error);
        }
        else {
            msgOne.textContent = data.place;
            msgTwo.textContent = data.forcast;
            console.log(data);
        }
    })
})
    
})