const profileObject = {
  firstName: 'ashishk',
  lastName: 'gupta',
  emailId: 'ashishcs098@gmail.com',
  password: '348jcdjdjdjf',
  gender: 'male',
};

Object.keys(profileObject).forEach((key) => {
  const value = profileObject[key];
  console.log(`value is ${value} - and key is - ${key}`);
});


