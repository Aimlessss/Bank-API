# Bank API


This project is a RESTful API for a banking system. It is built using Node.js and Express framework. The API allows users to perform various banking operations such as account creation, deposits, withdrawals, and transactions.

GET -> /accounts -> will provide all accounts.

GET -> /accounts/:id -> returns the account with the specified ID.

GET -> /transactions -> will return all the transactions with ID and amount.

POST -> /accounts/createnewaccount -> will create a new account.

POST -> /accounts/:id/deposit -> will deposit the amount requested from the body and also store the transaction date in another database stored locally named as "transactionT".

POST -> /accounts/:id/withdraw -> same as deposit, but it will withdraw.

GET -> /accounts/:start/:end will return the accounts created between start and end by req.params.start and end.

GET -> /accounts/getfilteredtransaction/:id/:start/:end will return the transactions that happened between start and end specific to the ID.

GET -> /accounts/:start/:end -> will return the accounts from start to end.

DELETE -> /accounts/delete/:id -> will delete the account specific to the ID.

# Clone the repository.
# Install dependencies using the following command:

```
npm start
```
```
npm install
```
```
npm install express
```
```
npm intall jest
```

```
npm install -g ts-node
npm install --save-dev ts-node 
npm install --save-dev ts-jest
npm i --save-dev @types/supertest
npm install supertest --savedev

```
These are all required modules that you need to install 

```
tsc --esModuleInterop  index.ts
```
Run the main project using above command 
Setting esModuleInterop to true in your TypeScript configuration file is not enough. You need to pass the --esModuleInterop flag to the TypeScript compiler when you compile your code, otherwise it will not be applied.

When you run tsc --esModuleInterop index.ts, you are telling the TypeScript compiler to apply the esModuleInterop flag when compiling the index.ts file. This will ensure that the compiled JavaScript code will use __importDefault instead of require when importing modules with a default export.