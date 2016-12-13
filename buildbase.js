var fs = require('fs');
var lineReader = require('readline').createInterface({
  input: fs.createReadStream('brooks_base.txt')
});

var output = '{';


lineReader.on('line', function (line) {
  var cut = line.indexOf(' ');
  // console.log('Line from file:', line.slice(cut).toUpperCase());
  output += Math.round(Math.random()*100000)+': "'+line.slice(cut+1).toUpperCase()+ '",';
  
});

lineReader.on('close',function(){
  // console.log(output +"}");
  fs.writeFile('base_output.txt', output +"}", function(err){
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  });
});
