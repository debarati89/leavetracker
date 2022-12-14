 
import moment from "moment";
import axios from "axios"; 
import { config } from "./config";  
let data;
const monthNameObj = {
  January: 'January',
  February: 'February',
  March: 'March',
  April: 'April',
  May: 'May',
  June: 'June',
  July: 'July',
  August: 'August',
  September: 'September',
  October: 'October',
  November: 'November',
  December: 'December'
}
  
  const getWeekendArray = (start, end) => {
    var weekendArr = new Array();
    var dt = new Date(start);
    while (dt <= new Date(end)) { 
      if (dt.getDay() === 5) { // Looking for Friday only
        weekendArr.push(new Date(dt));
      }
        dt.setDate(dt.getDate() + 1);
    }  
    return weekendArr;
    }
    const getColumns = (weekends) => {
      let columnsArray = [];
      for (let i = 0; i < weekends.length; i++) {
        let dt = moment(weekends[i]).format('YYYY-MM-DD');
        columnsArray.push(dt);
      }
      return columnsArray;
    }  
    const updateMonthName = (columns) => {
      let currentMonthName = '';
      let updatedColumns = [];
      
      for (let i = 0; i < columns.length; i++) {
        if (currentMonthName.length > 0 && moment(columns[i]).format('MMMM') !== currentMonthName) {
          if (!updatedColumns.includes(currentMonthName)) {
            updatedColumns.push(currentMonthName)
          } 
        }
        currentMonthName = moment(columns[i]).format('MMMM');
        updatedColumns.push(columns[i])
      };
      //console.log(currentMonthName, columns[columns.length-1]);
      updatedColumns.push(moment(columns[columns.length - 1]).format('MMMM'))
      return updatedColumns;
} 
const getDaysBetweenDates = (startDate, endDate) => {
  const dateArray = [];
  let currentDate = new Date(startDate); 
  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate)); 
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }
  return dateArray;
};
const checkforHoliday = (date) => {
  let isHoliday = false;
  let holidays = data.holidays; 
  for (let i = 0; i < holidays.length; i++) {
    let holidayData = holidays[i];
    let holidayDate = new Date(holidayData['startDate']).setHours(0, 0, 0, 0);
    if (holidayDate === date) {
      isHoliday = true;
    }
  }
  return isHoliday;
}
const getAppliedLeave = (resource, endDate, appliedLeaves) => {
  let count = 0;
  if (!appliedLeaves) { 
    return count;
  }
  if (appliedLeaves && appliedLeaves.length ===0) { 
    return count;
  }
  endDate = new Date(endDate);
  endDate.setHours(0, 0, 0, 0);
  let startDate = new Date(new Date(endDate).setDate(new Date(endDate).getDate() - 4)).setHours(0, 0, 0, 0);
 
  // days 
  let currentMonthLeaves = appliedLeaves.filter(item => new Date(item.startDate).getMonth() === new Date(endDate).getMonth() || new Date(item.endDate).getMonth() === new Date(endDate).getMonth());
  currentMonthLeaves.forEach(item => { 
    var dateList = getDaysBetweenDates(item['startDate'], item['endDate']); 
    for (let i = 0; i < dateList.length; i++) {
      let leaveDate = dateList[i];
      leaveDate = new Date(leaveDate).setHours(0, 0, 0, 0);
      const isHoliday = checkforHoliday(leaveDate);
      if (!isHoliday && leaveDate >= startDate && leaveDate <= endDate) {
        console.log('leaveDay', new Date(leaveDate))
        count++;
      }
    }
  })
 
  return count;
}
const getHolidayCount = (resource, endDate) => {
  let count = 0;
  endDate = new Date(endDate);
  endDate.setHours(0, 0, 0, 0);
  let startDate = new Date(new Date(endDate).setDate(new Date(endDate).getDate() - 4)).setHours(0, 0, 0, 0);
  let holidays = data.holidays;
  endDate.setHours(0, 0, 0, 0);
  for (let i = 0; i < holidays.length; i++) {
    let holidayData = holidays[i];
    let holidayDate = new Date(holidayData['startDate']).setHours(0, 0, 0, 0);
    if (holidayDate >= startDate && holidayDate <= endDate && resource.location === holidayData.location) {
      count++;
    }
  }
  return count;
}
const checkDateExist = (startDate, endDate, workingWeek) => {
  let isExist = false; 
  if (startDate <= new Date(endDate) && new Date(endDate) <= new Date(workingWeek)) {
    isExist = true;
  } 
  return isExist;
}
const getWorkingDays = (workingWeek, reportObj) => {
  let workingdays = 5; let startDate;
  let endDate = reportObj['endDate'];  
  let useStartDate = reportObj['startDate']; 
  if (useStartDate && new Date(startDate) > new Date(workingWeek)) { 
    return workingdays = 0;
  }
  if (endDate && new Date(endDate) > new Date(workingWeek)) {
      startDate = new Date(new Date(new Date(workingWeek).setDate(new Date(workingWeek).getDate() - 4)).setHours(0, 0, 0, 0));
    if (new Date(useStartDate) > new Date(startDate)) {
      startDate = new Date(useStartDate)
    }
    workingdays = getDaysDifference(startDate, workingWeek)['difference'];
  }
  else { 
      startDate = new Date(new Date(new Date(workingWeek).setDate(new Date(workingWeek).getDate() - 4)).setHours(0, 0, 0, 0));
    if (checkDateExist(startDate, endDate, workingWeek)) { 
      workingdays = getDaysDifference(startDate, endDate)['difference'];
    }
    else { 
      workingdays = 0; 
    } 
  }
  return workingdays; 
};
const prepareReport = (resourceList, columnList, leaves) => {
  let reportData = [];
  let currentMonthHrs = 0;
  for (let i = 0; i < resourceList.length; i++) {
    let resource = resourceList[i];
    let reportObj = {};
    for (let j = 0; j < columnList.length; j++) {
      let column = columnList[j];
      if (column === 'resourceName') {
        reportObj.resourceName = resource['name'];
        reportObj.resourceId = resource._id;
        reportObj.role = resource.role;
        reportObj.claimHrs = resource.claimHrs;
      } else if (column === 'startDate') {
        reportObj.startDate = moment(new Date(resource.startDate)).format('DD MMM YY');
      }
      else if (column === 'endDate') {
        reportObj.endDate = moment(new Date(resource.endDate)).format('DD MMM YY');
      }
      else if (column === 'isActive') {
        reportObj.isActive = resource.isActive;
      }
      else if (column === 'location') {
        reportObj.location = resource.location;
      }
      else {
        if (monthNameObj[column]) {
          reportObj[column] = currentMonthHrs;
          currentMonthHrs = 0;
        }
        else {
          let appliedResourcesLeaves = leaves.filter(item => item.resourceId === reportObj.resourceId);
           
          let leaveCount = resource['claimHrs'] * getAppliedLeave(resource, column, appliedResourcesLeaves);
          //console.log(`Applied ${leaveCount} b/w ${column}`)
          let holidayCount = resource['claimHrs'] * getHolidayCount(resource, column);
          let workingHrs = getWorkingDays(column, reportObj) * resource['claimHrs'];
          let claimHrs = workingHrs === 0 ? 0 : workingHrs - leaveCount - holidayCount;
          reportObj[column] = claimHrs < 0 ? 0 : claimHrs;
          currentMonthHrs = currentMonthHrs + claimHrs < 0 ? 0 : currentMonthHrs + claimHrs;
        }
      }
    }
    reportData.push(reportObj);
  }
  return reportData;
}
const generateReport = (startDate, endDate, responseData) => { 
  data = responseData;
  let leaves = data.leaves;
  leaves.sort(getSortOrder('startDate'));
  let reportWeekends = getWeekendArray(startDate, endDate);
  let updatedColumns = getColumns(reportWeekends);
   updatedColumns = updateMonthName(updatedColumns); 
  updatedColumns.splice(0, 0, 'resourceName');
  updatedColumns.splice(1, 0, 'startDate');
  updatedColumns.splice(2, 0, 'endDate');
  updatedColumns.splice(3, 0, 'location');
  let reportData = prepareReport(data.resources, updatedColumns, leaves);   
  console.log(updatedColumns);
  console.log(reportData);
  return {
    reportData,
    updatedColumns
  };
 }
const getReportData = (startDate, endDate) => { 
  const url = `${config.apiURL}/getReportCollection`;
  return axios.get(url).then((json) => generateReport(startDate, endDate, json.data));
}
    
export const getSortOrder = (prop) => { 
  return function(a, b) {    
      if (a[prop] > b[prop]) {    
          return 1;    
      } else if (a[prop] < b[prop]) {    
          return -1;    
      }    
      return 0;    
  }    
}    
export const getDaysDifference = (startDate, endDate) => {
  const dateArray = [];
  let currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate));
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }
  return {
    dateArray,
    difference: dateArray.length
  };
};

export const getHolidayCountValidation = (holidays, resource, startDate, endDate) => {
  let isHoliday = false;
  endDate = new Date(new Date(endDate).setHours(0, 0, 0, 0));
  startDate = new Date(new Date(startDate).setHours(0, 0, 0, 0)); 
  for (let i = 0; i < holidays.length; i++) {
    let holidayData = holidays[i];
    let holidayDate = new Date(holidayData['startDate']).setHours(0, 0, 0, 0);
    if (holidayDate >= startDate && holidayDate <= endDate && resource.location === holidayData.location) {
      return {
        isHoliday: true,
        holidayDetails: holidayData.name +' ('+ moment(new Date(holidayDate)).format('DD MMM YYYY')+')'
      }
    }
  }
  return isHoliday;
}
export default getReportData;