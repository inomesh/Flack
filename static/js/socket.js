

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

        // storing data into localStorage
        var dict = JSON.parse(localStorage.getItem('users'))
        
        // checking if user actually exist into localStorage or not
        var userCheck;
        for (const i in dict) {
            if (i === obj.Username) {
                userCheck = true
                break
            }
        }

        // now main
        if (userCheck === true) {   //this will execute only if user exist in localstorage

            // grabing a index of channel
            let i = searchChannelIndex(dict,obj.Username,obj.channel)
            if (i === -1) {
                createChannel(dict,obj.Username,obj.channel)
                console.log('channel created and updated');
            }

            updateNewMessage(dict,obj.Username,obj.channel,obj.data)


        } else {    //this will run if user doesn't exist in localStorage
            
        // steps
        // 1. create user 
        // 2. create channel
        // 3. append data

        // 1.
        dict[obj.Username] = []

        // 2. 
        createChannel(dict,obj.Username,obj.channel)

        // 3.
        updateNewMessage(dict,obj.Username,obj.channel,obj.data)

        }



        //condition for appearance
        if (obj['channel'] === document.querySelector('#channelName').textContent ) {


            // using function for appending data into chatbox
            messageAppend(obj.Username,obj.data)

            //now clear the input field
            document.querySelector('#input').value = '';


            scroll();                   
        
        } else {    //this will execute if, both user's ain't in the same channel window, but logged in.
        
        var sidebarListItem = document.querySelector('#ulist').children     //this gives the object containing all the list of sidebar.


        for (const key in sidebarListItem) {
            if (sidebarListItem[key].textContent === obj['channel'] ) {

                var count;
                if (sidebarListItem[key].childNodes[0].childNodes[1]) {
                    count = Number(sidebarListItem[key].childNodes[0].childNodes[1].textContent)
                    sidebarListItem[key].childNodes[0].childNodes[1].remove()
                    console.log('inside if', sidebarListItem[key].childNodes[0].childNodes[1].textContent);
                }else{
                    count = 0
                    console.log('inside else',count);
                }
                count++;
                let span = document.createElement('span')
                span.setAttribute('class','badge badge-primary badge-pill')
                span.style = "margin-left: 75%;"
                span.textContent = count
                sidebarListItem[key].childNodes[0].append(span)


            }
        }
        



        } 

        // updating localStorage
        localStorage.setItem('users',JSON.stringify(dict))

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







