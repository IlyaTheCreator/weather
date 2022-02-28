import LsManager from "./LsManager";
import MOCK_CITIES from "../mocks/cities";

/**
 * @namespace entities
 */

/**
 * Class representing entire application. Central manager of the app.
 * @memberof entities
 */
export default class App {
  /**
   * Property for holding and managing individual widgets on single city page.
   */
  widgetsData = {
    maxTemp: {
      id: 0,
      name: "max temp",
      value: 67,
      text: "min",
    },
    minTemp: {
      id: 1,
      name: "min temp",
      value: 40,
      text: "max",
    },
    feltTemp: {
      id: 2,
      name: "felt temp",
      value: 50,
    },
    uvIndicator: {
      id: 3,
      name: "uv indicator",
      value: 1,
      additional: "some optional text...",
      text: "low",
    },
    pressure: {
      id: 4,
      name: "pressure",
      value: 1040,
      text: "hPa",
    },
    airQuality: {
      id: 5,
      name: "air quality",
      value: "good air ;)",
    },
  };

  /**
   * Property for holding and managing city settings on single city page.
   * (notice how keys are matched with the widgetsData object above)
   */
  settingsData = {
    minTemp: {
      text: "Min. Temp.",
      isActive: true,
    },
    maxTemp: {
      text: "Max. Temp.",
      isActive: true,
    },
    uvIndicator: {
      text: "Uv Indicator",
      isActive: true,
    },
    feltTemp: {
      text: "Felt Temp",
      isActive: false,
    },
    pressure: {
      text: "Pressure",
      isActive: false,
    },
    airQuality: {
      text: "Air quality",
      isActive: false,
    },
  };

  /**
   * @param {Object} dashBoard  DashBoard instance
   * @param {Object} settings Settings instance
   * @param {Object} modalService modalService instance
   * @param {HTMLBodyElement} rootElement DOM element to attach the app to
   */
  constructor(dashBoard, settings, modalService, rootElement) {
    /**
     * @property {Object} dashBoard  DashBoard instance
     */
    this.dashBoard = dashBoard;
    /**
     * @property {Object} settings Settings instance
     */
    this.settings = settings;
    /**
     * @property {Object} settings ModalService instance
     */
     this.modalService = modalService;
    /**
     * @property {HTMLBodyElement} rootElement DOM element to attach the app to
     */
    this.rootElement = rootElement;
    /**
     * @property {Object} lsManager instance of localstorage manager
     */
    this.lsManager = new LsManager();
    /**
     * @property {Object} citiesData weather information
     */
    this.citiesData = this.getCities();
    /**
     * "dashboard" || something else
     * @property {string} displayMode defines what "page" to display (kind of SPA)
     */
    this.displayMode = "dashboard";
    /**
     * @property {boolean} showCityInfo defines whether to display single city "page" or not
     */
    this.showCityInfo = true;
    /**
     * @property {string} settingsLcKey localstorage key for keeping settings data
     */
    this.settingsLcKey = "";
    /**
     * @property {string} citiesListLcKey localstorage key for keeping cities' weather list data
     */
    this.citiesListLcKey = "";
    /**
     * @property {string} cityLcKey localstorage key for keeping individual city's data
     */
    this.cityLcKey = "";

    this.setupLocalStorage();
  }

  /**
   * @property {Function} setupLocalStorage initial localstorage setup
   */
  setupLocalStorage = () => {
    this.settingsLcKey = "weather";
    this.citiesListLcKey = "cities";
    this.cityLcKey = "city";

    const lcSettings = this.getSettingsState();
    const lcCitiesList = this.getCities();
    const lcCity = this.getCurrentCity();
    
    // Inital launching checks
    if (lcSettings === null) {
      this.lsManager.init(this.settingsLcKey, this.settingsData);
    }

    if (lcCitiesList === null || !lcCitiesList.length) {
      this.lsManager.init(this.citiesListLcKey, MOCK_CITIES);
    }

    if (lcCity === null || !Object.keys(lcCity).length) {
      this.lsManager.init(this.cityLcKey, {});
    }
  }

  /**
   * @property {Function} mountModal function for creating and mounting a modal 
   * For props description see Modal's constructor
   */
  mountModal = (modalType, modalData, modalContentCreateMethod, classes, id) => {
    this.clearRootElement();

    this.rootElement.appendChild(
      this.modalService.createModal(modalType, modalData, modalContentCreateMethod, classes, id)
    )
  }

  /**
   * @property {Function} onCityWidgetClick Individual city widget's onClick handler
   * @param {Object} city current city where the click occured
   */
  onCityWidgetClick = (city) => {
    this.setCurrentCity(city);
    this.showCityInfo = true;
    this.create();
  }

  /**
   * @property {Function} onCityWidgetClick Individual setting trigger onClick handler
   * @param {Object} e event object
   */
  toggleWidgetDisplay = (e) => {
    // check if there's an id
    if (!e.target.id.trim()) {
      this.create();
    }

    // check if there's a '-' sign in the id
    if (!e.target.id.search("-")) {
      this.create();
    }

    // check if there's a class
    if (!e.target.classList[1]) {
      this.create();
    }

    // check if there's a '-' sign in the class
    if (!e.target.classList[1].split("-")) {
      this.create();
    }

    // check if there's a division of the class
    if (!e.target.classList[1].split("-")[2]) {
      this.create();
    }

    const key = e.target.id.split("-")[2];
    const newSettings = this.lsManager.get(this.settingsLcKey);
    const active = e.target.classList[1].split("-")[2];
    const isActive = active === "on";
    newSettings[key].isActive = !isActive;

    this.lsManager.set(this.settingsLcKey, newSettings);

    this.create();
    this.createSettings();
  }

  /**
   * @property {Function} getSettingsState getting current settings state from localstorage
   * @returns {Object}
   */
  getSettingsState = () => {
    return this.lsManager.get(this.settingsLcKey);
  }

  /**
   * @property {Function} getCities getting current cities list state from localstorage
   * @returns {Object}
   */
  getCities = () => {
    return this.lsManager.get(this.citiesListLcKey);
    // return []
  }

  /**
   * @property {Function} getCurrentCity Current city localstorage getter
   */
  getCurrentCity = () => {
    return this.lsManager.get(this.cityLcKey);
  }

  /**
   * @property {Function} setCurrentCity Current city localstorage setter
   * @param {Object} city city to set
   */
  setCurrentCity(city) {
    this.lsManager.set(this.cityLcKey, city);
  }

  /**
   * @property {Function} setEventListeners setting event listeners when single city "page" is loaded
   */
  setEventListeners() {
    if (!this.showCityInfo) {
      return;
    }

    document.getElementById("showCitiesListBtn")?.addEventListener("click", this.showCityList);
    document.getElementById("settingsToggleBtn")?.addEventListener("click", this.createSettings);
  }

  /**
   * @property {Function} clearRootElement emptying roolElement's content
   */
  clearRootElement() {
    this.rootElement.innerHTML = "";
  }

  /**
   * @property {Function} showCityList displaying cities list "page"
   */
  showCityList = () => {
    this.showCityInfo = false;
    this.create();
  }

  /**
   * @property {Function} createNavigation creating navigation element
   */
  createNavigation() {
    const navigation = document.createElement("nav");
    navigation.classList.add("navigation");

    navigation.innerHTML = `
      <div class="navigation__settings" id="settingsToggleBtn">
          <i class="icon icon-figma-settings"></i>
      </div>
      <div class="navigation__pages">
          <i class="icon icon-dot navigation__circle navigation__circle--active"></i>
          <i class="icon icon-dot navigation__circle"></i>
          <i class="icon icon-dot navigation__circle"></i>
          <i class="icon icon-dot navigation__circle"></i>
      </div>
      <div class="navigation__cities">
          <a class="link" id="showCitiesListBtn">
              <div class="navigation__cities-link-wrapper">
                  <i class="icon icon-figma-tiles navigation__smaller-icon"></i>
              </div>
          </a>
      </div>
    `;

    this.rootElement.appendChild(navigation);
  }

  /**
   * @property {Function} createSettings creating settings element
   */
  createSettings = () => {
    this.mountModal(
      "settings",
      () => [
        this.settings.createContentWrapper(this.closeSettings),
        this.settings.createSettings(this.getSettingsState(), this.setOnSettingClick)
      ],
      [],
      "settings"
    );
  }

  /**
   * @property {Function} closeSettings Closing settings modal
   */
  closeSettings = () => {
    this.create();
  }

  /**
   * @property {Function} setOnSettingClick Setting onClick event later on a single setting item
   */
  setOnSettingClick = (settingNode) => {
    settingNode.childNodes[3].childNodes[1].addEventListener("click",this.toggleWidgetDisplay);
  }

  /**
   * @property {Function} create central app's point
   */
  create() {
    this.clearRootElement();

    if (this.showCityInfo) {
      this.createNavigation();
    }

    // central "router"
    switch (this.displayMode) {
      case "dashboard":
        this.dashBoard.create(
          this.getCities(),
          this.onCityWidgetClick,
          this.getCurrentCity,
          this.getSettingsState,
          this.widgetsData,
          this.showCityInfo,
          this.mountModal
        ).forEach((element) => this.rootElement.appendChild(element));

        this.setEventListeners();

        // fix later
        document.getElementById("cityListCloseBtn")?.addEventListener("click", () => {
          this.showCityInfo = true;
          this.create();
        });
        break;
      default:
        break;
    }

    if (this.showCityInfo) {
      document.getElementById("city-list")?.remove();
    }
  }
}
