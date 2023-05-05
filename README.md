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
