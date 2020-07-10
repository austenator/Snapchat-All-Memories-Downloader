const utimes = require('@ronomon/utimes');

/**
 * Updates the file's system timestamps to the given timestamp.
 * - Date Modified
 * - Date Created
 * - Date Accessed
 * @param {String} filePath path to the file to update the timestamp of. E.g './Downloads/file1.jpg'
 * @param {String} timestamp in ISO8601 format to update the file's modified, created, and accessed time to.
 */
function updateTimestamp(filePath, timestamp) {
    // Last Modified Time (this is what I need to get in milliseconds from calculatedLastModified)
    var mtime = Date.parse(timestamp);
    // Could be NaN. Probably better ways to handle this but I am only human.
    if (mtime) {
        utimes.utimes(filePath, mtime, mtime, mtime, () => {});
    }
}

/**
 * Converts the Date fields of the Download object to an ISO8601 date-time string.
 * @param {Object} download download object from memories_history.json
 * @returns String ISO8601 date-time
 */
function getTimestampFromDownload(download) {
    let [date, time, tz] = download["Date"].split(' ', 3);
    return date + 'T' + time + 'Z';
}

exports.updateTimestamp = updateTimestamp;
exports.getTimestampFromDownload = getTimestampFromDownload;
