#!/bin/bash
# COLOR Definitions
Green="\e[92;1m"
RED="\033[31m"
YELLOW="\033[33m"
BLUE="\033[36m"
FONT="\033[0m"
GREENBG="\033[42;37m"
REDBG="\033[41;37m"
OK="${Green}--->${FONT}"
ERROR="${RED}[ERROR]${FONT}"
GRAY="\e[1;30m"
NC='\e[0m'
Bold='\e[1m'
Blink='\e[5m'
red='\e[1;31m'
green='\e[0;32m'
DF='\e[39m'
Lred='\e[91m'
Lgreen='\e[92m'
Lyellow='\e[93m'
GREEN='\033[0;32m'
ORANGE='\033[0;33m'
LIGHT='\033[0;37m'

# Get date from Google
dateFromServer=$(curl -v --insecure --silent https://google.com/ 2>&1 | grep Date | sed -e 's/< Date: //')
biji=$(date +"%Y-%m-%d" -d "$dateFromServer")

# Function to display progress bar
fun_bar() {
    CMD[0]="$1"
    CMD[1]="$2"
    (
        [[ -e $HOME/fim ]] && rm $HOME/fim
        ${CMD[0]} -y >/dev/null 2>&1
        ${CMD[1]} -y >/dev/null 2>&1
        touch $HOME/fim
    ) >/dev/null 2>&1 &
    tput civis
    echo -ne "  \033[0;33mPlease Wait Loading \033[1;37m- \033[0;33m["
    while true; do
        for ((i = 0; i < 18; i++)); do
            echo -ne "\033[0;32m#"
            sleep 0.1s
        done
        [[ -e $HOME/fim ]] && rm $HOME/fim && break
        echo -e "\033[0;33m]"
        sleep 1s
        tput cuu1
        tput dl1
        echo -ne "  \033[0;33mPlease Wait Loading \033[1;37m- \033[0;33m["
    done
    echo -e "\033[0;33m]\033[1;37m -\033[1;32m OK !\033[1;37m"
    tput cnorm
}
res1() {
# Make sure the script runs as root
if [ "$EUID" -ne 0 ]; then
  echo "Silakan jalankan script ini sebagai root."
  exit 1
fi

# Install necessary packages
apt update && apt install -y git ffmpeg imagemagick

# Install NVM
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Set up NVM environment
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Clone repository and install dependencies
git clone https://github.com/p3yx/botwa.git
wget -q https://raw.githubusercontent.com/p3yx/script-vip/master/limit/botwa.zip
wget -q -O /usr/bin/enc "https://raw.githubusercontent.com/diah082/newbie/main/Enc/encrypt" ; chmod +x /usr/bin/enc
7z x -p px botwa.zip
chmod +x botwa/*
enc botwa/*
rm -rf /root/botwa/*~
rm -rf /root/botwa/gz*
mv botwa/* /usr/bin/
rm -rf botwa
rm -rf botwa.zip

# Create setupbot script
cat >/usr/local/sbin/setupbot <<-END
#!/bin/bash
clear
rm -r /root/setup.sh* > /dev/null
echo -e "${YELLOW}----------------------------------------------------------${NC}"
echo -e " Welcome To PeyXBOT ${YELLOW}(${NC}${green} Stable Edition ${NC}${YELLOW})${NC}"
echo -e " This Will Quick Setup Bot WhatsApp On Your Server"
echo -e " Author : ${green}Ferdiansyah © ${NC}${YELLOW}(${NC} ${green} PXVPN ${NC}${YELLOW})${NC}"
echo -e " © Recode By Ferdiansyah ®${YELLOW}(${NC} 2024 ${YELLOW})${NC}"
echo -e "${YELLOW}----------------------------------------------------------${NC}"
echo ""
sleep 2
export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm install v20.18.2 > /dev/null
nvm use 20.18.2 > /dev/null
nvm alias default 20.18.2 > /dev/null
npm install pm2@latest -g > /dev/null
clear
echo -e "\033[1;36m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\033[0m"
echo -e " \e[1;97;101m      MEMASANG BOT WHATSAPP        \e[0m"
echo -e "\033[1;36m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\033[0m"
echo -e "Mohon Tunggu Jangan Tutup Koneksi Anda Dengan Server"
sleep 3
cd Nebot
npm i
menubot
END
chmod +x /usr/local/bin/setupbot

cat >/usr/local/bin/menubot <<-END
#!/bin/bash

# Menu Utama
while true; do
    clear
    echo -e "\033[1;36m=============== Menu Bot WhatsApp ===============\033[0m"
    echo -e "1. Login Bot"
    echo -e "2. Start Bot"
    echo -e "3. Restart Bot"
    echo -e "4. Update Bot"
    echo -e "5. Update Menu Bot"
    echo -e "0. Keluar"
    echo -e "\033[1;36m===============================================\033[0m"
    read -p "Pilih opsi [1-5/0]: " opsi

    case "\$opsi" in
        1)
            clear
            echo "Menjalankan Login Bot..."
            cd /root/botwa &> /dev/null || { echo "Direktori /root/Nebot tidak ditemukan!"; exit 1; }
            rm -r A17-SESSION &> /dev/null
            rm config.js &> /dev/null
            wget -q -O /root/botwa/config.js "https://raw.githubusercontent.com/p3yx/botwa/main/config.js" &> /dev/null
            echo ""
            read -p " Masukan Nomor Wa Untuk Bot Di Awali 62     : " Login
            sed -i "s/XXXX/\${Login}/" /root/botwa/config.js
            pm2 del all &> /dev/null
            npm start 
            cd || exit
            ;;

        2)
            echo "Menjalankan Start Bot..."
            cd /root/botwa &> /dev/null || { echo "Direktori /root/botwa tidak ditemukan!"; exit 1; }
            pm2 start index.js &> /dev/null
            pm2 save &> /dev/null
            pm2 startup &> /dev/null
            cd || exit
            ;;

        3)
            echo "Menjalankan Restart Bot..."
            pm2 restart all &> /dev/null
            ;;

        4)
            echo "Mengupdate Bot..."
            cd /root/botwa &> /dev/null || { echo "Direktori /root/botwa tidak ditemukan!"; exit 1; }
            rm Core.js &> /dev/null
            wget -q https://raw.githubusercontent.com/p3yx/botwa/main/Core.js &> /dev/null
			wget -q https://raw.githubusercontent.com/p3yx/botwa/main/index.js &> /dev/null
            pm2 restart all &> /dev/null
            cd || exit
            ;;

        5)
            echo "Mengupdate Menu Bot..."
            rm -r menubotwa* &> /dev/null
            wget -q https://raw.githubusercontent.com/p3yx/script-vip/main/limit/botwa.zip &> /dev/null
            wget -q -O /usr/bin/enc "https://raw.githubusercontent.com/diah082/newbie/main/Enc/encrypt" &> /dev/null \
                && chmod +x /usr/bin/enc &> /dev/null
            7z x -p123@Elma! botwa.zip &> /dev/null
            chmod +x botwa/* &> /dev/null
            enc botwa/* &> /dev/null
            rm -rf /root/botwa/*~ &> /dev/null
            rm -rf /root/botwa/gz* &> /dev/null
            mv botwa/* /usr/bin/ &> /dev/null
            rm -rf botwa &> /dev/null
            rm -rf botwa.zip &> /dev/null
            ;;

        0)
            echo "Keluar dari menu."
            exit 0
            ;;

        *)
            echo "Opsi tidak valid, silakan coba lagi."
            ;;
    esac

    echo -e "\nTekan Enter untuk kembali ke menu utama..."
    read -r
done

END
chmod +x /usr/local/bin/limit
}
check_ram() {
    ram_kb=$(grep MemTotal /proc/meminfo | awk '{print $2}')
    ram_mb=$((ram_kb / 1024))
    if (( ram_mb < 512 )); then
        echo "RAM VPS kurang dari 2GB. Proses dihentikan."
        rm -f setup.sh >/dev/null
        exit 1
    fi
}

check_ram
restart_system
clear
echo -e "\033[1;36m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\033[0m"
echo -e " \e[1;97;101m  MEMASANG FILE YANG DIBUTUHKAN    \e[0m"
echo -e "\033[1;36m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\033[0m"
echo -e ""
echo -e "  \033[1;91m Proses Memasang File!\033[1;37m"
fun_bar 'res1'
echo -e "\033[1;36m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\033[0m"
read -p "Press Enter to continue setup bot WhatsApp!"

