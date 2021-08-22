//connect4 class
class Connect4 {
    constructor(selector){
        this.ROWS=6;
        this.COLS =7;
        this.player = 'blue'
        this.selector = selector;
        this.creatgrid();
        this.eventListener();
        this.gameover = false
        
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
        const that = this
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
            if (that.gameover) return // this is to end the game if a player wins
            console.log(('here',this));
            const col= $(this).data('col')
            const $lastEmptyCell = findLastEmptyCell(col)
            $lastEmptyCell.addClass('next-${that.player}')
            //console.log(col)
        })
        //remove the previouse cells that was hovered 
        $board.on('mouseleave','.col',function(){
            $('.col').removeClass('next-${that.player}')
        })
        // add an event click that allow the click on on cell and it will become colored with blue color
        $board.on('click','.col.empty', function(){
            if (that.gameover) return // this is to end the game if a player wins
            const col= $(this).data('col')
            //const row= $(this).data('row')
            const $lastEmptyCell = findLastEmptyCell(col)
            $lastEmptyCell.removeClass('empty next-${that.player}')
            $lastEmptyCell.addClass(that.player)
            $lastEmptyCell.data('player',that.player)
            
            //check for the winer 
            const winner = that.checkwinner($lastEmptyCell.data('row'), $lastEmptyCell.data('col'))
            if (winner){
                that.gameover = true // to end the game whenever there is a winner
                alert(`Game is Over, the Player ${that.player} 'Won`)
                return
            }
            // alternate between the two players
            that.player = (that.player === 'blue') ? 'red' : 'blue'
            console.log(that.player + ' it is your turn to play')

            $(this).trigger('mouseenter')
            
        })
        

            

    }

    checkwinner (row, col){
        const that = this
        function $getCell(i,j){
            return $(`.col[data-row='${i}'][data-col='${j}']`)
        }
        function checkDirection(direction){
            let total =0
            let i = row + direction.i
            let j = col + direction.j
            let $next = $getCell(i,j)
            while (i >= 0 && i< that.ROWS && j>= 0 && j< that.COLS && $next.data('player')=== that.player){
                total++
                i += direction.i
                j += direction.j
                $next = $getCell(i,j)

            }
            return total

        }
        function checkWin(direct1, direct2){
            const total = 1 + checkDirection(direct1) + checkDirection(direct2)
            if (total >= 4){
                return that.player
            } else {
                return null
            }

        }
        function checkVerticaly(){
            return checkWin({i: -1, j:0},{i: 1, j:0})
        }
        function checkHorizontal(){
            return checkWin({i:0,j:-1},{i:0,j:1})

        }
        function checkDiagDLUR(){
            return checkWin ({i:1, j:-1}, {i:1,j:1})
        }
        function checkDiagULDR(){
            return checkWin ({i:1, j:1}, {i:-1, j:-1})
        }
        return checkVerticaly() || checkHorizontal() || checkDiagDLUR() || checkDiagULDR()



    }
}