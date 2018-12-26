"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var option_model_1 = require("./option.model");
var Question = /** @class */ (function () {
    function Question(author, optionA, optionB) {
        this.author = author;
        // this.author = author;
        this.optionA = new option_model_1.default(optionA);
        this.optionB = new option_model_1.default(optionB);
    }
    return Question;
}());
exports.default = Question;
