document.addEventListener('DOMContentLoaded', ()=>{

    var socket = io.connect(location.protocol + "//" + document.domain + ":" + location.port);

    socket.on('connect', ()=>{

        document.querySelector('#form').onsubmit = () => {
          const data = document.querySelector('#input').value;
           socket.emit('chat request', {'data':data}); 
           return false
        };
        
    });


    const scroll = () => {

       // const card_height = document.querySelector('.card').offsetHeight
        const card_height = document.body.offsetHeight
        const downscroll = window.innerHeight + (window.scrollY/2)

        if(card_height - 130 <= downscroll){
                window.scrollY += 130
                window.scrollTo(0,window.scrollY)
           }
        
    }




    socket.on('sending back', data => {
        //creaing row {bootstrap way}
        const row = document.createElement('div')
        row.className = 'row'
        row.id = 'listrow'

        //card main     col-lg-6 col-md-6
        const cardmain = document.createElement('div')
        cardmain.className = 'card col-12  d-inline-flex p-2'
        cardmain.id = 'card-main'

        //card header
        const headerdiv = document.createElement('div')
        headerdiv.className = 'card-header'
        headerdiv.id = 'card-header'
        headerdiv.innerHTML = 'MESSAGE...'
        //headerdiv.style.backgroundColor = '#5fefa5'
        

        //card body
        const bodydiv = document.createElement('div')
        bodydiv.className = 'card-body'
        bodydiv.id = 'card-body'
        bodydiv.style.backgroundColor = '#333f3c'
        bodydiv.style.color = 'white'

        //card paragragh inside body
        const cardpara = document.createElement('p')
        cardpara.className = 'card-text'
        cardpara.id = 'card-para'
        cardpara.innerHTML = data.data
        

        //-----  appending all the values here  ------

        //row
        row.append(cardmain)

        //card-main
        cardmain.append(headerdiv)
        cardmain.append(bodydiv)

        //card-body
        bodydiv.append(cardpara)


        //now append the cards into the unordered-list
        document.querySelector('#list').append(row)     //row
        document.querySelector("#listrow").append(cardmain)  //card-main

        //now clear the input field
        document.querySelector('#input').value = '';


        scroll();
        });




});