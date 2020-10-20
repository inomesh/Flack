// misselenious

// function of trimming the data. means deleting the whiteSpaces form the start and end of the string
function emptyInput(data) {
  if (data.trim() == "") {
    return true;
  } else {
    return false;
  }
}

// function for creating div inside chatbox in real-time.

function messageAppend(username, data) {
  //creating div
  const div = document.createElement("div");
  // const label = document.createElement('div')
  const divUserName = document.createElement("div");
  const spanTime = document.createElement("span");
  const hr = document.createElement("hr");
  const divinner = document.createElement("div");

  //conditions for viewing messages in window ( right-left view )
  var view;
  if (username === sessionStorage.getItem("username")) {
    view = "user2 shadow  text-white rounded";
  } else {
    view = "user1 shadow bg-light rounded";
  }

  //properties
  div.className = view; //'user1 shadow bg-white rounded bg-primary'
  divUserName.className = "font-weight-bold mx-auto";
  spanTime.className = "float-right ml-3";
  divinner.id = "user";

  //Creating an object for current date for span tag
  const time = new Date();
  const timenow = time.toLocaleTimeString("en-US");

  //updating values
  // divUserName.textContent = '@' + sessionStorage.getItem('username')
  divUserName.textContent = "@" + username;
  spanTime.textContent = timenow;
  // divinner.textContent    = document.querySelector('#input').value
  divinner.textContent = data;

  //appending
  divUserName.append(spanTime);
  //main div
  div.append(divUserName);
  div.append(hr);
  div.append(divinner);

  document.querySelector(".body").append(div);
}

// Scroll effect in chat-Window
function scroll() {
  const s = document.querySelector(".body");

  if (s.scrollHeight > s.scrollTop + s.clientHeight) {
    s.scrollTo(0, s.scrollHeight);
  }
}

// Some extras

//function for clearing ChildNodes
function clearChilds(parent) {
  parent.innerHTML = "";
}

// function for date checking in chat-body
function date(miliseconds) {
  const d = new Date(miliseconds);
  const l = d.toLocaleDateString();
  const today = new Date();
  const k = today.toLocaleDateString();
  if (l === k) {
    return [true];
  } else {
    return [false, miliseconds];
  }
}

function dateDiv(result) {
  if (result[0] === false) {
    const div = document.createElement("div");
    div.classList.add("jumbotron");
    div.style =
      "display: flex;justify-content: center;align-items: center;inline-size: max-content;border-radius: 5%; padding: 8px;float: unset; background-color: #343a40c7;font-weight: 400;color: white;font-size: 16px;font-family: sans-serif;margin-left: 50%;margin-top: 50%;";

    //converting miliseconds into date-format
    const d = new Date(Number(result[1]));

    // appending into div
    div.textContent = d.toLocaleDateString();

    return div;
  }
  
}

// localStorage functions :-

// function for storing data into localStorage.
function userStorage(name, channel, data) {
  console.log("storage");
}

// function for updating new messages into localstorage channels
function updateNewMessage(obj, user, channelName, message) {
  // this function takes 2 parameters
  // channelName, message
  // and update the new message into localStorage

  // searching for the index of channel
  let search = searchChannelIndex(obj, user, channelName);
  // if (search === -1){
  //         // checking if channel actually exists or not, if not then return. else update the message.
  //         console.log('channel doesn;t exist, we re in updating messages')
  // }else{
  //         // updating the data by adding new message into it
  //         obj[user][search][channelName][Date.now()] = message
  //         console.log('message updated after creating channel');
  // }
  if (search !== -1) {
    // checking if channel actually exists or not, only if yes, then execute.
    // updating the data by adding new message into it
    obj[user][search][channelName][Date.now()] = message;
  }
}

// function for searching the index of a channels into localStorage
function searchChannelIndex(obj, user, channelName) {
  // searching for the index of channel
  let search = obj[user].findIndex(function (ele, index) {
    return ele[channelName];
  });

  return search;
}

// function for creating new channel object into localstorage.
function createChannel(obj, user, channelName) {
  // function for creating new channel for a particular user
  //into 'users' localStorage file.
  // takes two parameters d =  localstorage 'users', and channelName =
  // which you want to create.
  obj[user].push({});
  obj[user][obj[user].length - 1][channelName] = {};
}

// appending from localstorage in body after clicking the channel by sidebar

function localmessageAppend(username, localtime, data) {
  //creating div
  const div = document.createElement("div");
  // const label = document.createElement('div')
  const divUserName = document.createElement("div");
  const spanTime = document.createElement("span");
  const hr = document.createElement("hr");
  const divinner = document.createElement("div");

  //conditions for viewing messages in window ( right-left view )
  var view;
  if (username === sessionStorage.getItem("username")) {
    view = "user2 shadow  text-white rounded";
  } else {
    view = "user1 shadow bg-light rounded";
  }

  //properties
  div.className = view; //'user1 shadow bg-white rounded bg-primary'
  divUserName.className = "font-weight-bold mx-auto";
  spanTime.className = "float-right ml-3";
  divinner.id = "user";

  //Creating an object for date stored in localStorage for span tag
  const time = new Date(Number(localtime));
  const timenow = time.toLocaleTimeString("en-US");

  //updating values
  // divUserName.textContent = '@' + sessionStorage.getItem('username')
  divUserName.textContent = "@" + username;
  spanTime.textContent = timenow;
  // divinner.textContent    = document.querySelector('#input').value
  divinner.textContent = data;

  //appending
  divUserName.append(spanTime);
  //main div
  div.append(divUserName);
  div.append(hr);
  div.append(divinner);

  document.querySelector(".body").append(div);

  //scroll
  scroll();
}

//function for appending message into the chat body, from the localStorage not in real time.

function unsortedLocalToBody(dict, channelName) {
  var mili_arr = [];
  for (const i in dict) {
    //i == userName

    dict[i].forEach((ele) => {
      //ele = channel object

      var index = searchChannelIndex(dict, i, channelName); //searching channel index in array of objects.

      if (index !== -1) {
        for (const y in ele) {
          //loop for grabing channel name from the ele object.
          // y = #channelName

          for (const x in dict[i][index][y]) {
            // x = miliseconds
            // here we have, all the data stored in the channel....
            // then we re appening into screen.
            // but now i've to check the condition. for time .

            let m = {
              name: i, //assgning userName
              time: x, //assigning time in miliseconds
              data: dict[i][index][y][x], //assigining data
            };

            //pshing/appending object 'm' into an array.
            mili_arr.push(m);
          }
        }
      }
    });
  }

  //sorting the object based on time, and assigning it to another variable.
  var result = mili_arr.sort((a, b) => Number(a.time) - Number(b.time));

  return result;
}
