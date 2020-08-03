document.addEventListener('DOMContentLoaded', ()=>{

    //setting the sessionStorage for username
        

    
  chList = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipisicing', 'elit', 'Fuga', 'tempora', 'aliquam', 'Molestias', 'suscipit', 'praesentium', 'neque', 'blanditiis', 'expedita', 'ratione', 'quia', 'minima']

  // static variable for all storage
  // const dict = (localStorage.length !== 0) ? JSON.parse(localStorage.getItem('users')) : {} ;
  const channelList = (localStorage.getItem('channelList') != null) ? JSON.parse(localStorage.getItem('channelList')) : chList ;
  // const userList = ((localStorage.length !== 0)) ? JSON.parse(localStorage.getItem('userList')) : [];


  // if (localStorage.getItem('channelList') == null) {
  //   localStorage.setItem('channelList', JSON.stringify(chList))
  //   localStorage.setItem('userList', JSON.stringify(userList))
  // }else{

  // }
    // localStorage.setItem('channelList', JSON.stringify(chList))
    localStorage.setItem('channelList', JSON.stringify(channelList))
    // localStorage.setItem('userList', JSON.stringify(userList))
});