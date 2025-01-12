/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(3), exports);
tslib_1.__exportStar(__webpack_require__(5), exports);
tslib_1.__exportStar(__webpack_require__(7), exports);
tslib_1.__exportStar(__webpack_require__(63), exports);
tslib_1.__exportStar(__webpack_require__(65), exports);
tslib_1.__exportStar(__webpack_require__(68), exports);
tslib_1.__exportStar(__webpack_require__(9), exports);
tslib_1.__exportStar(__webpack_require__(62), exports);
tslib_1.__exportStar(__webpack_require__(69), exports);
tslib_1.__exportStar(__webpack_require__(70), exports);
tslib_1.__exportStar(__webpack_require__(73), exports);


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.memoryLock = void 0;
const tslib_1 = __webpack_require__(1);
const async_mutex_1 = __webpack_require__(4);
const memoryLocks = new Map();
class MutexLockWrapper {
    constructor(timeout) {
        if (timeout) {
            this.lock = (0, async_mutex_1.withTimeout)(new async_mutex_1.Mutex(), timeout);
        }
        else {
            this.lock = new async_mutex_1.Mutex();
        }
    }
    acquire() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.lock.acquire();
        });
    }
    release() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.lock.release();
        });
    }
}
exports.memoryLock = {
    acquire: (key, timeout) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        let lock = memoryLocks.get(key);
        if (!lock) {
            lock = new MutexLockWrapper(timeout);
            memoryLocks.set(key, lock);
        }
        yield lock.acquire();
        return lock;
    }),
    isTimeoutError: (e) => {
        return e === async_mutex_1.E_TIMEOUT;
    },
};


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("async-mutex");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hashUtils = void 0;
const tslib_1 = __webpack_require__(1);
const crypto = tslib_1.__importStar(__webpack_require__(6));
function hashObject(object) {
    const algorithm = 'sha256';
    const hash = crypto.createHash(algorithm);
    hash.update(JSON.stringify(object));
    return hash.digest('hex');
}
exports.hashUtils = {
    hashObject,
};


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.networkUtls = void 0;
const tslib_1 = __webpack_require__(1);
const promises_1 = tslib_1.__importDefault(__webpack_require__(8));
const system_1 = __webpack_require__(9);
const system_prop_1 = __webpack_require__(62);
const shared_1 = __webpack_require__(10);
const GOOGLE_DNS = '216.239.32.10';
const PUBLIC_IP_ADDRESS_QUERY = 'o-o.myaddr.l.google.com';
let ipMetadata;
const getPublicIp = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (ipMetadata !== undefined) {
        return ipMetadata;
    }
    promises_1.default.setServers([GOOGLE_DNS]);
    const ipList = yield promises_1.default.resolve(PUBLIC_IP_ADDRESS_QUERY, 'TXT');
    ipMetadata = {
        ip: ipList[0][0],
    };
    return ipMetadata;
});
const appendSlashAndApi = (url) => {
    const slash = url.endsWith('/') ? '' : '/';
    return `${url}${slash}api/`;
};
const getInternalApiUrl = () => {
    if (system_1.system.isApp()) {
        return 'http://127.0.0.1:3000/';
    }
    const url = system_1.system.getOrThrow(system_prop_1.SharedSystemProp.FRONTEND_URL);
    return appendSlashAndApi(url);
};
const getPublicUrl = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const environment = system_1.system.getOrThrow(system_prop_1.SharedSystemProp.ENVIRONMENT);
    let url = system_1.system.getOrThrow(system_prop_1.SharedSystemProp.FRONTEND_URL);
    if (extractHostname(url) === 'localhost' && environment === shared_1.PuEnvironment.PRODUCTION) {
        url = `http://${(yield getPublicIp()).ip}`;
    }
    return appendSlashAndApi(url);
});
function extractHostname(url) {
    try {
        const hostname = new URL(url).hostname;
        return hostname;
    }
    catch (e) {
        return null;
    }
}
exports.networkUtls = {
    getPublicUrl,
    getInternalApiUrl,
    getPublicIp,
};


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("node:dns/promises");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.system = exports.DatabaseType = exports.ContainerType = exports.RedisType = void 0;
const shared_1 = __webpack_require__(10);
const system_prop_1 = __webpack_require__(62);
var RedisType;
(function (RedisType) {
    RedisType["SENTINEL"] = "SENTINEL";
    RedisType["DEFAULT"] = "DEFAULT";
})(RedisType || (exports.RedisType = RedisType = {}));
var ContainerType;
(function (ContainerType) {
    ContainerType["APP"] = "APP";
})(ContainerType || (exports.ContainerType = ContainerType = {}));
var DatabaseType;
(function (DatabaseType) {
    DatabaseType["POSTGRES"] = "POSTGRES";
    DatabaseType["SQLITE3"] = "SQLITE3";
})(DatabaseType || (exports.DatabaseType = DatabaseType = {}));
const systemPropDefaultValues = {
    [system_prop_1.AppSystemProp.API_RATE_LIMIT_AUTHN_ENABLED]: 'true',
    [system_prop_1.AppSystemProp.API_RATE_LIMIT_AUTHN_MAX]: '50',
    [system_prop_1.AppSystemProp.API_RATE_LIMIT_AUTHN_WINDOW]: '1 minute',
    [system_prop_1.AppSystemProp.DB_TYPE]: DatabaseType.POSTGRES,
    [system_prop_1.AppSystemProp.EDITION]: shared_1.PuEdition.COMMUNITY,
    [system_prop_1.AppSystemProp.SHOW_PLATFORM_DEMO]: 'false',
    [system_prop_1.AppSystemProp.MAX_FILE_SIZE_MB]: '4',
    [system_prop_1.SharedSystemProp.ENVIRONMENT]: 'prod',
    [system_prop_1.SharedSystemProp.LOG_LEVEL]: 'info',
    [system_prop_1.SharedSystemProp.LOG_PRETTY]: 'false',
    [system_prop_1.SharedSystemProp.CONTAINER_TYPE]: ContainerType.APP,
};
exports.system = {
    get(prop) {
        return getEnvVar(prop);
    },
    getNumberOrThrow(prop) {
        const value = exports.system.getNumber(prop);
        if ((0, shared_1.isNil)(value)) {
            throw new shared_1.PickUpError({
                code: shared_1.ErrorCode.SYSTEM_PROP_NOT_DEFINED,
                params: {
                    prop,
                },
            }, `System property PU_${prop} is not defined, please check the documentation`);
        }
        return value;
    },
    getNumber(prop) {
        const stringNumber = getEnvVar(prop);
        if (!stringNumber) {
            return null;
        }
        const parsedNumber = Number.parseInt(stringNumber, 10);
        if (Number.isNaN(parsedNumber)) {
            return null;
        }
        return parsedNumber;
    },
    getBoolean(prop) {
        const value = getEnvVar(prop);
        if ((0, shared_1.isNil)(value)) {
            return undefined;
        }
        return value === 'true';
    },
    getList(prop) {
        const values = getEnvVar(prop);
        if ((0, shared_1.isNil)(values)) {
            return [];
        }
        return values.split(',').map((value) => value.trim());
    },
    getOrThrow(prop) {
        const value = getEnvVar(prop);
        if (value === undefined) {
            throw new shared_1.PickUpError({
                code: shared_1.ErrorCode.SYSTEM_PROP_NOT_DEFINED,
                params: {
                    prop,
                },
            }, `System property PU_${prop} is not defined, please check the documentation`);
        }
        return value;
    },
    getEdition() {
        return this.getOrThrow(system_prop_1.AppSystemProp.EDITION);
    },
    isApp() {
        return [ContainerType.APP].includes(this.getOrThrow(system_prop_1.SharedSystemProp.CONTAINER_TYPE));
    },
};
const getEnvVar = (prop) => {
    var _a;
    return (_a = process.env[`PU_${prop}`]) !== null && _a !== void 0 ? _a : systemPropDefaultValues[prop];
};


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(11), exports);
tslib_1.__exportStar(__webpack_require__(24), exports);
tslib_1.__exportStar(__webpack_require__(25), exports);
tslib_1.__exportStar(__webpack_require__(26), exports);
tslib_1.__exportStar(__webpack_require__(31), exports);
tslib_1.__exportStar(__webpack_require__(32), exports);
tslib_1.__exportStar(__webpack_require__(33), exports);
tslib_1.__exportStar(__webpack_require__(34), exports);
tslib_1.__exportStar(__webpack_require__(28), exports);
tslib_1.__exportStar(__webpack_require__(17), exports);
tslib_1.__exportStar(__webpack_require__(35), exports);
tslib_1.__exportStar(__webpack_require__(38), exports);
tslib_1.__exportStar(__webpack_require__(45), exports);
tslib_1.__exportStar(__webpack_require__(47), exports);
tslib_1.__exportStar(__webpack_require__(51), exports);
tslib_1.__exportStar(__webpack_require__(53), exports);
tslib_1.__exportStar(__webpack_require__(55), exports);
tslib_1.__exportStar(__webpack_require__(57), exports);
tslib_1.__exportStar(__webpack_require__(40), exports);
tslib_1.__exportStar(__webpack_require__(59), exports);
// Look at https://github.com/sinclairzx81/typebox/issues/350
const system_1 = __webpack_require__(61);
system_1.TypeSystemPolicy.ExactOptionalPropertyTypes = false;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(12), exports);
tslib_1.__exportStar(__webpack_require__(17), exports);
tslib_1.__exportStar(__webpack_require__(19), exports);
tslib_1.__exportStar(__webpack_require__(20), exports);
tslib_1.__exportStar(__webpack_require__(22), exports);
tslib_1.__exportStar(__webpack_require__(23), exports);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(13), exports);
tslib_1.__exportStar(__webpack_require__(14), exports);
tslib_1.__exportStar(__webpack_require__(16), exports);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isObject = exports.spreadIfDefined = void 0;
exports.deleteProperties = deleteProperties;
exports.deleteProps = deleteProps;
exports.sanitizeObjectForPostgresql = sanitizeObjectForPostgresql;
exports.applyFunctionToValuesSync = applyFunctionToValuesSync;
exports.applyFunctionToValues = applyFunctionToValues;
const tslib_1 = __webpack_require__(1);
const utils_1 = __webpack_require__(14);
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function deleteProperties(obj, props) {
    const copy = Object.assign({}, obj);
    for (const prop of props) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete copy[prop];
    }
    return copy;
}
const spreadIfDefined = (key, value) => {
    if ((0, utils_1.isNil)(value)) {
        return {};
    }
    return {
        [key]: value,
    };
};
exports.spreadIfDefined = spreadIfDefined;
function deleteProps(obj, prop) {
    const newObj = Object.assign({}, obj);
    for (const p of prop) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete newObj[p];
    }
    return newObj;
}
function sanitizeObjectForPostgresql(input) {
    return applyFunctionToValuesSync(input, (str) => {
        if ((0, utils_1.isString)(str)) {
            // eslint-disable-next-line no-control-regex
            const controlCharsRegex = /\u0000/g;
            return str.replace(controlCharsRegex, '');
        }
        return str;
    });
}
function applyFunctionToValuesSync(obj, apply) {
    if ((0, utils_1.isNil)(obj)) {
        return obj;
    }
    else if ((0, utils_1.isString)(obj)) {
        return apply(obj);
    }
    else if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; ++i) {
            obj[i] = applyFunctionToValuesSync(obj[i], apply);
        }
    }
    else if ((0, exports.isObject)(obj)) {
        const entries = Object.entries(obj);
        for (const entry of entries) {
            const [key, value] = entry;
            obj[key] = applyFunctionToValuesSync(value, apply);
        }
    }
    return apply(obj);
}
function applyFunctionToValues(obj, apply) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if ((0, utils_1.isNil)(obj)) {
            return obj;
        }
        else if ((0, utils_1.isString)(obj)) {
            return yield apply(obj);
        }
        else if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; ++i) {
                obj[i] = yield applyFunctionToValues(obj[i], apply);
            }
        }
        else if ((0, exports.isObject)(obj)) {
            const entries = Object.entries(obj);
            for (const entry of entries) {
                const [key, value] = entry;
                obj[key] = yield applyFunctionToValues(value, apply);
            }
        }
        return yield apply(obj);
    });
}
const isObject = (obj) => {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
};
exports.isObject = isObject;


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isString = isString;
exports.isNil = isNil;
exports.setAtPath = setAtPath;
exports.debounce = debounce;
exports.deepMergeAndCast = deepMergeAndCast;
exports.kebabCase = kebabCase;
exports.isEmpty = isEmpty;
exports.startCase = startCase;
exports.camelCase = camelCase;
exports.pickBy = pickBy;
const tslib_1 = __webpack_require__(1);
const deepmerge_1 = tslib_1.__importDefault(__webpack_require__(15));
function isString(str) {
    return str != null && typeof str === 'string';
}
function isNil(value) {
    return value === null || value === undefined;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setAtPath(obj, path, value) {
    const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pathArray.reduce((acc, key, i) => {
        if (acc[key] === undefined)
            acc[key] = {};
        if (i === pathArray.length - 1)
            acc[key] = value;
        return acc[key];
    }, obj);
}
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
function deepMergeAndCast(target, source) {
    return (0, deepmerge_1.default)(target, source);
}
function kebabCase(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2') // Handle camelCase by adding hyphen between lowercase and uppercase letters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/_/g, '-') // Replace underscores with hyphens
        .toLowerCase() // Convert to lowercase
        .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
}
function isEmpty(value) {
    if (value == null) {
        return true;
    }
    if (typeof value === 'string' || Array.isArray(value)) {
        return value.length === 0;
    }
    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }
    return false;
}
function startCase(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[_-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/^[a-z]/, match => match.toUpperCase())
        .replace(/\b[a-z]/g, match => match.toUpperCase());
}
function camelCase(str) {
    return str
        .replace(/([-_][a-z])/g, group => group.toUpperCase()
        .replace('-', '')
        .replace('_', ''));
}
function pickBy(object, predicate) {
    return Object.keys(object).reduce((result, key) => {
        if (predicate(object[key], key)) {
            result[key] = object[key];
        }
        return result;
    }, {});
}


/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("deepmerge");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isNotUndefined = void 0;
exports.assertEqual = assertEqual;
exports.assertNotNullOrUndefined = assertNotNullOrUndefined;
exports.assertNotEqual = assertNotEqual;
exports.assertNull = assertNull;
function assertEqual(actual, expected, fieldName1, fieldName2) {
    if (actual !== expected) {
        throw new Error(`${fieldName1} and ${fieldName2} should be equal`);
    }
}
function assertNotNullOrUndefined(value, fieldName) {
    if (value === null || value === undefined) {
        throw new Error(`${fieldName} is null or undefined`);
    }
}
function assertNotEqual(value1, value2, fieldName1, fieldName2) {
    if (value1 === value2) {
        throw new Error(`${fieldName1} and ${fieldName2} should not be equal`);
    }
}
const isNotUndefined = (value) => {
    return value !== undefined;
};
exports.isNotUndefined = isNotUndefined;
function assertNull(value, fieldName) {
    if (value !== null) {
        throw new Error(`${fieldName} should be null`);
    }
}


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Nullable = exports.BaseModelSchema = void 0;
exports.NullableEnum = NullableEnum;
const typebox_1 = __webpack_require__(18);
exports.BaseModelSchema = {
    id: typebox_1.Type.String(),
    created: typebox_1.Type.String(),
    updated: typebox_1.Type.String(),
};
// Used to generate valid nullable in OpenAPI Schema
const Nullable = (schema) => typebox_1.Type.Optional(typebox_1.Type.Unsafe(Object.assign(Object.assign({}, schema), { nullable: true })));
exports.Nullable = Nullable;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NullableEnum(schema) {
    const values = schema.anyOf.map(f => f.const);
    return typebox_1.Type.Optional(typebox_1.Type.Unsafe({ type: 'string', enum: values, nullable: true }));
}


/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("@sinclair/typebox");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalesEnum = void 0;
var LocalesEnum;
(function (LocalesEnum) {
    LocalesEnum["DUTCH"] = "nl";
    LocalesEnum["ENGLISH"] = "en";
    LocalesEnum["GERMAN"] = "de";
    LocalesEnum["ITALIAN"] = "it";
    LocalesEnum["FRENCH"] = "fr";
    LocalesEnum["BULGARIAN"] = "bg";
    LocalesEnum["UKRAINIAN"] = "uk";
    LocalesEnum["HUNGARIAN"] = "hu";
    LocalesEnum["SPANISH"] = "es";
    LocalesEnum["JAPANESE"] = "ja";
    LocalesEnum["INDONESIAN"] = "id";
    LocalesEnum["VIETNAMESE"] = "vi";
    LocalesEnum["CHINESE_SIMPLIFIED"] = "zh";
    LocalesEnum["PORTUGUESE"] = "pt";
})(LocalesEnum || (exports.LocalesEnum = LocalesEnum = {}));


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SAFE_STRING_PATTERN = void 0;
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(21), exports);
exports.SAFE_STRING_PATTERN = '^[^./]+$';


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Permission = void 0;
var Permission;
(function (Permission) {
    Permission["READ_CLASSROOM"] = "READ_CLASSROOM";
    Permission["WRITE_CLASSROOM"] = "WRITE_CLASSROOM";
    Permission["READ_CLASSROOM_MEMBER"] = "READ_CLASSROOM_MEMBER";
    Permission["WRITE_CLASSROOM_MEMBER"] = "WRITE_CLASSROOM_MEMBER";
    Permission["READ_INVITATION"] = "READ_INVITATION";
    Permission["WRITE_INVITATION"] = "WRITE_INVITATION";
})(Permission || (exports.Permission = Permission = {}));


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isMultipartFile = exports.PuMultipartFile = void 0;
const typebox_1 = __webpack_require__(18);
exports.PuMultipartFile = typebox_1.Type.Object({
    filename: typebox_1.Type.String(),
    data: typebox_1.Type.Unknown(),
    type: typebox_1.Type.Literal('file'),
});
const isMultipartFile = (value) => {
    return typeof value === 'object' && value !== null && 'type' in value && value.type === 'file' && 'filename' in value && 'data' in value && value.data instanceof Buffer;
};
exports.isMultipartFile = isMultipartFile;


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorCode = exports.PickUpError = void 0;
class PickUpError extends Error {
    constructor(error, message) {
        super(error.code + (message ? `: ${message}` : ''));
        this.error = error;
    }
}
exports.PickUpError = PickUpError;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["AUTHENTICATION"] = "AUTHENTICATION";
    ErrorCode["AUTHORIZATION"] = "AUTHORIZATION";
    ErrorCode["EMAIL_IS_NOT_VERIFIED"] = "EMAIL_IS_NOT_VERIFIED";
    ErrorCode["ENTITY_NOT_FOUND"] = "ENTITY_NOT_FOUND";
    ErrorCode["EXISTING_ALERT_CHANNEL"] = "EXISTING_ALERT_CHANNEL";
    ErrorCode["FILE_NOT_FOUND"] = "FILE_NOT_FOUND";
    ErrorCode["INVALID_BEARER_TOKEN"] = "INVALID_BEARER_TOKEN";
    ErrorCode["SESSION_EXPIRED"] = "SESSION_EXPIRED";
    ErrorCode["INVALID_CLAIM"] = "INVALID_CLAIM";
    ErrorCode["INVALID_CLOUD_CLAIM"] = "INVALID_CLOUD_CLAIM";
    ErrorCode["INVALID_CREDENTIALS"] = "INVALID_CREDENTIALS";
    ErrorCode["INVALID_OR_EXPIRED_JWT_TOKEN"] = "INVALID_OR_EXPIRED_JWT_TOKEN";
    ErrorCode["INVALID_OTP"] = "INVALID_OTP";
    ErrorCode["PERMISSION_DENIED"] = "PERMISSION_DENIED";
    ErrorCode["FEATURE_DISABLED"] = "FEATURE_DISABLED";
    ErrorCode["SYSTEM_PROP_INVALID"] = "SYSTEM_PROP_INVALID";
    ErrorCode["SYSTEM_PROP_NOT_DEFINED"] = "SYSTEM_PROP_NOT_DEFINED";
    ErrorCode["USER_IS_INACTIVE"] = "USER_IS_INACTIVE";
    ErrorCode["VALIDATION"] = "VALIDATION";
    ErrorCode["INVALID_LICENSE_KEY"] = "INVALID_LICENSE_KEY";
    ErrorCode["EMAIL_ALREADY_HAS_ACTIVATION_KEY"] = "EMAIL_ALREADY_HAS_ACTIVATION_KEY";
    ErrorCode["EXISTING_USER"] = "EXISTING_USER";
    ErrorCode["EMAIL_AUTH_DISABLED"] = "EMAIL_AUTH_DISABLED";
    ErrorCode["NO_CLASSROOM_FOUND"] = "NO_CLASSROOM_FOUND";
    ErrorCode["INVALID_SMTP_CREDENTIALS"] = "INVALID_SMTP_CREDENTIALS";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PuFlagId = exports.PuEdition = exports.PuEnvironment = void 0;
var PuEnvironment;
(function (PuEnvironment) {
    PuEnvironment["PRODUCTION"] = "prod";
    PuEnvironment["DEVELOPMENT"] = "dev";
    PuEnvironment["TESTING"] = "test";
})(PuEnvironment || (exports.PuEnvironment = PuEnvironment = {}));
var PuEdition;
(function (PuEdition) {
    PuEdition["COMMUNITY"] = "ce";
    PuEdition["ENTERPRISE"] = "ee";
})(PuEdition || (exports.PuEdition = PuEdition = {}));
var PuFlagId;
(function (PuFlagId) {
    PuFlagId["SHOW_PLATFORM_DEMO"] = "SHOW_PLATFORM_DEMO";
    PuFlagId["CLASSROOM_LIMITS_ENABLED"] = "CLASSROOM_LIMITS_ENABLED";
    PuFlagId["CURRENT_VERSION"] = "CURRENT_VERSION";
    PuFlagId["EDITION"] = "EDITION";
    PuFlagId["ENVIRONMENT"] = "ENVIRONMENT";
    PuFlagId["FRONTEND_URL"] = "FRONTEND_URL";
    PuFlagId["LATEST_VERSION"] = "LATEST_VERSION";
    PuFlagId["PRIVACY_POLICY_URL"] = "PRIVACY_POLICY_URL";
    PuFlagId["THEME"] = "THEME";
    PuFlagId["USER_CREATED"] = "USER_CREATED";
    PuFlagId["TERMS_OF_SERVICE_URL"] = "TERMS_OF_SERVICE_URL";
    PuFlagId["EMAIL_AUTH_ENABLED"] = "EMAIL_AUTH_ENABLED";
})(PuFlagId || (exports.PuFlagId = PuFlagId = {}));


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignUpRequest = void 0;
const typebox_1 = __webpack_require__(18);
const user_1 = __webpack_require__(27);
exports.SignUpRequest = typebox_1.Type.Object({
    email: user_1.EmailType,
    password: user_1.PasswordType,
    firstName: typebox_1.Type.String(),
    lastName: typebox_1.Type.String(),
});


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserMeta = exports.User = exports.PasswordType = exports.EmailType = exports.UserStatus = void 0;
const typebox_1 = __webpack_require__(18);
const base_model_1 = __webpack_require__(17);
const id_generator_1 = __webpack_require__(28);
const classroom_member_1 = __webpack_require__(30);
var UserStatus;
(function (UserStatus) {
    /* user is active */
    UserStatus["ACTIVE"] = "ACTIVE";
    /* user account deactivated */
    UserStatus["INACTIVE"] = "INACTIVE";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
exports.EmailType = typebox_1.Type.String({
    format: 'email',
});
exports.PasswordType = typebox_1.Type.String({
    minLength: 8,
    maxLength: 64,
});
exports.User = typebox_1.Type.Object(Object.assign(Object.assign({}, base_model_1.BaseModelSchema), { email: typebox_1.Type.String(), firstName: typebox_1.Type.String(), lastName: typebox_1.Type.String(), password: typebox_1.Type.String(), verified: typebox_1.Type.Boolean(), status: typebox_1.Type.Enum(UserStatus), platformId: typebox_1.Type.Union([id_generator_1.PuId, typebox_1.Type.Null()]), classroomRole: typebox_1.Type.Enum(classroom_member_1.ClassroomMemberRole), tokenVersion: typebox_1.Type.Optional(typebox_1.Type.String()) }));
exports.UserMeta = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    email: typebox_1.Type.String(),
    firstName: typebox_1.Type.String(),
    lastName: typebox_1.Type.String(),
    status: typebox_1.Type.Enum(UserStatus),
    platformId: typebox_1.Type.Union([id_generator_1.PuId, typebox_1.Type.Null()]),
    classroomRole: typebox_1.Type.Enum(classroom_member_1.ClassroomMemberRole),
    created: typebox_1.Type.String(),
    updated: typebox_1.Type.String(),
});


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.securePuId = exports.puId = exports.PuId = void 0;
const typebox_1 = __webpack_require__(18);
const nanoid_1 = __webpack_require__(29);
const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const ID_LENGTH = 21;
exports.PuId = typebox_1.Type.String({
    pattern: `^[0-9a-zA-Z]{${ID_LENGTH}}$`,
});
exports.puId = (0, nanoid_1.customAlphabet)(ALPHABET, ID_LENGTH);
const securePuId = (length) => (0, nanoid_1.customAlphabet)(ALPHABET, length)();
exports.securePuId = securePuId;


/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("nanoid");

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClassroomMemberRole = void 0;
var ClassroomMemberRole;
(function (ClassroomMemberRole) {
    ClassroomMemberRole["STUDENT"] = "STUDENT";
    ClassroomMemberRole["TEACHER"] = "TEACHER";
})(ClassroomMemberRole || (exports.ClassroomMemberRole = ClassroomMemberRole = {}));


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignInRequest = void 0;
const typebox_1 = __webpack_require__(18);
const user_1 = __webpack_require__(27);
exports.SignInRequest = typebox_1.Type.Object({
    email: user_1.EmailType,
    password: user_1.PasswordType,
});


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EndpointScope = exports.SERVICE_KEY_SECURITY_OPENAPI = exports.ALL_PRINCIPAL_TYPES = exports.PrincipalType = void 0;
var PrincipalType;
(function (PrincipalType) {
    PrincipalType["USER"] = "USER";
    PrincipalType["SERVICE"] = "SERVICE";
    PrincipalType["UNKNOWN"] = "UNKNOWN";
    /**
     * @deprecated
     */
    PrincipalType["SUPER_USER"] = "SUPER_USER";
})(PrincipalType || (exports.PrincipalType = PrincipalType = {}));
exports.ALL_PRINCIPAL_TYPES = Object.values(PrincipalType);
exports.SERVICE_KEY_SECURITY_OPENAPI = {
    apiKey: [],
};
var EndpointScope;
(function (EndpointScope) {
    EndpointScope["PLATFORM"] = "PLATFORM";
    EndpointScope["CLASSROOM"] = "CLASSROOM";
})(EndpointScope || (exports.EndpointScope = EndpointScope = {}));


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeekPage = void 0;
const typebox_1 = __webpack_require__(18);
const base_model_1 = __webpack_require__(17);
const SeekPage = (t) => typebox_1.Type.Object({
    data: typebox_1.Type.Array(t),
    next: (0, base_model_1.Nullable)(typebox_1.Type.String({ description: 'Cursor to the next page' })),
    previous: (0, base_model_1.Nullable)(typebox_1.Type.String({ description: 'Cursor to the previous page' })),
});
exports.SeekPage = SeekPage;


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(36), exports);
tslib_1.__exportStar(__webpack_require__(30), exports);
tslib_1.__exportStar(__webpack_require__(37), exports);


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateClassroomBody = exports.ActiveClassroom = exports.Classroom = exports.SwitchClassroomResponse = exports.ListProjectRequestForUserQueryParams = void 0;
const typebox_1 = __webpack_require__(18);
const shared_1 = __webpack_require__(10);
const classroom_member_1 = __webpack_require__(30);
const common_1 = __webpack_require__(11);
exports.ListProjectRequestForUserQueryParams = typebox_1.Type.Object({
    cursor: typebox_1.Type.Optional(typebox_1.Type.String()),
    limit: typebox_1.Type.Optional(typebox_1.Type.Number()),
});
exports.SwitchClassroomResponse = typebox_1.Type.Object({
    token: typebox_1.Type.String(),
    classroomRole: typebox_1.Type.Union([typebox_1.Type.Enum(classroom_member_1.ClassroomMemberRole), typebox_1.Type.Null()]),
});
exports.Classroom = typebox_1.Type.Object(Object.assign(Object.assign({}, shared_1.BaseModelSchema), { deleted: (0, shared_1.Nullable)(typebox_1.Type.String()), ownerId: typebox_1.Type.String(), displayName: typebox_1.Type.String(), platformId: shared_1.PuId }));
exports.ActiveClassroom = typebox_1.Type.Omit(exports.Classroom, ['deleted']);
exports.UpdateClassroomBody = typebox_1.Type.Object({
    displayName: typebox_1.Type.Optional(typebox_1.Type.String({
        pattern: common_1.SAFE_STRING_PATTERN,
    })),
});


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListClassroomMembersRequestQuery = void 0;
const typebox_1 = __webpack_require__(18);
exports.ListClassroomMembersRequestQuery = typebox_1.Type.Object({
    classroomId: typebox_1.Type.String(),
    classroomRoleId: typebox_1.Type.Optional(typebox_1.Type.String()),
    cursor: typebox_1.Type.Optional(typebox_1.Type.String()),
    limit: typebox_1.Type.Optional(typebox_1.Type.Number()),
});


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(39), exports);
tslib_1.__exportStar(__webpack_require__(43), exports);
tslib_1.__exportStar(__webpack_require__(44), exports);


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Platform = void 0;
const typebox_1 = __webpack_require__(18);
const common_1 = __webpack_require__(11);
const base_model_1 = __webpack_require__(17);
const id_generator_1 = __webpack_require__(28);
const invitations_1 = __webpack_require__(40);
exports.Platform = typebox_1.Type.Object(Object.assign(Object.assign({}, base_model_1.BaseModelSchema), { ownerId: id_generator_1.PuId, name: typebox_1.Type.String(), primaryColor: typebox_1.Type.String(), logoIconUrl: typebox_1.Type.String(), fullLogoUrl: typebox_1.Type.String(), favIconUrl: typebox_1.Type.String(), smtp: typebox_1.Type.Optional(invitations_1.SMTPInformation), auditLogEnabled: typebox_1.Type.Boolean(), customAppearanceEnabled: typebox_1.Type.Boolean(), classroomRolesEnabled: typebox_1.Type.Boolean(), alertsEnabled: typebox_1.Type.Boolean(), defaultLocale: typebox_1.Type.Optional(typebox_1.Type.Enum(common_1.LocalesEnum)), licenseKey: typebox_1.Type.Optional(typebox_1.Type.String()) }));


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(41), exports);


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListUserInvitationsRequest = exports.AcceptUserInvitationRequest = exports.SendUserInvitationRequest = exports.UserInvitationWithLink = exports.UserInvitation = exports.SMTPInformation = exports.InvitationStatus = exports.InvitationType = void 0;
const typebox_1 = __webpack_require__(18);
const common_1 = __webpack_require__(11);
const classroom_role_1 = __webpack_require__(42);
var InvitationType;
(function (InvitationType) {
    InvitationType["STAFF"] = "STAFF";
    InvitationType["CLASSROOM"] = "CLASSROOM";
})(InvitationType || (exports.InvitationType = InvitationType = {}));
var InvitationStatus;
(function (InvitationStatus) {
    InvitationStatus["PENDING"] = "PENDING";
    InvitationStatus["ACCEPTED"] = "ACCEPTED";
})(InvitationStatus || (exports.InvitationStatus = InvitationStatus = {}));
exports.SMTPInformation = typebox_1.Type.Object({
    user: typebox_1.Type.String(),
    senderEmail: typebox_1.Type.String(),
    senderName: typebox_1.Type.String(),
    password: typebox_1.Type.String(),
    host: typebox_1.Type.String(),
    port: typebox_1.Type.Number(),
});
exports.UserInvitation = typebox_1.Type.Object(Object.assign(Object.assign({}, common_1.BaseModelSchema), { email: typebox_1.Type.String(), status: typebox_1.Type.Enum(InvitationStatus), type: typebox_1.Type.Enum(InvitationType), platformId: typebox_1.Type.String(), platformRole: (0, common_1.NullableEnum)(typebox_1.Type.Enum(classroom_role_1.ClassroomRole)), projectId: (0, common_1.Nullable)(typebox_1.Type.String()), classroomId: (0, common_1.Nullable)(typebox_1.Type.String()), classroomRole: (0, common_1.Nullable)(typebox_1.Type.Enum(classroom_role_1.ClassroomRole)) }));
exports.UserInvitationWithLink = typebox_1.Type.Composite([exports.UserInvitation, typebox_1.Type.Object({
        link: typebox_1.Type.Optional(typebox_1.Type.String()),
    })]);
exports.SendUserInvitationRequest = typebox_1.Type.Union([
    typebox_1.Type.Object({
        type: typebox_1.Type.Literal(InvitationType.CLASSROOM),
        email: typebox_1.Type.String(),
        classroomId: typebox_1.Type.String(),
        classroomRole: typebox_1.Type.Enum(classroom_role_1.ClassroomRole),
    }),
    typebox_1.Type.Object({
        type: typebox_1.Type.Literal(InvitationType.STAFF),
        email: typebox_1.Type.String(),
        classroomRole: typebox_1.Type.Enum(classroom_role_1.ClassroomRole),
    }),
]);
exports.AcceptUserInvitationRequest = typebox_1.Type.Object({
    invitationToken: typebox_1.Type.String(),
});
exports.ListUserInvitationsRequest = typebox_1.Type.Object({
    limit: typebox_1.Type.Optional(typebox_1.Type.Number()),
    cursor: typebox_1.Type.Optional(typebox_1.Type.String()),
    type: typebox_1.Type.Enum(InvitationType),
    projectId: (0, common_1.Nullable)(typebox_1.Type.String()),
    status: typebox_1.Type.Optional(typebox_1.Type.Enum(InvitationStatus)),
});


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClassroomRole = void 0;
const typebox_1 = __webpack_require__(18);
const common_1 = __webpack_require__(11);
exports.ClassroomRole = typebox_1.Type.Object(Object.assign(Object.assign({}, common_1.BaseModelSchema), { name: typebox_1.Type.String(), permissions: typebox_1.Type.Array(typebox_1.Type.String()), platformId: typebox_1.Type.Optional(typebox_1.Type.String()), type: typebox_1.Type.String() }));


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminAddPlatformRequestBody = exports.UpdatePlatformRequestBody = void 0;
const typebox_1 = __webpack_require__(18);
const common_1 = __webpack_require__(11);
const id_generator_1 = __webpack_require__(28);
exports.UpdatePlatformRequestBody = typebox_1.Type.Object({
    name: typebox_1.Type.Optional(typebox_1.Type.String()),
    primaryColor: typebox_1.Type.Optional(typebox_1.Type.String()),
    logoIconUrl: typebox_1.Type.Optional(typebox_1.Type.String()),
    fullLogoUrl: typebox_1.Type.Optional(typebox_1.Type.String()),
    favIconUrl: typebox_1.Type.Optional(typebox_1.Type.String()),
    defaultLocale: typebox_1.Type.Optional(typebox_1.Type.Enum(common_1.LocalesEnum)),
});
exports.AdminAddPlatformRequestBody = typebox_1.Type.Object({
    userId: id_generator_1.PuId,
    classroomId: id_generator_1.PuId,
    name: typebox_1.Type.String(),
});


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePlatformClassroomBody = exports.UpdatePlatformClassroomBody = void 0;
const typebox_1 = __webpack_require__(18);
exports.UpdatePlatformClassroomBody = typebox_1.Type.Object({
    displayName: typebox_1.Type.Optional(typebox_1.Type.String()),
});
exports.CreatePlatformClassroomBody = typebox_1.Type.Object({
    displayName: typebox_1.Type.String(),
});


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(46), exports);


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResetPasswordRequestBody = exports.VerifyEmailRequestBody = void 0;
const typebox_1 = __webpack_require__(18);
const id_generator_1 = __webpack_require__(28);
exports.VerifyEmailRequestBody = typebox_1.Type.Object({
    userId: id_generator_1.PuId,
    otp: typebox_1.Type.String(),
});
exports.ResetPasswordRequestBody = typebox_1.Type.Object({
    userId: id_generator_1.PuId,
    otp: typebox_1.Type.String(),
    newPassword: typebox_1.Type.String(),
});


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(48), exports);
tslib_1.__exportStar(__webpack_require__(50), exports);
tslib_1.__exportStar(__webpack_require__(49), exports);


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OtpModel = exports.OtpState = void 0;
const typebox_1 = __webpack_require__(18);
const shared_1 = __webpack_require__(10);
const otp_type_1 = __webpack_require__(49);
var OtpState;
(function (OtpState) {
    OtpState["PENDING"] = "PENDING";
    OtpState["CONFIRMED"] = "CONFIRMED";
})(OtpState || (exports.OtpState = OtpState = {}));
exports.OtpModel = typebox_1.Type.Object(Object.assign(Object.assign({}, shared_1.BaseModelSchema), { type: typebox_1.Type.Enum(otp_type_1.OtpType), userId: shared_1.PuId, value: typebox_1.Type.String(), state: typebox_1.Type.Enum(OtpState) }));


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OtpType = void 0;
var OtpType;
(function (OtpType) {
    OtpType["EMAIL_VERIFICATION"] = "EMAIL_VERIFICATION";
    OtpType["PASSWORD_RESET"] = "PASSWORD_RESET";
})(OtpType || (exports.OtpType = OtpType = {}));


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateOtpRequestBody = void 0;
const typebox_1 = __webpack_require__(18);
const otp_type_1 = __webpack_require__(49);
exports.CreateOtpRequestBody = typebox_1.Type.Object({
    email: typebox_1.Type.String(),
    type: typebox_1.Type.Enum(otp_type_1.OtpType),
});


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserRequestBody = void 0;
const tslib_1 = __webpack_require__(1);
const typebox_1 = __webpack_require__(18);
const user_1 = __webpack_require__(27);
tslib_1.__exportStar(__webpack_require__(52), exports);
tslib_1.__exportStar(__webpack_require__(27), exports);
exports.UpdateUserRequestBody = typebox_1.Type.Object({
    status: typebox_1.Type.Optional(typebox_1.Type.Enum(user_1.UserStatus)),
});


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserResponse = void 0;
const typebox_1 = __webpack_require__(18);
const user_1 = __webpack_require__(27);
exports.UserResponse = typebox_1.Type.Omit(user_1.User, ['password']);


/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(54), exports);


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rolePermissions = exports.RoleType = exports.DefaultClassroomRole = void 0;
const permission_1 = __webpack_require__(21);
var DefaultClassroomRole;
(function (DefaultClassroomRole) {
    DefaultClassroomRole["STUDENT"] = "STUDENT";
    DefaultClassroomRole["TEACHER"] = "TEACHER";
})(DefaultClassroomRole || (exports.DefaultClassroomRole = DefaultClassroomRole = {}));
var RoleType;
(function (RoleType) {
    RoleType["DEFAULT"] = "DEFAULT";
    RoleType["CUSTOM"] = "CUSTOM";
})(RoleType || (exports.RoleType = RoleType = {}));
exports.rolePermissions = {
    [DefaultClassroomRole.STUDENT]: [
        permission_1.Permission.READ_CLASSROOM,
        permission_1.Permission.READ_CLASSROOM_MEMBER,
        permission_1.Permission.READ_INVITATION,
    ],
    [DefaultClassroomRole.TEACHER]: [
        permission_1.Permission.READ_CLASSROOM,
        permission_1.Permission.WRITE_CLASSROOM,
        permission_1.Permission.READ_CLASSROOM_MEMBER,
        permission_1.Permission.WRITE_CLASSROOM_MEMBER,
        permission_1.Permission.READ_INVITATION,
    ],
};


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(56), exports);


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClassroomMemberWithUser = exports.ClassroomMember = void 0;
const typebox_1 = __webpack_require__(18);
const shared_1 = __webpack_require__(10);
exports.ClassroomMember = typebox_1.Type.Object(Object.assign(Object.assign({}, shared_1.BaseModelSchema), { platformId: shared_1.PuId, userId: shared_1.PuId, classroomId: typebox_1.Type.String(), classroomRoleId: shared_1.PuId }), {
    description: "Classroom member is which user is assigned to a classroom."
});
exports.ClassroomMemberWithUser = typebox_1.Type.Composite([exports.ClassroomMember, typebox_1.Type.Object({
        user: shared_1.UserMeta,
        classroomRole: shared_1.ClassroomRole,
    })]);


/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(42), exports);
tslib_1.__exportStar(__webpack_require__(58), exports);


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateClassroomRoleRequestBody = exports.CreateClassroomRoleRequestBody = void 0;
const typebox_1 = __webpack_require__(18);
const common_1 = __webpack_require__(11);
const roles_1 = __webpack_require__(53);
exports.CreateClassroomRoleRequestBody = typebox_1.Type.Object({
    name: typebox_1.Type.String({
        pattern: common_1.SAFE_STRING_PATTERN,
    }),
    permissions: typebox_1.Type.Array(typebox_1.Type.String()),
    type: typebox_1.Type.Enum(roles_1.RoleType),
});
exports.UpdateClassroomRoleRequestBody = typebox_1.Type.Object({
    name: typebox_1.Type.Optional(typebox_1.Type.String({
        pattern: common_1.SAFE_STRING_PATTERN,
    })),
    permissions: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.String())),
});


/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(60), exports);


/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplicationEvent = exports.ClassroomRoleEvent = exports.AuthenticationEvent = exports.ApplicationEventName = exports.ListAuditEventsRequest = void 0;
exports.summarizeApplicationEvent = summarizeApplicationEvent;
const typebox_1 = __webpack_require__(18);
const shared_1 = __webpack_require__(10);
exports.ListAuditEventsRequest = typebox_1.Type.Object({
    limit: typebox_1.Type.Optional(typebox_1.Type.Number()),
    cursor: typebox_1.Type.Optional(typebox_1.Type.String()),
    action: typebox_1.Type.Optional(typebox_1.Type.String()),
    classroomId: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.String())),
    userId: typebox_1.Type.Optional(typebox_1.Type.String()),
    createdBefore: typebox_1.Type.Optional(typebox_1.Type.String()),
    createdAfter: typebox_1.Type.Optional(typebox_1.Type.String()),
});
const UserMeta = typebox_1.Type.Pick(shared_1.User, ['email', 'id', 'firstName', 'lastName']);
var ApplicationEventName;
(function (ApplicationEventName) {
    ApplicationEventName["USER_SIGNED_IN"] = "user.signed.in";
    ApplicationEventName["USER_PASSWORD_RESET"] = "user.password.reset";
    ApplicationEventName["USER_EMAIL_VERIFIED"] = "user.email.verified";
    ApplicationEventName["CLASSROOM_ROLE_CREATED"] = "classroom.role.created";
    ApplicationEventName["CLASSROOM_ROLE_DELETED"] = "classroom.role.deleted";
    ApplicationEventName["CLASSROOM_ROLE_UPDATED"] = "classroom.role.updated";
})(ApplicationEventName || (exports.ApplicationEventName = ApplicationEventName = {}));
const BaseAuditEventProps = Object.assign(Object.assign({}, shared_1.BaseModelSchema), { platformId: typebox_1.Type.String(), classroomId: typebox_1.Type.Optional(typebox_1.Type.String()), classroomDisplayName: typebox_1.Type.Optional(typebox_1.Type.String()), userId: typebox_1.Type.Optional(typebox_1.Type.String()), userEmail: typebox_1.Type.Optional(typebox_1.Type.String()), ip: typebox_1.Type.Optional(typebox_1.Type.String()) });
exports.AuthenticationEvent = typebox_1.Type.Object(Object.assign(Object.assign({}, BaseAuditEventProps), { action: typebox_1.Type.Union([
        typebox_1.Type.Literal(ApplicationEventName.USER_SIGNED_IN),
        typebox_1.Type.Literal(ApplicationEventName.USER_PASSWORD_RESET),
        typebox_1.Type.Literal(ApplicationEventName.USER_EMAIL_VERIFIED),
    ]), data: typebox_1.Type.Object({
        user: typebox_1.Type.Optional(UserMeta),
    }) }));
exports.ClassroomRoleEvent = typebox_1.Type.Object(Object.assign(Object.assign({}, BaseAuditEventProps), { action: typebox_1.Type.Union([
        typebox_1.Type.Literal(ApplicationEventName.CLASSROOM_ROLE_CREATED),
        typebox_1.Type.Literal(ApplicationEventName.CLASSROOM_ROLE_UPDATED),
        typebox_1.Type.Literal(ApplicationEventName.CLASSROOM_ROLE_DELETED),
    ]), data: typebox_1.Type.Object({
        classroomRole: typebox_1.Type.Pick(shared_1.ClassroomRole, [
            'id',
            'created',
            'updated',
            'name',
            'permissions',
            'platformId',
        ]),
    }) }));
exports.ApplicationEvent = typebox_1.Type.Union([
    exports.AuthenticationEvent,
    exports.ClassroomRoleEvent,
]);
function summarizeApplicationEvent(event) {
    switch (event.action) {
        case ApplicationEventName.USER_SIGNED_IN:
            return `User ${event.userEmail} signed in`;
        case ApplicationEventName.USER_PASSWORD_RESET:
            return `User ${event.userEmail} reset password`;
        case ApplicationEventName.USER_EMAIL_VERIFIED:
            return `User ${event.userEmail} verified email`;
        case ApplicationEventName.CLASSROOM_ROLE_CREATED:
            return `${event.data.classroomRole.name} is created`;
        case ApplicationEventName.CLASSROOM_ROLE_UPDATED:
            return `${event.data.classroomRole.name} is updated`;
        case ApplicationEventName.CLASSROOM_ROLE_DELETED:
            return `${event.data.classroomRole.name} is deleted`;
    }
}


/***/ }),
/* 61 */
/***/ ((module) => {

module.exports = require("@sinclair/typebox/system");

/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedSystemProp = exports.AppSystemProp = void 0;
var AppSystemProp;
(function (AppSystemProp) {
    AppSystemProp["DB_TYPE"] = "DB_TYPE";
    AppSystemProp["ENCRYPTION_KEY"] = "ENCRYPTION_KEY";
    AppSystemProp["JWT_SECRET"] = "JWT_SECRET";
    AppSystemProp["MAX_FILE_SIZE_MB"] = "MAX_FILE_SIZE_MB";
    AppSystemProp["FIREBASE_HASH_PARAMETERS"] = "FIREBASE_HASH_PARAMETERS";
    AppSystemProp["LICENSE_KEY"] = "LICENSE_KEY";
    AppSystemProp["POSTGRES_DATABASE"] = "POSTGRES_DATABASE";
    AppSystemProp["POSTGRES_HOST"] = "POSTGRES_HOST";
    AppSystemProp["POSTGRES_PASSWORD"] = "POSTGRES_PASSWORD";
    AppSystemProp["POSTGRES_PORT"] = "POSTGRES_PORT";
    AppSystemProp["POSTGRES_SSL_CA"] = "POSTGRES_SSL_CA";
    AppSystemProp["POSTGRES_URL"] = "POSTGRES_URL";
    AppSystemProp["POSTGRES_USERNAME"] = "POSTGRES_USERNAME";
    AppSystemProp["POSTGRES_USE_SSL"] = "POSTGRES_USE_SSL";
    AppSystemProp["EDITION"] = "EDITION";
    AppSystemProp["API_RATE_LIMIT_AUTHN_MAX"] = "API_RATE_LIMIT_AUTHN_MAX";
    AppSystemProp["API_RATE_LIMIT_AUTHN_WINDOW"] = "API_RATE_LIMIT_AUTHN_WINDOW";
    AppSystemProp["API_RATE_LIMIT_AUTHN_ENABLED"] = "API_RATE_LIMIT_AUTHN_ENABLED";
    AppSystemProp["SMTP_SENDER_NAME"] = "SMTP_SENDER_NAME";
    AppSystemProp["SMTP_SENDER_EMAIL"] = "SMTP_SENDER_EMAIL";
    AppSystemProp["SMTP_HOST"] = "SMTP_HOST";
    AppSystemProp["SMTP_PORT"] = "SMTP_PORT";
    AppSystemProp["SMTP_USERNAME"] = "SMTP_USERNAME";
    AppSystemProp["SMTP_PASSWORD"] = "SMTP_PASSWORD";
    AppSystemProp["SHOW_PLATFORM_DEMO"] = "SHOW_PLATFORM_DEMO";
})(AppSystemProp || (exports.AppSystemProp = AppSystemProp = {}));
var SharedSystemProp;
(function (SharedSystemProp) {
    SharedSystemProp["LOG_LEVEL"] = "LOG_LEVEL";
    SharedSystemProp["LOG_PRETTY"] = "LOG_PRETTY";
    SharedSystemProp["ENVIRONMENT"] = "ENVIRONMENT";
    SharedSystemProp["FRONTEND_URL"] = "FRONTEND_URL";
    SharedSystemProp["CONTAINER_TYPE"] = "CONTAINER_TYPE";
    SharedSystemProp["EMAIL_AUTH_ENABLED"] = "EMAIL_AUTH_ENABLED";
    // Cloud Only & Enterprise Only
    SharedSystemProp["SENTRY_DSN"] = "SENTRY_DSN";
    SharedSystemProp["LOKI_PASSWORD"] = "LOKI_PASSWORD";
    SharedSystemProp["LOKI_URL"] = "LOKI_URL";
    SharedSystemProp["LOKI_USERNAME"] = "LOKI_USERNAME";
})(SharedSystemProp || (exports.SharedSystemProp = SharedSystemProp = {}));


/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.enrichErrorContext = exports.exceptionHandler = void 0;
const tslib_1 = __webpack_require__(1);
const Sentry = tslib_1.__importStar(__webpack_require__(64));
let sentryInitialized = false;
exports.exceptionHandler = {
    initializeSentry: (sentryDsn) => {
        if (!sentryDsn) {
            return;
        }
        sentryInitialized = true;
        Sentry.init({
            dsn: sentryDsn,
            beforeSend: (event) => {
                var _a, _b, _c, _d, _e;
                if (((_b = (_a = event === null || event === void 0 ? void 0 : event.exception) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b[0].type) === 'AxiosError') {
                    return null;
                }
                const value = (_e = (_d = (_c = event === null || event === void 0 ? void 0 : event.exception) === null || _c === void 0 ? void 0 : _c.values) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.value;
                if (value && ['EXECUTION_TIMEOUT', 'ENTITY_NOT_FOUND'].includes(value)) {
                    return null;
                }
                return event;
            },
        });
    },
    handle: (e) => {
        if (sentryInitialized) {
            Sentry.captureException(e);
        }
    },
};
const enrichErrorContext = ({ error, key, value, }) => {
    if (error instanceof Error) {
        if ('context' in error && error.context instanceof Object) {
            const enrichedError = Object.assign(error, Object.assign(Object.assign({}, error.context), { [key]: value }));
            return enrichedError;
        }
        else {
            const enrichedError = Object.assign(error, {
                context: {
                    [key]: value,
                },
            });
            return enrichedError;
        }
    }
    return error;
};
exports.enrichErrorContext = enrichErrorContext;


/***/ }),
/* 64 */
/***/ ((module) => {

module.exports = require("@sentry/node");

/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cryptoUtils = void 0;
const tslib_1 = __webpack_require__(1);
const node_crypto_1 = __webpack_require__(66);
const node_util_1 = __webpack_require__(67);
const randomBytesPromisified = (0, node_util_1.promisify)(node_crypto_1.randomBytes);
const generateRandomPassword = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const passwordBytes = yield randomBytesPromisified(32);
    return passwordBytes.toString('hex');
});
function hashSHA256(input) {
    const hash = (0, node_crypto_1.createHash)('sha256');
    hash.update(input);
    return hash.digest('hex');
}
exports.cryptoUtils = {
    generateRandomPassword,
    hashSHA256,
};


/***/ }),
/* 66 */
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),
/* 67 */
/***/ ((module) => {

module.exports = require("node:util");

/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApSemaphore = void 0;
const tslib_1 = __webpack_require__(1);
class ApSemaphore {
    constructor(maxConcurrent) {
        this.maxConcurrent = maxConcurrent;
        this.queue = [];
        this.currentConcurrent = 0;
    }
    acquire() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.currentConcurrent >= this.maxConcurrent) {
                yield new Promise((resolve) => this.queue.push(resolve));
            }
            this.currentConcurrent++;
        });
    }
    release() {
        this.currentConcurrent--;
        if (this.queue.length > 0) {
            const nextResolver = this.queue.shift();
            nextResolver === null || nextResolver === void 0 ? void 0 : nextResolver();
        }
    }
}
exports.ApSemaphore = ApSemaphore;


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rejectedPromiseHandler = rejectedPromiseHandler;
const logger_1 = __webpack_require__(70);
function rejectedPromiseHandler(promise) {
    promise.catch((error) => {
        logger_1.logger.error(error);
    });
}


/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logger = void 0;
const tslib_1 = __webpack_require__(1);
const pino_1 = tslib_1.__importDefault(__webpack_require__(71));
__webpack_require__(72);
const system_1 = __webpack_require__(9);
const system_prop_1 = __webpack_require__(62);
const lokiUrl = system_1.system.get(system_prop_1.SharedSystemProp.LOKI_URL);
const lokiUsername = system_1.system.get(system_prop_1.SharedSystemProp.LOKI_USERNAME);
const lokiPassword = system_1.system.get(system_prop_1.SharedSystemProp.LOKI_PASSWORD);
const initLogger = () => {
    var _a, _b;
    const level = (_a = system_1.system.get(system_prop_1.SharedSystemProp.LOG_LEVEL)) !== null && _a !== void 0 ? _a : 'info';
    const pretty = (_b = system_1.system.getBoolean(system_prop_1.SharedSystemProp.LOG_PRETTY)) !== null && _b !== void 0 ? _b : false;
    if (pretty) {
        return (0, pino_1.default)({
            level,
            transport: {
                target: 'pino-pretty',
                options: {
                    translateTime: 'HH:MM:ss Z',
                    colorize: true,
                    ignore: 'pid,hostname',
                },
            },
        });
    }
    const targets = [
        {
            target: 'pino/file',
            level,
            options: {},
        },
    ];
    if (lokiUrl) {
        targets.push({
            target: 'pino-loki',
            level,
            options: {
                batching: true,
                interval: 5,
                host: lokiUrl,
                basicAuth: lokiPassword && lokiPassword
                    ? {
                        username: lokiUsername,
                        password: lokiPassword,
                    }
                    : undefined,
            },
        });
    }
    return (0, pino_1.default)({ level, transport: { targets } });
};
exports.logger = initLogger();


/***/ }),
/* 71 */
/***/ ((module) => {

module.exports = require("pino");

/***/ }),
/* 72 */
/***/ ((module) => {

module.exports = require("pino-loki");

/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exec = void 0;
const node_child_process_1 = __webpack_require__(74);
const node_util_1 = __webpack_require__(67);
exports.exec = (0, node_util_1.promisify)(node_child_process_1.exec);


/***/ }),
/* 74 */
/***/ ((module) => {

module.exports = require("node:child_process");

/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupApp = void 0;
exports.appPostBoot = appPostBoot;
const tslib_1 = __webpack_require__(1);
const shared_1 = __webpack_require__(10);
const server_shared_1 = __webpack_require__(2);
const swagger_1 = tslib_1.__importDefault(__webpack_require__(76));
const fastify_socket_io_1 = tslib_1.__importDefault(__webpack_require__(77));
const access_token_manager_1 = __webpack_require__(78);
const security_handler_chain_1 = __webpack_require__(82);
const websockets_service_1 = __webpack_require__(89);
const openapi_module_1 = __webpack_require__(90);
const system_validator_1 = __webpack_require__(92);
const setupApp = (app) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield app.register(swagger_1.default, {
        hideUntagged: true,
        openapi: {
            servers: [
                {
                    url: 'https://cloud.activepieces.com/api',
                    description: 'Production Server',
                },
            ],
            components: {
                securitySchemes: {
                    apiKey: {
                        type: 'http',
                        description: 'Use your api key generated from the admin console',
                        scheme: 'bearer',
                    },
                },
                schemas: {
                    [shared_1.ApplicationEventName.USER_SIGNED_IN]: shared_1.AuthenticationEvent,
                    [shared_1.ApplicationEventName.USER_PASSWORD_RESET]: shared_1.AuthenticationEvent,
                    [shared_1.ApplicationEventName.USER_EMAIL_VERIFIED]: shared_1.AuthenticationEvent,
                    [shared_1.ApplicationEventName.CLASSROOM_ROLE_CREATED]: shared_1.ClassroomRoleEvent,
                    [shared_1.ApplicationEventName.CLASSROOM_ROLE_DELETED]: shared_1.ClassroomRoleEvent,
                    [shared_1.ApplicationEventName.CLASSROOM_ROLE_UPDATED]: shared_1.ClassroomRoleEvent,
                },
            },
            info: {
                title: 'Activepieces Documentation',
                version: '0.0.0',
            },
            externalDocs: {
                url: 'https://www.activepieces.com/docs',
                description: 'Find more info here',
            },
        },
    });
    yield app.register(fastify_socket_io_1.default, {
        cors: {
            origin: '*',
        },
        transports: ['websocket'],
    });
    app.io.use((socket, next) => {
        access_token_manager_1.accessTokenManager
            .verifyPrincipal(socket.handshake.auth.token)
            .then(() => {
            next();
        })
            .catch(() => {
            next(new Error('Authentication error'));
        });
    });
    app.io.on('connection', (socket) => {
        (0, server_shared_1.rejectedPromiseHandler)(websockets_service_1.websocketService.init(socket));
    });
    app.addHook('onRequest', (request, reply) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const route = app.hasRoute({
            method: request.method,
            url: request.url,
        });
        if (!route) {
            return reply.code(404).send({
                statusCode: 404,
                error: 'Not Found',
                message: 'Route not found',
            });
        }
    }));
    app.addHook('preHandler', security_handler_chain_1.securityHandlerChain);
    yield app.register(openapi_module_1.openapiModule);
    app.get('/redirect', (request, reply) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const params = {
            code: request.query.code,
        };
        if (!params.code) {
            return reply.send('The code is missing in url');
        }
        else {
            return reply
                .type('text/html')
                .send(`<script>if(window.opener){window.opener.postMessage({ 'code': '${encodeURIComponent(params.code)}' },'*')}</script> <html>Redirect succuesfully, this window should close now</html>`);
        }
    }));
    yield (0, system_validator_1.validateEnvPropsOnStartup)();
    const edition = server_shared_1.system.getEdition();
    server_shared_1.logger.info({
        edition,
    }, 'Activepieces Edition');
    switch (edition) {
        case shared_1.PuEdition.COMMUNITY:
            break;
        case shared_1.PuEdition.ENTERPRISE:
            break;
    }
    app.addHook('onClose', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        server_shared_1.logger.info('Shutting down');
    }));
    return app;
});
exports.setupApp = setupApp;
function appPostBoot() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        server_shared_1.logger.info(`

    ░█▀█░▀█▀░█▀▀░█░█░█░█░█▀█
    ░█▀▀░░█░░█░░░█▀▄░█░█░█▀▀
    ░▀░░░▀▀▀░▀▀▀░▀░▀░▀▀▀░▀░░

    ==========================================
    The application started on ${server_shared_1.system.get(server_shared_1.SharedSystemProp.FRONTEND_URL)}
    ==========================================`);
        const environment = server_shared_1.system.get(server_shared_1.SharedSystemProp.ENVIRONMENT);
        if (environment === shared_1.PuEnvironment.DEVELOPMENT) {
            server_shared_1.logger.warn(`[WARNING]: The application is running in ${environment} mode.`);
        }
        // const oldestPlatform = await platformService.getOldestPlatform()
        // const key = system.get<string>(AppSystemProp.LICENSE_KEY)
        // if (!isNil(oldestPlatform) && !isNil(key)) {
        //     await platformService.update({
        //         id: oldestPlatform.id,
        //         licenseKey: key,
        //     })
        // }
    });
}


/***/ }),
/* 76 */
/***/ ((module) => {

module.exports = require("@fastify/swagger");

/***/ }),
/* 77 */
/***/ ((module) => {

module.exports = require("fastify-socket.io");

/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.accessTokenManager = void 0;
const tslib_1 = __webpack_require__(1);
const shared_1 = __webpack_require__(10);
const dayjs_1 = tslib_1.__importDefault(__webpack_require__(79));
const jwt_utils_1 = __webpack_require__(80);
exports.accessTokenManager = {
    generateToken(principal_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function* (principal, expiresInSeconds = dayjs_1.default.duration(7, 'day').asSeconds()) {
            const secret = yield jwt_utils_1.jwtUtils.getJwtSecret();
            return jwt_utils_1.jwtUtils.sign({
                payload: principal,
                key: secret,
                expiresInSeconds,
            });
        });
    },
    verifyPrincipal(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const secret = yield jwt_utils_1.jwtUtils.getJwtSecret();
            try {
                const decoded = yield jwt_utils_1.jwtUtils.decodeAndVerify({
                    jwt: token,
                    key: secret,
                });
                (0, shared_1.assertNotNullOrUndefined)(decoded.type, 'decoded.type');
                yield assertUserSession(decoded);
                return decoded;
            }
            catch (e) {
                if (e instanceof shared_1.PickUpError) {
                    throw e;
                }
                throw new shared_1.PickUpError({
                    code: shared_1.ErrorCode.INVALID_BEARER_TOKEN,
                    params: {
                        message: 'invalid access token or session expired',
                    },
                });
            }
        });
    },
};
function assertUserSession(decoded) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (decoded.type !== shared_1.PrincipalType.USER)
            return;
        // const user = await userService.getOneOrFail({ id: decoded.id })
        // const identity = await userIdentityService(system.globalLogger()).getOneOrFail({ id: user.identityId })
        // const isExpired = (identity.tokenVersion ?? null) !== (decoded.tokenVersion ?? null)
        // if (isExpired || user.status === UserStatus.INACTIVE || !identity.verified) {
        //     throw new ActivepiecesError({
        //         code: ErrorCode.SESSION_EXPIRED,
        //         params: {
        //             message: 'The session has expired or the user is not verified.',
        //         },
        //     })
        // }
    });
}
// type GenerateEngineTokenParams = {
//     projectId: ProjectId
//     queueToken?: string
//     jobId?: string
//     platformId: PlatformId
// }


/***/ }),
/* 79 */
/***/ ((module) => {

module.exports = require("dayjs");

/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jwtUtils = exports.JwtSignAlgorithm = void 0;
const tslib_1 = __webpack_require__(1);
const server_shared_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(10);
const jsonwebtoken_1 = tslib_1.__importDefault(__webpack_require__(81));
var JwtSignAlgorithm;
(function (JwtSignAlgorithm) {
    JwtSignAlgorithm["HS256"] = "HS256";
    JwtSignAlgorithm["RS256"] = "RS256";
})(JwtSignAlgorithm || (exports.JwtSignAlgorithm = JwtSignAlgorithm = {}));
const ONE_WEEK = 7 * 24 * 3600;
const KEY_ID = '1';
const ISSUER = 'activepieces';
const ALGORITHM = JwtSignAlgorithm.HS256;
let secret = null;
const getSecret = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (secret !== null) {
        return secret;
    }
    secret = (_a = server_shared_1.system.get(server_shared_1.AppSystemProp.JWT_SECRET)) !== null && _a !== void 0 ? _a : null;
    if ((0, shared_1.isNil)(secret)) {
        throw new shared_1.PickUpError({
            code: shared_1.ErrorCode.SYSTEM_PROP_INVALID,
            params: {
                prop: server_shared_1.AppSystemProp.JWT_SECRET,
            },
        }, `System property PICKUP_${server_shared_1.AppSystemProp.JWT_SECRET} must be defined`);
    }
    return secret;
});
exports.jwtUtils = {
    sign(_a) {
        return tslib_1.__awaiter(this, arguments, void 0, function* ({ payload, key, expiresInSeconds = ONE_WEEK, keyId = KEY_ID, algorithm = ALGORITHM, }) {
            const signOptions = {
                algorithm,
                keyid: keyId,
                expiresIn: expiresInSeconds,
                issuer: ISSUER,
            };
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.sign(payload, key, signOptions, (err, token) => {
                    if (err) {
                        return reject(err);
                    }
                    if ((0, shared_1.isNil)(token)) {
                        return reject(new shared_1.PickUpError({
                            code: shared_1.ErrorCode.INVALID_BEARER_TOKEN,
                            params: {},
                        }));
                    }
                    return resolve(token);
                });
            });
        });
    },
    getJwtSecret: getSecret,
    decodeAndVerify(_a) {
        return tslib_1.__awaiter(this, arguments, void 0, function* ({ jwt, key, algorithm = ALGORITHM, issuer = ISSUER, audience, }) {
            const verifyOptions = Object.assign(Object.assign({ algorithms: [algorithm] }, (0, shared_1.spreadIfDefined)('issuer', issuer)), (0, shared_1.spreadIfDefined)('audience', audience));
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(jwt, key, verifyOptions, (err, payload) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(payload);
                }));
            });
        });
    },
    decode({ jwt }) {
        const decodeOptions = {
            complete: true,
        };
        return jsonwebtoken_1.default.decode(jwt, decodeOptions);
    },
};


/***/ }),
/* 81 */
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.securityHandlerChain = void 0;
const tslib_1 = __webpack_require__(1);
const access_token_authn_handler_1 = __webpack_require__(83);
const anonymous_authn_handler_1 = __webpack_require__(85);
const principal_type_authz_handler_1 = __webpack_require__(86);
const project_authz_handler_1 = __webpack_require__(87);
const AUTHN_HANDLERS = [
    new access_token_authn_handler_1.AccessTokenAuthnHandler(),
    new anonymous_authn_handler_1.AnonymousAuthnHandler(),
];
const AUTHZ_HANDLERS = [
    new principal_type_authz_handler_1.PrincipalTypeAuthzHandler(),
    new project_authz_handler_1.ProjectAuthzHandler(),
];
const securityHandlerChain = (request) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield executeAuthnHandlers(request);
    yield executeAuthzHandlers(request);
});
exports.securityHandlerChain = securityHandlerChain;
/**
 * Executes authn handlers in order, if one of the handlers populates the principal,
 * the remaining handlers are skipped.
 */
const executeAuthnHandlers = (request) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    for (const handler of AUTHN_HANDLERS) {
        yield handler.handle(request);
        const principalPopulated = checkWhetherPrincipalIsPopulated(request);
        if (principalPopulated) {
            return;
        }
    }
});
const executeAuthzHandlers = (request) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    for (const handler of AUTHZ_HANDLERS) {
        yield handler.handle(request);
    }
});
const checkWhetherPrincipalIsPopulated = (request) => {
    const principal = request.principal;
    return principal !== undefined;
};


/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccessTokenAuthnHandler = void 0;
const tslib_1 = __webpack_require__(1);
const shared_1 = __webpack_require__(10);
const security_handler_1 = __webpack_require__(84);
const access_token_manager_1 = __webpack_require__(78);
class AccessTokenAuthnHandler extends security_handler_1.BaseSecurityHandler {
    canHandle(request) {
        var _a;
        const header = request.headers[AccessTokenAuthnHandler.HEADER_NAME];
        const prefix = AccessTokenAuthnHandler.HEADER_PREFIX;
        const routeMatches = (_a = header === null || header === void 0 ? void 0 : header.startsWith(prefix)) !== null && _a !== void 0 ? _a : false;
        const skipAuth = request.routeConfig.skipAuth;
        return Promise.resolve(routeMatches && !skipAuth);
    }
    doHandle(request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const accessToken = this.extractAccessTokenOrThrow(request);
            const principal = yield access_token_manager_1.accessTokenManager.verifyPrincipal(accessToken);
            request.principal = principal;
        });
    }
    extractAccessTokenOrThrow(request) {
        const header = request.headers[AccessTokenAuthnHandler.HEADER_NAME];
        const prefix = AccessTokenAuthnHandler.HEADER_PREFIX;
        const accessToken = header === null || header === void 0 ? void 0 : header.substring(prefix.length);
        if ((0, shared_1.isNil)(accessToken)) {
            throw new shared_1.PickUpError({
                code: shared_1.ErrorCode.AUTHENTICATION,
                params: {
                    message: 'missing access token',
                },
            });
        }
        return accessToken;
    }
}
exports.AccessTokenAuthnHandler = AccessTokenAuthnHandler;
AccessTokenAuthnHandler.HEADER_NAME = 'authorization';
AccessTokenAuthnHandler.HEADER_PREFIX = 'Bearer ';


/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseSecurityHandler = void 0;
const tslib_1 = __webpack_require__(1);
class BaseSecurityHandler {
    handle(request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (yield this.canHandle(request)) {
                yield this.doHandle(request);
            }
        });
    }
}
exports.BaseSecurityHandler = BaseSecurityHandler;


/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnonymousAuthnHandler = void 0;
const shared_1 = __webpack_require__(10);
const security_handler_1 = __webpack_require__(84);
class AnonymousAuthnHandler extends security_handler_1.BaseSecurityHandler {
    canHandle(_request) {
        return Promise.resolve(true);
    }
    doHandle(request) {
        const principal = request.principal;
        if ((0, shared_1.isNil)(principal)) {
            request.principal = {
                id: `ANONYMOUS_${(0, shared_1.puId)()}`,
                type: shared_1.PrincipalType.UNKNOWN,
                classroomId: `ANONYMOUS_${(0, shared_1.puId)()}`,
                platform: {
                    id: `ANONYMOUS_${(0, shared_1.puId)()}`,
                },
            };
        }
        return Promise.resolve();
    }
}
exports.AnonymousAuthnHandler = AnonymousAuthnHandler;


/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrincipalTypeAuthzHandler = void 0;
const shared_1 = __webpack_require__(10);
const security_handler_1 = __webpack_require__(84);
class PrincipalTypeAuthzHandler extends security_handler_1.BaseSecurityHandler {
    canHandle(request) {
        const requestMatches = !PrincipalTypeAuthzHandler.IGNORED_ROUTES.includes(request.routerPath) &&
            !request.routerPath.startsWith('/ui');
        return Promise.resolve(requestMatches);
    }
    doHandle(request) {
        const principalType = request.principal.type;
        const configuredPrincipals = request.routeConfig.allowedPrincipals;
        const defaultPrincipals = PrincipalTypeAuthzHandler.DEFAULT_ALLOWED_PRINCIPAL_TYPES;
        const allowedPrincipals = configuredPrincipals !== null && configuredPrincipals !== void 0 ? configuredPrincipals : defaultPrincipals;
        const principalTypeNotAllowed = !allowedPrincipals.includes(principalType);
        if (principalTypeNotAllowed) {
            throw new shared_1.PickUpError({
                code: shared_1.ErrorCode.AUTHORIZATION,
                params: {
                    message: 'invalid route for principal type',
                },
            });
        }
        return Promise.resolve();
    }
}
exports.PrincipalTypeAuthzHandler = PrincipalTypeAuthzHandler;
PrincipalTypeAuthzHandler.IGNORED_ROUTES = [
    '/favicon.ico',
    '/v1/docs',
    '/redirect',
];
PrincipalTypeAuthzHandler.DEFAULT_ALLOWED_PRINCIPAL_TYPES = [
    shared_1.PrincipalType.USER,
    shared_1.PrincipalType.SERVICE,
];


/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectAuthzHandler = void 0;
const shared_1 = __webpack_require__(10);
const request_utils_1 = __webpack_require__(88);
const security_handler_1 = __webpack_require__(84);
class ProjectAuthzHandler extends security_handler_1.BaseSecurityHandler {
    canHandle(request) {
        const requestMatches = !ProjectAuthzHandler.IGNORED_ROUTES.includes(request.routerPath);
        return Promise.resolve(requestMatches);
    }
    doHandle(request) {
        const classroomId = request_utils_1.requestUtils.extractClassroomId(request);
        if (classroomId && classroomId !== request.principal.classroomId) {
            throw new shared_1.PickUpError({
                code: shared_1.ErrorCode.AUTHORIZATION,
                params: {
                    message: 'invalid classroom id',
                },
            });
        }
        return Promise.resolve();
    }
}
exports.ProjectAuthzHandler = ProjectAuthzHandler;
ProjectAuthzHandler.IGNORED_ROUTES = [
    '/v1/users/classrooms/:classroomId/token',
    // This works for both platform and project, we have to check this manually
    '/v1/user-invitations',
];


/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.requestUtils = void 0;
const shared_1 = __webpack_require__(10);
exports.requestUtils = {
    extractClassroomId(request) {
        if ((0, shared_1.isObject)(request.body) && 'classroomId' in request.body) {
            return request.body.classroomId;
        }
        else if ((0, shared_1.isObject)(request.query) && 'classroomId' in request.query) {
            return request.query.classroomId;
        }
        return undefined;
    },
};


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.websocketService = void 0;
const tslib_1 = __webpack_require__(1);
const access_token_manager_1 = __webpack_require__(78);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const listener = {};
exports.websocketService = {
    init(socket) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const principal = yield access_token_manager_1.accessTokenManager.verifyPrincipal(socket.handshake.auth.token);
            yield socket.join(principal.classroomId);
            for (const [event, handler] of Object.entries(listener)) {
                socket.on(event, handler(socket));
            }
        });
    },
};


/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.openapiModule = void 0;
const tslib_1 = __webpack_require__(1);
const openapi_controller_1 = __webpack_require__(91);
const openapiModule = (app) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield app.register(openapi_controller_1.openapiController, { prefix: '/v1/docs' });
});
exports.openapiModule = openapiModule;


/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.openapiController = void 0;
const tslib_1 = __webpack_require__(1);
const openapiController = (fastify) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    fastify.get('/', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        return JSON.stringify(fastify.swagger(), null, 2);
    }));
});
exports.openapiController = openapiController;


/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateEnvPropsOnStartup = void 0;
const tslib_1 = __webpack_require__(1);
const server_shared_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(10);
const jwt_utils_1 = __webpack_require__(80);
function enumValidator(enumValues) {
    return (value) => {
        const isValid = enumValues.includes(value);
        return isValid ? true : `Value must be one of: ${enumValues.join(', ')}`;
    };
}
function booleanValidator(value) {
    const isValid = value === 'true' || value === 'false';
    return isValid ? true : 'Value must be either "true" or "false"';
}
function numberValidator(value) {
    const isValid = !(0, shared_1.isNil)(value) && !Number.isNaN(Number(value));
    return isValid ? true : 'Value must be a valid number';
}
function stringValidator(value) {
    const isValid = typeof value === 'string' && value.length > 0;
    return isValid ? true : 'Value must be a non-empty string';
}
function urlValidator(value) {
    try {
        new URL(value);
        return true;
    }
    catch (_a) {
        return 'Value must be a valid URL';
    }
}
const systemPropValidators = {
    // SharedSystemProp
    [server_shared_1.SharedSystemProp.LOG_LEVEL]: enumValidator(['error', 'warn', 'info', 'debug', 'trace']),
    [server_shared_1.SharedSystemProp.LOG_PRETTY]: booleanValidator,
    [server_shared_1.SharedSystemProp.ENVIRONMENT]: enumValidator(Object.values(shared_1.PuEnvironment)),
    [server_shared_1.SharedSystemProp.FRONTEND_URL]: urlValidator,
    [server_shared_1.SharedSystemProp.SENTRY_DSN]: urlValidator,
    [server_shared_1.SharedSystemProp.LOKI_PASSWORD]: stringValidator,
    [server_shared_1.SharedSystemProp.LOKI_URL]: urlValidator,
    [server_shared_1.SharedSystemProp.LOKI_USERNAME]: stringValidator,
    [server_shared_1.SharedSystemProp.EMAIL_AUTH_ENABLED]: booleanValidator,
    [server_shared_1.SharedSystemProp.CONTAINER_TYPE]: enumValidator(Object.values(server_shared_1.ContainerType)),
    // AppSystemProp
    [server_shared_1.AppSystemProp.DB_TYPE]: enumValidator(Object.values(server_shared_1.DatabaseType)),
    [server_shared_1.AppSystemProp.ENCRYPTION_KEY]: stringValidator,
    [server_shared_1.AppSystemProp.JWT_SECRET]: stringValidator,
    [server_shared_1.AppSystemProp.LICENSE_KEY]: stringValidator,
    [server_shared_1.AppSystemProp.POSTGRES_DATABASE]: stringValidator,
    [server_shared_1.AppSystemProp.POSTGRES_HOST]: stringValidator,
    [server_shared_1.AppSystemProp.POSTGRES_PASSWORD]: stringValidator,
    [server_shared_1.AppSystemProp.POSTGRES_PORT]: numberValidator,
    [server_shared_1.AppSystemProp.POSTGRES_SSL_CA]: stringValidator,
    [server_shared_1.AppSystemProp.POSTGRES_URL]: stringValidator,
    [server_shared_1.AppSystemProp.POSTGRES_USERNAME]: stringValidator,
    [server_shared_1.AppSystemProp.POSTGRES_USE_SSL]: booleanValidator,
    [server_shared_1.AppSystemProp.EDITION]: enumValidator(Object.values(shared_1.PuEdition)),
    [server_shared_1.AppSystemProp.FIREBASE_HASH_PARAMETERS]: stringValidator,
    [server_shared_1.AppSystemProp.API_RATE_LIMIT_AUTHN_MAX]: numberValidator,
    [server_shared_1.AppSystemProp.API_RATE_LIMIT_AUTHN_WINDOW]: stringValidator,
    [server_shared_1.AppSystemProp.API_RATE_LIMIT_AUTHN_ENABLED]: booleanValidator,
    [server_shared_1.AppSystemProp.MAX_FILE_SIZE_MB]: numberValidator,
    [server_shared_1.AppSystemProp.SMTP_SENDER_NAME]: stringValidator,
    [server_shared_1.AppSystemProp.SMTP_SENDER_EMAIL]: stringValidator,
    [server_shared_1.AppSystemProp.SMTP_HOST]: stringValidator,
    [server_shared_1.AppSystemProp.SMTP_PASSWORD]: stringValidator,
    [server_shared_1.AppSystemProp.SMTP_PORT]: numberValidator,
    [server_shared_1.AppSystemProp.SMTP_USERNAME]: stringValidator,
    [server_shared_1.AppSystemProp.SHOW_PLATFORM_DEMO]: booleanValidator,
};
const validateSystemPropTypes = () => {
    const systemProperties = [...Object.values(server_shared_1.SharedSystemProp), ...Object.values(server_shared_1.AppSystemProp)];
    const errors = {};
    for (const prop of systemProperties) {
        const value = server_shared_1.system.get(prop);
        const onlyValidateIfValueIsSet = !(0, shared_1.isNil)(value);
        if (onlyValidateIfValueIsSet) {
            const validationResult = systemPropValidators[prop](value);
            if (validationResult !== true) {
                errors[prop] = `Current value: ${value}. Expected: ${validationResult}`;
            }
        }
    }
    return errors;
};
const validateEnvPropsOnStartup = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const errors = validateSystemPropTypes();
    if (Object.keys(errors).length > 0) {
        server_shared_1.logger.warn({
            errors,
        }, '[validateEnvPropsOnStartup]');
    }
    const jwtSecret = yield jwt_utils_1.jwtUtils.getJwtSecret();
    if ((0, shared_1.isNil)(jwtSecret)) {
        throw new Error(JSON.stringify({
            message: 'PU_JWT_SECRET is undefined, please define it in the environment variables',
            docUrl: 'https://www.activepieces.com/docs/install/configuration/environment-variables',
        }));
    }
});
exports.validateEnvPropsOnStartup = validateEnvPropsOnStartup;


/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.databaseConnection = exports.commonProperties = void 0;
exports.APArrayContains = APArrayContains;
const server_shared_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(10);
const typeorm_1 = __webpack_require__(94);
const otp_entity_1 = __webpack_require__(95);
const postgres_connection_1 = __webpack_require__(97);
function getEntities() {
    const edition = server_shared_1.system.getEdition();
    const entities = [];
    switch (edition) {
        case shared_1.PuEdition.ENTERPRISE:
            entities.push(otp_entity_1.OtpEntity);
            break;
        case shared_1.PuEdition.COMMUNITY:
            break;
        default:
            throw new Error(`Unsupported edition: ${edition}`);
    }
    return entities;
}
const getSynchronize = () => {
    const env = server_shared_1.system.getOrThrow(server_shared_1.SharedSystemProp.ENVIRONMENT);
    return env !== shared_1.PuEnvironment.DEVELOPMENT;
};
exports.commonProperties = {
    subscribers: [],
    entities: getEntities(),
    synchronize: getSynchronize(),
};
let _databaseConnection = null;
const databaseConnection = () => {
    if ((0, shared_1.isNil)(_databaseConnection)) {
        _databaseConnection = (0, postgres_connection_1.createPostgresDataSource)();
    }
    return _databaseConnection;
};
exports.databaseConnection = databaseConnection;
function APArrayContains(columnName, values, query) {
    const databaseType = server_shared_1.system.get(server_shared_1.AppSystemProp.DB_TYPE);
    switch (databaseType) {
        case server_shared_1.DatabaseType.POSTGRES:
            return query.andWhere({
                [columnName]: (0, typeorm_1.ArrayContains)(values),
            });
        case server_shared_1.DatabaseType.SQLITE3: {
            const likeConditions = values
                .map((tag, index) => `flow_run.tags LIKE :tag${index}`)
                .join(' AND ');
            const likeParams = values.reduce((params, tag, index) => {
                return Object.assign(Object.assign({}, params), { [`tag${index}`]: `%${tag}%` });
            }, {});
            return query.andWhere(likeConditions, likeParams);
        }
        default:
            throw new Error(`Unsupported database type: ${databaseType}`);
    }
}
// Uncomment the below line when running `nx db-migration server-api name=<MIGRATION_NAME>` and recomment it after the migration is generated
// export const exportedConnection = databaseConnection()


/***/ }),
/* 94 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OtpEntity = void 0;
const shared_1 = __webpack_require__(10);
const typeorm_1 = __webpack_require__(94);
const database_common_1 = __webpack_require__(96);
exports.OtpEntity = new typeorm_1.EntitySchema({
    name: 'otp',
    columns: Object.assign(Object.assign({}, database_common_1.BaseColumnSchemaPart), { type: {
            type: String,
            enum: shared_1.OtpType,
            nullable: false,
        }, userId: Object.assign(Object.assign({}, database_common_1.PuIdSchema), { nullable: false }), value: {
            type: String,
            nullable: false,
        }, state: {
            type: String,
            enum: shared_1.OtpState,
            nullable: false,
        } }),
    // indices: [
    //     {
    //         name: 'idx_otp_user_id_type',
    //         columns: ['userId', 'type'],
    //         unique: true,
    //     },
    // ],
    // relations: {
    //     user: {
    //         type: 'many-to-one',
    //         target: 'user',
    //         cascade: true,
    //         onDelete: 'CASCADE',
    //         joinColumn: {
    //             name: 'userId',
    //             foreignKeyConstraintName: 'fk_otp_user_id',
    //         },
    //     },
    // },
});


/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseColumnSchemaPart = exports.PuIdSchema = exports.COLLATION = exports.TIMESTAMP_COLUMN_TYPE = exports.ARRAY_COLUMN_TYPE = exports.BLOB_COLUMN_TYPE = exports.JSONB_COLUMN_TYPE = exports.JSON_COLUMN_TYPE = void 0;
exports.isPostgres = isPostgres;
exports.isNotOneOfTheseEditions = isNotOneOfTheseEditions;
const server_shared_1 = __webpack_require__(2);
const databaseType = server_shared_1.system.get(server_shared_1.AppSystemProp.DB_TYPE);
exports.JSON_COLUMN_TYPE = databaseType === server_shared_1.DatabaseType.SQLITE3 ? 'simple-json' : 'json';
exports.JSONB_COLUMN_TYPE = databaseType === server_shared_1.DatabaseType.SQLITE3 ? 'simple-json' : 'jsonb';
exports.BLOB_COLUMN_TYPE = databaseType === server_shared_1.DatabaseType.SQLITE3 ? 'blob' : 'bytea';
exports.ARRAY_COLUMN_TYPE = databaseType === server_shared_1.DatabaseType.SQLITE3 ? 'simple-array' : String;
exports.TIMESTAMP_COLUMN_TYPE = databaseType === server_shared_1.DatabaseType.SQLITE3
    ? 'datetime'
    : 'timestamp with time zone';
exports.COLLATION = databaseType === server_shared_1.DatabaseType.SQLITE3 ? undefined : 'en_natural';
function isPostgres() {
    return databaseType === server_shared_1.DatabaseType.POSTGRES;
}
exports.PuIdSchema = {
    type: String,
    length: 21,
};
exports.BaseColumnSchemaPart = {
    id: Object.assign(Object.assign({}, exports.PuIdSchema), { primary: true }),
    created: {
        name: 'created',
        type: exports.TIMESTAMP_COLUMN_TYPE,
        createDate: true,
    },
    updated: {
        name: 'updated',
        type: exports.TIMESTAMP_COLUMN_TYPE,
        updateDate: true,
    },
};
function isNotOneOfTheseEditions(editions) {
    return !editions.includes(server_shared_1.system.getEdition());
}


/***/ }),
/* 97 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createPostgresDataSource = void 0;
const server_shared_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(10);
const typeorm_1 = __webpack_require__(94);
const database_connection_1 = __webpack_require__(93);
const getSslConfig = () => {
    var _a;
    const useSsl = server_shared_1.system.get(server_shared_1.AppSystemProp.POSTGRES_USE_SSL);
    if (useSsl === 'true') {
        return {
            ca: (_a = server_shared_1.system.get(server_shared_1.AppSystemProp.POSTGRES_SSL_CA)) === null || _a === void 0 ? void 0 : _a.replace(/\\n/g, '\n'),
        };
    }
    return false;
};
const getMigrations = () => {
    const commonMigration = [];
    const edition = server_shared_1.system.getEdition();
    switch (edition) {
        case shared_1.PuEdition.ENTERPRISE:
            // Push enterprise migrations here
            break;
        case shared_1.PuEdition.COMMUNITY:
            // Push community migrations here
            break;
    }
    return [];
};
const getMigrationConfig = () => {
    const env = server_shared_1.system.getOrThrow(server_shared_1.SharedSystemProp.ENVIRONMENT);
    if (env === shared_1.PuEnvironment.TESTING) {
        return {};
    }
    return {
        migrationsRun: true,
        migrationsTransactionMode: 'each',
        migrations: getMigrations(),
    };
};
const createPostgresDataSource = () => {
    const migrationConfig = getMigrationConfig();
    const url = server_shared_1.system.get(server_shared_1.AppSystemProp.POSTGRES_URL);
    if (!(0, shared_1.isNil)(url)) {
        return new typeorm_1.DataSource(Object.assign(Object.assign({ type: 'postgres', url, ssl: getSslConfig() }, migrationConfig), database_connection_1.commonProperties));
    }
    const database = server_shared_1.system.getOrThrow(server_shared_1.AppSystemProp.POSTGRES_DATABASE);
    const host = server_shared_1.system.getOrThrow(server_shared_1.AppSystemProp.POSTGRES_HOST);
    const password = server_shared_1.system.getOrThrow(server_shared_1.AppSystemProp.POSTGRES_PASSWORD);
    const serializedPort = server_shared_1.system.getOrThrow(server_shared_1.AppSystemProp.POSTGRES_PORT);
    const port = Number.parseInt(serializedPort, 10);
    const username = server_shared_1.system.getOrThrow(server_shared_1.AppSystemProp.POSTGRES_USERNAME);
    return new typeorm_1.DataSource(Object.assign(Object.assign({ type: 'postgres', host,
        port,
        username,
        password,
        database, ssl: getSslConfig() }, migrationConfig), database_connection_1.commonProperties));
};
exports.createPostgresDataSource = createPostgresDataSource;


/***/ }),
/* 98 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.seedDevData = void 0;
const tslib_1 = __webpack_require__(1);
const server_shared_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(10);
const currentEnvIsNotDev = () => {
    const env = server_shared_1.system.get(server_shared_1.SharedSystemProp.ENVIRONMENT);
    return env !== shared_1.PuEnvironment.DEVELOPMENT;
};
const seedDevUser = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const DEV_EMAIL = 'dev@ap.com';
    const DEV_PASSWORD = '12345678';
    //TODO INSERT DEV USER
    // await authenticationService.signUp({
    //     email: DEV_EMAIL,
    //     password: DEV_PASSWORD,
    //     firstName: 'Dev',
    //     lastName: 'User',
    //     verified: true,
    //     platformId: null,
    // })
    server_shared_1.logger.info({ name: 'seedDevUser' }, `email=${DEV_EMAIL} pass=${DEV_PASSWORD}`);
});
const seedDevData = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (currentEnvIsNotDev()) {
        server_shared_1.logger.info({ name: 'seedDevData' }, 'skip: not in development environment');
        return;
    }
    yield seedDevUser();
});
exports.seedDevData = seedDevData;


/***/ }),
/* 99 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupServer = void 0;
const tslib_1 = __webpack_require__(1);
const cors_1 = tslib_1.__importDefault(__webpack_require__(100));
const formbody_1 = tslib_1.__importDefault(__webpack_require__(101));
const multipart_1 = tslib_1.__importDefault(__webpack_require__(102));
const fastify_1 = tslib_1.__importDefault(__webpack_require__(103));
const fastify_favicon_1 = tslib_1.__importDefault(__webpack_require__(104));
const fastify_raw_body_1 = __webpack_require__(105);
const qs_1 = tslib_1.__importDefault(__webpack_require__(106));
const app_1 = __webpack_require__(75);
const error_handler_1 = __webpack_require__(107);
const server_shared_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(10);
const MAX_FILE_SIZE_MB = server_shared_1.system.getNumberOrThrow(server_shared_1.AppSystemProp.MAX_FILE_SIZE_MB);
const setupServer = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const app = yield setupBaseApp();
    if (server_shared_1.system.isApp()) {
        yield (0, app_1.setupApp)(app);
    }
    return app;
});
exports.setupServer = setupServer;
function setupBaseApp() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = (0, fastify_1.default)({
            logger: server_shared_1.logger,
            ignoreTrailingSlash: true,
            pluginTimeout: 30000,
            // Default 100MB, also set in nginx.conf
            bodyLimit: (MAX_FILE_SIZE_MB + 4) * 1024 * 1024,
            genReqId: () => {
                return `req_${(0, shared_1.puId)()}`;
            },
            ajv: {
                customOptions: {
                    removeAdditional: 'all',
                    useDefaults: true,
                    coerceTypes: 'array',
                    formats: {},
                },
            },
        });
        yield app.register(fastify_favicon_1.default);
        yield app.register(multipart_1.default, {
            attachFieldsToBody: 'keyValues',
            onFile(part) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const puFile = {
                        filename: part.filename,
                        data: yield part.toBuffer(),
                        type: 'file',
                    };
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    part.value = puFile;
                });
            },
        });
        yield app.register(fastify_raw_body_1.fastifyRawBody, {
            field: 'rawBody',
            global: false,
            encoding: 'utf8',
            runFirst: true,
            routes: [],
        });
        yield app.register(formbody_1.default, { parser: (str) => qs_1.default.parse(str) });
        app.setErrorHandler(error_handler_1.errorHandler);
        yield app.register(cors_1.default, {
            origin: '*',
            exposedHeaders: ['*'],
            methods: ['*'],
        });
        // SurveyMonkey
        app.addContentTypeParser('application/vnd.surveymonkey.response.v1+json', { parseAs: 'string' }, app.getDefaultJsonParser('ignore', 'ignore'));
        return app;
    });
}


/***/ }),
/* 100 */
/***/ ((module) => {

module.exports = require("@fastify/cors");

/***/ }),
/* 101 */
/***/ ((module) => {

module.exports = require("@fastify/formbody");

/***/ }),
/* 102 */
/***/ ((module) => {

module.exports = require("@fastify/multipart");

/***/ }),
/* 103 */
/***/ ((module) => {

module.exports = require("fastify");

/***/ }),
/* 104 */
/***/ ((module) => {

module.exports = require("fastify-favicon");

/***/ }),
/* 105 */
/***/ ((module) => {

module.exports = require("fastify-raw-body");

/***/ }),
/* 106 */
/***/ ((module) => {

module.exports = require("qs");

/***/ }),
/* 107 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.errorHandler = void 0;
const tslib_1 = __webpack_require__(1);
const server_shared_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(10);
const http_status_codes_1 = __webpack_require__(108);
const errorHandler = (error, request, reply) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (error instanceof shared_1.PickUpError) {
        const statusCodeMap = {
            [shared_1.ErrorCode.INVALID_BEARER_TOKEN]: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            [shared_1.ErrorCode.FEATURE_DISABLED]: http_status_codes_1.StatusCodes.PAYMENT_REQUIRED,
            [shared_1.ErrorCode.PERMISSION_DENIED]: http_status_codes_1.StatusCodes.FORBIDDEN,
            [shared_1.ErrorCode.ENTITY_NOT_FOUND]: http_status_codes_1.StatusCodes.NOT_FOUND,
            [shared_1.ErrorCode.EXISTING_USER]: http_status_codes_1.StatusCodes.CONFLICT,
            [shared_1.ErrorCode.EXISTING_ALERT_CHANNEL]: http_status_codes_1.StatusCodes.CONFLICT,
            [shared_1.ErrorCode.AUTHORIZATION]: http_status_codes_1.StatusCodes.FORBIDDEN,
            [shared_1.ErrorCode.INVALID_CREDENTIALS]: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            [shared_1.ErrorCode.SESSION_EXPIRED]: http_status_codes_1.StatusCodes.FORBIDDEN,
            [shared_1.ErrorCode.EMAIL_IS_NOT_VERIFIED]: http_status_codes_1.StatusCodes.FORBIDDEN,
            [shared_1.ErrorCode.USER_IS_INACTIVE]: http_status_codes_1.StatusCodes.FORBIDDEN,
            [shared_1.ErrorCode.EMAIL_AUTH_DISABLED]: http_status_codes_1.StatusCodes.FORBIDDEN,
            [shared_1.ErrorCode.INVALID_OTP]: http_status_codes_1.StatusCodes.GONE,
            [shared_1.ErrorCode.VALIDATION]: http_status_codes_1.StatusCodes.CONFLICT,
            [shared_1.ErrorCode.AUTHENTICATION]: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            [shared_1.ErrorCode.INVALID_LICENSE_KEY]: http_status_codes_1.StatusCodes.BAD_REQUEST,
            [shared_1.ErrorCode.EMAIL_ALREADY_HAS_ACTIVATION_KEY]: http_status_codes_1.StatusCodes.CONFLICT,
        };
        const statusCode = (_a = statusCodeMap[error.error.code]) !== null && _a !== void 0 ? _a : http_status_codes_1.StatusCodes.BAD_REQUEST;
        yield reply.status(statusCode).send({
            code: error.error.code,
            params: error.error.params,
        });
    }
    else {
        request.log.error('[errorHandler]: ' + JSON.stringify(error));
        if (!error.statusCode ||
            error.statusCode === http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR.valueOf()) {
            server_shared_1.exceptionHandler.handle(error);
        }
        yield reply
            .status((_b = error.statusCode) !== null && _b !== void 0 ? _b : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .send(error);
    }
});
exports.errorHandler = errorHandler;


/***/ }),
/* 108 */
/***/ ((module) => {

module.exports = require("http-status-codes");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const server_shared_1 = __webpack_require__(2);
const app_1 = __webpack_require__(75);
const database_connection_1 = __webpack_require__(93);
const dev_seeds_1 = __webpack_require__(98);
const server_1 = __webpack_require__(99);
const start = (app) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log('Starting server');
    try {
        yield app.listen({
            host: '0.0.0.0',
            port: 3000,
        });
        if (server_shared_1.system.isApp()) {
            yield (0, app_1.appPostBoot)();
        }
    }
    catch (err) {
        server_shared_1.logger.error(err);
        process.exit(1);
    }
});
// This might be needed as it can be called twice
let shuttingDown = false;
const stop = (app) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (shuttingDown)
        return;
    shuttingDown = true;
    try {
        yield app.close();
        process.exit(0);
    }
    catch (err) {
        server_shared_1.logger.error('Error stopping server');
        server_shared_1.logger.error(err);
        process.exit(1);
    }
});
function setupTimeZone() {
    // It's important to set the time zone to UTC when working with dates in PostgreSQL.
    // If the time zone is not set to UTC, there can be problems when storing dates in UTC but not considering the UTC offset when converting them back to local time. This can lead to incorrect fields being displayed for the created
    // https://stackoverflow.com/questions/68240368/typeorm-find-methods-returns-wrong-timestamp-time
    process.env.TZ = 'UTC';
}
const main = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    setupTimeZone();
    if (server_shared_1.system.isApp()) {
        yield (0, database_connection_1.databaseConnection)().initialize();
        yield (0, database_connection_1.databaseConnection)().runMigrations();
        yield (0, dev_seeds_1.seedDevData)();
    }
    const app = yield (0, server_1.setupServer)();
    process.on('SIGINT', () => {
        stop(app).catch((e) => server_shared_1.logger.error(e, '[Main#stop]'));
    });
    process.on('SIGTERM', () => {
        stop(app).catch((e) => server_shared_1.logger.error(e, '[Main#stop]'));
    });
    yield start(app);
});
main().catch((e) => {
    server_shared_1.logger.error(e, '[Main#main]');
    process.exit(1);
});

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map