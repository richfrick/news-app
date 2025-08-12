const { faker } = require("@faker-js/faker");

function createObjectWithTestData(...keysToInclude) {
    const baseOject = {};

    for (const key of keysToInclude) {
        baseOject[key] = faker.lorem.word({
            length: { min: 5, max: 20 },
        });
    }

    console.log(baseOject);
}

function checkDateFormat(date) {
    const dateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
    return date.match(dateRegex);
}

module.exports = { checkDateFormat };
