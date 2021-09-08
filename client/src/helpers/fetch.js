export const fetchingData = () => {
    fetch(`https://monde-diplomatique.de/archiv-text?text=ägypten`)
        .then(res => res.text())
        .then(text => console.log(text))
}