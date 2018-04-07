import { User } from "../model/user";

export = (app: any) => {
    app.post('/save', (req: any, res: any) => {
        let user: User = new User;

        user.save(req.body, (err: any, data: any) => {
            if (err) {
                throw err;
            }

            res.status(200).send({msg: 'success'});
        });
    });
}