const HOMEGIFS = ['https://media.giphy.com/media/lIv7H1vUVdaH6/giphy.gif', 'https://media.giphy.com/media/alMx8lxNgQv6g/giphy.gif', 'https://media.giphy.com/media/R0JQZRxyTmhTG/giphy.gif', 'https://media.giphy.com/media/aWtm6hVSJmRt6/giphy.gif', 'https://media.giphy.com/media/11rBFQqIe47Lck/giphy.gif', 'https://media.giphy.com/media/aDOiaVWvvZzdC/giphy.gif', 'https://media.giphy.com/media/Wyaq1InVpNDEc/giphy.gif', 'https://media.giphy.com/media/kjReZ2vUmMBfG/giphy.gif']
let currentUser;

document.addEventListener('DOMContentLoaded', () => {
    
    setupPage();

    function setupPage(){
        if (document.cookie){
            currentUser = document.cookie;
            console.log(currentUser);
        }
        showHomePage(document.getElementById('display-panel'));
        setGif();
        setHome();
        setProfile();
        setOrganizations();
        setStats();
    }

    function setGif(){
        const homeGifIndex = Math.floor(Math.random() * HOMEGIFS.length);
        const homeGif = document.getElementById('homeGif');
        homeGif.setAttribute('src', HOMEGIFS[homeGifIndex]);
    }

    function setHome(){
        const homeTab = document.getElementById('home-tab');
        homeTab.addEventListener('click', e => {
            setActive(e.target);
            showHomePage(document.getElementById('display-panel'));
        });
    }



    function setProfile(){
        const profileTab = document.getElementById('profile-tab');
        profileTab.addEventListener('click', e => {
            setActive(e.target);
            !!currentUser ? console.log(showProfile()) : loginPage() ;
        });
    }

    function setOrganizations(){
        const orgTag = document.getElementById('organizations-tab');
        orgTag.addEventListener('click',e => {
            setActive(e.target);
            console.log('organization')
        });
    }

    function setStats(){
        const statsTab = document.getElementById('stats-tab');
        statsTab.addEventListener('click',e => {
            setActive(e.target);
            console.log('stats')
        });
    }

    function setActive(tab){
        const activeTabs = document.getElementsByClassName('active');
        activeTabs[0].classList.remove('active');
        tab.classList.add('active');
    }

    function showHomePage(parentDiv){
        parentDiv.innerHTML = '';
        parentDiv.appendChild(makeElement('iframe', [{class: 'giphy-embed'}, {id: 'homeGif'}, {frameborder: '0'}]));
        setGif();
        const appDescription = document.createElement('p');
        appDescription.innerText = " Welcome to the ping-pong app! This app makes it easy for you to coordinate matches and keep track of stats within your organization, workplace, or other group of ping-pong lovers! "
        parentDiv.appendChild(appDescription);
    }

    function loginPage(){
        const displayPanel = document.getElementById('display-panel');
        displayPanel.innerHTML = '';
        displayPanel.appendChild(createFormUser());
    }

    function createFormUser(){
        const form = document.createElement('form');
        const usernameForm = makeElement('div', [{class: 'form-group'}]);
        const usernameLabel = (makeElement('label', [{for: 'usernameInput'}]));
        usernameLabel.innerText = 'Username:';
        usernameForm.appendChild(usernameLabel);
        usernameForm.appendChild(makeElement('input', [{type: 'text'}, {class: 'form-control'}, {id: 'usernameInput'}, {required: true}]))
        form.appendChild(usernameForm);

        const passwordForm = makeElement('div', [{class: 'form-group'}]);
        const passwordLabel = (makeElement('label', [{for: 'passwordInput'}]));
        passwordLabel.innerText = 'Password:';
        passwordForm.appendChild(passwordLabel);
        passwordForm.appendChild(makeElement('input', [{type: 'password'}, {class: 'form-control'}, {id: 'passwordInput'}, {minlength: '8'}, {required: true}]))
        form.appendChild(passwordForm);

        const loginButton = makeElement('button', [{type: 'submit'}, {class: 'btn, btn-primary'}, {id: 'loginButton'}]);
        loginButton.innerText = 'Log In';
        loginButton.addEventListener('click', e => logIn(e.target.parentNode));
        form.appendChild(loginButton);

        const newAccountButton = makeElement('button', [{type: 'submit'}, {class: 'btn, btn-primary'}, {id: 'newAccountButton'}]);
        newAccountButton.innerText = 'Create Account';
        newAccountButton.addEventListener('click', e => createAccount(e.target.parentNode));
        form.appendChild(newAccountButton);

        return form;
    }

    function logIn(form){
        const username = form.children[0].lastChild.value;
        const password = form.children[1].lastChild.value;
        fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(resp => resp.json())
        .then(json => {
            currentUser = json;
            showProfile();
        })
        .catch(error => console.log(error))
    }

    function createAccount(form){
        const username = form.children[0].lastChild.value;
        const password = form.children[1].lastChild.value;
        fetch('http://localhost:3000/users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(resp => resp.json())
        .then(json => {console.log(json)})
        .catch(error => console.log(error))
    }

    function showProfile(){
        console.log(currentUser);
        const displayPanel = document.getElementById('display-panel');
        displayPanel.innerHTML = '';
        const userRow = makeElement('div', [{class: 'row'}])
        const attributeDiv = makeElement('div', [{class: 'col'}]); 
        const iconDiv = makeElement('div', [{class: 'col'}]);
        displayAttributes(attributeDiv, iconDiv);
        userRow.appendChild(attributeDiv);
        userRow.appendChild(iconDiv);
        displayPanel.appendChild(userRow);
    }

    function displayAttributes(attributeDiv, iconDiv){
        const attributeList = document.createElement('ul');
        attributeDiv.appendChild(attributeList);
        for (const key in currentUser){
            console.log(key, currentUser[key]);
            if (key === 'profile_icon'){
                iconDiv.appendChild(makeElement('img', [{src: currentUser[key]}]))
            }
            else{
                attributeList.appendChild(makeTextElement('li', `${key}: ${currentUser[key]}`, [{}]));
            }
           
        }
    }
    
    function makeTextElement(attr, text, options){
        const element = document.createElement(attr);
        element.innerText = text;
        for (const option of options){
            for(const key in option){
                element.setAttribute(key, option[key]);
            }
        }
        return element;
    }

    function makeElement(attr, options){
        const element = document.createElement(attr);
        for (const option of options){
            for(const key in option){
                element.setAttribute(key, option[key]);
            }
        }
        return element;
    }

})