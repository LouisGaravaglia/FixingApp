const minuteValues = [
    "o'clock",
    "oh one",
    "oh two",
    "oh three",
    "oh four",
    "oh five",
    "oh six",
    "oh seven",
    "oh eight",
    "oh nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
    "twenty",
    "twenty one",
    "twenty two",
    "twenty three",
    "twenty four",
    "twenty five",
    "twenty six",
    "twenty seven",
    "twenty eight",
    "twenty nine",
    "thirty",
    "thirty one",
    "thirty two",
    "thirty three",
    "thirty four",
    "thirty five",
    "thirty six",
    "thirty seven",
    "thirty eight",
    "thirty nine",
    "fourty",
    "fourty one",
    "fourty two",
    "fourty three",
    "fourty four",
    "fourty five",
    "fourty six",
    "fourty seven",
    "fourty eight",
    "fourty nine",
    "fifty",
    "fifty one",
    "fifty two",
    "fifty three",
    "fifty four",
    "fifty five",
    "fifty six",
    "fifty seven",
    "fifty eight",
    "fifty nine"
];

const hourValues = [
    "twelve ",
    "one ",
    "two ",
    "three ",
    "four ",
    "five ",
    "six ",
    "seven ",
    "eight ",
    "nine ",
    "ten ",
    "eleven ",
    "twelve ",
    "one ",
    "two ",
    "three ",
    "four ",
    "five ",
    "six ",
    "seven ",
    "eight ",
    "nine ",
    "ten ",
    "eleven ",
    "twelve "
];

function mapTimes(startNum, endNum, times) {
    const timeArray = [];
    for (let i = startNum; i <= endNum; i++) {
        timeArray.push([i, times[i-startNum]])
    }
    return timeArray;
}

function timeWord(time) {
    const hourValStrings = hourValues;
    const minuteValStrings = minuteValues;
    const minHourArray = time.split(":")
    const hours = +minHourArray[0];
    const minutes = +minHourArray[1];
    const hourMap = new Map(mapTimes(0, 23, hourValStrings));
    const minuteMap = new Map(mapTimes(0, 59, minuteValStrings));
    let hourString;
    let minuteString;
    if (hours + minutes === 0) {
        return "midnight";
    } else if (hours === 12 && minutes === 0) {
        return "noon";
    } else {
        hourString = hourMap.get(hours);
        minuteString = minuteMap.get(minutes);
    }
    if (hours < 12) {
        return hourString + minuteString + " am";
    } else {
        return hourString + minuteString + " pm";
    }
}

// timeWord("01:00");