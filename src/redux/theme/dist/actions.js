"use strict";
exports.__esModule = true;
exports.toggleTheme = void 0;
var slice_1 = require("./slice");
exports.toggleTheme = function (themeName) {
    return slice_1.themeActions.toggleTheme(themeName);
};
