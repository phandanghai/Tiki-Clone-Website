export const handleSetNameProduct = (name, character, word) => {
   if (name.length > character && name.split(' ').length > word) {
      return `${name.split(' ').slice(0, word).join(' ')} ...`;
   } else return name;
};
