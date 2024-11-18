/**
 * Processos de renderização
 */

console.log("Processo de renderização")

// Botão OK (Janela sobre)
function fechar() {
   api.fecharJanela()
}

// Capturar o id de textArea (!Importante)
const area = document.getElementById('txtArea')
// Iniciar o app com foco na área de digitação
area.focus() 
// Numeração automática de linhas
function atualizarLinhas() {
   // Capturar o id do container das linhas
   const linhasNumeradas = document.getElementById('linhas')
   // Variáveis de apoio usada na rendenização das linhas no HTML
   let linhasNumeradasHTML = ""
   // Divide o conteúdo da área de texto (tag textarea) em um array de linhas, utilizando \n como delimitador (nova linha)
   let linha = area.value.split('\n')
   // Percorrer o array de linhas adicionando uma linha a cada loop
   for (let i = 0; i < linha.length; i++) {
      linhasNumeradasHTML += i + 1 + '<br>'
   }
   // Atualizar o documento HTML
   linhasNumeradas.innerHTML = linhasNumeradasHTML
}

// Iniciar automaticamente a função junto com o app (linha 1)
atualizarLinhas()

// Adicionar um evento de entrada a área de texto (textarea) para atualizar as linha numeradas
area.addEventListener('input' , () => {
   atualizarLinhas()
})

// Adicionar evento de rolagem para sincronizar com as linhas
area.addEventListener('scroll' , () => {
   document.getElementById('linhas').scrollTop = area.scrollTop
})

// Identação do código ao pressionar a tecla TAB
area.addEventListener('keydown', (event) =>{
   // Se a tecla TAB for pressionada
   if (event.key === 'Tab') {
      // Ignorar o comportamento padrão
      event.preventDefault()
      // Variáveis de apoio
      const textarea = event.target
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      // Definir o número de espaços para o TAB
      // Dica: usar o "\t" para um TAB real do sistema
      const ident = '   ' // TAB equivale a 2 espaços
      // Adicionar a identação no ponto cursor
      textarea.value = textarea.value.substring(0, start) + ident + textarea.value.substring(end)
      // Mover o cursor para frente após a identação
      textarea.selectionStart = textarea.selectionEnd = start + ident. length
   }
})

// Mudar a cor do texto
api.setColor((event, color) => {
   // Validação
   if (area) {
      // Trocar a cor da fonte
      area.style.color = color
   }
})

// Novo arquivo / Abrir arquivo
// Novo arquivo: Carregar a estrutura e mudar o título
// Abrir arquivo: Abrir arquivo existente
api.setFile((event, file) => {
   area.value = file.content
   // Capturar o id do titulo
   const nomeArquivo = document.getElementById("titulo")
   nomeArquivo.innerHTML = `${file.name} - Mini Dev Editor`
   atualizarLinhas()
})
