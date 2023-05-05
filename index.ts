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

app.get("/accounts", (req, res)=>{
    console.log('/GET accounts');
    res.json(data);
});

app.get("/accounts/:id",(req, res)=>{
    const accountid = Number(req.params.id)
    const getAccount = data.find((element)=>element.id === accountid)

    if(!getAccount){
        res.status(500).send("Account not Found");
    }else{
        res.json(getAccount);
    }
});
app.get("/transactions",(req, res)=>{
    res.json(transactionT);

});
app.post("/accounts/createnewaccount", (req, res) => {

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
app.post("/accounts/:id/deposite" ,(req, res)=>{
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
   

});

app.post("/accounts/:id/withdraw", (req, res) =>{
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


app.get("/accounts/getfiltertransaction/:start/:end", (req, res) => {
    const startDate = new Date(req.params.start);
    const endDate = new Date(req.params.end);
  
    const filteredData = transactionT.filter((account) => {
        const accDate = new Date(account.transactiontime);
     //   console.log(accDate);
        return accDate >= startDate && accDate <= endDate;
      });

      res.json(filteredData);
      
  });
  
app.get("/accounts/getfiltertransaction/:id/:start/:end",(req, res)=>{
    const id = Number(req.params.id);
    const startDate = new Date(req.params.start);
    const endDate = new Date(req.params.end);
    
    const filteredTransactions = transactionT.filter((transaction) => {
      const transactionDate = new Date(transaction.transactiontime);
      return transaction.id === id && transactionDate >= startDate && transactionDate <= endDate;
    });
    
    res.json(filteredTransactions);
    
})

app.get("/accounts/:start/:end",(req, res) =>{
    
    const startdate = new Date(req.params.start);
    const enddate = new Date(req.params.end);

    const filteredData = data.filter((account) => {
        const accDate = new Date(account.Data_Acc_created);
        console.log(accDate);
        return accDate >= startdate && accDate <= enddate;
      });

      res.json(filteredData);
});


app.delete("/accounts/delete/:id", (req, res) =>{

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