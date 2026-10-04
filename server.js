const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

// pools where we generate random names 
const pools = {
  // create for all the questions for variations 
  time:{
   sunrise: ['Golden', 'Rising', 'Solar'],
    noon:['Iron', 'Blazing', 'Stone'],
    midnight:['Shadow', 'Ghost', 'Dark'],
    neversleep: ['Restless', 'Wild', 'Insane'],
  } ,
  weapon:{
     sword: ['Blade', 'Saber', 'Katana'],
    fists: ['Fist', 'Hammer', 'Iron Palm'],
    mic:   ['Prophet', 'Poet', 'Lyricist'],
    mind:  ['Genius', 'Sage', 'Oracle'],
  } ,
  animal:{
  tiger: ['Master', 'Mystic', 'Monk'],
  snake: ['Cobra', 'Viper', 'Python'],
  bird:  ['Crane', 'Hawk', 'Phoenix'],
  bear:  ['Grizzly', 'Kodiak', 'Bear Claw']
  } ,
  style:{
  calmwise: ['Master', 'Mystic', 'Monk'],
  loudchaotic: ['Mad', 'Ruckus', 'Raw'],
  smoothcool: ['Sly', 'Slick', 'Velvet'],
  leaderpack:  ['Lord', 'Chief', 'Shogun'],
  } ,
  challenge:{
  hitHeadOn: ['Killah', 'Destroyer', 'Da Warrior'],
  outsmartIt: ['Da Wise', 'Supreme', 'Strategist'],
  laughtItOff: ['Da Joker', 'Unbothered', 'Da Kid'],
  waittForMoment: ['Da Silent', 'Assassin', 'Da Patient'],
  }
}

// function to pick random name
function getRandom(list){
  return list[Math.floor(Math.random() * list.length)]
}

const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname; 
  console.log(page)
  const params = querystring.parse(url.parse(req.url).query);
  console.log(params);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  
   else if (page == '/image/clan-seal.png') {
    fs.readFile('image/clan-seal.png', function(err, data) {
      res.writeHead(200, {'Content-Type': 'image/png'});
      res.write(data);
      res.end();
    });
  }

  else if (page == '/api') {

      //read answer values
      const time = params.time
      const weapon = params.weapon
      const animal = params.animal
      const style = params.style
      const challenge = params.challenge

      // pools one each
      const timeWord = getRandom(pools.time[time])
      const weaponWord = getRandom(pools.weapon[weapon])
      const styleWord = getRandom(pools.style[style])
       const animalWord = getRandom(pools.animal[animal])
      const challengeWord = getRandom(pools.challenge[challenge])
      console.log(timeWord,weaponWord,styleWord,challengeWord)

      // save send three pools/name 
      const name = `${weaponWord} ${styleWord} ${challengeWord}`


      res.writeHead(200, { 'Content-Type': 'application/json' })

      // senf the name to the frontend
      res.end(JSON.stringify({name
      }))
 
}

  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
