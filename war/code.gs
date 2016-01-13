/**
 * A special function that runs when the spreadsheet is open, used to add a
 * custom menu to the spreadsheet.
 */
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Go', functionName: 'start_'}
  ];
  spreadsheet.addMenu('Start', menuItems);
}

function start_() {
  var startDate = new Date();
  var endDate = new Date();
  startDate.setDate(1,1,2014);
  endDate.setDate(30,11,2015);
  writeInput('stock','AAPL',startDate,endDate);
}

function writeInput(type,ticker,dateFrom,dateTo) {
  
  var spreadsheet = SpreadsheetApp.getActive();
  var uiSheet = spreadsheet.getSheetByName('UI');
  uiSheet.activate();
  
  uiSheet.getRange('C6').setValue(type);
  uiSheet.getRange('C8').setValue(ticker);
  uiSheet.getRange('D10').setValue(dateFrom);
  uiSheet.getRange('F10').setValue(dateTo);
    
  SpreadsheetApp.flush();
}
    
function getVolatility() {
  
  SpreadsheetApp.flush();
  var spreadsheet = SpreadsheetApp.openById('1-b_tDwqPNdiCKIH-bQD3Ks4LnI3SpE4MVY7bUdvZ6-o');
  var uiSheet = spreadsheet.getSheetByName('UI');
  uiSheet.activate();
  var results = uiSheet.getRange('B24:G25').getValues();
  return results;

}



/**
 * The function in this script will be called by the Apps Script Execution API.
 */

/**
 * Return the set of folder names contained in the user's root folder as an
 * object (with folder IDs as keys).
 * @return {Object} A set of folder names keyed by folder ID.
 */
function getFoldersUnderRoot() {
  var root = DriveApp.getRootFolder();
  var folders = root.getFolders();
  var folderSet = {};
  while (folders.hasNext()) {
    var folder = folders.next();
    folderSet[folder.getId()] = folder.getName();
  }
  return folderSet;
}

