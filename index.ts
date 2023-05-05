import express from 'express';
const app = express();

const port = 3000;

let data =  [{id: 1, name: "Atharva", accType: "Saving",email:"katharva2002@gmail.com", Data_Acc_created: new Date("2015-01-16"), balance: 100, Nooftransaction: 0},
{id: 2, name: "Soham", accType: "Current",email:"soham2002@gmail.com", Data_Acc_created: new Date("2016-01-16"), balance: 200, Nooftransaction: 2},
{id: 3, name: "Sujyot", accType: "Saving",email:"sujyot2002@gmail.com", Data_Acc_created: new Date("2017-01-16"), balance: 300, Nooftransaction: 3},
{id: 4, name: "Navneet", accType: "Current",email:"mandraketech@gmail.com", Data_Acc_created: new Date("2018-01-16"), balance: 400, Nooftransaction: 5},
{id: 5, name: "Samarth", accType: "Saving",email:"samarth@gmail.com", Data_Acc_created: new Date("2019-01-16"), balance: 600, Nooftransaction: 6},
{id: 6, name: "sameer", accType: "Current",email:"sameer@gmail.com", Data_Acc_created: new Date("2020-01-16"), balance: 700, Nooftransaction: 7},
{id: 7, name: "manas", accType: "Saving",email:"manas@phonepe.com", Data_Acc_created: new Date("2021-01-16"), balance: 900, Nooftransaction: 9},
{id: 8, name: "neha", accType: "Current",email:"neha@gmail.com", Data_Acc_created: new Date("2022-01-16"), balance: 1000, Nooftransaction: 10},
{id: 9, name: "bhaskar", accType: "Saving",email:"marathon.bk@gmail.com", Data_Acc_created: new Date("2023-01-16"), balance: 1300, Nooftransaction: 13}]


let transactionT = [{id: 1, transactiontime: new Date("2015-01-16"), amount : 300}, 
{id: 1, transactiontime: new Date("2016-01-16"), amount : 300}, 
{id: 1, transactiontime: new Date("2017-01-16"), amount : 300},
{id:2, transactiontime: new Date("2019-01-16"), amount:200}, 
{id:3,transactiontime: new Date("2021-01-16"), amount : 888}];

app.use(express.json())
const dataLength = data.length;


//   get/getaccsummary -> givs account summary
app.get("/accounts", (req: express.Request, res: express.Response)=>{
    console.log('/GET accounts');
    res.json(data);
});

//   get/account/index -> gives account summary specific index
app.get("/accounts/:id",(req, res)=>{
    const accountid = Number(req.params.id)
    const getAccount = data.find((element)=>element.id === accountid)

    if(!getAccount){
        res.status(500).send("Account not Found");
    }else{
        res.json(getAccount);
    }
});
app.get("/transactions",(req: express.Request, res: express.Response)=>{
    res.json(transactionT);

});
app.post("/accounts/createnewaccount", (req: express.Request, res: express.Response) => {

    const {name, accType, email} = req.body;

    const newAccount = {
      id : data.length + 1,
      name,
      accType,
      email,
      Data_Acc_created : new Date(),
      balance : 0,
      Nooftransaction : 0
    }
    
    data.push(newAccount);
    res.json(newAccount);
   
});
/* This code defines a POST endpoint for depositing money into a specific account. The `id` parameter
in the URL is used to identify the account into which the money is to be deposited. The `req.body`
object is used to extract the `id` and `amount` of the transaction. The code then checks if the
account exists in the `data` array. If the account exists, a new transaction object is created with
the current date and time, and the transaction details are added to the `transactionT` array. The
account balance is then updated by adding the transaction amount, and the number of transactions is
incremented. Finally, the updated account object is returned as a JSON response using the
`res.json()` method. */
app.post("/accounts/:id/deposite" ,(req: express.Request, res: express.Response)=>{
    const accountId = req.params.id;
    const account = data.find(acc => acc.id === parseInt(accountId))
    const { id, amount } = req.body;

    if(!account){
        return res.status(404).json({ error: 'Account not found' });
}

    
    const transactiontime = new Date();
    const transaction = {
        id: id,
        transactiontime: transactiontime,
        amount: amount
    };
    transactionT.push(transaction);
    account.balance += amount;
    account.Nooftransaction++;
    res.json(account)
   

})

/* This code defines a POST endpoint for withdrawing money from a specific account. The `id` parameter
in the URL is used to identify the account from which the money is to be withdrawn. The `req.body`
object is used to extract the `id` and `amount` of the transaction. The code then checks if the
account exists in the `data` array and if the transaction amount is valid. If the account exists and
the transaction amount is valid, a new transaction object is created with the current date and time,
and the transaction details are added to the `transactionT` array. The account balance is then
updated by subtracting the transaction amount, and the number of transactions is incremented.
Finally, the updated account object is returned as a JSON response using the `res.json()` method. */
app.post("/accounts/:id/withdraw", (req: express.Request, res: express.Response) =>{
    const accountId = req.params.id;
    const account = data.find(acc => acc.id === parseInt(accountId))
    if(!account){
        return res.status(404).json({error: 'Account not found'});
    }
    const {id, amount} = req.body;
    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Invalid transaction amount' });
    }
    const transactiontime = new Date();
    const transaction = {
        id: id,
        transactiontime: transactiontime,
        amount: amount
    };
    transactionT.push(transaction);
    account.balance -= amount;
    account.Nooftransaction = account.Nooftransaction + 1;
    res.json(account)
    
});



/* This code defines a GET endpoint for retrieving a filtered list of transactions based on the date
range specified in the URL parameters. The `start` and `end` parameters are parsed from the URL and
used to filter the `transactionT` array based on the `transactiontime` property of each transaction
object. The filtered transactions are then returned as a JSON response using the `res.json()`
method. */
app.get("/accounts/getfiltertransaction/:start/:end", (req: express.Request, res: express.Response) => {
    const startDate = new Date(req.params.start);
    const endDate = new Date(req.params.end);
  
    const filteredData = transactionT.filter((account) => {
        const accDate = new Date(account.transactiontime);
     //   console.log(accDate);
        return accDate >= startDate && accDate <= endDate;
      });

      res.json(filteredData);
      
  });
  
/* This code defines a GET endpoint for retrieving a filtered list of transactions based on the account
ID and date range specified in the URL parameters. The `id`, `start`, and `end` parameters are
parsed from the URL and used to filter the `transactionT` array based on the `id` and
`transactiontime` properties of each transaction object. The filtered transactions are then returned
as a JSON response using the `res.json()` method. */
app.get("/accounts/getfiltertransaction/:id/:start/:end",(req: express.Request, res: express.Response)=>{
    const id = Number(req.params.id);
    const startDate = new Date(req.params.start);
    const endDate = new Date(req.params.end);
    
    const filteredTransactions = transactionT.filter((transaction) => {
      const transactionDate = new Date(transaction.transactiontime);
      return transaction.id === id && transactionDate >= startDate && transactionDate <= endDate;
    });
    
    res.json(filteredTransactions);
    
})

/* This code defines a GET endpoint for retrieving a filtered list of accounts based on the date range
specified in the URL parameters. The start and end dates are parsed from the URL parameters and used
to filter the `data` array based on the `Data_Acc_created` property of each account object. The
filtered data is then returned as a JSON response using the `res.json()` method. */
app.get("/accounts/:start/:end",(req: express.Request, res: express.Response) =>{
    
    const startdate = new Date(req.params.start);
    const enddate = new Date(req.params.end);

    const filteredData = data.filter((account) => {
        const accDate = new Date(account.Data_Acc_created);
        console.log(accDate);
        return accDate >= startdate && accDate <= enddate;
      });

      res.json(filteredData);
});


/* This code is defining a DELETE endpoint for deleting an account from the `data` array based on the
`id` parameter passed in the URL. It first parses the `id` parameter to an integer and checks if it
is a valid index in the `data` array. If it is not a valid index, it returns a 400 status code with
an error message. If it is a valid index, it removes the account from the `data` array using the
`splice()` method and returns a 200 status code with a success message and the updated `data` array. */
app.delete("/accounts/delete/:id", (req: express.Request, res: express.Response) =>{

    const userindex = parseInt(req.params.id);
    if(isNaN(userindex) || userindex < 0 || userindex >= data.length){
        return res.status(400).send("Invalid account index ");
    }
    data.splice(userindex, 1);
    return res.status(200).send({message: "Account Deleted ", data: data});
})

app.listen(port, () =>{
    console.log(`Server started at http://localhost:${port}`);
});
export default app;
//export default server;