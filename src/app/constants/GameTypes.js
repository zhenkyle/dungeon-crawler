// player move directions
const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

// brick types
const SOIL = 0;
const SPACE = 1;
const MEDICINE = 2;
const PLAYER = 3;
const ENEMY = 4;
const WEAPON = 5;
const STAIRS = 6;
const TRANS = 7;
const BLACK = 8;

// map size
const MAP_WIDTH = 100;
const MAP_HEIGHT = 80;
const VIEW_WIDTH = MAP_WIDTH;
const VIEW_HEIGHT = 40;

// toggle darkness
const ON = 1;
const OFF = 0;

// WEAPONS
const WEAPONS = [
{type: WEAPON, name: "wood stick", attack: 10},
{type: WEAPON, name: "stone stick", attack: 20},
{type: WEAPON, name: "stone axe", attack: 30},
{type: WEAPON, name: "copper sword", attack: 40},
{type: WEAPON, name: "iron sword", attack: 50},
{type: WEAPON, name: "long bow", attack: 60},
{type: WEAPON, name: "sharp spear", attack: 70},
{type: WEAPON, name: "dragon crystal", attack: 80}
];

