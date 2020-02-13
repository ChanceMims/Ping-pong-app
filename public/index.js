const HOMEGIFS = ['https://media.giphy.com/media/lIv7H1vUVdaH6/giphy.gif', 'https://media.giphy.com/media/alMx8lxNgQv6g/giphy.gif', 'https://media.giphy.com/media/R0JQZRxyTmhTG/giphy.gif', 'https://media.giphy.com/media/aWtm6hVSJmRt6/giphy.gif', 'https://media.giphy.com/media/11rBFQqIe47Lck/giphy.gif', 'https://media.giphy.com/media/aDOiaVWvvZzdC/giphy.gif', 'https://media.giphy.com/media/Wyaq1InVpNDEc/giphy.gif', 'https://media.giphy.com/media/kjReZ2vUmMBfG/giphy.gif']
let currentUser;
let currentOrg;
const ORGANIZATIONS = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch ('http://localhost:3000/organizations')
    .then(resp => resp.json())
    .then(json => ORGANIZATIONS.push(...json))

    setupPage();

    function setupPage(){
        if (document.cookie){
            currentUser = document.cookie;
            //console.log(currentUser);
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
            !!currentUser ? showProfile() : loginPage() ;
        });
    }

    function setOrganizations(){
        const orgTag = document.getElementById('organizations-tab');
        orgTag.addEventListener('click',e => {
            setActive(e.target);
            indexOrganizationstionPage(document.getElementById('display-panel'));
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
        const profile_icon = getDefaultIcon();
        fetch('http://localhost:3000/users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                profile_icon
            })
        })
        .then(resp => resp.json())
        .then(json => {console.log(json)})
        .catch(error => console.log(error))
    }

    function getDefaultIcon(){
        return '/images/ping_pong_1.jpg'
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
            //console.log(key, currentUser[key]);
            if (key === 'profile_icon'){
                iconDiv.appendChild(makeElement('img', [{src: currentUser[key]}]))
            }
            else{
                attributeList.appendChild(makeTextElement('li', `${key}: ${currentUser[key]}`, [{}]));
            }
           
        }
    }

    function indexOrganizationstionPage(parent){
        console.log(currentUser.organizations);
        parent.innerHTML = '';
        const searchRow = makeElement('div', [{class: 'row'}]);
        searchRow.appendChild(makeElement('input', [{class: 'form-control'}, {type: 'text'}, {placeholder: 'Search all Organizations'}, {'aria-label': 'Search'}, {id: 'findOrg'}]))
        parent.appendChild(searchRow);
        const orgRow = makeElement('div', [{class: 'row'}]);
        const myOrgs = makeElement('div', [{class: 'col'}, {id: 'my-organizations'}]);
        const orgList = makeElement('ul', [{}]);
        for (const org of currentUser.organizations){
            console.log(org)
            const orgListElement = makeTextElement('li', org.name, [{}]);
           orgListElement.addEventListener('click', e => orgsToggle(org));
           orgList.appendChild(orgListElement);
        }
        myOrgs.appendChild(orgList);
        const createOrgForm = makeElement('div', [{class: 'col'}, {id: 'create-organization'}]);
        const createOrgButton = makeTextElement('button', 'Create New Org', [{type: 'submit'}, {class: 'btn, btn-primary'}, {id: 'createOrgButton'}]);
        formBuilder(createOrgForm, [{name: 'Organization Name'}, {icon_url: "Enter a URL for the organizations icon"}], createOrgButton);
        createOrgForm.addEventListener('submit', e => createOrg(e.target));
        orgRow.appendChild(myOrgs);
        orgRow.appendChild(createOrgForm);
        orgRow.appendChild(makeElement('div', [{class: 'col collapse'}, {id: 'show-organization'}]));
        orgRow.appendChild(makeElement('div', [{class: 'col collapse'}, {id: 'show-user'}]));
        parent.appendChild(orgRow);
    }

    function orgsToggle(org){
        const orgPage = document.getElementById('show-organization');
        const myOrgs = document.getElementById('my-organizations');
        const createOrg = document.getElementById('create-organization');
       // debugger;
        if (orgPage.classList.contains('collapse')){
            orgPage.appendChild(showOrganization(org, orgPage));
           // orgPage.classList.remove('col-0');
            orgPage.classList.remove('collapse');
            myOrgs.classList.add('collapse');
            createOrg.classList.add('collapse');
        }
    }

    function showOrganization(org, orgPage){
        const userList = makeElement('ul', [{}]);
        orgPage.appendChild(userList);
        currentOrg = ORGANIZATIONS.find(organization => organization.id === org.id);
        //debugger;
        for (const user of currentOrg.users){
            //console.log(user, currentUser);
            //debugger;
            
            const userListElement = makeTextElement('li', user.username, [{id: `user-${user.username}`}, {value: user.id}]);
                if (user.id !== currentUser.id){
                userListElement.addEventListener('click',e =>  userOptions(e.target.innerText, e.target.value))
            }
            userList.appendChild(userListElement);

        }
        return userList;
    }

    function userOptions(name, id){
        //debugger;
        const showUserPage = document.getElementById('show-user');
        showUserPage.classList.remove('collapse');
        const statRow = makeElement('div', [{class: 'row'}]);
        showUserPage.appendChild(statRow);
        const userRow = makeElement('div', [{class: 'row'}]);
        const userContainer = makeElement('div', [{class: 'col'}])
        userRow.appendChild(userContainer);
        const challengeButton = makeTextElement('button', `Challenge ${name}!`, [{type: 'submit'}, {class: 'btn, btn-primary'}, {id: 'challenge-button'}, {value: id}]);
        //debugger;
        //const challengeButton = document.getElementById('challenge-button');
        challengeButton.addEventListener('click', e => createMatch(e.target.value));
        userContainer.appendChild(challengeButton);
        showUserPage.appendChild(userRow);
       // console.log('userOptions():', name);
    }

    function createMatch(challengedId){
        //debugger;
        //console.log(challengedId, currentUser);
        challengedId = parseInt(challengedId, 10);
        fetch('http://localhost:3000/matches', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: 'Pending',
                match_type: 'challenge',
                organization_id: currentOrg.id,
                user_ids: [challengedId, currentUser.id]
            })
        })
        .then(resp => resp.json())
        .then(json => alertPlayer(json))
        
    }

    function alertPlayer(match){
        console.log('challenging player', match)
    }

    function formBuilder(parent, options, submitButton){
        const orgForm = document.createElement('form');
        parent.appendChild(orgForm);
        for (const option of options){
            for (const key in option){
                orgForm.appendChild(makeTextElement('label', option[key], [{for: key}]));
                orgForm.appendChild(makeElement('input', [{type: 'text'}, {class: 'form-control'}, {id: key}, {required: true}]))
                //console.log(key, option[key]);
            }
        }
        orgForm.appendChild(submitButton);
    }

    function createOrg(form){
        const name = document.getElementById('name').value;
        const icon_url = document.getElementById('icon_url').value;
        fetch('http://localhost:3000/organizations', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                icon_url
            })
        })
        .then(resp => resp.json())
        .then(json => {
            ORGANIZATIONS.push(json);
            addUserToOrg(json);
        })
        
    }

    function addUserToOrg(currentOrg){
        currentOrg.users.push({
            id: currentUser.id,
            name: currentUser.name,
            profile_icon: currentUser.profile_icon,
            email_address: currentUser.email_address,
            phone_number: currentUser.phone_number
        });
        fetch(`http://localhost:3000/organizations/${currentOrg.id}/add_user`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                
            },
            body: JSON.stringify({
                users: currentUser
            })
        })
        .then(resp => resp.json())
        .then(json => {
            currentUser.organizations.push(json);
            indexOrganizationstionPage(document.getElementById('display-panel'))
        })
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