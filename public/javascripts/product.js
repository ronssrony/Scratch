        const volume = document.querySelector('.volume') ;
        const minus = document.querySelector('.volume .minus')
        const plus = document.querySelector('.volume .plus') 
        const value = document.querySelector('.volume .value')
        plus.addEventListener('click',() => {
              var current = Number(value.innerHTML); 
              current = current + 1 ;
              value.innerHTML = current.toString().padStart(2,"0")  ;
        } )
        minus.addEventListener('click',() => {
            var current = Number(value.innerHTML); 
            if(current<=1){
                return
            }
            current = current - 1 ;
            value.innerHTML = current.toString().padStart(2,"0") ;
           
     } )
      
