//connect4 class
class Connect4 {
    constructor(selector){
        this.ROWS=6;
        this.COLS =7;
        this.player = 'blue'
        this.selector = selector;
        this.creatgrid();
        this.eventListener();
        
    }

    creatgrid(){
        const $board = $(this.selector)
    
        //create 6 rows and inside each row 7 coloms 
        for (let row =0; row <this.ROWS; row++){
            const $row= $('<div>')
            .addClass('row')
            for (let col =0 ; col <this.COLS; col++){
                const $col = $('<div>')
                .addClass('col empty')
                //add index to the cellule
                .attr("data-col", col)
                .attr("data-row",row)
                $row.append($col)

            } 

            $board.append($row)
        }
        
    }
    eventListener(){
        // indicator for the place when the user hover over the cell
        const $board = $(this.selector)
        // set up a varibale that will take the value of this
        const thisAlt = this
        function findLastEmptyCell(col){
            const cell = $(`.col[data-col='${col}']`)
            //console.log(cell)
            for (let i = cell.length ; i>0; i--) {
                const $cell = $(cell[i])
                if($cell.hasClass('empty')){
                    return $cell;
                }
            }
            return null

        }
        $board.on('mouseenter','.col.empty', function(){
            console.log(('here',this));
            const col= $(this).data('col')
            const $lastEmptyCell = findLastEmptyCell(col)
            $lastEmptyCell.addClass('next-${thisAlt.player}')
            //console.log(col)
        })
        //remove the previouse cells that was hovered 
        $board.on('mouseleave','.col',function(){
            $('.col').removeClass('next-${thisAlt.player}')
        })
        // add an event click that allow the click on on cell and it will become colored with blue color
        $board.on('click','.col.empty', function(){
            const col= $(this).data('col')
            //const row= $(this).data('row')
            const $lastEmptyCell = findLastEmptyCell(col)
            $lastEmptyCell.removeClass('empty next-${thisAlt.player}')
            $lastEmptyCell.addClass(thisAlt.player)
            // alternate between the two players
            thisAlt.player = (thisAlt.player === 'blue') ? 'red' : 'blue'
            console.log(thisAlt.player + ' it is your turn to play')

            $(this).trigger('mouseenter')
            
        })
        

            

    }


}