"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgApiWrapper = void 0;
const pg_client_1 = __importDefault(require("./pg-client"));
const sqls_1 = __importDefault(require("./sqls"));
const pgApiWrapper = () => __awaiter(void 0, void 0, void 0, function* () {
    const { pgPool } = yield (0, pg_client_1.default)();
    const pgQuery = (text, params = {}) => pgPool.query(text, Object.values(params));
    return {
        queries: {
            usersInfo: (userIds) => __awaiter(void 0, void 0, void 0, function* () {
                console.log("Inside usersInfo");
                const pgResp = yield pgQuery(sqls_1.default.userFromId, {
                    $1: userIds
                });
                return userIds.map((userId) => pgResp.rows.filter((row) => userId === row.userId));
            }),
            getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
                console.log("Inside getAllUsers");
                const pgResp = yield pgQuery(sqls_1.default.getAllUsers);
                return pgResp.rows;
            })
        },
        mutators: {
            userCreate: (input) => __awaiter(void 0, void 0, void 0, function* () {
                const payload = { user: "" };
                const pgResp = yield pgQuery(sqls_1.default.userInsert, {
                    $1: input.username.toLowerCase(),
                    $2: input.firstName,
                    $3: input.lastName,
                });
                if (pgResp.rows[0]) {
                    payload.user = pgResp.rows[0];
                }
                return payload;
            }),
        },
    };
});
exports.pgApiWrapper = pgApiWrapper;
//# sourceMappingURL=pg-api.js.map