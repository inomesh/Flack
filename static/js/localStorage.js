

document.addEventListener('DOMContentLoaded', ()=>{

    //setting the sessionStorage for username
        

    
  // chList = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipisicing', 'elit', 'Fuga', 'tempora', 'aliquam', 'Molestias', 'suscipit', 'praesentium', 'neque', 'blanditiis', 'expedita', 'ratione', 'quia', 'minima']
  const  chList = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipisicing', 'elit']

  // static variable for all storage
  const dict = (localStorage.getItem('users') !== null) ? JSON.parse(localStorage.getItem('users')) : {} ;
  const channelList = (localStorage.getItem('channelList') != null) ? JSON.parse(localStorage.getItem('channelList')) : chList ;
  // const userList = ((localStorage.length !== 0)) ? JSON.parse(localStorage.getItem('userList')) : [];


  // if (localStorage.getItem('channelList') == null) {
  //   localStorage.setItem('channelList', JSON.stringify(chList))
  //   localStorage.setItem('userList', JSON.stringify(userList))
  // }else{

  // }
    // localStorage.setItem('channelList', JSON.stringify(chList))


   
    localStorage.setItem('channelList', JSON.stringify(channelList))
    localStorage.setItem('users', JSON.stringify(dict))
});




// storing the message data, into LocalStorage

var chatSubmit = document.getElementById('submit_button')
chatSubmit.addEventListener('click', event=>{

  var userData = JSON.parse(localStorage.getItem('users'))

  if (userData) {
    console.log(event)
  } else {
    console.log('else')
  } 

})


// function for storing data into localStorage.
function userStorage(name,channel,data){

    console.log('storage')

};

// function of trimming the data. means deleting the whiteSpaces form the start and end of the string
function emptyInput(data){
  
  if (data.trim() == '') {
      return true
  }else{
    return false
  }


};