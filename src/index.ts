import redis = require('redis');
import crypto = require('crypto');

const { createClient } = redis;
const { createHash } = crypto;

// Soal 1
function faktorial(n: number) {
  let angkaFaktorial = 1;
  for (let i = 1; i <= n; i++) {
    angkaFaktorial *= i;
  }

  let twoPowerN = Math.pow(2, n);
  let result = angkaFaktorial / twoPowerN;

  return Math.ceil(result);
}

console.log("Test Soal 1 : " + faktorial(5));

// Soal 2

export interface UserData {
  realname: string;
  email: string;
  password?: string; 
}

const client = createClient();


const connectRedis = async () => {
    await client.connect();
};

const setRedisUser = async (username: string, userData: UserData) => {
  const key = `login_${username}`;
  const value = JSON.stringify(userData);
  await client.set(key, value);
}

const getRedisUser = async (username: string): Promise<UserData | null> => {
  const key = `login_${username}`;
  const value = await client.get(key);

  if (!value) {
    return null;
  }

  const userData: UserData = JSON.parse(value);
  return userData;
}

function hashPasswordSHA1(password: string): string {
  const sha1 = createHash('sha1');
  sha1.update(password);
  const hashedPassword = sha1.digest('hex');
  return hashedPassword;
}

async function testRedis(){
await connectRedis();
  const username = "Test";
  const user: UserData = {
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

// testRedis();