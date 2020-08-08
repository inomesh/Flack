

document.addEventListener('DOMContentLoaded', ()=>{

    //setting the sessionStorage for username
    const dict = { 
      //first element
       //user       //channel_name 
      "Batman": [
                  { 
                  "Channel_First": {
                          "Date_time - 1":"Messages - 1",
                          "Date_time - 02":"Messages - 02"
  
                  }  
                  },
  
                  { 
                      "Channel_Second": {
                              "Date_time - 2":"Messages - 2"
                      }  
                  },
  
                  { 
                      "Channel_third": {
                              "Date_time - 3":"Messages - 3"
                      }  
                  }, 
              
                  ],
  
      //second element in object
      "Deadpool": [
                      { 
                      "Channel_First": {
                              "Date_time - 1":"Messages - 1"
                      }  
                      },
      
                      { 
                          "Channel_Second": {
                                  "Date_time - 2":"Messages - 2"
                          }  
                      },
      
                      { 
                          "Channel_third": {
                                  "Date_time - 3":"Messages - 3"
                          }  
                      }, 
                  
                      ],
      
  
      //third element in object
      "Wonder_Women": [
          { 
          "Channel_First": {
                  "Date_time - 1":"Messages - 1"
          }  
          },
  
          { 
              "Channel_Second": {
                      "Date_time - 2":"Messages - 2"
              }  
          },
  
          { 
              "Channel_third": {
                      "Date_time - 3":"Messages - 3"
              }  
          }, 
      
          ]
  
  
  
      
  };
    
  // chList = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipisicing', 'elit', 'Fuga', 'tempora', 'aliquam', 'Molestias', 'suscipit', 'praesentium', 'neque', 'blanditiis', 'expedita', 'ratione', 'quia', 'minima']
  const  chList = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipisicing', 'elit']

  // static variable for all storage
  // const dict = (localStorage.getItem('users') !== null) ? JSON.parse(localStorage.getItem('users')) : {} ;
  const channelList = (localStorage.getItem('channelList') != null) ? JSON.parse(localStorage.getItem('channelList')) : chList ;
  // const userList = ((localStorage.length !== 0)) ? JSON.parse(localStorage.getItem('userList')) : [];


   
    localStorage.setItem('channelList', JSON.stringify(channelList))
//     localStorage.setItem('users', JSON.stringify(dict))
});

















