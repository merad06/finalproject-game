
//main 
$(document).ready(function(){
    // draw a grid
    const connect4 = new Connect4 ('#connect4')
    $('#reset').click(function(){
        connect4.reset()
    })
})

