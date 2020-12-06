"use strict";

const faker = require("faker");
// const { default: issues } = require("../../client/store/issues");
const db = require("./db");
const {
  User,
  Comment,
  Issue,
  Message,
  Organization,
  Project,
  Team,
  Tag,
} = require("./models");

// DUMMY GENERATORS //

const makeProds = n => {
  const data = [];
  for (let i = 0; i < n; i++) {
    let newObj = {};
    newObj.title = faker.commerce.productName();
    newObj.description = faker.lorem.sentences();
    newObj.category = "macOS";
    newObj.dateCreated = faker.date.recent();
    newObj.status = "Prototype";
    data.push(newObj);
  }
  return data;
};

const writeComments = n => {
  const data = [];
  for (let i = 0; i < n; i++) {
    let comment = {};
    comment.dateSent = `${faker.time.recent()}`;
    comment.body = faker.lorem.sentences();
    data.push(comment);
  }
  return data;
};

const writeMessages = n => {
  const data = [];
  for (let i = 0; i < n; i++) {
    let message = {};
    message.body = faker.lorem.sentences();
    message.timestamp = `${new Date()}`;

    data.push(message);
  }
  return data;
};

const createIssues = n => {
  const categories = ["bug", "task", "feature", "report"];
  const statuses = ["open", "in progress", "closed"];
  const agileWords = ["fix", "update", "test", "review"];
  const data = [];
  for (let i = 0; i < n; i++) {
    let issue = {};
    issue.ticketNumber = faker.random.number(2999999999);
    issue.description = faker.lorem.sentences(3);
    issues.summary = `${
      agileWords[Math.floor(Math.random() * agileWords.length)]
    } this on ${faker.commerce.department()}`;
    issue.category = categories[Math.floor(Math.random() * categories.length)];
    issue.status = statuses[Math.floor(Math.random() * statuses.length)];
    data.push(issue);
  }
  return data;
};

// console.log(createIssues(20));

const tags = n => {
  const data = [];
  for (let i = 0; i < n; i++) {
    let tag = {};
    tag.title = faker.random.word();
    tag.category = faker.random.word();
    data.push(tag);
  }
  return data;
};

// DUMMY DATASETS //

const dummyUsers = [
  {
    id: 1,
    fName: "Lorilee",
    lName: "Gleadhell",
    email: "lgleadhell0@free.fr",
    title: "Environmental Specialist",
    bio:
      "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
    profileImageUrl: "http://dummyimage.com/104x100.jpg/cc0000/ffffff",
    password: "iR8i06rme",
    username: "lgleadhell0",
  },
  {
    id: 2,
    fName: "Lotty",
    lName: "Twatt",
    email: "ltwatt1@chron.com",
    title: "Director of Sales",
    bio:
      "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
    profileImageUrl: "http://dummyimage.com/153x230.png/cc0000/ffffff",
    password: "p9olTjFITM",
    username: "ltwatt1",
  },
  {
    id: 3,
    fName: "Doyle",
    lName: "Housecraft",
    email: "dhousecraft2@msn.com",
    title: "Executive Secretary",
    bio:
      "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    profileImageUrl: "http://dummyimage.com/250x235.bmp/ff4444/ffffff",
    password: "olqzkY3r",
    username: "dhousecraft2",
  },
  {
    id: 4,
    fName: "Nevins",
    lName: "Morrieson",
    email: "nmorrieson3@youtu.be",
    title: "Research Assistant I",
    bio:
      "Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
    profileImageUrl: "http://dummyimage.com/230x212.png/5fa2dd/ffffff",
    password: "wAb2WXxHOKMJ",
    username: "nmorrieson3",
  },
  {
    id: 5,
    fName: "Erskine",
    lName: "Hatcliffe",
    email: "ehatcliffe4@stumbleupon.com",
    title: "Speech Pathologist",
    bio:
      "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    profileImageUrl: "http://dummyimage.com/130x104.jpg/dddddd/000000",
    password: "sCSxTI3Kpo8",
    username: "ehatcliffe4",
  },
  {
    id: 6,
    fName: "Ania",
    lName: "Gillcrist",
    email: "agillcrist5@prnewswire.com",
    title: "Legal Assistant",
    bio:
      "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    profileImageUrl: "http://dummyimage.com/185x130.jpg/ff4444/ffffff",
    password: "5FgYbkf0f",
    username: "agillcrist5",
  },
  {
    id: 7,
    fName: "Ozzy",
    lName: "Ales",
    email: "oales6@hp.com",
    title: "Compensation Analyst",
    bio:
      "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    profileImageUrl: "http://dummyimage.com/199x114.bmp/5fa2dd/ffffff",
    password: "i50VNGPfl",
    username: "oales6",
  },
  {
    id: 8,
    fName: "Samson",
    lName: "Baker",
    email: "sbaker7@google.com.br",
    title: "Registered Nurse",
    bio:
      "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    profileImageUrl: "http://dummyimage.com/120x122.png/dddddd/000000",
    password: "Gq6HmplZI3pZ",
    username: "sbaker7",
  },
  {
    id: 9,
    fName: "Wenona",
    lName: "Cripwell",
    email: "wcripwell8@youtu.be",
    title: "Help Desk Operator",
    bio:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
    profileImageUrl: "http://dummyimage.com/162x157.jpg/5fa2dd/ffffff",
    password: "2v0zjoPAb",
    username: "wcripwell8",
  },
  {
    id: 10,
    fName: "Hy",
    lName: "Moral",
    email: "hmoral9@1688.com",
    title: "Nurse",
    bio:
      "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
    profileImageUrl: "http://dummyimage.com/222x139.jpg/cc0000/ffffff",
    password: "sYZaepi",
    username: "hmoral9",
  },
  {
    id: 11,
    fName: "Elinore",
    lName: "Beeson",
    email: "ebeesona@adobe.com",
    title: "Senior Cost Accountant",
    bio:
      "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
    profileImageUrl: "http://dummyimage.com/156x198.png/cc0000/ffffff",
    password: "b7MKOnWt6uEK",
    username: "ebeesona",
  },
  {
    id: 12,
    fName: "Johnna",
    lName: "Bohman",
    email: "jbohmanb@about.com",
    title: "Biostatistician II",
    bio:
      "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.",
    profileImageUrl: "http://dummyimage.com/150x231.png/cc0000/ffffff",
    password: "95e2rsyVIKK3",
    username: "jbohmanb",
  },
  {
    id: 13,
    fName: "Fidelia",
    lName: "Gibberd",
    email: "fgibberdc@sciencedirect.com",
    title: "VP Quality Control",
    bio:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    profileImageUrl: "http://dummyimage.com/143x125.png/5fa2dd/ffffff",
    password: "lHOljmlg",
    username: "fgibberdc",
  },
  {
    id: 14,
    fName: "Wendeline",
    lName: "Mawdsley",
    email: "wmawdsleyd@myspace.com",
    title: "Senior Editor",
    bio:
      "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    profileImageUrl: "http://dummyimage.com/138x114.jpg/cc0000/ffffff",
    password: "fZA8U8eixXd",
    username: "wmawdsleyd",
  },
  {
    id: 15,
    fName: "Germayne",
    lName: "Jacquemet",
    email: "gjacquemete@ning.com",
    title: "Dental Hygienist",
    bio:
      "Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    profileImageUrl: "http://dummyimage.com/191x106.jpg/cc0000/ffffff",
    password: "lOSdZqwufXg2",
    username: "gjacquemete",
  },
  {
    id: 16,
    fName: "Lela",
    lName: "Gorke",
    email: "lgorkef@weibo.com",
    title: "Engineer I",
    bio:
      "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
    profileImageUrl: "http://dummyimage.com/199x121.jpg/5fa2dd/ffffff",
    password: "qJ5ROoU2P1wc",
    username: "lgorkef",
  },
  {
    id: 17,
    fName: "Athena",
    lName: "Trevithick",
    email: "atrevithickg@sfgate.com",
    title: "Senior Sales Associate",
    bio:
      "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    profileImageUrl: "http://dummyimage.com/236x228.png/cc0000/ffffff",
    password: "Ot71FjyCm",
    username: "atrevithickg",
  },
  {
    id: 18,
    fName: "Brnaby",
    lName: "Leving",
    email: "blevingh@tumblr.com",
    title: "Senior Financial Analyst",
    bio:
      "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    profileImageUrl: "http://dummyimage.com/179x106.png/dddddd/000000",
    password: "uK7wjZ6jTi5",
    username: "blevingh",
  },
  {
    id: 19,
    fName: "Lucinda",
    lName: "Dwane",
    email: "ldwanei@cisco.com",
    title: "Sales Representative",
    bio:
      "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    profileImageUrl: "http://dummyimage.com/193x175.png/dddddd/000000",
    password: "ksDfHJ",
    username: "ldwanei",
  },
  {
    id: 20,
    fName: "Theodoric",
    lName: "Schaben",
    email: "tschabenj@reuters.com",
    title: "Programmer Analyst II",
    bio:
      "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
    profileImageUrl: "http://dummyimage.com/249x213.png/dddddd/000000",
    password: "93kxx9",
    username: "tschabenj",
  },
  {
    id: 21,
    fName: "Alane",
    lName: "Scemp",
    email: "ascempk@ask.com",
    title: "Quality Control Specialist",
    bio:
      "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
    profileImageUrl: "http://dummyimage.com/127x153.png/5fa2dd/ffffff",
    password: "56gWLKBfjrXz",
    username: "ascempk",
  },
  {
    id: 22,
    fName: "Lilly",
    lName: "Matusson",
    email: "lmatussonl@phoca.cz",
    title: "Staff Accountant III",
    bio:
      "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    profileImageUrl: "http://dummyimage.com/206x168.png/ff4444/ffffff",
    password: "LI9k1KpEr",
    username: "lmatussonl",
  },
  {
    id: 23,
    fName: "Allie",
    lName: "Paxton",
    email: "apaxtonm@liveinternet.ru",
    title: "Financial Analyst",
    bio:
      "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    profileImageUrl: "http://dummyimage.com/234x173.jpg/cc0000/ffffff",
    password: "XnRuS6BaLeB",
    username: "apaxtonm",
  },
  {
    id: 24,
    fName: "Babara",
    lName: "Reicherz",
    email: "breicherzn@taobao.com",
    title: "Occupational Therapist",
    bio:
      "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    profileImageUrl: "http://dummyimage.com/150x125.jpg/5fa2dd/ffffff",
    password: "RDFn4X",
    username: "breicherzn",
  },
  {
    id: 25,
    fName: "Laura",
    lName: "Kleint",
    email: "lkleinto@jalbum.net",
    title: "Automation Specialist IV",
    bio:
      "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
    profileImageUrl: "http://dummyimage.com/216x149.bmp/ff4444/ffffff",
    password: "Ogo2Owv1JpO4",
    username: "lkleinto",
  },
  {
    id: 26,
    fName: "Esta",
    lName: "Doddemeede",
    email: "edoddemeedep@xrea.com",
    title: "Biostatistician III",
    bio:
      "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
    profileImageUrl: "http://dummyimage.com/114x199.png/ff4444/ffffff",
    password: "CPOFHALuBVn",
    username: "edoddemeedep",
  },
  {
    id: 27,
    fName: "Neils",
    lName: "Spavon",
    email: "nspavonq@reference.com",
    title: "GIS Technical Architect",
    bio:
      "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
    profileImageUrl: "http://dummyimage.com/174x234.jpg/cc0000/ffffff",
    password: "lbsDdisz",
    username: "nspavonq",
  },
  {
    id: 28,
    fName: "Angelico",
    lName: "Veale",
    email: "avealer@nhs.uk",
    title: "Internal Auditor",
    bio:
      "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
    profileImageUrl: "http://dummyimage.com/243x180.jpg/cc0000/ffffff",
    password: "3e53pTh4kWEv",
    username: "avealer",
  },
  {
    id: 29,
    fName: "Grace",
    lName: "Cham",
    email: "gchams@sphinn.com",
    title: "Senior Developer",
    bio:
      "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    profileImageUrl: "http://dummyimage.com/161x154.png/dddddd/000000",
    password: "Hmo33BpVPfY",
    username: "gchams",
  },
  {
    id: 30,
    fName: "Adorne",
    lName: "Lemmen",
    email: "alemment@upenn.edu",
    title: "Programmer I",
    bio:
      "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
    profileImageUrl: "http://dummyimage.com/204x232.png/5fa2dd/ffffff",
    password: "XgQFFHRO",
    username: "alemment",
  },
  {
    id: 31,
    fName: "Eduino",
    lName: "Chaman",
    email: "echamanu@dion.ne.jp",
    title: "Technical Writer",
    bio:
      "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
    profileImageUrl: "http://dummyimage.com/172x152.bmp/dddddd/000000",
    password: "jqIRAj",
    username: "echamanu",
  },
  {
    id: 32,
    fName: "Arabele",
    lName: "Macourek",
    email: "amacourekv@java.com",
    title: "Safety Technician I",
    bio:
      "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
    profileImageUrl: "http://dummyimage.com/203x110.bmp/dddddd/000000",
    password: "j1fjoA",
    username: "amacourekv",
  },
  {
    id: 33,
    fName: "Bridie",
    lName: "Mimmack",
    email: "bmimmackw@netscape.com",
    title: "Automation Specialist II",
    bio:
      "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    profileImageUrl: "http://dummyimage.com/199x126.jpg/ff4444/ffffff",
    password: "2zilw4qgzOUv",
    username: "bmimmackw",
  },
  {
    id: 34,
    fName: "Basia",
    lName: "Stannering",
    email: "bstanneringx@accuweather.com",
    title: "Research Assistant II",
    bio:
      "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    profileImageUrl: "http://dummyimage.com/214x189.jpg/cc0000/ffffff",
    password: "C0NxECts",
    username: "bstanneringx",
  },
  {
    id: 35,
    fName: "Galvin",
    lName: "Pavelka",
    email: "gpavelkay@myspace.com",
    title: "Automation Specialist II",
    bio: "Fusce consequat. Nulla nisl. Nunc nisl.",
    profileImageUrl: "http://dummyimage.com/181x171.png/ff4444/ffffff",
    password: "EghI2W2vV0q",
    username: "gpavelkay",
  },
  {
    id: 36,
    fName: "Ursala",
    lName: "Trembath",
    email: "utrembathz@hatena.ne.jp",
    title: "Electrical Engineer",
    bio:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
    profileImageUrl: "http://dummyimage.com/238x241.png/dddddd/000000",
    password: "geq6P0zgB",
    username: "utrembathz",
  },
  {
    id: 37,
    fName: "Adrien",
    lName: "Waiting",
    email: "awaiting10@harvard.edu",
    title: "Human Resources Assistant I",
    bio:
      "Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    profileImageUrl: "http://dummyimage.com/229x231.png/5fa2dd/ffffff",
    password: "T4fg0w",
    username: "awaiting10",
  },
  {
    id: 38,
    fName: "Tory",
    lName: "Dewen",
    email: "tdewen11@goo.ne.jp",
    title: "Help Desk Technician",
    bio:
      "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
    profileImageUrl: "http://dummyimage.com/225x161.jpg/5fa2dd/ffffff",
    password: "ZnlQdQBAf",
    username: "tdewen11",
  },
  {
    id: 39,
    fName: "Kenny",
    lName: "McRuvie",
    email: "kmcruvie12@globo.com",
    title: "Senior Developer",
    bio:
      "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
    profileImageUrl: "http://dummyimage.com/149x183.bmp/cc0000/ffffff",
    password: "k2LamuuPnHJ",
    username: "kmcruvie12",
  },
  {
    id: 40,
    fName: "Herrick",
    lName: "Rosengart",
    email: "hrosengart13@opensource.org",
    title: "Chemical Engineer",
    bio:
      "Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
    profileImageUrl: "http://dummyimage.com/177x191.png/5fa2dd/ffffff",
    password: "wHo5cCR1VAQH",
    username: "hrosengart13",
  },
  {
    id: 41,
    fName: "Frannie",
    lName: "Fenich",
    email: "ffenich14@cdc.gov",
    title: "Compensation Analyst",
    bio:
      "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
    profileImageUrl: "http://dummyimage.com/109x216.bmp/dddddd/000000",
    password: "HeXMrNe4",
    username: "ffenich14",
  },
  {
    id: 42,
    fName: "Geri",
    lName: "Caw",
    email: "gcaw15@ibm.com",
    title: "Teacher",
    bio:
      "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    profileImageUrl: "http://dummyimage.com/226x105.png/dddddd/000000",
    password: "RomdJOSv2F",
    username: "gcaw15",
  },
  {
    id: 43,
    fName: "Gregoire",
    lName: "Thunnerclef",
    email: "gthunnerclef16@bbb.org",
    title: "Occupational Therapist",
    bio:
      "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    profileImageUrl: "http://dummyimage.com/180x250.jpg/5fa2dd/ffffff",
    password: "U9NjzZBZqJKd",
    username: "gthunnerclef16",
  },
  {
    id: 44,
    fName: "Addie",
    lName: "Spawforth",
    email: "aspawforth17@google.fr",
    title: "Design Engineer",
    bio:
      "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
    profileImageUrl: "http://dummyimage.com/210x112.bmp/cc0000/ffffff",
    password: "0ScGcVLt",
    username: "aspawforth17",
  },
  {
    id: 45,
    fName: "Jacqui",
    lName: "Mulrean",
    email: "jmulrean18@cargocollective.com",
    title: "VP Accounting",
    bio:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
    profileImageUrl: "http://dummyimage.com/181x113.jpg/ff4444/ffffff",
    password: "OVcjF0H8aDh3",
    username: "jmulrean18",
  },
  {
    id: 46,
    fName: "Galvan",
    lName: "Mitchenson",
    email: "gmitchenson19@phpbb.com",
    title: "Librarian",
    bio:
      "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    profileImageUrl: "http://dummyimage.com/158x180.bmp/5fa2dd/ffffff",
    password: "w3ADedSuJW8",
    username: "gmitchenson19",
  },
  {
    id: 47,
    fName: "Domenico",
    lName: "Corden",
    email: "dcorden1a@baidu.com",
    title: "Geological Engineer",
    bio:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    profileImageUrl: "http://dummyimage.com/134x174.png/5fa2dd/ffffff",
    password: "6cuRDKdGu",
    username: "dcorden1a",
  },
  {
    id: 48,
    fName: "Joete",
    lName: "Baudin",
    email: "jbaudin1b@thetimes.co.uk",
    title: "Physical Therapy Assistant",
    bio:
      "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    profileImageUrl: "http://dummyimage.com/179x102.jpg/ff4444/ffffff",
    password: "7HB8ytsgHX7",
    username: "jbaudin1b",
  },
  {
    id: 49,
    fName: "Elke",
    lName: "Cushworth",
    email: "ecushworth1c@sitemeter.com",
    title: "Actuary",
    bio: "Fusce consequat. Nulla nisl. Nunc nisl.",
    profileImageUrl: "http://dummyimage.com/236x188.jpg/dddddd/000000",
    password: "g3oasu",
    username: "ecushworth1c",
  },
  {
    id: 50,
    fName: "Shae",
    lName: "Hancill",
    email: "shancill1d@samsung.com",
    title: "Automation Specialist IV",
    bio:
      "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    profileImageUrl: "http://dummyimage.com/107x180.png/cc0000/ffffff",
    password: "dbUamCL1Ue",
    username: "shancill1d",
  },
  {
    id: 51,
    fName: "Nicola",
    lName: "Scoggins",
    email: "nscoggins1e@seattletimes.com",
    title: "Structural Analysis Engineer",
    bio:
      "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
    profileImageUrl: "http://dummyimage.com/109x122.bmp/cc0000/ffffff",
    password: "de2WsTxYLmxF",
    username: "nscoggins1e",
  },
  {
    id: 52,
    fName: "Elke",
    lName: "Filasov",
    email: "efilasov1f@nifty.com",
    title: "Safety Technician I",
    bio:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    profileImageUrl: "http://dummyimage.com/223x141.png/cc0000/ffffff",
    password: "PpAKOa",
    username: "efilasov1f",
  },
  {
    id: 53,
    fName: "Vanni",
    lName: "Grigs",
    email: "vgrigs1g@huffingtonpost.com",
    title: "Accounting Assistant III",
    bio:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
    profileImageUrl: "http://dummyimage.com/186x223.png/5fa2dd/ffffff",
    password: "XM3Dx1",
    username: "vgrigs1g",
  },
  {
    id: 54,
    fName: "Hew",
    lName: "Halvorsen",
    email: "hhalvorsen1h@bbc.co.uk",
    title: "Associate Professor",
    bio: "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
    profileImageUrl: "http://dummyimage.com/163x228.png/ff4444/ffffff",
    password: "65mZt4mNng",
    username: "hhalvorsen1h",
  },
  {
    id: 55,
    fName: "Gibbie",
    lName: "Van Giffen",
    email: "gvangiffen1i@barnesandnoble.com",
    title: "Director of Sales",

    bio:
      "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
    profileImageUrl: "http://dummyimage.com/102x196.png/5fa2dd/ffffff",
    password: "ReKEYQmbDHC5",
    username: "gvangiffen1i",
  },
  {
    id: 56,
    fName: "Rosemary",
    lName: "Handmore",
    email: "rhandmore1j@51.la",
    title: "Business Systems Development Analyst",
    bio:
      "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
    profileImageUrl: "http://dummyimage.com/132x207.png/dddddd/000000",
    password: "HKTKZgKvlOAW",
    username: "rhandmore1j",
  },
  {
    id: 57,
    fName: "Salaidh",
    lName: "Maybery",
    email: "smaybery1k@gmpg.org",
    title: "Statistician IV",
    bio:
      "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    profileImageUrl: "http://dummyimage.com/179x215.bmp/dddddd/000000",
    password: "caJmSxF8p",
    username: "smaybery1k",
  },
  {
    id: 58,
    fName: "Devonne",
    lName: "Rooze",
    email: "drooze1l@rediff.com",
    title: "VP Product Management",
    bio:
      "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
    profileImageUrl: "http://dummyimage.com/226x119.jpg/5fa2dd/ffffff",
    password: "AuOuOclTqh",
    username: "drooze1l",
  },
  {
    id: 59,
    fName: "Hedvige",
    lName: "Friatt",
    email: "hfriatt1m@tuttocitta.it",
    title: "Professor",
    bio:
      "Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    profileImageUrl: "http://dummyimage.com/107x100.bmp/cc0000/ffffff",
    password: "60JNsSOS",
    username: "hfriatt1m",
  },
  {
    id: 60,
    fName: "Saundra",
    lName: "Pudden",
    email: "spudden1n@boston.com",
    title: "Clinical Specialist",
    bio:
      "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    profileImageUrl: "http://dummyimage.com/118x114.jpg/dddddd/000000",
    password: "7IiWG6dx",
    username: "spudden1n",
  },
];

const dummyTeams = [
  { id: 1, name: "Heidenreich-Homenick" },
  { id: 2, name: "Swaniawski-O'Kon" },
  { id: 3, name: "Heaney-Blick" },
  { id: 4, name: "Brown Inc" },
  { id: 5, name: "Kiehn LLC" },
  { id: 6, name: "Carroll-Marvin" },
];

const dummyOrgs = [
  {
    id: 1,
    name: "Nlounge",
    email: "swalthew0@paginegialle.it",
    password: "KLrmyLrTIqTI",
    websiteUrl: "http://comcast.net/dictumst.json",
    imageUrl: "http://dummyimage.com/127x225.jpg/ff4444/ffffff",
  },
  {
    id: 2,
    name: "Eimbee",
    email: "alowle1@disqus.com",
    password: "ne00g4YlwHz",
    websiteUrl:
      "https://123-reg.co.uk/est/lacinia/nisi/venenatis/tristique/fusce.aspx",
    imageUrl: "http://dummyimage.com/196x151.png/cc0000/ffffff",
  },
  {
    id: 3,
    name: "Agimba",
    email: "jgambles2@smh.com.au",
    password: "00gluJHNDq",
    websiteUrl: "https://hp.com/ultrices/posuere.json",
    imageUrl: "http://dummyimage.com/244x207.jpg/ff4444/ffffff",
  },
];

const dummyProjects = [
  {
    title: "IncredibleApp",
    description:
      "Quas assumenda ea. Aut et dicta dolore quia molestiae omnis. Ad aut eos vel voluptatem unde quod doloremque.",
    category: "macOS",
    dateCreated: "2020-10-2112:04:49.209Z",
    status: "Prototype",
  },
  {
    title: "Singify",
    description:
      "Et saepe qui aspernatur in facere deleniti sit ut earum. Perferendis enim nulla laudantium fuga quis. Similique praesentium error voluptatem.",
    category: "macOS",
    dateCreated: "2020-10-20T22:23:05.060Z",
    status: "Prototype",
  },
  {
    title: "Domaingo-API",
    description:
      "Quibusdam occaecati et similique quasi sed necessitatibus. Tempore consectetur atque iure autem possimus est. Porro eligendi ut amet et.",
    category: "macOS",
    dateCreated: "2020-10-21T04:58:48.351Z",
    status: "Prototype",
  },
  {
    title: "InLink-Inbox-Redesign",
    description:
      "Possimus sit ut doloremque consequatur enim. Ut quae quam. At velit sed id quod. Dolore consequatur enim et qui natus necessitatibus culpa.",
    category: "macOS",
    dateCreated: "2020-10-21T11:21:01.854Z",
    status: "Prototype",
  },
  {
    title: "FactChecker-Demo",
    description:
      "Consequatur neque debitis iure laudantium porro voluptas voluptas dolore quia. Non itaque et sunt. Repellat nihil maiores fugiat pariatur temporibus. Iusto itaque tenetur et dolorem nisi ut necessitatibus. Corporis architecto temporibus voluptatem sit odit et.",
    category: "macOS",
    dateCreated: "2020-10-21T17:09:06.199Z",
    status: "Prototype",
  },
  {
    title: "BlocParty",
    description:
      "At quaerat occaecati suscipit odio non. Deserunt voluptatum et maxime quos illo. Est nihil et ab voluptas. Dolores sequi repudiandae omnis.",
    category: "macOS",
    dateCreated: "2020-10-21T12:29:42.927Z",
    status: "Prototype",
  },
];

const dummyComments = [
  {
    dateSent: 1603322999971,
    body:
      "Quo culpa consequatur dolorum id esse dolorem blanditiis dicta. Voluptas est minus esse. Quas omnis accusantium facilis aut voluptatum et.",
  },
  {
    dateSent: 1603322999972,
    body:
      "Et praesentium aut omnis aut voluptatem iure accusantium. Excepturi sit est quidem dolore sit consequatur consequatur recusandae. Aut totam eum maxime odit sint. Quidem tempora magnam omnis recusandae saepe nisi quo maxime. Laboriosam explicabo sequi et sequi tempore non vero ipsa aliquam.",
  },
  {
    dateSent: 1603322999972,
    body:
      "Unde autem maiores voluptatem est quia praesentium dolore. Delectus aut accusantium similique ratione nisi inventore dolorem velit. Soluta iusto alias voluptas sit sed et veritatis qui praesentium. Veritatis quo quia. Autem et eos praesentium eos nihil vero.",
  },
  {
    dateSent: 1603322999972,
    body:
      "A temporibus voluptas saepe temporibus odio dolor voluptates saepe repellat. Nostrum reprehenderit ex architecto sequi et quia asperiores.",
  },
  {
    dateSent: 1603322999972,
    body:
      "Accusantium molestias praesentium voluptas occaecati suscipit praesentium aut ut iusto. Harum consectetur dolorem. Quia aperiam nobis itaque et et dicta. Sed commodi occaecati nihil sunt labore. Veniam hic corrupti minus qui est.",
  },
  {
    dateSent: 1603322999972,
    body:
      "Ut minima pariatur voluptas modi quo. Aut atque dolor laboriosam explicabo dolores quis dignissimos. Soluta ducimus nihil facilis. Inventore quidem deleniti nostrum. Velit quam suscipit totam animi necessitatibus.",
  },
  {
    dateSent: 1603322999972,
    body:
      "Voluptas similique modi nemo molestiae asperiores. Quasi et voluptatum nihil itaque est beatae omnis ut. Et perferendis eos consectetur cupiditate enim. Exercitationem sapiente et doloribus delectus quis et.",
  },
  {
    dateSent: 1603322999972,
    body:
      "Quo accusantium doloribus dicta ut sit ab possimus ullam. Cumque cupiditate nam ut et ea id reprehenderit temporibus. Qui voluptas eos. Corporis aut id laboriosam et et voluptatem magnam.",
  },
  {
    dateSent: 1603322999972,
    body:
      "Quia similique qui. Ipsum qui sed eos molestias doloremque ratione. Unde dolor eveniet sint perferendis illo ipsam nisi. Maxime excepturi soluta temporibus. Vel ut porro repudiandae iusto esse.",
  },
  {
    dateSent: 1603322999972,
    body:
      "Et esse dicta libero quibusdam labore perferendis suscipit. Sint aliquid repellat vel suscipit. Perspiciatis quae totam aut iure earum fuga. Qui vel quia excepturi similique asperiores sint id optio est.",
  },
  {
    dateSent: 1603322999972,
    body:
      "Dolor nesciunt tempora nihil pariatur aut aliquid perspiciatis earum. Illo unde ut. Quo porro nihil aut magni corporis eius error. Nostrum quibusdam laudantium in illum. Et quod a est eveniet distinctio voluptatum ut aut. Sit harum accusamus.",
  },
  {
    dateSent: 1603322999972,
    body:
      "Nostrum quis sit ipsa explicabo quisquam velit inventore perspiciatis voluptatibus. Minus voluptatum qui.",
  },
  {
    dateSent: 1603322999972,
    body:
      "Voluptatem eum facere sit quod quis eius qui fuga. Cupiditate est dicta voluptatibus. Sunt enim sunt dolorem et sit. Debitis quis voluptatum blanditiis consequatur.",
  },
  {
    dateSent: 1603322999972,
    body:
      "Ducimus occaecati quae assumenda. Temporibus id esse aut totam vitae incidunt facilis. Quia impedit perspiciatis beatae voluptas vel.",
  },
  {
    dateSent: 1603322999972,
    body:
      "Perspiciatis et corrupti molestiae consequuntur. Vel cum perspiciatis quia eius pariatur. Quia voluptas occaecati veritatis porro iste esse aliquid omnis. Alias ipsam pariatur accusamus molestiae qui reiciendis. Recusandae iusto rerum est totam laudantium in quidem quae soluta. Veniam rem laudantium quia esse distinctio et nulla quidem.",
  },
  {
    dateSent: 1603322999972,
    body:
      "Sunt tempore laboriosam aut provident pariatur autem. Rerum nobis officia vitae sunt excepturi. Eveniet tenetur et quis quia animi eos sunt deleniti voluptatem.",
  },
  {
    dateSent: 1603322999972,
    body:
      "Et maiores unde quia. Distinctio labore illum consequatur sit a voluptates quasi ullam ut. Blanditiis totam soluta vel dolorem cumque accusamus natus. Porro ullam et est.",
  },
  {
    dateSent: 1603322999972,
    body:
      "Error dolorem minima in. Rerum placeat libero. Quae exercitationem perspiciatis vel. Eum molestias commodi soluta quia aut et laudantium et. Accusantium sunt earum. Laboriosam ut laborum expedita laborum porro.",
  },
  {
    dateSent: 1603322999972,
    body:
      "Fugit dolores alias vero architecto qui repudiandae nihil qui. In et consequatur est velit dolor amet ab totam. Aut deserunt reprehenderit aspernatur animi.",
  },
  {
    dateSent: 1603322999972,
    body:
      "Et voluptas mollitia qui labore asperiores similique. Nesciunt et id cumque adipisci similique quae. Id voluptatem praesentium voluptas optio neque unde eveniet.",
  },
];

const dummyMessages = [
  {
    body:
      "Enim architecto aut voluptas consequatur. Adipisci incidunt ut eaque dicta et molestias. Totam maxime quae veritatis natus veniam enim. Esse eum expedita ipsam nihil autem quaerat ea.",
    timestamp: "Fri Oct 23 2020 16:26:32 GMT-0400 (Eastern Daylight Time)",
  },
  {
    body:
      "Odio saepe alias. Sunt consequatur consequatur totam illum ut. Ad tempore tempore aut molestias accusamus. Dolorem vel voluptas aut praesentium harum qui itaque. Qui cumque totam.",
    timestamp: "Fri Oct 23 2020 16:26:32 GMT-0400 (Eastern Daylight Time)",
  },
  {
    body: "Sequi sed totam beatae quia aut. Et atque reprehenderit.",
    timestamp: "Fri Oct 23 2020 16:26:32 GMT-0400 (Eastern Daylight Time)",
  },
  {
    body:
      "Nihil vero error aut dicta voluptatibus voluptas optio saepe est. Blanditiis minus voluptas consequatur itaque et qui voluptatibus ullam sit. Saepe et incidunt dolorum rerum distinctio. Sint hic maxime quia quaerat.",
    timestamp: "Fri Oct 23 2020 16:26:32 GMT-0400 (Eastern Daylight Time)",
  },
  {
    body:
      "Iusto quis mollitia sed accusamus temporibus aut quisquam inventore qui. Assumenda magni doloremque similique.",
    timestamp: "Fri Oct 23 2020 16:26:32 GMT-0400 (Eastern Daylight Time)",
  },
  {
    body:
      "Vel voluptatem facere non laboriosam nihil tempora et et a. Consectetur asperiores ratione et. Quis ea et voluptas quos non voluptatibus accusamus. Eaque aspernatur magni voluptatem quaerat. Aliquid et ut commodi laborum earum ut provident.",
    timestamp: "Fri Oct 23 2020 16:26:32 GMT-0400 (Eastern Daylight Time)",
  },
  {
    body:
      "Aliquid unde optio id. Aperiam illum non consequatur cupiditate est quisquam beatae placeat. Quis debitis esse qui voluptatum. Quia consequatur voluptatem facere nam officiis. Consequatur voluptatem dicta quae exercitationem exercitationem.",
    timestamp: "Fri Oct 23 2020 16:26:32 GMT-0400 (Eastern Daylight Time)",
  },
  {
    body:
      "Veniam et quis fugit. Temporibus aspernatur voluptatibus aliquid libero repellat cumque quia consectetur. Magnam voluptatem dolores. Doloribus vitae et ducimus similique quasi cumque aspernatur culpa consequatur. Enim reprehenderit tenetur eaque repellendus sit asperiores laudantium rerum beatae.",
    timestamp: "Fri Oct 23 2020 16:26:32 GMT-0400 (Eastern Daylight Time)",
  },
  {
    body:
      "Repudiandae eligendi exercitationem. Voluptas officiis eum deleniti quidem fuga magni voluptatibus cum molestias.",
    timestamp: "Fri Oct 23 2020 16:26:32 GMT-0400 (Eastern Daylight Time)",
  },
  {
    body:
      "Alias et eum occaecati sunt qui iste eaque voluptatem officiis. Veniam rerum eligendi labore reiciendis quaerat voluptates vel. Deleniti laudantium velit rerum fugit voluptas laudantium rem.",
    timestamp: "Fri Oct 23 2020 16:26:32 GMT-0400 (Eastern Daylight Time)",
  },
  {
    body:
      "Repellendus dolorem doloremque. Aut ipsam odit perspiciatis aliquid ex. Similique iste sequi voluptatibus et.",
    timestamp: "Fri Oct 23 2020 16:26:32 GMT-0400 (Eastern Daylight Time)",
  },
  {
    body:
      "Tempora et molestiae maiores voluptate reiciendis voluptates molestiae aut. Ipsum quia natus. Animi consectetur rerum quaerat cum harum doloremque cupiditate quis.",
    timestamp: "Fri Oct 23 2020 16:26:32 GMT-0400 (Eastern Daylight Time)",
  },
  {
    body:
      "Modi atque atque vel ducimus commodi facere odio delectus. Repellat nostrum error corrupti enim. Maxime ad ipsa eaque. Sequi aut distinctio nulla qui eligendi quia fugiat quaerat.",
    timestamp: "Fri Oct 23 2020 16:26:32 GMT-0400 (Eastern Daylight Time)",
  },
  {
    body:
      "Dolorem dolorem veritatis. Nobis accusamus beatae quibusdam delectus totam velit voluptatum autem. Ipsa a qui dolor quasi est numquam et pariatur odio. Veniam consequatur ullam.",
    timestamp: "Fri Oct 23 2020 16:26:32 GMT-0400 (Eastern Daylight Time)",
  },
  {
    body:
      "Nemo modi illo totam provident. Facilis officia aut ut possimus exercitationem ut beatae. Soluta delectus facilis ratione fuga ut totam recusandae. Id explicabo et omnis officiis velit aliquam voluptatem. Hic temporibus hic ut sequi aut quae eum officiis est. Velit et sit id atque.",
    timestamp: "Fri Oct 23 2020 16:26:32 GMT-0400 (Eastern Daylight Time)",
  },
  {
    body:
      "Assumenda neque veritatis. Facere itaque laborum sequi fugiat sunt eaque.",
    timestamp: "Fri Oct 23 2020 16:26:32 GMT-0400 (Eastern Daylight Time)",
  },
  {
    body:
      "Amet sunt voluptatem enim et. Magni fugit vel omnis explicabo rem et est exercitationem.",
    timestamp: "Fri Oct 23 2020 16:26:32 GMT-0400 (Eastern Daylight Time)",
  },
  {
    body:
      "Tempora dolor quos nobis eligendi sed aut architecto nisi autem. Velit qui et aliquam et omnis aut repellendus eum totam. Eum commodi fugiat aperiam excepturi sapiente et voluptatem porro. Voluptatem cum ut nostrum quia dolores. Nesciunt eligendi cum.",
    timestamp: "Fri Oct 23 2020 16:26:32 GMT-0400 (Eastern Daylight Time)",
  },
  {
    body:
      "Sit at magni dolorem commodi. Et sit ut adipisci odit possimus vero dolorem. Eligendi sit accusantium voluptatem alias quasi et. Quos aut facere rerum et voluptate hic quo nihil. Animi expedita est dolor sequi aliquid quia consequuntur odio. Qui numquam culpa quia nihil ad ipsam dolore.",
    timestamp: "Fri Oct 23 2020 16:26:32 GMT-0400 (Eastern Daylight Time)",
  },
  {
    body:
      "Vel rerum aut rerum rerum explicabo et doloribus quis. Vero consequatur inventore asperiores sit expedita ut recusandae ea ipsam. At vel nesciunt non placeat est deserunt similique mollitia.",
    timestamp: "Fri Oct 23 2020 16:26:32 GMT-0400 (Eastern Daylight Time)",
  },
];

const dummyIssues = [
  {
    ticketNumber: 2313065387,
    description:
      "Non ut molestiae voluptas est sit recusandae. Autem distinctio doloremque a. Quis voluptate beatae perferendis odio.",
    summary: "update this on Industrial",
    category: "task",
    status: "in progress",
  },
  {
    ticketNumber: 2495601017,
    description:
      "Corrupti nesciunt minima molestiae iste enim aperiam qui omnis. Et dolore tenetur. Sunt distinctio corporis delectus quia voluptates doloribus laudantium natus reprehenderit.",
    summary: "fix this on Games",
    category: "task",
    status: "open",
  },
  {
    ticketNumber: 1870925096,
    description:
      "Eos et numquam ut debitis voluptas. Inventore aut unde blanditiis reiciendis harum animi rerum. Ratione laborum omnis fuga.",
    summary: "fix this on Grocery",
    category: "report",
    status: "in progress",
  },
  {
    ticketNumber: 1623060565,
    description:
      "Corporis quia assumenda in voluptatum nostrum optio ipsam veritatis. Fugit eligendi rerum nostrum. Beatae vitae expedita ut minus.",
    summary: "update this on Home",
    category: "report",
    status: "open",
  },
  {
    ticketNumber: 346695240,
    description:
      "Animi repudiandae facere reiciendis omnis. Voluptatibus qui enim est cumque animi. Quia consectetur alias accusamus sed aut nihil.",
    summary: "fix this on Industrial",
    category: "feature",
    status: "open",
  },
  {
    ticketNumber: 1352142806,
    description:
      "Incidunt maxime quis consequuntur officiis voluptatem consequatur. Earum placeat minima qui voluptas ea et. Nihil voluptatem vel molestiae voluptas qui cupiditate quis minus.",
    summary: "update this on Jewelery",
    category: "feature",
    status: "in progress",
  },
  {
    ticketNumber: 2953838719,
    description:
      "Dolor doloribus aliquam. Deserunt perferendis omnis quae. Voluptas doloribus labore earum et natus quo sunt.",
    summary: "fix this on Beauty",
    category: "report",
    status: "in progress",
  },
  {
    ticketNumber: 2980542885,
    description:
      "Provident quia temporibus dolores iure autem quo iusto laudantium. At aperiam illum cupiditate at et et nam. Omnis voluptas dolore nostrum voluptates aliquid quo cumque modi.",
    summary: "fix this on Outdoors",
    category: "task",
    status: "open",
  },
  {
    ticketNumber: 2348369175,
    description:
      "Corporis veniam velit. Iure officiis deserunt. Et architecto quis.",
    summary: "review this on Toys",
    category: "task",
    status: "open",
  },
  {
    ticketNumber: 25120091,
    description:
      "Et aut laboriosam corrupti et vel culpa non voluptatem laboriosam. Doloremque odio est saepe laboriosam voluptatem corrupti cumque velit. Excepturi eveniet quis saepe.",
    summary: "test this on Beauty",
    category: "bug",
    status: "in progress",
  },
  {
    ticketNumber: 2268470248,
    description:
      "Et qui cumque repellat hic explicabo voluptatum sit. Odio sint praesentium suscipit quae magnam dolor at voluptatum. Libero eos perferendis accusantium quasi optio.",
    summary: "update this on Sports",
    category: "task",
    status: "open",
  },
  {
    ticketNumber: 1435583556,
    description:
      "Itaque dolor nisi voluptatem modi cum voluptatem unde quibusdam impedit. Qui magnam consequuntur quis nemo. Placeat non animi dicta molestiae voluptas sed fuga.",
    summary: "review this on Books",
    category: "bug",
    status: "in progress",
  },
  {
    ticketNumber: 463792127,
    description:
      "Ut facilis aut veritatis quasi et nulla molestiae. Tempore sequi consequatur quia vitae incidunt. Quasi corrupti qui dicta aspernatur tempore omnis.",
    summary: "fix this on Movies",
    category: "task",
    status: "open",
  },
  {
    ticketNumber: 2488044815,
    description:
      "Nulla sit voluptates cupiditate. Totam repellat voluptatem veritatis voluptatem sapiente repellendus voluptatem culpa. Repellendus voluptates sit modi itaque a est.",
    summary: "fix this on Electronics",
    category: "feature",
    status: "in progress",
  },
  {
    ticketNumber: 525668088,
    description:
      "Dolores ex doloremque sunt. Doloremque animi qui tempora ipsa qui. Deleniti magnam inventore rerum.",
    summary: "fix this on Electronics",
    category: "report",
    status: "in progress",
  },
  {
    ticketNumber: 367151750,
    description:
      "Voluptatem dolores sint laboriosam vero et sint fugit. Doloribus sed accusantium. Dolores est dolorem natus ipsum architecto.",
    summary: "fix this on Kids",
    category: "feature",
    status: "closed",
  },
  {
    ticketNumber: 2878888186,
    description:
      "Illum rem aperiam facilis. Eum consequuntur ratione sit ratione quae quasi magni. Hic sit laboriosam facere asperiores natus.",
    summary: "update this on Baby",
    category: "report",
    status: "open",
  },
  {
    ticketNumber: 575219723,
    description:
      "Voluptatum error expedita tempora in quos velit ea. Et quod porro odio temporibus similique. Laudantium blanditiis maiores occaecati porro facilis dolor.",
    summary: "fix this on Games",
    category: "task",
    status: "closed",
  },
  {
    ticketNumber: 910027501,
    description:
      "Et eligendi consectetur qui accusamus quas unde officiis accusantium. Quo ducimus error officia nesciunt. Voluptatem repudiandae fuga animi.",
    summary: "review this on Automotive",
    category: "feature",
    status: "in progress",
  },
  {
    ticketNumber: 416120817,
    description:
      "Et officiis suscipit nihil voluptatem adipisci. Nihil sunt impedit eaque molestiae. A ut sit rem deserunt pariatur.",
    summary: "fix this on Sports",
    category: "bug",
    status: "closed",
  },
];
// DUMMY ASSOCIATORS //

async function associateTeamOrgs() {
  try {
    const teams = await Team.findAll();
    const orgs = await Organization.findAll();
    const users = await User.findAll();
    for (let i = 0; i < teams.length; i++) {
      let org1 = orgs[0];
      let org2 = orgs[1];

      let curTeam = teams[i];
      if (i % 2 !== 0) {
        await curTeam.setOrganization(org1);
      } else {
        await curTeam.setOrganization(org2);
      }
    }
    for (let i = 0; i < users.length; i++) {
      let team1 = teams[0];
      let team2 = teams[1];

      let curUser = users[i];
      if (i % 2 !== 0) {
        await curUser.setTeam(team1);
      } else {
        await curUser.setTeam(team2);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function associateUserTeams() {
  try {
    const teams = await Team.findAll();
    for (let i = 0; i < users.length; i++) {
      let team1 = teams[0];
      let team2 = teams[1];

      let curUser = users[i];
      if (i % 2 !== 0) {
        await curUser.setTeam(team1);
      } else {
        await curUser.setTeam(team2);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function associateProjectTeams() {
  try {
    const projects = await Project.findAll();
    const teams = await Team.findAll();
    for (let i = 0; i < projects.length; i++) {
      let team1 = teams[0];
      let team2 = teams[1];

      let curProject = projects[i];
      if (i % 2 !== 0) {
        await curProject.setTeam(team1);
      } else {
        await curProject.setTeam(team2);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function associateProjectUsers() {
  try {
    const projects = await Project.findAll();
    const users = await User.findAll();
    for (let i = 0; i < users.length; i++) {
      let project1 = projects[0];
      let project2 = projects[1];
      let curUser = users[i];
      if (i % 2 !== 0) {
        await curUser.setProjects(project1);
      } else {
        await curUser.setProjects(project2);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function associateUserComments() {
  try {
    const comments = await Comment.findAll();
    const users = await User.findAll();
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      for (let j = i + 1; j < comments.length; j++) {
        let curComment = comments[j];
        await curComment.setUser(user);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function associateUserMessages() {
  try {
    const messages = await Message.findAll();
    const users = await User.findAll();
    for (let i = 1; i <= messages.length; i += 2) {
      let message1 = messages[i];
      let message2 = messages[i - 1];
      let user1 = users[0];
      let user2 = users[1];

      user1.setSender(message1);
      message1.setMessage(user2);
      user2.setSender(message2);
      message2.setMessage(user1);
    }
  } catch (err) {
    console.error(err);
  }
}

async function tagSync() {
  try {
    const tags = await Tag.findAll();
    const issues = await Issue.findAll();

    for (let i = 0; i < tags.length; i++) {
      let issue = issues[Math.floor(Math.random() * issues.length)];
      let tag = tags[i];
      tag.setIssue(issue);
    }
  } catch (err) {
    console.error(err);
  }
}

async function associateProjectIssues() {
  try {
    const issues = await Issue.findAll();
    const projects = await Project.findAll();
    for (let i = 0; i < issues.length; i++) {
      let issue = issues[i];
      let project = projects[Math.floor(Math.random() * projects.length)];

      issue.setProject(project);
    }
  } catch (err) {
    console.error(err);
  }
}

async function associateIssues() {
  try {
    const issues = await Issue.findAll();
    const users = await User.findAll();
    const comments = await Comment.findAll();

    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      comment.setIssue(issues[Math.floor(Math.random() * issues.length)]);
    }
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      // let otherIssue = issues[Math.floor(Math.random() * issues.length)];

      for (let j = 0; j < 4; j++) {
        let issue = issues[Math.floor(Math.random() * issues.length)];
        user.setAssignee(issue);
        issue.setAssigned(user);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

// MAIN SEED FUNCTION //

async function seed(data, model) {
  const items = await Promise.all([
    data.forEach(async dataPoint => {
      try {
        await model.create(dataPoint);
      } catch (err) {
        console.error(err);
      }
    }),
  ]);
  console.log(`dataset seeded successfully`);
}

// MULTI-SEEDER FUNCTION //

async function runSeed() {
  console.log("seeding...");
  try {
    // await db.sync({ force: true });
    console.log("db synced!");
    await seed(dummyTeams, Team).then(() =>
      console.log(`seeded ${dummyTeams.length} teams`)
    );
    await seed(dummyUsers, User).then(() =>
      console.log(`seeded ${dummyUsers.length} users`)
    );
    await seed(dummyOrgs, Organization).then(() =>
      console.log(`seeded ${dummyOrgs.length} organizations`)
    );
    await seed(dummyIssues, Issue).then(() =>
      console.log(`seeded ${dummyIssues.length} issues`)
    );
    await seed(dummyProjects, Project).then(() =>
      console.log(`seeded ${dummyProjects.length} projects`)
    );
    await seed(dummyComments, Comment).then(() =>
      console.log(`seeded ${dummyComments.length} comments`)
    );
    await seed(dummyMessages, Message).then(() =>
      console.log(`seeded ${dummyMessages.length} messages`)
    );
    await seed(dummyTags, Tag).then(() =>
      console.log(`seeded ${dummyTags.length} tags`)
    );

    await associateUserTeams();
    console.log("now associating");
    await associateTeamOrgs();
    await associateProjectTeams();
    await associateProjectUsers();
    await associateUserComments();
    await associateUserMessages();
    await associateProjectIssues();
    await associateIssues();
    await tagSync();
  } catch (err) {
    console.error(err);
  }
}

async function closeDb() {
  try {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  } catch (err) {
    console.error(err);
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).

if (module === require.main) {
  runSeed();
}
if (process.env.NODE_ENV === "test") {
  runSeed().then(() => closeDb());
}
// ASSOCIATOR SEQUENCE //

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
