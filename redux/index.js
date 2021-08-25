//People dropping off a form (Action creators)

const createPolicy = (name, amount) => {
  return {
    type: "CREATE_POLICY",
    payload: {
      name: name,
      amount: amount,
    },
  };
};

const deletePolicy = (name) => {
  return {
    type: "DELETE_POLICY",
    payload: {
      name: name,
    },
  };
};

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: "CREATE_CLAIM",
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect,
    },
  };
};

//Reducers (departments)
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === "CREATE_CLAIM") {
    //We care about this action (FORM!)
    return [...oldListOfClaims, action.payload];
  }

  // We don't care about the action (FORM)
  return oldListOfClaims;
};

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === "CREATE_CLAIM") {
    //We care about this action
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  } else if (action.type === "CREATE_POLICY") {
    //We care about this action
    return bagOfMoney + action.payload.amount;
  }

  // We don't care about the action
  return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === "CREATE_POLICY") {
    //We care about this action
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === "DELETE_POLICY") {
    //We care about this action
    return listOfPolicies.filter((name) => name !== action.payload.name);
  }
  // We don't care about the action
  return listOfPolicies;
};

const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies,
});

const store = createStore(ourDepartments);

store.dispatch(createPolicy("Joaquin", 20));
store.dispatch(createPolicy("Jim", 30));
store.dispatch(createPolicy("Bob", 40));

store.dispatch(createClaim("Alex", 120));
store.dispatch(createClaim("Jim", 50));

store.dispatch(deletePolicy("Bob"));

console.log(store.getState());
