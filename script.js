'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Ricky Paul',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Bob Jones',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Dove Dog',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'John Doe',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let displayMovements = function (movement) {
  containerMovements.innerHTML = '';
  movement.forEach(function (mov, i) {
    let type = mov > 0 ? 'deposit' : 'withdrawal';
    let html = `<div class="movements__row">
                <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
                <div class="movements__value">${mov}</div>
                </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

let createUsernames = function (accounts) {
  accounts.forEach(function (user) {
    user.username = user.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
console.log(createUsernames(accounts));

let calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => (acc += mov), 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

let calcDisplaySummary = function (account) {
  let balanceIn = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => (acc += mov));
  let balanceOut = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => (acc += mov));
  let interest = account.movements
    .filter(mov => mov > 0)
    .map(dep => (dep * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, sum) => (acc += sum), 0);
  labelSumIn.textContent = `${balanceIn} EUR`;
  labelSumOut.textContent = `${Math.abs(balanceOut)} EUR`;
  labelSumInterest.textContent = `${interest} EUR`;
};

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('click');
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }!`;
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    containerApp.style.opacity = 100;
    displayMovements(currentAccount.movements);
    calcPrintBalance(currentAccount);
    calcDisplaySummary(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  let amount = Number(inputTransferAmount.value);
  let sendTo = accounts.find(acc => acc.username === inputTransferTo.value);
  console.log(amount, sendTo);
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    sendTo.username != currentAccount.username
  ) {
    sendTo.movements.push(amount);
    currentAccount.movements.push(amount * -1);

    displayMovements(sendTo.movements);
    calcPrintBalance(sendTo);
    calcDisplaySummary(sendTo);
    displayMovements(currentAccount.movements);
    calcPrintBalance(currentAccount);
    calcDisplaySummary(currentAccount);
    inputTransferAmount.value = '';
    inputTransferTo.value = '';
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    displayMovements(currentAccount.movements);
    calcPrintBalance(currentAccount);
    calcDisplaySummary(currentAccount);
    inputLoanAmount.value = '';
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('click');
  if (
    inputCloseUsername.value == currentAccount.username &&
    inputClosePin.value == currentAccount.pin
  ) {
    let index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    inputClosePin.value = '';
    inputCloseUsername.value = '';
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

let checkDogs = function (Julia, Kate) {
  let nJulia = [...Julia].slice(1, 3);
  let both = [...nJulia, ...Kate];
  console.log(both);
  both.forEach(function (age, i) {
    let disp =
      age >= 3
        ? `Dog number ${i + 1} is an adult, and is ${age} years old`
        : `Dog number ${i + 1} is still a puppy`;
    console.log(disp);
  });
};
let Julia = [3, 5, 2, 12, 7];
let Kate = [4, 1, 15, 8, 3];

let calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? age * 2 : age * 4 + 16))
    .filter(age => age > 18)
    .reduce((acc, sum, i, arr) => acc + sum / arr.length, 0);

/////////////////////////////////////////////////
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
let recFood = dogs.map(function (dog) {
  dog.recommendedFood = dog.weight ** 0.75 * 28;
});

let sarahDog = dogs.map(function (dog) {
  if (dog.owners.includes('Sarah')) {
    if (dog.recommendedFood < dog.curFood) {
      console.log('eat too much');
    } else {
      console.log('eat too little');
    }
  }
});

let ownersEatTooMuch = [];
let ownersEatTooLittle = [];
dogs.map(dog =>
  dog.recommendedFood < dog.curFood
    ? ownersEatTooMuch.push(dog.owners)
    : ownersEatTooLittle.push(dog.owners)
);

let okay = [];
dogs.map(function (dog) {
  if (
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
  )
    okay.push(dog.owners);
});
console.log(okay.flat());
