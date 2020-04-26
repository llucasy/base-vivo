const btnPesquisa = document.querySelector('#btnPesquisa')

btnPesquisa.addEventListener('click', () => {

  const cmpPesquisa = document.querySelector('#pesquisa').value

  if (isNaN(cmpPesquisa)) {
    return alert('Oi, você colocou letra(as) no campo de busca, não posso aceitar :/ favor corrigir :)')
  } 
})