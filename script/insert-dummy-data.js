const pg = require('pg');
const { Pool } = pg;
const bcrypt = require('bcrypt');
const ProgressBar = require('progress');

const pool = new Pool({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'blogs',
});

const meaningfulTags = [
  'javascript',
  'python',
  'java',
  'html',
  'css',
  'react',
  'nodejs',
  'git',
  'api',
  'docker',
  'technology',
  'coding',
  'travel',
  'fitness',
  'cooking',
  'photography',
  'health',
  'music',
  'lifestyle',
  'programming',
  'art',
  'science',
  'design',
  'business',
  'nature',
  'gaming',
];

// Function to generate a random username
function generateUsername() {
  const adjectives = ['happy', 'sad', 'funny', 'smart', 'creative', 'friendly'];
  const nouns = ['cat', 'dog', 'bird', 'flower', 'tree', 'river'];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective}_${noun}_${Math.floor(Math.random() * 100)}`;
}

// Function to generate a random name
function generateRandomName() {
  const firstNames = ['John', 'Alice', 'Bob', 'Eva', 'Mike', 'Sara'];
  const lastNames = ['Doe', 'Smith', 'Johnson', 'Taylor', 'Brown', 'Lee'];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

function generateRandomProvider() {
  const providers = ['local', 'github'];
  return providers[Math.floor(Math.random() * providers.length)];
}

function generateRandomGender() {
  const genders = ['male', 'female', 'other'];
  return genders[Math.floor(Math.random() * genders.length)];
}

function generateRandomEmail(username) {
  const domains = ['example.com', 'gmail.com', 'yahoo.com', 'hotmail.com'];
  const randomDomain = domains[Math.floor(Math.random() * domains.length - 1)];
  return `${username}@${randomDomain}`;
}

async function hashPassword(password) {
  const saltRounds = 10; // Adjust the saltRounds as needed
  return bcrypt.hash(password, saltRounds);
}

async function createUserQuery(password) {
  const username = generateUsername();
  const email = generateRandomEmail(username);
  const provider = generateRandomProvider();
  const gender = generateRandomGender();
  const hashedPassword = await hashPassword(password);
  const insertUserQuery = `
	  INSERT INTO users (username, email, password, provider, "isVerified")
	  VALUES ('${username}', '${email}', '${hashedPassword}', '${provider}', true)
	  RETURNING id
	`;
  return insertUserQuery;
}

function generateRandomSocialMediaUrl(username, platform) {
  const baseUrl = `https://www.$${username}.${platform}.com/`;
  return baseUrl + generateRandomString(10);
}

function generateRandomUrl() {
  const baseUrl = 'https://example.com/';
  return baseUrl + generateRandomString(10);
}

function generateRandomString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateRandomProfile(userId) {
  const userName = generateRandomName();
  return {
    firstName: userName.split(' ')[0],
    lastName: userName.split(' ')[1],
    avatar: generateRandomUrl(),
    gender: ['male', 'female', 'other'][Math.floor(Math.random() * 3)],
    bio: generateRandomString(50),
    facebookUrl: generateRandomSocialMediaUrl(userName, 'facebook'),
    twitterUrl: generateRandomSocialMediaUrl(userName, 'twitter'),
    youtubeUrl: generateRandomSocialMediaUrl(userName, 'youtube'),
    instagramUrl: generateRandomSocialMediaUrl(userName, 'instagram'),
    linkedinUrl: generateRandomSocialMediaUrl(userName, 'linkedin'),
    userId: userId,
  };
}

const insertDummyData = async () => {
  const client = await pool.connect();
  try {
    await client.query('TRUNCATE TABLE profile CASCADE;');
    await client.query('TRUNCATE TABLE users CASCADE;');
    const NO_OF_USER = 20;
    console.log('data inserting...');
    for (let i = 1; i <= NO_OF_USER; i++) {
      const userQuery = await createUserQuery('test123');
      const userData = await client.query(userQuery);
      const userId = userData.rows[0].id;
      const profileData = generateRandomProfile(userId);
      const profileQuery = `
        INSERT INTO profile ("firstName", "lastName", avatar, gender, bio, "facebookUrl", "twitterUrl", "youtubeUrl", "instagramUrl", "linkedinUrl", "userId")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
		RETURNING id
      `;
      const profileRes = await client.query(profileQuery, [
        profileData.firstName,
        profileData.lastName,
        profileData.avatar,
        profileData.gender,
        profileData.bio,
        profileData.facebookUrl,
        profileData.twitterUrl,
        profileData.youtubeUrl,
        profileData.instagramUrl,
        profileData.linkedinUrl,
        profileData.userId,
      ]);
      console.log(
        `Data Inserted\nuser id : ${userId}\nprofile id : ${profileRes.rows[0].id}`,
      );
    }
  } catch (err) {
    console.log(err, '@@@@@@@2');
  } finally {
    client.release();
    pool.end();
  }
};

insertDummyData();
