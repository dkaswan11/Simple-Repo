Project is a website that fills a form and sends it to a google sheet. In the sheet, there is its own google apps scripts with the code that puts the current date on a column, allows user to write notes, and when user clicks a checkbox, it sends the row to another sheet within the spreadsheet. Here is the google apps scripts code below.
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓




function doPost(e) {
var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
var data = e.parameter;

// Get the current date
var today = new Date();

// Append the new row with the data and the current date in the tenth column
var lastRow = sheet.getLastRow() + 1; // Get the next row to append data
sheet.appendRow([
data['last-name'] || 'N/A',
data['first-name'] || 'N/A',
data['phone-number'] || 'N/A',
data['email-address'] || 'N/A',
data['date-birth'] || 'N/A',
data['insurance-company'] || 'N/A',
data['referring-physician'] || 'N/A',
data['referring-physician-contact-number'] || 'N/A',
data['reason-for-visit'] || 'N/A',
today // Add the current date to the tenth column
]);

// Set the number format of the date cell (optional)
var dateCell = sheet.getRange(lastRow, 10);
dateCell.setNumberFormat("MM/dd/yyyy"); // You can change the format as needed

// Add a checkbox to the last column (e.g., column 12, which is 'L')
var checkboxColumn = 12; // Change this to the column where you want the checkbox
var checkboxCell = sheet.getRange(lastRow, checkboxColumn);
checkboxCell.insertCheckboxes();

return ContentService.createTextOutput(JSON.stringify({ result: 'Success' }))
.setMimeType(ContentService.MimeType.JSON);
}

function onEdit(d) {
var sheet = d.source.getActiveSheet();
var range = d.range;

// Define the column with checkboxes (last column)
var checkboxColumn = sheet.getLastColumn();

// Define the name of the archive sheet
var archiveSheetName = "Archive"; // Change this to your archive sheet name

// Check if the edit was made in the checkbox column
if (range.getColumn() === checkboxColumn) {
if (range.getValue() === true) {
var row = range.getRow();

      // Get the data of the row
      var rowData = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues();

      // Get the archive sheet
      var archiveSheet = d.source.getSheetByName(archiveSheetName);
      if (!archiveSheet) {
        // Create the archive sheet if it does not exist
        archiveSheet = d.source.insertSheet(archiveSheetName);
      }

      // Append the row data to the archive sheet
      archiveSheet.appendRow(rowData[0]);

      // Delete the row from the original sheet
      sheet.deleteRow(row);
    }

}
}
