function load(data){
    var obj = JSON.parse(data)
    return obj
}

var base_spell = {'base':0, 'type':'physical', 'ap':0, 'ad':0, 'bad':0, 'onhit':false}

supports = load(supports)
botlaners = load(botlaners)
junglers = load(junglers)

function update(obj/*, …*/) {
    for (var i=1; i<arguments.length; i++) {
        for (var prop in arguments[i]) {
            var val = arguments[i][prop];
            if (typeof val == "object") // this also applies to arrays or null!
                update(obj[prop], val);
            else
                obj[prop] = val;
        }
    }
    return obj;
}

function damage(champObject, buff_color, numberOfAutos, autoOnly = false, bonusStats = undefined){
    let result = 0
    let champ = {'AD':0.0, 'AP':0.0, 'BAD':0.0, 'AS':0.0}
    let monster = Object()
    monster.hp = 2100
    monster.armor = buff_color == "red" ?-15:10
    monster.mr = buff_color == "red" ?10:-15
    if (monster.mr >= 0){
        monster.mweight = 100/(100+monster.mr)
        monster.aweight = 2 - 100/(100-monster.armor)
    } else {
        monster.mweight = 2- 100/(100-monster.mr)
        monster.aweight = 100/(100+monster.armor)
    }

    champ = {...champ, ...champObject}
    if (bonusStats !== undefined) {
        for (let i in bonusStats){
            champ[i] += bonusStats[i]
        }
    }
    let spells = Object()
    for (let i in champ){
        if (i.length == 1 && Number(i)<=9){
            spells[Number(i)] = {...base_spell, ...champ[i]}
        }
    }

    let onhit = 0
    for(let i in spells){
        let ap_ratio = 0
        if (champ[i].onhit == true){
            if (champ[i]['ap'] != undefined){
                ap_ratio = champ[i]['ap']
            }
            onhit = champ[i]['base'] + champ['AP'] * ap_ratio
            if (champ[i]['type'] == 'magic'){
                onhit *= monster.mweight
            } else if (champ[i]['type'] == 'physical'){
                onhit *= monster.aweight
            }
            break
        }
    }
    let perattack = (champ['AD']+champ['BAD']) * monster.aweight + onhit
    result = perattack * numberOfAutos
    if (!autoOnly){
        for(let i in spells){
            if (!spells[i]['onhit']){
                let spell_damage = spells[i]['base'] + spells[i]['ap'] * champ['AP'] + spells[i]['ad'] * champ['AD'] + spells[i]['bad'] * champ['BAD']
                if (spells[i]['type'] == 'physical'){
                    spell_damage *= monster['aweight']
                } else if (spells[i]['type'] == 'magic'){
                    spell_damage *= monster['mweight']
                }
                result += spell_damage
            } 
        }
    }
    return result   
}

var jung_div = document.createElement('div')
var select_jung = document.createElement('select')
jung_div.id = 'jung'
for (let champ in Object.keys(junglers)){
    let champName = Object.keys(junglers)[champ]
    let option = document.createElement('option')
    option.value = champName
    option.innerHTML = champName
    select_jung.appendChild(option)

}
jung_div.appendChild(select_jung)
document.body.appendChild(jung_div)

var sup_div = document.createElement('div')
var select_sup = document.createElement('select')
sup_div.id = 'sup'
for (let champ in Object.keys(supports)){
    let champName = Object.keys(supports)[champ]
    let option = document.createElement('option')
    option.value = champName
    option.innerHTML = champName
    select_sup.appendChild(option)

}
sup_div.appendChild(select_sup)

var sup_willattack = document.createElement('span')
sup_willattack.innerText = 'will attack'

var sup_attacks = document.createElement('input')
sup_attacks.type = 'number'
sup_attacks.value = '5'
sup_attacks.id = 'sup_attacks'

var sup_times = document.createElement('span')
sup_times.innerText = 'times.'

sup_div.appendChild(sup_willattack)
sup_div.appendChild(sup_attacks)
sup_div.appendChild(sup_times)
document.body.appendChild(sup_div)

var bot_div = document.createElement('div')
var select_bot = document.createElement('select')
bot_div.id = 'bot'
for (let champ in Object.keys(botlaners)){
    let champName = Object.keys(botlaners)[champ]
    let option = document.createElement('option')
    option.value = champName
    option.innerHTML = champName
    select_bot.appendChild(option)

}
bot_div.appendChild(select_bot)
var bot_willattack = document.createElement('span')
bot_willattack.innerText = 'will attack'

var bot_times = document.createElement('span')
bot_times.innerText = 'times.'

var bot_attacks = document.createElement('input')
bot_attacks.type = 'number'
bot_attacks.value = 5
bot_attacks.id = 'bot_attacks'

bot_div.appendChild(bot_willattack)
bot_div.appendChild(bot_attacks)
bot_div.appendChild(bot_times)
document.body.appendChild(bot_div)

var buff_div = document.createElement('div')
var select_buff = document.createElement('select')
buff_div.id = 'buff'
var red_buff = document.createElement('option')
red_buff.value = 'red'
red_buff.innerHTML = 'Red Buff'
select_buff.appendChild(red_buff)

var red_buff = document.createElement('option')
red_buff.value = 'blue'
red_buff.innerHTML = 'Blue Buff'
select_buff.appendChild(red_buff)

buff_div.appendChild(select_buff)
document.body.appendChild(buff_div)


var show_timer = document.createElement('p')
show_timer.innerHTML = ''
show_timer.id = 'show'
document.body.appendChild(show_timer)



select_jung.onchange = select_bot.onchange = select_sup.onchange = select_buff.onchange = sup_attacks.onchange = bot_attacks.onchange = sup_attacks.oninput = bot_attacks.oninput = ()=>{
    let sup = select_sup.value
    let bot = select_bot.value
    let jung = select_jung.value
    let buff = select_buff.value
    let kaisa_damage = 0
    if (buff == 'red'){
        kaisa_damage = 125
    } else {
        kaisa_damage = 155
    }
    
    let start_time = (2100 - damage(supports[sup], buff, sup_attacks.value, false) - damage(botlaners[bot], buff, bot_attacks.value, false, {'BAD':13}) - kaisa_damage) / junglers[jung][0] - 2.26
    let end_time = (2100 - damage(supports[sup], buff, sup_attacks.value, false) - damage(botlaners[bot], buff, bot_attacks.value, false, {'BAD':13})) / junglers[jung][0] - 2.26
    show_timer.style.visibility = 'visible'
    show_timer.innerHTML = "Shoot your W at:<b> 1:"+(30+Math.round(start_time*10)/10)+' ~ 1:'+(30+Math.round(end_time*10)/10) + '</b>'
}

