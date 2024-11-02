export function formatString(input: string): string {
  return input
    .replace(/%20/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function toUrlEncodedString(input: string): string {
  return input
    .toLowerCase()
    .replace(/ /g, '%20');
}

export function generateUsername() {
  const adjectives = ["Brave", "Calm", "Swift", "Bold", "Bright", "Wise", "Fierce", "Sly"];
  const animals = ["Falcon", "Tiger", "Wolf", "Dragon", "Panther", "Lion", "Phoenix", "Eagle"];
  const numbers = Math.floor(100 + Math.random() * 900); // Generates a random 3-digit number

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];

  return `${adjective}${animal}${numbers}`;
}