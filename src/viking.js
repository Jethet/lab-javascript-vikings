// Soldier
function Soldier(health, strength) {
    this.health = health;
    this.strength = strength;
};

Soldier.prototype.attack = function () { 
    return this.strength;
};

Soldier.prototype.receiveDamage = function (damage) {
    if (damage) {
        this.health -= damage;
    }
};


// Viking
function Viking(name, health, strength) {
    Soldier.call(this, health, strength);
    this.name = name;
}

Viking.prototype = Object.create(Soldier.prototype);
Viking.prototype.constructor = Viking;

Viking.prototype.receiveDamage = function (damage) {
    this.health -= damage; 
    if (this.health <= 0){
            return `${this.name} has died in act of combat`;
    }
    else if (this.health > 0) {
            return `${this.name} has received ${damage} points of damage`;
    }
};

Viking.prototype.battleCry = function () {
    return "Odin Owns You All!";
};



// Saxon
function Saxon(health, strength) {
    Soldier.call(this, health, strength);
};

Saxon.prototype = Object.create(Soldier.prototype);
Saxon.prototype.constructor = Saxon;

Saxon.prototype.attack = function () { 
    return this.strength;
};

Saxon.prototype.receiveDamage = function (damage) {
    this.health -= damage; 
    if (this.health <= 0){
            return `A Saxon has died in combat`;
    }
    else if (this.health > 0) {
            return `A Saxon has received ${damage} points of damage`;
    }
};


// War
function War() {
    this.vikingArmy = [];
    this.saxonArmy = [];
    
};

War.prototype.addViking = function (viking) {
   this.vikingArmy.push(viking);
};

War.prototype.addSaxon = function (saxon) {
    this.saxonArmy.push(saxon);
};

War.prototype.vikingAttack = function (){
    const randomSaxon = Math.floor(Math.random() * this.saxonArmy.length); // Math.floor rounds down
    const saxonSoldier = this.saxonArmy[randomSaxon];
    
    const randomViking = Math.floor(Math.random() * this.vikingArmy.length);
    const vikingSoldier = this.vikingArmy[randomViking];

    const result = saxonSoldier.receiveDamage(vikingSoldier.attack());

    // If random Saxon soldier health is below zero, remove him from the Saxon army
    if (saxonSoldier.health <= 0) {
        this.saxonArmy.splice(randomSaxon, 1);
    }

  return result;
};


War.prototype.saxonAttack = function (){  //same as above
    
};

War.prototype.showStatus = function () {  /// uncomment Jasmine and check if this is correct
    if (this.saxonArmy.length === 0) {
        return "Vikings have won the war of the century!";
    } else if (this.vikingArmy.length === 0) {
        return "Saxons have fought for their lives and survive another day...";
    } else if (this.saxonArmy.length > 0 && this.vikingArmy.length > 0) {
        return "Vikings and Saxons are still in the thick of battle.";
    }
};
