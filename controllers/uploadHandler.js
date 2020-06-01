const NodeClam = require('clamscan');
const path = require('path')

const ClamScan = new NodeClam().init()

module.exports = (req,res)=>{

    const  image  = req.files.file
    let infected = true;

    image.mv(path.resolve(__dirname , '..', 'public/data', image.name), function(err) {
      if (err)
        return res.send(err);
    });

   ClamScan.then(async clamscan=>{
        try {
           

           const {is_infected, file, viruses} = await clamscan.is_infected(path.resolve(__dirname , '..', 'public/data', image.name));
        if (is_infected) res.send("File Was Infected");
        else res.send("File Uploaded");

        } catch (error) {
            
            console.log(error)
        }
    }).catch(err =>{

        console.log(err)
    })




    console.log(req.files)
    
}