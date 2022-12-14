addLayer("b", { // Click Layer, includes click power.
    name: "base layer", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    tabFormat: [
        ["display-text", function() {return "Your clicking force is <h2 style='color:ffffff;text-shadow:0px 0px 10px;'>"+formatSmall(player.clickpower, 3)+"</h2>."}],
        "blank",
        ["display-text", function() {return "<h2 style='color:ffffff;text-shadow:0px 0px 10px;'>"+format(calcAutoPerSec())+"</h2> autoclicks per second."}],
        "blank",
        ["display-text", function() {return "You have clicked <h2 style='color:ffffff;text-shadow:0px 0px 10px;'>"+format(player.clicks)+"</h2> times."}],
        "blank",
        ["row", [["clickable", 11], "blank", ["clickable", 12], "blank", ["clickable", 13]]],
        ["blank", "30px"],
        ["microtabs", "tabs"]
    ],
    clickables: {
        11: {
            title: "Click Me!",
            onClick() {onButtonClick(1)},
            onHold() {onButtonClick(1)},
            canClick() {return true}
        },
        12: {
            title: "Clicking Force Refill",
            display() {return "Refill your clicking force if it is below "+format(clickPowerFillable(1))+"."},
            onClick() {if(clickPowerFillable(0)) player.clickpower = calcMaxCP()},
            canClick() {return true}
        },
        13: {
            title: "Toggle Click Force Generation",
            onClick() {player.cgcf = !player.cgcf},
            canClick() {return true},
            unlocked() {return calcRegenCP().gt(0)},
        }
    },
    upgrades: {
        11: {
            title: "upgrade",
            description: "+2 to clicking force max.",
            cost: new Decimal(125),
            currencyDisplayName: "points",
            currencyInternalName: "points",
            canAfford() {return player.points.gte(125)},
        },
        12: {
            title: "names",
            description() {return "x4 autoclick rate."},
            cost: new Decimal(350),
            currencyDisplayName: "points",
            currencyInternalName: "points",
            canAfford() {return player.points.gte(350)},
        },
        13: {
            title: "are",
            description() {return "Points boost themselves.<br>Currently: "+format(upgradeEffect('b', 13))+"x"},
            cost: new Decimal(420),
            currencyDisplayName: "points",
            currencyInternalName: "points",
            effect() {return player.points.pow(0.07)},
            canAfford() {return player.points.gte(420)},
            unlocked() {return hasUpgrade('b', 11) || hasUpgrade(this.layer, this.id)},
        },
        14: {
            title: "hard",
            description: "x6.66 max clicking force",
            cost: new Decimal(666),
            currencyDisplayName: "points",
            currencyInternalName: "points",
            canAfford() {return player.points.gte(666)},
            unlocked() {return hasUpgrade('b', 12) || hasUpgrade(this.layer, this.id)},
        },
        15: {
            title: "to",
            description() {return "Points boost max click force. You can regenerate click force if you have less than 5% of max. <br>Currently: "+format(upgradeEffect('b', 15))+"x"},
            cost: new Decimal(1500),
            currencyDisplayName: "points",
            currencyInternalName: "points",
            effect() {return player.points.pow(0.14)},
            canAfford() {return player.points.gte(1500)},
            unlocked() {return hasUpgrade('b', 13) || hasUpgrade(this.layer, this.id)},
        },
        16: {
            title: "think",
            description: "x5 autoclick rate",
            cost: new Decimal(5000),
            currencyDisplayName: "points",
            currencyInternalName: "points",
            canAfford() {return player.points.gte(5000)},
            unlocked() {return hasUpgrade('b', 14) || hasUpgrade(this.layer, this.id)},
        },
        17: {
            title: "of.",
            description: "You can regenerate click force at 12.5% of your max.",
            cost: new Decimal(7000),
            currencyDisplayName: "points",
            currencyInternalName: "points",
            canAfford() {return player.points.gte(7000)},
            unlocked() {return hasUpgrade('b', 15) || hasUpgrade(this.layer, this.id)},
        },
        21: {
            title: "new",
            description() {return "Boost max click force based on clicks. <br>Currently: "+format(upgradeEffect('b', this.id))+"x"},
            cost: new Decimal(16273),
            currencyDisplayName: "points",
            currencyInternalName: "points",
            effect() {return player.clicks.log(25).add(1)},
            canAfford() {return player.points.gte(16273)},
            unlocked() {return hasUpgrade('b', 17) || hasUpgrade(this.layer, this.id)},
        },
        22: {
            title: "layer",
            description: "x5 autoclick rate",
            cost: new Decimal(44444),
            currencyDisplayName: "points",
            currencyInternalName: "points",
            canAfford() {return player.points.gte(44444)},
            unlocked() {return hasUpgrade('b', 17) || hasUpgrade(this.layer, this.id)},
        },
        23: {
            title: "coming",
            description: "Regenerate 5 click force per second. (You can toggle this)",
            cost: new Decimal(77777),
            currencyDisplayName: "points",
            currencyInternalName: "points",
            canAfford() {return player.points.gte(77777)},
            unlocked() {return hasUpgrade('b', 21) || hasUpgrade(this.layer, this.id)},
        },
        24: {
            title: "soon.",
            description: "Make goals give a multiplier.",
            cost: new Decimal(123123),
            currencyDisplayName: "points",
            currencyInternalName: "points",
            canAfford() {return player.points.gte(123123)},
            unlocked() {return hasUpgrade('b', 22) || hasUpgrade(this.layer, this.id)},
        },
        31: {
            title: "like",
            description: "^1.15 max click force exponent",
            cost: new Decimal(333333),
            currencyDisplayName: "points",
            currencyInternalName: "points",
            canAfford() {return player.points.gte(333333)},
            unlocked() {return hasAchievement('b', 12) || hasUpgrade(this.layer, this.id)},
        },
        32: {
            title: "right",
            description: "x5 points",
            cost: new Decimal(666666.666),
            currencyDisplayName: "points",
            currencyInternalName: "points",
            canAfford() {return player.points.gte(666666.666)},
            unlocked() {return hasAchievement('b', 12) || hasUpgrade(this.layer, this.id)},
        },
        33: {
            title: "now!",
            description: "Unlocks a new layer!! and x3 points",
            cost: new Decimal(1000001),
            currencyDisplayName: "points",
            currencyInternalName: "points",
            canAfford() {return player.points.gte(1000001)},
            unlocked() {return hasAchievement('b', 12) || hasUpgrade(this.layer, this.id)},
        },
    },
    achievements: {
        11:{
            name() {return formatWhole(D(2).pow(14))},
            tooltip: "log2 Points >= 14. <br><br>Reward: x1.100 Points",
            done() {return player.points.add(1).log(2).gte(14)}
        },
        12:{
            name() {return formatWhole(D(3).pow(11))},
            tooltip: "log3 Points >= 11. <br><br>Reward: x1.210 Points and row 3 of upgrades",
            done() {return player.points.add(1).log(3).gte(11)}
        },
        13:{
            name() {return formatWhole(D(4).pow(10.1))},
            tooltip: "log4 Points >= 10.1. <br><br>Reward: x1.325 Points",
            done() {return player.points.add(1).log(4).gte(10.1)}
        },
        14:{
            name() {return formatWhole(D(5).pow(9.7))},
            tooltip: "log5 Points >= 9.7. <br><br>Reward: x1.733 Points",
            done() {return player.points.add(1).log(5).gte(9.7)}
        },
        15:{
            name() {return formatWhole(D(6).pow(9.6))},
            tooltip: "log6 Points >= 9.6. <br><br>Reward: x2.542 Points",
            done() {return player.points.add(1).log(6).gte(9.6)}
        },
        16:{
            name() {return formatWhole(D(7).pow(9.5))},
            tooltip: "log7 Points >= 9.5. <br><br>Reward: x3.235 Points",
            done() {return player.points.add(1).log(7).gte(9.5)}
        },
        17:{
            name() {return formatWhole(D(8).pow(9.47))},
            tooltip: "log8 Points >= 9.47. <br><br>Reward: x4.083 Points",
            done() {return player.points.add(1).log(8).gte(9.47)}
        },
        18:{
            name() {return formatWhole(D(9).pow(9.45))},
            tooltip: "log9 Points >= 9.45. <br><br>Reward: x4.947 Points",
            done() {return player.points.add(1).log(9).gte(9.45)}
        },
        19:{
            name() {return formatWhole(D(10).pow(9.435))},
            tooltip: "log10 Points >= 9.435. <br><br>Reward: x6.000 Points",
            done() {return player.points.add(1).log(10).gte(9.435)}
        },
    },
    automate() {
        //player.maxcp = calcMaxCP()
    },
    microtabs: {
        tabs: {
            Upgrades: {
                content: [
                    "blank",
                    "upgrades",
                ],
            },
            Goals: {
                content: [
                    "blank",
                    ["display-text", function() {return "Total Multiplier: <h2 style='color:#dff707;text-shadow:0px 0px 10px;'>"+format(calcAchMult(), 3)+"x</h2>"}],
                    "blank",
                    "achievements"
                ],
            }
        },
    },
    doReset(resettingLayer) {
        let keep = [];
        let keepupgs = [];
        if(hasUpgrade('p', 14)) keepupgs.push(23)
        if(hasUpgrade('p', 24)) keep.push("achievements")
        if(hasUpgrade('p', 25)) keepupgs.push(11, 12, 13, 14, 15, 16, 17, 21, 22, 23, 24, 31, 32, 33)
        layerDataReset(this.layer, keep)
        player.b.upgrades = keepupgs
        player.clicks = D(0)
        player.clickpower = D(0)
    },
    update(diff) {
        onButtonClick(calcAutoPerSec().mul(diff))
        if(player.cgcf) { if (player.clickpower.lte(calcMaxCP())) player.clickpower = player.clickpower.add(calcRegenCP().mul(diff))}
    },
    autoUpgrade() {return hasUpgrade('p', 22)},
})

addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#1997f7",
    requires() {if(!hasUpgrade('ap', 12)) {return new Decimal(6e6).mul(D(10).pow(player.p.points)).div(tmp['ap'].effect)} else {return new Decimal(6e6).mul(D(2).pow(player.p.points)).div(tmp['ap'].effect)}}, // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade('mini', 26)) mult = mult.mul(1.2)
        if(hasUpgrade('ap', 11)) mult = mult.add(1.2)
        if(hasUpgrade('ap', 13)) mult = mult.mul(2)
        if(hasMilestone('t', 1)) mult = mult.mul(3.33)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){
        let s = false
        if(hasUpgrade('b', 33)) s = true
        if(player.p.unlocked) s = true
        return s
    },
    branches: ['b', 'mini', 'ap'],
    upgrades: {
        11: {
            title: "I like points",
            description: "x3.3333 points",
            cost: new Decimal(0.4)
        },
        12: {
            title: "Hey, I heard you liked boosts",
            description: "Gain an unspecified boost to points.",
            cost: new Decimal(0.6),
        },
        13: {
            title: "why autoclick so s l o w?",
            description: "+100% autoclick rate for every upgrade bought in this row.",
            cost: new Decimal(1),
            effect() {return D(player.p.upgrades.length).add(1).min(5)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('p', 12) || hasUpgrade(this.layer, this.id)},
        },
        14: {
            title: "also have more click force regeneration",
            description: "+200% auto click force generation for every upgrade bought in this row and keep upgrade 23",
            cost: new Decimal(1.5),
            effect() {return D(player.p.upgrades.length).add(1).mul(2).min(10)},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('p', 13) || hasUpgrade(this.layer, this.id)},
            style: {
                "width": "250px"
            }
        },
        21: {
            title: "Motivation",
            description: "You find some motivation! Boost most things in layer C by x1.69, and unlock 1 milestone",
            cost: new Decimal(2.5),
            effect() {if(hasMilestone('p', 1)) {return D(1.69).pow(2)} else {return D(1.69)}},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasUpgrade('p', 14) || hasUpgrade(this.layer, this.id)},
        },
        22: {
            title: "Automation",
            description: "Autobuy C upgrades",
            cost: new Decimal(4),
            unlocked() {return hasUpgrade('mini', 26) || hasUpgrade(this.layer, this.id)},
        },
        23: {
            title: "Automation^2",
            description: "Click force generation x25",
            cost: new Decimal(4),
            unlocked() {return hasUpgrade('p', 22) || hasUpgrade(this.layer, this.id)},
        },
        24: {
            title: "Automation^3",
            description: "Keep goals on reset",
            cost: new Decimal(4),
            unlocked() {return hasUpgrade('p', 23) || hasUpgrade(this.layer, this.id)},
        },
        25: {
            title: "Automation^4",
            description: "Keep upgrades on reset",
            cost: new Decimal(4),
            unlocked() {return hasUpgrade('p', 24) || hasUpgrade(this.layer, this.id)},
        },
    },
    milestones: {
        1: {
            requirementDescription: "4 prestige points",
            effectDescription: "^2 the upgrade that unlocked this, and unlock a minigame",
            done() {return player.p.points.gte(4)},
            unlocked() {return hasUpgrade('p', 21)}
        },
    },
    doReset(resettingLayer) {
        if(layers[resettingLayer].row <= layers[this.layer].row) return
        let keep = [];
        let keepupgs = [];
        if(hasMilestone('t', 2)) keepupgs = [22, 23, 24, 25]
        layerDataReset(this.layer, keep)
        player.p.upgrades = keepupgs
    }
})

addLayer("ap", {
    name: "alternate prestige points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#e66808",
    requires() {return new Decimal(5)}, // Can be a function that takes requirement increases into account
    resource: "alternate prestige points", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1,
    layerShown(){
        let s = false
        if(player.p.unlocked) s = true
        return s
    },
    effect() {return D(5).pow(player.ap.best).max(1)},
    effectDescription() {return "dividing prestige requirement by <h2 style='color:#e66808;text-shadow:0px 0px 10px;'>/"+format(tmp['ap'].effect)+"</h2>"},
    upgrades: {
        11: {
            title: "Alternate Upgrade",
            description: "+0.8 prestige point multiplier and 10000x point gain",
            cost: new Decimal(1),
        },
        12: {
            title: "Prestige Boost",
            description: "Prestige scaling is nerfed",
            cost: new Decimal(2),
            unlocked() {return hasUpgrade('ap', 11)},
        },
        13: {
            title: "Prestige Boost (real)",
            description: "x2 prestige points, x123.345 points",
            cost: new Decimal(3),
            unlocked() {return hasUpgrade('ap', 12)},
        },
    },
    roundUpCost: true,
})

addLayer("t", {
    name: "taps", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#CCD011",
    requires() {return new Decimal(4)}, // Can be a function that takes requirement increases into account
    resource: "taps", // Name of prestige currency
    baseResource: "alternate prestige points", // Name of resource prestige is based on
    baseAmount() {return player.ap.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2,
    layerShown(){
        let s = false
        if(player.ap.unlocked) s = true
        return s
    },
    milestones: {
        1: {
            requirementDescription: "1 tap",
            effectDescription: "3.33x prestige points, x25 max click force and x12.345 timewall gain",
            done() {return player.t.best.gte(1)},
        },
        2: {
            requirementDescription: "4 taps",
            effectDescription: "Always have prestige upgrades 22-25",
            done() {return player.t.best.gte(4)},
        },
    },
    branches: ['p', 'ap']
})

addLayer("mini", {
    name: "timewalls", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(10),
        timewalls: new Decimal(10),
    }},
    color: "#78a9fe",
    requires() {return new Decimal(1e308)}, // Can be a function that takes requirement increases into account
    resource: "timewalls", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.000001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side",
    layerShown(){
        let s = false
        if(hasMilestone('p', 1)) s = true
        return s
    },
    tabFormat: [
        ["display-text", function() {return "You have <h2 style='color:ffffff;text-shadow:0px 0px 10px;'>"+format(player.mini.points)+"</h2> timewalls, making its gain <h2 style='color:ffffff;text-shadow:0px 0px 10px;'>"+format(calcTimeWallGain())+"/s</h2>"}],
        "upgrades"
    ],
    update(diff) {
        player.mini.points = player.mini.points.add(calcTimeWallGain().mul(diff))
        player.mini.points = player.mini.points.min('1.1e2500')
    },
    upgrades: {
        11: {
            title: "Alright this is too slow",
            description: "Timewall gain is faster (log100(timewalls) -> log77(timewalls))",
            cost: new Decimal(100),
        },
        12: {
            title: "Still slow..",
            description: "Timewall gain is faster (log77(timewalls) -> log60(timewalls))",
            cost: new Decimal(500),
            unlocked() {return hasUpgrade('mini', 11)},
        },
        13: {
            title: "these layers have like no relation to each other",
            description: "Timewall gain is faster (log60(timewalls) -> log33(timewalls))",
            cost: new Decimal(500.1),
            unlocked() {return hasUpgrade('mini', 12)},
        },
        14: {
            title: "aaaaaa",
            description: "Timewall gain is faster (x10)",
            cost: new Decimal(666),
            unlocked() {return hasUpgrade('mini', 13)},
        },
        15: {
            title: "upgrade name here",
            description: "Timewall gain is faster (log33(timewalls) -> log18(timewalls))",
            cost: new Decimal(2222),
            unlocked() {return hasUpgrade('mini', 14)},
        },
        21: {
            title: "36",
            description: "Timewall gain is faster (log18(timewalls) -> log10(timewalls))",
            cost: new Decimal(6666),
            unlocked() {return hasUpgrade('mini', 15)},
        },
        22: {
            title: "upgrade 7 of timewalls",
            description: "Timewall gain is faster (log10(timewalls) -> log2(timewalls))",
            cost: new Decimal(12321),
            unlocked() {return hasUpgrade('mini', 21)},
        },
        23: {
            title: "no more log",
            description: "Timewall gain is faster (log2(timewalls) -> timewalls/10), but upgrade aaaaaa has no effect",
            cost: new Decimal(25000),
            unlocked() {return hasUpgrade('mini', 22)},
        },
        24: {
            title: "x2",
            description: "Timewall gain is faster (timewalls/10 -> timewalls*2)",
            cost: new Decimal(1e12),
            unlocked() {return hasUpgrade('mini', 23)},
        },
        25: {
            title: "245",
            description: "Timewall gain is faster (timewalls*2 -> timewalls*10,000)",
            cost: new Decimal(1e200),
            unlocked() {return hasUpgrade('mini', 24)},
        },
        26: {
            title: "un-timewalled",
            description: "Prestige points x1.2",
            cost: new Decimal('1e2500'),
            unlocked() {return hasUpgrade('mini', 25)},
        },
    },
    doReset(resettingLayer) {
        if(layers[resettingLayer].row >= 2) player.mini.points = new Decimal(10)
        if(layers[resettingLayer].row >= 2) player.mini.upgrades = [];
    }
})