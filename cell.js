class Cell {
    value;
    
    constructor(sudoku, x_num, y_num, possibilities) {
        this.parent = sudoku;
        this.x = x_num;
        this.y = y_num;
        this.possibilities = possibilities;
        this.collapsed = false;
    }


    setValue(num) {
        this.value = num;
        this.collapsed = true;
        //console.log("cell set")
        //this.parent.collapse(this);
    }


    removePoss(num) {
        let idx = this.possibilities.indexOf(num);
        if (idx < 0) return;
        this.possibilities.splice(idx, 1);
        if (this.possibilities.length == 1) {
            this.parent.queue.push(this);
        }
    }
    // calcPossible(table) {
        
    // }

}