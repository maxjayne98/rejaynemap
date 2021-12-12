"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.themeActions = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var theme_1 = require("../../styles/theme");
var localStorage_1 = require("localStorage");
var themePallete = {
    dark: theme_1.darkTheme,
    light: theme_1.lightTheme
};
var initialState = {
    theme: themePallete[localStorage_1["default"].getItem('theme') || 'dark']
};
var themeSlice = toolkit_1.createSlice({
    name: 'theme',
    initialState: initialState,
    reducers: {
        toggleTheme: function (state, action) {
            state.theme = __assign({}, themePallete[action.payload]);
            localStorage_1["default"].setItem('theme', action.payload);
        }
    }
});
exports.themeActions = themeSlice.actions;
exports["default"] = themeSlice.reducer;
