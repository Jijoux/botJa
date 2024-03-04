// Import required methods from the 'date-fns' library
const {
    isAfter,
    differenceInMonths,
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
    addMonths,
    addDays,
    addHours,
    addMinutes
  } = require('date-fns');


module.exports = {
	name: 'birthday', 

	description: 'Give the exact amount of time before your birthday.', 

	callback: async interaction => {      
      const name = 'Jasmine';
      const birthdayDay = 21;
      const birthdayMonth = 4;
      
      
      const now = new Date();
      const birthdayCelebrationThisYear = new Date(`${now.getFullYear()}-${birthdayMonth}-${birthdayDay}`);
      const birthdayCelebrationNextYear = new Date(`${now.getFullYear() + 1}-${birthdayMonth}-${birthdayDay}`);
      const birthdayCelebration = isAfter(birthdayCelebrationThisYear, now) ? birthdayCelebrationThisYear : birthdayCelebrationNextYear;
      
      
      const months = differenceInMonths(birthdayCelebration, now);
      const days = differenceInDays(birthdayCelebration, addMonths(now, months));
      const hours = differenceInHours(birthdayCelebration, addDays(addMonths(now, months), days));
      const minutes = differenceInMinutes(birthdayCelebration, addHours(addDays(addMonths(now, months), days), hours));
      const seconds = differenceInSeconds(birthdayCelebration, addMinutes(addHours(addDays(addMonths(now, months), days), hours), minutes));
      
      const sentence = `${name}'s birthday will be in ${months} month(s), ${days} day(s), ${hours} hour(s), ${minutes} minute(s), and ${seconds} second(s).`;
      

      console.log(sentence);
      await interaction.reply(sentence);
	}
};

