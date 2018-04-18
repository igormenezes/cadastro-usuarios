export function checkLogin(req: Express.Session, res: Express.Session, next: any) {
    if (!req.isAuthenticated()) {
        res.status(200).send({ success: false, msg: 'Não está logado', logado: false });
    } else {
        next();
    }
}