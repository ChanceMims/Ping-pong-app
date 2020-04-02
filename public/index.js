const HOMEGIFS = [
  "https://media.giphy.com/media/kjReZ2vUmMBfG/giphy.mp4",
  "https://media.giphy.com/media/4IAzyrhy9rkis/giphy.mp4",
  "https://media.giphy.com/media/Z3cYjr662Puw/giphy.mp4",
  "https://media.giphy.com/media/lIv7H1vUVdaH6/giphy.mp4",
  "https://media.giphy.com/media/QrWLAievAvV4Y/giphy.mp4"
];
let currentUser;
let currentOrg;
const ORGANIZATIONS = [];
const USERS = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/organizations")
    .then(resp => resp.json())
    .then(json => ORGANIZATIONS.push(...json));

  fetch("http://localhost:3000/users")
    .then(resp => resp.json())
    .then(json => USERS.push(...json));

  setupPage();

  function setupPage() {
    if (document.cookie) {
      currentUser = document.cookie;
      //console.log(currentUser);
    }
    //showHomePage(document.getElementById("display-panel"));
    setGif();
    setHome();
    setProfile();
    setOrganizations();
    setStats();
  }

  function setGif() {
    const homeGifIndex = Math.floor(Math.random() * HOMEGIFS.length);
    const homeGifSource = document.getElementById("homeGifSource");
    homeGifSource.setAttribute("src", HOMEGIFS[homeGifIndex]);
    //debugger;

    // const gifSrc = makeElement("source", [
    //   { src: HOMEGIFS[homeGifIndex] },
    //   { type: "video/mp4" }
    // ]);
    // homeGif.appendChild(gifSrc);
  }

  function setHome() {
    const homeTab = document.getElementById("home-tab");
    homeTab.addEventListener("click", e => {
      setActive(e.target.id);
      setGif();
    });
  }

  function setProfile() {
    const profileTab = document.getElementById("profile-tab");
    profileTab.addEventListener("click", e => {
      setActive(e.target.id);
      !!currentUser
        ? (profileTab.innerText = "Profile")
        : (profileTab.innerText = "Login");
    });
  }

  function setOrganizations() {
    const orgTag = document.getElementById("organizations-tab");
    orgTag.addEventListener("click", e => {
      setActive(e.target.id);
    });
  }

  function setStats() {
    const statsTab = document.getElementById("stats-tab");
    statsTab.addEventListener("click", e => {
      setActive(e.target.id);
      console.log("stats");
    });
  }

  function setActive(clickedTab) {
    const activateId = clickedTab.split("-")[0] + "-panel";

    const activatePanel = document.getElementById(activateId);

    activatePanel.removeAttribute("hidden");

    const activeTabs = document.getElementsByClassName("active");
    const activeTab = activeTabs[0];

    const deactivateId = activeTab.id.split("-")[0] + "-panel";

    const deactivatePanel = document.getElementById(deactivateId);

    deactivatePanel.setAttribute("hidden", true);

    activeTab.classList.remove("active");

    const activateClickedTab = document.getElementById(clickedTab);
    activateClickedTab.classList.add("active");

    switch (clickedTab) {
      case "home-tab":
        showHome();
      case "profile-tab":
        !!currentUser ? showProfile() : showLogin();
      case "organizations-tab":
        showOrganizations();
    }
  }

  function showHome() {
    setGif();
  }

  function showLogin() {
    const loginPanel = document.getElementById("login-panel");
    loginPanel.removeAttribute("hidden");

    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", e =>
      logIn(e.target.elements[0].value, e.target.elements[1].value)
    );
  }

  function showProfile() {
    !!currentUser ? showUser() : showLogin();
  }

  function showOrganizations() {
    !!currentUser ? "" : orgPageNoUser();
  }

  function orgPageNoUser() {
    const lastOrgs = ORGANIZATIONS.slice(-5);
    const lastOrgsPanel = document.getElementById("organizations-panel");
    lastOrgsPanel.innerHTML = "";
    lastOrgsPanel.appendChild(
      makeTextElement(
        "h2",
        "Showing most recent Organizations. Please log in or create an account to join.",
        [{}]
      )
    );
    const orgList = makeElement("ul", [{}]);
    for (const org of lastOrgs) {
      const lastOrg = makeTextElement("li", org.name, [
        { id: `last-org-${org.id}` }
      ]);
      orgList.appendChild(lastOrg);
    }

    lastOrgsPanel.appendChild(orgList);
  }

  function createFormUser() {
    // const newAccountButton = makeElement("button", [
    //   { type: "submit" },
    //   { class: "btn, btn-primary" },
    //   { id: "newAccountButton" }
    // ]);
    // newAccountButton.innerText = "Create Account";
    // newAccountButton.addEventListener("click", e =>
    //   createAccount(e.target.parentNode)
    // );
    // form.appendChild(newAccountButton);
    //return form;
  }

  function logIn(username, password) {
    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(resp => resp.json())
      .then(json => {
        //console.log(json)
        if (json.error) {
          alert(json.error);
        } else {
          currentUser = json;
          const loginPanel = document.getElementById("login-panel");
          loginPanel.setAttribute("hidden", true);
          showUser();
        }
      });
  }

  function createAccount(form) {
    const username = form.children[0].lastChild.value;
    const password = form.children[1].lastChild.value;
    const profile_icon = getDefaultIcon();
    fetch("http://localhost:3000/users/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        profile_icon
      })
    })
      .then(resp => resp.json())
      .then(json => {
        if (json.error) {
          alert(json.error);
        } else {
          USERS.push(json);
          currentUser = json;
          setActive(document.getElementById("profile-tab"));
        }
      });
  }

  function showUser() {
    const profileTab = document.getElementById("profile-tab");
    profileTab.innerText = "Profile";
    const userPanel = document.getElementById("user-panel");
    userPanel.removeAttribute("hidden");

    createMatchesDisplays();
  }

    function createMatchesDisplays() {
        const profileHeader = document.getElementById('profile-header')
        profileHeader.innerText = `${currentUser.username}'s matches:`
 
  
      const pendingMatchList 
      
      const pendingMatches = getMatches("Pending", "recipient");
      
    for (const pendingMatch of pendingMatches) {
      const challenger = USERS.find(user => {
        return user.id == pendingMatch.challenger;
      });
      const recipient = USERS.find(user => {
        return user.id == pendingMatch.recipient;
      });
      const pendingMatchListCard = makeTextElement(
        "div",
        `You've been challenged by ${challenger.username}`,
        [{ class: "card" }, { id: pendingMatch.id }]
      );
      const collapsableButtonDiv = makeElement("div", [{ class: "collapse" }]);
      const acceptChallengeButton = makeTextElement("button", "Accept Match", [
        { class: "btn btn-primary" },
        { type: "submit" }
      ]);
      collapsableButtonDiv.appendChild(acceptChallengeButton);
      pendingMatchListCard.addEventListener("click", e =>
        toggleCollapse(e.target)
      );
      acceptChallengeButton.addEventListener("click", e =>
        acceptMatch(pendingMatch)
      );
      pendingMatchList.appendChild(pendingMatchListCard);
      pendingMatchListCard.appendChild(collapsableButtonDiv);
      collapsableButtonDiv.appendChild(acceptChallengeButton);
    }

    function toggleCollapse(parent) {
      const collapsableDiv = parent.firstElementChild;
      //;
      if (collapsableDiv.classList.contains("collapse")) {
        collapsableDiv.classList.remove("collapse");
      } else {
        collapsableDiv.classList.add("collapse");
      }
    }

    const acceptedMatchDiv = makeElement("div", [
      { class: "col card" },
      { id: "accepted-matches" }
    ]);
    acceptedMatchDiv.appendChild(
      makeTextElement("h3", "Accepted Matches:", [{}])
    );
    const acceptedMatchList = makeElement("ul", [
      { id: "accepted-matches-list" }
    ]);
    //debugger;
    const acceptedMatches = [];
    currentUser.matches.filter(match => {
      //debugger;
      if (match.status === "Accepted") {
        acceptedMatches.push(match);
      }
    });
    for (const acceptedMatch of acceptedMatches) {
      const challenger = USERS.find(user => {
        return user.id == acceptedMatch.challenger;
      });
      const recipient = USERS.find(user => {
        return user.id == acceptedMatch.recipient;
      });

      const acceptedMatchElement = makeTextElement(
        "li",
        `Challenger ${challenger.username} vs. ${recipient.username}`,
        [{ class: "red bold" }, { id: acceptedMatch.id }]
      );
      acceptedMatchElement.addEventListener("click", e =>
        reportScore(acceptedMatch)
      );
      acceptedMatchList.appendChild(acceptedMatchElement);
    }
    acceptedMatchDiv.appendChild(acceptedMatchList);

    ///////Obvioisly does not belong here!!! please move
    parentRow.appendChild(
      makeElement("div", [
        { class: "col card collapse" },
        { id: "report-score" }
      ])
    );

    parentRow.appendChild(acceptedMatchDiv);
  }

  function reportScore(match) {
    //debugger;
    //const displayPanel = document.getElementById('display-panel');
    const scoreFormDiv = document.getElementById("report-score");

    // debugger;
    scoreFormDiv.innerHTML = "";
    scoreFormDiv.classList.remove("collapse");
    const scoreForm = makeElement("form", [{}]);
    scoreFormDiv.appendChild(scoreForm);
    const formContainer = makeElement("div", [
      { class: "form-row align-items-center" }
    ]);
    scoreForm.appendChild(formContainer);
    const selectContainer = makeElement("div", [{ class: "col-auto my-1" }]);
    formContainer.appendChild(selectContainer);
    selectContainer.appendChild(
      makeTextElement("label", "Select Winner: ", [{ for: "winnerSelect" }])
    );
    const selectForm = makeElement("select", [
      { class: "custom-select" },
      { id: "winnerSelect" }
    ]);
    selectContainer.appendChild(selectForm);
    selectForm.appendChild(
      makeTextElement("option", "Select Winner", [{ selected: true }])
    );
    const challenger = USERS.find(user => {
      return match.challenger === user.id;
    });
    const recipient = USERS.find(user => {
      return match.recipient === user.id;
    });

    selectForm.appendChild(
      makeTextElement("option", challenger.username, [{ value: challenger.id }])
    );
    selectForm.appendChild(
      makeTextElement("option", recipient.username, [{ value: recipient.id }])
    );

    const buttonDiv = makeElement("div", [{ class: "col-auto" }]);
    scoreForm.appendChild(buttonDiv);
    const submitScoreButton = makeTextElement("button", "Submit Winner", [
      { type: "submit" },
      { class: "btn btn-primary" }
    ]);
    scoreForm.addEventListener("submit", e => {
      submitWinner(e.target, match.id);
    });
    buttonDiv.appendChild(submitScoreButton);
  }

  function submitWinner(form, match_id) {
    const winner_id = form.winnerSelect[form.winnerSelect.selectedIndex].value;
    const loser_id = winner_id === "1" ? "2" : "1";
    console.log(`winner ${winner_id}, loser: ${loser_id}`);
    fetch(`http://localhost:3000/matches/${match_id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        winner_id,
        loser_id,
        status: "Complete"
      })
    })
      .then(resp => resp.json())
      .then(json => {
        const reportScore = document.getElementById("report-score");
        reportScore.classList.add("collapse");
        const acceptedMatchesList = document.getElementById(
          "accepted-matches-list"
        );
        acceptedMatchesList.removeChild(document.getElementById(json.id));
        //debugger;
      });
  }

  function getMatches(matchType, matchingId) {
    const userMatches = [];
    currentUser.matches.filter(match => {
      //debugger;
      if (match.status === matchType && currentUser.id === match[matchingId]) {
        userMatches.push(match);
      }
    });
    return userMatches;
  }

  //   function displayAttributes(attributeDiv, iconDiv) {
  //     const attributeList = document.createElement("ul");
  //     attributeDiv.appendChild(attributeList);
  //     for (const key in currentUser) {
  //       //console.log(key, currentUser[key]);
  //       if (key === "profile_icon") {
  //         iconDiv.appendChild(
  //           makeElement("img", [{ src: currentUser[key] }, { width: "200px" }])
  //         );
  //       } else if (["id", "matches", "organizations"].includes(key)) {
  //       } else if (currentUser[key]) {
  //         attributeList.appendChild(
  //           makeTextElement("li", `${key}: ${currentUser[key]}`, [{}])
  //         );
  //       }
  //     }
  //   }

  function acceptMatch(match) {
    fetch(`http://localhost:3000/matches/${match.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: "Accepted"
      })
    })
      .then(resp => resp.json())
      .then(json => {
        //currentOrg = json;
        const pendingMatchesList = document.querySelector(
          "#pending-matches ul"
        );
        const acceptedMatchList = document.querySelector(
          "#accepted-matches ul"
        );
        pendingMatchesList.removeChild(document.getElementById(match.id));
        acceptedMatchList.appendChild(document.getElementById(match.id));
        console.log(json);
      });
  }

  function indexOrganizationstionPage(parent) {
    //console.log(currentUser.organizations);
    parent.innerHTML = "";
    const searchRow = makeElement("div", [{ class: "row" }]);
    searchForm = makeElement("form", [
      { class: "form-inline md-form mr-auto mb-4" }
    ]);
    const searchButton = makeTextElement("button", "Search", [
      { class: "btn btn-elegant btn-rounded btn-sm my-0" },
      { type: "submit" },
      { id: "search-button" }
    ]);
    const searchBar = makeElement("input", [
      { class: "form-control mr-sm-2" },
      { type: "text" },
      { placeholder: "Search all Organizations" },
      { "aria-label": "Search" },
      { id: "findOrg" }
    ]);
    searchButton.addEventListener("click", e => findOrg());
    searchForm.appendChild(searchBar);
    searchForm.appendChild(searchButton);
    searchRow.appendChild(searchForm);
    parent.appendChild(searchRow);
    const orgRow = makeElement("div", [{ class: "row" }]);
    const myOrgs = makeElement("div", [
      { class: "col" },
      { id: "my-organizations" }
    ]);
    const orgList = makeElement("ul", [{}]);
    for (const org of currentUser.organizations) {
      console.log(org);
      const orgListElement = makeTextElement("li", org.name, [{}]);
      orgListElement.addEventListener("click", e => orgsToggle(org));
      orgList.appendChild(orgListElement);
    }
    myOrgs.appendChild(orgList);
    const createOrgForm = makeElement("div", [
      { class: "col" },
      { id: "create-organization" }
    ]);
    const createOrgButton = makeTextElement("button", "Create New Org", [
      { type: "submit" },
      { class: "btn, btn-primary" },
      { id: "createOrgButton" }
    ]);
    formBuilder(
      createOrgForm,
      [
        { name: "Organization Name" },
        { icon_url: "Enter a URL for the organizations icon" }
      ],
      createOrgButton
    );
    createOrgForm.addEventListener("submit", e => createOrg(e.target));
    orgRow.appendChild(myOrgs);
    orgRow.appendChild(createOrgForm);
    orgRow.appendChild(
      makeElement("div", [
        { class: "col collapse" },
        { id: "show-organization" }
      ])
    );
    orgRow.appendChild(
      makeElement("div", [{ class: "col collapse" }, { id: "show-user" }])
    );
    orgRow.appendChild(
      makeElement("div", [
        { class: "col collapse" },
        { id: "show-found-organizations" }
      ])
    );
    orgRow.appendChild(
      makeElement("div", [
        { class: "col-12 collapse" },
        { id: "show-found-organization" }
      ])
    );
    parent.appendChild(orgRow);
  }

  function findOrg() {
    //debugger;
    const searchButton = document.getElementById("findOrg");
    const searchTerm = searchButton.value.split(" ")[0];
    const foundOrgs = [];
    ORGANIZATIONS.filter(org => {
      /*
            LET THEM BE CLICKED TO SHOW THEIR PAGE, JOINABLE IF NOT ALREADY JOINED
            */
      if (org.name.includes(searchTerm)) {
        foundOrgs.push(org);
      }
    });
    //console.log(foundOrgs);
    showFoundOrgs(foundOrgs);
  }

  function showFoundOrgs(orgs) {
    const showFoundOrgs = document.getElementById("show-found-organizations");
    showFoundOrgs.innerHTML = "";
    showFoundOrgs.classList.remove("collapse");
    const foundOrgsList = makeElement("ul", [{}]);
    showFoundOrgs.appendChild(
      makeTextElement(
        "h3",
        "Organizations found by advanced search algorithm:",
        [{}]
      )
    );
    showFoundOrgs.appendChild(foundOrgsList);
    for (const org of orgs) {
      const foundOrg = makeTextElement("li", org.name, [
        { id: `found-${org.id}` }
      ]);
      foundOrg.addEventListener("click", e => showFoundOrganization(org));
      foundOrgsList.appendChild(foundOrg);
    }
  }

  function orgsToggle(org) {
    const orgPage = document.getElementById("show-organization");
    const myOrgs = document.getElementById("my-organizations");
    const createOrg = document.getElementById("create-organization");
    // debugger;
    if (orgPage.classList.contains("collapse")) {
      orgPage.appendChild(showOrganization(org, orgPage));
      // orgPage.classList.remove('col-0');
      orgPage.classList.remove("collapse");
      myOrgs.classList.add("collapse");
      createOrg.classList.add("collapse");
    }
  }

  function showFoundOrganization(org) {
    const orgDiv = document.getElementById("show-found-organization");
    orgDiv.innerHTML = "";
    orgDiv.classList.remove("collapse");
    // const iconRow = makeElement('div', [{class: 'row'}]);
    // orgDiv.appendChild(iconRow);
    const orgCard = makeElement("div", [{ class: "card bg-dark text-white" }]);
    orgDiv.appendChild(orgCard);
    orgCard.appendChild(
      makeElement("img", [
        { class: "card-img" },
        { src: org.icon_url },
        { alt: "card image" }
      ])
    );
    const divOverlay = makeElement("div", [{ class: "card-img-overlay" }]);
    divOverlay.appendChild(
      makeTextElement("h5", org.name, [{ class: "card-title" }])
    );
    orgCard.appendChild(divOverlay);
    const joinButton = makeTextElement("button", "Join Org", [
      { class: "btn btn-primary" },
      { type: "submit" }
    ]);
    joinButton.addEventListener("click", e => addUserToOrg(org));

    if (!!currentUser) {
      if (
        org.users.find(user => {
          return user.id === currentUser.id;
        })
      ) {
        //console.log('hello');
      } else {
        orgDiv.appendChild(joinButton);
      }
    }

    //iconRow.appendChild(makeElement('img', [{src: org.icon_url}, {class: 'image'}]))
  }

  function showOrganization(org, orgPage) {
    const userList = makeElement("ul", [{}]);
    orgPage.appendChild(userList);
    currentOrg = ORGANIZATIONS.find(organization => organization.id === org.id);
    //debugger;
    for (const user of currentOrg.users) {
      //console.log(user, currentUser);
      //debugger;

      const userListElement = makeTextElement("li", user.username, [
        { id: `user-${user.username}` },
        { value: user.id }
      ]);
      if (user.id !== currentUser.id) {
        userListElement.addEventListener("click", e =>
          userOptions(e.target.innerText, e.target.value)
        );
      }
      userList.appendChild(userListElement);
    }
    return userList;
  }

  function userOptions(name, id) {
    //debugger;
    const showUserPage = document.getElementById("show-user");
    showUserPage.innerHTML = "";
    showUserPage.classList.remove("collapse");
    const statRow = makeElement("div", [{ class: "row" }]);
    showUserPage.appendChild(statRow);
    const userRow = makeElement("div", [{ class: "row" }]);
    const userContainer = makeElement("div", [{ class: "col" }]);
    userRow.appendChild(userContainer);
    const challengeButton = makeTextElement("button", `Challenge ${name}!`, [
      { type: "submit" },
      { class: "btn, btn-primary" },
      { id: "challenge-button" },
      { value: id }
    ]);
    //debugger;
    //const challengeButton = document.getElementById('challenge-button');
    challengeButton.addEventListener("click", e => createMatch(e.target.value));
    userContainer.appendChild(challengeButton);
    showUserPage.appendChild(userRow);
    // console.log('userOptions():', name);
  }

  function createMatch(challengedId) {
    //debugger;
    //console.log(challengedId, currentUser);
    challengedId = parseInt(challengedId, 10);
    fetch("http://localhost:3000/matches", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: "Pending",
        match_type: "challenge",
        organization_id: currentOrg.id,
        challenger: currentUser.id,
        recipient: challengedId
      })
    })
      .then(resp => resp.json())
      .then(json => alertPlayer(json));
  }

  function alertPlayer(match) {
    //debugger;
    console.log("challenging player", match);
  }

  //   function formBuilder(parent, options, submitButton) {
  //     const orgForm = document.createElement("form");
  //     parent.appendChild(orgForm);
  //     for (const option of options) {
  //       for (const key in option) {
  //         orgForm.appendChild(
  //           makeTextElement("label", option[key], [{ for: key }])
  //         );
  //         orgForm.appendChild(
  //           makeElement("input", [
  //             { type: "text" },
  //             { class: "form-control" },
  //             { id: key },
  //             { required: true }
  //           ])
  //         );
  //         //console.log(key, option[key]);
  //       }
  //     }
  //     orgForm.appendChild(submitButton);
  //   }

  function createOrg(form) {
    const name = document.getElementById("name").value;
    const icon_url = document.getElementById("icon_url").value;
    fetch("http://localhost:3000/organizations", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
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
      });
  }

  function addUserToOrg(currentOrg) {
    currentOrg.users.push({
      id: currentUser.id,
      name: currentUser.name,
      profile_icon: currentUser.profile_icon,
      email_address: currentUser.email_address,
      phone_number: currentUser.phone_number
    });
    fetch(`http://localhost:3000/organizations/${currentOrg.id}/add_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        users: currentUser
      })
    })
      .then(resp => resp.json())
      .then(json => {
        currentUser.organizations.push(json);
        indexOrganizationstionPage(document.getElementById("display-panel"));
      });
  }

  function getMatchStats(condition) {
    const relatedStats = currentUser.matches.filter(match => {
      return match.status === "Complete";
    });
    console.log(relatedStats);
  }

  function makeTextElement(attr, text, options) {
    const element = document.createElement(attr);
    element.innerText = text;
    for (const option of options) {
      for (const key in option) {
        element.setAttribute(key, option[key]);
      }
    }
    return element;
  }

  function makeElement(attr, options) {
    const element = document.createElement(attr);
    for (const option of options) {
      for (const key in option) {
        element.setAttribute(key, option[key]);
      }
    }
    return element;
  }
});
