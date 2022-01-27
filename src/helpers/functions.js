import {v4 as uuidv4} from 'uuid';
import {useContext} from "react";
import {UserDataContext} from "../context/UserDataContext";

export function getUniqueId() {
    return uuidv4();
}

export function parseMyDate(myDate) {
    let year = myDate.substr(0,4);
    let month = myDate.substr(5,2);
    let day = myDate.substr(8,2);
    return day + '/' + month + '/' + year;
}

export function containsSpecialChar(myString) {
    const specialChar = "@#$%&*!()+=-_"
    let contains = false;
    for (let x in specialChar) {
        if(myString.includes(specialChar[x])) {
            contains = true;
        }
    }
    return contains;
}

export function containsLowerCaseCharacter(myString) {
    return myString.toUpperCase() !== myString;
}

export function containsUpperCaseCharacter(myString) {
    return myString.toLowerCase() !== myString;
}

export function isValidEmail(email) {
    let thisEmail = "" + email;
    return thisEmail.includes('@') && thisEmail.includes('.')
}

export function isValidUsername(username) {
    // console.log('in function', username)
    let valid = false;
    if (username.length > 2) {
        // console.log('1/3 ] OK groter dan 2 tekens');
        if (username.length < 16) {
            // console.log('2/3 ] OK kleiner dan 16');
            if (!containsSpecialChar(username)) {
                // console.log('3/3 ] OK bevat geen special char')
                return true;
            }
            return false;
        }
        return false;
    }
    return false;
}

export function isValidPassword(password) {
    if (password.length > 7) {
        // console.log('1/4 ] OK password length')
        if (containsSpecialChar(password)) {
            // console.log('2/4 ] OK special char')
            if (containsLowerCaseCharacter(password)) {
                // console.log('3/4 ] OK lowercase')
                if (containsUpperCaseCharacter(password)) {
                    // console.log('4/4 ] OK uppercase')
                    return true;
                }
                return false;
            }
            return false;
        }
        return false;
    }
    return false;
}

export function getToday() {
    return convertToMyDateFormat(new Date());
}
export function getTomorrow() {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    return convertToMyDateFormat(date);
}
export function getNextDay(num) {
    let date = new Date();
    date.setDate(date.getDate() + num);
    return convertToMyDateFormat(date);
}
export function convertToMyDateFormat(d) {
    let year = d.getFullYear();
    let month = ('0' + (d.getMonth() +1)).slice(-2);
    let day = d.getDate();
    return "" + year + '-' + month + '-' + day;
}
export function getTodayHumanFormat() {
    return "" + getDay(getToday()) + " " + getMonthString(new Date().getMonth() + 1) + " " + getYear(getToday());
}
export function getDateHumanFormat(date) {
    return "" + getDay(date) + " // " + getMonth(date) + " // " + getYear(date);
}
export function getDay(date){
    // date is in my date conversion
    return date.substr(8);
}
export function getMonth(date) {
    // date is in my date conversion
    return date.substr(5, 2);
}
export function getYear(date) {
    // date is in my date conversion
    return date.substr(0, 4);
}
export function getMonthString(number) {
    if (number === 1) {
        return "Januari"
    } else if (number === 2) {
        return "Februari"
    } else if (number === 3) {
        return "Maart"
    } else if (number === 4) {
        return "April"
    } else if (number === 5) {
        return "Mei"
    } else if (number === 6) {
        return "Juni"
    } else if (number === 7) {
        return "Juli"
    } else if (number === 8) {
        return "Augustus"
    } else if (number === 9) {
        return "September"
    } else if (number === 10) {
        return "Oktober"
    } else if (number === 11) {
        return "November"
    } else {
        return "December"
    }
}

export function convertProvince(province) {
    let converted;
    if (province.includes("NOORD")) {
        // province contains NOORD
        converted = province[0] + province.substring(1, 5).toLowerCase() + "-" + province[5] + province.substring(6).toLowerCase()
    } else if (province.includes("ZUID")) {
        // province contains ZUID
        converted = province[0] + province.substring(1, 4).toLowerCase() + "-" + province[4] + province.substring(5).toLowerCase()
    } else {
        // other provinces
        converted = province[0] + province.substring(1).toLowerCase();
    }
    return converted;
}

export function calcProgress(current, limit) {
    return Math.round(((current / limit ) * 100))
}

export function refreshPage() {
    window.location.reload(false);
}

export function fetchXItemsFromList(x ,list, condition) {
    let theList = [...list];
    let newList = [];
    for ( let i = 0; i < theList.size; i++ ) {
        if (newList.length < x) {
            console.log('lengte bereikt', newList);
            break;
        } else {
            if (condition === 'today') {
                newList[i] = theList[i];
            } else {
                newList[i] = theList[i];
            }
        }
    }
    return newList;
}

export function sortArrayById(list) {
    return list.sort((a, b) => a.id - b.id)
}