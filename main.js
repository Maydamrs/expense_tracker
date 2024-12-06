const transactions = [
{
  id: 1,
  name:"salary",
  amount:5000,
  date:new Date(),
  type: "income"
},
{
    id: 2,
    name:"haircut",
    amount:20,
    date:new Date(),
    type: "expense"
  },
  {
    id: 3,
    name:"concert ticket",
    amount:350,
    date:new Date(),
    type: "expense"
  },
];

const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    signDisplay: "always",
});

const list = document.getElementById("transactionList");
const form = document.getElementById("transactionForm");
const status = document.getElementById("status");

form.addEventListener('summit',addTransaction);

function renderList() {
    list.innerHTML = "";

    if (transactions.length === 0) {
        status.textContent = "No transactions.";
        return;
    }

    transactions.forEach(({ id, name, amount, date, type }) =>{
        const li = document.createElement("li");

        li.innerHTML = `
         <div class="name">
           <h4>${name}</h4>
           <p>${new Date(date).toLocaleDateString()}</p>
         </div>

         <div class="amount ${type}">
           <span>${formatter.format(amount)}</span>
          </div>

          <div class="action">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
         </svg>


         </div>

        `;


        list.appendChild(li);

    });
}

renderList();
function deleteTransaction(id) {
  const index = transactions.findIndex((trx) => trx.id === id);
  transactions.splice(index, 1);

  renderList();
  
}

function addTransaction(e) {
  e.preventDefault();

  const formData = new FormData(this);


transactions.push({
  id: transactions.length + 1,
  name: formData.get('name'),
  amount:parseFloat(formData.get('amount')), 
});
this.reset();

renderList();
}