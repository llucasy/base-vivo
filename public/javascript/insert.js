const contLinhas = document.querySelector("#contLinhas");
const textarea = document.querySelector('textarea[name="contLinhas"]');
const insertBtn = document.querySelector('input[name="insertBtn"]');

let arr = []
let cont = 0

textarea.addEventListener("change", event => {
    const string = textarea.value;
    arr = string.replace(/\r\n|\n/g, ",").split(",").map(String);

    arr.forEach( linha => { 
        if (linha.length === 11) { cont += 1}; 
    })

    contLinhas.innerHTML = cont;
    cont = 0
});

insertBtn.addEventListener("click", (event) => {

    let motivo = document.querySelector('textarea[name="motivo"]')

    if (contLinhas.innerHTML == 0) {
        alert('Oiii✌... você não digitou nenhuma linha correta para eu seguir com cadastro')
        event.preventDefault()
    } else if (motivo.value === "") {
        alert("Favor preencher o motivo, né!");
        event.preventDefault();
    }

});
