const os = require('os');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            output += `操作系统: ${os.platform()} ${os.release()}\r\n`;
            output += `CPU: ${os.arch()}\r\n`;
            output += `内存: ${os.totalmem()} \r\n`;
            output += `根目录: ${os.homedir()} \r\n`;
            output += `临时文件目录: ${os.tmpdir()} \r\n`;

            return resolve({
                success: true,
                output: output,
            });
        }
        catch (err) {
            return resolve({
                success: false,
                output: '',
                message: err.message
            });
        }
    });
}
