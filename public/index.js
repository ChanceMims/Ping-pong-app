document.addEventListener('DOMContentLoaded', () => {
    const HOMEGIFS = ['https://media.giphy.com/media/lIv7H1vUVdaH6/giphy.gif', 'https://media.giphy.com/media/alMx8lxNgQv6g/giphy.gif', 'https://media.giphy.com/media/R0JQZRxyTmhTG/giphy.gif', 'https://media.giphy.com/media/aWtm6hVSJmRt6/giphy.gif', 'https://media.giphy.com/media/11rBFQqIe47Lck/giphy.gif', 'https://media.giphy.com/media/aDOiaVWvvZzdC/giphy.gif', 'https://media.giphy.com/media/Wyaq1InVpNDEc/giphy.gif', 'https://media.giphy.com/media/kjReZ2vUmMBfG/giphy.gif']
    setGif();

    function setGif(){
        const homeGifIndex = Math.floor(Math.random() * HOMEGIFS.length);
        const homeGif = document.getElementById('homeGif');
        homeGif.setAttribute('src', HOMEGIFS[homeGifIndex]);
    }
})