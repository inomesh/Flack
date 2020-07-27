
var userstg = {}


document.addEventListener('DOMContentLoaded',()=>{

    document.querySelector('.form').onsubmit = (event)=>{
        
       var r =  valid();
        console.log(r)
       if(r === true){
          blank_input();
          console.log("done")
       } 
       
       if(passtest(pass)===true){
           return true
       }
       else{
        return false
       }
    };
    
});


function valid(){
    const first_name = document.querySelector("#fname").value
    const last_name = document.querySelector("#lname").value
    const user_name = document.querySelector("#create_username").value
    const pass = document.querySelector("#create_password").value
    const channel = document.querySelector("#channel_name").value
   console.log(channel)
   console.log(first_name +" "+ last_name)
   const channelName_reg = /^#[a-zA-Z0-9]{6,}$/i

   if (channelName_reg.test(channel) === true){
       console.log('starts')
       if(passtest(pass)===true){
            if(typeof(Storage) !== "undefined"){
                localStorage.setItem(user_name,channel)
                console.log("success")
            }
    }
       return true
   }
   else{
    console.log("fail")
    var ch = document.querySelector("#channel_name")
        ch.classList.add("is-inValid")  
       event.preventDefault();
       event.stopPropagation();
       return false

   }
};

//function for erasing form inputs after submitting the form. 
function blank_input(){
        document.querySelector("#fname").value                 = ''
        document.querySelector("#lname").value                 = ''
        document.querySelector("#create_username").value       = ''
        document.querySelector("#create_password").value       = ''
        document.querySelector("#channel_name").value          = ''
};


//function for Password checking by regex.
function passtest(self){
    let password_reg = /^[a-zA-Z0-9]{8,}$/i
    
    if(password_reg.test(self) === true){
        return true
       }
    else{
        return false
    }
};



// function signupStorage(){
//     //first_name
//     //last_name
//     obj = {
//         "channelList": "[]"
//     };

//     //Storing userName into main Userlist



//     localStorage.getItem('channelList')
//     localStorage.setItem()  //{"key": "value"}

    //for login { validate : { username : password } }
//  for Users_List {userList : [a,b,c,d]}
//                              [{},{},{},{},{},{}]
// name = firstName + lastName   {userName: name}
//
//
//  for channeList {channelList : [1,2,3,4]}
//                 list of all channels created               
//
//  for data //granth
};


// function fetchStorage(){
//     localStorage.getItem()
// }