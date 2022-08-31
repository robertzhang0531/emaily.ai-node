export interface Node {
    frontEndId: string;
    name: string;
    type: string;
    headOrTail: string;
    status: string;
    next: number[];
    last: number[];
}


export class timeDelayNode implements Node{
    frontEndId = Math.floor(Math.random()*1000).toString();
    name = "timeDelayNode";
    type = "TimeDelay,http://localhost:3000";
    headOrTail = "";
    status  = "";
    next = [];
    last = [];
}

export class APITriggerNode implements Node{
    frontEndId = Math.floor(Math.random()*1000).toString();
    name = "APITriggerNode";
    type = "APITrigger,http://localhost:3001";
    headOrTail = "";
    status  = "";
    next = [];
    last = [];
}

export class endNode implements Node{
    frontEndId = Math.floor(Math.random()*1000).toString();
    name = "endNode";
    type = "end,http://localhost:3002";
    headOrTail = "";
    status  = "";
    next = [];
    last = [];
}

export class timeTriggerNode implements Node{
    frontEndId = Math.floor(Math.random()*1000).toString();
    name = "timeTriggerNode";
    type = "TimeTrigger,http://localhost:3003";
    headOrTail = "";
    status  = "";
    next = [];
    last = [];
}

export class sendEmailNode implements Node{
    frontEndId = Math.floor(Math.random()*1000).toString();
    name = "sendEmailNode";
    type = "sendEmail,http://localhost:3004";
    headOrTail = "";
    status  = "";
    next = [];
    last = [];
}

export class ifElseNode implements Node{
    frontEndId = Math.floor(Math.random()*1000).toString();
    name = "ifElseNode";
    type = "IfElse,http://localhost:3005";
    headOrTail = "";
    status  = "";
    next = [];
    last = [];
}


// Test Deseralization
let timeDelay_node = new timeDelayNode();
let timeTrigger_node = new timeTriggerNode();
let ifElse_node = new ifElseNode();

let arr = [timeDelay_node, timeTrigger_node, ifElse_node];
let jsonObj = JSON.stringify(arr);
console.log(jsonObj.split('},{').join('} {').slice(1, -1));