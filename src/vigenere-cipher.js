const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor (isDirect = true) {
    this.isDirect = isDirect;
  }
  encrypt(message, key) {
    if (!message || !key) throw new Error("Incorrect arguments!");
    return this.process(message, key, true);
  }
  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) throw new Error("Incorrect arguments!");
    return this.process(encryptedMessage, key, false);
  }

  process(input, key, isEncrypt) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    input = input.toUpperCase();
    key = key.toUpperCase();
    let result = '';
    let keyIndex = 0;

    for (let char of input) {
      if (alphabet.includes(char)) {
        const charIndex = alphabet.indexOf(char);
        const keyCharIndex = alphabet.indexOf(key[keyIndex % key.length]);
        const newIndex = isEncrypt ? (charIndex + keyCharIndex) % 26 : (charIndex - keyCharIndex + 26) % 26;
        result += alphabet[newIndex];
        keyIndex++;
      } else {
        result += char;
      }
    }
    return this.isDirect ? result : result.split('').reverse().join('');
  }
}

const directMachine = new VigenereCipheringMachine()
const reverseMachine = new VigenereCipheringMachine(false)
directMachine.encrypt('attack at dawn!', 'alphonse')
reverseMachine.encrypt('attack at dawn!', 'alphonse')

module.exports = {
  VigenereCipheringMachine
};
