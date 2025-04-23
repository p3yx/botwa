
const fs = require("fs");
const chalk = require("chalk");
require("dotenv").config();

// Default values for global variables
global.available = process.env.AVAILABLE || true;
global.autoReadAll = process.env.AUTO_READ_ALL || false;
global.antitags = process.env.ANTITAGS || true;
global.joinall = process.env.JOINALL || true;

// Auto functioner
global.autoTyping = process.env.AUTO_TYPING || false;
global.autoRecord = process.env.AUTO_RECORD || false;
global.groupevent = process.env.GROUPEVENT || false;
global.statusseen = process.env.STATUSSEEN || false;
global.autoreadgc = process.env.AUTOREADGC || true;


// Auth information
global.pairNumber = "XXXX";                         // Add your paining number with country code example "6282326322300"; 
global.port = process.env.PORT || "10000";
global.auth = process.env.AUTH || "Pairing";                // Auth mode OR/Pairing.
global.sessionFile = process.env.SESSION_FILE || "A17-SESSION";
global.mongodb = process.env.MONGODB || "";                 // Mongodb url.
global.website = "https://whatsapp.com/channel/0029Vaj7rCF2phHIcXbV3v1N"; 
global.github = "https://github.com/p3yx";


// Default prefix
global.prefa = process.env.PREFIX ? process.env.PREFIX.split("/") : ["."];


// Owner information
global.Owner = process.env.OWNER ? process.env.OWNER.split(",") : ["6283151636921"];
global.OwnerNumber = process.env.OWNER_NUMBER ? process.env.OWNER_NUMBER.split(",") : ["6283151636921"];
global.ownertag = process.env.OWNER_TAG ? process.env.OWNER_TAG.split(",") : ["6283151636921"];
global.OwnerName = process.env.OWNER_NAME || "𝙋𝙚𝙮𝙭";
global.BotName = process.env.BOT_NAME || "⪨༒𓊈𒆜𝐁𝐎𝐓𝐙 𝐏𝐗 𝐒𝐓𝐎𝐑𝐄𒆜𓊉༒⪩";
global.packname = process.env.PACK_NAME || "𝐁𝐎𝐓𝐙 𝐏𝐗";
global.author = "By: peyx";
global.BotSourceCode = "https://github.com/p3yx/botwa";
global.SupportGroupLink = "https://chat.whatsapp.com/HNACwQRxuoY7rVg6q12d4m";


// Settings Orderkuota
global.pinH2H = "5555"
global.passwordH2H = "duriduri34"
global.merchantIdOrderKuota = "OK1412639"
global.apiOrderKuota = "727329817453713371412639OKCT3FCBBE1DEF8C9F33A419C2246A811328"
global.qrisOrderKuota = "00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214737458216203040303UMI51440014ID.CO.QRIS.WWW0215ID20233008504920303UMI5204541153033605802ID5919MRZ STORE OK14126396008SUKABUMI61054311162070703A0163043479"

//
global.openAiAPI = process.env.OPENAI_API || "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";
global.location = process.env.LOCATION || "Center Java, Indonesia";
global.reactmoji = process.env.REACT_MOJI || "❤️";
global.themeemoji = process.env.THEME_EMOJI || "💖";
global.vidmenu = { url: process.env.VID_MENU_URL || 'https://telegra.ph/file/ae16bc14d33d7d520cd7d.mp4' };


//
global.BotLogo = fs.readFileSync("./Assets/pic1.jpg");
global.Thumb = fs.readFileSync("./Assets/Ne.jpg");
global.Thumb1 = fs.readFileSync("./Assets/pic5.jpg");
global.ErrorPic = fs.readFileSync("./Assets/pic7.jpg");
global.them = "https://r4.wallpaperflare.com/wallpaper/1003/376/845/makoto-shinkai-kimi-no-na-wa-wallpaper-0816ade8b0301c58302c014e48d2441a.jpg";


//
global.ntilinkytvid = []
global.ntilinkytch = []
global.ntilinkig = []
global.ntilinkfb = []
global.ntilinktg = []
global.ntilinktt = []
global.ntilinktwt = []
global.ntilinkall = []
global.nticall = []
global.ntwame = []
global.nttoxic = []
global.ntnsfw = []
global.ntvirtex = []
global.rkyt = []
global.wlcm = []
global.gcrevoke = []
global.autorep = []
global.ntilink = []


// Messages
global.mess = {
  jobdone: 'Here you go...',
  useradmin: 'Sorry, only *Group Admins* can use this command *Baka*!',
  botadmin: 'Sorry, i cant execute this command without being an *Admin* of this group.',
  botowner: 'Only my *Owner* can use this command, Baka!',
  grouponly: 'This command is only made for *Groups*, Baka!',
  privateonly: 'This command is only made for *Private Chat*, Baka!',
  botonly: 'Only the *Bot itself* can use this command!',
  waiting: 'Just Wait...',
  nolink: 'Please provide me *link*, Baka!',
  error: 'An error occurd!',
  banned: 'You are *Banned* fron using commands!',
  bangc: 'This Group is *Banned* from using Commands!',
  nonsfw: 'Dont be a pervert Baka! This is not a NSFW enabled group!'

}
