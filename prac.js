var a = Date.now()

function checktime(obj1, obj2){
        //miliseconds since 1970.
        const current = [Date.now()];
        var user    =  [Date.now()]

        function lessthan(a,b){
            if(a<b){
                return a
            }
            else{
                return b
            }
        }

        function greaterthan(a,b){
            if(a>b){
                return a
            }
            else{
                return b
            }
        }

        //for date 
        for(let i=0; i<3; i++){

            if (current[i] <= user[i]){
                
                break
            }

        }











                
    //checking date first



}