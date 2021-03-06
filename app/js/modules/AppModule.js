import addWrapperClass from "../wrapperClassScript";
import Settings from "../classes/Settings";
import DashBoard from "../classes/DashBoard";
import App from "../classes/App";

/**
 * @namespace modules
 */

/**
 * App module
 * @memberof entities
 */
const AppModule = (function () {
  return {
    init() {
      new App(
        new DashBoard(),
        new Settings(),
        document.getElementById("app")
      ).create();

      addWrapperClass();
    },
  };
})();

export default AppModule;
