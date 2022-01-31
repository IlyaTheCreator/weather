(()=>{"use strict";var __webpack_modules__={"./app/js/LsManager.js":
/*!*****************************!*\
  !*** ./app/js/LsManager.js ***!
  \*****************************/(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ LsManager)\n/* harmony export */ });\nclass LsManager {\r\n    appKey = "";\r\n\r\n    init(appKey, data = {}) {  \r\n        this.set(appKey, data);\r\n        this.appKey = appKey;\r\n    }\r\n\r\n    get(key) {\r\n        return JSON.parse(localStorage.getItem(key));\r\n    }\r\n\r\n    set(key, value) {\r\n        localStorage.setItem(key, JSON.stringify(value));\r\n    }\r\n\r\n    delete(key) {\r\n        localStorage.removeItem(key);\r\n    }\r\n\r\n    clear() {\r\n        this.set(this.appKey, "");\r\n    }\r\n\r\n    static list() {\r\n        const output = {};\r\n\r\n        for (let [key, value] of Object.entries(localStorage)) {\r\n            output[key] = value;\r\n        }\r\n\r\n        return output;\r\n    }\r\n\r\n    static reset() {\r\n        localStorage.clear();\r\n    }\r\n}\n\n//# sourceURL=webpack://gulpl/./app/js/LsManager.js?')},"./app/js/index.js":
/*!*************************!*\
  !*** ./app/js/index.js ***!
  \*************************/(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wrapperClassScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wrapperClassScript */ "./app/js/wrapperClassScript.js");\n/* harmony import */ var _LsManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LsManager */ "./app/js/LsManager.js");\n\r\n\r\n\r\nconst settingsOverlay = document.getElementById("settings-overlay");\r\nconst settingsModal = document.getElementById("settings-modal");\r\nconst settingsToggleBtn = document.getElementById("settings-toggle-btn");\r\nconst settingsCard = document.getElementById("settings-card");\r\nconst cityContainer = document.getElementById("city-container");\r\n\r\nconst APP_KEY = "weather";\r\nconst lsManager = new _LsManager__WEBPACK_IMPORTED_MODULE_1__["default"]();\r\n\r\nconst settingsData = {\r\n    minTemp: {\r\n        text: "Min. Temp.",\r\n        isActive: true\r\n    },\r\n    maxTemp: {\r\n        text: "Max. Temp.",\r\n        isActive: true\r\n    },\r\n    uvIndicator: {\r\n        text: "Uv Indicator",\r\n        isActive: true\r\n    },\r\n    feltTemp: {\r\n        text: "Felt Temp",\r\n        isActive: false\r\n    },\r\n    pressure: {\r\n        text: "Pressure",\r\n        isActive: false\r\n    },\r\n    airQuality: {\r\n        text: "Air quality",\r\n        isActive: false\r\n    },\r\n};\r\n\r\nconst openSettingsModal = () => {\r\n    document.querySelector("body").style.overflow = "hidden";\r\n    settingsOverlay.classList.add("modal-overlay--visible");\r\n    settingsModal.classList.add("modal--visible");\r\n};\r\n\r\nconst closeSettingsModal = () => {\r\n    document.querySelector("body").style.overflow = "visible";\r\n    settingsOverlay.classList.remove("modal-overlay--visible");\r\n    settingsModal.classList.remove("modal--visible");\r\n};\r\n\r\nconst renderCityData = () => {\r\n    for (let setting in lsManager.get(APP_KEY)) {\r\n        const cityItem = document.getElementById(`${setting}Widget`);\r\n        const settingsItemData = lsManager.get(APP_KEY)[setting];\r\n\r\n        if (!settingsItemData.isActive) {\r\n            cityItem.classList.add("widget--hidden");\r\n        } else {\r\n            cityItem.classList.remove("widget--hidden");\r\n        }\r\n    }\r\n};\r\n\r\nconst renderSettingsItems = () => {\r\n    settingsCard.innerHTML = "";\r\n\r\n    for (let setting in lsManager.get(APP_KEY)) {\r\n        const settingsItemData = lsManager.get(APP_KEY)[setting];\r\n        const toggleValue = settingsItemData.isActive ? "on" : "off";\r\n\r\n        const toggleSetting = () => {\r\n            const appData = lsManager.get(APP_KEY);\r\n\r\n            appData[setting].isActive = !appData[setting].isActive;\r\n            lsManager.set(APP_KEY, appData);\r\n\r\n            renderSettingsItems();\r\n            renderCityData();\r\n        };\r\n\r\n        const settingsItemInnerHTML = `\r\n            <p class="settings__item-text">${settingsItemData.text}</p>\r\n            <div \r\n                class="settings__toggle-icon settings__toggle-icon--${toggleValue}"\r\n            >\r\n                <i \r\n                    class="icon icon-toggle-${toggleValue}"\r\n                ></i>\r\n            </div>\r\n        `;\r\n\r\n        const settingsItem = document.createElement("div");\r\n\r\n        settingsItem.classList.add("settings__item");\r\n        settingsItem.innerHTML = settingsItemInnerHTML;\r\n        settingsItem.addEventListener("click", toggleSetting);\r\n\r\n        settingsCard.appendChild(settingsItem);\r\n    }\r\n};\r\n\r\nwindow.onload = () => {\r\n    (0,_wrapperClassScript__WEBPACK_IMPORTED_MODULE_0__["default"])();\r\n\r\n    if (!lsManager.get(APP_KEY)) {\r\n        lsManager.init(APP_KEY, settingsData);\r\n    }\r\n\r\n    settingsToggleBtn && settingsToggleBtn.addEventListener("click", openSettingsModal);\r\n    settingsOverlay && settingsOverlay.addEventListener("click", closeSettingsModal);\r\n    settingsCard && renderSettingsItems();\r\n    cityContainer && renderCityData();\r\n};\n\n//# sourceURL=webpack://gulpl/./app/js/index.js?')},"./app/js/wrapperClassScript.js":
/*!**************************************!*\
  !*** ./app/js/wrapperClassScript.js ***!
  \**************************************/(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/*\r\n  Array which allows us to loop through device types\r\n\r\n  overall structure: [ [], [], [] ] - array of arrays. Each inner array is a group of related operating systems (e.g. mac and ios)\r\n  structure of inner array: [ {}, {} ] - one or two objects. Each object represents a particular OS\r\n  structure of the OS object: { systemName, devices } - devices - list of device types available in that OS\r\n  structure of devices: [ {}, {} ] - each object is a separate device \r\n  structure of the device: { name, types } - types - array of strings which will help us to search through userAgent string \r\n*/\r\nconst devices = [\r\n  [\r\n    {\r\n      systemName: "android",\r\n      devices: [\r\n        {\r\n          name: "device",\r\n          types: [],\r\n        },\r\n      ],\r\n    },\r\n  ],\r\n  [\r\n    {\r\n      systemName: "windows",\r\n      devices: [\r\n        {\r\n          name: "mobile",\r\n          types: ["Mobile"],\r\n        },\r\n        {\r\n          name: "desktop",\r\n          types: ["win64", "wow64;", "wow64", "win64;"],\r\n        },\r\n      ],\r\n    },\r\n  ],\r\n  [\r\n    {\r\n      systemName: "ios",\r\n      devices: [\r\n        {\r\n          name: "device",\r\n          types: ["iphone;", "iphone"],\r\n        },\r\n      ],\r\n    },\r\n    {\r\n      systemName: "mac",\r\n      devices: [\r\n        {\r\n          name: "desktop",\r\n          types: ["macintosh", "macintosh;"],\r\n        },\r\n        {\r\n          name: "tablet",\r\n          types: ["ipad", "ipad;"],\r\n        },\r\n      ],\r\n    },\r\n  ],\r\n  [\r\n    {\r\n      systemName: "linux",\r\n      devices: [\r\n        {\r\n          name: "device",\r\n          types: [],\r\n        },\r\n      ]\r\n    }\r\n  ]\r\n];\r\n\r\n// Array which allows us to loop through different device sizes\r\nconst deviceDimensions = [\r\n  {\r\n    name: "phone-wide",\r\n    maxWidth: 599,\r\n  },\r\n  {\r\n    name: "tablet-portrait-wide",\r\n    maxWidth: 600,\r\n  },\r\n  {\r\n    name: "tablet-landscape-wide",\r\n    maxWidth: 900,\r\n  },\r\n  {\r\n    name: "desktop-wide",\r\n    maxWidth: 1200,\r\n  },\r\n  {\r\n    name: "big-desktop-wide",\r\n    maxWidth: 1920,\r\n  },\r\n  {\r\n    name: "large-desktop-wide",\r\n    maxWidth: 2600,\r\n  },\r\n];\r\n\r\n/* \r\n  Function which in the end assigns a class to outer wrapper of the application which tells \r\n  what device a user is in.\r\n*/\r\nconst detectDevice = () => {\r\n    const ua = navigator.userAgent.toLocaleLowerCase();\r\n    let typeClassName;\r\n  \r\n    devices.forEach(systemGroup => {\r\n      systemGroup.forEach(system => {\r\n        system.devices.forEach(device => {\r\n            let searchResult;\r\n            \r\n            // If there are no types for this particular device, do the search with systemName (windows, linux, android, etc)\r\n            if (device.types.length === 0) {\r\n              searchResult = ua.search(system.systemName);\r\n            } \r\n          \r\n            // Otherwise, search for each individual type is executed\r\n            device.types.forEach(type => {\r\n              searchResult = ua.search(type);\r\n            })\r\n          \r\n            // If there\'s a match in the search, assign this value to the class variable\r\n            if (searchResult !== -1) {\r\n              typeClassName = `screen-wrapper--${system.systemName}--${device.name}`;\r\n            }\r\n          \r\n            /* \r\n              Expections.\r\n              If you are on android, your userAgent will have both linux and android strings matches.\r\n              Here typeClassName is explicitly set to the value of android\r\n            */\r\n            if (ua.search("linux") !== -1 && ua.search("android") ) {\r\n              typeClassName = "screen-wrapper--android--device";\r\n            }\r\n        })\r\n      });\r\n    });\r\n  \r\n    document.querySelector(".screen-wrapper").classList.add(typeClassName);\r\n};\r\n\r\nconst detectDeviceWidth = () => {\r\n  for (const dimension of deviceDimensions) {\r\n    // if there\'s a match, assign the class and exit from the loop\r\n    if (screen.width <= dimension.maxWidth) {\r\n      document.querySelector(".screen-wrapper").classList.add(dimension.name);\r\n      break;\r\n    } \r\n  }\r\n}\r\n\r\nconst addWrapperClass = () => {\r\n  detectDevice();\r\n  detectDeviceWidth();\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addWrapperClass);\n\n//# sourceURL=webpack://gulpl/./app/js/wrapperClassScript.js?')}},__webpack_module_cache__={};function __webpack_require__(e){var r=__webpack_module_cache__[e];if(void 0!==r)return r.exports;var n=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](n,n.exports,__webpack_require__),n.exports}__webpack_require__.d=(e,r)=>{for(var n in r)__webpack_require__.o(r,n)&&!__webpack_require__.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},__webpack_require__.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__("./app/js/index.js"),__webpack_require__("./app/js/LsManager.js");var __webpack_exports__=__webpack_require__("./app/js/wrapperClassScript.js")})();