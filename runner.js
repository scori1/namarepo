const {
WAConnection,
MessageType,
Presence,
Mimetype,
GroupSettingChange
} = require('@adiwajshing/baileys')
const fs = require('fs')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, info, success, banner, close } = require('./mess/myfunc')
const { color } = require('./mess/color')
const welcome = JSON.parse(fs.readFileSync('./storage/welcome.json'))
number = '6285157740529@s.whatsapp.net'

require('./srv/zero.js')
nocache('./srv/zero.js', module => console.log(`${module} Done Update!`))

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
const starts = async (zero = new WAConnection()) => {
zero.logger.level = 'warn'
zero.version = [2, 2143, 3]
zero.browserDescription = [ 'Zero', 'Firefox', '3.0' ]
console.log(banner.string)
console.log(color('FucxXx - GiiOFC'))
zero.on('qr', () => {
console.log(color('[','white'), color('!','red'), color(']','white'), color('Please... Scan Is Now Qr Code !'))
})

fs.existsSync('./session/qrsession.json') && zero.loadAuthInfo('./session/qrsession.json')

zero.on('connecting', () => {
start('2', 'Tunggu!')
})
zero.on('open', () => {
success('2', 'Connected!')
})
await zero.connect({timeoutMs: 30*1000})
fs.writeFileSync('./session/qrsession.json', JSON.stringify(zero.base64EncodedAuthInfo(), null, '\t'))
zero.on('chat-update', async (message) => {
require('./srv/zero.js')(zero, message)
})
    
const sendButImage = async (id, text1, desc1, gam1, but = [], options = {}) => {
kma = gam1;
mhan = await zero.prepareMessage(id, kma, MessageType.image);
buttonMessages = {
imageMessage: mhan.message.imageMessage,
contentText: text1,
footerText: desc1,
buttons: but,
headerType: 4,
}
zero.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
}

zero.on('group-participants-update', async (anu) => {
try {
var mdata = await zero.groupMetadata(anu.jid)
groupMet = await zero.groupMetadata(anu.jid)
groupMembers = groupMet.participants
groupAdmins = getGroupAdmins(groupMembers)
mem = anu.participants[0]
console.log(anu)
try {
pp_user = await zero.getProfilePicture(mem)
} catch (e) {
pp_user = "https://telegra.ph/file/c9dfa715c26518201f478.jpg"
}
try {
pp_grup = await zero.getProfilePicture(anu.jid)
} catch (e) {
pp_grup =
"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60"
}
if (anu.action == "add" && mem.includes(zero.user.jid)) {
zero.sendMessage(anu.jid, "*Hii Saya Bot WhatsApp!*", "conversation")
}
      
if (anu.action == 'add') {
num = anu.participants[0]
let v = zero.contacts[num] || { notify: num.replace(/@.+/, "") }
anu_user = v.vname || v.notify || num.split("@")[0]
try {
ppUr = await zero.getProfilePicture(anu_user)
} catch {
ppUrl = 'https://telegra.ph/file/c9dfa715c26518201f478.jpg'
}
img = await getBuffer(ppUrl)
teks = `*Hii @${anu_user} Wellcome*`
sendButImage(anu.jid, teks, `© - FucxXx`, img,but = [{buttonId:`intro`, 
buttonText:{displayText: 'Wellcome!'},type:1}], options = {contextInfo: {mentionedJid: [num, number]},thumbnail: Buffer.alloc(0)})
} else if (anu.action == 'remove') {
num = anu.participants[0]
try {
ppUrl = await zero.getProfilePicture(num)
} catch {
ppUrl = 'https://i.ibb.co/6BRf4Rc/Hans-Bot-No-Profile.png'
}
img = await getBuffer(ppUrl)
teks = `*Selamat Tinggal @${num.split('@')[0]}*`
sendButImage(anu.jid, teks, `© - FucxXx`, img,but= [{buttonId: `byebye`, buttonText: {displayText: `Byeee!`}, type: 1}], options = {contextInfo: {mentionedJid: [num, number]}, thumbnail: Buffer.alloc(0)})
}
} catch (e) {
console.log(e)
}
})

antical = false
zero.on("CB:Call", json => {
if (antical === false) return
let call;
calling = JSON.parse(JSON.stringify(json))
call = calling[1].from
zero.sendMessage(call, `*Sorry ${zero.user.name} can't receive calls.*\n*Call = Block!*`, MessageType.text)
.then(() => zero.blockUser(call, "add"))
})


zero.on('CB:Blocklist', json => {
if (blocked.length > 2) return
for (let i of json[1].blocklist) {
blocked.push(i.replace('c.us','s.whatsapp.net'))
}
})
}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
 
function nocache(module, cb = () => { }) {
console.log('Module', `'${module}'`, 'FucxXx')
fs.watchFile(require.resolve(module), async () => {
await uncache(require.resolve(module))
cb(module)
})
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
 
function uncache(module = '.') {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(module)]
resolve()
} catch (e) {
reject(e)
}
})
}

starts()