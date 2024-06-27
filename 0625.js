let animals = [
    "Aardvark",
    "Albatross",
    "Alligator",
    "Alpaca",
    "Ant",
    "Ape",
    "Armadillo",
    "Donkey",
    "Baboon",
    "Badger",
    "Barracuda",
    "Bat",
    "Bear",
    "Beaver",
    "Bee",
    "Bison",
    "Cat",
    "Caterpillar",
    "Cattle",
    "Chamois",
    "Cheetah",
    "Chicken",
    "Chimpanzee",
    "Chinchilla",
    "Chough",
    "Clam",
    "Cobra",
    "Cockroach",
    "Cod",
    "Cormorant",
    "Dugong",
    "Dunlin",
    "Eagle",
    "Echidna",
    "Eel",
    "Eland",
    "Elephant",
    "Elk",
    "Emu",
    "Falcon",
    "Ferret",
    "Finch",
    "Fish",
    "Flamingo",
    "Fly",
    "Fox",
    "Frog",
    "Gaur",
    "Gazelle",
    "Gerbil",
    "Giraffe",
    "Grasshopper",
    "Heron",
    "Herring",
    "Hippopotamus",
    "Hornet",
    "Horse",
    "Kangaroo",
    "Kingfisher",
    "Koala",
    "Kookabura",
    "Moose",
    "Narwhal",
    "Newt",
    "Nightingale",
    "Octopus",
    "Okapi",
    "Opossum",
    "Quail",
    "Quelea",
    "Quetzal",
    "Rabbit",
    "Raccoon",
    "Rail",
    "Ram",
    "Rat",
    "Raven",
    "Red deer",
    "Sandpiper",
    "Sardine",
    "Sparrow",
    "Spider",
    "Spoonbill",
    "Squid",
    "Squirrel",
    "Starling",
    "Stingray",
    "Tiger",
    "Toad",
    "Whale",
    "Wildcat",
    "Wolf",
    "Worm",
    "Wren",
    "Yak",
    "Zebra",
];
// 마지막 아이템을 삭제
animals.pop();
console.log(animals);
// 아이템 추가(맨뒤에 추가됨)
animals.push("Dog");
console.log(animals);
animals.push("Mosquito", "Mouse", "Mule");
console.log(animals);
// 아이템 여부 확인(true, false로 떨어짐)
console.log(animals.includes("Human"));
console.log(animals.includes("Cat"));

// slice는 잘라낸 아이템으로 새로운 배열을 만듦
// splice는 기존 배열을 수정함
// indexOf 는 만약 값이 없다면 -1을 반환함
console.log(animals.indexOf("Red deer"));
// Red deer를 삭제하고 Deer를 추가
console.log(animals.splice(77, 1, "Deer"));
console.log("Red deer대신 Deer", animals);
console.log(animals.indexOf("Deer"));
console.log(animals.indexOf("Spider"));
animals.splice(81, 3);
console.log(animals);
console.log(animals.indexOf("Tiger"));
// animals.splice(84)
animals.splice(animals.indexOf("Tiger"));
console.log(animals);
// Baboon 부터 Bison까지 잘라내어 새로운 배열을 만듦
let newArray = animals.slice(
    animals.indexOf("Baboon"),
    animals.indexOf("Bison") + 1
);
console.log(newArray);
