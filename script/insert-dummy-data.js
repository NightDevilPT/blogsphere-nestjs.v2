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
  database: 'blog_db',
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
  'reactjs',
  'nextjs',
  'angular',
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
  const randomDomainIndex = Math.floor(Math.random() * domains.length); // Fix the random domain selection
  const randomDomain = domains[randomDomainIndex];
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

function generateProfileQuery(userId) {
  const userName = generateRandomName();
  const profileQuery = `INSERT INTO profiles ("firstName", "lastName", avatar, gender, bio, "facebookUrl", "twitterUrl", "youtubeUrl", "instagramUrl", "linkedinUrl", "userId")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
RETURNING id`;
  return [
    profileQuery,
    [
      userName.split(' ')[0],
      userName.split(' ')[1],
      generateRandomUrl(),
      ['male', 'female', 'other'][Math.floor(Math.random() * 3)],
      generateRandomString(50),
      generateRandomSocialMediaUrl(userName, 'facebook'),
      generateRandomSocialMediaUrl(userName, 'twitter'),
      generateRandomSocialMediaUrl(userName, 'youtube'),
      generateRandomSocialMediaUrl(userName, 'instagram'),
      generateRandomSocialMediaUrl(userName, 'linkedin'),
      userId,
    ],
  ];
}

function generateRandomHtmlData() {
  const title = `<h1>${generateRandomString(10)}</h1>`;
  const paragraph1 = `<p>${generateRandomString(100)}</p>`;
  const paragraph2 = `<p>${generateRandomString(150)}</p>`;
  const paragraph3 = `<p>${generateRandomString(200)}</p>`;
  return `${title}<br>${paragraph1}<br>${paragraph2}<br>${paragraph3}`;
}

function generateRandomTags() {
  const numTags = Math.floor(Math.random() * 4) + 2; // Random number between 2 and 4
  const tags = [];
  while (tags.length < numTags) {
    const tag =
      meaningfulTags[Math.floor(Math.random() * meaningfulTags.length)];
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  }
  return tags;
}

const insertDummyData = async () => {
  const client = await pool.connect();
  try {
    await client.query('TRUNCATE TABLE profiles CASCADE;');
    await client.query('TRUNCATE TABLE users CASCADE;');
    await client.query('TRUNCATE TABLE blogs CASCADE;');
    const NO_OF_USER = 20;
    console.log('data inserting...');
    for (let i = 1; i <= NO_OF_USER; i++) {
      const userQuery = await createUserQuery('test123');
      const userData = await client.query(userQuery);
      const userId = userData.rows[0].id;
      const profileRes = await client.query(...generateProfileQuery(userId));
      console.log(
        `Data Inserted\nuser id : ${userId}\nprofile id : ${profileRes.rows[0].id}`,
      );

      const numBlogs = Math.floor(Math.random() * 3) + 2; // Random number between 2 and 4
      for (let j = 0; j < numBlogs; j++) {
        const insertBlogQuery = `
          INSERT INTO blogs (title, description, data, image, tags, "authorId")
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id
        `;
        const blogData = {
          title: `Blog ${j + 1} ${profileRes.rows[0].id}`,
          description: generateRandomString(50),
          data: generateRandomHtmlData(),
          image: generateRandomUrl(),
          tags: generateRandomTags(),
          authorId: profileRes.rows[0].id,
        };
        const blog = await client.query(insertBlogQuery, [
          blogData.title,
          blogData.description,
          blogData.data,
          blogData.image,
          blogData.tags,
          blogData.authorId,
        ]);
        console.log(
          `Profile with ID ${profileRes.rows[0].id} and blogs ${blog.rows[0].id} inserted.`,
        );
      }
    }
  } catch (err) {
    console.log(err, '@@@@@@@2');
  } finally {
    client.release();
    pool.end();
  }
};

insertDummyData();
