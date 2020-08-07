

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




    // receiving the Object from the flask server
    socket.on('sending back', obj=> {

        if (obj['channel'] === document.querySelector('#channelName').textContent ) {

            // using function for appending data into chatbox
            messageAppend(obj.Username,obj.data)

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







