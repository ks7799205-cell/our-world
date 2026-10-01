import type { BirthdayData } from "@/types/birthday";

export const birthdayData: BirthdayData = {
  name: "Mansi",
  birthdayDate: "2026-01-01",

  opening: {
    eyebrow: "A Secret Room",
    headline: "I made something for you.",
    subheadline: "Actually... I made a whole little celebration just for you.",
    prompt: "Ready to step inside?",
    buttonText: "Enter Celebration →",
  },

  birthdayReveal: {
  greeting: "HAPPY BIRTHDAY,",
  subtitle: "Aaj ka din sirf tumhara hai.",
  tagline: "Meri life ki sabse pyaari aur special insaan ko celebrate karte hue ♡",
},

  mainMessage: {
    title: "Today is your day.",
    paragraphs: [
      "Happy birthday, my love!! ❤️🎂",
      "I hope aaj ka din tumhe yaad dilaye ki tum kitni loved and appreciated ho. Meri life ka important hhissa banne ke liye thank you, and meri zindagi mein itni saari khushhiyan laane ke liye bhi.  𓆩♡𓆪",
      "I hope ye saal tumhare liye bhot sare reason laye smile karne ko, tabiyat acchi ho aur woh sari chizeon laye jo tumhe chahiye",
      "Please kabhi mat bhulna ki tum mere liye kitni special ho. 🥺❤️"
    ],
    signature: "I love you sooooooo much,\n CHIMPANZEE",
  },

  gifts: [
    {
      id: "gift-1",
      type: "video",
      title: "Surprise #1",
      description: "Pehla surprise tumhare liye.",
      boxColor: "rose",
      videoUrl: "/videos/safar-ke-aadhe-me-choroge-na.mp4",
    },
    {
      id: "gift-2",
      type: "video",
      title: "Surprise #2",
      description: "Tumhare nakhre ufff baap re",
      boxColor: "champagne",
      videoUrl: "/videos/mai-sab-kahungi.mp4",
    },
    {
      id: "gift-3",
      type: "video",
      title: "Surprise #3",
      description: "Woh chiz jispar hum fida hai tumhare liye",
      boxColor: "burgundy",
      videoUrl: "/videos/tere-naina.mp4",
    },
    {
      id: "gift-4",
      type: "video",
      title: "Surprise #4",
      description: "Chautha aur sabse special surprise",
      boxColor: "gold",
      videoUrl: "/videos/tere-naal.mp4",
    },
  ],

  scratchCard: {
    title: "KYA HAI ISKE ANDAR?  🤔",
    subtitle: "Iske andar kuch hai...",
    prompt: "Finger se ragro screen par",
    revealLabel: "Reveal without scratching",
    rewardTitle: "YOU FOUND IT! ❤️",
    rewardMessage:
      "WILL YOU MARRY ME? ♡ Mai tumhe bohot bohot khush rakhunga sachi",
  },

  reasons: [
    "[REASON 1: WRITE SOMETHING YOU ADORE ABOUT HER: e.g. The way your eyes light up when you're genuinely excited.]",
    "[REASON 2: WRITE SOMETHING YOU ADORE ABOUT HER: e.g. How your laugh instantly turns my worst day into my favorite day.]",
    "[REASON 3: WRITE SOMETHING YOU ADORE ABOUT HER: e.g. Your incredible kindness and the gentle way you care for the people around you.]",
    "[REASON 4: WRITE SOMETHING YOU ADORE ABOUT HER: e.g. The cozy moments when it's just the two of us talking about everything and nothing.]",
    "[REASON 5: WRITE SOMETHING YOU ADORE ABOUT HER: e.g. How effortlessly beautiful you are, inside and out.]",
    "[REASON 6: WRITE SOMETHING YOU ADORE ABOUT HER: e.g. Simply because you are you, and nobody else in the universe compares.]",
  ],

  reasonsFooterNote: "And I could keep going forever. ♡",

  cake: {
    title: "Make A Wish",
    subtitle: "Close your eyes, think of something you truly desire, and blow out the candle.",
    makeAWishPrompt: "Make a wish...",
    wishedMessage: "May every single wish you made today come true. 🎂✨",
    wishedSubtext: "I hope this year gives you a thousand reasons to smile.",
  },

  surprise: {
    title: "Tumhare liye ek khaas surprise 🎥",
    videoUrl: "/videos/aankhein-aaj-kal.mp4",
    videoCaption: "Press play to watch a special video recorded straight from the heart ♡",
    videoPoster: "",
    message: "Jab tumhe first time dekha tha toh kuch aisa hi reaction tha mera✨",
  },

  letter: {
    greeting: "Dear Mansi,",
    date: "",
    paragraphs: [
      "Mujhe nahi pata tumne pyaar ko pehle kis tarah dekha hai, ya tumne zindagi mein kitna pyaar mila hai. Mujhe nahi pata tumhare liye pyaar ka matlab pehle kya tha. Bas itna janta hoon ki tumn=se milne ke baad pyaar mujhe ek bilkul alag cheez lagne laga hai",
      "Shayad main bhi abhi pyaar ko samajhna seekh raha hoon-ki kaise koi insaan tumhare zindagi mein aaye aur bina kuch kiye bhi tumhare andar itni gehri jagah bana le. Mere pass shayad perfect words nahi hai tumhe batane ke liye ki main kya feel karta hoon. Lekin ek cheez pata hai-mai sirf tumhe nahi,tumhari puri duniya ko apna-na chahta hoon.",
      "Tumhari woh pagal wali harkatein, choti-choti chize jo tumne shayad kabhi notice bhi nahi ki hoti. Tumhari chuppi. Tumhara mood. Woh chizein jo tumhe bina wajah smile karwa deti hai, ye smile humesa tumhare face par rakhna chahta hu. Woh baatein jo tumhe hurt karti hai, par tum kisi ko batati nahi. Tumhari har ek favourite chizein jo tum kisi ko nahi batati shayad tumhe khud nahi pata ho, woh sapne jo tum dil me daba ke rakhti ho kisi kone me chupa kar.",
      "Mai un sabko janna chahta hoon. Tumhare har ek chhote se chhote moments ko mai apne dil me basana chahta hoon. Tumhari har ek baat ko mai apne zindagi me ek yaad ke roop me rakhna chahta hoon. Tumhare saath bitaye hue har ek pal ko mai apne zindagi ka hissa banana chahta hoon.",
      "Tum jo casually kabhi koi baat bol deti ho, main use yaad rakhna chahta hoon. Tumhare favourite gaane sunna chahta hoon, sirf isliye kyunki woh tumhe pasand hain. Tumhare sapno ko samajhna chahta hoon, taaki jab tum unke baare mein baat karo, toh mera dil bhi unhe tumhari tarah feel kar sake. Tumhe mai woh azaadi woh space bnna chahta hoon jaha mansi bas mansi ban ke reh sake",
      "Mai tumhare har uss hisse ko janna chahta hoon",
      "Woh tum jo bina kisi reason ke itna hasti ho ki aankhon mein aansu aa jaate hain",
      "Woh tum jo kisi baat se hurt hokar chup ho jaati ho",
      "Woh tum jo har cheez ko overthink karti ho",
      "Woh tum jo kabhi-kabhi khud par doubt karti ho",
      "Woh tum jo sabke saamne strong banne ki koshish karti ho, jabki andar se bas thak chuki hoti ho",
      "Mai sirf tumhare khushi ke dino ka saathi nahi banna chahta",
      "Main un boring dino mein bhi tumhare saath rehna chahta hoon jahan kuch khaas nahi hota. Un mushkil dino mein bhi, jab tumhe khud samajh nahi aata ki tum kya feel kar rahi ho. Aur un pal mein bhi jab tumhe lage ki duniya tumhe samajh hi nahi rahi",
      "Main sirf tumhari khushiyon ko celebrate nahi karna chahta. Main tumhare udasi me bhi chup-chaap baithna chahta hoon. Jab shabd kam pad jaayein, tab bhi tumhe akela feel nahi hone dena chahta.",
      "Mujhe tumhari sirf woh side nahi chahiye jo duniya ko sundar lagti hai",
      "Mujhe tum chahiye. Puri ki puri.",
      "Shayad pyar perfect nahi hota, yahi baat mujhe darati bhi hai meri bhi lakho kamiyo ko tumne has ke accept kiya hai ab meri baari hai mai bhi kuch karna chahta hoon tumhare liye. Tumhe khone ka darr, tumse alag hone ka darr dekhne jao toh hazar darr hai mai bohot emotional bhi ho jata hoon kaafi baar par tum jis pyar aur care se mujhe sambhalti ho, I LOVE YOU yaar",
      "Mai puri zindagi apni tumhe samajhte hue bitana chahta hoon yaar",
      "WILL YOU MARRY ME?",
    ],
    closing: "HUMESA TUMHARA",
    signature: "CHIMPANZEE",
  },

  ending: {
    title: "Happy Birthday, Mansi ♡",
    subtitle: "I hope you felt deeply celebrated today, because you deserve every bit of love in the world.",
    note: "Thank you for being the most wonderful part of my story.",
    signature: "All my love,\nCHIMPANZEE",
  },
};
