const express = require('express');
const studentRouter = express.Router();
const studentEntity = require('./../model/studentEntity')
const predmetEntity = require('./../model/predmetEntity')
const polazeEntity = require('./../model/polazeEntity')


studentRouter.get('/', (req, res) =>  {
   studentEntity.findAll({include : [predmetEntity]}).then(students =>{
       res.send(students)
   }).catch(err => {
       console.log('greska u ruti');
    })
});

studentRouter.get('/getstudent/:id', (req, res) => {
    studentEntity.findAll({where:{
        id: req.params.id
    },
     include : [predmetEntity]
    }).then(result => {
        res.send(result)
        })
    })

studentRouter.post('/', (req, res) => {
    studentEntity.create(req.body).then(result =>{
        res.send('upisano');
        }).catch(err => {
            res.send('greska')
        })
})

studentRouter.put('/:id', (req, res) => {
    studentEntity.findOne({where:{id: req.params.id}}).then(student => {
        if(req.body.ime){
        student.ime = req.body.ime;
        } 
        if(req.body.prezime){
        student.prezime = req.body.prezime;
        }
        if(req.body.brIndexa){
        student.brIndexa = req.body.brIndexa;
        }
        return student.save()
    }).then(result => {
        res.send('updateovano')
    }).catch(err => {
        res.send('greska u updateovanju')
    })
})
    
    

studentRouter.delete('/:id', (req, res) =>{
    studentEntity.destroy({where :{ id :req.params.id}}).then(result =>{
        res.send('obrisano')
    }).catch(err => {
        console.log('nije obrisano')
    })
})


studentRouter.get('/bestscore', (req, res) => {
    studentEntity.findAll({include: [predmetEntity]}).then(results => {

        
        var result = JSON.parse(JSON.stringify(results));
        var idst = 0;
        var max = 0;



        for(let i=0; i<result.length; i++){
            let ects = 0;   let ocjenaEcts = 0; let prosjek = 0;
            for(let j=0; j< result[i].predmets.length; j++){
                ects = ects + result[i].predmets[j].brKredita;
                if(result[i].predmets[j].polaze.ocjena == 'A'){
                 ocjenaEcts = ocjenaEcts + 10 * result[i].predmets[j].brKredita;
             }
             if(result[i].predmets[j].polaze.ocjena == 'B'){
                 ocjenaEcts = ocjenaEcts + 9 * result[i].predmets[j].brKredita;
             }
             if(result[i].predmets[j].polaze.ocjena == 'C'){
                 ocjenaEcts = ocjenaEcts + 8 * result[i].predmets[j].brKredita;
             }
             if(result[i].predmets[j].polaze.ocjena == 'D'){
                 ocjenaEcts = ocjenaEcts + 7 * result[i].predmets[j].brKredita;
             }
             if(result[i].predmets[j].polaze.ocjena == 'E'){
                 ocjenaEcts = ocjenaEcts + 6 * result[i].predmets[j].brKredita;
             }
             if(result[i].predmets[j].polaze.ocjena == 'F'){
                 ocjenaEcts = ocjenaEcts + 0 * result[i].predmets[j].brKredita;
             }
 
            }
            prosjek = ocjenaEcts / ects;
            if(prosjek > max){
                max = prosjek;
                idst = i + 1;
            }
        }
       









       
       console.log(result);
       console.log(result[0]);
       console.log('=================================================================');
       
       console.log(result[1].predmets);
       console.log('==================================================');
       
       console.log(result[0].predmets[1])
       console.log('==========================================');
       console.log(result[0].predmets.length);
       console.log('=================================================');
       console.log(max);
       console.log(idst);
       
       
       
       
       
       
       return studentEntity.findAll({where:{id: idst}, include : [predmetEntity]})
        
        





    }).then(student => res.send(student))
})



module.exports = studentRouter