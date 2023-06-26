let exampleComments = [{
    ID: '12910812321',
    text: 'Comment One',
    author : '2131223111',
    post : '1291081'
  },
  
  {
    ID : '327480928231231',
    text : 'Comment Two',
    author : '8219038120',
    post : '1291081'
  },
  
  {
    ID : '32748092843213123',
    text: 'Comment Three',
    author : '2131223111',
    post : '1291081'
  }]
  
  let examplePosts = [{
    ID: '1291081',
    title: 'The Myth of Freedom',
    body: 'This is not what I had hoped for when writing this blog. Endless critisism from individuals who think they have it all under their control. Their life in their hands, I wish, alas it is unfortuantly the way things are and what can someone like me do about that. Sorry guys!',
    published : true,
    author : '2131223111'
    
  },
  
  {
    ID : '327480928',
    title: 'The Wonders of the Sea',
    body: `Sorry, i'm to lazy to write another blog. `,
    published : false,
    author : '21312312'
  },
  
  {
    ID : '32748092843',
    title: 'How did we get here? ( Evolution : A basic guide )',
    body: `Sorry, i'm to lazy to write another blog. `,
    published : false,
    author : '2131223111'
  }]
  
  
  const exampleData = [{
    ID : '21312312',
    name : 'Bond',
    email : 'billybond@company.com',
    age : 49
  },
  
  {
    ID : '2131223111',
  name : 'Daniels',
  email : 'daviddaniels@company.com',
  age : 67
  },
  
  {
    ID : '8219038120',
    name: 'Hangerson',
    email : 'henryhangerson@company.com',
    age : 109
  }]

  const db = {
     exampleData,
     examplePosts,
     exampleComments
  }

  export { db as default}