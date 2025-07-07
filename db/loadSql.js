"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSql = loadSql;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function loadSql(fileName) {
    console.log(__dirname);
    const filePath = path_1.default.join(__dirname, fileName);
    return fs_1.default.readFileSync(filePath, 'utf8');
}
//# sourceMappingURL=loadSql.js.map