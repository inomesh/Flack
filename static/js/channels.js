
function joinChannel(cardh5){

    // getting users already joined channels from the localStorage
    var chList = JSON.parse(localStorage.getItem('channelList'))

    // // getting the title of card user just requested to join. and slicing 1 because of # 
    var cardTitle = cardh5.textContent.slice(1)

    // condition

    var result = chList.find(element => element === cardTitle)
    // console.log(typeof(undefined))
   
    if (result == undefined) {
        
        let list = []       //creating new array
                
        chList.forEach(element => {         //passing all items of localStorage to new array
            list.push(element)
        });

        list.push(cardTitle)            //pushing new Channel into list
        localStorage.setItem('channelList',JSON.stringify(list))        //setting up the new users joined channels list


        // changing appearance effect of button

        // var btn = document.getElementById()
    }

};

