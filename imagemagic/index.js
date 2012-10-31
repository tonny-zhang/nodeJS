var im = require('imagemagick');
im.readMetadata('../myjpg.jpg.jpg', function(err, metadata){
  if (err) throw err;
  console.log('Shot at '+metadata.exif.dateTimeOriginal);
})