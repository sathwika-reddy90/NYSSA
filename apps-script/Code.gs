/**
 * Paste this into the Apps Script editor (Extensions > Apps Script) attached
 * to your Google Sheet, then redeploy as a Web App:
 *   Deploy > Manage deployments > Edit (pencil) > New version > Deploy
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * If "Who has access" is not set to "Anyone", requests get redirected to a
 * Google sign-in page, which the browser also reports as a CORS failure —
 * it looks identical to the preflight issue but is a deployment setting, not code.
 */

const SHEET_NAME = "Sheet1"; // change if your tab is named differently

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.phone || "",
      data.email || "",
      data.location || "",
      data.projectType || "",
      data.budgetRange || "",
      data.message || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
