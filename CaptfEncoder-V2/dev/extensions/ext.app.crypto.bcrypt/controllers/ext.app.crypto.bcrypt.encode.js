const bcrypt = require('bcryptjs');

const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {

    try {
        let output = '';

        if (input && input.length > 0) {
            const rounds = defaultValue(options.rounds, 10, 'number');

            const salt = await bcrypt.genSalt(rounds);

            output = await bcrypt.hash(input, salt, null);
        }

        return {
            success: true,
            output: output,
        };
    }
    catch (err) {
        return {
            success: false,
            output: '',
            message: err.message
        };
    }

}
