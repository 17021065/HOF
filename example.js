const reportMissingOf = (thing) => {
    $('#error').append(`${thing} is missing <br>`);
    return true;
}

const reportInvalidOf = (thing) => {
    $('#error').append(`${thing} is invalid <br>`);
    return true;
}

const checkStock = (stockID) => { 
    const isStockIDMissing = stockID == '' ? reportMissingOf('Stock ID') : false;
    
    return (warehouseID) => { 
        const isWarehouseIDMissing = warehouseID == '' ? reportMissingOf('Warehouse ID') : false;

        return(stockDeduct)=> { 
            const isStockDeductMissing = (stockDeduct == '' && reportMissingOf("Deduction's amount")) 
                                        || (stockDeduct < 0 && reportInvalidOf("Deduction's amount")) 
                                        || false;

            return !isStockIDMissing && !isWarehouseIDMissing && !isStockDeductMissing ? 
            (() => {
                $('#error').text('no error');
                return stockID + ' from ' + warehouseID + ' is reduced by ' + stockDeduct;
            })
            :
            'error occured ! try again';         
        }
    }
}

$('#deductBtn').click(function (e) { 
    e.preventDefault();
    const stockID = $('#stock').val();
    const warehouseID = $('#warehouse').val();
    const amount = $('#amount').val();
    $('#error').text('');
    $('#result').text(checkStock(stockID)(warehouseID)(amount));
});

const numFunc = () => {
	let num = 0;
    let arrayForHack = [];
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }
    const generator = () => {
        for (let i = 0; i < 100; i++) {
            arrayForHack.push(getRandomInt(1000));
        }
    }
    const printTo = (item) => $(`#${item}`).text(num);
    const hack = (item) => {
        generator()
        arrayForHack.forEach(element => num+=element);
        printTo(item);
    }
    const hackWithCondition = (item) => {
        return num < 5000000 ? hack(item) : console.log("can't hack anymore");
    }
	const plus = (item) => {
        ++num;
        printTo(item);
    }
    const reset = (item) => {
        arrayForHack = [];
        num=0;
        printTo(item);
    }
	return {plus, reset, hackWithCondition};
}

const increment = numFunc();

$('#incre').click(function (e) { 
    e.preventDefault();
    increment.plus('count');
});

$('#reset').click(function (e) { 
    e.preventDefault();
    increment.reset('count');
});

$('#hack').click(function (e) { 
    e.preventDefault();
    try {
        increment.hackWithCondition('count');
    } catch (error) {
        console.log(error);
    }
});