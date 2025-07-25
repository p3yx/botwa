process.on("uncaughtException", console.error);
require("./config");

const fs = require('fs');
const pm2 = require('pm2');
const util = require("util");
const { promisify } = require('util');
const setTimeoutPromise = promisify(setTimeout);
const chalk = require("chalk");
const axios = require('axios');
const { spawn, exec, execSync } = require("child_process");
const moment = require("moment-timezone");
const { EmojiAPI } = require("emoji-api");
const { addBalance } = require("./lib/limit.js");
const { smsg, formatp, tanggal, GIFBufferToVideoBuffer, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, fetchBuffer, clearChat } = require('./lib/myfunc')
const _ = require("lodash");
const yargs = require("yargs/yargs");
const kaitime = moment.tz('Asia/Jakarta').format('HH:mm:ss');
const kaidate = moment.tz('Asia/Jakarta').format('DD/MM/YYYY');
const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss');
const currentDate = new Date();
const options = { weekday: 'long' }; // Specify 'long' to get the full day name
const currentDay = new Intl.DateTimeFormat('en-US', options).format(currentDate);

const speed = require('performance-now');
const eco = require('discord-mongoose-economy');
// const ffmpeg = require('fluent-ffmpeg');
// const ffmpegPath = require('ffmpeg-static').path;
// ffmpeg.setFfmpegPath(ffmpegPath);
const Jimp = require('jimp');  // for full dp etc.
const { updateConfig } = require("./database/configUpdater");
const modapk = require("tod-api");
const { hentai } = require('./lib/scraper2.js');
const { instadl } = require('./lib/instadl');
const ty = eco.connect('mongodb+srv://Arch:1t6l2G0r6nagLlOb@cluster0.gedh4.mongodb.net/?retryWrites=true&w=majority');
const { isLimit, limitAdd, getLimit, giveLimit, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require('./lib/limit.js');
const githubstalk = require('./lib/githubstalk');
let { covid } = require('./lib/covid.js');
const { Gempa } = require("./lib/gempa.js");
const getLyrics = require("@fantox01/lyrics-scraper");
const spaceemojis = ["🌌", "🌠", "🚀", "🪐", "🌟"];     // list of emojis for Space CMDs.
const manyemojis = ["😄", "👍", "👏", "👌", "🥇", "🌟", "🎉", "🙌", "🤩", "💯", "🔥", "✨", "🚀", "💖", "🌈", "🌞", "🌠", "🌼", "💪", "😎", "💫", "💓", "🎈", "🎁", "🍾", "🎊", "🥳", "👑", "🌺", "🌻", "🌸"];
const os = require("node:os");       // for os info
const gis = require("g-i-s");

const { downloadContentFromMessage,
  WA_DEFAULT_EPHEMERAL,
  proto, jid,
  getContentType,
  generateWAMessageContent,
  generateWAMessageFromContent,
  BufferJSON,
  prepareWAMessageMedia,
  MessageType,
  areJidsSameUser, } = require('@whiskeysockets/baileys');


//"parse-ms": "^1.1.0",

//
let nowtime = '';

if (time2 < "05:00:00") {
  nowtime = 'Selamat malam 🏙';
} else if (time2 < "11:00:00") {
  nowtime = 'Selamat pagi 🌅';
} else if (time2 < "15:00:00") {
  nowtime = 'Selamat siang 🏞';
} else if (time2 < "18:00:00") {
  nowtime = 'Selamat sore 🌇';
} else if (time2 < "19:00:00") {
  nowtime = 'Selamat sore 🌆';
} else {
  nowtime = 'Selamat malam 🌌';
}



// 
const timestampe = speed();
const latensie = speed() - timestampe
const used = process.memoryUsage();
const cpu = os.cpus()[0];
const totalCpuUsage = (100 * (cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.irq) / cpu.times.idle).toFixed(2);
const systemName = os.platform() + ' ' + os.release();

var low;
try {
  low = require("lowdb");
} catch (e) {
  low = require("./lib/lowdb");
}

const { Low, JSONFile } = low;
const mongoDB = require("./lib/mongoDB");

global.opts = new Object(
  yargs(process.argv.slice(2)).exitProcess(false).parse()
);
global.db = new Low(
  /https?:\/\//.test(opts["db"] || "")
    ? new cloudDBAdapter(opts["db"])
    : /mongodb/.test(opts["db"])
      ? new mongoDB(opts["db"])
      : new JSONFile(`src/database.json`)
);
global.DATABASE = global.db; // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ)
    return new Promise((resolve) =>
      setInterval(function () {
        !global.db.READ
          ? (Interval(this),
            resolve(
              global.db.data == null ? global.loadDatabase() : global.db.data
            ))
          : null;
      }, 1 * 1000)
    );
  if (global.db.data !== null) return;
  global.db.READ = true;
  await global.db.read();
  global.db.READ = false;
  global.db.data = {
    users: {},
    chats: {},
    database: {},
    game: {},
    settings: {},
    others: {},
    sticker: {},
    ...(global.db.data || {}),
  };
  global.db.chain = _.chain(global.db.data);
};
loadDatabase();
global.db = JSON.parse(fs.readFileSync("./src/database.json"));
if (global.db)
  global.db = {
    sticker: {},
    database: {},
    game: {},
    others: {},
    users: {},
    ...(global.db || {}),
  };


//
let isSleeping = false; // Move the declaration here.
let banUser = JSON.parse(fs.readFileSync('./database/banUser.json'));
let banchat = JSON.parse(fs.readFileSync('./database/banChat.json'));
let kaiaudio = JSON.parse(fs.readFileSync('./Media-Database/audio.json'));
let _limit = JSON.parse(fs.readFileSync('./storage/limit.json'));
let _buruan = JSON.parse(fs.readFileSync('./storage/bounty.json'));
let _darahOrg = JSON.parse(fs.readFileSync('./storage/blood.json'))
let ntnsfw = JSON.parse(fs.readFileSync('./database/nsfw.json')); //
let pendaftar = JSON.parse(fs.readFileSync('./storage/user.json'))
let balance = JSON.parse(fs.readFileSync('./database/balance.json'))
let ssewa = JSON.parse(fs.readFileSync('./database/sewa.json'))
let ban = JSON.parse(fs.readFileSync('./database/ban.json'))
let autosticker = JSON.parse(fs.readFileSync('./database/autosticker.json'))
const _autostick = JSON.parse(fs.readFileSync('./database/autostickpc.json'))
let limit = JSON.parse(fs.readFileSync('./database/limit.json'))
let setik = JSON.parse(fs.readFileSync('./src/sticker.json'))
let vien = JSON.parse(fs.readFileSync('./src/audio.json'))
let imagi = JSON.parse(fs.readFileSync('./src/image.json'))
let videox = JSON.parse(fs.readFileSync('./src/video.json'))
global.db = JSON.parse(fs.readFileSync('./src/database.json'))
let _sewa = require("./lib/sewa");
const sewa = JSON.parse(fs.readFileSync('./database/sewa.json'))
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
const ucap = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
var buln = ['/01/', '/02/', '/03/', '/04/', '/05/', '/06/', '/07/', '/08/', '/09/', '/10/', '/11/', '/12/'];
var myHari = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var tgel = new Date();
var hri = tgel.getDate();
var bulnh = tgel.getMonth();
var thisHari = tgel.getDay(),
  thisDaye = myHari[thisHari];
var yye = tgel.getYear();
var syear = (yye < 1000) ? yye + 1900 : yye;
const jangwak = (hri + '' + buln[bulnh] + '' + syear)
const janghar = (thisDaye)
var myHari = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var tgel = new Date();
var thisHari = tgel.getDay(),
  thisDaye = myHari[thisHari];
var yye = tgel.getYear();



//
module.exports = A17 = async (A17, m, chatUpdate, store) => {
  try {
    var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
    var budy = (typeof m.text == 'string' ? m.text : '')
    const prefix = global.prefa
    const isCmd = body.startsWith(prefix)
    const notCmd = body.startsWith('')
    const command = isCmd ? body.slice(1).trim().split(' ')[0].toLowerCase() : ''
    const args = body.trim().split(/ +/).slice(1)
    const pushname = m.pushName || "No Name"
    const botNumber = await A17.decodeJid(A17.user.id)
    const isCreator = [botNumber, ...global.Owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const itsMe = m.sender == botNumber ? true : false
    const text = args.join(" ")
    const from = m.chat
    const quoted = m.quoted ? m.quoted : m
    const mime = (quoted.msg || quoted).mimetype || ''
    const isMedia = /image|video|sticker|audio/.test(mime)
    const messagesD = body.slice(0).trim().split(/ +/).shift().toLowerCase()
    const groupMetadata = m.isGroup ? await A17.groupMetadata(m.chat).catch(e => { }) : ''
    const groupName = m.isGroup ? groupMetadata.subject : ''
    const participants = m.isGroup ? await groupMetadata.participants : ''
    const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
    const groupOwner = m.isGroup ? groupMetadata.owner : ''
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    const isUser = pendaftar.includes(m.sender)
    const isBan = banUser.includes(m.sender)
    const welcm = m.isGroup ? wlcm.includes(from) : false
    const isBanChat = m.isGroup ? banchat.includes(from) : false
    const isRakyat = isCreator || global.rkyt.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || false
    const AntiLink = m.isGroup ? ntilink.includes(from) : false
    const AntiLinkYoutubeVid = m.isGroup ? ntilinkytvid.includes(from) : false
    const AntiLinkYoutubeChannel = m.isGroup ? ntilinkytch.includes(from) : false
    const AntiLinkInstagram = m.isGroup ? ntilinkig.includes(from) : false
    const AntiLinkFacebook = m.isGroup ? ntilinkfb.includes(from) : false
    const AntiLinkTiktok = m.isGroup ? ntilinktt.includes(from) : false
    const AntiLinkTelegram = m.isGroup ? ntilinktg.includes(from) : false
    const AntiLinkTwitter = m.isGroup ? ntilinktwt.includes(from) : false
    const AntiLinkAll = m.isGroup ? ntilinkall.includes(from) : false
    const antiWame = m.isGroup ? ntwame.includes(from) : false
    const antiVirtex = m.isGroup ? ntvirtex.includes(from) : false
    const AntiNsfw = m.isGroup ? ntnsfw.includes(from) : false
    autoreadsw = true
    const content = JSON.stringify(m.message)
    const q = args.join(' ')
    // const button = m.body

    const isQuotedVideo = m.mtype === 'extendedTextMessage' && content.includes('videoMessage')
    const isQuotedAudio = m.mtype === 'extendedTextMessage' && content.includes('audioMessage')



    autoreadsw = true;
    _sewa.expiredCheck(A17, sewa);

    const reply = (teks) => {
      A17.sendMessage(m.chat, { text: teks }, { quoted: m })
    }


    /* const reply = (teks) => {
      A17.sendMessage(m.chat, { text: teks }, { quoted: m }); 
    }; */


    const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
    const senderNumber = sender.split('@')[0]

    function randomNomor(angka) {
      return Math.floor(Math.random() * angka) + 1;
    }

    if (m.message) {
      addBalance(m.sender, randomNomor(574), balance);
      console.log(
        chalk.black(chalk.bgWhite("[ MESSAGE ]")),
        chalk.black(chalk.bgGreen(new Date())),
        chalk.black(chalk.bgBlue(budy || m.mtype)) +
        "\n" +
        chalk.magenta("=> From"),
        chalk.green(pushname),
        chalk.yellow(m.sender) + "\n" + chalk.blueBright("=> In"),
        chalk.green(m.isGroup ? pushname : "Private Chat", m.chat)
      );
    }

    if (isCmd && !isUser) {
      pendaftar.push(m.sender);
      fs.writeFileSync("./storage/user/user.json", JSON.stringify(pendaftar));
    }



    //----------------------------------------------------------------------------------------------------------//



    // if (global.autoreadpmngc) {
    //   if (command) {
    //     await A17.sendPresenceUpdate("composing", m.chat);
    //     A17.sendReadReceipt(from, m.sender, [m.key.id]);
    //   }
    // }


    //
    //   if (global.autoReadGc) {
    //   if (m.isGroup) { 
    //       A17.sendReadReceipt(m.chat, m.sender, [m.key.id]);
    //   }
    // }


    // if (global.autoReadAll) {
    //   if (m.chat) {
    //     A17.sendReadReceipt(m.chat, m.sender, [m.key.id]);
    //   }
    // }


    if (global.autoreadgc) {
      if (command) {
        await A17.sendPresenceUpdate('composing', m.chat);

        // Create an array of message keys to mark as read
        const keysToMarkAsRead = [
          {
            remoteJid: m.chat,
            id: m.key.id,
            participant: m.sender,
          },
          // You can add more message keys to mark multiple messages as read
        ];

        // Use the sock object to read the specified messages
        await A17.readMessages(keysToMarkAsRead);
      }
    }


    if (global.autoRecord) {
      if (m.chat) {
        A17.sendPresenceUpdate("recording", m.chat);
      }
    }

    if (global.autoTyping) {
      if (m.chat) {
        A17.sendPresenceUpdate("composing", m.chat);
      }
    }

    if (global.available) {
      if (m.chat) {
        A17.sendPresenceUpdate("available", m.chat);
      }
    }



    // //Dm and Groups Autoreply/Bot chat

    // if (!isCmd && !m.isGroup){
    //     const botreply = await axios.get(`http://api.brainshop.ai/get?bid=166512&key=5nz1Ha6nS9Zx1MfT&uid=[uid]&msg=[msg]=[${budy}]`)
    //     txt = `${botreply.data.cnt}`
    //     m.reply(txt)
    //     }    





    //-----------------------------------------------------------------------------------------------------------------------------------//



    //
    for (let anju of kaiaudio) {
      if (budy === anju) {
        result = fs.readFileSync(`./Assets/audio/${anju}.mp3`)
        A17.sendMessage(m.chat, { audio: result, mimetype: 'audio/mp4', ptt: true }, { quoted: m })
      }
    }



    //
    // const hariRaya = new Date("6 1, 2022 00:00:00");
    // const sekarang = new Date().getTime();
    // const Selisih = hariRaya - sekarang;
    // const jhari = Math.floor(Selisih / (1000 * 60 * 60 * 24));
    // const jjam = Math.floor(
    //   (Selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    // );
    // const mmmenit = Math.floor((Selisih % (1000 * 60 * 60)) / (1000 * 60));
    // const ddetik = Math.floor((Selisih % (1000 * 60)) / 1000);
    // const ultah = `${jhari}Day ${jjam}Hour ${mmmenit}Minute ${ddetik}Second`;

    // async function hitungmundur(bulan, tanggal) {
    //   let from = new Date(`${bulan} ${tanggal}, 2022 00:00:00`).getTime();
    //   let now = Date.now();
    //   let distance = from - now;
    //   let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //   let hours = Math.floor(
    //     (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    //   );
    //   let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //   let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    //   return (
    //     days +
    //     "Day " +
    //     hours +
    //     "Hour " +
    //     minutes +
    //     "Minute " +
    //     seconds +
    //     "Second"
    //   );
    // }



    //-----------------------------------------------------------------------------------------------------------------------------------//


    const formatTime = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    function updateStatus() {
      const uptimeInSeconds = Math.floor(process.uptime());
      const uptimeFormatted = formatTime(uptimeInSeconds);

      // const status = `
      // ㅤㅤ〄ㅤㅤ〘 A17 Personal Edition 〙ㅤㅤ〄ㅤㅤㅤㅤ
      // ㅤㅤㅤ〘ㅤ Auto Uptime: ${uptimeFormatted}ㅤ〙`;

     function _0x582b(_0xabb6f8, _0x12cdd8) { const _0x58e890 = _0x58e8(); return _0x582b = function (_0x582b90, _0x4387b3) { _0x582b90 = _0x582b90 - 0x189; let _0x932613 = _0x58e890[_0x582b90]; return _0x932613; }, _0x582b(_0xabb6f8, _0x12cdd8); } function _0x58e8() { const _0x109554 = ['12896370RDSmnX', '3BgvPel', '189HbmdoW', '18854HvEPNh', '11TZHUID', '9125326EcyeIg', '464328lPaAMf', '3400722cbWEOK', '2263175KIczdo', '12TaHNqM', '2521564eqJRHK']; _0x58e8 = function () { return _0x109554; }; return _0x58e8(); } (function (_0x429d7b, _0x532ab5) { const _0x527567 = _0x582b, _0x130eb4 = _0x429d7b(); while (!![]) { try { const _0x75c57a = -parseInt(_0x527567(0x18b)) / 0x1 + -parseInt(_0x527567(0x192)) / 0x2 * (-parseInt(_0x527567(0x189)) / 0x3) + parseInt(_0x527567(0x191)) / 0x4 * (-parseInt(_0x527567(0x190)) / 0x5) + -parseInt(_0x527567(0x18f)) / 0x6 + parseInt(_0x527567(0x18d)) / 0x7 + parseInt(_0x527567(0x18e)) / 0x8 * (-parseInt(_0x527567(0x18a)) / 0x9) + parseInt(_0x527567(0x193)) / 0xa * (parseInt(_0x527567(0x18c)) / 0xb); if (_0x75c57a === _0x532ab5) break; else _0x130eb4['push'](_0x130eb4['shift']()); } catch (_0x19ea04) { _0x130eb4['push'](_0x130eb4['shift']()); } } }(_0x58e8, 0xa8dae)); const status = '〄ㅤㅤ〘\x20PX\x20STORE\x20VPN\x20〙ㅤㅤ〄';

      A17.setStatus(status); // Set the status using A17.setStatus or your equivalent method

      // Update the status randomly within 5 minutes (300000 milliseconds)
      const randomTime = Math.floor(Math.random() * 300000) + 15000; // don't edit.
      setTimeout(updateStatus, randomTime);
    }

    // Initial call to start the random status updates
    

    //-----------------------------------------------------------------------------------------------------------------------------------//



    //
    // if (AntiLinkAll)
    //   var rondonxk = '[-a-zA-Z0-9@:%._+~#=].[-a-zA-Z0-9@:%._+~#=].[-a-zA-Z0-9()@:%_+.~#?&/=]'
    //   if (budy.includes("https://")) {
    //     if (!isBotAdmins) return
    //     bvl = `\`\`\`「  Antilink System  」\`\`\`\n\nLink sent by Admin so no action will be taken!`
    //     if (isAdmins) return reply(bvl)
    //     if (m.key.fromMe) return reply(bvl)
    //     if (isCreator) return reply(bvl)
    //     kice = m.sender
    //     await A17.sendMessage(
    //       from,
    //       {
    //         delete: {
    //           remoteJid: from,
    //           fromMe: false,
    //           id: m.id,
    //           participant: m.sender,
    //         },
    //       },
    //       {
    //         quoted: m,
    //       }
    //     );
    //   //  await A17.groupParticipantsUpdate(m.chat, [kice], 'remove')
    //     A17.sendMessage(from, { text: `\`\`\`「  Antilink System  」\`\`\`\n\n*⚠️ Group link detected !*\n\n*🚫@${kice.split("@")[0]} You are not allowed to send any links in this group !*\n`, contextInfo: { mentionedJid: [kice] } }, { quoted: m })
    //   } else {
    //   }

    // if (budy.includes("http://")) {
    //     if (!isBotAdmins) return
    //     bvl = `\`\`\`「  Antilink System  」\`\`\`\n\nLink sent by Admin so no action will be taken!`
    //     if (isAdmins) return reply(bvl)
    //     if (m.key.fromMe) return reply(bvl)
    //     if (isCreator) return reply(bvl)
    //     kice = m.sender
    //     await A17.sendMessage(
    //       from,
    //       {
    //         delete: {
    //           remoteJid: from,
    //           fromMe: false,
    //           id: m.id,
    //           participant: m.sender,
    //         },
    //       },
    //       {
    //         quoted: m,
    //       }
    //     );
    //   //  await A17.groupParticipantsUpdate(m.chat, [kice], 'remove')
    //     A17.sendMessage(from, { text: `\`\`\`「  Antilink System  」\`\`\`\n\n*⚠️ Group link detected !*\n\n*🚫@${kice.split("@")[0]} You are not allowed to send any links in this group !*\n`, contextInfo: { mentionedJid: [kice] } }, { quoted: m })
    //   } else {
    //   }


    //     const exitlist = `
    //     Konichiwa ${pushname} dear 👋. I am ${global.BotName}, a bot developed by: Kai to take your WhatsApp usage into next level.

    //        「 System Info 」

    //     Speed : ${latensie.toFixed(4)} miliseconds
    //     Up Time : ${runtime(process.uptime())}
    //     Bot Name : ${global.BotName}
    //     Owner Name : ${global.OwnerName}
    //     𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺 : Amazon AWS
    //     𝗧𝗼𝘁𝗮𝗹 𝗨𝘀𝗲𝗿 : ${Object.keys(global.db.users).length}


    //        「 User Info 」

    //     User Level: ${levelexit}
    //     User XP : ${xpexit} \ ${reqXp}
    //     User Role : ${role}


    //        「 User Bank 」

    //     User Balance : ${uangku}
    //    //Iron : ${getBesi(m.sender)}
    //     Gold : ${getEmas(m.sender)}
    //     Emarald : ${getEmerald(m.sender)}
    //     Potion : ${getPotion(m.sender)}


    //     Type *-exit* or press any button below to start using *${global.BotName}*

    //     ©️ *${global.BotName}* All Rights Reserved by: *Kai*
    //     `
    //         const qtod = m.quoted? "true":"false"



    // function pickRandom(list) {
    // return list[Math.floor(list.length * Math.random())]
    // }



    //-------------------------------------------------------------- tictactoe ----------------------------------------------------------------//


    //
    this.game = this.game ? this.game : {}
    let room = Object.values(this.game).find(room => room.id && room.game && room.state && room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender) && room.state == 'PLAYING')
    if (room) {
      let ok
      let isWin = !1
      let isTie = !1
      let isSurrender = !1
      //reply(`[DEBUG]\n${parseInt(m.text)}`)
      if (!/^([1-9]|(me)?give up|surr?ender|off|skip)$/i.test(m.text)) return
      isSurrender = !/^[1-9]$/.test(m.text)
      if (m.sender !== room.game.currentTurn) {
        if (!isSurrender) return !0
      }
      if (!isSurrender && 1 > (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1))) {
        reply({
          '-3': 'Game Has Ended',
          '-2': 'Invalid',
          '-1': 'Invalid Position',
          0: 'Invalid Position',
        }[ok])
        return !0
      }
      if (m.sender === room.game.winner) isWin = true
      else if (room.game.board === 511) isTie = true
      let arr = room.game.render().map(v => {
        return {
          X: '❌',
          O: '⭕',
          1: '1️⃣',
          2: '2️⃣',
          3: '3️⃣',
          4: '4️⃣',
          5: '5️⃣',
          6: '6️⃣',
          7: '7️⃣',
          8: '8️⃣',
          9: '9️⃣',
        }[v]
      })
      if (isSurrender) {
        room.game._currentTurn = m.sender === room.game.playerX
        isWin = true
      }
      let winner = isSurrender ? room.game.currentTurn : room.game.winner
      let str = `Room ID: ${room.id}
${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}
${isWin ? `@${winner.split('@')[0]} Won!` : isTie ? `Game Over` : `Turn ${['❌', '⭕'][1 * room.game._currentTurn]} (@${room.game.currentTurn.split('@')[0]})`}
❌: @${room.game.playerX.split('@')[0]}
⭕: @${room.game.playerO.split('@')[0]}
Typed *surrender* to surrender and admited defeat`
      if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat)
        room[room.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat
      if (room.x !== room.o) await A17.sendText(room.x, str, m, { mentions: parseMention(str) })
      await A17.sendText(room.o, str, m, { mentions: parseMention(str) })
      if (isTie || isWin) {
        delete this.game[room.id]
      }
    }


    //-----------------------------------------------------------------------------------------------------------------------------------//


    //
    const pickRandom = (arr) => {
      return arr[Math.floor(Math.random() * arr.length)]
    }

    /*
  let smallinput = budy.toLowerCase()
  if (smallinput.includes('hello')) {
    reply (`Hello ${pushname}, I am ${BotName}. How can i help you?`);
  } 
  
  //if (smallinput.includes('hi')) {
  
  //   reply (`Hello ${pushname}, I am ${BotName}. How can i help you?`);
  
  // } 
  
  if (smallinput=='kai') {
      reply (`My Boss is lost in another Multiverse, and I lost the connection with him...`)
  }
  
  
  if (smallinput=='runtime') {
    reply (`Hey ${pushname} my runtime is ${runtime(process.uptime())}\n\nCurrent Time: ${kaitime}\n\nCurrent Date: ${kaidate}`)
  }
  
  
  
  if( smallinput.includes('konichiwa') || smallinput.includes('konochiwa') || smallinput.includes('konichiba') || smallinput.includes('salute')){
    reply (`Konichiwa ${pushname}, I am ${BotName}. How can i help you?`);
  }
  
  
  if (smallinput=='a17') {
      reply ('Yes I am Alive 🫂')
  }
  
  if (smallinput=='sasha') {
    reply ('Only you...🫶🏻')
  }
  
  if (smallinput=='ping') {
      reply (`Hey ${pushname} Pong ${latensie.toFixed(4)} ms`)
  }
  
  
  if (smallinput.includes('good morning') || smallinput.includes('ohayo')) {
    reply (`Good morning to you too ${pushname} ☺️. Have a great day 😇.`);
  }
  
  if (smallinput.includes('good afternoon') || smallinput.includes('konnichiwa')) {
  
    reply (`Good afthernoon to you too ${pushname} ✨. Wishing you an enjoyable afternoon too 😇🤞🏻.`);
  
  }
  
  
  //if (smallinput.includes('good afthernoon')) {
   // reply (`Huh ${pushname} 😇. Wishing you an enjoyable afternoon too.`);
  //   }
  
  
  if (smallinput.includes('good night')) {
    reply (`Good night to you too ${pushname} 😇. Sleep well and sweet dreams.`);
  }
  
  if (smallinput.includes('arigato')|| smallinput.includes('arigatou') || smallinput.includes('thank')) {
    reply (`Mention not ${pushname} 😇. I am a bot afterall.`);
  }
  */


    const responses = {

      gcvip: `https://chat.whatsapp.com/HNACwQRxuoY7rVg6q12d4m\n\nSilahkan Join Grup Member Vip Kak, Grup ini untuk info server, Kontak Alternatif Admin, Dan info Info penting lainnya`,
      playloaden: `GET / HTTP/1.1[crlf]Host: [host][crlf]PATCH / HTTP/1.1[crlf]Host: Bug.com[crlf]Upgrade: websocket [crlf] User-Agent: [ua][crlf][crlf]Content-Length: CONFIG BY. PX[crlf][crlf][split]200 OK [crlf]`,
      playloadws: `GET / HTTP/1.1[crlf]Host: [host][crlf]Upgrade: websocket[crlf]User-Agent: [ua][crlf][crlf][split]CONFIG BY. PX[crlf][crlf]`,
      hello: `Hello ${pushname}, I am ${BotName}. My current prefix is "${prefix}". How can I help you?`,
      kai: `My Boss is lost in another Multiverse, and I lost connection with him...`,
      runtime: `Hey ${pushname}\n${nowtime}\n\nMy runtime:${runtime(process.uptime())}\n\nPrefix is: *${prefix}*\n\nTime: ${kaitime}\n\nDate: ${kaidate}\n\nToday is ${currentDay}`,
      konichiwa: `Konichiwa ${pushname}, I am ${BotName}. How can I help you?`,
      sasha: 'Only you...🫶🏻',
      ping: `Hey ${pushname}, Pong ${latensie.toFixed(4)} ms`,
      'good morning': `Good morning to you too ${pushname} ☺️. Have a great day 😇.`,
      ohayo: `Good morning to you too ${pushname} ☺️. Have a great day 😇.`,
      'good afternoon': `Good afternoon to you too ${pushname} ✨. Wishing you an enjoyable afternoon too 😇🤞🏻.`,
      konnichiwa: `Good afternoon to you too ${pushname} ✨. Wishing you an enjoyable afternoon too 😇🤞🏻.`,
      'good night': `Good night to you too ${pushname} 😇. Sleep well and sweet dreams.`,

    };

    const smallinput = budy.toLowerCase();

    if (responses.hasOwnProperty(smallinput)) {
      reply(responses[smallinput]);
    }
		
    const responi = { 
    pay: `*Pembayaran Lewat Dana dan Qris*
        
Dana : 083151636921 An Ferdiansyah

*Jangan Lupa Kirim Bukti TF Yah.*
Terimakasih`,
    dana: `*Pembayaran Lewat Dana dan Qris*
        
Dana : 083151636921 An Ferdiansyah

*Jangan Lupa Kirim Bukti TF Yah.*
Terimakasih`,

    };

    const inputee = budy.toLowerCase();
    
    if (responi.hasOwnProperty(inputee)) {
        let buttonMessage = {
          image: fs.readFileSync('./Assets/pic10.jpg'), gifPlayback: false,
          caption: (responi[inputee]),

          headerType: 4

        }
        A17.sendMessage(m.chat, buttonMessage, { quoted: m });
      }
	  
	  
const slideButton = async (jid, mention = []) => {

let imgsc = await prepareWAMessageMedia({ image: fs.readFileSync('./Assets/Ne.jpg')}, { upload: A17.waUploadToServer })
    function readJSON(filePath) {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const parsed = JSON.parse(data);
            return parsed.text && parsed.text.trim() ? parsed.text : null;
        } catch (err) {
            console.error(`Error reading ${filePath}:`, err);
            return null;
        }
    }
	
const promoText = readJSON('./database/promo.json');
const autoscriptText = readJSON('./database/autoscript.json');
const recodeText = readJSON('./database/recode.json');

const msgii = await generateWAMessageFromContent(jid, {
ephemeralMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
}, interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.fromObject({
text: "*All Transaksi Open ✅*\n\n*PeyX Store* Menyediakan Produk Dibawah Ini ⬇️"
}), 
contextInfo: {
mentionedJid: mention
}, 
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
cards: [{
header: proto.Message.InteractiveMessage.Header.fromObject({
title: promoText, 
hasMediaAttachment: true,
...imgsc
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [{                  
name: "cta_url",
buttonParamsJson: `{"display_text":"ORDER","url":"global.website","merchant_url":"https://wa.me/c/6283151636921"}`
}]
})
}, 
{
header: proto.Message.InteractiveMessage.Header.fromObject({
title: autoscriptText, 
hasMediaAttachment: true,
...imgsc
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [{                  
name: "cta_url",
buttonParamsJson: `{"display_text":"JOIN GRUP","url":"https://chat.whatsapp.com/HNACwQRxuoY7rVg6q12d4m","merchant_url":"https://chat.whatsapp.com/HNACwQRxuoY7rVg6q12d4m"}`
}]
})
}, 
{
header: proto.Message.InteractiveMessage.Header.fromObject({
title: recodeText, 
hasMediaAttachment: true,
...imgsc
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [{                  
name: "cta_url",
buttonParamsJson: `{"display_text":"LIHAT SALURAN","url":"https://whatsapp.com/channel/0029Vaj7rCF2phHIcXbV3v1N","merchant_url":"https://whatsapp.com/channel/0029Vaj7rCF2phHIcXbV3v1N"}`
}]
})
}]
})
})}
}}, {userJid: m.sender})
await A17.relayMessage(jid, msgii.message, {messageId: msgii.key.id})
}

    const responin = { 
    produk: `Jangan Dirubah`,
    };

    const inputen = budy.toLowerCase();
    
    if (responin.hasOwnProperty(inputen)) {
			await slideButton(m.chat)
      }

    //============= [LIST RESPONCE CHECKING START ]================

    //-----------------------------------------------------------------------------------------------------------------------------------//
    try {
      if (m.mtype === "interactiveResponseMessage") {
        console.log("interactiveResponseMessage Detected!")
        let msg = m.message[m.mtype] || m.msg
        if (msg.nativeFlowResponseMessage && !m.isBot) {
          let { id } = JSON.parse(msg.nativeFlowResponseMessage.paramsJson) || {}
          if (id) {
            let emit_msg = {
              key: { ...m.key }, // SET RANDOME MESSAGE ID  
              message: { extendedTextMessage: { text: id } },
              pushName: m.pushName,
              messageTimestamp: m.messageTimestamp || 754785898978
            }
            return A17.ev.emit("messages.upsert", { messages: [emit_msg], type: "append" })
          }
        }
      }
    } catch (e) { console.log("ERROR WHILE CHECKING LIST RESPONCE : ", e) }
    //============= [LIST RESPONCE CHECKING END ]================

    //-----------------------------------------------------------------------------------------------------------------------------------//


    switch (command) {


      //
	  case "produk": {
			await slideButton(m.chat)
		}
		break
		
      case 'sc': case 'script': case 'sourcecode': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "❤", key: m.key } })

        let { data } = await axios.get('https://api.github.com/repos/Diah082/Nebot');
        teks = `*PxBot Script*\n\n*Total Stars*: ${data.stargazers_count}⭐\n*Total Forks*: ${data.forks_count} forks\n*GitHub*: https://github.com/Diah082/NewbieBot\n\nDont forget to follow me on *GitHub* and give a ⭐️ to my projects. `
          let buttons = [
          {buttonId: `${prefix}owner`, buttonText: {displayText: '🍁 DEVELOPER 🍁'}, type: 1}
          ] 
try {
    let buttonMessage = {
        image: Thumb,
        jpegThumbnail: BotLogo,
        caption: teks || "Default Caption",
        footer: `${BotName}`,
        headerType: 4,
        contextInfo: {
            externalAdreply: {
                title: "Powered by Peyx",
                body: " ",
                thumbnail: Thumb,
                mediaType: 1,
                mediaUrl: 'github.com/Diah082/Nebot',
                sourceUrl: "github.com/Diah082/Nebot"
            }
        }
    };
    A17.sendMessage(m.chat, buttonMessage, { quoted: m });
} catch (error) {
    console.error("Terjadi error saat mengirim pesan:", error);
}

      }
        break;
		
      case 'qt': {
        if (!args[0] && !m.quoted) {
          return m.reply(`Please provide a text (Type or mention a message) !`);
        }

        try {
          let userPfp;
          if (m.quoted) {
            userPfp = await A17.profilePictureUrl(m.quoted.sender, "image");
          } else {
            userPfp = await A17.profilePictureUrl(m.sender, "image");
          }

          const waUserName = pushname;
          const quoteText = m.quoted ? m.quoted.body : args.join(" ");

          const quoteJson = {
            type: "quote",
            format: "png",
            backgroundColor: "#FFFFFF",
            width: 700,
            height: 580,
            scale: 2,
            messages: [
              {
                entities: [],
                avatar: true,
                from: {
                  id: 1,
                  name: waUserName,
                  photo: {
                    url: userPfp,
                  },
                },
                text: quoteText,
                replyMessage: {},
              },
            ],
          };

          const quoteResponse = await axios.post("https://bot.lyo.su/quote/generate", quoteJson, {
            headers: { "Content-Type": "application/json" },
          });

          const buffer = Buffer.from(quoteResponse.data.result.image, "base64");
          A17.sendImageAsSticker(m.chat, buffer, m, {
            packname: `${global.BotName}`,
            author: waUserName,
          });
        } catch (error) {
          console.error(error);
          m.reply("Error generating quote!");
        }
        break;
      }
      case 'owner': case 'creator': case 'mod': case 'mods': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        A17.sendMessage(from, { react: { text: "💫", key: m.key } })
        A17.sendContact(m.chat, global.Owner, m)
      }
        break;

      case 'shutdown': case 'sleep':
        if (!isCreator) return reply(mess.owner)
        if (isCreator) return reply(mess.bangc);
        if (!isCreator) return reply(mess.owner)
        await A17.sendMessage(from, { react: { text: "⚠️", key: m.key } })

        reply(`Okey bye time to sleep!`)
        await sleep(5000)
        process.exit()
        break;


      case 'public': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.owner)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        A17.public = true
        reply('I am now Publicly accessable!')
        A17.setStatus(`Mode : Public`)
      }
        break;


      case 'self': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)

        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        A17.public = false
        reply('Only Owner can use me now!')
        A17.setStatus(`Mode : Self`)
      }
        break;

      case "link": {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        try {

          await A17.sendMessage(from, { react: { text: "❤", key: m.key } });
          let teks = `*Peyx Store*`;

          let msg = generateWAMessageFromContent(m.key.remoteJid, {
            viewOnceMessage: {
              message: {
                "messageContextInfo": {
                  "deviceListMetadata": {},
                  "deviceListMetadataVersion": 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                  body: proto.Message.InteractiveMessage.Body.create({
                    text: teks
                  }),
                  footer: proto.Message.InteractiveMessage.Footer.create({
                    text: "                    Powered by Peyx"
                  }),
                  header: proto.Message.InteractiveMessage.Header.create({
                    title: "                 Selamat Datang Di",
                    subtitle: "Download Gratis",
                    hasMediaAttachment: false
                  }),
                              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                    buttons: [
                      {
                        name: "cta_url",
                        buttonParamsJson: `{"\display_text\":\"DOWNLOAD LINK CONFIG HC\",\"url\":\"https://sfile.mobi/user.php?files&user=681091\"}`
                      }
                    ]
                  })
                })
              }
            }
          }, {});

          if (!msg || !msg.key || !msg.key.remoteJid || !msg.key.id) {
            const errorMessage = 'Error: Invalid message key.';
            console.error(errorMessage);
            return reply(errorMessage);
          }

          await A17.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
          });
        } catch (error) {
          console.error('Error generating and relaying message:', error);
          return reply('Error generating and relaying message.');
        }

        break;
      }



      //Hosted platfrom info
      case 'server':
      case 'sysinfo': {

        const respon = `
  🤖 *PeyX Bot Server Info* 🤖
  
  *System*: ${systemName}
  
  *RAM*: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
  
  *NodeJS Memory Usage*: ${Object.keys(used).map(key => `${key}: ${formatp(used[key])}`).join(', ')}
  
  *Total CPU Usage*: ${totalCpuUsage}%
  
  *CPU Model*: ${cpu.model.trim()} (${cpu.speed} MHz)
  
  *Runtime*: ${runtime(process.uptime())}
  
  *Response Speed*: ${latensie.toFixed(4)} seconds
  `.trim();

        m.reply(respon);
        break;
      }


      case 'ipcheck':
      case 'checkip':
        if (isCreator) return reply(mess.banned);
        if (isCreator) return reply(mess.bangc);

        if (!args[0]) {
          return reply(`Please provide an IP address to check.\nExample: ${prefix}ipcheck 207.97.227.239`);
        }

        const ipAddress = args[0];

        // Encode the IP address
        const encodedIpAddress = encodeURIComponent(ipAddress);

        // Construct the API URL with the encoded IP address
        const apiUrl = `https://www.exenoz.tech/api/ip-location?ip=${encodedIpAddress}`;

        try {

          const response = await axios.get(apiUrl);

          const locationData = response.data;

          const message = `
      IP Address: ${encodedIpAddress}\n
      Country: ${locationData.location.country}\n
      Region: ${locationData.location.region}\n
      Timezone: ${locationData.location.timezone}\n
      City: ${locationData.location.city}\n
      Latitude: ${locationData.location.ll[0]}\n
      Longitude: ${locationData.location.ll[1]}\n
    `;

          A17.sendMessage(from, { text: message }, { quoted: m });
        } catch (error) {
          console.error('Error fetching IP location data:', error);
          reply('Failed to fetch IP location data. Please try again later.');
        }
        break;


      case 'serverip':
      case 'ip':
        if (isCreator) return reply(mess.banned);
        if (isCreator) return reply(mess.bangc);

        async function getServerIp() {
          try {
            const response = await axios.get('https://api.ipify.org?format=json');

            const serverIp = response.data.ip;

            return serverIp;
          } catch (error) {

            console.error('Error fetching server IP address:', error.message);
            return null;
          }
        }

        getServerIp()
          .then(serverIp => {
            if (serverIp) {
              const message = `The bot's IP address is: ${serverIp}`;
              A17.sendMessage(from, { text: message }, { quoted: m });
            } else {
              A17.sendMessage(from, { text: 'Failed to fetch server IP address.' }, { quoted: m });
            }
          })
          .catch(error => {
            console.error('Error:', error.message);
            A17.sendMessage(from, { text: 'An error occurred while fetching the server IP address.' }, { quoted: m });
          });
        break;

        case 'restart':
        await A17.sendMessage(from, { react: { text: "⚙", key: m.key } });
        if (!isCreator) return reply(mess.botowner)

        await A17.sendMessage(from, { text: mess.waiting });
        await A17.sendMessage(from, { react: { text: "✅", key: m.key } });
        await A17.sendMessage(from, { text: 'Restarting Success!' });

        // Delay the shutdown by 5 seconds using sleep function
        //await sleep(5000);

        // Use PM2 to restart the script
        pm2.restart('index', (err) => {
          if (err) {
            A17.sendMessage(from, { react: { text: "❌", key: m.key } });
            A17.sendMessage(from, { text: 'Restarting Failed!' });
          } else {
            return;
          }
        });
        break;

case 'domaincheck':
case 'checkdomain':
  if (isCreator) return reply(mess.banned);
  if (isCreator) return reply(mess.bangc);

  if (!args[0]) {
    return reply(`Please provide a domain to check.\nExample: ${prefix}domaincheck example.com`);
  }

  const domain = args[0];

  try {
    // Resolve the domain to get its IP
    const dns = require('dns').promises;
    const lookup = await dns.lookup(domain);

    if (!lookup || !lookup.address) {
      return reply(`Could not resolve the domain: ${domain}`);
    }

    const ipAddress = lookup.address;

    // Encode the IP address
    const encodedIpAddress = encodeURIComponent(ipAddress);

    // Construct the API URL with ipwhois
    const apiUrl = `https://ipwhois.app/json/${encodedIpAddress}`;

    // Fetch IP location data
    const axios = require('axios');
    const response = await axios.get(apiUrl);

    if (response.data.success === false) {
      return reply('Failed to fetch IP location data. Please try again later.');
    }

    const locationData = response.data;

    const message = `
Domain: ${domain}
Resolved IP Address: ${ipAddress}
Country: ${locationData.country}
Region: ${locationData.region}
City: ${locationData.city}
Timezone: ${locationData.timezone}
Latitude: ${locationData.latitude}
Longitude: ${locationData.longitude}
ISP: ${locationData.isp}
    `;

    A17.sendMessage(from, { text: message }, { quoted: m });
  } catch (error) {
    console.error('Error fetching domain/IP location data:', error);
    reply('Failed to fetch domain or IP location data. Please try again later.');
  }
  break;




      case 'ls':
        if (isCreator) return reply(mess.banned);
        if (isCreator) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "📂", key: m.key } });

        const currentDir = process.cwd(); // Get the current working directory

        try {
          const files = fs.readdirSync(currentDir);
          let folderName = `Files in ${currentDir}:\n\n`;
          let fileList = files.join('\n'); // Join the file names with a newline
          A17.sendMessage(from, { text: folderName + fileList }, m);
        } catch (error) {
          console.error(error);
          A17.sendMessage(from, { text: 'Error reading directory contents.🫳🏻' }, m);
        }
        break;


      case 'autostatus':
      case 'auto-status':
      case 'statusevent':
      case 'autostatusseen':

        if (isCreator) return reply(mess.banned);
        if (!isCreator) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        A17.sendMessage(from, { react: { text: '❤', key: m.key } });

        if (args.length === 0) {
          // Display the current status of autostatus
          return m.reply(`Auto-Status is currently ${global.statusseen ? 'enabled' : 'disabled'}.`);
        } else if (args.length === 1 && (args[0] === 'on' || args[0] === 'off')) {
          const status = args[0];
          if (status === 'on') {
            global.statusseen = true;
            return m.reply('Auto-Status is now enabled.');
          } else {
            global.statusseen = false;
            return m.reply('Auto-Status is now disabled.');
          }
        } else {
          return m.reply(`Usage: ${global.prefa[0]}autostatus [on/off]`);
        }
        break;


      case 'ban': {
        if (isCreator) return reply(mess.banned);
        if (isCreator) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (!args[0]) return reply(`Select add or del (add to ban, del to unban), For Example: reply *${prefix}ban add* to the user you want to ban.`)
        if (args[1]) {
          orgnye = args[1] + "@s.whatsapp.net"
        } else if (m.quoted) {
          orgnye = m.quoted.sender
        }
        const isBane = banUser.includes(orgnye)
        if (args[0] === "add") {
          if (isBane) return ads('User is already banned.')
          banUser.push(orgnye)
          reply(`Successfully Banned the user.`)
        } else if (args[0] === "del") {
          if (!isBane) return ads('User is already unbanned.')
          let delbans = banUser.indexOf(orgnye)
          banUser.splice(delbans, 1)
          reply(`Successfully Unbanned the user.`)
        } else {
          reply("Error")
        }
      }
        break;



      //-------------------------------------------------------------------------------------------------------------------------//



      //tictactoe game

      case 'ttc': case 'ttt': case 'tictactoe': {
        if (isBan) return reply(mess.ban)
        if (isBanChat) return reply(mess.banChat)
        A17.sendMessage(from, { react: { text: "🎮", key: m.key } })

        let TicTacToe = require("./lib/tictactoe")
        this.game = this.game ? this.game : {}
        if (Object.values(this.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) return reply(`${pushname} You Are Still In The Game...`)
        let room = Object.values(this.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
        if (room) {
          reply(`Hey ${pushname} Your Partner found!`)
          room.o = m.chat
          room.game.playerO = m.sender
          room.state = 'PLAYING'
          let arr = room.game.render().map(v => {
            return {
              X: '❌',
              O: '⭕',
              1: '1️⃣',
              2: '2️⃣',
              3: '3️⃣',
              4: '4️⃣',
              5: '5️⃣',
              6: '6️⃣',
              7: '7️⃣',
              8: '8️⃣',
              9: '9️⃣',
            }[v]
          })
          let str = `Room ID: ${room.id}
  ${arr.slice(0, 3).join('')}
  ${arr.slice(3, 6).join('')}
  ${arr.slice(6).join('')}
  Waiting @${room.game.currentTurn.split('@')[0]}
  Type *surrender* to surrender and admit defeat...`
          if (room.x !== room.o) await A17.sendText(room.x, str, m, { mentions: parseMention(str) })
          await A17.sendText(room.o, str, m, { mentions: parseMention(str) })
        } else {
          room = {
            id: 'tictactoe-' + (+new Date),
            x: m.chat,
            o: '',
            game: new TicTacToe(m.sender, 'o'),
            state: 'WAITING'
          }
          if (text) room.name = text
          reply('Waiting For Partner' + (text ? ` Type The Command Below ${prefix} ${command} ${text}` : ''))
          this.game[room.id] = room
        }
      }
        break;



      // report and suggest ...

      case 'report': case 'suggest ': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`please provide a report message you want to deliver`)
        if (text.length > 300) return reply(`Are you trying to send virus!`)
        const txtmsg = `*📮 Report Message*\n\n*Sender ➛* wa.me/${m.sender.split("@")[0]}\n\n*Group Name ➛* ${groupName}\n\n*Message ➛*  ${text}`
        for (let mod of global.Owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != '6285184823708@s.whatsapp.net'))
        await A17.sendMessage(`${mod}`, { text: `${txtmsg}` }, { quoted: m })
        await A17.sendMessage(`120363280037029437@g.us`, { text: `${txtmsg}`, mentions: groupAdmins }, { quoted: m })
        reply(`*✅ Your Report has been submitted Successfully to Support group & Owner*\n\n*You will get response shortly... ♥️*`);
      }
        break;


      //

      case 'dice': case 'roll': {
        A17.sendMessage(from, { react: { text: "🎲", key: m.key } })
        const result = Math.floor(Math.random() * 6) + 1; // Generate a random number between 1 and 6

        const diceMessage = `🎲 *Dice Roll Result:* ${result}`;

        reply(diceMessage);
      }
        break;


      case 'flipcoin': case 'coin': {
        A17.sendMessage(from, { react: { text: "🪙", key: m.key } });
        // Simulate flipping a coin (0 for heads, 1 for tails)
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';

        const flipCoinMessage = `🪙 *Coin Flip Result: ${result}*`;
        reply(flipCoinMessage);
      }
        break;


      case 'rps': {
        const randomEmoji = manyemojis[Math.floor(Math.random() * manyemojis.length)];
        A17.sendMessage(from, { react: { text: randomEmoji, key: m.key } });

        // Check if the command includes a valid move (rock, paper, or scissors)
        const validMoves = ['rock', 'paper', 'scissors'];
        if (!args[0] || !validMoves.includes(args[0].toLowerCase())) {
          return reply('Please provide a valid move: rock, paper, or scissors.');
        }

        // Generate a random move for the bot
        const botMove = validMoves[Math.floor(Math.random() * validMoves.length)];

        // Determine the winner
        const userMove = args[0].toLowerCase();
        let result;

        if (userMove === botMove) {
          result = 'It\'s a tie!';
        } else if (
          (userMove === 'rock' && botMove === 'scissors') ||
          (userMove === 'paper' && botMove === 'rock') ||
          (userMove === 'scissors' && botMove === 'paper')
        ) {
          result = `You win! 🥳 ${userMove} beats ${botMove}.`;
        } else {
          result = `You lose! 🫳🏻 ${botMove} beats ${userMove}.`;
        }

        // Send the result as a response
        reply(`You chose ${userMove}.\nA17 chose ${botMove}.\n${result}`);
      }
        break;


      // economy ...
      case 'daily': case 'claim': case 'reward':

        {
          if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
          if (isBan) return reply(mess.banned);
          if (isBanChat) return reply(mess.bangc);
          if (!m.isGroup) return reply(mess.grouponly)

          A17.sendMessage(from, { react: { text: "💰", key: m.key } })
          let user = m.sender
          const cara = "cara"
          const daily = await eco.daily(user, cara, 999); //give 999 for daily, can be changed

          if (daily.cd) return reply(`You already claimed daily for today, come back in ${daily.cdL}`); //cdL is already formatted cooldown Left

          reply(`You claimed 💎${daily.amount} for daily`);
        }
        break;


      case 'wallet': case 'purse': {

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly)

        A17.sendMessage(from, { react: { text: "💳", key: m.key } })

        if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)

        const user = m.sender

        const cara = "cara"

        const balance = await eco.balance(user, cara); //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.

        await reply(`👛 ${pushname}'s Purse:\n\n_💎${balance.wallet}_`);

      }
        break;


      case 'bank': case 'levee': {
        if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly)

        A17.sendMessage(from, { react: { text: "💳", key: m.key } })

        const user = m.sender
        const cara = "cara"
        const balance = await eco.balance(user, cara); //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.
        await reply(`🏦 ${pushname}'s Bank:\n\n_💎${balance.bank}/${balance.bankCapacity}_`);
      }
        break;


      case 'capacity': case 'bankupgrade':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly)

        {
          A17.sendMessage(from, { react: { text: "💲", key: m.key } })

          //if (!isCreator) return reply(mess.botowner)
          if (!text) return reply(`💴 Bank-capacity 💳\n\n1 | 1000 sp = 💎100\n\n2 | 10000 sp = 💎1000\n\n3 | 100000 sp = 💎10000\n\nExample- ${prefix}capacity 1 OR ${prefix}bankupgrade 1000`)
          if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
          const user = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
          const cara = "cara"
          let value = text.trim();
          let k = parseInt(value)
          const balance = await eco.balance(user, cara)
          switch (value) {
            case '1000':
            case '1':
              if (k > balance.wallet) return reply(`You need to pay 💎100 to increase bank capacity ~ 1000 sp`);
              const deduct1 = await eco.deduct(user, cara, 100);
              const add1 = eco.giveCapacity(user, cara, 1000);
              await reply(`1000 💎diamond storage has been added in ${pushname} bank`)
            case '10000':
            case '2':
              if (k > balance.wallet) return reply(`You need to pay 💎1000 to increase bank capacity ~ 10000 sp`);
              const deduct2 = await eco.deduct(user, cara, 1000);
              const add2 = eco.giveCapacity(user, cara, 10000);
              await reply(`10000 💎diamond storage has been added in ${pushname} bank`)
            case '100000':
            case '3':
              if (k > balance.wallet) return reply(`You need to pay 💎10000 to increase bank capacity ~ 100000 sp`);
              const deduct3 = await eco.deduct(user, cara, 10000);
              const add3 = eco.giveCapacity(user, cara, 100000);
              await reply(`100000 💎diamond storage has been added in ${pushname} bank`)
          }
        }
        break;


      case 'deposit': case 'pay-in': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly)

        A17.sendMessage(from, { react: { text: "📥", key: m.key } })

        if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
        if (!text) return reply("Provide the amount you want to deposit!");
        const texts = text.trim();
        const user = m.sender;
        const cara = 'cara'
        const deposit = await eco.deposit(user, cara, texts);
        if (deposit.noten) return reply('You can\'t deposit what you don\'t have.'); //if user states more than whats in his wallet
        reply(`Successfully Deposited 💎${deposit.amount} to your bank.`)
      }
        break;


      case 'withdraw': case 'withdrawal': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly)

        A17.sendMessage(from, { react: { text: "💸", key: m.key } })

        if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
        const user = m.sender
        if (!text) return reply("Provide the amount you want to withdraw!");
        const query = text.trim();
        const cara = 'cara'
        const withdraw = await eco.withdraw(user, cara, query);
        if (withdraw.noten) return reply('🏧 Insufficient fund in bank'); //if user states more than whats in his wallet
        const add = eco.give(user, cara, query);
        reply(`🏧 ALERT  💎${withdraw.amount} has been added in your wallet.`)

      }
        break;


      case 'rob': case 'attack':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly)

        {
          A17.sendMessage(from, { react: { text: "🔪", key: m.key } })
          if (!text) return reply(`Use ${prefix}rob @user`)
          const target =
            m.quoted && m.mentionedJid.length === 0
              ? m.quoted.sender
              : m.mentionedJid[0] || null;
          if (!target || target === m.sender) return reply("what are you trying to do!")
          if (m.quoted?.sender && !m.mentionedJid.includes(m.quoted.sender)) m.mentionedJid.push(m.quoted.sender)
          while (m.mentionedJid.length < 2) m.mentionedJid.push(m.sender)
          const cara = "cara"
          const user1 = m.sender
          const user2 = target
          const k = 250
          const balance1 = await eco.balance(user1, cara)
          const balance2 = await eco.balance(user2, cara)
          const typ = ['ran', 'rob', 'caught'];
          const random = typ[Math.floor(Math.random() * typ.length)];
          if (k > balance1.wallet) return reply(`☹️ You don't have enough money to pay incase you get caught`);
          if (k > balance2.wallet) return reply(`Sorry, your victim is too poor 🤷🏽‍♂️ let go.`);
          let tpy = random
          switch (random) {
            case 'ran':
              await reply(`Your victim escaped, be more scaryðŸ˜¤ next time.`)
          }
        }
        break;


      case 'transfer': case 'give': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly)
        A17.sendMessage(from, { react: { text: "🗿", key: m.key } })
        let value = text.trim().split(" ");
        if (value[0] === "") return reply(`Use ${prefix}transfer 100 @user`);
        const target =
          m.quoted && m.mentionedJid.length === 0
            ? m.quoted.sender
            : m.mentionedJid[0] || null;
        if (!target || target === m.sender) return reply("what are you trying to do!")
        if (m.quoted?.sender && !m.mentionedJid.includes(m.quoted.sender)) m.mentionedJid.push(m.quoted.sender)
        while (m.mentionedJid.length < 2) m.mentionedJid.push(m.sender)
        const cara = "cara"
        const user1 = m.sender
        const user2 = target
        const word = value[0];
        const code = value[1];
        let d = parseInt(word)
        if (!d) return reply("check your text plz u r using the command in a wrong way")

        const balance = await eco.balance(user1, cara);
        let a = (balance.wallet) < parseInt(word)
        //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.	
        if (a == true) return reply("you dont have sufficient money to transfer");

        const deduct = await eco.deduct(user1, cara, value[0]);
        const give = await eco.give(user2, cara, value[0]);
        reply(`📠 Transaction successful`)

      }
        break;


      case 'wealth': case 'ritual': {
        if (!isCreator) return reply(mess.botowner)
        var user = m.sender
        var cara = 'cara'
        const give1 = eco.give(user, cara, 9999)
        reply(`You are the wealthiest my *Lord*`)
      }
        break;



      //-------------------------------------------------------------------------------------------------------------------------------------//



      //gamble
      case 'gamble': case 'lottery':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly)
        {
          //var response = await A17.groupInviteCode(from)
          //var link1 = `https://chat.whatsapp.com/${response}`
          //var link2 = `https://chat.whatsapp.com/BXQaaeg7utI29OI4RbhdIhl`
          var texts = text.trim().split(" ");
          var opp = texts[1];// your value
          var value = texts[0].toLowerCase();
          var gg = parseInt(value)
          var user = m.sender //m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
          const cara = 'cara'
          const balance = await eco.balance(user, cara);
          const g = (balance.wallet) > parseInt(value)
          const k = 50
          const a = (k) > parseInt(value)
          const twice = gg * 2
          const f = ["up", "right", "left", "down", "up", "left", "down", "right", "up", "down", "right", "left"]
          const r = f[Math.floor(Math.random() * f.length)]
          if (isBan) return reply(mess.banned);
          if (isBanChat) return reply(mess.bangc);
          if (!m.isGroup) return reply(mess.grouponly)
          //if (link1 == link2){
          if (texts[0] === "")
            return reply(
              `Example:  ${prefix}gamble 100 direction(left,right,up,down)`
            );
          if (!value) return reply("*Please, specify the amount you are gambling with!");
          if (!opp) return reply("Specify the direction you are betting on!");
          if (!gg) return reply("Check your text please, You are using the command in a wrong way")
          if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
          if (g == false) return reply(`You don't have sufficient 💎 Diamond to gamble with`);
          if (a == true) return reply(`Sorry ${pushname}, you can only gamble with more than 💎50.`);
          if (r == opp) {
            let give = await eco.give(user, cara, twice);
            reply(`*📉 You won 💎${twice}*`)
          }
          else {
            let deduct = await eco.deduct(user, cara, texts[0]);
            reply(`*📈 You lost 💎${texts[0]}*`)
          }
          //}
          //else{
          //reply(`Gambling is allowed only in Casino/Gamble Group,\n\ntype ${prefix}casino to get the group link`)
          //}
        }
        break;


      //-----------------Slot----------------------
      /*
      case'slot': case 'spin': {
             if (isBan) return reply(mess.banned);
             if (isBanChat) return reply(mess.bangc);
             if (!m.isGroup) return reply(mess.grouponly)
             var today = new Date();
         if (today.getDay() == 6 || today.getDay() == 5 || today.getDay() == 0){
             if (text == 'help') return reply(`*1:* Use ${prefix}slot to play\n\n*2:* You must have 💎100 in your wallet\n\n*3:* If you don't have money in wallet then withdraw from your bank\n\n*4:* If you don't have money in your bank too then use economy features to gain money`)
             if (text == 'money') return reply(`*1:* Small Win --> +💎20\n\n*2:* Small Lose --> -💎20\n\n*3:* Big Win --> +💎100\n\n*4:* Big Lose --> -💎50\n\n*5:* 🎉 JackPot --> +💎1000`)
             const fruit1= ["🥥", "🍎", "🍇"]
             const fruit2 = ["🍎", "🍇", "🥥"]  
             const fruit3 = ["🍇", "🥥", "🍎"]         
             const fruit4 = ["🍇", "🍎", "🥥"]
             const lose = ['*You suck at playing this game*\n\n_--> 🍍-🥥-🍎_', '*Totally out of line*\n\n_--> 🥥-🍎-🍍_', '*Are you a peyx?*\n\n_--> 🍎-🍍-🥥_']
             const smallLose = ['*You cannot harvest coconut 🥥 in a pineapple 🍍 farm*\n\n_--> 🍍>🥥<🍍_', '*Apples and Coconut are not best Combo*\n\n_--> 🍎>🥥<🍎_', '*Coconuts and Apple are not great deal*\n\n_--> 🥥>🍎<🥥_']
             const won = ['*You harvested a basket of*\n\n_--> 🍎+🍎+🍎_', '*Impressive, You must be a specialist in plucking coconuts*\n\n_--> 🥥+??+🥥_', '*Amazing, you are going to be making pineapple juice for the family*\n\n_--> 🍍+🍍+🍍_']             
             const near = ['*Wow, you were so close to winning pineapples*\n\n_--> 🍎-🍍+🍍_', '*Hmmm, you were so close to winning Apples*\n\n_--> 🍎+🍎-🍍_']          
             const jack = ['*🥳 JackPot 🤑*\n\n_--> 🍇×🍇×🍇×🍇_', '*🎉 JaaackPooot!*\n\n_--> 🥥×🥥×🥥×🥥_', '*🎊 You Just hit a jackpot worth 💎1000*']
             const user = m.sender
             const cara = "cara"
             const k = 100
             const balance1  = await eco.balance(user, cara)
             
             if (k > balance1.wallet) return reply(`You are going to be spinning on your wallet, you need at least 💎100`);
             const f1 = fruit1[Math.floor(Math.random() * fruit1.length)];
             const f2 = fruit2[Math.floor(Math.random() * fruit2.length)];
             const f3 = fruit3[Math.floor(Math.random() * fruit3.length)];
             const f4 = fruit4[Math.floor(Math.random() * fruit4.length)];
             const mess1 = lose[Math.floor(Math.random() * lose.length)];
             const mess2 = won[Math.floor(Math.random() * won.length)];
             const mess3 = near[Math.floor(Math.random() * near.length)];
             const mess4 = jack[Math.floor(Math.random() * jack.length)];
             const mess5 = smallLose[Math.floor(Math.random() * smallLose.length)];
             
             if ((f1 !== f2) && f2 !== f3){
                const deduct1 = await eco.deduct(user, cara, 50);
                       reply(`${mess1}\n\n*Big Lose -->* _💎50_`)
             }
             else if ((f1 == f2) && f2 == f3){
                const give1 = await eco.give(user, cara, 100); 
                      reply(`${mess2}\n*_Big Win -->* _💎100_`)
             }
             else if ((f1 == f2) && f2 !== f3){
                const give2 = await eco.give(user, cara, 20);
                      reply(`${mess3}\n*Small Win -->* _💎20_`)
             }
             else if ((f1 !== f2) && f1 == f3){
                const deduct2 = await eco.deduct(user, cara, 20);
                      reply(`${mess5}\n\n*Small Lose -->* _💎20_`)
             }
             else if ((f1 !== f2) && f2 == f3){
                const give4 = eco.give(user, cara, 20); 
                      reply(`${mess3}\n\n*Small Win -->* _💎20_`)
             }
             else if (((f1 == f2) && f2 == f3) && f3 == f4){
                const give5 = eco.give(user, cara, 1000);
                     reply(`${mess4}\n\n_🎊 JackPot --> _💎1000_`)
             }
             else { 
                     reply(`Do you understand what you are doing?`)
             }
          }
          else{
                 reply(`*You can only play this game during weekends*\n\n*🌿 Friday*\n*🎏 Saturday*\n*🎐 Sunday*`)
          }
      }
      break;
      */


      case 'slot': case 'spin': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly)
        var today = new Date();
        if (today.getDay() == 6 || today.getDay() == 5 || today.getDay() == 0) {
          if (text == 'help') return reply(`*1:* Use ${prefix}slot to play\n\n*2:* You must have 💎100 in your wallet\n\n*3:* If you don't have money in wallet then withdraw from your bank\n\n*4:* If you don't have money in your bank too then use economy features to gain money`)
          if (text == 'money') return reply(`*1:* Small Win --> +💎20\n\n*2:* Small Lose --> -💎20\n\n*3:* Big Win --> +💎100\n\n*4:* Big Lose --> -💎50\n\n*5:* 🎉 JackPot --> +💎1000`)
          const fruit1 = ["🥥", "🍎", "🍇"]
          const fruit2 = ["🍎", "🍇", "🥥"]
          const fruit3 = ["🍇", "🥥", "🍎"]
          const fruit4 = ["🍇", "🥥", "🍎"]
          const lose = ['*You suck at playing this game*\n\n_--> 🍍-🥥-🍎_', '*Totally out of line*\n\n_--> 🥥-🍎-🍍_', '*Are you a peyx?*\n\n_--> 🍎-🍍-🥥_']
          const smallLose = ['*You cannot harvest coconut 🥥 in a pineapple 🍍 farm*\n\n_--> 🍍>🥥<🍍_', '*Apples and Coconut are not best Combo*\n\n_--> 🍎>🥥<🍎_', '*Coconuts and Apple are not great deal*\n\n_--> 🥥>🍎<🥥_']
          const won = ['*You harvested a basket of*\n\n_--> 🍎+🍎+🍎_', '*Impressive, You must be a specialist in plucking coconuts*\n\n_--> 🥥+🥥+🥥_', '*Amazing, you are going to be making pineapple juice for the family*\n\n_--> 🍍+🍍+🍍_']
          const near = ['*Wow, you were so close to winning pineapples*\n\n_--> 🍎-🍍+🍍_', '*Hmmm, you were so close to winning Apples*\n\n_--> 🍎+🍎-🍍_']
          const jack = ['*🥳 JackPot 🤑*\n\n_--> 🍇×🍇×🍇×🍇_', '*🎉 JaaackPooot!*\n\n_--> 🥥×🥥×🥥×🥥_', '*🎊 You Just hit a jackpot worth 💎1000*']
          const user = m.sender
          const cara = "cara"
          const k = 100
          const balance1 = await eco.balance(user, cara)

          if (k > balance1.wallet) return reply(`You are going to be spinning on your wallet, you need at least 💎100`);
          const f1 = fruit1[Math.floor(Math.random() * fruit1.length)];
          const f2 = fruit2[Math.floor(Math.random() * fruit2.length)];
          const f3 = fruit3[Math.floor(Math.random() * fruit3.length)];
          const f4 = fruit4[Math.floor(Math.random() * fruit4.length)];
          const mess1 = lose[Math.floor(Math.random() * lose.length)];
          const mess2 = won[Math.floor(Math.random() * won.length)];
          const mess3 = near[Math.floor(Math.random() * near.length)];
          const mess4 = jack[Math.floor(Math.random() * jack.length)];
          const mess5 = smallLose[Math.floor(Math.random() * smallLose.length)];

          if ((f1 !== f2) && f2 !== f3) {
            const deduct1 = await eco.deduct(user, cara, 50);
            reply(`${mess1}\n\n*Big Lose -->* _💎50_`)
          }
          else if ((f1 == f2) && f2 == f3) {
            const give1 = await eco.give(user, cara, 100);
            reply(`${mess2}\n*_Big Win -->* _💎100_`)
          }
          else if ((f1 == f2) && f2 !== f3) {
            const give2 = await eco.give(user, cara, 20);
            reply(`${mess3}\n*Small Win -->* _💎20_`)
          }
          else if ((f1 !== f2) && f1 == f3) {
            const deduct2 = await eco.deduct(user, cara, 20);
            reply(`${mess5}\n\n*Small Lose -->* _💎20_`)
          }
          else if ((f1 !== f2) && f2 == f3) {
            const give4 = eco.give(user, cara, 20);
            reply(`${mess3}\n\n*Small Win -->* _💎20_`)
          }
          else if (((f1 == f2) && f2 == f3) && f3 == f4) {
            const give5 = eco.give(user, cara, 1000);
            reply(`${mess4}\n\n_🎊 JackPot --> _💎1000_`)
          }
          else {
            reply(`Do you understand what you are doing?`)
          }
        }
        else {
          reply(`*You can only play this game during weekends*\n\n*🌿 Friday*\n*🎏 Saturday*\n*🎐 Sunday*`)
        }
      }
        break;



      //----------------------------------------------------------------------------------------------------------------------------------------//



      // case 'banchat': case 'bangroup':{
      //   if (isBan) return reply(mess.banned);	 			
      //   if (!isCreator) return reply(mess.botowner)
      //   if (args[0] === "on") {
      //   if (isBanChat) return reply('This Group is Already Banned from using me!')
      //   banchat.push(from)
      //   reply('This Group has been banned from using me!')
      //   var groupe = await A17.groupMetadata(from)
      //   var members = groupe['participants']
      //   var mems = []
      //   members.map(async adm => {
      //   mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
      //   })
      //   A17.sendMessage(from, {text: `\`\`\`「 Notice 」\`\`\`\n\nThis group is banned from using bot. So, here nobody can use me anymore!`, contextInfo: { mentionedJid : mems }}, {quoted:m})
      //   } else if (args[0] === "off") {
      //   if (!isBanChat) return reply('This Group is Already Banned from using me!')
      //   let off = banchat.indexOf(from)
      //   banchat.splice(off, 1)
      //   reply('This Group has been *unbanned* from using me!')
      //   } else {
      //     let buttonsntnsfw = [
      //     { buttonId: `${prefix}bangroup on`, buttonText: { displayText: 'Ban' }, type: 1 },
      //     { buttonId: `${prefix}bangroup off`, buttonText: { displayText: 'Unban' }, type: 1 }
      //     ]
      //     await A17.sendButtonText(m.chat, buttonsntnsfw, `Please choose any Button below.\n\n *On / Off*`, `${global.BotName }`, m)
      //     }
      //     }
      //     break;


      case 'reaction': case 'react': case 'reactions': case 'r':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "❤️", key: m.key } })

        reply(` *━━〈  ⚡ Reactions ⚡  〉━━*\n\nbonk, cry, bully, cuddle, hug, kiss, lick, pat, smug, yeet, blush, smile, wave, highfive, handhold, nom, glomp, bite, slap, kill, happy, wink, poke, dance, cringe`)
        break;


      case 'limituser': case 'userlimit': case 'limit':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        {
          let txt = `「 *All User Limit* 」\n\n`
          for (let i of _limit) {
            txt += ` *User ID :* @${i.id.split("@")[0]}\n➸ *Limit* : ${i.limit}\n`
          }
          reply(txt)
        }
        break;


      case 'film': case 'movie': case 'moviesearch':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        reply(mess.waiting)
        if (!q) return reply(`Please enter a Movie search term...\nExample: ${prefix}movie Spiderman`)
        xfarrapi.Film(q)
          .then(data => {
            console.log(data)
            let krl = `*Search Term:* ${q}\n\n`
            for (let i of data) {
              krl += (`${prefix}----------------------------------------------------------------------------\n\n\n*Movie Name:* ${i.judul}\n *Quality :* ${i.quality}\n *Type : ${i.type}*\n *Uploaded on :* ${i.upload}\n *Source URL :* ${i.link}\n\n\n`)
            }
            A17.sendMessage(from, { image: { url: data[0].thumb }, caption: krl }, { quoted: fdocs })
          });
        break;


      // case 'wallpaper': case 'animewallpaper': case 'animewall': {
      // if (isBan) return reply(mess.banned);	 			
      // if (isBanChat) return reply(mess.bangc);
      // if (!args.join(" ")) return reply("Please enter a term to search!")
      // const { AnimeWallpaper } =require("anime-wallpaper")
      // const wall = new AnimeWallpaper();
      // const pages = [1,2,3,4];
      // const random=pages[Math.floor(Math.random() * pages.length)]
      //         const wallpaper = await wall .getAnimeWall4({ title: q, type: "sfw", page: pages }).catch(() => null);
      //         const i = Math.floor(Math.random() * wallpaper.length);

      // let buttons = [
      //             {buttonId: `${prefix}wallpaper ${args.join(" ")}`, buttonText: {displayText: '>>'}, type: 1}
      //         ]
      //         let buttonMessage = {
      //             image: {url:wallpaper[i].image},
      //             caption: `*Search term:* ${q}`,
      //             footer: `${BotName}`,
      //             buttons: buttons,
      //             headerType: 4
      //         }
      //         A17.sendMessage(m.chat, buttonMessage, { quoted: m })
      //     }
      //     break;


      // case 'wallpaper':
      // case 'animewallpaper':
      // case 'animewall': {
      //   if (isBan) return reply(mess.banned);
      //   if (isBanChat) return reply(mess.bangc);
      //   A17.sendMessage(from, { react: { text: "🥵" , key: m.key }});

      //   if (!args.join(" ")) return reply("Please enter a term to search!");

      //   const { AnimeWallpaper } = require("anime-wallpaper");
      //   const wall = new AnimeWallpaper();
      //   const pages = [1, 2, 3, 4];
      //   const random = pages[Math.floor(Math.random() * pages.length)];
      //   const wallpaper = await wall.getAnimeWall4({ title: q, type: "sfw", page: pages }).catch(() => null);
      //   const i = Math.floor(Math.random() * wallpaper.length);

      //   let message = {
      //     image: { url: wallpaper[i].image },
      //     caption: `*Search term:* ${q}`,
      //     footer: `${BotName}`,
      //     headerType: 4
      //   };

      //   A17.sendMessage(m.chat, message, { quoted: m });
      // }
      // break;


      // case 'wallpaper':
      // case 'animewallpaper':
      // case 'animewall': {
      //   if (isBan) return reply(mess.banned);
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!args.join(" ")) return reply("Please enter a term to search!");

      //   const { AnimeWallpaper } = require("anime-wallpaper");
      //   const wall = new AnimeWallpaper();
      //   const pages = [1, 2, 3, 4];
      //   const random = pages[Math.floor(Math.random() * pages.length)];
      //   const wallpapers = await wall.getAnimeWall4({ title: q, type: "sfw", page: pages }).catch(() => null);

      //   for (let i = 0; i < wallpapers.length; i++) {
      //     let message = {
      //       image: { url: wallpapers[i].image },
      //       caption: `*Search term:* ${q}`,
      //       footer: `${BotName}`,
      //       headerType: 4
      //     };
      //     A17.sendMessage(m.chat, message, { quoted: m });
      //   }
      // }
      // break;


      // case 'wallpaper':
      // case 'animewallpaper':
      // case 'animewall': {
      //   if (isBan) return reply(mess.banned);
      //   if (isBanChat) return reply(mess.bangc);
      //   reply(mess.waiting)
      //   A17.sendMessage(from, { react: { text: "🥵" , key: m.key }});
      //   if (!args.join(" ")) return reply("Please enter a term to search!");

      //   const { AnimeWallpaper } = require("anime-wallpaper");
      //   const wall = new AnimeWallpaper();
      //   const pages = [1, 2, 3, 4];
      //   const random = pages[Math.floor(Math.random() * pages.length)];
      //   const wallpapers = await wall.getAnimeWall4({ title: q, type: "sfw", page: pages }).catch(() => null);

      //   for (let i = 0; i < wallpapers.length; i++) {
      //     let message = {
      //       image: { url: wallpapers[i].image },
      //       footer: `${BotName}`,
      //       headerType: 4
      //     };
      //     A17.sendMessage(m.chat, message, { quoted: m });
      //   }
      // }
      // break;


      case 'wallpaper':
      case 'animewallpaper':
      case 'animewall': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        reply(mess.waiting);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } });
        if (!args.join(" ")) return reply("Please enter a term to search!");

        const { AnimeWallpaper } = require("anime-wallpaper");
        const wall = new AnimeWallpaper();
        const pages = [1, 2, 3, 4];
        const random = pages[Math.floor(Math.random() * pages.length)];
        const wallpapers = await wall.getAnimeWall4({ title: q, type: "sfw", page: pages }).catch(() => null);

        const maxImagesToSend = 15;
        const minImagesToSend = 5;
        const imagesToSend = Math.min(maxImagesToSend, Math.max(minImagesToSend, wallpapers.length));

        for (let i = 0; i < imagesToSend; i++) {
          let message = {
            image: { url: wallpapers[i].image },
            footer: `${BotName}`,
            headerType: 4
          };
          A17.sendMessage(m.chat, message, { quoted: m });
        }
      }
        break;


      case 'wikimedia': case 'wikiimage': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args.join(" ")) return reply("What picture are you looking for??")
        let { wikimedia } = require('./lib/scraper')
        anu = await wikimedia(args)
        hasil = anu[Math.floor(Math.random() * anu.length)]
        let buttons = [
          { buttonId: `${prefix}wikimedia ${args.join(" ")}`, buttonText: { displayText: 'Next Image' }, type: 1 }
        ]
        let buttonMessage = {
          image: { url: hasil.image },
          caption: `Title : ${hasil.title}\nSource : ${hasil.source}\nMedia Url : ${hasil.image}`,
          footer: `${BotName}`,
          buttons: buttons,
          headerType: 4
        }
        A17.sendMessage(m.chat, buttonMessage, { quoted: m })
      }
        break;


      case 'animestory': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        reply(mess.waiting)
        await fetchJson(`https://api.jikan.moe/v4/anime?q=${q}`)
          .then((res) => {
            console.log(res)
            let sections = []
            for (let i of res.data) {
              const list = {
                title: `${i.title}`,
                rows: [
                  {
                    title: `${i.title}\n\n`,
                    rowId: `${prefix}animesearch ${i.mal_id}`,
                    description: `${i.synopsis}`
                  },
                ]
              }
              sections.push(list)
            }
            const sendm = A17.sendMessage(
              from,
              {
                text: "Anime Search",
                footer: BotName,
                title: OwnerName,
                buttonText: "Search Results",
                sections
              }, { quoted: m }
            )
          })
      }
        break;


      case 'chat':
      case 'gpt':
      case 'ai':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        if (!args[0]) {
          return reply(`Please provide a message to chat with the AI chatbot. Example: ${prefix}chat How are you?`);
        }

        const message = encodeURIComponent(args.join(' '));
        const gptapi = `https://api.maher-zubair.tech/ai/chatgpt3?q=${message}`;

        try {
          const response = await axios.get(gptapi);
          const result = response.data.result;
          reply(result);
        } catch (error) {
          console.error('Error fetching AI chatbot response:', error);
          reply('An error occurred while fetching the AI chatbot response. Please try again later.');
        }
        break;



      case 'dalle': case 'imgai': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        const randomEmoji = manyemojis[Math.floor(Math.random() * manyemojis.length)];
        A17.sendMessage(from, { react: { text: randomEmoji, key: m.key } });

        if (!q) return reply(`Please provide a query to generate an image. Example: ${prefix + command} Beautiful landscape`);

        const apiUrl = `https://gurugpt.cyclic.app/dalle?prompt=${encodeURIComponent(q)}`;

        try {
          await A17.sendMessage(m.chat, { image: { url: apiUrl } }, { quoted: m });
        } catch (error) {
          console.error(error);
          reply("An error occurred while generating the image.");
        }
      }
        break;



      case 'grupsetting':
      case 'groupsetting': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        let sections = []
        let com = [`group open`, `leveling on`, `antilinkgc on`, `antilinktg on`, `antilinktt on`, `antilinkytch on`, `antilinkytvid on`, `antilinkig on`, `antilinkfb on`, `antilinktwit on`, `antilinkall on`, `antiwame on`]
        let comm = [`group close`, `leveling off`, `antilinkgc off`, `antilinktg off`, `antilinktt off`, `antilinkytch off`, `antilinkytvid off`, `antilinkig on`, `antilinkfb off`, `antilinktwit off`, `antilinkall off`, `antiwame off`]
        let listnya = [`Group open/close`, `Leveling on/off`, `Antilink Group on/off`, `Antilink Telegram on/off`, `Antilink Tiktok on/off`, `Antilink Youtube Channel on/off`, `Antilink Youtube Video on/off`, `Antilink Instagram on/off`, `Antilink Facebook on/off`, `Antilink Twitter on/off`, `Antilink All on/off`, `Anti Wame on/off`]
        let suruh = [`Enable`, `Disable`]
        let fiturname = [`Group`, `Leveling`, `Auto Sticker`, `Antilink Group`, `Antilink Telegram`, `Antilink Tiktok`, `Antilink Youtube Channel`, `Antilink Youtube Video`, `Antilink Instagram`, `Antilink Facebook`, `Antilink Twitter`, `Antilink All`, `Anti Wame`, `Auto Revoke`]
        let startnum = 0; let startnu = 0; let startn = 0; let start = 0
        let startnumm = 1
        for (let x of com) {
          const yy = {
            title: `${listnya[startnum++]}`,
            rows: [
              {
                title: `${suruh[0]}`,
                description: `Activate ${fiturname[startnu++]}`,
                rowId: `${prefix}${x}`
              }, {
                title: `${suruh[1]}`,
                description: `Deactivate ${fiturname[startn++]}`,
                rowId: `${prefix}${comm[start++]}`
              }
            ]
          }
          sections.push(yy)
        }
        const sendm = A17.sendMessage(
          from,
          {
            text: "Group Settings",
            /* footer: BotName,
            title: "Set your group settings here...",
            buttonText: "Click Button", 
            sections */
          }, { quoted: m }
        )
      }
        break;


      /*
      case 'animesearchxxx': case 'anime':{
          await fetchJson(`https://api.jikan.moe/v4/anime/${q}`)
          .then((res) => {
          let txt = `   _Anime Search Engine_ \n\n*Title:* *${res.data.title}*\n*English:* *${res.data.title_english}*\n*Japanese:* *${res.data.title_japanese}*\n*Anime Type:* *${res.data.type}*\n*Adaptation:* *${res.data.source}*\n*Total Episode:* *${res.data.episodes}*\n*Status:* *${res.data.status}*\n*Ongoing:* *${res.data.airing ? 'Yes' : 'No'}*\n*Aired:* *${res.data.aired.string}*\n*Duration:* *${res.data.duration}*\n*Rating:* *${res.data.rating}*\n*Score:* *${res.data.score}*\n*Rank:* *${res.data.rank}*\n*Main Producer:* *${res.data.producers.name}*\n*Studio:* *${res.data.studios[0].name}* `
          A17.sendMessage(from, { image : { url : res.data.images.jpg.image_url}, caption : txt}, {quoted :m }) 
          })
          }
          break;
      */


      case 'emojimix': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        if (!q) reply(`*Example :* ${prefix + command} 😊+🌹`)
        let [emoji1, emoji2] = q.split`+`
        let kuntuh = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
        for (let res of kuntuh.results) {
          let encmedia = await A17.sendImageAsSticker(from, res.url, m, { packname: global.packname, author: global.author, categories: res.tags })
          await fs.unlinkSync(encmedia)
        }
      }
        break;



      //-----------------------------------------------------------------------------------------------------------------------------------//


      //
      case 'nsfw': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin);
        A17.sendMessage(from, { react: { text: "⚠️", key: m.key } });

        if (args[0] === "on") {
          if (AntiNsfw) return reply('Already activated');
          ntnsfw.push(from);
          reply('Enabled NSFW Commands!');
        } else if (args[0] === "off") {
          if (!AntiNsfw) return reply('Already deactivated');
          let off = ntnsfw.indexOf(from);
          ntnsfw.splice(off, 1);
          reply('Disabled NSFW Commands!');
        } else {
          reply(`NSFW(not safe for work) feature has been enabled in this group, which means anyone here can accesss Adult commands!\n\nPlease use *'${prefix}nsfw on*' to enable NSFW commands or *'${prefix}nsfw off'* to disable them.`);
        }
      }
        break;


      case 'nsfwexit':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!AntiNsfw) return reply(mess.nonsfw);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "⚠️", key: m.key } })

        reply(` *━━〈 ⚠️ NSFW exit ⚠️  〉━━*\n\n gifs, hentaivideo, blowjobgif, hneko, masturbation, thighs, pussy, panties, orgy, ahegao, ass, bdsm, blowjob, cuckold, ero, gasm, cum, femdom, foot, gangbang, glasses, jahy, trap, blowjobgif, spank, hneko, hwaifu, gasm`)
        break;


      //
      case 'ahegao':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/agegao.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'ass':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/ass.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'bdsm':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/bdsm.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'blowjob':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/blowjob.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'cuckold':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/cuckold.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'cum':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/cum.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'eba':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/eba.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'ero':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/ero.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'femdom':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/femdom.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'foot':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/foot.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'gangbang':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/gangbang.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      //
      case 'gifs':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        reply(mess.waiting)
        A17.sendMessage(from, { react: { text: "👀", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/gifs.json'))
        const rand = nsfwdata[Math.floor(Math.random() * nsfwdata.length)]
        const response = await fetchBuffer(rand.url)
        //console.log(response)

        var fetchedgif = await GIFBufferToVideoBuffer(response)

        await A17.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true }, { quoted: m }).catch(err => {
          console.log(err);
        })


      //
      case 'hentaivid': case 'hentaivideo': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        reply(mess.waiting)
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        anu = await hentai()
        result912 = anu[Math.floor(Math.random(), anu.length)]
        A17.sendMessage(m.chat, { video: { url: result912.video_1 }, caption: `Title : ${result912.title}\nCategory : ${result912.category}\n$Mimetype : ${result912.type}\nViews : ${result912.views_count}\nShares : ${result912.share_count}\nSource : ${result912.link}\nMedia Url : ${result912.video_1}` }, { quoted: m })
      }
        break;


      case 'glasses':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/glasses.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'hentai':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/hentai.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'jahy':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/pussy.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'mangansfw':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/manga.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'masturbation':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/masturbation.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'milf':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/milf.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'neko':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/neko.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'neko2':
        if (isBan) return reply(mess.banned)
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw)
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/neko2.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'nsfwloli':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/nsfwloli.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      // case 'orgy':
      //   if (isBan) return reply(mess.banned)	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //   if (!AntiNsfw) return reply(mess.nonsfw)
      //   A17.sendMessage(from, { react: { text: "🥵" , key: m.key }})

      // var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/orgy.json'))
      // var kairesult = pickRandom(nsfwdata)
      // A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
      // break;


      case 'orgy':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);

        // React to the command message with a specific emoji
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } });

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/orgy.json'));
        var numberOfPictures = 3; // Change this value if you want to send a different number of pictures

        // Create a function to get multiple random pictures from the 'nsfwdata' array
        function getRandomPictures(array, count) {
          var shuffled = array.slice();
          var i = array.length;
          var min = i - count;
          var temp;
          var index;

          while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
          }

          return shuffled.slice(min);
        }

        // Get multiple random pictures from 'nsfwdata'
        var selectedPictures = getRandomPictures(nsfwdata, numberOfPictures);

        // Send the selected pictures one by one
        for (let picture of selectedPictures) {
          A17.sendMessage(m.chat, { caption: mess.success, image: { url: picture.url } }, { quoted: m });
        }
        break;


      // case 'panties':
      //   if (isBan) return reply(mess.banned)	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //   if (!AntiNsfw) return reply(mess.nonsfw)
      //   A17.sendMessage(from, { react: { text: "🥵" , key: m.key }})

      // var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/panties.json'))
      // var kairesult = pickRandom(nsfwdata)
      // A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
      // break;


      case 'panties':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);

        // React to the command message with a specific emoji
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } });

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/panties.json'));
        var numberOfPictures = 3; // Change this value if you want to send a different number of pictures

        // Create a function to get multiple random pictures from the 'nsfwdata' array
        function getRandomPictures(array, count) {
          var shuffled = array.slice();
          var i = array.length;
          var min = i - count;
          var temp;
          var index;

          while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
          }

          return shuffled.slice(min);
        }

        // Get multiple random pictures from 'nsfwdata'
        var selectedPictures = getRandomPictures(nsfwdata, numberOfPictures);

        // Send the selected pictures one by one
        for (let picture of selectedPictures) {
          A17.sendMessage(m.chat, { caption: mess.success, image: { url: picture.url } }, { quoted: m });
        }
        break;


      // case 'pussy':
      //   if (isBan) return reply(mess.banned)	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //   if (!AntiNsfw) return reply(mess.nonsfw)
      //   A17.sendMessage(from, { react: { text: "🥵" , key: m.key }})

      // var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/pussy.json'))
      // var kairesult = pickRandom(nsfwdata)
      // A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
      // break;


      case 'pussy':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);

        // React to the command message with a specific emoji
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } });

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/pussy.json'));

        // Create an empty array to store the randomly selected pictures
        var selectedPictures = [];

        // The number of pictures you want to send (in this case, we'll send 3)
        var numberOfPictures = 3;

        // Loop to randomly select 'numberOfPictures' from 'nsfwdata'
        for (let i = 0; i < numberOfPictures; i++) {
          // Pick a random index from 'nsfwdata'
          var randomIndex = Math.floor(Math.random() * nsfwdata.length);
          var kairesult = nsfwdata[randomIndex];

          // Add the selected picture URL to the 'selectedPictures' array
          selectedPictures.push(kairesult.url);

          // Optionally, you can remove the selected picture from 'nsfwdata' to avoid duplication.
          // nsfwdata.splice(randomIndex, 1);
        }

        // Send the selected pictures one by one
        for (let url of selectedPictures) {
          A17.sendMessage(m.chat, { caption: mess.success, image: { url: url } }, { quoted: m });
        }
        break;

      case 'tentacles':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/tentacles.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'thighs':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/thighs.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      //-----------------------------------------------------------------------------------------------------------------------------------//


      case 'getcase':
        if (isBan) return reply(mess.banned);
        if (m.sender != '916297175943@s.whatsapp.net') { return; }

        if (isBanChat) return reply(mess.bangc);

        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        const getCase = (cases) => {
          return "case" + `'${cases}'` + fs.readFileSync("Core.js").toString().split('case \'' + cases + '\'')[1].split("break;")[0] + "break;"
        }
        reply(`${getCase(q)}`)
        break;


      case 'addcase': {

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);


        if (m.sender !== '916297175943@s.whatsapp.net') {
          return reply('You are not authorized to use this command.');
        }

        if (args.length < 2) {
          return reply('Invalid usage! Please provide the case name and its functionality.');
        }

        const caseName = args[0];
        const functionality = args.slice(1).join(' ');

        fs.readFile('./Core.js', 'utf8', (err, data) => {
          if (err) {
            console.error('Error reading Core.js:', err);
            return reply('Failed to add case. Please try again later.');
          }

          const newCase = `
          case '${caseName}': {
            ${functionality}
          }
          break;
          `;

          const insertIndex = data.indexOf('switch (command) {') + 'switch (command) {'.length;

          const newData = data.slice(0, insertIndex) + newCase + data.slice(insertIndex);

          fs.writeFile('./Core.js', newData, 'utf8', (err) => {
            if (err) {
              console.error('Error writing to Core.js:', err);
              reply('Failed to add case. Please try again later.');
            } else {
              reply('New case added successfully!');
            }
          });
        });
      }
        break;


      case 'emoji': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        if (!args.join(" ")) return reply('Where is the emoji?')
        emoji.get(args.join(" ")).then(async (emoji) => {
          let mese = await A17.sendMessage(m.chat, { image: { url: emoji.images[4].url }, caption: `Here it is...` }, { quoted: m })
          await A17.sendMessage(from, { text: "reply -s to this image to make sticker" }, { quoted: mese })
        })
      }
        break;



      case 'deleteall': case 'delall': case 'delete': case 'del': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        if (!m.quoted) return reply('Please mention a message baka!')
        let { chat, fromMe, id } = m.quoted

        const key = {
          remoteJid: m.chat,
          fromMe: false,
          id: m.quoted.id,
          participant: m.quoted.sender
        }

        await A17.sendMessage(m.chat, { delete: key })
      }
        break;



      //-----------------------------------------------------------------------------------------------------------------------------------//



      case 'ghstalk': case 'githubstalk': case 'github': {
        A17.sendMessage(from, { react: { text: "🔍", key: m.key } })

        if (!q) return reply(`Give me a user name like *${prefix}github Kai0071*`)

        gitdata = await githubstalk.githubstalk(`${q}`)
        A17.sendMessage(m.chat, {
          image: { url: gitdata.profile_pic }, caption:
            `*ㅤㅤㅤ|ㅤㅤㅤGithub Info ㅤㅤㅤ|\*

  🚩 Id : ${gitdata.id}
  🔖 Nickname : ${gitdata.nickname}
  🔖 Username : ${gitdata.username}
  ✨ Bio : ${gitdata.bio}
  🏢 Company : ${gitdata.company}
  📍 Location : ${gitdata.location}
  📧 Email : ${gitdata.email}
  🔓 Public Repo : ${gitdata.public_repo}
  🔐 Public Gists : ${gitdata.public_gists}
  💕 Followers : ${gitdata.followers}
  👉 Following : ${gitdata.following}`
        }, { quoted: m })
      }
        break;

      //
      //🚩 Id : ${gitdata.id}
      //✅ Type : ${gitdata.type}
      //🛡 Admin : ${gitdata.admin}
      //❇ Nodeid : ${gitdata.nodeId}
      // 📰 Blog : ${gitdata.blog}
      //  🔗 Url Profile : ${gitdata.profile_pic}
      // 🔗 Url Github : ${gitdata.url}
      // 🔄 Updated At : ${gitdata.updated_at}
      // 🧩 Created At : ${gitdata.ceated_at}


      case 'git':
      case 'gitclone':
      case 'git-clone':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        A17.sendMessage(from, { react: { text: "💫", key: m.key } });

        if (!args[0]) {
          return reply(`Please provide the GitHub repository link.\nExample:\n${prefix}${command} https://github.com/Kai0071/A17`);
        }

        if (!isUrl(args[0]) || !args[0].includes('github.com')) {
          return reply(`Invalid or non-GitHub repository link provided. Please use a valid GitHub repository link.`);
        }

        try {
          let splitURL = args[0].split('github.com/');
          if (splitURL.length < 2) throw Error('Invalid GitHub URL');

          let [githubUser, githubRepo] = splitURL[1].split('/');
          githubRepo = githubRepo.replace('.git', '');

          let gitZipUrl = `https://api.github.com/repos/${githubUser}/${githubRepo}/zipball`;

          await A17.sendMessage(from, { text: `${pushname}, Please wait, downloading...` });


          let zipHeaders = await fetch(gitZipUrl, { method: 'HEAD' }).then(res => res.headers);
          let zipFilename = zipHeaders.get('content-disposition').match(/attachment; filename=(.*)/)[1];

          await A17.sendMessage(m.chat, { document: { url: gitZipUrl }, fileName: zipFilename + '.zip', mimetype: 'application/zip' }, { quoted: m });
        } catch (err) {
          console.error(err);
          return reply(`Failed to fetch the repository contents. Please ensure the GitHub link is correct and accessible. Use the format: 'https://github.com/username/repository'.`);
        }
        break;


      case 'listpc': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        let anu = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v)
        let teks = ` 「  A17's pm user list  」\n\nTotal ${anu.length} users are using A17 in personal chat.`
        for (let i of anu) {
          teks += `\n\nProfile : @${i.id.split('@')[0]}\nChat : ${i.unreadCount}\nLastchat : ${moment(i.conversationTimestamp * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")}`
        }
        A17.sendTextWithMentions(m.chat, teks, m)
      }
        break;


      case 'listgc': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
let getallgrub = await A17.groupFetchAllParticipating();
async function formatGrup(index, grup) {
    let response2 = '-';
    let link_grouplist = '';
try {
response2 = await A17.groupInviteCode(grup.id);
    link_grouplist = `https://chat.whatsapp.com/${response2}`;
} catch{
    link_grouplist = '-'
}
return `╭─「 ${index} 」 *${grup.subject}*
│ Anggota : ${grup.participants.length}
│ ID Grub : ${grup.id}
│ Link    : ${link_grouplist}
╰────────────────────────`;
}
const grupTerurut = Object.values(getallgrub).sort((a, b) => b.participants.length - a.participants.length);
let nomorUrut = 0;
const listGrupString = await Promise.all(grupTerurut.map((grup) => formatGrup(++nomorUrut, grup)));

return reply(`_*Total Group : ${nomorUrut}*_ \n\n`+listGrupString.join('\n\n'));
break;
	  }
	  
	  case 'totalgc':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
    let totalGc = await A17.groupFetchAllParticipating();
    let totalGroups = Object.keys(totalGc).length;

    return reply(`_Total Group : *${totalGroups}*_`);
break;

      case 'speedtest': case 'speedcheck': {
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        m.reply(`Plz Wait ${pushname} Testing Speed... ⚙️`)
        let cp = require('child_process')
        let { promisify } = require('util')
        let exec = promisify(cp.exec).bind(cp)
        let o
        try {
          o = await exec('python speed.py')
        } catch (e) {
          o = e
        } finally {
          let { stdout, stderr } = o
          if (stdout.trim()) m.reply(stdout)
          if (stderr.trim()) m.reply(stderr)
        }
      }
        break;


      case 'speedtest': case 'speedcheck': {
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        m.reply(`Plz Wait ${pushname} Testing Speed... ⚙️`)
        let cp = require('child_process')
        let { promisify } = require('util')
        let exec = promisify(cp.exec).bind(cp)
        let o
        try {
          o = await exec('python speed.py')
        } catch (e) {
          o = e
        } finally {
          let { stdout, stderr } = o
          if (stdout.trim()) m.reply(stdout)
          if (stderr.trim()) m.reply(stderr)
        }
      }
        break;
		//MOD PEYX// SET TEXT PROMO
case 'setpromo': {
    if (isBan) return reply(mess.banned);
    if (isBanChat) return reply(mess.bangc);
    if (!isCreator) return reply(mess.botowner);

    A17.sendMessage(from, { react: { text: "🛡️", key: m.key } });

    if (!args[0]) return reply(`Use ${prefix + command} <text>\nExample: ${prefix + command} Promo Terbaru`);
    const promoText = args.join(" ");
    fs.writeFileSync('./database/promo.json', JSON.stringify({ text: promoText }, null, 2));
    await sleep(500);
    reply(`✅ *Berhasil mengatur teks promo:*\n\n${promoText}`);
    break;
}

// SET TEXT AUTOSCRIPT
case 'setautosc': {
    if (isBan) return reply(mess.banned);
    if (isBanChat) return reply(mess.bangc);
    if (!isCreator) return reply(mess.botowner);

    A17.sendMessage(from, { react: { text: "📜", key: m.key } });

    if (!args[0]) return reply(`Use ${prefix + command} <text>\nExample: ${prefix + command} Autoscript Terbaru`);
    const autoscriptText = args.join(" ");
    fs.writeFileSync('./database/autoscript.json', JSON.stringify({ text: autoscriptText }, null, 2));
    await sleep(500);
    reply(`✅ *Berhasil mengatur teks autoscript:*\n\n${autoscriptText}`);
    break;
}

// SET TEXT JASA RECODE
case 'setppob': {
    if (isBan) return reply(mess.banned);
    if (isBanChat) return reply(mess.bangc);
    if (!isCreator) return reply(mess.botowner);

    A17.sendMessage(from, { react: { text: "🛠️", key: m.key } });

    if (!args[0]) return reply(`Use ${prefix + command} <text>\nExample: ${prefix + command} Top up game PPOB`);
    const recodeText = args.join(" ");
    fs.writeFileSync('./database/recode.json', JSON.stringify({ text: recodeText }, null, 2));
    await sleep(500);
    reply(`✅ *Berhasil mengatur teks jasa recode:*\n\n${recodeText}`);
    break;
}

case 'setvps': {
    if (isBan) return reply(mess.banned);
    if (isBanChat) return reply(mess.bangc);
    if (!isCreator) return reply(mess.botowner);
        A17.sendMessage(from, { react: { text: "📜", key: m.key } });

    if (!args[0]) return reply(`Use ${prefix + command} <text>\nExample: ${prefix + command} VPS Terbaru`);
    const vpsText = args.join(" ");
    fs.writeFileSync('./database/VPs.json', JSON.stringify({ text: vpsText }, null, 2));
    await sleep(500);
    reply(`✅ *Berhasil mengatur teks VPS:*\n\n${vpsText}`);
    break;
}

		
case 'promo': case 'list': case 'produk': {
    if (isBan) return reply(mess.banned);
    if (isBanChat) return reply(mess.bangc);

    try {
        A17.sendMessage(from, { react: { text: "📝", key: m.key } }); // Reaksi awal
        await sleep(1500); // Delay agar terlihat interaktif

        // Fungsi untuk membaca file JSON
        const readJson = (filePath) => {
            try {
                const data = fs.readFileSync(filePath, 'utf8');
                return JSON.parse(data).text || "";
            } catch (err) {
                console.error(`Error membaca file ${filePath}:`, err);
                return ""; // Mengembalikan string kosong jika file error
            }
        };

        // Membaca file JSON
        const promoText = readJson('./database/promo.json');
        const autoscriptText = readJson('./database/autoscript.json');
        const recodeText = readJson('./database/recode.json');
        const vpsText = readJson('./database/VPs.json');

        // Fungsi untuk mengirim pesan dengan format terpisah
        const sendFormattedMessage = async (title, body) => {
            if (body) {
                let message = {
                    text: `📢 ${body}`,
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: true,
                            title: `${nowtime}`,
                            body: title,
                            thumbnail: global.Thumb,
                            sourceUrl: global.website,
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                };
                await A17.sendMessage(from, message);
                await sleep(1500); // Delay antar pesan
            }
        };

        // Kirim pesan Promo jika ada
        await sendFormattedMessage(
            "Promo Terbaru",
            promoText,
            'https://telegra.ph/file/a9398dd23261b48b5b5c2.jpg'
        );

        // Kirim pesan Autoscript jika ada
        await sendFormattedMessage(
            "AUTOSCRIPT TUNNELING",
            autoscriptText,
            'https://telegra.ph/file/d7c3d152d9fff8f85ee62.jpg'
        );
        
       // Kirim pesan Autoscript jika ada
        await sendFormattedMessage(
            "PPOB & TOP UP GAME",
            recodeText,
            'https://telegra.ph/file/d7c3d152d9fff8f85ee62.jpg'
        );

        // Kirim pesan VPS jika ada
        await sendFormattedMessage(
            "VPS",
            vpsText,
            'https://telegra.ph/file/5dcae7a3d0b3c4d3f60c4.jpg'
        );

        // Cek apakah semua file kosong
        if (!promoText && !autoscriptText && !recodeText && !vpsText) {
            return reply(`❌ Semua pesan kosong!\nGunakan perintah:\n- *${prefix}setpromo <text>*\n- *${prefix}setautoscript <text>*${prefix}setppob <text>*\n- *${prefix}setvps <text>*`);
        }

        reply('✅ *Ini adalah List Kami Kaka!*');

    } catch (error) {
        console.error("Error saat membaca file promo/autoscript/recode/vps:", error);
        reply('❌ Terjadi kesalahan saat menampilkan preview pesan. Pastikan format file JSON sudah benar.');
    }
    break;
}
		
		
      case 'addmod': 
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        A17.sendMessage(from, { react: { text: "🛡️", key: m.key } })

        if (!args[0]) return reply(`Use ${prefix + command} number\nExample ${prefix + command} ${OwnerNumber}`)
        bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
        let ceknye = await A17.onWhatsApp(bnnd)
        if (ceknye.length == 0) return reply(`Enter A Valid And Registered Number On WhatsApp!!!`)
        Owner.push(bnnd)
        fs.writeFileSync('./database/mod.json', JSON.stringify(Owner))
        reply(`Number ${bnnd} Has Become An Owner!!!`)
        break;

      case 'delmod': 
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        A17.sendMessage(from, { react: { text: "🛡️", key: m.key } })

        if (!args[0]) return reply(`Use ${prefix + command} nomor\nExample ${prefix + command} 916297175943`)
        ya = q.split("|")[0].replace(/[^0-9]/g, '')
        unp = Owner.indexOf(ya)
        Owner.splice(unp, 1)
        fs.writeFileSync('./database/mod.json', JSON.stringify(Owner))
        reply(`The Numbrr ${ya} Has been deleted from owner list by the owner!!!`)
        break;


      case 'modlist': 
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner);
        A17.sendMessage(from, { react: { text: "🛡️", key: m.key } })

        try {
          const modData = fs.readFileSync('./database/mod.json', 'utf8');
          const mods = JSON.parse(modData);

          if (mods.length === 0) {
            reply('There are no mods in the list.');
          } else {
            let modList = '';

            mods.forEach((mod, index) => {
              modList += `(${index + 1}) ${A17.getName(mod)}\n`;
            });
			await sleep(2000);
            reply(`List of List of Moderators:\n\n${modList}`);
          }
        } catch (error) {
          console.error(error);
          reply('Failed to fetch mod list.');
        }
        break;

      case 'setprefix': 
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        A17.sendMessage(from, { react: { text: "🛡️", key: m.key } })

        if (args.length !== 1) {
          return m.reply(`Please provide a single character as the new prefix.`);
        } else {
          const newPrefix = args[0];
          try {
            global.prefa = process.env.PREFIX ? process.env.PREFIX.split(".") : [newPrefix];
            return m.reply(`${pushname} Successfully changed Prefix to "${newPrefix}"`);
          } catch (error) {
            console.error('Error changing prefix:', error);
            return m.reply(`An error occurred while changing the prefix. Please try again later.`);
          }
        }
		  break;
		//MENU SHOW AKUN
case 'cekexp': {
    if (!isCreator) return reply(mess.botowner)
    try {
        await A17.sendMessage(from, { react: { text: "🫡", key: m.key } });
        m.reply(`Plz Wait ${pushname}, Show All Akun EXP Today... ⚙️`);

        const cp = require('child_process');
        const { promisify } = require('util');
        const exec = promisify(cp.exec).bind(cp);

        const { stdout, stderr } = await exec('xp-wa');
        if (stdout.trim()) m.reply(stdout);
        if (stderr.trim()) m.reply(stderr);
    } catch (err) {
        console.error('Error checking service status:', err);
        reply('Oops, terjadi kesalahan saat memeriksa akun expired.');
    }
    break;
}

case 'cekservice': {
    if (!isCreator) return reply(mess.botowner)
    try {
        await A17.sendMessage(from, { react: { text: "🫡", key: m.key } });
        m.reply(`Plz Wait ${pushname}, Show All Status Service... ⚙️`);

        const cp = require('child_process');
        const { promisify } = require('util');
        const exec = promisify(cp.exec).bind(cp);

        const { stdout, stderr } = await exec('run-wa');
        if (stdout.trim()) m.reply(stdout);
        if (stderr.trim()) m.reply(stderr);
    } catch (err) {
        console.error('Error checking service status:', err);
        reply('Oops, terjadi kesalahan saat memeriksa status service.');
    }
    break;
}

case 'memberssh': {
    if (!isCreator) return reply(mess.botowner)
    try {
        await A17.sendMessage(from, { react: { text: "🫡", key: m.key } });
        m.reply(`Plz Wait ${pushname}, Show All Member SSH... ⚙️`);

        const cp = require('child_process');
        const { promisify } = require('util');
        const exec = promisify(cp.exec).bind(cp);

        const { stdout, stderr } = await exec('member-ssh-wa');
        if (stdout.trim()) m.reply(stdout);
        if (stderr.trim()) m.reply(stderr);
    } catch (err) {
        console.error('Error showing SSH members:', err);
        reply('Oops, terjadi kesalahan saat menampilkan member SSH.');
    }
    break;
}

      case 'memberxray': {
		if (!isCreator) return reply(mess.botowner)
        await A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        m.reply(`Plz Wait ${pushname} Show All Member Xray... ⚙️`)
        let cp = require('child_process')
        let { promisify } = require('util')
        let exec = promisify(cp.exec).bind(cp)
        let o
        try {
          o = await exec('member-vme-wa')
        } catch (e) {
          o = e
        } finally {
          let { stdout, stderr } = o
          if (stdout.trim()) m.reply(stdout)
          if (stderr.trim()) m.reply(stderr)
        }
      }
        break;


case 'loginssh': {

    if (!isCreator) return reply(mess.botowner)

    try {
        await A17.sendMessage(from, { react: { text: "🫡", key: m.key } });
        m.reply(`Plz Wait ${pushname}, Show All Member SSH... ⚙️`);

        const cp = require('child_process');
        const { promisify } = require('util');
        const exec = promisify(cp.exec).bind(cp);

        const { stdout, stderr } = await exec('ceklim-wa');
        if (stdout.trim()) m.reply(stdout);
        if (stderr.trim()) m.reply(stderr);
    } catch (err) {
        console.error('Error showing SSH members:', err);
        reply('Oops, terjadi kesalahan saat menampilkan member SSH.');
    }
    break;
}

case 'loginxray': {
    if (!isCreator) return reply(mess.botowner)
    try {
        await A17.sendMessage(from, { react: { text: "🫡", key: m.key } });
        m.reply(`Plz Wait ${pushname}, Show All Member XRAY... ⚙️`);

        const cp = require('child_process');
        const { promisify } = require('util');
        const exec = promisify(cp.exec).bind(cp);

        const { stdout, stderr } = await exec('cek-vme-wa');
        if (stdout.trim()) m.reply(stdout);
        if (stderr.trim()) m.reply(stderr);
    } catch (err) {
        console.error('Error showing SSH members:', err);
        reply('Oops, terjadi kesalahan saat menampilkan member SSH.');
    }
    break;
}

case 'addssh': {
    if (!isCreator) return reply(mess.botowner);
    if (!args.join("")) return reply(`MOHON INPUT *NAMA.PASSWORD.LIMITIP.MASAAKTIF*`);
    
    // Parsing input menjadi array berdasarkan delimiter '.'
    const swn = args.join(" ");
    const [pcknm, pckpw, pckip, pckex] = swn.split(".");

    // Validasi jika salah satu input kosong
    if (!pcknm || !pckpw || !pckip || !pckex) {
        return reply(`Mohon pastikan semua data terisi dengan format: *NAMA.PASSWORD.LIMITIP.MASAAKTIF*.

Contoh: *john.doe.2.30*`);
    }

    // Memberikan respon awal kepada pengguna
    A17.sendMessage(from, { react: { text: "🫡", key: m.key } });
    m.reply(`Mohon tunggu ${pushname}, sedang membuat akun SSH... ⚙️`);

    let cp = require('child_process');
    let { promisify } = require('util');
    let exec = promisify(cp.exec).bind(cp);
    let o;

    try {
        // Mengalihkan stderr ke stdout agar warning tidak menjadi output tersendiri
        o = await exec(`printf "%s\n" "${pcknm}" "${pckpw}" "${pckip}" "${pckex}" | add-ssh-wa 2>&1`);
    } catch (e) {
        o = e;
    } finally {
        let { stdout, stderr } = o;
        // Membersihkan output dari pesan warning jika ada
        let cleanOutput = stdout.replace(/.*WARNING:.*/g, '').trim();
        
        // Mengirimkan output utama ke pengguna jika tersedia
        if (cleanOutput) {
            m.reply(cleanOutput);
        } 
    }
}
break;


      case 'delssh': {
		if (!isCreator) return reply(mess.botowner)
        if (!args.join("")) return reply(`MOHON INPUT *NAMA AKUN*`)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        m.reply(`Plz Wait ${pushname} Delete Account... ⚙️`)
        let cp = require('child_process')
        let { promisify } = require('util')
        let exec = promisify(cp.exec).bind(cp)
        let o
        const swn = args.join(" ")
        const pcknm = swn.split(".")[0];
        try {
          o = await exec(`printf "%s\n" "${pcknm}" | del-ssh-wa`)
        } catch (e) {
          o = e
        } finally {
          let { stdout, stderr } = o
          if (stdout.trim()) m.reply(stdout)
          if (stderr.trim()) m.reply(stderr)
        }
      }
        break;
		
case 'renewssh': 
case 'renewakun': {
    if (!isCreator) return reply(mess.botowner)
    if (!args.join("")) return reply(`MOHON INPUT *NAMA.MASA AKTIF*`);

    // Parsing input menjadi array berdasarkan delimiter '.'
    const swn = args.join(" ");
    const [pcknm, pckex] = swn.split(".");

    // Validasi jika salah satu input kosong
    if (!pcknm || !pckex) {
        return reply(`Mohon pastikan semua data terisi dengan format: *NAMA.MASA AKTIF*.\n\nContoh: *john.30*`);
    }

    // Memproses data jika validasi terpenuhi
    A17.sendMessage(from, { react: { text: "🫡", key: m.key } });
    m.reply(`Mohon tunggu ${pushname}, sedang memperbarui akun SSH... ⚙️`);

    let cp = require('child_process');
    let { promisify } = require('util');
    let exec = promisify(cp.exec).bind(cp);
    let o;

    try {
        o = await exec(`printf "%s\n" "${pcknm}" "${pckex}" | renew-ssh-wa`);
    } catch (e) {
        o = e;
    } finally {
        let { stdout, stderr } = o;
        if (stdout.trim()) m.reply(stdout);
        if (stderr.trim()) m.reply(stderr);
    }
}
break;
		
      case 'cekssh': {
		if (!isCreator) return reply(mess.botowner)
        if (!args.join("")) return reply(`MOHON INPUT *NAMA*\n\nContoh:\n/cektrojan jhon`)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        m.reply(`Plz Wait ${pushname} Cek Detail Account... ⚙️`)
        let cp = require('child_process')
        let { promisify } = require('util')
        let exec = promisify(cp.exec).bind(cp)
        let o
        const swn = args.join(" ")
        const pcknm = swn.split(".")[0];
        try {
          o = await exec(`printf "%s\n" "${pcknm}" | user-ssh-wa`)
        } catch (e) {
          o = e
        } finally {
          let { stdout, stderr } = o
          if (stdout.trim()) m.reply(stdout)
          if (stderr.trim()) m.reply(stderr)
        }
      }
        break;
				
      case 'trialssh': case 'trialakun': {
        if (!args.join("")) return reply(`MOHON INPUT *MENIT*`)
		A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        m.reply(`Plz Wait ${pushname} Create Account Trial... ⚙️`)
        let cp = require('child_process')
        let { promisify } = require('util')
        let exec = promisify(cp.exec).bind(cp)
        let o
        const swn = args.join(" ")
        const pckex = swn.split(".")[0];
        try {
          o = await exec(`printf "%s\n" "${pckex}" | trial-ssh-wa`)
        } catch (e) {
          o = e
        } finally {
          let { stdout, stderr } = o
          if (stdout.trim()) m.reply(stdout)
          if (stderr.trim()) m.reply(stderr)
        }
      }
        break;
		//ADD XRAY
case 'addvmess': {
    if (!isCreator) return reply(mess.botowner);
    if (!args.join("")) return reply(`MOHON INPUT *NAMA.LIMITBW.LIMITIP.MASAAKTIF*`);
    
    const swn = args.join(" ");
    const [pcknm, pckpw, pckip, pckex] = swn.split(".");

    if (!pcknm || !pckpw || !pckip || !pckex) {
        return reply(`Mohon pastikan semua data terisi dengan format: *NAMA.LIMITBW.LIMITIP.MASAAKTIF*.

Contoh: *john.50.2.30*`);
    }

    A17.sendMessage(from, { react: { text: "🫡", key: m.key } });
    m.reply(`Mohon tunggu ${pushname}, sedang membuat akun Vmess... ⚙️`);

    let cp = require('child_process');
    let { promisify } = require('util');
    let exec = promisify(cp.exec).bind(cp);
    let o;

    try {
        o = await exec(`printf "%s\n" "${pcknm}" "${pckpw}" "${pckip}" "${pckex}" | add-vme-wa 2>&1`);
    } catch (e) {
        o = e;
    } finally {
        let { stdout, stderr } = o;
        let cleanOutput = stdout.replace(/.*WARNING:.*/g, '').trim();
        if (cleanOutput) {
            m.reply(cleanOutput);
        } 
    }
}
break;

case 'addvless': {
    if (!isCreator) return reply(mess.botowner);
    if (!args.join("")) return reply(`MOHON INPUT *NAMA.LIMITBW.LIMITIP.MASAAKTIF*`);
    
    const swn = args.join(" ");
    const [pcknm, pckpw, pckip, pckex] = swn.split(".");

    if (!pcknm || !pckpw || !pckip || !pckex) {
        return reply(`Mohon pastikan semua data terisi dengan format: *NAMA.LIMITBW.LIMITIP.MASAAKTIF*.

Contoh: *john.50.2.30*`);
    }

    A17.sendMessage(from, { react: { text: "🫡", key: m.key } });
    m.reply(`Mohon tunggu ${pushname}, sedang membuat akun Vless... ⚙️`);

    let cp = require('child_process');
    let { promisify } = require('util');
    let exec = promisify(cp.exec).bind(cp);
    let o;

    try {
        o = await exec(`printf "%s\n" "${pcknm}" "${pckpw}" "${pckip}" "${pckex}" | add-vle-wa 2>&1`);
    } catch (e) {
        o = e;
    } finally {
        let { stdout, stderr } = o;
        let cleanOutput = stdout.replace(/.*WARNING:.*/g, '').trim();
        if (cleanOutput) {
            m.reply(cleanOutput);
        } 
    }
}
break;

case 'addtrojan': {
    if (!isCreator) return reply(mess.botowner);
    if (!args.join("")) return reply(`MOHON INPUT *NAMA.LIMITBW.LIMITIP.MASAAKTIF*`);
    
    const swn = args.join(" ");
    const [pcknm, pckpw, pckip, pckex] = swn.split(".");

    if (!pcknm || !pckpw || !pckip || !pckex) {
        return reply(`Mohon pastikan semua data terisi dengan format: *NAMA.LIMITBW.LIMITIP.MASAAKTIF*.

Contoh: *john.50.2.30*`);
    }

    A17.sendMessage(from, { react: { text: "🫡", key: m.key } });
    m.reply(`Mohon tunggu ${pushname}, sedang membuat akun Trojan... ⚙️`);

    let cp = require('child_process');
    let { promisify } = require('util');
    let exec = promisify(cp.exec).bind(cp);
    let o;

    try {
        o = await exec(`printf "%s\n" "${pcknm}" "${pckpw}" "${pckip}" "${pckex}" | add-tro-wa 2>&1`);
    } catch (e) {
        o = e;
    } finally {
        let { stdout, stderr } = o;
        let cleanOutput = stdout.replace(/.*WARNING:.*/g, '').trim();
        if (cleanOutput) {
            m.reply(cleanOutput);
        } 
    }
}
break;
		
		//RENEW XRAY		
case 'renewvmess': {
    if (!isCreator) return reply(mess.botowner)
    if (!args.join("")) return reply(`MOHON INPUT *NAMA.LIMITBW.LIMITIP.MASAAKTIF*`);

    const swn = args.join(" ");
    const [pcknm, pckpw, pckip, pckex] = swn.split(".");

    // Validasi input
    if (!pcknm || !pckpw || !pckip || !pckex) {
        return reply(`Mohon pastikan semua data terisi dengan format: *NAMA.LIMITBW.LIMITIP.MASAAKTIF*.\n\nContoh: *john.50.2.30*`);
    }

    A17.sendMessage(from, { react: { text: "🫡", key: m.key } });
    m.reply(`Mohon tunggu ${pushname}, sedang memperbarui akun Vmess... ⚙️`);

    let cp = require('child_process');
    let { promisify } = require('util');
    let exec = promisify(cp.exec).bind(cp);
    let o;

    try {
        o = await exec(`printf "%s\n" "${pcknm}" "${pckpw}" "${pckip}" "${pckex}" | renew-vme-wa`);
    } catch (e) {
        o = e;
    } finally {
        let { stdout, stderr } = o;
        if (stdout.trim()) m.reply(stdout);
        if (stderr.trim()) m.reply(stderr);
    }
}
break;

case 'renewvless': {
    if (!isCreator) return reply(mess.botowner)
    if (!args.join("")) return reply(`MOHON INPUT *NAMA.LIMITBW.LIMITIP.MASAAKTIF*`);

    const swn = args.join(" ");
    const [pcknm, pckpw, pckip, pckex] = swn.split(".");

    // Validasi input
    if (!pcknm || !pckpw || !pckip || !pckex) {
        return reply(`Mohon pastikan semua data terisi dengan format: *NAMA.LIMITBW.LIMITIP.MASAAKTIF*.\n\nContoh: *john.50.2.30*`);
    }

    A17.sendMessage(from, { react: { text: "🫡", key: m.key } });
    m.reply(`Mohon tunggu ${pushname}, sedang memperbarui akun Vless... ⚙️`);

    let cp = require('child_process');
    let { promisify } = require('util');
    let exec = promisify(cp.exec).bind(cp);
    let o;

    try {
        o = await exec(`printf "%s\n" "${pcknm}" "${pckpw}" "${pckip}" "${pckex}" | renew-vle-wa`);
    } catch (e) {
        o = e;
    } finally {
        let { stdout, stderr } = o;
        if (stdout.trim()) m.reply(stdout);
        if (stderr.trim()) m.reply(stderr);
    }
}
break;

case 'renewtrojan': {
    if (!isCreator) return reply(mess.botowner)
    if (!args.join("")) return reply(`MOHON INPUT *NAMA.LIMITBW.LIMITIP.MASAAKTIF*`);

    const swn = args.join(" ");
    const [pcknm, pckpw, pckip, pckex] = swn.split(".");

    // Validasi input
    if (!pcknm || !pckpw || !pckip || !pckex) {
        return reply(`Mohon pastikan semua data terisi dengan format: *NAMA.LIMITBW.LIMITIP.MASAAKTIF*.\n\nContoh: *john.50.2.30*`);
    }

    A17.sendMessage(from, { react: { text: "🫡", key: m.key } });
    m.reply(`Mohon tunggu ${pushname}, sedang memperbarui akun Trojan... ⚙️`);

    let cp = require('child_process');
    let { promisify } = require('util');
    let exec = promisify(cp.exec).bind(cp);
    let o;

    try {
        o = await exec(`printf "%s\n" "${pcknm}" "${pckpw}" "${pckip}" "${pckex}" | renew-tro-wa`);
    } catch (e) {
        o = e;
    } finally {
        let { stdout, stderr } = o;
        if (stdout.trim()) m.reply(stdout);
        if (stderr.trim()) m.reply(stderr);
    }
}
break;

			//TRIAL XRAY
      case 'trialvmess': {
        if (!args.join("")) return reply(`MOHON INPUT *MENIT*`)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        m.reply(`Plz Wait ${pushname} Create Account Trial Vmess... ⚙️`)
        let cp = require('child_process')
        let { promisify } = require('util')
        let exec = promisify(cp.exec).bind(cp)
        let o
        const swn = args.join(" ")
        const pcknm = swn.split(".")[0];
        try {
          o = await exec(`printf "%s\n" "${pcknm}" | trial-vme-wa`)
        } catch (e) {
          o = e
        } finally {
          let { stdout, stderr } = o
          if (stdout.trim()) m.reply(stdout)
          if (stderr.trim()) m.reply(stderr)
        }
      }
        break;

	  case 'trialvless': {
        if (!args.join("")) return reply(`MOHON INPUT *MENIT*`)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        m.reply(`Plz Wait ${pushname} Create Account Trial Vless... ⚙️`)
        let cp = require('child_process')
        let { promisify } = require('util')
        let exec = promisify(cp.exec).bind(cp)
        let o
        const swn = args.join(" ")
        const pcknm = swn.split(".")[0];
        try {
          o = await exec(`printf "%s\n" "${pcknm}" | trial-vle-wa`)
        } catch (e) {
          o = e
        } finally {
          let { stdout, stderr } = o
          if (stdout.trim()) m.reply(stdout)
          if (stderr.trim()) m.reply(stderr)
        }
      }
        break;
		
	  case 'trialtrojan': {
        if (!args.join("")) return reply(`MOHON INPUT *MENIT*`)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        m.reply(`Plz Wait ${pushname} Create Account Trial Trojan... ⚙️`)
        let cp = require('child_process')
        let { promisify } = require('util')
        let exec = promisify(cp.exec).bind(cp)
        let o
        const swn = args.join(" ")
        const pcknm = swn.split(".")[0];
        try {
          o = await exec(`printf "%s\n" "${pcknm}" | trial-tro-wa`)
        } catch (e) {
          o = e
        } finally {
          let { stdout, stderr } = o
          if (stdout.trim()) m.reply(stdout)
          if (stderr.trim()) m.reply(stderr)
        }
      }
        break;
		
		//DELETE XRAY
      case 'delvmess': {
        if (!isCreator) return reply(mess.botowner)
        if (!args.join("")) return reply(`MOHON INPUT *NAMA*\n\nContoh:\n/cektrojan jhon`)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        m.reply(`Plz Wait ${pushname} Delete Account Vmess... ⚙️`)
        let cp = require('child_process')
        let { promisify } = require('util')
        let exec = promisify(cp.exec).bind(cp)
        let o
        const swn = args.join(" ")
        const pcknm = swn.split(".")[0];
        try {
          o = await exec(`printf "%s\n" "${pcknm}" | del-vme-wa`)
        } catch (e) {
          o = e
        } finally {
          let { stdout, stderr } = o
          if (stdout.trim()) m.reply(stdout)
          if (stderr.trim()) m.reply(stderr)
        }
      }
        break;
		
      case 'delvless': {
        if (!isCreator) return reply(mess.botowner)
        if (!args.join("")) return reply(`MOHON INPUT *NAMA*\n\nContoh:\n/cektrojan jhon`)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        m.reply(`Plz Wait ${pushname} Delete Account Vless... ⚙️`)
        let cp = require('child_process')
        let { promisify } = require('util')
        let exec = promisify(cp.exec).bind(cp)
        let o
        const swn = args.join(" ")
        const pcknm = swn.split(".")[0];
        try {
          o = await exec(`printf "%s\n" "${pcknm}" | del-vle-wa`)
        } catch (e) {
          o = e
        } finally {
          let { stdout, stderr } = o
          if (stdout.trim()) m.reply(stdout)
          if (stderr.trim()) m.reply(stderr)
        }
      }
        break;
		
      case 'deltrojan': {
        if (!isCreator) return reply(mess.botowner)
        if (!args.join("")) return reply(`MOHON INPUT *NAMA*\n\nContoh:\n/cektrojan jhon`)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        m.reply(`Plz Wait ${pushname} Delete Account Trojan... ⚙️`)
        let cp = require('child_process')
        let { promisify } = require('util')
        let exec = promisify(cp.exec).bind(cp)
        let o
        const swn = args.join(" ")
        const pcknm = swn.split(".")[0];
        try {
          o = await exec(`printf "%s\n" "${pcknm}" | del-tro-wa`)
        } catch (e) {
          o = e
        } finally {
          let { stdout, stderr } = o
          if (stdout.trim()) m.reply(stdout)
          if (stderr.trim()) m.reply(stderr)
        }
      }
        break;
		
		//CEK DETAIL XRAY
      case 'cekvmess': {
        if (!isCreator) return reply(mess.botowner)
        if (!args.join("")) return reply(`MOHON INPUT *NAMA*\n\nContoh:\n/cektrojan jhon`)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        m.reply(`Plz Wait ${pushname} Detail Account Vmess... ⚙️`)
        let cp = require('child_process')
        let { promisify } = require('util')
        let exec = promisify(cp.exec).bind(cp)
        let o
        const swn = args.join(" ")
        const pcknm = swn.split(".")[0];
        try {
          o = await exec(`printf "%s\n" "${pcknm}" | user-vme-wa`)
        } catch (e) {
          o = e
        } finally {
          let { stdout, stderr } = o
          if (stdout.trim()) m.reply(stdout)
          if (stderr.trim()) m.reply(stderr)
        }
      }
        break;
		
      case 'cekvless': {
        if (!isCreator) return reply(mess.botowner)
        if (!args.join("")) return reply(`MOHON INPUT *NAMA*\n\nContoh:\n/cektrojan jhon`)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        m.reply(`Plz Wait ${pushname} Detail Account Vless... ⚙️`)
        let cp = require('child_process')
        let { promisify } = require('util')
        let exec = promisify(cp.exec).bind(cp)
        let o
        const swn = args.join(" ")
        const pcknm = swn.split(".")[0];
        try {
          o = await exec(`printf "%s\n" "${pcknm}" | user-vle-wa`)
        } catch (e) {
          o = e
        } finally {
          let { stdout, stderr } = o
          if (stdout.trim()) m.reply(stdout)
          if (stderr.trim()) m.reply(stderr)
        }
      }
        break;
		
      case 'cektrojan': {
        if (!isCreator) return reply(mess.botowner)
		if (!args.join("")) return reply(`MOHON INPUT *NAMA*\n\nContoh:\n/cektrojan jhon`)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        m.reply(`Plz Wait ${pushname} Detail Account Trojan... ⚙️`)
        let cp = require('child_process')
        let { promisify } = require('util')
        let exec = promisify(cp.exec).bind(cp)
        let o
        const swn = args.join(" ")
        const pcknm = swn.split(".")[0];
        try {
          o = await exec(`printf "%s\n" "${pcknm}" | user-tro-wa`)
        } catch (e) {
          o = e
        } finally {
          let { stdout, stderr } = o
          if (stdout.trim()) m.reply(stdout)
          if (stderr.trim()) m.reply(stderr)
        }
      }
        break;
		
		//MENU Panel server
      case 'menuserver': case 'panelserver': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        try {
          await A17.sendMessage(from, { react: { text: "✨", key: m.key } });


          const helpexitText = `\nHello ${pushname} Dear...!! ${nowtime} ,
          
          
             ⌯  Date : ${kaidate}
          
          
            〢━ 〄 Bot Info 〄 ━〢
          
   ⌯  My prefix is :  ${prefix}
   ⌯  Bot usr name : ${pushname} 
   ⌯  Owner name : ${global.OwnerName} 
   ⌯  Runtime : ${runtime(process.uptime())} 
   ⌯  RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
   ⌯  Total CPU Usage: ${totalCpuUsage}%
   ⌯  Platform : Linux

╭─❏  *MENU SERVER*
│
│ ▧  ${prefix}addssh
│ ▧  ${prefix}addvmess
│ ▧  ${prefix}addvless
│ ▧  ${prefix}addtrojan
│ ▧  ${prefix}trialssh
│ ▧  ${prefix}trialvmess
│ ▧  ${prefix}trialvless
│ ▧  ${prefix}trialtrojan
│ 
├─❏  *MENU DELETE*
│ 
│ ▧  ${prefix}delssh
│ ▧  ${prefix}delvmess
│ ▧  ${prefix}delvless
│ ▧  ${prefix}deltrojan
│
├─❏  *MENU RENEW*
│ 
│ ▧  ${prefix}renewssh
│ ▧  ${prefix}renewvmess
│ ▧  ${prefix}renewvless
│ ▧  ${prefix}renewtrojan
│
├─❏  *AKUN DETAIL*
│ 
│ ▧  ${prefix}cekssh
│ ▧  ${prefix}cekvmess
│ ▧  ${prefix}cekvless
│ ▧  ${prefix}cektrojan
│
├─❏  *OTHER MENU*
│ 
│ ▧  ${prefix}memberssh
│ ▧  ${prefix}memberxray
│ ▧  ${prefix}loginssh
│ ▧  ${prefix}loginxray
│ ▧  ${prefix}cekservice
│ ▧  ${prefix}cekexp
│
└──────────────❏

©2025 PX STORE`;

A17.sendMessage(m.chat, {
            text: helpexitText,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: BotName,
                    body: `Follow Saluran Kami`,
                    thumbnailUrl: 'https://telegra.ph/file/d39104297903c204c2311.jpg',
                    sourceUrl: global.website,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (err) {
        console.error('Error sending help menu:', err);
        reply('Oops, terjadi kesalahan saat mengirim menu bantuan.');
    }
    break;
}
          

		
      case 'status': case 'post': {
        if (!isCreator) return reply(mess.owner)
        if (!quoted) return reply(`Send/reply Image With Caption ${prefix}status`)
        if (/video/.test(mime)) {
          if ((quoted.msg || quoted).seconds > 30) return reply('Maximum 30 seconds video is allowed!')
        }
        const messageType = Object.keys(m.message)[0]
        if (messageType === 'imageMessage') {
          const media = await downloadMediaMessage(m, 'media', {}, { logger, reuploadRequest: sock.updateMediaMessage })
          await writeFile('./image.jpeg', media)
          await A17.sendMessage(botNumber, 'status@broadcast', { url: './image.jpeg', media }).catch((err) => fs.unlinkSync(media))
          reply(`*✨ ${pushname}...!! Posted On My Status ✨*`);
        }
        else if (messageType === 'videoMessage') {
          const media = await downloadMediaMessage(m, 'media', {}, { logger, reuploadRequest: sock.updateMediaMessage })
          await writeFile('./video.mp4', media)
          await A17.sendMessage(botNumber, 'status@broadcast', { url: 'video.mp4', media }).catch((err) => fs.unlinkSync(media))
          reply(`*✨ ${pushname}...!! Posted On My Status ✨*`);
        }
        else {
          reply(`an error occurred`)
        }

      }
        break;



      //-----------------------------------------------------------------------------------------------------------------------------------//


      case 'afk': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        let user = global.db.users[m.sender]
        user.afkTime = + new Date
        user.afkReason = args.join(" ")
        reply(`${m.pushName} is now Away From Keyboard.\nAFK Reason : ${args.join(" ") ? args.join(" ") : ''}`)
      }
        break;


      case 'fliptext': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (args.length < 1) return reply(`Example:\n${prefix}fliptext ${OwnerName}`)
        quere = args.join(" ")
        flipe = quere.split('').reverse().join('')
        reply(`\`\`\`「  Text Flipper Tool  」\`\`\`\n*Input text :*\n${quere}\n*Fliped text :*\n${flipe}`)
      }
        break;


      case 'toletter': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!Number(args[0])) return reply(`Example:\n${prefix}toletter 956`)
        try {
          quere = args.join(" ")
          convertes = await toHur(quere)
          reply(`\`\`\`「  Word Maker Tool  」\`\`\`\n*Input Number :*\n${quere}\n*Converted Alphabet :*\n${convertes}`)
        } catch {
          reply(`Error!`)
        }
      }



      case 'leveling':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args.length < 1) return reply('Type on to *Enable*\nType off to *Disable*')
        if (args[0] === 'on') {
          if (isLeveling) return reply(`Already activated`)
          _leveling.push(from)
          fs.writeFileSync('./database/leveling.json', JSON.stringify(_leveling))
          reply('Leveling activated')
        } else if (args[0] === 'off') {
          let anu = _leveling.indexOf(from)
          _leveling.splice(anu, 1)
          fs.writeFileSync('./database/leveling.json', JSON.stringify(_leveling))
          reply('Leveling deactivated')
        }
        break;


      //-----------------------------------------------------------------------------------------------------------------------------------//


      //
      case 'antilinkgc': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLink) return reply('Already activated')
          ntilink.push(from)
          reply('Activated _Antilink_ in this group.')
          var groupe = await A17.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          A17.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLink) return reply('Already deactivated!')
          let off = ntilink.indexOf(from)
          ntilink.splice(off, 1)
          reply('Deactivated _Antilink_ in this group!')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinkgc on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinkgc off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await A17.sendButtonText(m.chat, buttonsntilink, `Please click the button below On / Off`, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinkyoutubevideo': case 'antilinkyoutubevid': case 'antilinkytvid': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkYoutubeVid) return reply('Already activated')
          ntilinkytvid.push(from)
          reply('Activated youtube video antilink !')
          var groupe = await A17.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          A17.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkYoutubeVid) return reply('Already deactivated')
          let off = ntilinkytvid.indexOf(from)
          ntilinkytvid.splice(off, 1)
          reply('Deactivated youtube video antilink !')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinkyoutubevideo on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinkyoutubevideo off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await A17.sendButtonText(m.chat, buttonsntilink, `Please click the button below On / Off`, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinkyoutubech': case 'antilinkyoutubechannel': case 'antilinkytch': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkYoutubeChannel) return reply('Already activated')
          ntilinkytch.push(from)
          reply('Activated youtube channel antilink !')
          var groupe = await A17.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          A17.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkYoutubeChannel) return reply('Already deactivated')
          let off = ntilinkytch.indexOf(from)
          ntilinkytch.splice(off, 1)
          reply('Deactivated youtube channel antilink !')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinkyoutubech on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinkyoutubech off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await A17.sendButtonText(m.chat, buttonsntilink, `Please click the button below On / Off`, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinkinstagram': case 'antilinkig': case 'antilinkinsta': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkInstagram) return reply('Already activated')
          ntilinkig.push(from)
          reply('Activated instagram antilink !')
          var groupe = await A17.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          A17.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkInstagram) return reply('Already deactivated')
          let off = ntilinkig.indexOf(from)
          ntilinkig.splice(off, 1)
          reply('Deactivated instagram antilink !')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinkinstagram on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinkinstagram off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await A17.sendButtonText(m.chat, buttonsntilink, `Please click the button below On / Off`, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinkfacebook': case 'antilinkfb': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkFacebook) return reply('Already activated')
          ntilinkfb.push(from)
          reply('Activated facebook antilink !')
          var groupe = await A17.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          A17.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkFacebook) return reply('Already deactivated')
          let off = ntilinkfb.indexOf(from)
          ntilinkfb.splice(off, 1)
          reply('Deactivated facebook antilink !')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinkfacebook on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinkfacebook off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await A17.sendButtonText(m.chat, buttonsntilink, `Please click the button below On / Off `, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinktelegram': case 'antilinktg': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkTelegram) return reply('Already activated')
          ntilinktg.push(from)
          reply('Activated telegram antilink !')
          var groupe = await A17.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          A17.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkTelegram) return reply('Already deactivated')
          let off = ntilinkig.indexOf(from)
          ntilinkig.splice(off, 1)
          reply('Deactivated telegram antilink in this group')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinktelegram on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinktelegram off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await A17.sendButtonText(m.chat, buttonsntilink, `Please click the button below On / Off `, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinktiktok': case 'antilinktt': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkTiktok) return reply('Already activated')
          ntilinktt.push(from)
          reply('Activated tiktok antilink !')
          var groupe = await A17.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          A17.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkTiktok) return reply('Already deactivated')
          let off = ntilinktt.indexOf(from)
          ntilinktt.splice(off, 1)
          reply('Deactivated tiktok antilink !')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinktiktok on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinktiktok off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await A17.sendButtonText(m.chat, buttonsntilink, `Please click the button below\n\nOn to enable\nOff to disable`, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinktwt': case 'antilinktwitter': case 'antilinktwit': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkTwitter) return reply('Already activated')
          ntilinktwt.push(from)
          reply('Activated twitter antilink in this group !')
          var groupe = await A17.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          A17.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkTwitter) return reply('Already deactivated')
          let off = ntilinktwt.indexOf(from)
          ntilinktwt.splice(off, 1)
          reply('Deactivated twitter antilink !')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinktwt on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinktwt off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await A17.sendButtonText(m.chat, buttonsntilink, `Please click the button below\n\nOn to enable\nOff to disable`, `${global.BotName}`, m)
        }
      }
        break;


      // case 'antilinkall': {
      // if (isBan) return reply(mess.banned);	 			
      // if (isBanChat) return reply(mess.bangc);
      // if (!m.isGroup) return reply(mess.grouponly);
      // if (!isBotAdmins) return reply(mess.botadmin);
      // if (!isAdmins && !isCreator) return reply(mess.useradmin)
      // if (args[0] === "on") {
      // if (AntiLinkTwitter) return reply('Already activated')
      // ntilinkall.push(from)
      // reply('Enabled all antilink !')
      // var groupe = await A17.groupMetadata(from)
      // var members = groupe['participants']
      // var mems = []
      // members.map(async adm => {
      // mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
      // })
      // A17.sendMessage(from, {text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid : mems }}, {quoted:m})
      // } else if (args[0] === "off") {
      // if (!AntiLinkAll) return reply('Already deactivated')
      // let off = ntilinkall.indexOf(from)
      // ntilinkall.splice(off, 1)
      // reply('Disabled all antilink !')
      // } else {
      // let buttonsntilink = [
      // { buttonId: `${prefix}antilinkall on`, buttonText: { displayText: 'On' }, type: 1 },
      // { buttonId: `${prefix}antilinkall off`, buttonText: { displayText: 'Off' }, type: 1 }
      // ]
      // await A17.sendButtonText(m.chat, buttonsntilink, `Please click the button below\n\nOn to enable\nOff to disable`, `${global.BotName}`, m)
      // }
      // }
      // break;


      case 'antilinkall': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } });

        if (args[0] === "on") {

          if (AntiLinkAll) return reply('Already activated');
          ntilinkall.push(from);
          reply('Enabled all antilink!');
          var groupe = await A17.groupMetadata(from);
          var members = groupe['participants'];
          var mems = [];
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'));
          });
          A17.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m });
        } else if (args[0] === "off") {
          if (!AntiLinkAll) return reply('Already deactivated');
          let off = ntilinkall.indexOf(from);
          ntilinkall.splice(off, 1);
          reply('Disabled all antilink!');
        } else {
          reply(`Please use '${prefix}antilinkall on' to enable the Antilink system or '${prefix}antilinkall off' to disable it.`);
        }
      }
        break;


      case 'antiwame': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (antiWame) return reply('Already activated')
          ntwame.push(from)
          reply('Activated antiwame !')
          var groupe = await A17.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          A17.sendMessage(from, { text: `\`\`\`*「  Warning  」*\`\`\`\n\nAntilink is enabled!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!antiWame) return reply('Already deactivated')
          let off = nttoxic.indexOf(from)
          ntwame.splice(off, 1)
          reply('Deactivated antiwame !')
        } else {
          let buttonsntwame = [
            { buttonId: `${prefix}antiwame on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antiwame off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await A17.sendButtonText(m.chat, buttonsntwame, `Please click the button below\n\nOn to enable\nOff to disable`, `${global.BotName}`, m)
        }
      }
        break;



      //-----------------------------------------------------------------------------------------------------------------------------------//



      // case 'nsfw': {
      // if (isBan) return reply(mess.banned);	 			
      // if (isBanChat) return reply(mess.bangc);
      // if (!m.isGroup) return reply(mess.grouponly);
      // if (!isBotAdmins) return reply(mess.botadmin);
      // if (!isAdmins && !isCreator) return reply(mess.useradmin)
      // A17.sendMessage(from, { react: { text: "🫡" , key: m.key }})
      // if (args[0] === "on") {
      // if (AntiNsfw) return reply('Already activated')
      // ntnsfw.push(from)
      // reply('Enabled NSFW Commands!')
      // var groupe = await A17.groupMetadata(from)
      // var members = groupe['participants']
      // var mems = []
      // members.map(async adm => {
      // mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
      // })
      // A17.sendMessage(from, {text: `\`\`\`「 Notice 」\`\`\`\n\nNSFW(not safe for work) feature has been enabled in this group, which means anyone here can accesss Adult commands!`, contextInfo: { mentionedJid : mems }}, {quoted:m})
      // } else if (args[0] === "off") {
      // if (!AntiNsfw) return reply('Already deactivated')
      // let off = ntnsfw.indexOf(from)
      // ntnsfw.splice(off, 1)
      // reply('Disabled NSFW Commands!')
      // } else {
      // let buttonsntnsfw = [
      // { buttonId: `${prefix}nsfw on`, buttonText: { displayText: 'On' }, type: 1 },
      // { buttonId: `${prefix}nsfw off`, buttonText: { displayText: 'Off' }, type: 1 }
      // ]
      // await A17.sendButtonText(m.chat, buttonsntnsfw, `Please click the button below\n\nOn to enable\nOff to disable`, `${global.BotName}`, m)
      // }
      // }
      // break;


      //-----------------------------------------------------------------------------------------------------------------------------------//


      case 'listonline': case 'listaktif': case 'here': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
        let online = [...Object.keys(store.presences[id]), botNumber]
        let liston = 1
        A17.sendText(m.chat, '  「 *Online Members* 」\n\n' + online.map(v => `${liston++} . @` + v.replace(/@.+/, '')).join`\n`, m, { mentions: online })
      }
        break;


      //-----------------------------------------------------------------------------------------------------------------------------------//


      // case 'happymod': {
      // if (isBan) return reply(mess.banned);	 			
      // if (isBanChat) return reply(mess.bangc);
      // A17.sendMessage(from, { react: { text: "🫡" , key: m.key }})
      // if (!args.join(" ")) return reply(`Example : ${prefix + command} Kinemaster`)
      //modapk.happymod(args.join(" ")).then(async(res) => {
      // teks = '```「 HappyMod Search Engine 」```'
      // for (let i of res) {
      // teks += `\n\n${i.name}\n`
      // teks += `${i.link}`
      // }

      // let buttonMessage = {
      // image: {url:res[0].icon},
      // jpegThumbnail: Thumb,
      // caption: teks,
      // footer: `${global.BotName}`,
      // headerType: 4
      // }
      // A17.sendMessage(m.chat, buttonMessage, { quoted: m })
      // })
      // }
      // break;

      //
      case 'happymod': case 'modapk': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🔍", key: m.key } });

        if (!args.join(" ")) return reply(`Example: ${prefix + command} Kinemaster`);

        const searchTerm = args.join(" ");
        modapk.happymod(searchTerm).then(async (res) => {
          let teks = '```「 HappyMod Search Engine 」```';
          for (let i of res) {
            teks += `\n\n${i.name}\n`;
            teks += `${i.link}`;
          }

          let messageToSend = teks;
          if (res[0].icon) {
            messageToSend = {
              text: teks,
              image: { url: res[0].icon },
              jpegThumbnail: Thumb,
            };
          }

          A17.sendMessage(from, messageToSend, { quoted: m });
        });
      }
        break;



      //-----------------------------------------------------------------------------------------------------------------------------------//


      //group moderation

      case 'banchat': case 'bangroup': case 'banmode': {
        if (isBan) return reply(mess.banned);
        if (!isCreator) return reply(mess.botowner);
        A17.sendMessage(from, { react: { text: "⚠️", key: m.key } })

        if (args[0] === "on") {
          if (isBanChat) return reply('This Group is Already Banned from using me!');
          banchat.push(from);
          reply('This Group has been banned from using me!');

          var groupe = await A17.groupMetadata(from);
          var members = groupe['participants'];
          var mems = [];
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'));
          });

          A17.sendMessage(from, { text: `\`\`\`「 Notice 」\`\`\`\n\nThis group is banned from using the bot. So, here nobody can use me anymore!`, contextInfo: { mentionedJid: mems } }, { quoted: m });
        } else if (args[0] === "off") {
          if (!isBanChat) return reply('This Group is Already Banned from using me!');
          let off = banchat.indexOf(from);
          banchat.splice(off, 1);
          reply('This Group has been *unbanned* from using me!');
        } else {
          reply('Please choose either *"on"* or *"off"* to ban or unban the group from using the bot.');
        }
      }
        break;


      case 'setname': case 'setsubject': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (!text) return reply('Pls enter -setname <New Group Name>  to change this Group Name')
        await A17.groupUpdateSubject(m.chat, text).then((res) => reply(mess.jobdone)).catch((err) => reply(jsonformat(err)))
      }
        break;


      case 'block': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await A17.updateBlockStatus(users, 'block').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
      }
        break;


      case 'unblock': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await A17.updateBlockStatus(users, 'unblock').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
      }
        break;


      case 'setdesc': case 'setdesk': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (!text) return reply('Pls enter -setname <New Group Description>  to change this Group Description.')
        await A17.groupUpdateDescription(m.chat, text).then((res) => reply(mess.jobdone)).catch((err) => reply(jsonformat(err)))
      }
        break;


      case 'setgrouppp': case 'setgruppp': case 'setgcpp': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (!quoted) return reply(`Send/reply Image With Caption ${prefix + command}`)
        if (!/image/.test(mime)) return reply(`Send/reply Image With Caption ${prefix + command} to change the Profile Pic of this group.`)
        if (/webp/.test(mime)) return reply(`Send/reply Image With Caption ${prefix + command} to change the Profile Pic of this group.`)
        let media = await A17.downloadAndSaveMediaMessage(quoted)
        await A17.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
        reply(mess.jobdone)
      }
        break;


      case 'tagall': case 'all': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "😳", key: m.key } })
        let teks = `「 Attention 」

*Message : ${args.join(" ") ? args.join(" ") : 'no message'}*\n\n`
        for (let mem of participants) {
          teks += `» @${mem.id.split('@')[0]}\n`
        }
        A17.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
      }
        break;


      case 'hidetag': case 'tag': case 'ping': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "✨", key: m.key } })
        A17.sendMessage(m.chat, { text: args.join(" ") ? args.join(" ") : '', mentions: participants.map(a => a.id) }, { quoted: m })
      }
        break;


      case 'tagadmins': case 'admins': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "🗿", key: m.key } })
        if (!text) return reply(`*Please quote or write a meaningful message to tag admins to*`)
        let teks = `*「 Tag Admins 」*

*Message : ${text}*\n\n`
        for (let mem of groupAdmins) {
          teks += `🍁 @${mem.split('@')[0]}\n`
        }
        A17.sendMessage(m.chat, { text: teks, mentions: groupAdmins }, { quoted: m })
      }
        break;


      /*
      case 'purge':{
        if (isBan) return reply(mess.banned);	 			
      if (isBanChat) return reply(mess.bangc);
      if (!m.isGroup) return reply(mess.grouponly);
      if (!isBotAdmins) return reply(mess.botadmin);
      if (!isAdmins && !isCreator) return reply(mess.useradmin)
      
        const delay = time => new Promise(res=>setTimeout(res,time));
      
        let users = (await A17.fetchGroupMetadataFromWA(m.chat)).participants.map(u => u.jid)
        for (let user of users){
      
            await A17.groupParticipantsUpdate(m.chat, [user], 'remove')
            await delay(3000)
        }
      }
      break;
      
      */

      case 'purge': {
        mess
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        const delay = time => new Promise(res => setTimeout(res, time));
        let mentioned = participants.map(v => v.jid)
        for (let member of mentioned) {
          A17.groupParticipantsUpdate(m.chat, [member], 'remove')
        }
      }

        break;


      case 'nowa': case 'find': case 'stalk': case 'stalknumber': {
        if (isBan) return reply(mess.banned);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (!args[0]) return reply(`Use command like: ${prefix}stalk <number>xxx`)
        var inputnumber = args[0]
        if (!inputnumber.includes('x')) return reply('You didnot added x')
        reply(`Searching for WhatsApp account in given range...`)
        reply(`Please wait while i fetch details...`)
        function countInstances(string, word) {
          return string.split(word).length - 1;
        }
        var number0 = inputnumber.split('x')[0]
        var number1 = inputnumber.split('x')[countInstances(inputnumber, 'x')] ? inputnumber.split('x')[countInstances(inputnumber, 'x')] : ''
        var random_length = countInstances(inputnumber, 'x')
        var randomxx;
        if (random_length == 1) {
          randomxx = 10
        } else if (random_length == 2) {
          randomxx = 100
        } else if (random_length == 3) {
          randomxx = 1000
        }
        var nomerny = `*『 List of Whatsapp Numbers 』*\n\n`
        var nobio = `\n*Bio:* || \nHey there! I am using WhatsApp.\n`
        var nowhatsapp = `\n*Numbers with no WhatsApp account within the range you provided*\n`
        for (let i = 0; i < randomxx; i++) {
          var nu = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
          var status1 = nu[Math.floor(Math.random() * nu.length)]
          var status2 = nu[Math.floor(Math.random() * nu.length)]
          var status3 = nu[Math.floor(Math.random() * nu.length)]
          var dom4 = nu[Math.floor(Math.random() * nu.length)]
          var rndm;
          if (random_length == 1) {
            rndm = `${status1}`
          } else if (random_length == 2) {
            rndm = `${status1}${status2}`
          } else if (random_length == 3) {
            rndm = `${status1}${status2}${status3}`
          } else if (random_length == 4) {
            rndm = `${status1}${status2}${status3}${dom4}`
          }
          var anu = await A17.onWhatsApp(`${number0}${i}${number1}@s.whatsapp.net`);
          var anuu = anu.length !== 0 ? anu : false
          try {
            try {
              var anu1 = await A17.fetchStatus(anu[0].jid)
            } catch {
              var anu1 = '401'
            }
            if (anu1 == '401' || anu1.status.length == 0) {
              nobio += `wa.me/${anu[0].jid.split("@")[0]}\n`
            } else {
              nomerny += `🪄 *Number:* wa.me/${anu[0].jid.split("@")[0]}\n🔹 *Bio :* ${anu1.status}\n🔸 *Updated On :* ${moment(anu1.setAt).tz('Asia/Jakarta').format('HH:mm:ss DD/MM/YYYY')}\n\n`
            }
          } catch {
            nowhatsapp += `${number0}${i}${number1}\n`
          }
        }
        reply(`${nomerny}${nobio}${nowhatsapp}`)
      }
        break;


      case 'grouplink': case 'gclink': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        A17.sendMessage(from, { react: { text: "🪄", key: m.key } })
        let response = await A17.groupInviteCode(m.chat)
        A17.sendMessage(m.chat, {
          text: `*Group Name:* *${groupMetadata.subject}* \n\n*Group Link :* \nhttps://chat.whatsapp.com/${response}l`, "contextInfo": {
            "forwardingScore": 1000000000,
            isForwarded: true,
          }
        }, { quoted: m, detectLink: true })
      }
        break;


      case 'resetlinkgc':
      case 'resetlinkgroup':
      case 'resetlinkgrup':
      case 'revoke':
      case 'resetlink':
      case 'resetgrouplink':
      case 'resetgclink':
      case 'resetgruplink': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        A17.groupRevokeInvite(m.chat)
      }
        break;


      case 'gc': case 'grup': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (args[0] === 'close') {
          await A17.groupSettingUpdate(m.chat, 'announcement').then((res) => reply(`Group has been closed!`)).catch((err) => reply(jsonformat(err)))
        } else if (args[0] === 'open') {
          await A17.groupSettingUpdate(m.chat, 'not_announcement').then((res) => reply(`Group has been opened!`)).catch((err) => reply(jsonformat(err)))
        } else {

          let buttonMessage = {
            image: BotLogo,
            jpegThumbnail: Thumb,
            caption: `*「 ${global.BotName} 」*\n\n_Group Setting Changer tool_:\n\nIf you want to Group close *-group close*\n\nIf you want to Group Oepn *-group open*`,
            footer: `${BotName}`,
            headerType: 4
          }
          A17.sendMessage(m.chat, buttonMessage, { quoted: m })
        }
      }
        break;


      case 'promote': case 'admin': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await A17.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
      }
        break;


      case 'demote': case 'unadmin': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await A17.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
      }
        break;


      case 'add': {
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isCreator) return reply(mess.botowner)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })


        let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        if (users.length == 0) return reply(`Please write the number of the person you want to add to thhis group`)
        await A17.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => reply(`User Added Successfully!`)).catch((err) => reply(`Cannot add that user to this group!`))
      }
        break;


      case 'invite': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        if (!text) return reply(`Enter the number you want to invite to the group...\n\nExample :\n*${prefix + command}* 916297175943`)
        if (text.includes('+')) return reply(`Enter the number together without *+*`)
        if (isNaN(text)) return reply(`Enter only the numbers plus your country code without spaces`)
        let group = m.chat
        let link = 'https://chat.whatsapp.com/' + await A17.groupInviteCode(group)
        await A17.sendMessage(text + '@s.whatsapp.net', { text: ` *GROUP INVITATION*\n\nA user invites you to join this group \n\n${link}`, mentions: [m.sender] })
        reply(` An invite link is sent to the user`)
      }
        break;


      case 'remove': case 'sepak': case 'terjang': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await A17.groupParticipantsUpdate(m.chat, [users], 'remove')
      }
        break;



case "joinall":
  if (args[0] === "on") {
    global.joinall = true;
    updateConfig("joinall", "JOINALL", true); // Mengupdate file config.js dengan nilai true
    reply("✅ JoinAll telah diaktifkan!");
  } else if (args[0] === "off") {
    global.joinall = false;
    updateConfig("joinall", "JOINALL", false); // Mengupdate file config.js dengan nilai false
    reply("✅ JoinAll telah dinonaktifkan!");
  } else {
    reply("❌ Perintah tidak dikenali. Gunakan 'on' untuk mengaktifkan atau 'off' untuk menonaktifkan.");
  }
  break;
  
      // join command  is a possible to Ban bot number.
      case 'join': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (!args[0]) return reply(`Where's the link?`)
        vdd = args[0]
        let vcc = vdd.split("https://chat.whatsapp.com/")[1]
        if (!vcc) return reply("Link invalid!")
        if (isCreator) {
          await A17.groupAcceptInvite(vcc).then(async (res) => reply(jsonformat(res))).catch(_ => _)
          reply("Succes!")
        } else {
          A17.query({
            tag: "iq",
            attrs: {
              type: "get",
              xmlns: "w:g2",
              to: "@g.us"
            },
            content: [{ tag: "invite", attrs: { code: vcc } }]
          }).then(async (res) => {
            sizny = res.content[0].attrs.size
            if (sizny < 20) {
              teks = `Sorry, munimun 20 members are required in a group to add bot!`
              sendOrder(m.chat, teks, "667140254502463", fs.readFileSync('./Assets/pic7.jpg'), `${global.packname}`, `${global.BotName}`, "916297175943@s.whatsapp.net", "AR6NCY8euY5cbS8Ybg5Ca55R8HFSuLO3qZqrIYCT7hQp0g==", "99999999999999999999")
            } else if (sizny > 20) {
              await A17.groupAcceptInvite(vcc).then(async (res) => reply(jsonformat(res))).catch(_ => _)
              reply("Joined !")
            } else {
              reply("Error")
            }
          }).catch(_ => _)
        }
      }
        break;


      case 'left': case 'leftgc': case 'left-gc': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isAdmins && !isCreator) return reply(mess.useradmin);

        let msg = generateWAMessageFromContent(m.chat, {
          viewOnceMessage: {
            message: {
              "messageContextInfo": {
                "deviceListMetadata": {},
                "deviceListMetadataVersion": 2
              },
              interactiveMessage: proto.Message.InteractiveMessage.create({
                body: proto.Message.InteractiveMessage.Body.create({
                  text: null
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  text: '            Powered by A17 2024'
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                  ...(await prepareWAMessageMedia({ image: { url: 'https://graph.org/file/4ca10c7029fcaee1003f7.jpg' } }, { upload: A17.waUploadToServer })),

                  title: '        Leave Group Confirmation',
                  subtitle: null,
                  hasMediaAttachment: false
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                  buttons: [
                    {
                      "name": "quick_reply",
                      "buttonParamsJson": `{"display_text":"Yes","id":"${prefix}bye"}`
                    },
                    {
                      "name": "quick_reply",
                      "buttonParamsJson": `{"display_text":"No","id":"ok"}`
                    }
                  ],
                })
              })
            }
          }
        }, {});

        await A17.relayMessage(msg.key.remoteJid, msg.message, {
          messageId: msg.key.id
        }).catch(err => {
          console.error('Error relaying message:', err);
          return reply('Error relaying message.');
        });

        break;
      }

      case 'bye': {

        if (!isAdmins && !isCreator) return reply(mess.useradmin);

        await sleep(1500);

        await A17.sendMessage(m.chat, { text: args.join(" ") ? args.join(" ") : `Okee ${global.OwnerName} Leaving the group...`, mentions: participants.map(a => a.id) });

        // Leave the group
        A17.sendMessage(from, { react: { text: "☯️", key: m.key } });
        await A17.groupLeave(m.chat).then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)));

        break;
      }
	  
case 'byeall': {

  // Memeriksa apakah pengguna adalah pembuat bot
  if (!isCreator) return reply('Perintah ini hanya dapat digunakan oleh pembuat bot.');

  try {
    // Mendapatkan daftar semua grup yang diikuti oleh bot
    const allGroups = await A17.groupFetchAllParticipating();
    
    // Iterasi melalui setiap grup dan keluar
    for (let groupId in allGroups) {
      await A17.groupLeave(groupId);
      console.log(`Berhasil keluar dari grup: ${allGroups[groupId].subject}`);
    }
    
    reply('Bot telah berhasil keluar dari semua grup.');

  } catch (error) {
    console.error('Terjadi kesalahan saat keluar dari grup:', error);
    reply('Terjadi kesalahan saat mencoba keluar dari grup.');
  }

  break;
}


      //
case 'welcome':
case 'group-event':
  A17.sendMessage(from, { react: { text: '❤', key: m.key } });
  if (isBan) return reply(mess.banned);
  if (isBanChat) return reply(mess.bangc);
  if (!m.isGroup) return reply(mess.grouponly);
  if (!isAdmins && !isCreator) return reply(mess.useradmin);

  const { getGroup, updateGroup } = require('./src/groups.js'); // Impor fungsi dari groups.js

  // Ambil data grup dari database
  const groupData = getGroup(from) || { welcome: false };

  if (args.length === 0) {
    const status = groupData.welcome ? '*aktif*' : '*nonaktif*';
    return m.reply(`Fitur welcome saat ini ${status} di grup ini.\n\nKamu bisa mengubahnya dengan perintah "${global.prefa[0]}welcome on/off".`);
  }

  if (args.length === 1 && (args[0] === 'on' || args[0] === 'off')) {
    const status = args[0];

    if (status === 'on') {
      // Jika fitur welcome sudah aktif
      if (groupData.welcome) {
        return m.reply(`Fitur welcome sudah *aktif* di grup ini.`);
      } else {
        // Perbarui data grup untuk mengaktifkan fitur welcome
        updateGroup(from, { welcome: true });
        return m.reply(`Fitur welcome sekarang *aktif* di grup ini.`);
      }
    } else if (status === 'off') {
      // Jika fitur welcome sudah nonaktif
      if (!groupData.welcome) {
        return m.reply(`Fitur welcome sudah *nonaktif* di grup ini.`);
      } else {
        // Perbarui data grup untuk menonaktifkan fitur welcome
        updateGroup(from, { welcome: false });
        return m.reply(`Fitur welcome sekarang *nonaktif* di grup ini.`);
      }
    }
  } else {
    return m.reply(`Penggunaan: ${global.prefa[0]}welcome [on/off]`);
  }
  break;




      //
      case 'ban': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        if (!args[0]) return reply(`Select add or del (add to ban, del to unban), For Example: reply *${prefix}ban add* to the user you want to ban.`)
        if (args[1]) {
          orgnye = args[1] + "@s.whatsapp.net"
        } else if (m.quoted) {
          orgnye = m.quoted.sender
        }
        const isBane = banUser.includes(orgnye)
        if (args[0] === "add") {
          if (isBane) return ads('User was already banned.')
          banUser.push(orgnye)
          reply(`Successfully banned the user`)
        } else if (args[0] === "del") {
          if (!isBane) return ads('User was already unbanned.')
          let delbans = banUser.indexOf(orgnye)
          banUser.splice(delbans, 1)
          reply(`Successfully unbanned the user.`)
        } else {
          reply("Error")
        }
      }
        break;


      case 'antilink': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkAll) return reply('Already activated')
          ntilinkall.push(from)
          reply('Enabled all antilink !')
          var groupe = await A17.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          A17.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkAll) return reply('Already deactivated')
          let off = ntilinkall.indexOf(from)
          ntilinkall.splice(off, 1)
          reply('Disabled all antilink !')
        } else {
          let textmsg = 'Type ' + `${prefix}${command}` + ' on to turn on antilink feature or Type ' + `${prefix + command}` + ' off to turn off antilink feature'
          await A17.sendMessage(m.chat, { text: `${textmsg}` }, `${global.BotName}`, m)
        }
      }
        break;



      //-----------------------------------------------------------------------------------------------------------------------------------//



      //
      case 'ringtone': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args.join(" ")) return reply(`Example: ${prefix}ringtone black over`)
        let { ringtone } = require('./lib/scraper')
        let anu = await ringtone(text)
        let result = anu[Math.floor(Math.random() * anu.length)]
        A17.sendMessage(m.chat, { audio: { url: result.audio }, fileName: result.title + '.mp3', mimetype: 'audio/mpeg' }, { quoted: m })
      }
        break;


      case 'volume': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args.join(" ")) return reply(`Example: ${prefix + command} 10`)
        media = await A17.downloadAndSaveMediaMessage(quoted, "volume")
        if (isQuotedAudio) {
          rname = getRandom('.mp3')
          exec(`ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`, (err, stderr, stdout) => {
            fs.unlinkSync(media)
            if (err) return reply('Error!')
            jadie = fs.readFileSync(rname)
            A17.sendMessage(from, { audio: jadie, mimetype: 'audio/mp4', ptt: true }, { quoted: m })
            fs.unlinkSync(rname)
          })
        } else if (isQuotedVideo) {
          rname = getRandom('.mp4')
          exec(`ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`, (err, stderr, stdout) => {
            fs.unlinkSync(media)
            if (err) return reply('Error!')
            jadie = fs.readFileSync(rname)
            A17.sendMessage(from, { video: jadie, mimetype: 'video/mp4' }, { quoted: m })
            fs.unlinkSync(rname)
          })
        } else {
          reply("Please send video/audio file only!")
        }
      }
        break;


      case 'tempo': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args.join(" ")) return reply(`Example: ${prefix + command} 10`)
        var req = args.join(' ')
        media = await A17.downloadAndSaveMediaMessage(quoted, "tempo")
        if (isQuotedAudio) {
          ran = getRandom('.mp3')
          exec(`ffmpeg -i ${media} -filter:a "atempo=1.0,asetrate=${req}" ${ran}`, (err, stderr, stdout) => {
            fs.unlinkSync(media)
            if (err) return reply('Error!')
            hah = fs.readFileSync(ran)
            A17.sendMessage(from, { audio: hah, mimetype: 'audio/mp4', ptt: true }, { quoted: m })
            fs.unlinkSync(ran)
          })
        } else if (isQuotedVideo) {
          ran = getRandom('.mp4')
          exec(`ffmpeg -i ${media} -filter:a "atempo=1.0,asetrate=${req}" ${ran}`, (err, stderr, stdout) => {
            fs.unlinkSync(media)
            if (err) return reply('Error!')
            hah = fs.readFileSync(ran)
            A17.sendMessage(from, { video: hah, mimetype: 'video/mp4' }, { quoted: m })
            fs.unlinkSync(ran)
          })
        } else {
          reply("Please send video/audio file only!")
        }
      }
        break;


      case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'tupai':
        A17.sendMessage(from, { react: { text: "⌛", key: m.key } })

        try {
          let set
          if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'
          if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
          if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
          if (/earrape/.test(command)) set = '-af volume=12'
          if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
          if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
          if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
          if (/reverse/.test(command)) set = '-filter_complex "areverse"'
          if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
          if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
          if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
          if (/tupai/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
          if (/audio/.test(mime)) {
            reply(mess.waiting)
            let media = await A17.downloadAndSaveMediaMessage(quoted)
            let ran = getRandom('.mp3')
            exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
              fs.unlinkSync(media)
              if (err) return reply(err)
              let buff = fs.readFileSync(ran)
              A17.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m })
              fs.unlinkSync(ran)
            })
          } else reply(`Pls mention any audio you want to modify _${prefix + command}_`)
        } catch (e) {
          reply(e)
        }
        break;


      case 'calculator': case 'cal': case 'calculate': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (args.length < 1) return reply(`*Example :*\n${prefix}calculator 2*5\n\n`)
        let qsd = args.join(" ")
        if (typeof mathjs.evaluate(qsd) !== 'number') {
          reply('Error')
        } else {
          reply(`\`\`\`「 _Calculator Tool_ 」\`\`\`\n\n*Input :* ${qsd}\n*Calculation Result :* ${mathjs.evaluate(qsd.replace(/×/g, "*").replace(/x/g, "*").replace(/÷/g, "/"))}`)
        }
      }
        break;



      //---------------------------------------------------------------------------------------------------------------------------------------//



      //
      case 'toimage': case 'makeimg': case 'toimg': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🪄", key: m.key } })
        if (!m.quoted) return reply('reply Image')
        if (!/webp/.test(mime)) return reply(`reply sticker with caption *${prefix + command}*`)
        reply(mess.waiting)
        let media = await A17.downloadAndSaveMediaMessage(quoted)
        let ran = await getRandom('.png')
        exec(`ffmpeg -i ${media} ${ran}`, (err) => {
          fs.unlinkSync(media)
          if (err) throw err
          let buffer = fs.readFileSync(ran)
          A17.sendMessage(m.chat, { image: buffer }, { quoted: m })
          fs.unlinkSync(ran)
        })
      }
        break;


      case 'tomp4': case 'makemp4': case 'makevideo': case 'tovideo': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🪄", key: m.key } })
        if (!m.quoted) return reply('reply Image')
        if (!/webp/.test(mime)) return reply(`reply sticker with caption *${prefix + command}*`)
        reply(mess.waiting)
        let { webp2mp4File } = require('./lib/uploader')
        let media = await A17.downloadAndSaveMediaMessage(quoted)
        let webpToMp4 = await webp2mp4File(media)
        await A17.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Here it is...' } }, { quoted: m })
        await fs.unlinkSync(media)
      }
        break;


      case 'toaud': case 'makeaudio': case 'toaudio': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "⌛", key: m.key } })

        if (!/video/.test(mime) && !/audio/.test(mime)) return reply(`Send/reply Video/Audio You Want To Use As Audio With Caption ${prefix + command}`)
        if (!m.quoted) return reply(`Send/reply Video/Audio You Want To Use As Audio With Caption ${prefix + command}`)
        reply(mess.waiting)
        let media = await quoted.download()
        let { toAudio } = require('./lib/converter')
        let audio = await toAudio(media, 'mp4')
        A17.sendMessage(m.chat, { audio: audio, mimetype: 'audio/mpeg' }, { quoted: m })
      }
        break;


      case 'tomp3': case 'makemp3': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (/document/.test(mime)) return reply(`Send/reply Video/Audio You Want To Convert Into MP3 With Caption ${prefix + command}`)
        if (!/video/.test(mime) && !/audio/.test(mime)) return reply(`Send/reply Video/Audio You Want To Convert Into MP3 With Caption ${prefix + command}`)
        if (!m.quoted) return reply(`Send/reply Video/Audio You Want To Convert Into MP3 With Caption ${prefix + command}`)
        reply(mess.waiting)
        let media = await quoted.download()
        let { toAudio } = require('./lib/converter')
        let audio = await toAudio(media, 'mp4')
        A17.sendMessage(m.chat, { document: audio, mimetype: 'audio/mpeg', fileName: `Converted By ${global.BotName} (${m.id}).mp3` }, { quoted: m })
      }
        break;


      case 'togif': case 'makegif': case 'getgif': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (!m.quoted) return reply('reply Image')
        if (!/webp/.test(mime)) return reply(`reply sticker with caption *${prefix + command}*`)
        reply(mess.wait)
        let { webp2mp4File } = require('./lib/uploader')
        let media = await A17.downloadAndSaveMediaMessage(quoted)
        let webpToMp4 = await webp2mp4File(media)
        await A17.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Converted From Webp To Gif' }, gifPlayback: true }, { quoted: m })
        await fs.unlinkSync(media)
      }
        break;


      // case 'tourl': case 'makeurl':{
      // if (isBan) return reply(mess.banned);	 			
      // if (isBanChat) return reply(mess.bangc);
      // A17.sendMessage(from, { react: { text: "🪄" , key: m.key }})

      // // let { UploadFileUgu, webp2mp4File, TelegraPh } = require('./lib/uploader');
      // let media = await A17.downloadAndSaveMediaMessage(quoted)
      // if (/image/.test(mime)) {
      // let anu = await TelegraPh(media)
      // reply(util.format(anu))
      // } else if (!/image/.test(mime)) {
      // let anu = await UploadFileUgu(media)
      // reply(util.format(anu))
      // }
      // await fs.unlinkSync(media)
      // }
      // break;


      case "tourl": case 'tolink':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        let { GraphOrg } = require("./lib/uploader");
        if (!m.quoted) {
          //
          A17.sendMessage(from, { react: { text: "❔", key: m.key } })
          return m.reply(
            `With caption not working, first send an *Image* / *Video* to generate a link! then tag with *${prefix}tourl*`
          );
        }
        let media5 = await A17.downloadAndSaveMediaMessage(quoted);
        if (/image/.test(mime)) {
          //
          let anu = await GraphOrg(media5);
          m.reply(`*Generated Image URL:* \n\n${util.format(anu)}\n`);
        } else if (/video/.test(mime)) {
          //
          try {
            let anu = await GraphOrg(media5);
            m.reply(`*Generated Video URL:* \n\n${util.format(anu)}\n`);
          } catch (e) {
            //
            await fs.unlinkSync(media5);
            return A17.sendMessage(
              m.from,
              {
                text: `*Your video size is too big!*\n\n*Max video size:* 5MB`,
              },
              { quoted: m }
            );
          }
        } else {
          //
          return m.reply(
            `Plese provide an *Image* / *Video* to generate a link!`
          );
        }
        await fs.unlinkSync(media5);
        break;



      //-------------------------------------------------------------------------------------------------------------------------------------//



      case 'translate': case 'ts': case 'trans': {
        if (isBan) return reply(mess.banned);
        A17.sendMessage(from, { react: { text: "⌛", key: m.key } })

        if (!args.join(" ")) return reply("Pls enter any text to translate")
        tes = await fetchJson(`https://megayaa.herokuapp.com/api/translate?to=en&kata=${args.join(" ")}`)
        Infoo = tes.info
        Detek = tes.translate
        reply(`Input : ${Detek}\nTranslation Results : ${Infoo}`)
      }
        break;


      // case 'gimage': case 'gig': case 'googleimage':{
      // if (isBan) return reply(mess.banned);	 			
      // if (isBanChat) return reply(mess.bangc);
      // A17.sendMessage(from, { react: { text: "⌛" , key: m.key }})

      // if (!args[0]) return reply("Enter a search term to get Google Image!")
      // let gis = require('g-i-s')
      // gis(args.join(" "), async (error, result) => {
      // n = result
      // images = n[Math.floor(Math.random() * n.length)].url
      // let buttons = [
      // {buttonId: `${prefix}gimage ${args.join(" ")}`, buttonText: {displayText: '>>'}, type: 1}
      // ]
      // let buttonMessage = {
      // image: { url: images },
      // caption: `「 _Google Image Search_ 」

      // _Search Term_ : ${text}
      // _Media Url_ : ${images}`,
      // footer: `${global.BotName}`,
      // buttons: buttons,
      // headerType: 4,

      // }
      // A17.sendMessage(m.chat, buttonMessage, { quoted: m })
      // })
      // }
      // break;



      // case 'gimage':
      // case 'gig':
      // case 'googleimage': {
      //   if (isBan) return reply(mess.banned);
      //   if (isBanChat) return reply(mess.bangc);
      //   A17.sendMessage(from, { react: { text: "⌛", key: m.key } });

      //   if (!args[0]) return reply("Enter a search term to get Google Image!");
      //   let gis = require('g-i-s');
      //   gis(args.join(" "), async (error, result) => {
      //     n = result;
      //     images = n[Math.floor(Math.random() * n.length)].url;
      //     let buttonMessage = {
      //       image: { url: images },
      //       caption: `「 _Google Image Search_ 」\n\n_Search Term_ : ${text}\n_Media Url_ : ${images}`,
      //       footer: `${global.BotName}`,
      //       headerType: 4,
      //     };
      //     A17.sendMessage(m.chat, buttonMessage, { quoted: m });
      //   });
      // }
      // break;


      case 'gimage':
      case 'gig':
      case 'googleimage': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "⌛", key: m.key } });

        if (!args[0]) return reply("Enter a search term to get Google Image!");
        let gis = require('g-i-s');
        gis(args.join(" "), async (error, result) => {
          if (error) {
            console.error(error);
            return reply("Error occurred while searching for images.");
          }

          if (!result || result.length === 0) {
            return reply("No images found for the given search term.");
          }

          n = result;
          images = n[Math.floor(Math.random() * n.length)].url;
          let buttonMessage = {
            image: { url: images },
            caption: `「 _Google Image Search_ 」\n\n_Search Term_ : ${text}\n_Media Url_ : ${images}`,
            footer: `${global.BotName}`,
            headerType: 4,
          };
          A17.sendMessage(m.chat, buttonMessage, { quoted: m });
        });
      }
        break;


      // case "gig":
      //   case "gimage":
      //   case "googleimage":
      //   case "image":
      //     if (!text) {
      //       A17.sendMessage(from, { react: { text: "⌛", key: m.key } });
      //       return m.reply(`Please provide an image Search Term !\n\nExample: *${prefix}image cheems*`);
      //     }

      //     gis(text, async (error, result) => {
      //       n = result;
      //       let images = n[Math.floor(Math.random() * n.length)].url;
      //       let resText = `\n_🎀 Image Search Term:_ *${text}*\n\n_🧩 Powered by_ *${botName}*\n`;
      //       /*
      //       let buttons = [
      //         {
      //             buttonId: `${prefix}gimage ${text}`,
      //             buttonText: { displayText: ">>" },
      //             type: 1,
      //         },
      //       ];
      //       */
      //       await A17.sendMessage(
      //         m.from,
      //         {
      //           image: { url: images },
      //           caption: resText,
      //           //footer: `*${botName}*`,
      //           //buttons: buttons,
      //           //headerType: 4,
      //         },
      //         { quoted: m }
      //       );
      //     });
      //     break;



      //-------------------------------------------------------------------------------------------------------------------------------------//



      case 'apod': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        //A17.sendMessage(from, { react: { text: "🌌", key: m.key }});
        const randomEmoji = spaceemojis[Math.floor(Math.random() * spaceemojis.length)]; // Select a random emoji
        A17.sendMessage(from, { react: { text: randomEmoji, key: m.key } });

        const apiKey = 'ugce43VIO63s8gQhcQ7Ts2DHQo1Srcchdh9mgI2S'; // Replace with your actual NASA API key // You can use it.
        const moment = require('moment'); // Import moment library here
        const timeZone = 'Asia/Jakarta'; // Set desired timezone.

        const currentDate = moment().tz(timeZone).format('YYYY-MM-DD'); // Initialize currentDate here

        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();

          if (data.url) {
            A17.sendMessage(from, {
              image: { url: data.url },
              caption: `*Astronomy Picture of the Day:*\n\n${data.title}\n${data.explanation}`,
            });
          } else {
            console.log("No APOD image data available.");

            return reply('No APOD image data available.');
          }
        } catch (error) {
          console.error('Error fetching APOD data:', error);

          return reply('An error occurred while fetching APOD data.');
        }
      }
        break;


      case 'google': case 'search': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "✨", key: m.key } })

        if (!args[0]) return reply(`Example: ${prefix + command} <query>\nUses : ${prefix + command} anything...`)
        let google = require('google-it')
        google({ 'query': args.join(" ") }).then(res => {
          let teks = `「 *Google Search Engine* 」\n\n*Search term:* ${text}\n\n\n`
          for (let g of res) {
            teks += `*Title* : ${g.title}\n\n`
            teks += `*Description* : ${g.snippet}\n\n`
            teks += `*Link* : ${g.link}\n\n\n        -----------------------------------------------------------------------------\n\n`
          }
          reply(teks)
        })
      }
        break;


      case "tts": case "texttospeech": case "say": case "speak": {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "⌛", key: m.key } })

        if (!args[0]) return reply("Please give me a text so that i can speak it!")

        let texttosay = text
          ? text
          : m.quoted && m.quoted.text
            ? m.quoted.text
            : m.text;
        const SpeakEngine = require("google-tts-api");
        const texttospeechurl = SpeakEngine.getAudioUrl(texttosay, { lang: "en", slow: false, host: "https://translate.google.com", });
        A17.sendMessage(m.chat, { audio: { url: texttospeechurl, }, mimetype: "audio/mpeg", fileName: `A17SpeechEngine.mp3`, }, { quoted: m, });
      }
        break;


      case 'wiki':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "⌛", key: m.key } })

        if (args.length < 1) return reply('What Are You Looking For?? ')
        const res2 = await wikiSearch(q).catch(e => {
          return reply('Error Result Not Found!')
        })
        const result2 = `*Title :* ${res2[0].judul}\n*Wiki :* ${res2[0].wiki}`
        A17.sendMessage(from, { image: { url: res2[0].thumb }, caption: result2 })
        break;


      case 'urban': {
        A17.sendMessage(from, { react: { text: "📖", key: m.key } })
        // Extract the word from the message
        const word = text.trim();

        if (!word) {
          reply(`Please provide a word to look up on Urban Dictionary. Example: ${prefix}urban hello`);
          return;
        }

        // Make a request to the Urban Dictionary API
        const apiUrl = `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(word)}`;

        try {
          const response = await axios.get(apiUrl);

          // Extract the first definition from the API response
          const definition = response.data.list[0]?.definition;

          if (definition) {
            const urbanMessage = `📖 *Urban Dictionary Definition for "${word}":*\n\n${definition}`;
            reply(urbanMessage);
          } else {
            reply(`No Urban Dictionary definition found for "${word}".`);
          }
        } catch (error) {
          console.error('Error fetching Urban Dictionary definition:', error.message);
          reply('An error occurred while fetching the Urban Dictionary definition. Please try again later.');
        }
      }
        break;


      case 'aju': case 'campus': case 'imgaju':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "✨", key: m.key } })

        const aju = {
          image: { url: 'https://campus-pictures.onrender.com/' },
          caption: `${pushname} here you go...`,

        }

        await A17.sendMessage(m.chat, aju, { quoted: m }).catch(err => {
          return ('Error!')
        })

        break;


      case 'earthquake':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "⌛", key: m.key } })

        const tres = await Gempa()
        var { Waktu, Lintang, Bujur, Magnitude, Kedalaman, Wilayah, Map } = tres.result
        console.log(Map)
        const captt = `Time : ${Waktu}\nLatitude : ${Lintang}\nLongitude : ${Bujur}\nRegion : ${Wilayah}`
        A17.sendMessage(from, { image: { url: Map }, caption: captt })
        break;


      case 'covidinfo':
      case 'covid':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "⌛", key: m.key } })

        const c = await covid()
        var { cases, death, healed } = c[0]
        A17.sendMessage(from, { text: `\nCovid India \n\nCase : ${cases}\n\nDead : ${death}\n\nHealed : ${healed}\n` }, m)
        break;



      //-----------------------------------------------------------------------------------------------------------------------------------//


      //
      case 'igdl':
      case 'instagramreels':
      case 'instagram':
      case 'igreels':

        {
          if (isBan) {
            return reply(mess.banned);
          }

          if (isBanChat) {
            return reply(mess.bangc);
          }

          // Send a reaction emoji
          A17.sendMessage(from, { react: { text: "🪄", key: m.key } });

          // Check if a link is provided
          if (!text) {
            return reply(`Where is the link?\n\nExample: ${prefix + command} https://www.instagram.com/reel/Ctjt0srIQFg/?igshid=MzRlODBiNWFlZA==`);
          }

          try {
            // Download the Instagram video
            let instadownload = await instadl(text);

            // Send the downloaded video as a reply to the command
            await A17.sendMessage(m.chat, { video: { url: instadownload.url[0].url }, caption: mess.jobdone }, { quoted: m });
          } catch (error) {
            console.error('Error while processing Instagram video:', error);
            return reply('An error occurred while processing the Instagram video.');
          }
        }
        break;


      // ///
      // case 'igdl': case 'instagramreels': case 'instagram': case 'igreels': {
      // if (isBan) return reply(mess.banned);	 			
      // if (isBanChat) return reply(mess.bangc);
      // A17.sendMessage(from, { react: { text: "🪄" , key: m.key }})
      // if (!args[0]) return reply(`Example :\n${prefix + command} https://www.instagram.com/p/CcvJGuxh9VI/?igshid=YmMyMTA2M2Y=`)
      // try {
      // hx.igdl(args[0]).then(async(resed) => {
      // ini_anu = []
      // anu_list = []
      // textbv = `「 _Instagram Downloader_ 」\n\nUsername : ${resed.user.username ? resed.user.name : "undefined"}\nFollowers : ${resed.user.followers}`
      // urut = 1
      // for (let i = 0; i < resed.medias.length; i++) {
      // ini_anu.push({
      // "type": resed.medias[i].fileType,
      // "url": resed.medias[i].url
      // })
      // }
      // ilod = 1
      // for (let i of ini_anu) {
      // anu_list.push({buttonId: `${prefix}ig ${i.type} ${i.url}`, buttonText: {displayText: `Media ${ilod++}`}, type: 1})
      // }
      // textbv += `\n\n_Select the media below to download_`
      // let buttons = anu_list
      // let buttonMessage = {
      // image:BotLogo,
      // jpegThumbnail:Thumb,
      // caption: textbv,
      // footer: `${global.BotName}`,
      // buttons: buttons,
      // headerType: 4
      // }
      // A17.sendMessage(from, buttonMessage, {quoted:m})
      // })
      // } catch (err) {
      // reply("An Error Occured!")
      // }
      // }
      // break;


      case 'ig': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (args[0] === "mp4") {
          A17.sendMessage(from, { video: { url: args[1] }, caption: 'Here it is...', mimetype: 'video/mp4' }, { quoted: m })
        } else if (args[0] === "jpg") {
          A17.sendMessage(from, { image: { url: args[1] }, caption: 'Here it is...' }, { quoted: m })
        } else {
          reply("Error! ")
        }
      }
        break;


      case 'mp4': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args[0]) return reply(`Pls provide link!`)
        try {
          A17.sendMessage(from, {
            video: { url: args[0] }, caption: "Succes!", contextInfo: {
              externalAdreply: {
                title: `${global.BotName}`,
                body: `${global.OwnerName}`,
                thumbnail: BotLogo,
                mediaType: 2,
                mediaUrl: `${global.website}`,
                sourceUrl: `${global.website}`
              }
            }
          }, { quoted: m })
        } catch {
          reply("Link error!")
        }
      }
        break;


      case 'jpeg': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args[0]) return reply(`Please provide link!`)
        try {
          A17.sendMessage(from, { image: { url: args[0] }, caption: "Success!" }, { quoted: m })
        } catch {
          reply("Link error")
        }
      }
        break;


      case 'igtv': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please provide link!`)
        const { instagramdl, instagramdlv2, instagramdlv3 } = require('@bochilteam/scraper')
        if (!isUrl(args[0]) && !args[0].includes('instagram.com')) return reply('*Invalid link!*')
        instagramdlv3(`${text}`).then(async (data) => {
          var buf = await getBuffer(data[0].thumbnail)
          A17.sendMessage(m.chat, { video: { url: data[0].url }, jpegThumbnail: buf, caption: `${BotName}` }, { quoted: m })
        }).catch((err) => {
          reply(mess.error)
        })
      }
        break;


      ///  
      case 'twitter': case 'td': case 'twitterdl': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please provide link!`)
        if (!isUrl(args[0]) && !args[0].includes('twitter.com')) return reply(`*Invalid link!*`)
        xfarrapi.Twitter(`${text}`).then(async (data) => {
          let txt = `「 _Twitter Downloader_ 」\n\n`
          txt += `*Title :* ${data.title}\n`
          txt += `*Quality :* ${data.medias[1].quality}\n`
          txt += `*Type :* ${data.medias[1].extension}\n`
          txt += `*Size :* ${data.medias[1].formattedSize}\n`
          txt += `*Duration :* ${data.medias.length}\n`
          txt += `*URL :* ${data.url}\n\n`
          txt += `*${BotName}*`
          buf = await getBuffer(data.thumbnail)
          A17.sendMessage(m.chat, { image: { url: data.thumbnail }, jpegThumbnail: buf, caption: `${txt}` }, { quoted: m })
          for (let i of data.medias) {
            A17.sendMessage(m.chat, { video: { url: i.url }, jpegThumbnail: buf, caption: `*${text}*` }, { quoted: m })
          }
        }).catch((err) => {
          reply(mess.error)
        })
      }
        break;


      case 'twittermp3': case 'twitteraudio': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please provide link!`)
        if (!isUrl(args[0]) && !args[0].includes('twitter.com')) return reply(`*Invalid link!*`)
        xfarrapi.Twitter(`${text}`).then(async (data) => {
          A17.sendMessage(m.chat, { audio: { url: data.medias[1].url }, mimetype: 'audio/mp4' }, { quoted: m })
        }).catch((err) => {
          reply(mess.reply)
        })
      }
        break;


      case 'twitterxx': case 'twdlxx': case 'twmp4xx': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args[0]) return reply(`Example :\n${prefix + command} https://twitter.com/cinema21/status/1517754155644821504?t=rUnbyqwh4vAE1QXMXlsVeQ&s=19`)
        try {
          let lotwit = await aiovideodl(args[0])
          teks = `「 _Twitter Downloader_ 」
Caption : ${lotwit.title ? lotwit.title : "undefined"}
Type : ${lotwit.medias[1].extension}
Size : ${lotwit.medias[1].formattedSize}
Link : ${lotwit.medias[1].url}
_Please choose the video quality_`
          let buttons = [
            { buttonId: `${prefix}twitter ${lotwit.medias[0].url}`, buttonText: { displayText: `Quality ${lotwit.medias[0].quality}` }, type: 1 },
            { buttonId: `${prefix}twitter ${lotwit.medias[2].url}`, buttonText: { displayText: `Quality ${lotwit.medias[2].quality}` }, type: 1 }
          ]
          let buttonMessage = {
            video: { url: lotwit.medias[1].url },
            caption: teks,
            footer: `${pushname}`,
            buttons: buttons,
            headerType: 4,

          }
          A17.sendMessage(from, buttonMessage, { quoted: m })
        } catch {
          reply("Link Error!")
        }
      }
        break;


      case 'twddlxx': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let buttons = [
          { buttonId: `${prefix}exit`, buttonText: { displayText: '✨exit✨' }, type: 1 }
        ]
        let buttonMessage = {
          video: { url: args[0] },
          caption: "Here it is...",
          footer: `${pushname}`,
          buttons: buttons,
          headerType: 4,

        }
        A17.sendMessage(from, buttonMessage, { quoted: m })
      }
        break;


      ///
      case 'fbdl': case 'fb': case 'facebok': case 'fbmp4': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please provide the link!\n\nExample: ${prefix}facebook https://www.facebook.com/groups/599913174599515/permalink/705467384044093/`)
        if (!isUrl(args[0]) && !args[0].includes('facebook.com')) return reply(`Invalid link!`)
        let bocil = require('@bochilteam/scraper')
        bocil.facebookdlv2(`${text}`).then(async (data) => {
          let txt = `「 _Facebook Downloader_ 」\n\n`
          txt += `*Title :* ${data.title}\n`
          txt += `*Quality :* ${data.result[0].quality}\n`
          txt += `*Description:* ${data.description}\n`
          txt += `*URL :* ${text}\n\n`
          buf = await getBuffer(data.thumbnail)
          A17.sendMessage(m.chat, { image: { url: data.thumbnail }, jpegThumbnail: buf, caption: `${txt}` }, { quoted: m })
          for (let i of data.result) {
            A17.sendMessage(m.chat, { video: { url: i.url }, jpegThumbnail: buf, caption: `*Quality :* ${i.quality}` }, { quoted: m })
          }
        }).catch((err) => {
          reply(mess.error)
        })
      }
        break;


      case 'fbmp3': case 'facebookmp3': case 'facebookaudio': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please provide the link!\n\nExample: ${prefix + command} https://www.facebook.com/groups/599913174599515/permalink/705467384044093/`)
        if (!isUrl(args[0]) && !args[0].includes('facebook.com')) return reply(`Invalid link!`)
        let noh = require('@bochilteam/scraper')
        noh.savefrom(`${text}`).then(async (anu) => {
          A17.sendMessage(m.chat, { audio: { url: anu.url[0].url }, mimetype: 'audio/mp4' }, { quoted: m })
        }).catch((err) => {
          reply(mess.error)
        })
      }
        break;


      case 'facebookxx': case 'fbdlxxx': case 'fbmp4xxx': case 'fbxxx': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args[0]) return reply(`Example :\n${prefix + command} https://fb.watch/cAX2dep-BZ/`)
        try {
          let resd = await aiovideodl(args[0])
          teks = `「 _Facebook Downloader_ 」
Type : video/${resd.medias[0].extension}
Quality : ${resd.medias[0].quality}
Size : ${resd.medias[0].formattedSize}
_Click the button below to download_`
          let buttons = [
            { buttonId: `${prefix}fbdl ${resd.medias[1].url}`, buttonText: { displayText: 'QualityHD' }, type: 1 }
          ]
          let buttonMessage = {
            video: { url: resd.medias[0].url },
            caption: teks,
            footer: `${pushname}`,
            buttons: buttons,
            headerType: 4,

          }
          A17.sendMessage(from, buttonMessage, { quoted: m })
        } catch {
          reply("Link invalid!")
        }
      }
        break;


      case 'fbddlxx': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let buttons = [
          { buttonId: `${prefix}exit`, buttonText: { displayText: '✨exit✨' }, type: 1 }
        ]
        let buttonMessage = {
          video: { url: args[0] },
          caption: "Done!",
          footer: `${pushname}`,
          buttons: buttons,
          headerType: 4,

        }
        A17.sendMessage(from, buttonMessage, { quoted: m })
      }
        break;


      ///
      case 'tiktok': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!q) return reply('Please provide the link !')
        reply(mess.wait)
        if (!q.includes('tiktok')) return reply(`Invalid tiktok link!`)
        const musim_rambutan = await A17.Tiktok(`${q}`).catch(e => {
          reply(mess.error)
        })
        console.log(musim_rambutan)
        const A17tiktokop = musim_rambutan.result.watermark
        texttk = `_Please choose the button below_`
        let buttons = [
          { buttonId: `${prefix}ttnowm ${q}`, buttonText: { displayText: 'Watermark Free' }, type: 1 },
          { buttonId: `${prefix}ttaud ${q}`, buttonText: { displayText: 'Audio ' }, type: 1 }
        ]
        let buttonMessage = {
          video: { url: A17tiktokop },
          caption: texttk,
          footer: `${BotName}`,
          buttons: buttons,
          headerType: 4,

        }
        A17.sendMessage(from, buttonMessage, { quoted: m })
      }
        break;


      case 'tiktoknowm': case 'ttnowm': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!q) return reply('Please provide the link !')
        reply(mess.wait)
        if (!q.includes('tiktok')) return reply(`That's not a tiktok link!`)
        const musim_rambutan = await A17.tiktok(`${q}`).catch(e => {
          reply(mess.error)
        })
        console.log(musim_rambutan)
        const A17tiktoknowm = musim_rambutan.result.nowatermark
        A17.sendMessage(from, { video: { url: A17tiktoknowm }, caption: "Here it is..." }, { quoted: m })
      }
        break;


      case 'tiktokaudio':
      case 'tiktokmusic':
      case 'ttaud': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!q) return reply('Where is the audio?')
        if (!q.includes('tiktok')) return reply(`That's not a tiktok link!`)
        const musim_rambutan = await A17Tiktok(`${q}`).catch(e => {
          reply(mess.error)
        })
        console.log(musim_rambutan)
        const A17tiktokaudio = musim_rambutan.result.nowatermark
        A17.sendMessage(from, { audio: { url: A17tiktokaudio }, mimetype: 'audio/mp4' }, { quoted: m })
      }
        break;


      ///
      case 'yts': case 'ytsearch': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "📍", key: m.key } })

        if (!args.join(" ")) return reply(`Example : -yts Heat waves`)
        let yts = require("youtube-yts")
        let search = await yts(args.join(" "))
        let teks = '```「 YouTube search Engine 」```\n\n Search Term: ' + text + '\n\n'
        let no = 1
        for (let i of search.all) {
          teks += `Result No : ${no++}\n\nTitle : ${i.title}\n\nViews : ${i.views}\n\nDuration : ${i.timestamp}\n\nUploaded : ${i.ago}\n\nAuthor : ${i.author.name}\n\nUrl : ${i.url}\n\n\n-----------------------------------------------------------------------------\n\n\n`
        }
        A17.sendMessage(m.chat, { image: { url: search.all[0].thumbnail }, caption: teks }, { quoted: m })
      }
        break;


      /*
        	
      case 'music': case 'p': case 'play': case 'song': case 'ytplay': {
          if (isBan) return reply(mess.banned);	 			
       if (isBanChat) return reply(mess.bangc);
       A17.sendMessage(from, { react: { text: "🍁" , key: m.key }}) 
       const YT=require('./lib/ytdlcore')
       const { isUrl, fetchBuffer } = require('./lib/Function')
      
       if(!text) return A17.sendMessage(from,{text:"Pls enter song name to play!"},{quoted:m})
       let yts = require("@adiwajshing/keyed-db2")
       let search = await yts(text)
       let anu = search.videos[0]
       let buttons = [
       {buttonId: `${prefix}ytad ${text}`, buttonText: {displayText: '♫ Audio'}, type: 1},
       {buttonId: `${prefix}ytvd ${text}`, buttonText: {displayText: '► Video'}, type: 1}
      
       ]
       let buttonMessage = {
       image: { url: anu.thumbnail },
       caption: `「  A17 Youtube Player 2.0  」
      
      ✨ *Title :* ${anu.title}
      
      ⏳ *Duration :* ${anu.timestamp}
      
      📈 *Viewers :* ${anu.views}
      
      📍 *Uploaded :* ${anu.ago}
      
      🎐 *Channel :* ${anu.author.name}
      
      🔗 *Url :* ${anu.url}`,
         
       footer: `${global.BotName}`,
       buttons: buttons,
       headerType: 4,
      
       }
       A17.sendMessage(m.chat, buttonMessage, { quoted: m })
       }
       break;
      
      */


      /// Normal
      // case 'play': case 'song': case 'music': {
      //   if (isBan) return reply(mess.banned);	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   A17.sendMessage(from, { react: { text: "🍁" , key: m.key }}) 
      //   const YT=require('./lib/ytdl-core')
      //   let yts = require("youtube-yts")
      //   let search = await yts(text)
      //   let anu = search.videos[0]
      //   const ytmp3play = await YT.mp3(anu.url)

      // await A17.sendMessage(from, {audio: fs.readFileSync(ytmp3play.path),fileName: anu.title + '.mp3',mimetype: 'audio/mpeg',}, {quoted:m})
      // }
      // break;



      //-----------------------------------------------------------------------------------------------------------------------------------//

case 'play':
case 'song':
case 'music': {
    if (isBan) return reply(mess.banned);
    if (isBanChat) return reply(mess.bangc);

    try {
        // Mengirim reaksi
        await A17.sendMessage(from, { react: { text: "🍁", key: m.key } });

        // Import modul yang diperlukan
        const YT = require('./lib/ytdl-core');
        const yts = require('youtube-yts');
        const fs = require('fs');

        // Pencarian video di YouTube
        let search = await yts(text);
        let video = search.videos[0];

        // Mengambil data mp3 dari video YouTube
        const ytmp3play = await YT.mp3(video.url);

        // Kirim detail video dengan thumbnail
        await A17.sendMessage(
            from,
            {
                image: { url: video.thumbnail }, // Gambar thumbnail
                caption: `🎵 *Downloading Music* 🎵
                
  📌 *Title:* ${video.title}
  ⏳ *Duration:* ${video.timestamp}
  📈 *Viewers:* ${video.views}
  🎤 *Channel:* ${video.author.name}
  📅 *Uploaded:* ${video.ago}
  🔗 *URL:* ${video.url}`,
            },
            { quoted: m }
        );

        // Kirim audio mp3
        await A17.sendMessage(
            from,
            {
                audio: { url: ytmp3play.path }, // Menggunakan file audio yang diunduh
                mimetype: 'audio/mpeg',
                fileName: `${video.title}.mp3`,
            },
            { quoted: m }
        );
    } catch (err) {
        console.error('Error in play command:', err);
        reply('Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
    break;
}

      case 'spotify': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍁", key: m.key } });

        if (!q) return reply(`Please provide a query. Example: ${prefix + command} 295`);

        let abuffer = `https://www.guruapi.tech/api/spotifydl?url=${encodeURIComponent(q)}`
        let bbuffer = await fetchJson(`https://www.guruapi.tech/api/spotifyinfo?text=${encodeURIComponent(q)}`)

        let bimg = bbuffer.spty.results.thumbnail
        let bname = bbuffer.spty.results.title
        let burl = bbuffer.spty.results.url;

        await A17.sendMessage(from, {
          audio: { url: abuffer },
          ptt: true,
          filename: 'error.mp3',
          mimetype: 'audio/mpeg',
          contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
              title: "↺ |◁   II   ▷|   ♡",
              body: `Now playing: ${bname}`,
              thumbnailUrl: bimg,
              sourceUrl: burl,
              mediaType: 1,
              renderLargerThumbnail: true
            }
          }
        }, { quoted: m }
        );
      }
        break;


      case 'ytvd': case 'video': case 'ytvideo': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍃", key: m.key } })
        const YT = require('./lib/ytdl-core')
        let yts = require("youtube-yts")
        let search = await yts(text)
        let anu = search.videos[0]
        const ytmp4play = await YT.mp4(anu.url)
        A17.sendMessage(from, { video: { url: ytmp4play.videoUrl }, mimetype: "video/mp4", caption: anu.title + ' By *A17 MD*', }, { quoted: m })
      }

        break;





      /*
      case 'ytmusic': case 'ytvideo': case 'ytdl':{
        if (isBan) return reply(mess.banned);	 			
      if (isBanChat) return reply(mess.bangc);
      if (!args[0]) return reply(mess.nolink)
      
      const YT=require('./lib/ytdlcore')
      if(!text) return A17.sendMessage(from,{text:"Please provide a valid youtube link!"},{quoted:m})
      let yts = require("@adiwajshing/keyed-db2")
      let search = await yts(text)
      let anu = search.videos[0]
      let buttons = [
      {buttonId: `${prefix}ytad2 ${text}`, buttonText: {displayText: '♫ Audio'}, type: 1},
      {buttonId: `${prefix}ytvd2 ${text}`, buttonText: {displayText: '► Video'}, type: 1}
      
      ]
      let buttonMessage = {
      image: { url: anu.thumbnail },
      caption: `「  A17 Youtube Downloader 2.0  」
      
      ✨ *Title :* ${anu.title}
      
      ⏳ *Duration :* ${anu.timestamp}
      👀 *Viewers :* ${anu.views}
      📍 *Uploaded :* ${anu.ago}
      🎐 *Channel :* ${anu.author.name}
      🔗 *Url :* ${anu.url}`,
      footer: `${global.BotName}`,
      buttons: buttons,
      headerType: 4,
      
      }
      A17.sendMessage(m.chat, buttonMessage, { quoted: m })
      }
      break; 
      */


      case 'ytmp': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "⌛", key: m.key } })

        const YT = require('./lib/ytdl-core')
        const ytmp3play2 = await YT.mp3(text)

        await A17.sendMessage(from, { document: fs.readFileSync(ytmp3play2.path), fileName: 'A17_YTmp3_Downloader.mp3', mimetype: 'audio/mpeg', }, { quoted: m })
      }
        break;


      case 'ytvd2': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍁", key: m.key } })
        const YT = require('./lib/ytdl-core')
        const ytmp4play2 = await YT.mp4(text)
        A17.sendMessage(from, { video: { url: ytmp4play2.videoUrl }, mimetype: "video/mp4", caption: 'Downloaded by *A17 MD*', }, { quoted: m })
      }
        break;


      case 'lyrics':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "🍁", key: m.key } });

        if (!text) return reply(`Command usage: ${prefix}lyrics <song title>`);

        reply(mess.waiting);

        const { getLyrics } = require("@fantox01/lyrics-scraper");

        try {
          const data = await getLyrics(text);

          const message = `
        *Title:* ${text}
        *Artist:* ${data.artist}
        *Album:* ${data.album}
        *Release Date:* ${data.release_date}
        
        *Lyrics:*\n${data.lyrics}
            `.trim();

          A17.sendMessage(from, { text: message, quoted: m });
        } catch (error) {
          console.error('Error fetching lyrics:', error);
          const errorMessage = 'Failed to fetch lyrics. Please try again later.';
          A17.sendMessage(from, { text: errorMessage, quoted: m });
        }
        break;



      //-----------------------------------------------------------------------------------------------------------------------------------//



      ///
      // case 'couplepp': case 'cpp': case 'ppcouple': {
      // if (isBan) return reply(mess.banned);
      // if (isBanChat) return reply(mess.bangc);
      // A17.sendMessage(from, { react: { text: "🙀" , key: m.key }});

      //        reply(mess.waiting)
      //        let anu = await fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json')
      //        let random = anu[Math.floor(Math.random() * anu.length)]
      //        A17.sendMessage(m.chat, { image: { url: random.male }, caption: `For him...` }, { quoted: m })
      //        A17.sendMessage(m.chat, { image: { url: random.female }, caption: `For her...` }, { quoted: m })
      //    }
      // break;


      case 'couplepp':
      case 'cpp':
      case 'ppcouple': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        A17.sendMessage(from, { react: { text: "🙀", key: m.key } });
        reply(mess.waiting);

        let anu = await fetchJson('https://www.exenoz.tech/couple');

        for (let i = 0; i < 3; i++) {  // the set of picures.
          let random = anu[Math.floor(Math.random() * anu.length)];

          // Sending the male picture
          await A17.sendMessage(m.chat, { image: { url: random.male }, caption: `For him...` }, { quoted: m });

          // Sending the female picture
          await A17.sendMessage(m.chat, { image: { url: random.female }, caption: `For her...` }, { quoted: m });
        }
      }
        break;


      //
      case 'coffee': case 'kopi': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        /*     let buttons = [
                     {buttonId: `${prefix}coffee`, buttonText: {displayText: '>>'}, type: 1}
                 ]  */
        let buttonMessage = {
          image: { url: 'https://coffee.alexflipnote.dev/random' },
          caption: `Here is your Coffee...`,
          /*   footer: `${BotName}`,
             buttons: buttons,
             headerType: 4  */
        }
        A17.sendMessage(m.chat, buttonMessage, { quoted: m })
      }
        break;


      //old code of A17 button 

      // case 'pinterest': case 'pin': {
      //   if (isBan) return reply(mess.banned);
      //   if (isBanChat) return reply(mess.bangc);
      // if (!args.join(" ")) return reply("Pls providea search term!")
      // try {
      // hx.pinterest(args.join(" ")).then(async(res) => {
      // imgnyee = res[Math.floor(Math.random() * res.length)]
      // /* let buttons = [
      // {buttonId: `${prefix}pinterest ${args.join(" ")}`, buttonText: {displayText: '>>'}, type: 1}
      // ] */
      // let buttonMessage = {
      // image: { url: imgnyee },
      // caption:  `Title : ` + args.join(" ") + `\nMedia Url : `+imgnyee,
      // /* footer: `${global.BotName}`,
      // buttons: buttons,
      // headerType: 4, */

      // }
      // A17.sendMessage(m.chat, buttonMessage, { quoted: m })
      // }).catch(_ => _)
      // } catch {
      // reply("Error")
      // }
      // }
      // break;


      // //
      // case 'pinterest':
      // case 'pin': {
      //   if (isBan) return reply(mess.banned);
      //   if (isBanChat) return reply(mess.bangc);
      //   A17.sendMessage(from, { react: { text: "🐦", key: m.key } });

      //   if (!args.join(" ")) return reply(`${pushname} Please provide a search term!`);
      //   reply(mess.waiting)
      //   let { pinterest } = require('./lib/scraper');
      //   let anutrest = await pinterest(text);
      //   let results = [];

      //   // Get multiple random images (let's say 5 images)
      //   const numImages = 5;
      //   for (let i = 0; i < numImages && i < anutrest.length; i++) {
      //     results.push(anutrest[Math.floor(Math.random() * anutrest.length)]);
      //   }

      //   // Send each image without any caption
      //   for (let i = 0; i < results.length; i++) {
      //     A17.sendMessage(m.chat, { image: { url: results[i] } }, { quoted: m });
      //   }
      // }
      //   break;


      case 'pinterest':
      case 'pin': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🐦", key: m.key } });

        const searchTerm = args.join(" ");
        if (!searchTerm) return reply(`${pushname} Please provide a search term!`);
        reply(mess.waiting);

        const url = `https://www.exenoz.tech/api/pinterest?q=${encodeURIComponent(searchTerm)}`;

        try {
          const response = await axios.get(url);
          const pins = response.data;

          const numImages = 5;
          const randomPins = pins.sort(() => 0.5 - Math.random()).slice(0, numImages);

          randomPins.forEach(pin => {
            A17.sendMessage(m.chat, { image: { url: pin.url } }, { quoted: m });
          });
        } catch (error) {
          console.error('Error fetching data from Pinterest API:', error);
          reply('Error fetching data from Pinterest API. Please try again later.');
        }
      }
        break;



      //-----------------------------------------------------------------------------------------------------------------------------------//



      //
      case 'swm': case 'take': case 'stickerwm': case 'steal': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        if (!args.join(" ")) return reply(`Like use -take A17|By: Kai`)
        const swn = args.join(" ")
        const pcknm = swn.split("|")[0];
        const atnm = swn.split("|")[1];
        if (m.quoted.isAnimated === true) {
          A17.downloadAndSaveMediaMessage(quoted, "gifee")
          A17.sendMessage(from, { sticker: fs.readFileSync("gifee.webp") }, { quoted: m })
        } else if (/image/.test(mime)) {
          let media = await quoted.download()
          let encmedia = await A17.sendImageAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
          await fs.unlinkSync(encmedia)
        } else if (/video/.test(mime)) {
          if ((quoted.msg || quoted).seconds > 11) return reply('Maximum 10 seconds is allowed!')
          let media = await quoted.download()
          let encmedia = await A17.sendVideoAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
          await fs.unlinkSync(encmedia)
        } else {
          reply(`Send Image/Video With Caption ${prefix + command}\nVideo Duration 1-9 seconds is allowed!`)
        }
      }
        break;


      case 'smeme': case 'stickermeme': case 'stickmeme': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "⌛", key: m.key } })

        let { TelegraPh } = require('./lib/uploader')
        if (!text) return reply(`Send/reply Photo With Caption ${prefix + command} *text*`)
        if (text.includes('|')) return reply(`Send/reply Photo With Caption ${prefix + command} *text*`)
        if (!/image/.test(mime)) return reply(`Send/reply Photo With Caption ${prefix + command} *text*`)
        reply(mess.wait)
        mee = await A17.downloadAndSaveMediaMessage(quoted)
        mem = await TelegraPh(mee)
        meme = `https://api.memegen.link/images/custom/-/${text}.png?background=${mem}`
        memek = await A17.sendImageAsSticker(m.chat, meme, m, { packname: global.packname, author: global.author })
        await fs.unlinkSync(memek)
      }
        break;


      case 'sgif': case 'sticker': case 's': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🌝", key: m.key } })
        if (/image/.test(mime)) {
          let media = await quoted.download()
          let encmedia = await A17.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
          await fs.unlinkSync(encmedia)
        } else if (/video/.test(mime)) {
          if ((quoted.msg || quoted).seconds > 11) return reply('Maximum 10 seconds!')
          let media = await quoted.download()
          let encmedia = await A17.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
          await fs.unlinkSync(encmedia)
        } else {
          reply(`Send Image/Video With Caption ${prefix + command}\nVideo Duration 1-9 Seconds`)
        }
      }
        break;



      //-----------------------------------------------------------------------------------------------------------------------------------//



      // case 'couple': case 'ship': {
      //   if (isBan) return reply(mess.banned);
      //   if (isBanChat) return reply(mess.bangc);
      // if (!m.isGroup) return reply(`${mess.grouponly}`)
      // A17.sendMessage(from, { react: { text: "🌝" , key: m.key }})

      // let member = participants.map(u => u.id)
      // let orang = member[Math.floor(Math.random() * member.length)]
      // let jodoh = member[Math.floor(Math.random() * member.length)]
      // let jawab = `@${orang.split('@')[0]} ❤️ @${jodoh.split('@')[0]}
      // Ohh i see 👀💖...`
      // let menst = [orang, jodoh]
      // let buttons = [
      // { buttonId: '❤️', buttonText: { displayText: 'Congratulations ❤️' }, type: 1 }
      // ]
      // await A17.sendButtonText(m.chat, buttons, jawab, A17.user.name, m, {mentions: menst})
      // }
      // break;


      // case 'soulmate': {
      //   if (isBan) return reply(mess.banned);
      //   if (isBanChat) return reply(mess.bangc);
      // if (!m.isGroup) return reply(`${mess.grouponly}`)
      // A17.sendMessage(from, { react: { text: "🌝" , key: m.key }})
      // let member = participants.map(u => u.id)
      // let me = m.sender
      // let jodoh = member[Math.floor(Math.random() * member.length)]
      // let jawab = `👫 Soulmates
      // @${me.split('@')[0]} ❤️ @${jodoh.split('@')[0]}`
      // let ments = [me, jodoh]
      // let buttons = [
      // { buttonId: '❤️', buttonText: { displayText: 'Be my Soulmate ❤️' }, type: 1 }
      // ]
      // await A17.sendButtonText(m.chat, buttons, jawab, A17.user.name, m, {mentions: ments})
      // }
      // break;


      case 'soulmate': {

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(`${mess.grouponly}`);
        A17.sendMessage(from, { react: { text: "🌝", key: m.key } });

        let member = participants.map(u => u.id);
        let me = m.sender;
        let jodoh = member[Math.floor(Math.random() * member.length)];

        let message = `👫 Be me Soulmate...\n@${me.split('@')[0]} ❤️ @${jodoh.split('@')[0]}`;
        A17.sendMessage(m.chat, { text: message, mentions: [me, jodoh] }, { quoted: m });
      }
        break;


      case 'handsomecheck':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "😺", key: m.key } })
        if (!text) return reply(`Tag Someone, Example : ${prefix + command} @Kai`)
        const gan = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100']
        const teng = gan[Math.floor(Math.random() * gan.length)]
        A17.sendMessage(from, { text: `*${command}*\n\nName : ${q}\nAnswer : *${teng}%*` }, { quoted: m })
        break;


      case 'beautifulcheck':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "😺", key: m.key } })

        if (!text) return reply(`Tag Someone, Example : ${prefix + command} @Kai`)
        const can = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100']
        const tik = can[Math.floor(Math.random() * can.length)]
        A17.sendMessage(from, { text: `*${command}*\n\nName : ${q}\nAnswer : *${tik}%*` }, { quoted: m })
        break;



      case 'awesomecheck':
      case 'greatcheck':
      case 'gaycheck':
      case 'cutecheck':
      case 'lesbiancheck':
      case 'hornycheck':
      case 'prettycheck':
      case 'lovelycheck':
      case 'uglycheck':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "😺", key: m.key } })

        if (!text) return reply(`Tag Someone, Example : ${prefix + command} @Kai`)
        const sangeh = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100']
        const sange = sangeh[Math.floor(Math.random() * sangeh.length)]
        A17.sendMessage(from, { text: `*${command}*\n\nName : ${q}\nAnswer : *${sange}%*` }, { quoted: m })
        break;


      case 'charactercheck':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🤧", key: m.key } })

        if (!text) return reply(`Tag Someone, Example : ${prefix + command} @Kai`)
        const A17tttt = ['Compassionate', 'Generous', 'Grumpy', 'Forgiving', 'Obedient', 'Good', 'Simp', 'Kind-Hearted', 'patient', 'UwU', 'top, anyway', 'Helpful']
        const taky = A17tttt[Math.floor(Math.random() * A17tttt.length)]
        A17.sendMessage(from, { text: `Character Check : ${q}\nAnswer : *${taky}*` }, { quoted: m })
        break;


      //
      case 'dare':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🌝", key: m.key } })

        const dare = [
          "eat 2 tablespoons of rice without any side dishes, if it's dragging you can drink",
          "spill people who make you pause",
          "call crush/pickle now and send ss",
          "drop only emote every time you type on gc/pc for 1 day.",
          "say Welcome to Who Wants To Be a Millionaire! to all the groups you have",
          "call ex saying miss",
          "sing the chorus of the last song you played",
          "vn your ex/crush/girlfriend, says hi (name), wants to call, just a moment. I miss🥺👉🏼👈🏼",
          "Bang on the table (which is at home) until you get scolded for being noisy",
          "Tell random people - I was just told I was your twin first, we separated, then I had plastic surgery. And this is the most ciyusss_ thing",
          "mention ex's name",
          "make 1 rhyme for the members!",
          "send ur whatsapp chat list",
          "chat random people with gheto language then ss here",
          "tell your own version of embarrassing things",
          "tag the person you hate",
          "Pretending to be possessed, for example: possessed by dog, possessed by grasshoppers, possessed by refrigerator, etc.",
          "change name to *I AM DONKEY* for 24 hours",
          "shout *ma chuda ma chuda ma chuda* in front of your house",
          "snap/post boyfriend photo/crush",
          "tell me your boyfriend type!",
          "say *i hv crush on you, do you want to be my girlfriend?* to the opposite sex, the last time you chatted (submit on wa/tele), wait for him to reply, if you have, drop here",
          "record ur voice that read *titar ke age do titar, titar ke piche do titar*",
          "prank chat ex and say *i love u, please come back.* without saying dare!",
          "chat to contact wa in the order according to your battery %, then tell him *i am lucky to hv you!*",
          "change the name to *I am a child of randi* for 5 hours",
          "type in bengali 24 hours",
          "Use selmon bhoi photo for 3 days",
          "drop a song quote then tag a suitable member for that quote",
          "send voice note saying can i call u baby?",
          "ss recent call whatsapp",
          "Say *YOU ARE SO BEAUTIFUL DON'T LIE* to guys!",
          "pop to a group member, and say fuck you",
          "Act like a chicken in front of ur parents",
          "Pick up a random book and read one page out loud in vn n send it here",
          "Open your front door and howl like a wolf for 10 seconds",
          "Take an embarrassing selfie and paste it on your profile picture",
          "Let the group choose a word and a well known song. You have to sing that song and send it in voice note",
          "Walk on your elbows and knees for as long as you can",
          "sing national anthem in voice note",
          "break;dance for 30 seconds in the sitting room😂",
          "Tell the saddest story you know",
          "make a twerk dance video and put it on status for 5mins",
          "Eat a raw piece of garlic",
          "Show the last five people you texted and what the messages said",
          "put your full name on status for 5hrs",
          "make a short dance video without any filter just with a music and put it on ur status for 5hrs",
          "call ur bestie, bitch",
          "put your photo without filter on ur status for 10mins",
          "say i love oli london in voice note🤣🤣",
          "Send a message to your ex and say I still like you",
          "call Crush/girlfriend/bestie now and screenshot here",
          "pop to one of the group member personal chat and Say you ugly bustard",
          "say YOU ARE BEAUTIFUL/HANDSOME to one of person who is in top of ur pinlist or the first person on ur chatlist",
          "send voice notes and say, can i call u baby, if u r boy tag girl/if girl tag boy",
          "write i love you (random grup member name, who is online) in personal chat, (if u r boy write girl name/if girl write boy name) take a snap of the pic and send it here",
          "use any bollywood actor photo as ur pfp for 3 days",
          "put your crush photo on status with caption, this is my crush",
          "change name to I AM GAY for 5 hours",
          "chat to any contact in whatsapp and say i will be ur bf/gf for 5hours",
          "send voice note says i hv crush on you, want to be my girlfriend/boyfriend or not? to any random person from the grup(if u girl choose boy, if boy choose girl",
          "slap ur butt hardly send the sound of slap through voice note😂",
          "state ur gf/bf type and send the photo here with caption, ugliest girl/boy in the world",
          "shout bravooooooooo and send here through voice note",
          "snap your face then send it here",
          "Send your photo with a caption, i am lesbian",
          "shout using harsh words and send it here through vn",
          "shout you bastard in front of your mom/papa",
          "change the name to i am idiot for 24 hours",
          "slap urself firmly and send the sound of slap through voice note😂",
          "say i love the bot owner Kai through voice note",
          "send your gf/bf pic here",
          "make any tiktok dance challenge video and put it on status, u can delete it after 5hrs",
          "break;up with your best friend for 5hrs without telling him/her that its a dare",
          "tell one of your frnd that u love him/her and wanna marry him/her, without telling him/her that its a dare",
          "say i love depak kalal through voice note",
          "write i am feeling horny and put it on status, u can delete it only after 5hrs",
          "write i am lesbian and put it on status, u can delete only after 5hrs",
          "kiss your mommy or papa and say i love you😌",
          "put your father name on status for 5hrs",
          "send abusive words in any grup, excepting this grup, and send screenshot proof here"
        ]
        const A17dareww = dare[Math.floor(Math.random() * dare.length)]
        buffer = await getBuffer(`https://images4.alphacoders.com/101/1016619.jpg`)
        A17.sendMessage(from, { image: buffer, caption: '*You have chosen Dare...*\n\n' + A17dareww }, { quoted: m })
        break;




      case 'truth':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🌝", key: m.key } })

        const truth = [
          "Have you ever liked anyone? How long?",
          "If you can or if you want, which gc/outside gc would you make friends with? (maybe different/same type)",
          "apa ketakutan terbesar kamu?",
          "Have you ever liked someone and felt that person likes you too?",
          "What is the name of your friend's ex-girlfriend that you used to secretly like?",
          "Have you ever stolen money from your father or mom? The reason?",
          "What makes you happy when you're sad?",
          "Ever had a one sided love? if so who? how does it feel bro?",
          "been someone's mistress?",
          "the most feared thing",
          "Who is the most influential person in your life?",
          "what proud thing did you get this year",
          "Who is the person who can make you awesome",
          "Who is the person who has ever made you very happy?",
          "Who is closest to your ideal type of partner here",
          "Who do you like to play with??",
          "Have you ever rejected people? the reason why?",
          "Mention an incident that made you hurt that you still remember",
          "What achievements have you got this year??",
          "What's your worst habit at school??",
          "What song do you sing most in the shower",
          "Have you ever had a near-death experience",
          "When was the last time you were really angry. Why?",
          "Who is the last person who called you",
          "Do you have any hidden talents, What are they",
          "What word do you hate the most?",
          "What is the last YouTube video you watched?",
          "What is the last thing you Googled",
          "Who in this group would you want to swap lives with for a week",
          "What is the scariest thing thats ever happened to you",
          "Have you ever farted and blamed it on someone else",
          "When is the last time you made someone else cry",
          "Have you ever ghosted a friend",
          "Have you ever seen a dead body",
          "Which of your family members annoys you the most and why",
          "If you had to delete one app from your phone, which one would it be",
          "What app do you waste the most time on",
          "Have you ever faked sick to get home from school",
          "What is the most embarrassing item in your room",
          "What five items would you bring if you got stuck on a desert island",
          "Have you ever laughed so hard you peed your pants",
          "Do you smell your own farts",
          "have u ever peed on the bed while sleeping ðŸ¤£ðŸ¤£",
          "What is the biggest mistake you have ever made",
          "Have you ever cheated in an exam",
          "What is the worst thing you have ever done",
          "When was the last time you cried",
          "whom do you love the most among ur parents",
          "do u sometimes put ur finger in ur nosetrilðŸ¤£",
          "who was ur crush during the school days",
          "tell honestly, do u like any boy in this grup",
          "have you ever liked anyone? how long?",
          "do you have gf/bf','what is your biggest fear?",
          "have you ever liked someone and felt that person likes you too?",
          "What is the name of your ex boyfriend of your friend that you once liked quietly?",
          "ever did you steal your mothers money or your fathers money",
          "what makes you happy when you are sad",
          "do you like someone who is in this grup? if you then who?",
          "have you ever been cheated on by people?",
          "who is the most important person in your life",
          "what proud things did you get this year",
          "who is the person who can make you happy when u r sad",
          "who is the person who ever made you feel uncomfortable",
          "have you ever lied to your parents",
          "do you still like ur ex",
          "who do you like to play together with?",
          "have you ever stolen big thing in ur life? the reason why?",
          "Mention the incident that makes you hurt that you still remember",
          "what achievements have you got this year?",
          "what was your worst habit at school?",
          "do you love the bot creator Kai?",
          "have you ever thought of taking revenge from ur teacher?",
          "do you like current prime minister of ur country",
          "you non veg or veg",
          "if you could be invisible, what is the first thing you would do",
          "what is a secret you kept from your parents",
          "Who is your secret crush",
          "whois the last person you creeped on social media",
          "If a genie granted you three wishes, what would you ask for",
          "What is your biggest regret",
          "What animal do you think you most look like",
          "How many selfies do you take a day",
          "What was your favorite childhood show",
          "if you could be a fictional character for a day, who would you choose",
          "whom do you text the most",
          "What is the biggest lie you ever told your parents",
          "Who is your celebrity crush",
          "Whats the strangest dream you have ever had",
          "do you play pubg, if you then send ur id number"
        ]
        const A17truthww = truth[Math.floor(Math.random() * truth.length)]
        buffer = await getBuffer(`https://images2.alphacoders.com/650/650812.jpg`)
        A17.sendMessage(from, { image: buffer, caption: '*You have chosen Truth...*\n' + A17truthww }, { quoted: m })
        break;




      /* ████ ✪ ███▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ [ NSFW ] ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███ ✪ ███ */




      // case 'masturbation': case 'jahy': case 'hentai': case 'glasses': case 'gangbang': case 'foot': 
      // case 'femdom': case 'cum': case 'ero': case 'cuckold': case 'blowjob': case 'bdsm': 
      // case 'ahegao': case 'ass': case 'orgy': case 'panties': case 'pussy': case 'thighs': case 'yuri': case 'tentacles':
      // // if (isBan) return reply(mess.banned);	 			
      // // if (isBanChat) return reply(mess.bangc);
      // // if (!m.isGroup) return reply(mess.grouponly);
      // // if (!AntiNsfw) return reply(mess.nonsfw)
      // // try{
      // // reply(mess.waiting)



      // // buffer = `https://fantox-apis.vercel.app/${command}`
      // // A17.sendMessage(from, {image:{url:buffer}, caption:"Here you go!"}, {quoted:m})


      // // // NoHorny = await fetchJson(`https://fantox-apis.vercel.app/${command}`)
      // // // YesHorny = await getBuffer(NoHorny.result)
      // // // A17.sendMessage(from, {image:YesHorny},{quoted:m})
      // // // } catch (e) {error("Error")}	
      // // break;

      // case 'spank':
      //   if (isBan) return reply(mess.banned);	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //   if (!AntiNsfw) return reply(mess.nonsfw)
      // reply(mess.waiting)
      // spankd = await axios.get(`https://nekos.life/api/v2/img/spank`)                                   
      // let spbuff = await getBuffer(spankd.data.url)
      // let spgif = await GIFBufferToVideoBuffer(spbuff)   
      //       await A17.sendMessage(m.chat,{video: spgif, gifPlayback:true},{ quoted:m }).catch(err => {
      //                   return reply('Error!')
      //                                   })
      // break;


      // case 'blowjobgif': case 'bj' :
      //   if (isBan) return reply(mess.banned);	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //   if (!AntiNsfw) return reply(mess.nonsfw)
      // reply(mess.waiting)
      // bjd = await axios.get(`https://api.waifu.pics/nsfw/blowjob`)         
      // let bjf = await getBuffer(bjd.data.url)
      // let bjif = await GIFBufferToVideoBuffer(bjf)   
      //       await A17.sendMessage(m.chat,{video: bjif, gifPlayback:true},{ quoted:m }).catch(err => {
      //                   return reply('error..')
      //                                   })
      // break;


      // case 'hentaivid': case 'hentaivideo': {
      //   if (isBan) return reply(mess.banned);	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //   if (!AntiNsfw) return reply(mess.nonsfw)
      // reply(mess.waiting)
      // anu = await hentai()
      // result912 = anu[Math.floor(Math.random(), anu.length)]
      // A17.sendMessage(m.chat, { video: { url: result912.video_1 }, caption: `Title : ${result912.title}\nCategory : ${result912.category}\n$Mimetype : ${result912.type}\nViews : ${result912.views_count}\nShares : ${result912.share_count}\nSource : ${result912.link}\nMedia Url : ${result912.video_1}` }, { quoted: m })
      // }
      // break;


      // case 'trap' :
      //   if (isBan) return reply(mess.banned);	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //   if (!AntiNsfw) return reply(mess.nonsfw)
      // reply(mess.waiting)
      // waifudd = await axios.get(`https://waifu.pics/api/nsfw/${command}`)       
      // /* let trapbot = [
      //   {buttonId: `${prefix}trap`, buttonText: {displayText: `>>`}, type: 1},
      //   ] */
      // let button2Messages = {
      //  image: {url:waifudd.data.url},
      //  caption:  `Here it is...`,
      // /* buttons: trapbot,
      // headerType: 1 */
      // }     
      //           await A17.sendMessage(m.chat, button2Messages, { quoted:m }).catch(err => {
      //                   return('Error!')
      //               })
      // break;


      // case 'hentai-neko' :
      // case 'hneko' :
      //   if (isBan) return reply(mess.banned);	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //   if (!AntiNsfw) return reply(mess.nonsfw)
      // reply(mess.waiting)
      //   waifudd = await axios.get(`https://waifu.pics/api/nsfw/neko`)
      // /* let hnekobot = [
      //   {buttonId: `${prefix + command}`, buttonText: {displayText: `>>`}, type: 1},
      //   ] */
      // let button3Messages = {
      //  image: {url:waifudd.data.url},
      //  caption:  `Nyaah...`,
      // /* buttons: hnekobot,
      // headerType: 1 */
      // }      
      //           await A17.sendMessage(m.chat, button3Messages, { quoted:m }).catch(err => {
      //                   return('Error!')
      //               })
      // break;


      // case 'hentai-waifu' :
      // case 'hwaifu' :
      //   if (isBan) return reply(mess.banned);	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //   if (!AntiNsfw) return reply(mess.nonsfw)
      // reply(mess.waiting)
      //   waifudd = await axios.get(`https://waifu.pics/api/nsfw/waifu`)         
      // /* let nwaifubot = [
      //   {buttonId: `${prefix + command}`, buttonText: {displayText: `>>`}, type: 1},
      //   ] */
      // let button4Messages = {
      //  image: {url:waifudd.data.url},
      //  caption:  `Here it is...`,
      // /* buttons: nwaifubot,
      // headerType: 1 */
      // }      
      //           await A17.sendMessage(m.chat, button4Messages, { quoted:m }).catch(err => {
      //                   return('Error!')
      //               })
      // break;


      // case 'gasm':
      //   if (isBan) return reply(mess.banned);	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //   if (!AntiNsfw) return reply(mess.nonsfw)
      // reply(mess.waiting)						
      // waifudd = await axios.get(`https://nekos.life/api/v2/img/${command}`)
      //                      /*    var wbuttsss = [
      //       {buttonId: `${prefix}gasm`, buttonText: {displayText: `>>`}, type: 1},
      //       ] */
      //     let buttonsssMessages = {
      //      image: {url:waifudd.data.url},
      //      caption:  `Here it is...`,
      //    /* footer: `${global.BotName}`,
      //     buttons: wbuttsss,
      //     headerType: 4 */
      //     }     
      //           await A17.sendMessage(m.chat, buttonsssMessages,{ quoted:m }).catch(err => {
      //                   return('Error!')
      //               })
      // break;  



      // /* ████ ✪ ███▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ [ Anime Mode ] ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███ ✪ ███ */


      //-----------------------------------------------------------------------------------------------------------------------------------//


      //
      case 'smug2':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        reply(mess.waiting)
        waifudd = await axios.get(`https://nekos.life/api/v2/img/smug`)
        /*       var wbuttsss = [
{buttonId: `${prefix}smug2`, buttonText: {displayText: `>>`}, type: 1},
] */
        let button1ssMessages = {
          image: { url: waifudd.data.url },
          caption: `Here it is...`,
          /*  footer: `${global.BotName}`,
            buttons: wbuttsss,
            headerType: 4 */
        }
        await A17.sendMessage(m.chat, button1ssMessages, { quoted: m }).catch(err => {
          return ('Error!')
        })
        break;


      case 'foxgirl':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "✨", key: m.key } })

        reply(mess.waiting)
        waifudd = await axios.get(`https://nekos.life/api/v2/img/fox_girl`)

        /* var wbuttsss = [
   {buttonId: `${prefix}foxgirl`, buttonText: {displayText: `>>`}, type: 1},
   ] */
        let button12ssMessages = {
          image: { url: waifudd.data.url },
          caption: `Awoooo...`,
          /* footer: `${global.BotName}`,
          buttons: wbuttsss,
          headerType: 4 */
        }
        await A17.sendMessage(m.chat, button12ssMessages, { quoted: m }).catch(err => {
          return ('Error!')
        })
        break;


      case 'animenom':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        reply(mess.waiting)
        waifudd = await axios.get(`https://waifu.pics/api/sfw/nom`)
        /*  let xxhnekobot = [
          {buttonId: `${prefix}animenom`, buttonText: {displayText: `>>`}, type: 1},
          ]  */
        let xx1button3Messages = {
          image: { url: waifudd.data.url },
          caption: `Here it is...`,
          /*  buttons: xxhnekobot,
          headerType: 1 */
        }
        await A17.sendMessage(m.chat, xx1button3Messages, { quoted: m }).catch(err => {
          return ('Error!')
        })
        break;


      case 'waifu3':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        reply(mess.waiting)
        waifudd = await axios.get(`https://nekos.life/api/v2/img/waifu`)
        /*        var wbuttsss = [
{buttonId: `${prefix}waifu3`, buttonText: {displayText: `>>`}, type: 1},
] */
        let button112ssMessages = {
          image: { url: waifudd.data.url },
          caption: `Here it is...`,
          /*   footer: `${global.BotName}`,
             buttons: wbuttsss,
             headerType: 4 */
        }
        await A17.sendMessage(m.chat, button112ssMessages, { quoted: m }).catch(err => {
          return ('Error!')
        })
        break;


      //
      case 'crossplay': case 'crosplay': case 'cosplay':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "✨", key: m.key } })

        /*   const buttons = [
   {buttonId: '-crossplay', buttonText: {displayText: '>>'}, type: 1},
       ]     */

        const cosplybutton = {
          image: { url: 'https://fantox-cosplay-api.onrender.com/' },
          caption: "Guess who am i...",
          /* footer: `${global.BotName}`,
           buttons: buttons,
           headerType: 4 */
        }

        await A17.sendMessage(m.chat, cosplybutton, { quoted: m }).catch(err => {
          return ('Error!')
        })

        break;


      case 'neko2':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        reply(mess.waiting)

        waifud = await axios.get('https://waifu.pics/api/sfw/neko')
        var wbutsss = [
          { buttonId: `${prefix}neko2`, buttonText: { displayText: `>>` }, type: 1 },
        ]
        let buttonssMessage = {
          image: { url: waifud.data.url },
          caption: `Here it is...`,
          footer: `${global.BotName}`,
          buttons: wbutsss,
          headerType: 4
        }
        await A17.sendMessage(m.chat, buttonssMessage, { quoted: m }).catch(err => {
          return ('Error!')
        })
        break;


      case 'feed':
      case 'meow':
      case 'tickle':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        reply(mess.waiting)
        waifudd = await axios.get(`https://nekos.life/api/v2/img/${command}`)
        var wbuttsss = [
          { buttonId: `${prefix + command}`, buttonText: { displayText: `>>` }, type: 1 },
        ]
        let buttonssMessages = {
          image: { url: waifudd.data.url },
          caption: `Here it is...`,
          footer: `${global.BotName}`,
          buttons: wbuttsss,
          headerType: 4
        }
        await A17.sendMessage(m.chat, buttonssMessages, { quoted: m }).catch(err => {
          return ('Error!')
        })
        break;



      //-----------------------------------------------------------------------------------------------------------------------------------//



      //
      case 'cry': case 'handhold': {

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "❤", key: m.key } })

        var pat = await fetchJson(`https://api.waifu.pics/sfw/${command}`)
        try {
          let messsender = m.sender
          let musers = ``
          try {
            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]
          } catch {
            users == "none"
            ment = [messsender, m.sender]
          }
          if (users == "none") {
            musers = `@${m.sender.split("@")[0]} ${command}ed with themself!`
            console.log(musers)

          } else {
            const rcpp = `@${users.split("@"[0])}`
            musers = `@${m.sender.split("@")[0]} ${command}ed with @${users.split("@")[0]} `

            console.log(musers)
          }
          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })
          const buffer = Buffer.from(response.data, "utf-8")
          var fetchedgif = await GIFBufferToVideoBuffer(buffer)
          A17.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })
        } catch (error) {
          console.log(error);
        }
      }
        break;


      case 'nom': {

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        var pat = await fetchJson(`https://api.waifu.pics/sfw/${command}`)
        try {
          let messsender = m.sender
          let musers = ``
          try {
            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]
          } catch {
            users == "none"
            ment = [messsender, m.sender]
          }
          if (users == "none") {
            musers = `@${m.sender.split("@")[0]} is eating with themself!`
            console.log(musers)

          } else {
            const rcpp = `@${users.split("@"[0])}`
            musers = `@${m.sender.split("@")[0]} is eating with @${users.split("@")[0]} `

            console.log(musers)
          }
          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })
          const buffer = Buffer.from(response.data, "utf-8")
          var fetchedgif = await GIFBufferToVideoBuffer(buffer)
          A17.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })
        } catch (error) {
          console.log(error);
        }
      }
        break;


      case 'hug': {

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        var pat = await fetchJson(`https://api.waifu.pics/sfw/${command}`)
        try {
          let messsender = m.sender
          let musers = ``
          try {
            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]
          } catch {
            users == "none"
            ment = [messsender, m.sender]
          }
          if (users == "none") {
            musers = `@${m.sender.split("@")[0]} hugged themself!`
            console.log(musers)

          } else {
            const rcpp = `@${users.split("@"[0])}`
            musers = `@${m.sender.split("@")[0]} hugged @${users.split("@")[0]} `

            console.log(musers)
          }
          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })
          const buffer = Buffer.from(response.data, "utf-8")
          var fetchedgif = await GIFBufferToVideoBuffer(buffer)
          A17.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })
        } catch (error) {
          console.log(error);
        }
      }
        break;


      case 'dance': {

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        var pat = await fetchJson(`https://api.waifu.pics/sfw/${command}`)
        try {
          let messsender = m.sender
          let musers = ``
          try {
            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]
          } catch {
            users == "none"
            ment = [messsender, m.sender]
          }
          if (users == "none") {
            musers = `@${m.sender.split("@")[0]} is dancing alone!!`
            console.log(musers)

          } else {
            const rcpp = `@${users.split("@"[0])}`
            musers = `@${m.sender.split("@")[0]} is dancing with @${users.split("@")[0]} `

            console.log(musers)
          }
          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })
          const buffer = Buffer.from(response.data, "utf-8")
          var fetchedgif = await GIFBufferToVideoBuffer(buffer)
          A17.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })
        } catch (error) {
          console.log(error);
        }
      }
        break;


      //
      case 'kill': case 'pat': case 'lick': case 'kiss': case 'bite':
      case 'bully': case 'bonk': case 'poke': case 'slap':
      case 'happy':
      case 'cuddle': case 'kick': {

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        var pat = await fetchJson(`https://api.waifu.pics/sfw/${command}`)
        try {
          let messsender = m.sender
          let musers = ``
          try {
            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]
          } catch {
            users == "none"
            ment = [messsender, m.sender]
          }
          if (users == "none") {
            musers = `@${m.sender.split("@")[0]} ${command}ed themselves!!`
            console.log(musers)

          } else {
            const rcpp = `@${users.split("@"[0])}`
            musers = `@${m.sender.split("@")[0]} ${command}ed  @${users.split("@")[0]} `

            console.log(musers)
          }
          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })
          const buffer = Buffer.from(response.data, "utf-8")
          var fetchedgif = await GIFBufferToVideoBuffer(buffer)
          A17.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })
        } catch (error) {
          console.log(error);
        }
      }
        break;


      case 'yeet':
      case 'wink': case 'smile':
      case 'wave': case 'blush': case 'smug': case 'glomp':
      case 'cringe': case 'highfive': {

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        var pat = await fetchJson(`https://api.waifu.pics/sfw/${command}`)
        try {
          let messsender = m.sender
          let musers = ``
          try {
            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]
          } catch {
            users == "none"
            ment = [messsender, m.sender]
          }
          if (users == "none") {
            musers = `@${m.sender.split("@")[0]} ${command}ed at themself!`
            console.log(musers)

          } else {
            const rcpp = `@${users.split("@"[0])}`
            musers = `@${m.sender.split("@")[0]} ${command}ed at @${users.split("@")[0]} `

            console.log(musers)
          }
          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })
          const buffer = Buffer.from(response.data, "utf-8")
          var fetchedgif = await GIFBufferToVideoBuffer(buffer)
          A17.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })
        } catch (error) {
          console.log(error);
        }
      }
        break;


      /*
      
      case 'cry': case 'kill': case 'hug': case 'pat': case 'lick': case 'kiss': case 'bite': case 'yeet':
      case 'bully': case 'bonk': case 'wink': case 'poke': case 'nom': case 'slap': case 'smile':
      case 'wave': case 'blush': case 'smug': case 'glomp': case 'happy': case 'dance':
      case 'cringe': case 'cuddle': case 'highfive': case 'handhold': case 'kick':
      
        if (isBan) return reply(mess.banned);	 			
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);						
      resggh = await axios.get(`https://nekos.life/api/v2/img/${command}`)         
      let resffj = await getBuffer(resggh.data.url)
      let resmain = await GIFBufferToVideoBuffer(resffj)   
          await A17.sendMessage(m.chat,{video: resmain, gifPlayback:true},{ quoted:m }).catch(err => {
                      return reply('error..')
                                      })
      break;
      
      */


      case 'megumin':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        reply(mess.waiting)
        ud = await axios.get('https://waifu.pics/api/sfw/megumin')
        /*var wbutsss = [
          {buttonId: `${prefix}megumin`, buttonText: {displayText: `>>`}, type: 1},
               ] */
        let buttonzMessage = {
          image: { url: ud.data.url },
          caption: `Here it is...`,
          /*   footer: `${global.BotName}`,
                 buttons: wbutsss,
            headerType: 4 */
        }
        await A17.sendMessage(m.chat, buttonzMessage, { quoted: m }).catch(err => {
          return ('Error!')
        })
        break;


      case 'awoo':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "✨", key: m.key } })

        reply(mess.waiting)
        waifudd = await axios.get(`https://waifu.pics/api/sfw/awoo`)
        /* var wbuttsss = [
          {buttonId: `${prefix}awoo`, buttonText: {displayText: `>>`}, type: 1},
          ] */
        let button1Messages = {
          image: { url: waifudd.data.url },
          caption: `Here it is...`,
          /*  footer: `${global.BotName}`,
          buttons: wbuttsss,
          headerType: 2 */

        }
        await A17.sendMessage(m.chat, button1Messages, { quoted: m }).catch(err => {
          return ('Error!')
        })
        break;


      case 'animewall2': case 'animewallpaper2':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        reply(mess.waiting)
        const { AnimeWallpaper } = require("anime-wallpaper")
        if (!q) return reply('Please enter a seach term!')
        const wall = new AnimeWallpaper();
        const pages = [1, 2, 3, 4];
        const random = pages[Math.floor(Math.random() * pages.length)]
        const wallpaper = await wall
          .getAnimeWall4({ title: q, type: "sfw", page: pages })
          .catch(() => null);
        const i = Math.floor(Math.random() * wallpaper.length);
        var walb = [
          { buttonId: `${prefix}animewall2 ${q}`, buttonText: { displayText: `>>` }, type: 1 },
        ]
        let wal = {
          image: { url: wallpaper[i].image },
          caption: `*Search Term :* ${q}`,
          footer: `${global.BotName}`,
          buttons: walb,
          headerType: 4
        }
        await A17.sendMessage(m.chat, wal, { quoted: m }).catch(err => {
          return ('Error!')
        })
        break;


      // case 'anime':
      //   if (isBan) return reply(mess.banned);	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //     if(!q) return reply(`Please proide a search term!\n\n*Example:* ${prefix}anime naruto`)
      // reply(mess.waiting)							
      // const { Anime } =require("@shineiichijo/marika")
      //   const client = new Anime();
      //    let anime = await client.searchAnime(q)
      //   let result = anime.data[0];
      //   console.log(result)
      //  let details = `*Title:* ${result.title}\n`;
      //   details += `*Format:* ${result.type}\n`;
      //   details += `*Status:* ${result.status.toUpperCase().replace(/\_/g, " ")}\n`;
      //   details += `*Total episodes:* ${result.episodes}\n`;
      //   details += `*Duration:* ${result.duration}\n`;
      //   details += `*Genres:*\n`;
      //   for (let i = 0; i < result.genres.length; i++) {
      //     details += `\t\t\t\t\t\t\t\t${result.genres[i].name}\n`;
      //   }
      //   details += `*Based on:* ${result.source.toUpperCase()}\n`;
      //   details += `*Studios:*\n`;
      //   for (let i = 0; i < result.studios.length; i++) {
      //     details += `\t\t\t\t\t\t\t\t${result.studios[i].name}\n`;
      //   }
      //   details += `*Producers:*\n`;
      //   for (let i = 0; i < result.producers.length; i++) {
      //     details += `\t\t\t\t\t\t\t\t\t\t${result.producers[i].name}\n`;
      //   }
      //   details += `*Premiered on:* ${result.aired.from}\n`;
      //   details += `*Ended on:* ${result.aired.to}\n`;
      //   details += `*Popularity:* ${result.popularity}\n`;
      //   details += `*Favorites:* ${result.favorites}\n`;
      //   details += `*Rating:* ${result.rating}\n`;
      //   details += `*Rank:* ${result.rank}\n\n`;
      //   if (result.trailer.url !== null)
      //     details += `*Trailer:* ${result.trailer.url}\n\n`;
      //   details += `*URL:* ${result.url}\n\n`;
      //   if (result.background !== null)
      //     details += `*Background:* ${result.background}\n\n`;
      //   details += `*Description:* ${result.synopsis.replace(
      //     /\[Written by MAL Rewrite]/g,
      //     ""
      //   )}`
      // A17.sendMessage(m.chat,{image:{url:result.images.jpg.large_image_url},caption:details},{quoted:m})   
      // break;


      //
      case 'anime': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "🍁", key: m.key } });
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}anime naruto`)

        const malScraper = require('mal-scraper')
        reply(mess.waiting);
        const anime = await malScraper.getInfoFromName(text).catch(() => null)
        if (!anime) return reply(`${p}Could not find your scarch`)
        let animetxt = `
  🎀 *Title: ${anime.title}*
  🎋 *Type: ${anime.type}*
  🎐 *Premiered on: ${anime.premiered}*
  💠 *Total Episodes: ${anime.episodes}*
  📈 *Status: ${anime.status}*
  💮 *Genres: ${anime.genres}
  📍 *Studio: ${anime.studios}*
  🌟 *Score: ${anime.score}*
  💎 *Rating: ${anime.rating}*
  🏅 *Rank: ${anime.ranked}*
  💫 *Popularity: ${anime.popularity}*
  ♦️ *Trailer: ${anime.trailer}*
  🌐 *URL: ${anime.url}*
  ❄ *Description:* ${anime.synopsis}*`
        await A17.sendMessage(m.chat, { image: { url: anime.picture }, caption: animetxt }, { quoted: m })
      }
        break;


      case 'manga':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "🍁", key: m.key } })

        reply(mess.waiting)
        const { Manga } = require("@shineiichijo/marika")
        const manga = new Manga();
        if (!q) return reply(`Please proide a search term!\n\n_Example:_ ${prefix}manga naruto`)
        let srh = await manga.searchManga(q)
        let mang = `*Title:* ${srh.data[0].title}\n`;
        mang += `*Status:* ${srh.data[0].status}\n`;
        mang += `*Total Volumes:* ${srh.data[0].volumes}\n`;
        mang += `*Total Chapters:* ${srh.data[0].chapters}\n`;
        mang += `*Genres:*\n`;
        for (let i = 0; i < srh.data[0].genres.length; i++) {
          mang += `\t\t\t\t\t\t\t\t${srh.data[0].genres[i].name}\n`;
        }
        mang += `*Published on:* ${srh.data[0].published.from}\n`;
        mang += `*Score:* ${srh.data[0].scored}\n`;
        mang += `*Popularity:* ${srh.data[0].popularity}\n`;
        mang += `*Favorites:* ${srh.data[0].favorites}\n`;
        mang += `*Authors:*\n`;
        for (let i = 0; i < srh.data[0].authors.length; i++) {
          mang += `\t\t\t\t\t\t\t\t\t${srh.data[0].authors[i].name} (${srh.data[0].authors[0].type})\n`;
        }
        mang += `\n*URL:* ${srh.data[0].url}\n\n`;
        if (srh.data[0].background !== null)
          mang += `*Background:* ${srh.data[0].background}`;
        mang += `*Description:* ${srh.data[0].synopsis.replace(
          /\[Written by MAL Rewrite]/g,
          ""
        )}`;
        A17.sendMessage(m.chat, { image: { url: srh.data[0].images.jpg.large_image_url }, caption: mang }, { quoted: m })
        break;


      case 'waifu':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        reply(mess.waiting)
        waifuddd = await axios.get('https://waifu.pics/api/sfw/waifu')
        /*var wbuttsssr = [
          {buttonId: `${prefix}waifu`, buttonText: {displayText: `>>`}, type: 1},
          ] */
        let button4Messagess = {
          image: { url: waifuddd.data.url },
          caption: 'More than one waifu will definitely ruin your Laifu!',
          /*buttons: wbuttsssr,
          headerType: 4 */
        }

        await A17.sendMessage(m.chat, button4Messagess, { quoted: m }).catch(err => {
          return ('error..')
        })
        break;


      case 'neko':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        reply(mess.waiting)
        waifuddd = await axios.get('https://waifu.pics/api/sfw/neko')
        /*var wbuttsssr = [
          {buttonId: `${prefix}neko`, buttonText: {displayText: `>>`}, type: 1},
          ] */
        let buttonMessagessf = {
          image: { url: waifuddd.data.url },
          caption: 'Nyaa...',
          /*    buttons: wbuttsssr,
              headerType: 2  */
        }

        await A17.sendMessage(m.chat, buttonMessagessf, { quoted: m }).catch(err => {
          return ('error..')
        })
        break;


      case 'loli':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        reply(mess.waiting)
        waifuddd = await axios.get('https://waifu.pics/api/sfw/shinobu')
        /* var wbuttsssr = [
          {buttonId: `${prefix}loli`, buttonText: {displayText: `>>`}, type: 1},
          ] */
        let buttonMessagessfgr = {
          image: { url: waifuddd.data.url },
          caption: 'Dont be a lolicon !',
          /*  buttons: wbuttsssr,
            headerType: 2 */
        }

        await A17.sendMessage(m.chat, buttonMessagessfgr, { quoted: m }).catch(err => {
          return ('error..')
        })
        break;


      //-----------------------------------------------------------------------------------------------------------------------------------//


      // case 'remove': {

      //   if (!m.isGroup) return reply(mess.grouponly);
      //   if (!isBotAdmins) return reply(mess.botadmin);
      //   if (!isAdmins && !isCreator) return reply(mess.useradmin)
      //   let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
      //   await A17.groupParticipantsUpdate(m.chat, [users], 'remove')
      // }
      //   break;



      //-----------------------------------------------------------------------------------------------------------------------------------//



      // case 'bc': case 'broadcast': case 'bcall': {
      //   if (isBan) return reply(mess.banned);
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!isCreator) return reply(mess.botowner)
      //   if (!args.join(" ")) return reply(`Please enter some text to broadcast! \n\nExample : ${prefix + command} ${global.OwnerName}`)
      //   let anu = await store.chats.all().map(v => v.id)
      //   reply(`Send Broadcast To ${anu.length} Chat\nTime's up ${anu.length * 1.5} second`)
      //   for (let yoi of anu) {
      //     await sleep(1500)
      //     let btn = [{
      //       quickreplyButton: {
      //         displayText: '💡 exit 💡',
      //         id: `${}exit`
      //       }
      //     }, {
      //       quickreplyButton: {
      //         displayText: 'Bot Owner',
      //         id: '-owner'
      //       }
      //     }]
      //     let txt = `「 *${global.OwnerName}'s Broadcast* 」\n\n${text}`
      //     A17.send5ButImg(yoi, txt, `${global.BotName}`, BotLogo, btn, Thumb)
      //   }
      //   reply('Broadcast Sent !')
      // }
      //   break;

      case 'bc': case 'broadcast': case 'bcall': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        if (!args.join(" ")) return reply(`Please enter some text to broadcast! \n\nExample : ${prefix + command} ${global.OwnerName}`)
        let anu = await store.chats.all().map(v => v.id)
        reply(`Send Broadcast To ${anu.length} Chat\nTime's up ${anu.length * 1.5} second`)
        for (let yoi of anu) {
          await sleep(1500)
          let btn = [{
            quickreplyButton: {
              displayText: '💡 Menu 💡',
              id: '-menu'
            }
          }, {
            quickreplyButton: {
              displayText: 'Bot Owner',
              id: '-owner'
            }
          }]
          let txt = `「 *${global.OwnerName}'s Notice* 」\n\n${text}`
          A17.send5ButImg(yoi, txt, `${global.BotName}`, BotLogo, btn, Thumb)
        }
        reply('Broadcast Sent !')
      }
        break;

case 'promosi':
case 'bcgroup': {
    if (isBan) return reply(mess.banned);
    if (isBanChat) return reply(mess.bangc);
    if (!isCreator) return reply(mess.botowner);

    // Ambil semua grup
    let getGroups = await A17.groupFetchAllParticipating();
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1]);
    let anu = groups.map(v => v.id);

    // Fungsi untuk membaca file JSON
    function readJSON(filePath) {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const parsed = JSON.parse(data);
            return parsed.text && parsed.text.trim() ? parsed.text : null;
        } catch (err) {
            console.error(`Error reading ${filePath}:`, err);
            return null;
        }
    }

    // Membaca pesan dari file JSON
    const promoText = readJSON('./database/promo.json');
    const autoscriptText = readJSON('./database/autoscript.json');
    const recodeText = readJSON('./database/recode.json');
    const vpsText = readJSON('./database/VPs.json');

    // Periksa apakah ada pesan yang tersedia
    if (!promoText && !autoscriptText && !recodeText && !vpsText) {
        return reply('❌ Semua pesan kosong! Harap atur pesan dengan perintah terkait.');
    }

    reply(`Starting broadcast to ${anu.length} Group Chat(s).`);

    // Fungsi untuk membuat jeda random
    const randomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Fungsi untuk mengirim pesan ke grup dengan delay
    const sendBatchMessages = async (groupBatch) => {
        for (let groupId of groupBatch) {
            try {
                const groupMembers = await A17.groupMetadata(groupId);

                // Kirim pesan Promo
                if (promoText) {
                    await A17.sendMessage(groupId, {
                        text: promoText,
                        contextInfo: {
                            externalAdReply: {
                                showAdAttribution: true,
                                title: `${nowtime}`,
                                body: 'Promo Terbaru dari Peyx Store',
                                thumbnail: global.Thumb,
                                sourceUrl: global.website,
                                mediaType: 1,
                                renderLargerThumbnail: true,
                            },
                        },
                    });
                }

                // Kirim pesan Autoscript
                if (autoscriptText) {
                    await A17.sendMessage(groupId, {
                        text: autoscriptText,
                        contextInfo: {
                            externalAdReply: {
                                showAdAttribution: true,
                                title: `${nowtime}`,
                                body: 'Autoscript Tunneling by Peyx Store',
                                thumbnail: global.Thumb,
                                sourceUrl: global.website,
                                mediaType: 1,
                                renderLargerThumbnail: true,
                            },
                        },
                    });
                }
                
                // Kirim pesan Jasa Recode
                if (recodeText) {
                    await A17.sendMessage(groupId, {
                        text: recodeText,
                        contextInfo: {
                            externalAdReply: {
                                showAdAttribution: true,
                                title: `${nowtime}`,
                                body: 'Top up Peyx Store',
                                thumbnail: global.Thumb,
                                sourceUrl: global.website,
                                mediaType: 1,
                                renderLargerThumbnail: true,
                            },
                        },
                    });
                }

                // Kirim pesan VPS
                if (vpsText) {
                    await A17.sendMessage(groupId, {
                        text: vpsText,
                        contextInfo: {
                            externalAdReply: {
                                showAdAttribution: true,
                                title: `${nowtime}`,
                                thumbnail: global.Thumb,
                                sourceUrl: global.website,
                                mediaType: 1,
                                renderLargerThumbnail: true,
                            },
                        },
                    });
                }

                // Jeda random antara 2 hingga 5 detik
                await new Promise((resolve) => setTimeout(resolve, randomDelay(2000, 5000)));
            } catch (err) {
                console.error(`Error sending to group ${groupId}:`, err);
            }
        }
    };

    // Membagi grup menjadi batch
    const batchSize = 5; // Kirim ke 5 grup per batch
    for (let i = 0; i < anu.length; i += batchSize) {
        const groupBatch = anu.slice(i, i + batchSize);
        await sendBatchMessages(groupBatch);

        // Jeda random antar batch (10 hingga 15 detik)
        await new Promise((resolve) => setTimeout(resolve, randomDelay(10000, 15000)));
    }

    reply(`Promosi successfully sent to ${anu.length} Group Chat(s).`);
    break;
}

case 'promosibot': {
    if (isBan) return reply(mess.banned);
    if (isBanChat) return reply(mess.bangc);
    if (!isCreator) return reply(mess.botowner);

    // Ambil semua grup
    let getGroups = await A17.groupFetchAllParticipating();
    let groups = Object.entries(getGroups).map(entry => entry[1]);
    let anu = groups.map(v => v.id);

    // Fungsi untuk membaca file JSON
    function readJSON(filePath) {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const parsed = JSON.parse(data);
            return parsed.text && parsed.text.trim() ? parsed.text : null;
        } catch (err) {
            console.error(`Error reading ${filePath}:`, err);
            return null;
        }
    }

    // Membaca pesan dari file JSON
    const promoText = readJSON('./database/promo.json');
    const autoscriptText = readJSON('./database/autoscript.json');
    const recodeText = readJSON('./database/recode.json');

    // Periksa apakah ada pesan yang tersedia
    if (!promoText && !autoscriptText && !recodeText) {
        return reply('❌ Semua pesan kosong! Harap atur pesan dengan perintah terkait.');
    }

    reply(`📢 Memulai promosi ke ${anu.length} grup.`);

    // Fungsi untuk membuat jeda random
    const randomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Fungsi untuk mengirim pesan ke grup dengan delay
    const sendBatchMessages = async (groupBatch) => {
        for (let groupId of groupBatch) {
            try {
                await slideButton(groupId);
            } catch (error) {
                console.error(`❌ Gagal mengirim ke grup ${groupId}:`, error);
            }
            await new Promise(resolve => setTimeout(resolve, randomDelay(2000, 5000))); // Jeda antar pesan dalam batch
        }
    };

    // Membagi grup menjadi batch
    const batchSize = 5; // Kirim ke 5 grup per batch
    for (let i = 0; i < anu.length; i += batchSize) {
        const groupBatch = anu.slice(i, i + batchSize);
        await sendBatchMessages(groupBatch);

        // Jeda random antar batch (10 hingga 15 detik)
        await new Promise(resolve => setTimeout(resolve, randomDelay(10000, 15000)));
    }

    reply(`✅ Promosi berhasil dikirim ke ${anu.length} grup.`);
    break;
}

		
case 'send': {
  try {
    if (isBan) return reply(mess.banned);
    if (isBanChat) return reply(mess.bangc);
    if (!isCreator) return reply(mess.botowner);

    // Memastikan bahwa args ada
    if (!args.join("")) return reply(`Contoh perintah: send +62 851-6571-8519`);

    // Gabungkan args menjadi satu string
    const swn = args.join(" ");
    
    // Mengambil nomor target dan memisahkan pesan
    const target = swn.split(".")[0];  // Ambil bagian pertama (nomor)

    // Memastikan nomor telepon valid
    const targetNumber = target.replace(/[^0-9]/g, ''); // Hapus karakter non-digit

    // Mengecek apakah nomor valid (memiliki panjang minimal 10 digit)
    if (targetNumber.length < 10) {
      return reply(`Nomor telepon ${targetNumber} tidak valid. Pastikan nomor telepon lengkap dan benar.`);
    }

    // Format nomor WhatsApp yang benar
    var org = targetNumber + '@s.whatsapp.net'; 

    // Fungsi untuk membaca file JSON
    const readJson = (filePath) => {
      try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data).text || "";
      } catch (err) {
        console.error(`Error membaca file ${filePath}:`, err);
        return ""; // Mengembalikan string kosong jika file error
      }
    };

    // Membaca file JSON
    const promoText = readJson('./database/promo.json');
    const autoscriptText = readJson('./database/autoscript.json');
    const recodeText = readJson('./database/recode.json');
    const vpsText = readJson('./database/VPs.json');

    // Fungsi untuk mengirim pesan dengan format terpisah
    const sendFormattedMessage = async (title, body) => {
      if (body) {
        let message = {
          text: `📢 ${body}`,
          contextInfo: {
            externalAdReply: {
              showAdAttribution: true,
              title: `${nowtime}`,
              body: title,
              thumbnail: global.Thumb,
              sourceUrl: global.website,
              mediaType: 1,
              renderLargerThumbnail: true
            }
          }
        };
        await A17.sendMessage(org, message);
        await sleep(1500); // Delay antar pesan
      }
    };

    // Kirim pesan Promo jika ada
    await sendFormattedMessage(
      "Promo Terbaru",
      promoText,
      'https://telegra.ph/file/a9398dd23261b48b5b5c2.jpg'
    );

    // Kirim pesan Autoscript jika ada
    await sendFormattedMessage(
      "Autoscript Tunneling",
      autoscriptText,
      'https://telegra.ph/file/d7c3d152d9fff8f85ee62.jpg'
    );
    
    // Kirim pesan Autoscript jika ada
    await sendFormattedMessage(
      "PPOB & TOP UP GAME",
      recodeText,
      'https://telegra.ph/file/d7c3d152d9fff8f85ee62.jpg'
    );

    // Kirim pesan VPS jika ada
    await sendFormattedMessage(
      "VPS TUNNELING",
      vpsText,
      'https://telegra.ph/file/5dcae7a3d0b3c4d3f60c4.jpg'
    );

    // Cek apakah semua file kosong
    if (!promoText && !autoscriptText && !vpsText) {
      return reply(`❌ Semua pesan kosong!\nGunakan perintah:\n- *${prefix}setpromo <text>*\n- *${prefix}setautoscript <text>*\n*${prefix}setppob <text>*\n- *${prefix}setvps <text>*`);
    }

    reply('✅ *Preview Pesan Berhasil Dikirim!*');

  } catch (error) {
    console.error("Error saat membaca file promo/autoscript/recode/vps:", error);
    reply('❌ Terjadi kesalahan saat menampilkan preview pesan. Pastikan format file JSON sudah benar.');
  }
  break;
}



      case 'help':
      case 'h':
      case 'listmenu': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        try {
          await A17.sendMessage(from, { react: { text: "✨", key: m.key } });


          const helpexitText = `\nHello ${pushname} Dear...!! Selamat Datang ,
          
          
             ⌯  Date : ${kaidate}
          
          
            〢━ 〄 Bot Info 〄 ━〢
          
   ⌯  My prefix is :  ${prefix}
   ⌯  Bot usr name : ${pushname} 
   ⌯  Owner name : ${global.OwnerName} 
   ⌯  Runtime : ${runtime(process.uptime())} 
   ⌯  RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
   ⌯  Total CPU Usage: ${totalCpuUsage}%
   ⌯  Platform : Linux
          
          
            〢━ 〄 Core 〄 ━〢
          
          
            ⌯   ${prefix}repo
            ⌯   ${prefix}script
            ⌯   ${prefix}speak
            ⌯   ${prefix}support
            ⌯   ${prefix}stalk
            ⌯   ${prefix}setprefix
            ⌯   ${prefix}auto-status
            ⌯   ${prefix}auto-typing
            ⌯   ${prefix}auto-recoding
          
          
      〢━ ⌬ Owner Only ⌬ ━〢
          
          
            ⌯   ${prefix}join
            ⌯   ${prefix}self
            ⌯   ${prefix}public
            ⌯   ${prefix}sleep
            ⌯   ${prefix}setbotpp
            ⌯   ${prefix}post
            ⌯   ${prefix}listonline
            ⌯   ${prefix}listgc
            ⌯   ${prefix}listpc
            ⌯   ${prefix}getcase
            ⌯   ${prefix}bangroup
            ⌯   ${prefix}broadcast
            ⌯   ${prefix}bye
            ⌯   ${prefix}block
            ⌯   ${prefix}unblock
            ⌯   ${prefix}ban add
            ⌯   ${prefix}ban del
          
           
      〢━❅ Group Moderation ❅━〢
          
          
            ⌯   ${prefix}add
            ⌯   ${prefix}invite
            ⌯   ${prefix}remove
            ⌯   ${prefix}promote
            ⌯   ${prefix}demote
            ⌯   ${prefix}grouplink
            ⌯   ${prefix}group-event
            ⌯   ${prefix}groupsetting
            ⌯   ${prefix}setname
            ⌯   ${prefix}setgcpp
            ⌯   ${prefix}setdesc
            ⌯   ${prefix}revoke
            ⌯   ${prefix}tagall
            ⌯   ${prefix}hidetag
            ⌯   ${prefix}nsfw
            ⌯   ${prefix}nsnfwexit
          
          
        〢━❗ Anti Link ❗ ━〢
          
            
            ⌯   ${prefix}antilinkgc
            ⌯   ${prefix}antilinktt
            ⌯   ${prefix}antilinkytch
            ⌯   ${prefix}antilinkytch
            ⌯   ${prefix}antilinkig
            ⌯   ${prefix}antilinkfb
            ⌯   ${prefix}antilinktwit
            ⌯   ${prefix}antiwame
            ⌯   ${prefix}antilinkall
            
          
        〢━ 🔍 Search 🔎 ━〢
            
           
            ⌯   ${prefix}play
            ⌯   ${prefix}song
            ⌯   ${prefix}video
            ⌯   ${prefix}ytmp3
            ⌯   ${prefix}ytmp4 
            ⌯   ${prefix}yts
            ⌯   ${prefix}lyrics
            ⌯   ${prefix}movie
            ⌯   ${prefix}google
            ⌯   ${prefix}gimage
            ⌯   ${prefix}pinterest
            ⌯   ${prefix}wallpaper
            ⌯   ${prefix}image
            ⌯   ${prefix}searchgc
            ⌯   ${prefix}wikimedia          
          
      〢━ 🌌 Downloader 🌌 ━〢
           
          
            ⌯   ${prefix}ytvideo
            ⌯   ${prefix}mediafire
            ⌯   ${prefix}instagram
            ⌯   ${prefix}igtv
            ⌯   ${prefix}facebook
            ⌯   ${prefix}fbmp3
            ⌯   ${prefix}twitter
            ⌯   ${prefix}twittermp3
            ⌯   ${prefix}tiktok
            ⌯   ${prefix}tiktokaudio
            ⌯   ${prefix}happymod
            ⌯   ${prefix}tiktoknowm
          
           
           〢━ 🎐 Fun 🎐 ━〢
            
          
            ⌯   ${prefix}reaction
            ⌯   ${prefix}cutecheck
            ⌯   ${prefix}couple
            ⌯   ${prefix}soulmate
            ⌯   ${prefix}handsomecheck
            ⌯   ${prefix}beautifulcheck
            ⌯   ${prefix}awesomecheck
            ⌯   ${prefix}greatcheck
            ⌯   ${prefix}gaycheck
            ⌯   ${prefix}uglycheck
            ⌯   ${prefix}charactercheck
            ⌯   ${prefix}lesbiancheck
            ⌯   ${prefix}hornychec
            ⌯   ${prefix}prettycheck
            ⌯   ${prefix}lovelycheck
          
          
          〢━ 🈴 Weeb 🈴 ━〢
          
            
            ⌯   ${prefix}anime
            ⌯   ${prefix}animestory
            ⌯   ${prefix}awoo
            ⌯   ${prefix}manga
            ⌯   ${prefix}animewall
            ⌯   ${prefix}animewallpaper2
            ⌯   ${prefix}crosplay
            ⌯   ${prefix}animenom
            ⌯   ${prefix}feed
            ⌯   ${prefix}foxgirl
            ⌯   ${prefix}waifu
            ⌯   ${prefix}waifu2
            ⌯   ${prefix}waifu3
            ⌯   ${prefix}loli
            ⌯   ${prefix}coffee
            ⌯   ${prefix}tickle
            ⌯   ${prefix}meow
            ⌯   ${prefix}neko
            ⌯   ${prefix}neko2
            ⌯   ${prefix}migumin
            ⌯   ${prefix}wallpaper
            ⌯   ${prefix}animequote
           
          
      〢━ ♨ Informative ♨ ━〢
            
          
            ⌯   ${prefix}quote
            ⌯   ${prefix}weather
            ⌯   ${prefix}covid
            ⌯   ${prefix}earthquake
            ⌯   ${prefix}wiki
            ⌯   ${prefix}stalknumber
          
          
        〢━ 🪁 Essentials 🪁 ━〢
           
            
            ⌯   ${prefix}qr
            ⌯   ${prefix}say
            ⌯   ${prefix}fliptext
            ⌯   ${prefix}toletter
            ⌯   ${prefix}translate, 
            
           
        〢━ 🎗 Others 🎗 ━〢
          
          
            ⌯   ${prefix}stickermeme
            ⌯   ${prefix}quotes
            ⌯   ${prefix}report
            ⌯   ${prefix}afk
            ⌯   ${prefix}darkjoke
            
          
            〢━━━━━━━━━━━━━━〢
            ⌯   ${prefix}<Command name>.
            ⌯  
            ⌯  type ${prefix}support.
            ⌯   for group support.
            ⌯  
            ⌯  
            ⌯   🍁 Type ${prefix}help to get
            ⌯     full command list.
            ┬│▸
            ╰────────────···▸`;

A17.sendMessage(m.chat, {
            text: helpexitText,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: BotName,
                    body: `Follow Saluran Kami`,
                    thumbnail: global.Thumb,
                    sourceUrl: global.website,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (err) {
        console.error('Error sending help menu:', err);
        reply('Oops, terjadi kesalahan saat mengirim menu bantuan.');
    }
    break;
}


      case 'menu':
      case 'allmenu': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        try {
          await A17.sendMessage(from, { react: { text: "✨", key: m.key } });


          const helpexitText = `\nHello ${pushname} Dear...!! Selamat Datang ,
          
          
             ⌯  Date : ${kaidate}
          
          
            〢━ 〄 Bot Info 〄 ━〢
          
   ⌯  My prefix is :  ${prefix}
   ⌯  Username : ${pushname} 
   ⌯  Owner name : ${global.OwnerName} 
   ⌯  Runtime : ${runtime(process.uptime())} 
   ⌯  RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
   ⌯  Total CPU Usage: ${totalCpuUsage}%
   ⌯  Platform : Linux
          
          
╭─❏  *MENU VPN*
│
│ ▧  ${prefix}list
│ ▧  ${prefix}harga
│ ▧  ${prefix}ordervps
│ ▧  ${prefix}promo
│ ▧  ${prefix}server
│ ▧  ${prefix}autoscript
│ ▧  ${prefix}menuserver
│ ▧  ${prefix}menuowner
│
├─❏  *MENU PPOB*
│ 
│ ▧  ${prefix}topupdiamond
│ ▧  ${prefix}tokenlistrik
│ ▧  ${prefix}kuotadata
│ ▧  ${prefix}isipulsa
│
├─❏  *PAYMENT*
│ 
│ ▧  ${prefix}sendpay
│ ▧  dana
│ ▧  pay
└─────────────❏

©2025 PX STORE`;

A17.sendMessage(m.chat, {
            text: helpexitText,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: BotName,
                    body: `Follow Saluran Kami`,
                    thumbnail: global.Thumb,
                    sourceUrl: global.website,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (err) {
        console.error('Error sending help menu:', err);
        reply('Oops, terjadi kesalahan saat mengirim menu bantuan.');
    }
    break;
}

      case 'support': case 'supportgc': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        A17.sendMessage(from, { react: { text: "💫", key: m.key } })
        reply(`⚙ *My developer's group:* ⚙ https://chat.whatsapp.com/LXNFSIMP3wD4mMq2jZAx3v`)
      }
        break;


case 'tutor':
case 'tutorial': {
        if (!isBan) return reply(mess.banned);
        if (!isBanChat) return reply(mess.bangc);

const list_tutorial = `_Berikut Tutorial Yang Disesdiakan!!_

_*⭔ Tutorial Lengkap*_
https://www.youtube.com/playlist?list=PLTDz6Tj-46qMZMS299iOlAvMpjmxV0Nlr

_*⭔ Tutorial Versi Textnya Kamu Bisa Ketik list di bawah*_

.pasangconfighcv2ray
.pasangconfigdrak
.pasangconfigv2box
.carabeli`

A17.sendMessage(m.chat, {
    text: list_tutorial,
    contextInfo: {
        externalAdReply: {
            showAdAttribution: true,
            title: `${nowtime} ${pushname}`,
            body: global.BotName,
            thumbnailUrl: 'https://i.ytimg.com/vi/cfIi2pvMffo/hqdefault.jpg', // Thumbnail harus berupa URL gambar
            sourceUrl: 'https://www.youtube.com/playlist?list=PLTDz6Tj-46qMZMS299iOlAvMpjmxV0Nlr', // URL video atau playlist
            mediaType: 1, // Untuk media seperti video atau gambar
			renderLargerThumbnail: true
        }
    }
});
}
break


case 'pasangconfighcv2ray': {

const gantisound = `_*⭔ Cara Memasang Config V2ray HC*_

_*⭔ Langkah 1*
Copy Akun Yang Diberikan Oleh Admin Biasanya Diawali dengan VMESS:// atau VLESS:// atau Trojan://

_*⭔ Langkah 2*_
Masuk Apk Http Custom Dan Pilih Gambar Potongan Pasel 🧩 Sebelah Tulisan HTTP Custom

_*⭔ Langkah 3*_
Pilih V2ray Setting Dan Pastekan text yang Sudah dicopy Sebelumnya
(Anda Juga Bisa melakukan Paste dengan gambar papan 📋 Pada Pojok Kanan Atas)

_*⭔ Langkah 4*_
Kemudian Kembali dengan Panah back Atau Tombol kembali, Ceklist V2ray dan Klik Connect`;
reply(gantisound)

}
break



case 'pasangconfigdrak': {

const gantifotomenu = `_*⭔ Cara Memasang Config DrakTunnel*_

_*⭔ Langkah 1*_
Copy Akun Yang Diberikan Oleh Admin Biasanya Diawali dengan VMESS:// atau VLESS:// atau Trojan:// atau draktunnel://

_*⭔ Langkah 2*_
Buka Apk DrakTunnel Kemudian Pilih Titik Tiga Pada Pijok Kanan Atas

_*⭔ Langkah 3*_
pilih Config Kemudian Pilih Import Config Kemudian Pilih Clipboard

_*⭔ Langkah 4*_
Muncul Konfirmasi Dengan Nama Akun, Pilih OK

_*⭔ Langkah 5*_
Kemudian Klik Connect pada halaman DrakTunnel`;
reply(gantifotomenu)

}
break




case 'pasangconfigv2box': {

const gantiowner = `_*⭔ Cara Memasang Config V2BOX*_

_*⭔ Langkah 1*_
Copy Akun Yang Diberikan Oleh Admin Biasanya Diawali dengan VMESS:// atau VLESS:// atau Trojan://

_*⭔ Langkah 2*_
Buka Apk *V2box* Dan Pilih Tab *Config* Pada Halaman Awal 
(Biasaya ada di bagian bawah tengah)

_*⭔ Langkah 3*_
Pilih Tombol Plus ➕ Pada Bagian Pojok Atas Layar, Pilih Paste Uri Urutan Pertama sendiri,

_*⭔ Langkah 4*_
Config akan Masuk Ke dalam List, pilih Config yang baru saja Masuk Dan Klik Connect`;
reply(gantiowner)

}
break


case 'carabeli': {

    const gantisuperowner = `_*⭔ Cara Membeli Config Premium*_
    
    _*⭔ Langkah 1*_
    Silahkan Hubungin Whatasapp Admin di Whatsapp.nevpn.site / Nomor Bot ini
    
    _*⭔ Langkah 2*_
    Infokan Kepada Admin [contoh]
	Nama anda : Abdul Putra [Abdul]
    Config : sesuai Paket aktif [XL Edukasi]
	Lokasi : Posisi Anda Saat ini [Jabar]
	Harga : Harga Yang anda Inginkan [10 K]
	
    _*⭔ Langkah 3*_
    Lakukan Pembayaran Dan Kirimkan Bukti pembayaran Kepada Admin
	Biasanya Admin Akan Mengirim Nomer Dana Namun Jika Anda Ingin Melaui Qriss Mintalah
	Foto Qris Kepada Admin,
    
    _*⭔ Langkah 4*_
    Tunggulah Sebentar Admin akan Sesegera Mungkin Membuatkan Config Pesanan Anda`;
    reply(gantisuperowner)
    
    }
    break

      case 'menuowner': case 'bug': case '`info bug config`': {
		if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        const helpexit = `Hi kak *${pushname}* Selamat Datang ,
  

┏ ┅ ━━〔〄 *MENU OWNER* 〄 〕━ ┅ 
┃  
┃  ⌯   ${prefix}ping
┃  ⌯   ${prefix}all
┃  ⌯   ${prefix}welcome on
┃  ⌯   ${prefix}welcome of
┃  ⌯   ${prefix}setpromo
┃  ⌯   ${prefix}promosibot
┃  ⌯   ${prefix}promosi
┃  ⌯   ${prefix}addmod
┃  ⌯   ${prefix}delmod
┃  ⌯   ${prefix}listonline
┃  ⌯   ${prefix}joinall on
┃  ⌯   ${prefix}joinall off
┃  ⌯   ${prefix}restart
┃  ⌯   ${prefix}setvps
┃  ⌯   ${prefix}setautosc
┃  ⌯   ${prefix}setppob
┃  ⌯   ${prefix}join
┃  ⌯   ${prefix}self
┃  ⌯   ${prefix}public
┃  ⌯   ${prefix}sleep
┃  ⌯   ${prefix}setbotpp
┃  ⌯   ${prefix}post
┃  ⌯   ${prefix}listonline
┃  ⌯   ${prefix}listgc
┃  ⌯   ${prefix}listpc
┃  ⌯   ${prefix}getcase
┃  ⌯   ${prefix}bangroup
┃  ⌯   ${prefix}broadcast
┃  ⌯   ${prefix}bye
┃  ⌯   ${prefix}block
┃  ⌯   ${prefix}unblock
┃  ⌯   ${prefix}ban add
┃  ⌯   ${prefix}ban del
┃
┗ ┅ ━━━━━━━━━━━ ┅ ━

┏ ┅ ━〔 *THX TO..* ━━━〢
┃⌯ ALLAH SWT
┃⌯ ©PX STORE
┗ ┅ ━━━━━━━━━━━ ┅ ━`

A17.sendMessage(m.chat, {
    text : helpexit,
    contextInfo: {
    externalAdReply: {
        showAdAttribution: true, 
        title: `${nowtime} ${pushname}`,
        body: global.BotName,
        thumbnail: global.Thumb,
        sourceUrl: global.website,
        mediaType: 1,
        renderLargerThumbnail: true
    }
    }
}
)
	  }
        break;

      case 'tselopok': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🚀", key: m.key } })
        const helpexit = `*◇━━━ILPED OPOK KALSEL & SUMSEL UNLI━━━◇*
Payload :
		
GET /cdn-cgi/trace HTTP/1.1[crlf]Host: [rotate=tsel.me;loop.co.id][crlf]Expect: 200-continue[crlf][crlf][split][crlf][crlf]CF-RAY / HTTP/1.1[crlf]Host: [host][crlf]Upgrade: Websocket[crlf]Connection: Keep-Alive[crlf]User-Agent: [ua][crlf]Upgrade: websocket[crlf][crlf]

Proxy : 172.67.175.171:80`

        await A17.sendMessage(m.chat, {
              text : helpexit,
              contextInfo: {
              externalAdReply: {
                showAdAttribution: true, 
                title: `${nowtime} ${pushname}`,
                body: global.BotName,
                thumbnail: global.Thumb,
                sourceUrl: global.website,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
      })
	}
        break;
		
      case 'tselilped': case 'tselruangguru': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🚀", key: m.key } })
        const helpexit = `*◇━━━ILPED/RGURU TSEL━━━◇*\n\nPAYLOAD\nGET /cdn-cgi/trace HTTP/1.1[crlf]Host: bakrie.ac.id[crlf]Connection: Keep-Alive[crlf][crlf]GET-RAY / HTTP/1.1[crlf]Host: [host][crlf]Upgrade: websocket[crlf][crlf]\n\nProxy\nbakrie.ac.id\n104.26.6.171\n104.22.20.245\n104.18.24.139`
        await A17.sendMessage(m.chat, {
              text : helpexit,
              contextInfo: {
              externalAdReply: {
                showAdAttribution: true, 
                title: `${nowtime} ${pushname}`,
                body: global.BotName,
                thumbnail: global.Thumb,
                sourceUrl: global.website,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
      })
	}
        break;


      case 'liveon': {
          if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
          A17.sendMessage(from, { react: { text: "🚀", key: m.key } })

          const helpexit = `*◇━━━━LIVE ON OPOK━━━━◇*\nPayload Non Jabar\nGET / HTTP/1.1[crlf]Host: [host][crlf]Connection: Upgrade[crlf]User-Agent: [ua][crlf]Upgrade: websocket[crlf][crlf]\n\nPlayload Jabar\nGET / HTTP/1.1[crlf]Host: beacon.liveon.id[crlf][crlf]PATCH / HTTP/1.1[crlf]Host: [host][crlf]Connection: Upgrade[crlf]User-Agent: [ua][crlf]Upgrade: websocket[crlf][crlf]\n\nProxy:\nbeacon.liveon.id\nnapi.zendesk.com\nsupport.liveon.id`
        await A17.sendMessage(m.chat, {
              text : helpexit,
              contextInfo: {
              externalAdReply: {
                showAdAttribution: true, 
                title: `${nowtime} ${pushname}`,
                body: global.BotName,
                thumbnail: global.Thumb,
                sourceUrl: global.website,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
      })
	}
        break;
        

      case 'byuggwp': {
          if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
          A17.sendMessage(from, { react: { text: "🚀", key: m.key } })

          const helpexit = `*◇━━━━BYU GGWP━━━━◇*\nPayload  \nGET /cdn-cgi/trace HTTP/1.1[crlf]Host: 104.19.143.108[crlf][crlf]CF-RAY / HTTP/1.1[crlf]Host: [host][crlf]Upgrade: Websocket[crlf]Connection: Keep-Alive[crlf]User-Agent: [ua][crlf]Upgrade: websocket[crlf][crlf]\n\nProxy\n104.19.143.108`
        await A17.sendMessage(m.chat, {
              text : helpexit,
              contextInfo: {
              externalAdReply: {
                showAdAttribution: true, 
                title: `${nowtime} ${pushname}`,
                body: global.BotName,
                thumbnail: global.Thumb,
                sourceUrl: global.website,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
      })
	}
        break;


      case 'axissushiroll': {
           if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
           A17.sendMessage(from, { react: {text: "🚀", key: m.key } })

           const helpexit = `*◇━━━━AXIS SUSHIROLL━━━━◇*\nPayload Non Jabar\nGET / HTTP/1.1[crlf]Host: [host][crlf]Connection: Upgrade[crlf]User-Agsent: [ua][crlf]Upgrade: websocket[crlf][crlf]\n\nPlayload Jabar\nGET / HTTP/1.1[crlf]Host: sushiroll.co.id[crlf][crlf]PATCH / HTTP/1.1[crlf]Host: [host][crlf]Upgrade: websocket[crlf][crlf][split]HTTP/ 1[crlf][crlf]\n\nProxy\nwww.sushiroll.co.id\nblog.sushiroll.co.id`
        await A17.sendMessage(m.chat, {
              text : helpexit,
              contextInfo: {
              externalAdReply: {
                showAdAttribution: true, 
                title: `${nowtime} ${pushname}`,
                body: global.BotName,
                thumbnail: global.Thumb,
                sourceUrl: global.website,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
      })
	}
        break;

      case 'xledu': case 'axisedu': {
           if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
           A17.sendMessage(from, { react: {text: "🚀", key: m.key } })

           const helpexit = `*◇━━━━XL/AXIS EDU━━━━◇*\nPayload Non Jabar\nGET / HTTP/1.1[crlf]Host: [host][crlf]Connection: Upgrade[crlf]User-Agsent: [ua][crlf]Upgrade: websocket[crlf][crlf]\n\nPlayload Jabar\nHEAD / HTTP/1.1[crlf]Host: io.ruangguru.com[crlf]Connection: Keep-Alive[crlf]User-Agent: [ua][crlf][crlf]BMOVE / HTTP/1.1[crlf]Host: [host][crlf]Upgrade: websocket[crlf][crlf]\n\nProxy\n104.17.70.206\n104.17.3.81\nchat.sociomile.com`
        await A17.sendMessage(m.chat, {
              text : helpexit,
              contextInfo: {
              externalAdReply: {
                showAdAttribution: true, 
                title: `${nowtime} ${pushname}`,
                body: global.BotName,
                thumbnail: global.Thumb,
                sourceUrl: global.website,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
      })
	}
        break;
        

      case 'isatfun': {
           if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
           A17.sendMessage(from, { react: {text: "🚀", key: m.key } })

           const helpexit = `*◇━━━━ISAT FUN━━━━◇*\nPayload 1\nGET / HTTP/1.1[crlf]Host: [Host][crlf]Upgrade: websocket [crlf][crlf]\n\nPlayload2\nGET /cdn-cgi/trace HTTP/1.1[crlf]Host: creativeservices.netflix.com[crlf][crlf]CF-RAY / HTTP/1.1[crlf]Host: [host][crlf]Upgrade: Websocket[crlf]Connection: Keep-Alive[crlf]User-Agent: [ua][crlf]Upgrade: websocket[crlf][crlf]\n\nProxy\n104.17.241.25\ncreativeservices.netflix.com\n`
        await A17.sendMessage(m.chat, {
              text : helpexit,
              contextInfo: {
              externalAdReply: {
                showAdAttribution: true, 
                title: `${nowtime} ${pushname}`,
                body: global.BotName,
                thumbnail: global.Thumb,
                sourceUrl: global.website,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
      })
	}
        break;
        
        
      case 'xlflex': {
           if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
           A17.sendMessage(from, { react: {text: "🚀", key: m.key } })

           const helpexit = `*◇━━━━XL/ FLEX━━━━◇*\nPayload Non Jabar\nGET / HTTP/1.1[crlf]Host: [host][crlf]Connection: Upgrade[crlf]User-Agsent: [ua][crlf]Upgrade: websocket[crlf][crlf]\n\nPlayload Jabar\nPATCH /ssh-ws HTTP/1.1[crlf]Host: [host][crlf]Host: tr.line.me[crlf]Upgrade: websocket[crlf]Connection: Upgrade[crlf]User-Agent: [ua][crlf][crlf]\n\nProxy\nsogood.linefriends.com\ndf.game.naver.com\n172.67.26.118`
        await A17.sendMessage(m.chat, {
              text : helpexit,
              contextInfo: {
              externalAdReply: {
                showAdAttribution: true, 
                title: `${nowtime} ${pushname}`,
                body: global.BotName,
                thumbnail: global.Thumb,
                sourceUrl: global.website,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
      })
	}
        break;
        
        
      case 'xlsosmed': case 'xlfb': case 'axissosmed': {
           if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
           A17.sendMessage(from, { react: {text: "🚀", key: m.key } })

           const helpexit = `*◇━━━━XL /AXIS SOSMED━━━━◇*\nPayload Non Jabar\nGET / HTTP/1.1[crlf]Host: [host][crlf]Connection: Upgrade[crlf]User-Agent: [ua][crlf]Upgrade: websocket[crlf][crlf]\n\nPlayload Jabar\nGET / HTTP/1.1[crlf]Host: www.help.tinder.com[crlf][crlf]PATCH / HTTP/1.1[crlf]Host: [host][crlf]Connection: Upgrade[crlf]User-Agent: [ua][crlf]Upgrade: websocket[crlf][crlf]\n\nProxy\nwww.help.tinder.com\ninvestor.fb.com\n\n*SNI METOD*\ngraph.instagram.com`
        await A17.sendMessage(m.chat, {
              text : helpexit,
              contextInfo: {
              externalAdReply: {
                showAdAttribution: true, 
                title: `${nowtime} ${pushname}`,
                body: global.BotName,
                thumbnail: global.Thumb,
                sourceUrl: global.website,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
      })
	}
        break;
        

      case 'xlvision': case 'xlvis':  {
           if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
           A17.sendMessage(from, { react: {text: "🚀", key: m.key } })

           const helpexit = `*◇━━━━XL VISION +━━━━◇*\nPayload Non Jabar\nGET / HTTP/1.1[crlf]Host: [host][crlf]Connection: Upgrade[crlf]User-Agsent: [ua][crlf]Upgrade: websocket[crlf][crlf]\n\nPlayload Jabar\nGET / HTTP/1.1[crlf]Host: partners-mplay.visionplus.id[crlf][crlf]PATCH / HTTP/1.1[crlf]Host: [host][crlf]Upgrade: websocket[crlf][crlf][split]HTTP/ 1[crlf][crlf]\n\nProxy\n104.18.225.52\nakademiaforex.onesignal.com\napi.visionplus.id`
        await A17.sendMessage(m.chat, {
              text : helpexit,
              contextInfo: {
              externalAdReply: {
                showAdAttribution: true, 
                title: `${nowtime} ${pushname}`,
                body: global.BotName,
                thumbnail: global.Thumb,
                sourceUrl: global.website,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
      })
	}
        break;
        
        
      case 'xlvidio': case 'axisvidio': {
           if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
           A17.sendMessage(from, { react: {text: "🚀", key: m.key } })

           const helpexit = `*◇━━━━XL /AXIS VIDIO━━━━◇*\nPayload Non Jabar\nGET / HTTP/1.1[crlf]Host: [host][crlf]Connection: Upgrade[crlf]User-Agent: [ua][crlf]Upgrade: websocket[crlf][crlf]\n\nPlayload Jabar\nGET / HTTP/1.1[crlf]Host: vidio.com[crlf][crlf]PATCH / HTTP/1.1[crlf]Host: [host][crlf]Connection: Upgrade[crlf]User-Agent: [ua][crlf]Upgrade: websocket[crlf][crlf]\n\nProxy\n104.22.4.240\nquiz.int.vidio.com\nquiz.vidio.com`
        await A17.sendMessage(m.chat, {
              text : helpexit,
              contextInfo: {
              externalAdReply: {
                showAdAttribution: true, 
                title: `${nowtime} ${pushname}`,
                body: global.BotName,
                thumbnail: global.Thumb,
                sourceUrl: global.website,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
      })
	}
        break;
        
        
      case 'xlcon': case 'axiscon': {
           if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
           A17.sendMessage(from, { react: {text: "🚀", key: m.key } })

           const helpexit = `*◇━━━━XL /AXIS CONFRENCE━━━━◇*\nPayload Non Jabar\nGET / HTTP/1.1[crlf]Host: [host][crlf]Connection: Upgrade[crlf]User-Agent: [ua][crlf]Upgrade: websocket[crlf][crlf]\n\nPlayload Jabar\nPATCH /ssh-ws HTTP/1.1[crlf]Host: [host][crlf]Host: partner.zoom.us[crlf]Upgrade: websocket[crlf]Connection: Upgrade[crlf]User-Agent: [ua][crlf][crlf]\n\nProxy\n170.114.45.0\ngomarketplacefront-cf.zoom.us\ngomarketplacecontent-cf.zoom.us`
        await A17.sendMessage(m.chat, {
              text : helpexit,
              contextInfo: {
              externalAdReply: {
                showAdAttribution: true, 
                title: `${nowtime} ${pushname}`,
                body: global.BotName,
                thumbnail: global.Thumb,
                sourceUrl: global.website,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
      })
	}
        break;
        
        
      case 'xlff': case 'axisgame': {
           if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
           A17.sendMessage(from, { react: {text: "🚀", key: m.key } })

           const helpexit = `*◇━━━━XL /AXIS GAME━━━━◇*\nPayload Non Jabar\nGET / HTTP/1.1[crlf]Host: [host][crlf]Connection: Upgrade[crlf]User-Agent: [ua][crlf]Upgrade: websocket[crlf][crlf]\n\nPlayload Jabar\nPATCH / HTTP/1.1[crlf]Host: [host][crlf]Host: cdn.appsflyer.com[crlf]Connection: Upgrade[crlf]User-Agent: [ua][crlf]Upgrade: websocket[crlf][crlf]\n\nProxy\npoe.garena.com\n104.16.108.96`
        await A17.sendMessage(m.chat, {
              text : helpexit,
              contextInfo: {
              externalAdReply: {
                showAdAttribution: true, 
                title: `${nowtime} ${pushname}`,
                body: global.BotName,
                thumbnail: global.Thumb,
                sourceUrl: global.website,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
      })
	}
        break;


      //qr
      case 'qr': case 'qris': case 'qrcode': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "✨", key: m.key } })
        const helpexit = `*Pembayaran Lewat Dana dan Qris*
        
Dana : 083151636921 An Ferdiansyah

*Jangan Lupa Kirim Bukti TF Yah.*
Terimakasih`
        let buttonMessage = {
          image: fs.readFileSync('./Assets/pic10.jpg'), gifPlayback: false,
          caption: helpexit,

          headerType: 4

        }
        A17.sendMessage(m.chat, buttonMessage, { quoted: m })
      }
        break;

      case 'sendpay': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
		if (!args.join("")) return reply(`6282326xxxx`)
		const swn = args.join(" ")
        var target = swn.split(".")[0];
		if (isNaN(target)) return m.reply("Target Tidak Valid!")
		var org = target.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
        A17.sendMessage(from, { react: { text: "✨", key: m.key } })
        const helpexit = `*Pembayaran Lewat Dana dan Qris*
        
Dana : 083151636921 An Ferdiansyah

*Jangan Lupa Kirim Bukti TF Yah.*
Terimakasih`
        let buttonMessage = {
          image: fs.readFileSync('./Assets/pic10.jpg'), gifPlayback: false,
          caption: helpexit,

          headerType: 4

        }
        A17.sendMessage(org, buttonMessage, { quoted: m })
		reply(`Tagihan Pembayaran Terkirim`)
      }
        break;
		
		//HARGA VPS
      case 'cvps': case 'ordervps': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        try {
          const helpexitText = `◇━━━━━━━━━━━━━━◇
       🌐 *_VPS BY_* 🌐
🌐 *_PX STORE_* 🌐
◇━━━━━━━━━━━━━━◇
✓ ISP DigitalOcean 🚀
✓ Install script by PX STORE
✓ Garansi Selama Masa Aktif❗❗❗
◇━━━━━━━━━━━━━━◇
➥ 𝟷 𝚅𝙲𝙿𝚄 | 𝟷 𝙶𝙱 𝚁𝙰𝙼 | 𝟷 𝚃𝙱 𝙱𝚆 | 𝟹𝟻𝙺
➥ 𝟷 𝚅𝙲𝙿𝚄 | 𝟸 𝙶𝙱 𝚁𝙰𝙼 | 𝟸 𝚃𝙱 𝙱𝚆 | 𝟻𝟶𝙺
➥ 𝟸 𝚅𝙲𝙿𝚄 | 𝟸 𝙶𝙱 𝚁𝙰𝙼 | 𝟹 𝚃𝙱 𝙱𝚆 | 𝟼𝟻𝙺
➥ 𝟸 𝚅𝙲𝙿𝚄 | 𝟺 𝙶𝙱 𝚁𝙰𝙼 | 𝟺 𝚃𝙱 𝙱𝚆 | 𝟾𝟶𝙺

𝙼𝚊𝚜𝚊 𝚊𝚔𝚝𝚒𝚏 𝟹𝟶 𝚑𝚊𝚛𝚒
𝚂𝚞𝚍𝚊𝚑 𝚝𝚎𝚛𝚒𝚗𝚜𝚝𝚊𝚕𝚕 𝚜𝚌𝚛𝚒𝚙𝚝 ＆ 𝙳𝚘𝚖𝚊𝚒𝚗

𝙾𝙽𝙻𝚈 𝙵𝙾𝚁 𝚃𝚄𝙽𝙽𝙴𝙻𝙸𝙽𝙶
𝙽𝚘𝚝𝚎！ 
𝚃𝙾𝚂 
𝟷． 𝙲𝙿𝚄 𝙳𝙸𝙻𝙰𝚁𝙰𝙽𝙶 𝟿𝟶％ ！
𝟸． 𝙽𝙾 𝙳𝙳𝙾𝚂 ！
𝟹． 𝙽𝙾 𝚃𝙾𝚁𝚁𝙴𝙽𝚃 ！
𝟺． 𝙽𝙾 𝙷𝙰𝙲𝙺𝙸𝙽𝙶 ！
𝟻． 𝙽𝙾 𝙼𝙸𝙽𝙸𝙽𝙶 ！
𝟼． 𝙽𝙾 𝙱𝚄𝙸𝙻𝙳 𝙺𝙴𝚁𝙽𝙴𝙻 !`
A17.sendMessage(m.chat, {
            text: helpexitText,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: BotName,
                    body: `Follow Saluran Kami`,
                    thumbnailUrl: 'https://telegra.ph/file/6e82e31535233cfe7c0c7.png',
                    sourceUrl: global.website,
                    mediaType: 1,
                    renderMediumThumbnail: true
                }
            }
        });
    } catch (err) {
        console.error('Error sending help menu:', err);
        reply('Oops, terjadi kesalahan saat mengirim menu bantuan.');
    }
    break;
} 
	//harga autosc	 
      case 'autoscript': case 'cekautosc': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        try {
          const helpexitText = `◇━━━━━━━━━━━━━━◇
  AUTOSCRIPT TUNNELING
◇━━━━━━━━━━━━━━◇
🔰 Harga Script 🔰
◇━━━━━━━━━━━━━━◇
SEWA :
1 IP/Bulan : 15k
UNLI IP Lifetime : 200k
LICENSI OPEN SOUCE : 
300K (Recode Harga Terpisah)
◇━━━━━━━━━━━━━━◇
SCRIPT VPN PREMIUM BY PX
OS Support
1.Debian 10 
2.Ubuntu 20.04 

») What's features included («

- Nginx htp(s):/ipl81/
- Timezone :Asia/ Jakarta
- Auto Reboot (bisa di set sendiri)
- Auto Kill akun
- Auto Update Feature
- Check Port
- Check Memory RAM
- User Limit Login SSH/Dropbear/OpenVPN
- User Limit Quota XRay/V2Ray
- User Limit Quota Trojan
- Speedtest
- Cek User OpenVPN (User-friendly)
- Live Bandwidth
- Running VPS From BOT
- Notification Create Users From BOT
- Notification Check Users From BOT
- Backup Configuration and Users VPS
- Restore Configuration and Users VPS
- Change Subdomain VPS
- Support Multi Path VMESS
- AIO Port 443 80
DLL
◇━━━━━━━━━━━━━━◇`
A17.sendMessage(m.chat, {
            text: helpexitText,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: BotName,
                    body: `Follow Saluran Kami`,
                    thumbnail: global.Thumb,
                    sourceUrl: global.website,
                    mediaType: 1,
                    renderMediumThumbnail: true
                }
            }
        });
    } catch (err) {
        console.error('Error sending help menu:', err);
        reply('Oops, terjadi kesalahan saat mengirim menu bantuan.');
    }
    break;
}  
	//HARGA SSH	
case 'harga': case 'hargavpn': {
    if (isBan) return reply(mess.banned); // Cek jika user diblokir
    if (isBanChat) return reply(mess.bangc); // Cek jika grup diblokir

    try {
        // Memberikan reaksi pada pesan pengguna
        A17.sendMessage(from, { react: { text: "✨", key: m.key } });

        // Teks informasi harga
        const helpexit = `
*PX STORE VPN PREMIUM*
*_SERVER SGDO & INDO_* 🇸🇬 🇮🇩
◇━━━━━━━━━━━━━━━◇
*List Harga VPN premium*
◇━━━━━━━━━━━━━━━◇
*SSH* _5K | 15 Hari | 1 devices_
*SSH* _10K | 30 Hari | 2 devices_
*SSH* _18K | 60 Hari | 2 devices_

*V2RAY* _7K | 15 Hari | 1 devices_
*V2RAY* _13K | 30 Hari | 2 devices_
*V2RAY* _25K | 60 hari | 2 devices_
◇━━━━━━━━━━━━━━━◇
*Membeli artinya Setuju 👍 Jadilah Pembeli Yang Bijak* 🙂
◇━━━━━━━━━━━━━━━◇
Ketik:
*pay* untuk bayar.
◇━━━━━━━━━━━━━━━◇`;

        // Membuat pesan dengan gambar lokal
        let buttonMessage = {
            image: fs.readFileSync('./Assets/Promo.jpg'), // Path lokal ke file Promo.jpg
            caption: helpexit,
            headerType: 4
        };

        // Mengirim pesan dengan gambar
        A17.sendMessage(m.chat, buttonMessage, { quoted: m });
    } catch (err) {
        console.error('Error sending price list:', err); // Menangkap error
        reply('Maaf, terjadi kesalahan saat mengirim informasi harga.');
    }

    break;
}

      //////search
      case 'weather':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "✨", key: m.key } })
        if (!args[0]) return reply("Enter your location to search weather.")
        myweather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args.join(" ")}&units=metric&appid=e409825a497a0c894d2dd975542234b0&language=tr`)

        const weathertext = `           🌤 *Weather Report* 🌤  \n\n🔎 *Search Location:* ${myweather.data.name}\n*💮 Country:* ${myweather.data.sys.country}\n🌈 *Weather:* ${myweather.data.weather[0].description}\n🌡️ *Temperature:* ${myweather.data.main.temp}°C\n❄️ *Minimum Temperature:* ${myweather.data.main.temp_min}°C\n📛 *Maximum Temperature:* ${myweather.data.main.temp_max}°C\n💦 *Humidity:* ${myweather.data.main.humidity}%\n🎐 *Wind:* ${myweather.data.wind.speed} km/h\n`
        A17.sendMessage(from, { video: { url: 'https://media.tenor.com/bC57J4v11UcAAAPo/weather-sunny.mp4' }, gifPlayback: true, caption: weathertext }, { quoted: m })

        break;


      // case 'weather':{
      //   if (!text) return reply('Give me Location...')
      //               let wdata = await axios.get(
      //                   `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`
      //               );
      //               let textw = ""
      //               textw += `*🗺️Weather of  ${text}*\n\n`
      //               textw += `*Weather:-* ${wdata.data.weather[0].main}\n`
      //               textw += `*Description:-* ${wdata.data.weather[0].description}\n`
      //               textw += `*Avg Temp:-* ${wdata.data.main.temp}\n`
      //               textw += `*Feels Like:-* ${wdata.data.main.feels_like}\n`
      //               textw += `*Pressure:-* ${wdata.data.main.pressure}\n`
      //               textw += `*Humidity:-* ${wdata.data.main.humidity}\n`
      //               textw += `*Humidity:-* ${wdata.data.wind.speed}\n`
      //               textw += `*Latitude:-* ${wdata.data.coord.lat}\n`
      //               textw += `*Longitude:-* ${wdata.data.coord.lon}\n`
      //               textw += `*Country:-* ${wdata.data.sys.country}\n`

      //             A17.sendMessage(
      //                   m.chat, {
      //                       text: textw,
      //                   }, {
      //                       quoted: m,
      //                   }
      //              )
      //              }
      //              break;



      // //  "parse-ms": "^1.1.0",


      //-----------------------------------------------------------------------------------------------------------------------------------//
      ///funexit

      case 'stupidcheck': case 'uncleancheck':
      case 'hotcheck': case 'smartcheck':
      case 'greatcheck':
      case 'evilcheck': case 'dogcheck':
      case 'coolcheck':
      case 'waifucheck':
        cantik = body.slice(1)
        const okebnh1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100']
        const A17kak = okebnh1[Math.floor(Math.random() * okebnh1.length)]
        A17.sendMessage(m.chat, { text: A17kak }, { quoted: m })
        break;



      //-----------------------------------------------------------------------------------------------------------------------------------//



      default:

		if (budy.startsWith('>') || budy.startsWith('=>') || budy.includes('JPM')) {
			await slideButton(m.chat); // Mengirim pesan setelah membersihkan chat
		}

        if (budy.startsWith('$')) {
          if (!isCreator) return reply(mess.botowner)
          exec(budy.slice(2), (err, stdout) => {
            if (err) return A17.sendMessage(from, { image: ErrorPic, caption: String(err) }, { quoted: m })
            if (stdout) return reply(stdout)
          })
        }


        if (isCmd && budy.toLowerCase() != undefined) {
          if (m.chat.endsWith('broadcast')) return
          if (m.isBaileys) return
          let msgs = global.db.database
          if (!(budy.toLowerCase() in msgs)) return
          A17.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
        }
    }
  } catch (err) {
    A17.sendMessage(`${ownertag}@s.whatsapp.net`, util.format(err), { quoted: m })
    console.log(err)
    let e = String(err)
    if (e.includes("not-authorized")) return
    if (e.includes("already-exists")) return
    if (e.includes("rate-overlimit")) return
    if (e.includes("Connection Closed")) return
    if (e.includes("Timed Out")) return
    if (e.includes("Value not found")) return
    if (e.includes("Socket connection timeout")) return
  }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright(`Update ${__filename}`))
  delete require.cache[file]
  require(file)
})
