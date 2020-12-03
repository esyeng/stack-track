// import React, { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import { TextField } from "@material-ui/core";

// const useStyles = makeStyles({
//   textField: {
//     marginLeft: 200,
//     marginRight: 10,
//     marginTop: 20,
//     width: "88%",
//     backgroundColor: "white",
//     opacity: "85%",
//   },
// });

// const SearchBar = props => {
//   const classes = useStyles();
//   const [isSearching, setSearching] = useState(false);
//   const [searchValue, setSearchValue] = useState(null);

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       console.log(searchValue);
//     }, 3000);

//     return () => clearTimeout(delayDebounceFn);
//   }, [searchValue]);

//   return (
//     <form noValidate autoComplete="off">
//       <TextField
//         id="outlined-full-width"
//         label="Search"
//         className={classes.textField}
//         placeholder="Ticket Number, Desc, etc."
//         helperText="Find tickets by filter"
//         fullWidth
//         margin="normal"
//         InputLabelProps={{
//           shrink: true,
//         }}
//         variant="outlined"
//         onChange={evt => setSearchValue(evt.target.value)}
//       />
//     </form>
//   );
// };

// export default SearchBar;

// item => {
//                     if (!searchValue) {
//                       return item;
//                     } else if (
//                       toString(item.ticketNumber).includes(searchValue) ||
//                       toString(item.summary)
//                         .toLowerCase()
//                         .includes(toString(searchValue).toLowerCase()) ||
//                       toString(item.description)
//                         .toLowerCase()
//                         .includes(searchValue.toLowerCase())
//                     ) {
//                       return item;
//                     }
//                   })

// SEARCHBAR LOGIC

// const filterIssues = () => {
//   issues.length
//     ? (filteredIssues = issues.filter(issue => {
//         return toString(issue.summary.indexOf(searchValue) !== -1);
//       }))
//     : null;
//   return filteredIssues;
// };

// filterIssues();
// console.log(filteredIssues);
