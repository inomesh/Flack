

document.addEventListener('DOMContentLoaded', ()=>{


    //socket starts from here
    var socket = io.connect(location.protocol + "//" + document.domain + ":" + location.port);

    // sending the object to flask server
    socket.on('connect', ()=>{

        // Form submitting
        document.querySelector('#form').onsubmit = () => {

            const input = document.querySelector('#input').value;
            
            // checking for empty message if yes then do nothing otherwise, send the message to the server
            if (emptyInput(input) === false) {

                const sessionUsername = sessionStorage.getItem('username');
                const channelName   =   document.querySelector('#channelName').textContent;
                const obj = { 
                    data :input, 
                    Username :sessionUsername,
                    channel : channelName
                };
                socket.emit('chat request', obj); 
                
            }

            return false
        
        };


    // emiting for newly created channel to update into the channels.csv file.

        document.getElementById('CreateNewChannel').onsubmit = ()=>{

            const channelName = document.getElementById('channel_name').value
            const description = document.getElementById('channel_discription').value

            const obj = {
                channelName:channelName,
                description:description
            }
            socket.emit('new channel', obj); 
            return false

        }



    });



    // Scroll effect
    const scroll = () => {

        const s = document.querySelector('.body')

        if( s.scrollHeight > s.scrollTop + s.clientHeight){
            s.scrollTo(0,s.scrollHeight)
          }
    }



    // receiving the Object from the flask server
    socket.on('sending back', obj=> {

        if (obj['channel'] === document.querySelector('#channelName').textContent ) {

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
        
        } else {
            console.table(obj)
        } 

        });



    // receiving result array containing [channelName, result(true/false)] new channel name after appending it into channel.csv file.
    // now, append that channel into the localStorage channelList and users

    socket.on('newChannel result',newChannelName => {
            // now newChannelName contains [channelName, result(true/false, boolean value) ] 
        if (newChannelName[1] === true) {
            let list = JSON.parse(localStorage.getItem('channelList'))
            list.push(newChannelName[0])
            localStorage.setItem('channelList', JSON.stringify(list))

        //wiping the inputs
            document.querySelector('#channel_name').value = ''

        // Updating Sidebar
            updateSidebarList();

        } else {
            // displaying error message because requested channel already exists.
            document.querySelector('.channelInvalidInput').textContent = 'Channel already exists, please try another name for your channel.'
       
        }
            
        //wiping the inputs
        document.querySelector('#channel_name').value = ' '
        document.querySelector('#channel_discription').value = ' '

    });


});




function messageAppend(obj){

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

}


