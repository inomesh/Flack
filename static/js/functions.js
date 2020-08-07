
// misselenious


// function of trimming the data. means deleting the whiteSpaces form the start and end of the string
function emptyInput(data){
  
    if (data.trim() == '') {
        return true
    }else{
      return false
    }
  
  
  };



// function for creating div inside chatbox in real-time.

function messageAppend(username, data){

    //creating div
    const div = document.createElement('div')
    // const label = document.createElement('div')
    const divUserName = document.createElement('div')
    const spanTime = document.createElement('span')
    const hr = document.createElement('hr')
    const divinner = document.createElement('div')

    //conditions for viewing messages in window ( right-left view )
    var view;
    if (username === sessionStorage.getItem('username')) {
            view = 'user2 shadow  text-white rounded';
    }else{
        view = 'user1 shadow bg-light rounded';
    }

    //properties
    div.className = view;                               //'user1 shadow bg-white rounded bg-primary'
    divUserName.className = 'font-weight-bold mx-auto'
    spanTime.className = 'float-right ml-3'
    divinner.id = 'user'


    //Creating an object for current date for span tag
    const time = new Date();
    const timenow = time.toLocaleTimeString('en-US')
        
        
    //updating values
    // divUserName.innerHTML = '@' + sessionStorage.getItem('username')
    divUserName.innerHTML = '@' + username
    spanTime.innerHTML    = timenow
    // divinner.innerHTML    = document.querySelector('#input').value
    divinner.innerHTML    = data

        

    //appending
    divUserName.append(spanTime)
        //main div
    div.append(divUserName)
    div.append(hr)
    div.append(divinner)

    document.querySelector('.body').append(div)

}



// Scroll effect in chat-Window
function scroll() {

    const s = document.querySelector('.body')

    if( s.scrollHeight > s.scrollTop + s.clientHeight){
        s.scrollTo(0,s.scrollHeight)
      }
};










// localStorage functions :-


// function for storing data into localStorage.
function userStorage(name,channel,data){

    console.log('storage')

};