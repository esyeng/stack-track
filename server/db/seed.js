"use strict";
const faker = require("faker");
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

// DUMMY ASSOCIATORS //

async function associateTeamOrgs() {
  try {
    const teams = await Team.findAll();
    const orgs = await Organization.findAll();
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
  } catch (err) {
    console.error(err);
  }
}

async function associateUserTeams() {
  try {
    const users = await User.findAll();
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
// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.

// MAIN SEED FUNCTION //

async function seed(data, model) {
  const items = await Promise.all([
    data.forEach(dataPoint => model.create(dataPoint)),
  ]);
  console.log(`dataset seeded successfully`);
}

// MULTI-SEEDER FUNCTION //

async function runSeed() {
  console.log("seeding...");
  try {
    // await db.sync({ force: true });
    // console.log("db synced!");
    await seed(dummyTeams, Team);
    console.log(`seeded ${dummyTeams.length} teams`);
  } catch (err) {
    console.error(err);
  }

  try {
    await seed(dummyUsers, User);
    console.log(`seeded ${dummyUsers.length} users`);
  } catch (err) {
    console.error(err);
  }

  try {
    await seed(dummyOrgs, Organization);
    console.log(`seeded ${dummyOrgs.length} organizations`);
  } catch (err) {
    console.error(err);
  }

  try {
    await seed(dummyProjects, Project);
    console.log(`seeded ${dummyProjects.length} projects`);
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
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// ASSOCIATOR SEQUENCE //
associateTeamOrgs();
associateUserTeams();
associateProjectTeams();
// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
