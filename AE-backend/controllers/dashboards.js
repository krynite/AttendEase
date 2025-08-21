// Imports
const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const verifyToken = require("../middleware/verify-token");
const { verify } = require("jsonwebtoken");

//* base on Epoch time, determine last 3 months 1st Date and current month last Date.
const getMonthFirstLastDate = (epochTimeStamp, pastMonth = 1) => {
  let returnFirstLastDate = {
    dateInit: 0,
    dateLast: 0,
  };
  const date = new Date(epochTimeStamp);
  const month = date.getMonth();
  const year = date.getFullYear();

  //* set last date of the month
  date.setMonth(month + 1, 0);
  returnFirstLastDate.dateLast = date.setUTCHours(23, 59, 59, 999);

  //*set earlier month on pastMonth = number of months back.
  if (pastMonth > 1) {
    date.setMonth(month - pastMonth + 1, 2); //* Added +1 to offset earlier add one month and underflow date.
    returnFirstLastDate.dateInit = date.setUTCHours(0, 0, 0, 0);
  } else {
    date.setMonth(month, 2);
    returnFirstLastDate.dateInit = date.setUTCHours(0, 0, 0, 0);
  }
  // console.log(`return ${JSON.stringify(returnFirstLastDate)}`)

  return returnFirstLastDate;
};

router.get("/", verifyToken, async (req, res) => {
  // TBD req receive from front which month.

  const { dashDate, lastMonth, dashSCFA } = req.body;

  console.log(dashDate, lastMonth, dashSCFA);
  // getMonthFirstLastDate(dashDate, lastMonth);
  console.log(getMonthFirstLastDate(dashDate, lastMonth));

  try {
    // res.status(200).json(req.body.prevMonth);
    const fetchDate = await Student.find({
      enrollStatus : "active",
      enrollDate : {
        $gte
      }
    })


  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
