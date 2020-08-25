

document.addEventListener('DOMContentLoaded', ()=>{


  // const  chList = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipisicing', 'elit']
  const chList = []
  // static variable for all storage
  const dict = (localStorage.getItem('users') !== null) ? JSON.parse(localStorage.getItem('users')) : {} ;
  const channelList = (localStorage.getItem('channelList') != null) ? JSON.parse(localStorage.getItem('channelList')) : chList ;
  // const userList = ((localStorage.length !== 0)) ? JSON.parse(localStorage.getItem('userList')) : [];


   
    localStorage.setItem('channelList', JSON.stringify(channelList))
    localStorage.setItem('users', JSON.stringify(dict))
});

















