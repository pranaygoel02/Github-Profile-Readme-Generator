export default function numberToWords(number) {
    const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    
    if (number === 0) {
      return 'zero';
    }
    
    if (number < 0) {
      return 'minus ' + numberToWords(Math.abs(number));
    }
    
    let words = '';
    
    if (Math.floor(number / 1000)) {
      words += numberToWords(Math.floor(number / 1000)) + ' thousand ';
      number %= 1000;
    }
    
    if (Math.floor(number / 100)) {
      words += units[Math.floor(number / 100)] + ' hundred ';
      number %= 100;
    }
    
    if (number >= 11 && number <= 19) {
      words += teens[number - 11] + ' ';
    } else if (number === 10) {
      words += tens[1] + ' ';
    } else if (number >= 1 && number <= 9) {
      words += units[number] + ' ';
    } else if (number >= 20) {
      words += tens[Math.floor(number / 10)] + ' ';
      number %= 10;
      
      if (number) {
        words += units[number] + ' ';
      }
    }
    
    return words.trim();
  }
  