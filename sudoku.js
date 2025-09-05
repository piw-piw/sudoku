class Sudoku {
    constructor() {
        this.cells = (() => {
            let grid = [];
            let all_options = [];
            for (let i = 0; i < 81; i++){
                grid.push(new Cell(this, i%9, Math.floor(i/9), [1,2,3,4,5,6,7,8,9]));
            }
            return grid;
        })();
    }

    // NOTE unused
    solve() {
        while (!this.isValid()){
            
        }
        return this.cells;
    }

    step() {
        this.cells.forEach((e)=>{
            if (e.possibilities.length==1){
                const val = e.possibilities[0];
                //console.log("idx:",n,"x:",e.x,"y:",e.y,"val:",val)
                this.setCellValue(e.x, e.y, val);
            }
        })
        this.lookForTheOnlyOnes();

        this.showDebug();
    }


    getCell(x_num, y_num) {
        return this.cells[y_num*9+x_num]
    }

    setCellValue(x_num, y_num, num) {
        let cell = this.cells[y_num*9+x_num];
        cell.value = num;
        cell.collapsed = true;
        //console.log("cell set in sudoku");
        this.wave(cell);
        setCell(x_num, y_num, num);
    }

    wave(cell) {
        if ((cell.value==0 || cell.value==undefined)) {
            //console.log("cell is empty");
            return};
        
        //check vertical
        //console.log("cell x", cell.x)
        for (let x = 0; x < 9; x++) {
            if (x == cell.x) continue;
            let c = this.getCell(x, cell.y);
            //console.log(c.value);
            if (c.collapsed) continue;//!(c.value==0 || c.value==undefined)
            // breakpoint;
            c.removePoss(cell.value);
            //console.log(c);
        }
        //check horizontal
        for (let y = 0; y < 9; y++) {
            if (y == cell.y) continue;
            let c = this.getCell(cell.x, y);
            //console.log(c.value);
            if (c.collapsed) continue;

            c.removePoss(cell.value);
            //console.log(c);
        }
        
        //check local square
        // let center = this.getCell(Math.floor(cell.x / 3)*3 + 1, Math.floor(cell.y / 3)*3 + 1)
        let centerX = Math.floor(cell.x / 3)*3 + 1;
        let centerY = Math.floor(cell.y / 3)*3 + 1;
        for (let dx = -1; dx < 2; dx++) {
            for (let dy = -1; dy < 2; dy++) {
                if (centerY + dy == cell.y && centerX + dx == cell.x) continue;
                let c = this.getCell(centerX + dx, centerY + dy);
                if (c.collapsed) continue;
                c.removePoss(cell.value);
            }
        }

    }
    
    lookForTheOnlyOnes() {
        //look for the only place for num in a square
        for (let centerX = 1; centerX < 9; centerX+=3) {
            for (let centerY = 1; centerY < 9; centerY+=3) {
                let showedup_arr = [];
                for (let dx = -1; dx < 2; dx++) {
                    for (let dy = -1; dy < 2; dy++) {
                        let c = this.getCell(centerX + dx, centerY + dy);
                        if (c.collapsed) continue;
                        showedup_arr.push(...c.possibilities);
                    }
                }
                let ones_arr = showedup_arr.getShowingOnce();
                if (ones_arr.length == 0) continue;
                for (let dx = -1; dx < 2; dx++) {
                    for (let dy = -1; dy < 2; dy++) {
                        let c = this.getCell(centerX + dx, centerY + dy);
                        if (c.collapsed) continue;
                        c.possibilities.forEach((p) => {
                            if (ones_arr.includes(p)) {
                                // console.log(p)
                                this.setCellValue(c.x, c.y, p);
                            };
                        });
                    }
                }
            }
        }
        
        //look for the only place for num in a row
        for (let y = 0; y < 9; y++) {
            let showedup_arr = [];
            for (let x = 0; x < 9; x++) {
                let c = this.getCell(x, y);
                if (c.collapsed) continue;
                showedup_arr.push(...c.possibilities);
            }
            let ones_arr = showedup_arr.getShowingOnce();
            if (ones_arr.length == 0) continue;
            for (let x = 0; x < 9; x++) {
                let c = this.getCell(x, y);
                if (c.collapsed) continue;
                c.possibilities.forEach((p) => {
                    if (ones_arr.includes(p)) {
                        // console.log(p)
                        this.setCellValue(c.x, c.y, p);
                    };
                });
            }
        }
        //look for the only place for num in a column
        for (let x = 0; x < 9; x++) {
            let showedup_arr = [];
            for (let y = 0; y < 9; y++) {
                let c = this.getCell(x, y);
                if (c.collapsed) continue;
                showedup_arr.push(...c.possibilities);
            }
            let ones_arr = showedup_arr.getShowingOnce();
            if (ones_arr.length == 0) continue;
            for (let y = 0; y < 9; y++) {
                let c = this.getCell(x, y);
                if (c.collapsed) continue;
                c.possibilities.forEach((p) => {
                    if (ones_arr.includes(p)) {
                        // console.log(p)
                        this.setCellValue(c.x, c.y, p);
                    };
                });
            }
        }
    }


    // NOTE unused
    compareFn(a, b) {
        if (a.posiibilities.length < b.possibilities.length) {
            return -1;
        } else if (a.posiibilities.length > b.possibilities.length) {
            return 1;
        }
        // a must be equal to b
        return 0;
    }
    
    // NOTE unused
    findCandidates() {
        suCopy = this.cells.slice()
        suCopy = suCopy.filter((e) => e.collapsed == false)
        
    }
    
    // NOTE unused
    collapse() {
        c = this.findCandidates()
    }
    
    // NOTE unused
    isValid() {
        // for (let i = 0; i < 9; i++) {
        //     checkLocal(i)
        // }
        
        // for (let i = 0; i < 9; i++) {
        //     checkVertical(i)
        // }

        // for (let i = 0; i < 9; i++) {
        //     checkHorizontal(i)
        // }
        
    }

    showDebug() {
        this.cells.forEach((e)=>{
            if (!e.collapsed) {
                //const val = e.possibilities[0];
                //console.log("idx:",n,"x:",e.x,"y:",e.y,"val:",val)
                //su.setCellValue(e.x, e.y, val);
                setCell(e.x, e.y, e.possibilities.join(", "), true);
            }
        })
    }


    export() {
        let str = "";
        this.cells.forEach((c)=>{
            str += c.collapsed ? c.value : ".";
        });
        return str;
    }


    import(str) {
        // not ready
        return;
        Array.from(str).forEach((c)=>{
            
        });
    }
}
