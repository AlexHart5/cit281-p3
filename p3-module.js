module.exports = {
    coinCount,
}
function validDenomination(coin) {
    let coins = [1, 5, 10, 25, 50, 100]
    return coins.indexOf(coin) !== -1  
}

function valueFromCoinObject(obj) {
    const {denom = 0} = obj
    const {count = 0} = obj
    return denom*count
}

const valueFromArray = (arr) => {
    let initialValue = 0
    let sum = arr.reduce(function (accumulator, curValue) {
        return accumulator + (curValue.denom*curValue.count)
    }, initialValue)
    return sum
}

function coinCount(...coinage) {
    return valueFromArray(coinage)
}

console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));