/**
 * Processos de renderização
 */

console.log("Processo de renderização")

// Botão OK (Janela sobre)
function fechar() {
   api.fecharJanela()
}

// capturar o id de textArea (importante !)
const area = document.getElementById('txtArea')

// iniciar o app com foco na área de digitação
area.focus() 

// Numeração automática de linhas
function atualizarLinhas() {
   //capturar o id do container das linhas
   const linhasNumeradas = document.getElementById('linhas')
   //variável de apoio usada na renderização das linhas no html
   let linhasNumeradasHTML = ""
   // divide o conteúdo da área de texto (tag textarea) em um array de linhas, utilizando \n como delilitador (nova linha)
   let linha = area.value.split('\n')
   // percorrer o array de linhas adicionando um número de linha a cada loop 
   for (let i = 0; i < linha.length; i++) {
      linhasNumeradasHTML += i + 1 + '<br>'
   }
   // atualizar o documento html
   linhasNumeradas.innerHTML = linhasNumeradasHTML
}

// Iniciar automaticamente a função junto com o APP (linha 1)
atualizarLinhas()

// Adicionar um evento de entrada a área de texto (textarea) para atualizar as linhas numeradas
area.addEventListener('input', () => {
   atualizarLinhas()
})

// Adicionar um evento de rolagem a área de texto (textarea) para sincronizar com as linhas
area.addEventListener('scroll', () => {
   document.getElementById('linhas').scrollTop = area.scrollTop
})

// Identação do código ao pressionar a tecla TAB
area.addEventListener('keydown', (event) => {
   // se a tecla TAB for pressionada
   if (event.key === 'Tab') {
      // ignorar o comportamento padrão
      event.preventDefault()
      // varíaveis de apoio
      const textarea = event.target
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      // definir o número de espaços para o TAB
      // Dica: usar o "\t" para um TAB real do sistema
      const ident = '  ' // TAB equivale a 2 espaços
      // Adicionar a identação no ponto cursor
      textarea.value = textarea.value.substring(0, start) + ident + textarea.value.substring(end)
      // Mover o cursor para frente após a identação
      textarea.selectionStart = textarea.selectionEnd = start + ident.length
   }
})

// mudar a cor do texto
api.setColor((event, color) => {
   // validação
   if (area) {
      // trocar a cor da fonte (style -> CSS)
      area.style.color = color
   }
})

// Novo arquivo / Abrir arquivo
// Novo arquivo: Carregar a estrutura e mudar o título
// Abrir arquivo: Abrir um arquivo existente
api.setFile((event, file) => {
   area.value = file.content
   //captura o id do título
   const nomeArquivo = document.getElementById("titulo")
   nomeArquivo.innerHTML = `${file.name} - Mini Dev Editor`
   atualizarLinhas()
})

// Atualização de conteúdo (objeto file) em tempo real
function update() {
   api.atualizarConteudo(area.value)
}