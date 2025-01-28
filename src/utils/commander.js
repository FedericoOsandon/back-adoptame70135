const { Command } = require('commander')

const program = new Command()

program   
    .option('--mode <mode>', 'Modo de trabajo en nuestro servidor', 'production')    
    .parse()

module.exports = {
    program
}
