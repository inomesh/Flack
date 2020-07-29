

document.addEventListener('DOMContentLoaded', ()=>{


    //socket starts from here
    var socket = io.connect(location.protocol + "//" + document.domain + ":" + location.port);

    socket.on('connect', ()=>{

        document.querySelector('#form').onsubmit = () => {
            const input = document.querySelector('#input').value;
            const sessionUsername = sessionStorage.getItem('username')
            const obj = { 
                data :input, 
                Username :sessionUsername
            };
            socket.emit('chat request', obj); 
            return false
        };
        
    });

    // Scroll effect
    const scroll = () => {

        const s = document.querySelector('.body')

        if( s.scrollHeight > s.scrollTop + s.clientHeight){
            s.scrollTo(0,s.scrollHeight)
          }
    }




    socket.on('sending back', obj=> {

        //creating div
        const div = document.createElement('div')
        // const label = document.createElement('div')
        const divUserName = document.createElement('div')
        const spanTime = document.createElement('span')
        const hr = document.createElement('hr')
        const divinner = document.createElement('div')

        //conditions for viewing messages in window ( right-left view )
        var view;
        if (obj.Username === sessionStorage.getItem('username')) {
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
        divUserName.innerHTML = '@' + obj.Username
        spanTime.innerHTML    = timenow
        // divinner.innerHTML    = document.querySelector('#input').value
        divinner.innerHTML    = obj.data

        

        //appending
        divUserName.append(spanTime)
            //main div
        div.append(divUserName)
        div.append(hr)
        div.append(divinner)

        document.querySelector('.body').append(div)


        //now clear the input field
        document.querySelector('#input').value = '';


        scroll();
        });


});



