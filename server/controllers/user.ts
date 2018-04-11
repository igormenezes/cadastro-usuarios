import { User } from "../models/user";
import { ValidatorUser } from "../helpers/validator/ValidatorUser";

export = (app: any) => {
    app.post('/save', (req: any, res: any) => {
        let validation = new Promise((resolve, reject) => {
            let validatorUser = new ValidatorUser();
            let errors = validatorUser.validate(req);
    
            if(errors){
                reject(errors);
            }

            resolve(true);
        });

        let saveUser = new Promise((resolve, reject) => {
            let user: User = new User;
            
            user.save(req.body, (err: any, data: any) => {
                if(err){
                    return reject(err);
                }
                resolve(data);
            });
        });

        Promise.all([validation, saveUser])
        .then(resolve => { 
            res.status(200).send({success: true, msg: 'Usuário registrado com sucesso!'});
        })
        .catch(reject => { 
            res.status(200).send({success: false, msg: reject});
        })  
    });
}