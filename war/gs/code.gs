/**
 * The function in this script will be called by the Apps Script Execution API.
 */

/**
 * A special function that runs when the spreadsheet is open, used to add a
 * custom menu to the spreadsheet.


function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Go', functionName: 'start_'}
  ];
  spreadsheet.addMenu('Start', menuItems);
}

 */

/**
 * The function item in the menu "Start" of the spreadsheet.
 * Write the hardcoded inputs (as an unit test case) into certain Spreadsheet fields by calling writeInput


function start_() {
  var startDate = new Date(2014,0,1);
  var endDate = new Date(2015,10,30);
  writeInput('stock','AAPL',startDate,endDate,1);
}

 */
/**
 * @deprecated
 * This function enable writing input into the UI sheet directly.
 * It is no longer called by the volatilitytrend program as it is replaced by writeStock and writeIndex to handle different logic 


function writeInput(type,ticker,dateFrom,dateTo,weekday) {
  
  SpreadsheetApp.flush();
  var spreadsheet = SpreadsheetApp.openById('1Iia7O209l-2NzD1md_r2A20zfcX8PmXWmx4MSGOTEMM');
  var uiSheet = spreadsheet.getSheetByName('UI');
  uiSheet.activate();
  
  uiSheet.getRange('C6').setValue(type);
  uiSheet.getRange('C8').setValue(ticker);
  uiSheet.getRange('D10').setValue(dateFrom);
  uiSheet.getRange('F10').setValue(dateTo);
  uiSheet.getRange('C12').setValue(weekday);
  SpreadsheetApp.flush();
  
}

 */

/**
 * This function is called when the ticker type is a stock.
 * This write stock ticker and date range values to the spreadsheet for computing volatility statistics on the spreadsheet based on parameters {ticker, dateFrom, dateTo} 
 * @return the stock name, corresponding index code and name
 */

function writeStock(ticker,dateFrom,dateTo) {
  var spreadsheet = SpreadsheetApp.openById('1Iia7O209l-2NzD1md_r2A20zfcX8PmXWmx4MSGOTEMM');
  var stockSheet = spreadsheet.getSheetByName('stock');
  stockSheet.activate();
  stockSheet.getRange('B3').setValue(ticker);
  stockSheet.getRange('C3').setValue('');
  stockSheet.getRange('BT4').setValue(dateFrom);
  stockSheet.getRange('BV4').setValue(dateTo);
  SpreadsheetApp.flush();
  
  var result = [stockSheet.getRange(2,6).getValue(),stockSheet.getRange(2,39).getValue(),stockSheet.getRange(2,40).getValue()];
  return result;
}


/**
 * This function is called when the ticker type is an index.
 * This write index ticker and date range values to the spreadsheet for computing volatility statistics on the spreadsheet based on parameters {ticker, dateFrom, dateTo} 
 * @return the index name
 */

function writeIndex(ticker,dateFrom,dateTo) {
  var spreadsheet = SpreadsheetApp.openById('1Iia7O209l-2NzD1md_r2A20zfcX8PmXWmx4MSGOTEMM');
  var stockSheet = spreadsheet.getSheetByName('stock');
  stockSheet.activate();
  
  stockSheet.getRange('B3').setValue('');
  stockSheet.getRange('C3').setValue(ticker);
  stockSheet.getRange('BT4').setValue(dateFrom);
  stockSheet.getRange('BV4').setValue(dateTo);
  SpreadsheetApp.flush();
  
  var result = stockSheet.getRange(2,40).getValue();
  return result;
}


/**
 * Performance Tuning function call.
 * replace the spreadsheet formula to array computation 
 * Output the statistics summary of 1 row in UI sheet
 * @return A (2 x 4) array table of the statistics output


function compute(){ // (num) {
  
var num = 24;  
  var spreadsheet = SpreadsheetApp.openById('1Iia7O209l-2NzD1md_r2A20zfcX8PmXWmx4MSGOTEMM');
  
  var stockSheet = spreadsheet.getSheetByName('stock');
  var uiSheet = spreadsheet.getSheetByName('UI');
  
  var aList = new Array(10000);
  var aMean = 0;
  var aMedian = 0;
  var aSD = 0;
  var aCount = 0;
  
  if (num == 24){
    
    
  }
  
  
  uiSheet.activate();
  uiSheet.getRange('B19').setValue(aMean);
  uiSheet.getRange('C19').setValue(aMedian);
  uiSheet.getRange('D19').setValue(aSD);
  uiSheet.getRange('F19').setValue(aCount);
  SpreadsheetApp.flush();

  
}
 */

/**
 * Read Only function call.
 * Output the statistics summary of specific row
 * @return A (2 x 8) array table of the statistics output
 */

function getVolatility(type,num) {
  var spreadsheet = SpreadsheetApp.openById('1Iia7O209l-2NzD1md_r2A20zfcX8PmXWmx4MSGOTEMM');
  var uiSheet = spreadsheet.getSheetByName('UI');
  uiSheet.activate();
  var results;
  
  if ((type == 'allStock')||(type == 'allIndex')){
    results = uiSheet.getRange(2,11,num+1,11).getValues();
  }else{
    results = uiSheet.getRange(Number(num),1,2,10).getValues();
  }
  
  return results;

}

/**
 * @deprecated
 * Output the statistics summary of specific row
 * @return A (1 x 8) array table of the statistics output


function getLoopVolatility(num) {
  SpreadsheetApp.flush();
  var spreadsheet = SpreadsheetApp.openById('1Iia7O209l-2NzD1md_r2A20zfcX8PmXWmx4MSGOTEMM');
  var uiSheet = spreadsheet.getSheetByName('UI');
  uiSheet.activate();
  var results = uiSheet.getRange(Number(num),1,1,9).getValues();
  return results;

}
 */
/**
 * Set the stock ticker and date range
 * Output the statistics summary of specific row for stock
 * @return A (1 x 8) array table of the statistics output
 */
function getStockVolatility(ticker,dateFrom,dateTo,num) {
  var spreadsheet = SpreadsheetApp.openById('1Iia7O209l-2NzD1md_r2A20zfcX8PmXWmx4MSGOTEMM');
  var stockSheet = spreadsheet.getSheetByName('stock');
  var uiSheet = spreadsheet.getSheetByName('UI');
  stockSheet.activate();
  stockSheet.getRange('B3').setValue(ticker);
  stockSheet.getRange('C3').setValue('');
  stockSheet.getRange('BT4').setValue(dateFrom);
  stockSheet.getRange('BV4').setValue(dateTo);
  SpreadsheetApp.flush();
  Utilities.sleep(20000);
  uiSheet.activate();
  var results = uiSheet.getRange(Number(num),1,1,10).getValues();
  return results;
}

/*

 * Set the index ticker and date range
 * Output the statistics summary of specific row for index
 * @return A (1 x 8) array table of the statistics output
 */
function getIndexVolatility(ticker,dateFrom,dateTo,num) {
  var spreadsheet = SpreadsheetApp.openById('1Iia7O209l-2NzD1md_r2A20zfcX8PmXWmx4MSGOTEMM');
  var stockSheet = spreadsheet.getSheetByName('stock');
  var uiSheet = spreadsheet.getSheetByName('UI');
  stockSheet.activate();
  stockSheet.getRange('B3').setValue('');
  stockSheet.getRange('C3').setValue(ticker);
  stockSheet.getRange('BT4').setValue(dateFrom);
  stockSheet.getRange('BV4').setValue(dateTo);
  SpreadsheetApp.flush();
  Utilities.sleep(20000);
  uiSheet.activate();
  var results = uiSheet.getRange(Number(num),1,1,10).getValues();
  return results;
}

/**
 * @return the list of all stock
 */

function getAllStock() {
  SpreadsheetApp.flush();
  var spreadsheet = SpreadsheetApp.openById('1Iia7O209l-2NzD1md_r2A20zfcX8PmXWmx4MSGOTEMM');
  var tickerSheet = spreadsheet.getSheetByName('ticker');
  tickerSheet.activate();
  var total = tickerSheet.getRange(1,8).getValue();
  var results = tickerSheet.getRange(2,1,total,1).getValues();
  return results;
}

/**
 * @return the list of all index
 */

function getAllIndex() {
  SpreadsheetApp.flush();
  var spreadsheet = SpreadsheetApp.openById('1Iia7O209l-2NzD1md_r2A20zfcX8PmXWmx4MSGOTEMM');
  var tickerSheet = spreadsheet.getSheetByName('ticker');
  tickerSheet.activate();
  var total = tickerSheet.getRange(1,10).getValue();
  var results = tickerSheet.getRange(2,5,total,1).getValues();
  return results;
}

/**
 * @deprecated
 * Write full table for stock
 * manipulate the spreadsheet values
 * no input parameters and output, for testing purpose only

function getAllStockVolatility(){//dateFrom,dateTo,num) {
  var spreadsheet = SpreadsheetApp.openById('1Iia7O209l-2NzD1md_r2A20zfcX8PmXWmx4MSGOTEMM');
  var stockSheet = spreadsheet.getSheetByName('stock');
  var tickerSheet = spreadsheet.getSheetByName('ticker');
  var uiSheet = spreadsheet.getSheetByName('UI');
  tickerSheet.activate();
  var total = tickerSheet.getRange(1,8).getValue();
  var tickers = tickerSheet.getRange(2,1,total,1).getValues();
  
  var dateFrom = '2014-01-01';
  var dateTo = '2016-01-01';
  var num = 30;
    
  stockSheet.activate();
  stockSheet.getRange('C3').setValue('NONE');
  stockSheet.getRange('BT4').setValue(dateFrom);
  stockSheet.getRange('BV4').setValue(dateTo);

  SpreadsheetApp.flush();
  
  for (var i=0; i < tickers.length; i++) {
    stockSheet.activate();
    stockSheet.getRange('B3').setValue(tickers[i][0]);
    SpreadsheetApp.flush();
    
    uiSheet.activate();
    
    uiSheet.getRange(num,2,1,8).copyTo(uiSheet.getRange(2+i,13,1,8), {contentsOnly:true});
    
    uiSheet.getRange(2+i,11,1,1).setValue(i+1);
    uiSheet.getRange(2+i,12,1,1).setValue(tickers[i][0]);
    SpreadsheetApp.flush();

  }
  
}
 */

/**
 * Write full table for all stocks based on num and date range
 * @return number of stock count
 */
function writeAllStock(num,dateFrom,dateTo) {

  var spreadsheet = SpreadsheetApp.openById('1Iia7O209l-2NzD1md_r2A20zfcX8PmXWmx4MSGOTEMM');
  var stockSheet = spreadsheet.getSheetByName('stock');
  var tickerSheet = spreadsheet.getSheetByName('ticker');
  var uiSheet = spreadsheet.getSheetByName('UI');
  tickerSheet.activate();
  var total = tickerSheet.getRange(1,8).getValue();
  var tickers = tickerSheet.getRange(2,1,total,1).getValues();
      
  stockSheet.activate();
  stockSheet.getRange('C3').setValue('NONE');
  stockSheet.getRange('BT4').setValue(dateFrom);
  stockSheet.getRange('BV4').setValue(dateTo);

  SpreadsheetApp.flush();
  
  for (var i=0; i < total; i++) {
    stockSheet.activate();
    stockSheet.getRange('B3').setValue(tickers[i][0]);
    SpreadsheetApp.flush();
    Utilities.sleep(1500);
    uiSheet.activate();
    
    // uiSheet.getRange(num+1,2,1,8).copyTo(uiSheet.getRange(3+i,13,1,8), {contentsOnly:true});
    
    var values = uiSheet.getRange(num+1,2,1,8).getValues();
      uiSheet.getRange(3+i,13,1,8).setValues(values);
    
    uiSheet.getRange(3+i,11,1,1).setValue(i+1);
    uiSheet.getRange(3+i,12,1,1).setValue(tickers[i][0]);
    SpreadsheetApp.flush();

  }
   
  return total;
}


/**
 * Repeat the step of writeAllStock with additional checking
 * Guarantee the statistics are correct
 * No output
 */
function validateAllStockVolatility(num) {
  
 // var num = 30;
  
  var spreadsheet = SpreadsheetApp.openById('1Iia7O209l-2NzD1md_r2A20zfcX8PmXWmx4MSGOTEMM');
  var stockSheet = spreadsheet.getSheetByName('stock');
  var tickerSheet = spreadsheet.getSheetByName('ticker');
  var uiSheet = spreadsheet.getSheetByName('UI');
  tickerSheet.activate();
  var total = tickerSheet.getRange(1,8).getValue();
  var tickers = tickerSheet.getRange(2,1,total,1).getValues();
  
  for (var i=0; i < total; i++) {
    stockSheet.activate();
    stockSheet.getRange('B3').setValue(tickers[i][0]);
      
    SpreadsheetApp.flush();
    Utilities.sleep(1500);
    uiSheet.activate();
    
    if(uiSheet.getRange(num+1,5).getValue()>uiSheet.getRange(3+i,16).getValue()){
      // uiSheet.getRange(num+1,2,1,8).copyTo(uiSheet.getRange(3+i,13,1,8), {contentsOnly:true});
      
      var values = uiSheet.getRange(num+1,2,1,8).getValues();
      uiSheet.getRange(3+i,13,1,8).setValues(values);
    }
    
  }
  
}



/**
 * Write full table for all indexs based on num and date range
 * @return number of index count
 */
function writeAllIndex(num,dateFrom,dateTo) {

  //var dateFrom = '2014-01-01';
  //var dateTo = '2016-01-01';
  //var num = 30;


  var spreadsheet = SpreadsheetApp.openById('1Iia7O209l-2NzD1md_r2A20zfcX8PmXWmx4MSGOTEMM');
  var stockSheet = spreadsheet.getSheetByName('stock');
  var tickerSheet = spreadsheet.getSheetByName('ticker');
  var uiSheet = spreadsheet.getSheetByName('UI');
  tickerSheet.activate();
  var total = tickerSheet.getRange(1,10).getValue();
  var tickers = tickerSheet.getRange(2,5,total,1).getValues();
      
  stockSheet.activate();
  stockSheet.getRange('B3').setValue('');
  stockSheet.getRange('BT4').setValue(dateFrom);
  stockSheet.getRange('BV4').setValue(dateTo);

  SpreadsheetApp.flush();
  
  for (var i=0; i < total; i++) {
    stockSheet.activate();
    stockSheet.getRange('C3').setValue(tickers[i][0]);
    SpreadsheetApp.flush();
    Utilities.sleep(1500);
    uiSheet.activate();
    
    // uiSheet.getRange(num+1,2,1,8).copyTo(uiSheet.getRange(3+i,13,1,8), {contentsOnly:true});
    var values = uiSheet.getRange(num+1,2,1,8).getValues();
    uiSheet.getRange(3+i,13,1,8).setValues(values);
    
    uiSheet.getRange(3+i,11,1,1).setValue(i+1);
    uiSheet.getRange(3+i,12,1,1).setValue(tickers[i][0]);
    SpreadsheetApp.flush();

  }
  
  return total;
}

/**
 * Repeat the step of writeAllIndex with additional checking
 * Guarantee the statistics are correct
 * No output
 */
function validateAllIndexVolatility(num) {
  
 // var num = 30;
  
  var spreadsheet = SpreadsheetApp.openById('1Iia7O209l-2NzD1md_r2A20zfcX8PmXWmx4MSGOTEMM');
  var stockSheet = spreadsheet.getSheetByName('stock');
  var tickerSheet = spreadsheet.getSheetByName('ticker');
  var uiSheet = spreadsheet.getSheetByName('UI');
  tickerSheet.activate();
  var total = tickerSheet.getRange(1,10).getValue();
  var tickers = tickerSheet.getRange(2,5,total,1).getValues();
  
  for (var i=0; i < total; i++) {
    stockSheet.activate();
    stockSheet.getRange('C3').setValue(tickers[i][0]);
       
    SpreadsheetApp.flush();
    Utilities.sleep(1500);
    uiSheet.activate();
    
    if(uiSheet.getRange(num+1,5).getValue()>uiSheet.getRange(3+i,16).getValue()){
      // uiSheet.getRange(num+1,2,1,8).copyTo(uiSheet.getRange(3+i,13,1,8), {contentsOnly:true});
      var values = uiSheet.getRange(num+1,2,1,8).getValues();
      uiSheet.getRange(3+i,13,1,8).setValues(values);
    }
    SpreadsheetApp.flush();
  }
  
}
