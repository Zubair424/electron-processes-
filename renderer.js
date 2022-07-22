const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
const btn = document.getElementById('btn2')
const filePathElement = document.getElementById('filePath')

setButton.addEventListener('click', () => {
    const title = titleInput.value
    window.electronAPI.setTitle(title)

});
btn.addEventListener('click',async()=>{
    const filepath=await window.electronAPI.openFile()
    filePathElement.innerText=filepath
})