const moment = require("moment");

module.exports = {
    formatDate: (date, format) => {
        return moment.unix(date).format(format);
    }
}