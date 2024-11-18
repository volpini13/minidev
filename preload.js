/**
 * Segurança e desempenho
 */

const { contextBridge, ipcRenderer } = require('electron')

// processos de comunicação entre renderer e main
contextBridge.exposeInMainWorld('api', {
    // a linha abaixo cria uma função que envia uma mensagem ao processo principal
    // send (enviar) | on (receber)
    fecharJanela: () => ipcRenderer.send('close-about'),
    setColor: (color) => ipcRenderer.on('set-color', color),
    setFile: (file) => ipcRenderer.on('set-file', file),
    atualizarConteudo: (content) => ipcRenderer.send('update-content', content)
})