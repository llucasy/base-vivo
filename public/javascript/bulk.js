const bulkLinhas = document.querySelector("#bulkLinhas");
const textarea = document.querySelector('textarea[name="bulkLinhas"]');
const contRegistro = document.querySelectorAll(".contRegistro");
const linha = document.querySelector(".linha");
const salvar = document.querySelector('input[name="salvar"]');

textarea.addEventListener("change", event => {
    const string = textarea.value;
    let arr = string.replace(/\r\n|\n/g, " ").split(" ");

    bulkLinhas.innerHTML = arr.length;
  });

linha.innerHTML = contRegistro.length;

salvar.addEventListener("click", (event) => {

  let motivo = document.querySelector('textarea[name="motivo"]')
  let acao = document.querySelectorAll('input[name="acao"]')

  if (motivo.value === "") {
      alert("Favor preencher o motivo!");
    event.preventDefault();
  } else if (!acao[0].checked & !acao[1].checked & !acao[2].checked & !acao[3].checked & !acao[4].checked ) {
    alert("Favor escolher uma das opções acima!");
    event.preventDefault();
  }

});
