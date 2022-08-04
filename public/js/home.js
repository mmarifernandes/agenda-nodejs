function calcTable(year) {
    let arr = new Array(12); //array dos meses do ano
    for (let coluna = 0; coluna < arr.length; coluna++) {
        arr[coluna] = new Array(6); //coluna semanas calendario
    }
    for (let coluna = 0; coluna < arr.length; coluna++) {
        // console.log(arr[coluna].length)
        for (let dia = 0; dia < arr[coluna].length; dia++) {
            arr[coluna][dia] = new Array(7); //dias dentro das semanas
            // console.log(arr)
        }
    }
    
    // console.log(arr.length)
    // console.log(arr[6].length)
    for (let month = 0; month < arr.length; month++) {
        let startDayInWeek = new Date(year, month, 0).getDay() + 1;
    //   console.log('dia semana '+startDayInWeek)

        let monthLong = new Date(year, month + 1,0).getDate() + 1;
// console.log(monthLong)



        let beforCount = 0;
        let counter = 1;
        let startCount = false;

// coluna = coluna
//dia = dia da coluna
        for (let coluna = 0; coluna < arr[month].length; coluna++) { 
            for (let dia = 0; dia < arr[month][coluna].length; dia++) {
                // console.log(arr[6][1].length)
                
                if (beforCount == startDayInWeek) {
                    startCount = true;
                } else {
                    beforCount++;
                }
                
                
                if (startCount == true) {
                    
                    arr[month][coluna][dia] = counter;
                    // console.log(arr[month][coluna][dia])
                    counter++;

                } else {
                    arr[month][coluna][dia] = "";
                }

                if (counter > monthLong) {
                    arr[month][coluna][dia] = "";

                }




            }

        }
    }
    // console.log(arr)
    return arr;
}

module.exports = calcTable;