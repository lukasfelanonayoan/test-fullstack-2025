"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
const crypto = require("crypto");
const { createClient } = redis;
const { createHash } = crypto;
// Soal 1
function faktorial(n) {
    let angkaFaktorial = 1;
    for (let i = 1; i <= n; i++) {
        angkaFaktorial *= i;
    }
    let twoPowerN = Math.pow(2, n);
    let result = angkaFaktorial / twoPowerN;
    return Math.ceil(result);
}
console.log("Test Soal 1 : " + faktorial(5));
const client = createClient();
const connectRedis = async () => {
    await client.connect();
};
const setRedisUser = async (username, userData) => {
    const key = `login_${username}`;
    const value = JSON.stringify(userData);
    await client.set(key, value);
};
const getRedisUser = async (username) => {
    const key = `login_${username}`;
    const value = await client.get(key);
    if (!value) {
        return null;
    }
    const userData = JSON.parse(value);
    return userData;
};
function hashPasswordSHA1(password) {
    const sha1 = createHash('sha1');
    sha1.update(password);
    const hashedPassword = sha1.digest('hex');
    return hashedPassword;
}
async function testRedis() {
    await connectRedis();
    const username = "Test";
    const user = {
        realname: "Aberto Doni Sianturi",
        email: "adss@gmail.com",
        password: hashPasswordSHA1("TEST1234")
    };
    await setRedisUser(username, user);
    const fetchedUser = await getRedisUser(username);
    if (fetchedUser) {
        console.log("Soal 2 Redis");
        console.log(fetchedUser);
    }
}
testRedis();
//# sourceMappingURL=index.js.map