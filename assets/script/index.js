'use strict';
//UTILITY CLASSES
function getElement(selector, scope = document) {
    return scope.getElementById(selector);
}

function select(selector, scope = document) {
    return scope.querySelector(selector);
}

function selectAll(selector, scope = document) {
    return[...scope.querySelectorAll(selector)];
}

function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}
//END OF UTILITY CLASSES

const pageW = select('.width');
const pageH = select('.height');
const orientaion = select('.orien');
const level = select('.level');
const batteryStatus = select('.status');
const network = select('.network-status');
const networkDiv = select('.network');
const operatingSystem = select('.os');
const language = select('.language');
const browser = select('.browser');

//Start of SYSTEM
function getOperatingSystem() {
    let plat = navigator.platform.toLowerCase();
    let os = navigator.platform;
    const systems = ['win', 'mac', 'linux', 'android', 'iphone'];
    const name = ['Windows', 'Mac', 'Linux', 'Android', 'IOS'];
    for(let i = 0; i < systems.length; i++) {
        if(plat.includes(systems[i])) {
            os = name[i];
            break;
        }
    }
    return os;
}
function getLanguage() {
    let lang = navigator.language;
    return lang;
}
function getBrowser() {
    let userAgent = navigator.userAgent;
    console.log(userAgent);
    let browserName = 'Unidentified';
    const browsers = ['Edge', 'OPR', 'Chrome', 'Firefox', 'Safari'];
    if(userAgent.includes(browsers[0]) || userAgent.includes('Edg')) {
        browserName = 'Edge';
    }
    else if(userAgent.includes(browsers[1])) {
        browserName = 'Opera';
    }
    else if(userAgent.includes(browsers[2])) {
        browserName = 'Chrome';
    }
    else if(userAgent.includes(browsers[3])) {
        browserName = 'Firefox';
    }
    else if(userAgent.includes(browsers[4])) {
        browserName = 'Safari';
    }
    return browserName;
}
const setInnerText = () => {
    operatingSystem.innerText = getOperatingSystem();
    language.innerText = getLanguage();
    browser.innerText = getBrowser();
};
listen('load', window, setInnerText);
//End of SYSTEM

//Start of WINDOW
function getOrientaion() {
    if(window.innerWidth > window.innerHeight) {
        return 'Landscape';
    }
    return 'Portrait';
}
function readWindow() {
    pageW.innerText = `${window.innerWidth}px`;
    pageH.innerText = `${window.innerHeight}px`;
    orientaion.innerText = `${getOrientaion()}`;
}
//window.addEventListener('load', readWindow);
listen('load', window, readWindow)
//window.addEventListener('resize', readWindow);
listen('resize', window, readWindow)
//End of WINDOW

//Start of BATTERY
function updateBatStatus(lvl, charging) {
    level.innerText = `${lvl * 100}%`;
    if(charging)
        batteryStatus.innerText = `Charging`
    else 
        batteryStatus.innerText = `Idle`
}
if ('getBattery' in navigator) {
    navigator.getBattery().then((battery) => {
        updateBatStatus(battery.level, battery.charging);
        battery.addEventListener('levelchange', () => {
            updateBatStatus(battery.level, battery.charging);
        });
        battery.addEventListener('chargingchange', () => {
            updateBatStatus(battery.level, battery.charging);
        });
    });
}
//End of BATTERY

//Start of Network
function isOnline() {
    if(navigator.onLine)
        return 'online';
    return 'offline';
};
window.addEventListener('load', () => {
    network.innerText = `${isOnline().toUpperCase()}`;
    if(!navigator.onLine) {
        networkDiv.classList.add('offline');
    }
    else {
        networkDiv.classList.add('online');
    }
});
window.addEventListener('online', () => {
    network.innerText = `${isOnline().toUpperCase()}`;
    networkDiv.classList.add('online');
    networkDiv.classList.remove('offline');
});
window.addEventListener('offline', () => {
    network.innerText = `${isOnline().toUpperCase()}`;
    networkDiv.classList.add('offline');
    networkDiv.classList.remove('online');
});
//End of Network